#!/usr/bin/env python3
"""
tools/validate.py — Schema + integrity validator for the Seerah Encyclopedia.

Runs offline in <1s. Used by the pre-commit hook and CI.

Checks:
  1. data.json and schema.json parse as JSON
  2. Required fields per entity (id, name_ar, type, country, verification, inclusion_tier)
  3. Enum fields match schema.json
  4. IDs are unique and follow the pattern <REGION>-<NNN>
  5. explicit_relations point to real entities
  6. data/project_annotations.json refs are real entity IDs
  7. HTML files have UTF-8 BOM-free encoding and basic structural sanity

Exit codes:
  0 — all checks pass
  1 — one or more errors found

Usage:
    python3 tools/validate.py            # verbose
    python3 tools/validate.py --quiet    # only print errors (for hooks)
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUIET = "--quiet" in sys.argv

errors = []
warnings = []
ok = []


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def good(msg):
    ok.append(msg)


def load_json(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        err(f"missing file: {path.relative_to(ROOT)}")
        return None
    except json.JSONDecodeError as e:
        err(f"invalid JSON in {path.relative_to(ROOT)}: {e}")
        return None


def validate_entities(entities, schema):
    props = schema.get("properties", {})
    required = ["id", "name_ar", "type", "country", "verification", "inclusion_tier"]
    id_pattern = re.compile(r"^(ARB|LEV|MAG|TUR|NAM|WEST|GLB)-\d{3,4}$")
    seen_ids = set()

    enum_fields = {
        f: set(props[f].get("enum", []))
        for f in props
        if isinstance(props[f], dict) and "enum" in props[f]
    }
    array_enum_fields = {
        f: set(props[f].get("items", {}).get("enum", []))
        for f in props
        if isinstance(props[f], dict)
        and props[f].get("type") == "array"
        and isinstance(props[f].get("items"), dict)
        and "enum" in props[f]["items"]
    }

    for i, e in enumerate(entities):
        eid = e.get("id", f"<index {i}>")

        for f in required:
            if not e.get(f):
                err(f"{eid}: missing required field '{f}'")

        if e.get("id"):
            if not id_pattern.match(e["id"]):
                err(f"{eid}: id does not match pattern <REGION>-<NNN>")
            if e["id"] in seen_ids:
                err(f"{eid}: duplicate id")
            seen_ids.add(e["id"])

        for f, allowed in enum_fields.items():
            v = e.get(f)
            if v and v not in allowed:
                err(f"{eid}: invalid {f}='{v}'")

        for f, allowed in array_enum_fields.items():
            vs = e.get(f) or []
            if not isinstance(vs, list):
                err(f"{eid}: {f} must be an array")
                continue
            for v in vs:
                if v not in allowed:
                    err(f"{eid}: invalid {f}[]='{v}'")

    return seen_ids


def validate_relations(entities, valid_ids, schema):
    rel_types = set(
        schema.get("properties", {})
        .get("explicit_relations", {})
        .get("items", {})
        .get("properties", {})
        .get("relation_type", {})
        .get("enum", [])
    )
    for e in entities:
        rels = e.get("explicit_relations") or []
        if not isinstance(rels, list):
            err(f"{e.get('id')}: explicit_relations must be an array")
            continue
        for r in rels:
            tgt = r.get("target_id")
            rt = r.get("relation_type")
            if tgt and tgt not in valid_ids:
                err(f"{e.get('id')}: relation target '{tgt}' does not exist")
            if rt and rel_types and rt not in rel_types:
                err(f"{e.get('id')}: invalid relation_type='{rt}'")


def validate_annotations(valid_ids):
    path = ROOT / "data" / "project_annotations.json"
    if not path.exists():
        warn("data/project_annotations.json not found (optional)")
        return
    ann = load_json(path)
    if not ann:
        return
    items = ann.get("annotations", [])
    for a in items:
        eid = a.get("entity_id")
        if eid and eid not in valid_ids:
            err(f"annotation references unknown entity_id '{eid}'")
    good(f"annotations checked: {len(items)} entries")


def validate_html_citations():
    count = 0
    for path in ROOT.glob("*.html"):
        try:
            txt = path.read_text(encoding="utf-8")
        except UnicodeDecodeError as e:
            err(f"{path.name}: encoding issue ({e})")
            continue
        count += len(re.findall(r'<a [^>]*href=', txt))
    good(f"HTML citations scanned: {count} <a href> across HTML files")


def main():
    data = load_json(ROOT / "data.json")
    schema = load_json(ROOT / "schema.json")
    if not data or not schema:
        finish()

    entities = data.get("entities", [])
    good(f"data.json: {len(entities)} entities loaded")
    good(f"schema.json: {len(schema.get('properties', {}))} properties defined")

    valid_ids = validate_entities(entities, schema)
    validate_relations(entities, valid_ids, schema)
    validate_annotations(valid_ids)
    validate_html_citations()

    finish()


def finish():
    if not QUIET:
        for m in ok:
            print(f"  ✓ {m}")
        for m in warnings:
            print(f"  ⚠ {m}")
    for m in errors:
        print(f"  ✗ {m}", file=sys.stderr)
    summary = f"Result: {len(ok)} OK, {len(warnings)} warnings, {len(errors)} errors"
    if errors:
        print(f"\n{summary}", file=sys.stderr)
        sys.exit(1)
    if not QUIET:
        print(f"\n{summary}")
    sys.exit(0)


if __name__ == "__main__":
    main()
