#!/usr/bin/env python3
"""
tools/sheikh_mode.py — Toggle the SHEIKH_MODE flag in index.html.

The Sheikh-project layer is hidden by default in the public encyclopedia.
This helper flips the flag without touching anything else.

Usage:
    python3 tools/sheikh_mode.py on     # enable (private/Sheikh build)
    python3 tools/sheikh_mode.py off    # disable (public default)
    python3 tools/sheikh_mode.py        # show current state
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEX = ROOT / "index.html"

PATTERN = re.compile(r"window\.SHEIKH_MODE\s*=\s*(true|false)\s*;")


def read_state():
    txt = INDEX.read_text(encoding="utf-8")
    m = PATTERN.search(txt)
    if not m:
        print("error: SHEIKH_MODE flag not found in index.html", file=sys.stderr)
        sys.exit(1)
    return m.group(1) == "true", txt


def set_state(on):
    is_on, txt = read_state()
    new_value = "true" if on else "false"
    new_txt = PATTERN.sub(f"window.SHEIKH_MODE = {new_value};", txt)
    INDEX.write_text(new_txt, encoding="utf-8")
    print(f"SHEIKH_MODE set to {new_value} (was {is_on})")


def main():
    if len(sys.argv) == 1:
        is_on, _ = read_state()
        print(f"SHEIKH_MODE is {'on' if is_on else 'off'}")
        return
    arg = sys.argv[1].lower()
    if arg in ("on", "true", "1", "enable"):
        set_state(True)
    elif arg in ("off", "false", "0", "disable"):
        set_state(False)
    else:
        print(f"unknown arg: {arg}. Use 'on' or 'off'.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
