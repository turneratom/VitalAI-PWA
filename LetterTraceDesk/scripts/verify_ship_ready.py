#!/usr/bin/env python3
"""Static ship-ready checks for Letter Trace Desk (no Xcode required)."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []
warnings: list[str] = []


def err(msg: str) -> None:
    errors.append(msg)


def warn(msg: str) -> None:
    warnings.append(msg)


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def main() -> int:
    required = [
        ROOT / "README.md",
        ROOT / "Configuration.storekit",
        ROOT / "LetterTraceDesk.xcodeproj" / "project.pbxproj",
        ROOT / "LetterTraceDesk" / "LetterTraceDeskApp.swift",
        ROOT / "LetterTraceDesk" / "PrivacyInfo.xcprivacy",
        ROOT / "LetterTraceDesk" / "Info.plist",
        ROOT / "LetterTraceDesk" / "Assets.xcassets" / "AppIcon.appiconset" / "AppIcon.png",
        ROOT / "docs" / "ASC-CHECKLIST.md",
        ROOT / "docs" / "APP-STORE-LISTING.md",
        ROOT / "docs" / "BRAD-MAC-TESTFLIGHT.md",
        ROOT / "docs" / "PRIVACY.md",
        ROOT / "docs" / "privacy.html",
        ROOT / "docs" / "FENCES.md",
    ]
    for path in required:
        if not path.exists():
            err(f"missing {path.relative_to(ROOT)}")

    swift_files = list((ROOT / "LetterTraceDesk").rglob("*.swift"))
    if len(swift_files) < 15:
        err(f"expected a full SwiftUI app, found {len(swift_files)} Swift files")

    blob = "\n".join(read(p) for p in swift_files)

    banned = [
        "WKWebView",
        "SFSafariViewController",
        "WebView",
        "ATTrackingManager",
        "AppTrackingTransparency",
        "NSUserTrackingUsageDescription",
        "Firebase",
        "Amplitude",
        "Mixpanel",
        "TelemetryDeck",
        "Segment.Analytics",
        "GADMobileAds",
        "FBSDK",
        "IDFA",
        "Product.SubscriptionInfo",
        "AutoRenewable",
    ]
    for token in banned:
        if token in blob:
            err(f"banned token in Swift sources: {token}")

    if "import StoreKit" not in blob:
        err("StoreKit 2 import missing")
    if "import AVFoundation" not in blob:
        err("AVFoundation import missing")
    if "com.lettertracedesk.fullalphabet" not in blob:
        err("IAP product id missing from Swift")
    if 'Array("ABCDEF")' not in blob and 'Array("ABCDEF")' not in read(ROOT / "LetterTraceDesk" / "Models" / "LetterCatalog.swift"):
        err("free letters A–F not found")

    catalog = read(ROOT / "LetterTraceDesk" / "Models" / "LetterCatalog.swift")
    if 'static let free: [Character] = Array("ABCDEF")' not in catalog:
        err("LetterCatalog.free must be A–F")
    if 'static let paid: [Character] = Array("GHIJKLMNOPQRSTUVWXYZ")' not in catalog:
        err("LetterCatalog.paid must be G–Z")

    if "AppStorage" not in blob:
        err("AppStorage not used for preferences")
    gate = read(ROOT / "LetterTraceDesk" / "Models" / "ParentGateChallenge.swift")
    if "20...49" not in gate or "11...39" not in gate:
        err("parent gate must use the documented two-digit adult-level ranges")

    storekit = json.loads(read(ROOT / "Configuration.storekit"))
    if storekit.get("subscriptionGroups"):
        err("Configuration.storekit must not define subscription groups")
    products = storekit.get("products") or []
    if len(products) != 1:
        err("expected exactly one StoreKit product")
    else:
        product = products[0]
        if product.get("productID") != "com.lettertracedesk.fullalphabet":
            err("unexpected productID")
        if product.get("type") != "NonConsumable":
            err("product must be NonConsumable (no subscriptions)")
        if product.get("familyShareable") is not True:
            err("product must be familyShareable")
        price = float(product.get("displayPrice") or 0)
        if price < 3.99 or price > 4.99:
            err("local StoreKit displayPrice should be in the $3.99–$4.99 band")

    privacy = read(ROOT / "LetterTraceDesk" / "PrivacyInfo.xcprivacy")
    if "<false/>" not in privacy.split("NSPrivacyTracking")[1][:80]:
        err("PrivacyInfo must set NSPrivacyTracking to false")
    if "<key>NSPrivacyCollectedDataTypes</key>" not in privacy:
        err("PrivacyInfo missing collected data types")
    # empty collected array
    collected = privacy.split("NSPrivacyCollectedDataTypes")[1]
    if "<dict>" in collected.split("NSPrivacyAccessedAPITypes")[0]:
        err("PrivacyInfo should collect no data types")

    pbx = read(ROOT / "LetterTraceDesk.xcodeproj" / "project.pbxproj")
    if "IPHONEOS_DEPLOYMENT_TARGET = 17.0" not in pbx:
        err("deployment target must be iOS 17.0")
    if "com.lettertracedesk.app" not in pbx:
        err("bundle id missing from pbxproj")
    if "TARGETED_DEVICE_FAMILY = \"1,2\"" not in pbx:
        err("universal iPhone+iPad family missing")
    if "WKWebView" in pbx:
        err("WebKit unexpectedly linked")

    docs = "\n".join(
        read(p)
        for p in [
            ROOT / "README.md",
            ROOT / "docs" / "ASC-CHECKLIST.md",
            ROOT / "docs" / "APP-STORE-LISTING.md",
            ROOT / "docs" / "BRAD-MAC-TESTFLIGHT.md",
            ROOT / "docs" / "PRIVACY.md",
            ROOT / "docs" / "FENCES.md",
        ]
    )
    if "Data Not Collected" not in docs:
        err("listing/privacy must say Data Not Collected")
    if "not a curriculum" not in docs.lower() and "Not a curriculum" not in docs:
        err("must keep practice-helper / not a curriculum fence")
    if re.search(r"\$\d[\d,]{3,}", docs):
        err("possible invented revenue figure in docs")
    # no street-style addresses
    if re.search(r"\b\d{1,5} [A-Z][a-z]+ (Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd)\b", docs):
        err("personal/street address found in docs")

    listing = read(ROOT / "docs" / "APP-STORE-LISTING.md")

    def first_line_after(heading: str) -> str:
        match = re.search(rf"^## {re.escape(heading)}[^\n]*\n\n([^\n]+)", listing, re.MULTILINE)
        return match.group(1).rstrip() if match else ""

    metadata_limits = {
        "Name": (first_line_after("Name"), 30),
        "Subtitle": (first_line_after("Subtitle"), 30),
        "Promotional text": (first_line_after("Promotional text"), 170),
    }
    keyword_match = re.search(r"^## Keywords[^\n]*\n.*?^`([^`]+)`", listing, re.MULTILINE | re.DOTALL)
    metadata_limits["Keywords"] = (keyword_match.group(1) if keyword_match else "", 100)
    for field, (value, limit) in metadata_limits.items():
        if not value:
            err(f"could not parse {field} from listing draft")
        elif len(value) > limit:
            err(f"{field} is {len(value)} characters; ASC limit is {limit}")

    privacy_files = [
        read(ROOT / "docs" / "PRIVACY.md"),
        read(ROOT / "docs" / "privacy.html"),
    ]
    if any("SUPPORT_EMAIL_OR_HTTPS_FORM" in content for content in privacy_files):
        warn("replace SUPPORT_EMAIL_OR_HTTPS_FORM before hosting the privacy policy")

    icon = ROOT / "LetterTraceDesk" / "Assets.xcassets" / "AppIcon.appiconset" / "AppIcon.png"
    if icon.exists() and icon.stat().st_size < 10_000:
        err("AppIcon.png looks too small for a 1024px store icon")

    import subprocess

    logic = subprocess.run(
        [sys.executable, str(ROOT / "scripts" / "test_core_logic.py")],
        cwd=ROOT,
        capture_output=True,
        text=True,
    )
    if logic.returncode != 0:
        err("core logic tests failed\n" + logic.stdout + logic.stderr)

    if errors:
        print("FAIL")
        for item in errors:
            print(" -", item)
        return 1
    print("OK — Letter Trace Desk static checks passed")
    for item in warnings:
        print("warn:", item)
    print(f"swift files: {len(swift_files)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
