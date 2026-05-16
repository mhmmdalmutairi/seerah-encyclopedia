#!/usr/bin/env python3
"""
tools/quality_scan.py — Monthly health audit of the Seerah Encyclopedia.

Generates data/quality_report.json (consumed by the «صحة البيانات» tab).

Scans:
  1. Field completeness rates
  2. URL health (HEAD requests, parallel)
  3. Duplicate detection (fuzzy match on name_ar)
  4. Gap analysis (geographic / linguistic / thematic)
  5. Quality score per entity (0-100)

Usage:
    python3 tools/quality_scan.py
    python3 tools/quality_scan.py --no-network  (skip URL checks)
"""

import concurrent.futures
import json
import re
import socket
import ssl
import sys
import urllib.request
import urllib.error
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_NETWORK = "--no-network" in sys.argv


def load_data():
    return json.load(open(ROOT / "data.json", encoding="utf-8"))


def load_schema():
    return json.load(open(ROOT / "schema.json", encoding="utf-8"))


def completeness_report(entities):
    fields = ["id", "name_ar", "name_en", "type", "type_group", "country",
              "region", "city_ar", "founded", "url", "description_ar",
              "languages", "subjects", "subjects_category", "key_figures",
              "funding_type", "verification", "inclusion_tier",
              "methodology_school", "trajectory", "output_volume_yearly",
              "target_audience", "quality_signal", "explicit_relations"]
    n = len(entities)
    out = {}
    for f in fields:
        filled = sum(1 for e in entities if e.get(f))
        out[f] = {"filled": filled, "total": n,
                  "pct": round(filled / n * 100, 1) if n else 0}
    return out


def check_url(item):
    eid, url = item
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    UA = "Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    try:
        req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": UA})
        with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
            return (eid, url, r.status, "ok")
    except urllib.error.HTTPError as e:
        if e.code in (405, 403, 501):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
                    return (eid, url, r.status, "ok-via-get")
            except Exception:
                return (eid, url, e.code, f"http {e.code}")
        return (eid, url, e.code, f"http {e.code}")
    except urllib.error.URLError as e:
        return (eid, url, 0, str(e.reason)[:60])
    except socket.timeout:
        return (eid, url, 0, "timeout")
    except Exception as e:
        return (eid, url, 0, type(e).__name__)


def url_health(entities):
    if SKIP_NETWORK:
        return {"skipped": True}
    urls = [(e["id"], e["url"]) for e in entities if e.get("url")]
    results = []
    socket.setdefaulttimeout(10)
    with concurrent.futures.ThreadPoolExecutor(max_workers=15) as exe:
        for r in exe.map(check_url, urls):
            results.append(r)
    ok = [r for r in results if r[3].startswith("ok")]
    broken_404 = [r for r in results if r[2] == 404]
    others = [r for r in results if r[2] not in (200, 301, 302, 308, 404)
              and not r[3].startswith("ok")]
    return {"total": len(urls), "ok": len(ok),
            "broken_404": len(broken_404), "other_errors": len(others),
            "broken_list": [(eid, url) for eid, url, _, _ in broken_404],
            "ok_pct": round(len(ok) / len(urls) * 100, 1) if urls else 0}


