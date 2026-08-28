#!/usr/bin/env python3
"""Generate personalized outreach mail-merge files from HIFLD prospects."""

from __future__ import annotations

import csv
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "owner-prospects.json"
OUT = ROOT / "data" / "campaigns"
PUBLIC = ROOT / "public" / "downloads" / "campaigns"
LINK = "https://turneratom.github.io/VitalAI-PWA/list-your-park/?ref=bradley-outreach"

ASSOCIATIONS = [
    ("Florida Manufactured Housing Association", "info@fmha.org", "FL"),
    ("Texas Manufactured Housing Association", "info@texasmha.com", "TX"),
    ("Manufactured Housing Institute", "info@mfghome.org", "US"),
    ("California Manufactured Housing Institute", "info@cmhi.org", "CA"),
    ("Arizona Manufactured Housing Association", "info@azmha.com", "AZ"),
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    payload = json.loads(DATA.read_text())
    parks = payload["parks"]

    # Wave CSVs for dialers
    waves = {
        "wave1-sunbelt": {"FL", "TX", "AZ", "CA"},
        "wave2-southeast": {"NC", "SC", "GA", "TN", "AL", "MS", "LA"},
        "wave3-midwest": {"OH", "IN", "MI", "IL", "WI", "MO"},
    }
    for name, states in waves.items():
        rows = [p for p in parks if p["state"] in states]
        path = OUT / f"{name}.csv"
        with path.open("w", newline="") as f:
            w = csv.DictWriter(
                f,
                fieldnames=[
                    "name",
                    "phone",
                    "city",
                    "state",
                    "address",
                    "zip",
                    "county",
                    "call_script",
                    "sms_script",
                    "list_link",
                ],
            )
            w.writeheader()
            for p in rows:
                w.writerow(
                    {
                        "name": p["name"],
                        "phone": p["phone"],
                        "city": p["city"],
                        "state": p["state"],
                        "address": p["address"],
                        "zip": p["zip"],
                        "county": p["county"],
                        "call_script": (
                            f"Hi, Bradley with Mobile Home Parks calling about "
                            f"{p['name']} in {p['city']}. Free marketplace for park owners — "
                            f"$0 listing fee, $0 success fee. Brokers take ~6%. We've operated "
                            f"4,000+ spaces. Can I text the link?"
                        ),
                        "sms_script": (
                            f"Bradley @ Mobile Home Parks re {p['name']} ({p['city']}). "
                            f"Free owner marketplace — $0 fees. List in 2 min: {LINK}"
                        ),
                        "list_link": LINK,
                    }
                )
        shutil.copy2(path, PUBLIC / path.name)
        print(f"Wrote {path.name}: {len(rows)} parks")

    # Association outreach letters
    assoc_path = OUT / "association-emails.txt"
    with assoc_path.open("w") as f:
        for name, email, region in ASSOCIATIONS:
            f.write(f"TO: {email}\n")
            f.write(f"ORG: {name} ({region})\n")
            f.write("SUBJECT: Free listing platform for your member park owners\n\n")
            f.write(
                f"Hello {name} team,\n\n"
                "I'm Bradley with Mobile Home Parks (4,000+ manufactured housing spaces operated; "
                "24 communities sold). We built a fee-free marketplace where "
                "mobile home park owners can list with $0 listing fees and $0 success fees.\n\n"
                f"Member owners can list here: {LINK}\n\n"
                "We'd welcome sharing this as a no-cost resource for your members. Happy to "
                "provide a short blurb, webinar, or one-pager.\n\n"
                "Best,\nBradley\nbrad@treadcompanies.com\n"
            )
            f.write("\n" + ("-" * 60) + "\n\n")
    shutil.copy2(assoc_path, PUBLIC / assoc_path.name)
    print(f"Wrote {assoc_path.name}")

    summary = {
        "totalParks": len(parks),
        "link": LINK,
        "waves": {k: sum(1 for p in parks if p["state"] in v) for k, v in waves.items()},
        "associations": len(ASSOCIATIONS),
    }
    (OUT / "summary.json").write_text(json.dumps(summary, indent=2))
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