def normalize_arabic(s):
    if not s: return ""
    s = re.sub(r"[ؐ-ًؚ-ٰٟۖ-ۜ۟-۪ۤۧۨ-ۭ]", "", s)
    s = re.sub(r"[آأإا]", "ا", s)
    s = re.sub(r"[ةه]", "ه", s)
    s = re.sub(r"[ىي]", "ي", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def duplicate_detection(entities):
    by_name = defaultdict(list)
    for e in entities:
        n = normalize_arabic(e.get("name_ar", ""))
        if len(n) > 5:
            by_name[n].append(e["id"])
    dups = {k: v for k, v in by_name.items() if len(v) > 1}
    return {"total_suspected": len(dups), "groups": dups}


def gap_analysis(entities, schema):
    real = [e for e in entities if not e.get("name_ar", "").startswith("[توثيق فجوة]")]
    core = [e for e in real if not e.get("project_alignment") or e.get("project_alignment") == "directly_aligned"]
    LANG_DEMAND = {"ar": 420, "en": 1000, "tr": 80, "ur": 230, "id": 240,
                   "bn": 270, "fa": 110, "fr": 270, "ms": 180, "sw": 200,
                   "ha": 70, "yo": 40, "zh": 25, "es": 6, "ru": 25, "de": 5}
    lang_supply = Counter()
    for e in core:
        for l in e.get("languages") or []:
            lang_supply[l] += 1
    lang_gaps = sorted([{"lang": l, "demand_m": d, "supply": lang_supply.get(l, 0),
                         "m_per_entity": round(d / max(lang_supply.get(l, 0), 0.1), 1)}
                        for l, d in LANG_DEMAND.items()],
                       key=lambda x: -x["m_per_entity"])

    subj_supply = Counter()
    for e in core:
        for s in e.get("subjects") or []:
            subj_supply[s] += 1
    valid_subjects = set(schema["properties"]["subjects"]["items"]["enum"])
    subj_gaps = sorted([{"subject": s, "count": subj_supply.get(s, 0)} for s in valid_subjects],
                       key=lambda x: x["count"])

    COUNTRY_DEMAND = {"ID": 240, "PK": 230, "IN": 200, "BD": 153, "EG": 95,
                      "NG": 100, "IR": 85, "TR": 80, "DZ": 42, "SD": 40,
                      "IQ": 38, "AF": 38, "MA": 36, "ET": 35, "UZ": 30,
                      "SA": 33, "YE": 27, "MY": 23, "RU": 25, "ML": 18,
                      "SN": 17, "TZ": 17, "NE": 22, "TN": 11, "SO": 16,
                      "BF": 11, "CN": 25}
    country_supply = Counter(e.get("country") for e in core if e.get("country"))
    country_gaps = sorted([{"country": c, "demand_m": d,
                            "supply": country_supply.get(c, 0),
                            "m_per_entity": round(d / max(country_supply.get(c, 0), 0.1), 1)}
                           for c, d in COUNTRY_DEMAND.items()],
                          key=lambda x: -x["m_per_entity"])

    return {"languages": lang_gaps[:15], "subjects": subj_gaps[:15],
            "countries": country_gaps[:15]}


def entity_quality_score(e):
    score = 0
    for f in ["id", "name_ar", "type", "country", "region", "verification", "inclusion_tier"]:
        if e.get(f): score += 40 / 7
    score += 8 if e.get("description_ar") and len(e["description_ar"]) >= 80 else 0
    score += 8 if e.get("founded") else 0
    score += 6 if e.get("url") else 0
    score += 6 if e.get("languages") and len(e["languages"]) > 0 else 0
    score += 6 if e.get("subjects") and len(e["subjects"]) > 0 else 0
    score += 6 if e.get("key_figures") and len(e["key_figures"]) > 0 else 0
    score += 5 if e.get("methodology_school") else 0
    score += 5 if e.get("trajectory") else 0
    score += 5 if e.get("quality_signal") else 0
    score += 5 if e.get("explicit_relations") else 0
    return round(score, 1)


def main():
    print("=" * 60)
    print("Seerah Encyclopedia — Quality Scan")
    print("=" * 60)
    print()
    data = load_data()
    schema = load_schema()
    entities = data["entities"]
    real = [e for e in entities if not e.get("name_ar", "").startswith("[توثيق فجوة]")]
    core = [e for e in real if not e.get("project_alignment") or e.get("project_alignment") == "directly_aligned"]

    print(f"Total: {len(entities)}, Real: {len(real)}, Core: {len(core)}\n")
    print("→ Completeness…")
    completeness = completeness_report(core)
    print("→ URL health…")
    urls = url_health(core)
    print("→ Duplicates…")
    dups = duplicate_detection(core)
    print("→ Gaps…")
    gaps = gap_analysis(entities, schema)
    print("→ Scores…")
    scores = sorted([{"id": e["id"], "name_ar": e["name_ar"],
                      "score": entity_quality_score(e)} for e in core],
                    key=lambda x: x["score"])
    low = [s for s in scores if s["score"] < 60]

    report = {
        "generated_at": datetime.now().isoformat() + "Z",
        "totals": {"all_entities": len(entities), "real": len(real),
                   "core": len(core), "secondary_register": len(real) - len(core)},
        "completeness": completeness,
        "url_health": urls,
        "duplicates": {"suspected_groups": dups["total_suspected"]},
        "duplicate_groups": dups["groups"],
        "gaps": gaps,
        "scores": {"avg": round(sum(s["score"] for s in scores) / len(scores), 1) if scores else 0,
                   "median": sorted(s["score"] for s in scores)[len(scores) // 2] if scores else 0,
                   "low_quality": low[:20], "low_quality_count": len(low)}
    }
    with open(ROOT / "data" / "quality_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Avg score: {report['scores']['avg']}/100, Low: {report['scores']['low_quality_count']}")
    if not urls.get("skipped"):
        print(f"   URL health: {urls['ok']}/{urls['total']} ({urls['ok_pct']}%)")


if __name__ == "__main__":
    main()
