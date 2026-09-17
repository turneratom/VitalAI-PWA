#!/usr/bin/env python3
"""Generate the App Store icon and Xcode project file for Letter Trace Desk."""
from __future__ import annotations

import hashlib
import json
import math
import os
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / "LetterTraceDesk"
PROJ = ROOT / "LetterTraceDesk.xcodeproj"


def oid(*parts: str) -> str:
    return hashlib.md5("|".join(parts).encode()).hexdigest()[:24].upper()


def write_png(path: Path, width: int, height: int, rgba: bytes) -> None:
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data) & 0xFFFFFFFF
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = bytearray()
    row = width * 4
    for y in range(height):
        raw.append(0)
        raw.extend(rgba[y * row : (y + 1) * row])
    png = b"\x89PNG\r\n\x1a\n"
    png += chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
    png += chunk(b"IDAT", zlib.compress(bytes(raw), 9))
    png += chunk(b"IEND", b"")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(png)


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3)) + (255,)


def generate_icon() -> None:
    size = 1024
    px = bytearray(size * size * 4)
    bg = (247, 249, 252)
    blue = (61, 110, 168)
    green = (90, 143, 123)
    white = (255, 255, 255)
    cx = cy = size / 2
    radius = 430

    def setp(x, y, rgb):
        if 0 <= x < size and 0 <= y < size:
            i = (y * size + x) * 4
            px[i : i + 4] = bytes((*rgb[:3], 255))

    def in_thick_line(x, y, x0, y0, x1, y1, width):
        vx, vy = x1 - x0, y1 - y0
        length = math.hypot(vx, vy) or 1
        ux, uy = vx / length, vy / length
        wx, wy = x - x0, y - y0
        t = wx * ux + wy * uy
        t = max(0, min(length, t))
        px_, py_ = x0 + ux * t, y0 + uy * t
        return math.hypot(x - px_, y - py_) <= width

    for y in range(size):
        for x in range(size):
            dx, dy = x - cx, y - cy
            d = math.hypot(dx, dy)
            # background
            rgb = bg
            # dotted ring
            if 458 <= d <= 478:
                ang = (math.atan2(dy, dx) + math.pi) / (2 * math.pi)
                if (ang * 28) % 1 < 0.55:
                    rgb = mix(bg, blue, 0.45)
            # main circle with slight green-blue blend
            if d <= radius:
                t = max(0.0, min(1.0, (dx + 220) / 640))
                rgb = mix(blue, green, t * 0.35)
                # inner highlight
                hd = math.hypot(dx + 90, dy + 110)
                if hd < 220:
                    rgb = mix(rgb, white, 0.12)
            # letter A (opaque white strokes)
            if d <= radius - 8:
                left = in_thick_line(x, y, 512, 300, 360, 700, 38)
                right = in_thick_line(x, y, 512, 300, 664, 700, 38)
                bar = in_thick_line(x, y, 430, 540, 594, 540, 32)
                if left or right or bar:
                    rgb = white
            setp(x, y, rgb)

    dest = APP / "Assets.xcassets" / "AppIcon.appiconset" / "AppIcon.png"
    write_png(dest, size, size, bytes(px))


def write_assets() -> None:
    (APP / "Assets.xcassets").mkdir(parents=True, exist_ok=True)
    (APP / "Assets.xcassets" / "Contents.json").write_text(
        json.dumps({"info": {"author": "xcode", "version": 1}}, indent=2) + "\n"
    )
    accent = APP / "Assets.xcassets" / "AccentColor.colorset"
    accent.mkdir(parents=True, exist_ok=True)
    (accent / "Contents.json").write_text(
        json.dumps(
            {
                "colors": [
                    {
                        "color": {
                            "color-space": "srgb",
                            "components": {
                                "alpha": "1.000",
                                "blue": "0.659",
                                "green": "0.431",
                                "red": "0.239",
                            },
                        },
                        "idiom": "universal",
                    }
                ],
                "info": {"author": "xcode", "version": 1},
            },
            indent=2,
        )
        + "\n"
    )
    iconset = APP / "Assets.xcassets" / "AppIcon.appiconset"
    iconset.mkdir(parents=True, exist_ok=True)
    (iconset / "Contents.json").write_text(
        json.dumps(
            {
                "images": [
                    {
                        "filename": "AppIcon.png",
                        "idiom": "universal",
                        "platform": "ios",
                        "size": "1024x1024",
                    }
                ],
                "info": {"author": "xcode", "version": 1},
            },
            indent=2,
        )
        + "\n"
    )


APP_SWIFT = [
    "LetterTraceDeskApp.swift",
    "Theme/AppTheme.swift",
    "Models/LetterCatalog.swift",
    "Models/SessionPlan.swift",
    "Models/ParentGateChallenge.swift",
    "Models/TraceCoverage.swift",
    "Models/AppSettings.swift",
    "Models/DeskModel.swift",
    "Store/UnlockStore.swift",
    "Speech/LetterSpeaker.swift",
    "Tracing/LetterGlyph.swift",
    "Tracing/TraceCanvas.swift",
    "Views/Components.swift",
    "Views/WelcomeView.swift",
    "Views/PickLettersView.swift",
    "Views/TraceView.swift",
    "Views/DoneView.swift",
    "Views/ParentGateView.swift",
    "Views/ParentSettingsView.swift",
    "Views/UnlockView.swift",
    "Views/RootView.swift",
]

TEST_SWIFT = [
    "LetterCatalogTests.swift",
    "SessionPlanTests.swift",
    "ParentGateTests.swift",
    "TraceCoverageTests.swift",
]


def pbx_build_file(file_id: str, comment: str) -> tuple[str, str]:
    bid = oid("build", file_id)
    return bid, f"\t\t{bid} /* {comment} in Sources */ = {{isa = PBXBuildFile; fileRef = {file_id} /* {comment} */; }};\n"


def generate_pbxproj() -> None:
    ids = {
        "project": oid("project"),
        "app_target": oid("target", "app"),
        "test_target": oid("target", "test"),
        "app_sources": oid("phase", "app_sources"),
        "test_sources": oid("phase", "test_sources"),
        "app_frameworks": oid("phase", "app_fw"),
        "app_resources": oid("phase", "app_res"),
        "group_root": oid("group", "root"),
        "group_app": oid("group", "app"),
        "group_tests": oid("group", "tests"),
        "group_products": oid("group", "products"),
        "group_frameworks": oid("group", "frameworks"),
        "group_theme": oid("group", "theme"),
        "group_models": oid("group", "models"),
        "group_store": oid("group", "store"),
        "group_speech": oid("group", "speech"),
        "group_tracing": oid("group", "tracing"),
        "group_views": oid("group", "views"),
        "app_product": oid("product", "app"),
        "test_product": oid("product", "tests"),
        "assets": oid("file", "assets"),
        "privacy": oid("file", "privacy"),
        "plist": oid("file", "plist"),
        "storekit": oid("file", "storekit"),
        "storekit_fw": oid("file", "fw.storekit"),
        "av_fw": oid("file", "fw.av"),
        "config_list_proj": oid("cfglist", "proj"),
        "config_list_app": oid("cfglist", "app"),
        "config_list_test": oid("cfglist", "test"),
        "cfg_proj_debug": oid("cfg", "proj.debug"),
        "cfg_proj_release": oid("cfg", "proj.release"),
        "cfg_app_debug": oid("cfg", "app.debug"),
        "cfg_app_release": oid("cfg", "app.release"),
        "cfg_test_debug": oid("cfg", "test.debug"),
        "cfg_test_release": oid("cfg", "test.release"),
    }

    file_refs = {}
    build_files = {}
    for rel in APP_SWIFT:
        name = Path(rel).name
        fid = oid("file", rel)
        file_refs[rel] = fid
        bid = oid("build", rel)
        build_files[rel] = bid

    test_refs = {}
    test_builds = {}
    for rel in TEST_SWIFT:
        fid = oid("testfile", rel)
        test_refs[rel] = fid
        test_builds[rel] = oid("testbuild", rel)

    assets_build = oid("build", "assets")
    privacy_build = oid("build", "privacy")
    storekit_fw_build = oid("build", "fw.storekit")
    av_fw_build = oid("build", "fw.av")

    lines = []
    a = lines.append
    a("// !$*UTF8*$!\n")
    a("{\n")
    a("\tarchiveVersion = 1;\n")
    a("\tclasses = {\n")
    a("\t};\n")
    a("\tobjectVersion = 56;\n")
    a("\tobjects = {\n\n")

    a("/* Begin PBXBuildFile section */\n")
    for rel in APP_SWIFT:
        name = Path(rel).name
        a(f"\t\t{build_files[rel]} /* {name} in Sources */ = {{isa = PBXBuildFile; fileRef = {file_refs[rel]} /* {name} */; }};\n")
    for rel in TEST_SWIFT:
        a(f"\t\t{test_builds[rel]} /* {rel} in Sources */ = {{isa = PBXBuildFile; fileRef = {test_refs[rel]} /* {rel} */; }};\n")
    a(f"\t\t{assets_build} /* Assets.xcassets in Resources */ = {{isa = PBXBuildFile; fileRef = {ids['assets']} /* Assets.xcassets */; }};\n")
    a(f"\t\t{privacy_build} /* PrivacyInfo.xcprivacy in Resources */ = {{isa = PBXBuildFile; fileRef = {ids['privacy']} /* PrivacyInfo.xcprivacy */; }};\n")
    a(f"\t\t{storekit_fw_build} /* StoreKit.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['storekit_fw']} /* StoreKit.framework */; }};\n")
    a(f"\t\t{av_fw_build} /* AVFoundation.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['av_fw']} /* AVFoundation.framework */; }};\n")
    a("/* End PBXBuildFile section */\n\n")

    a("/* Begin PBXFileReference section */\n")
    a(f"\t\t{ids['app_product']} /* LetterTraceDesk.app */ = {{isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = LetterTraceDesk.app; sourceTree = BUILT_PRODUCTS_DIR; }};\n")
    a(f"\t\t{ids['test_product']} /* LetterTraceDeskTests.xctest */ = {{isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = LetterTraceDeskTests.xctest; sourceTree = BUILT_PRODUCTS_DIR; }};\n")
    for rel in APP_SWIFT:
        name = Path(rel).name
        a(f"\t\t{file_refs[rel]} /* {name} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {name}; sourceTree = \"<group>\"; }};\n")
    a(f"\t\t{ids['assets']} /* Assets.xcassets */ = {{isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = \"<group>\"; }};\n")
    a(f"\t\t{ids['privacy']} /* PrivacyInfo.xcprivacy */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = PrivacyInfo.xcprivacy; sourceTree = \"<group>\"; }};\n")
    a(f"\t\t{ids['plist']} /* Info.plist */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = \"<group>\"; }};\n")
    a(f"\t\t{ids['storekit']} /* Configuration.storekit */ = {{isa = PBXFileReference; lastKnownFileType = text; path = Configuration.storekit; sourceTree = \"<group>\"; }};\n")
    for rel in TEST_SWIFT:
        a(f"\t\t{test_refs[rel]} /* {rel} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {rel}; sourceTree = \"<group>\"; }};\n")
    a(f"\t\t{ids['storekit_fw']} /* StoreKit.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = StoreKit.framework; path = System/Library/Frameworks/StoreKit.framework; sourceTree = SDKROOT; }};\n")
    a(f"\t\t{ids['av_fw']} /* AVFoundation.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = AVFoundation.framework; path = System/Library/Frameworks/AVFoundation.framework; sourceTree = SDKROOT; }};\n")
    a("/* End PBXFileReference section */\n\n")

    def group(gid: str, name: str, children: list[str], path: str | None = None) -> None:
        a(f"\t\t{gid} /* {name} */ = {{\n")
        a("\t\t\tisa = PBXGroup;\n")
        a("\t\t\tchildren = (\n")
        for c in children:
            a(f"\t\t\t\t{c}\n")
        a("\t\t\t);\n")
        if path:
            a(f"\t\t\tpath = {path};\n")
        a(f"\t\t\tsourceTree = \"<group>\";\n")
        a("\t\t};\n")

    a("/* Begin PBXGroup section */\n")
    group(
        ids["group_root"],
        "LetterTraceDesk",
        [
            f"{ids['group_app']} /* LetterTraceDesk */,",
            f"{ids['group_tests']} /* LetterTraceDeskTests */,",
            f"{ids['storekit']} /* Configuration.storekit */,",
            f"{ids['group_frameworks']} /* Frameworks */,",
            f"{ids['group_products']} /* Products */,",
        ],
    )
    group(
        ids["group_products"],
        "Products",
        [
            f"{ids['app_product']} /* LetterTraceDesk.app */,",
            f"{ids['test_product']} /* LetterTraceDeskTests.xctest */,",
        ],
    )
    group(
        ids["group_frameworks"],
        "Frameworks",
        [
            f"{ids['storekit_fw']} /* StoreKit.framework */,",
            f"{ids['av_fw']} /* AVFoundation.framework */,",
        ],
    )

    def files_in(folder: str) -> list[str]:
        out = []
        for rel in APP_SWIFT:
            parent = str(Path(rel).parent)
            if parent == folder:
                out.append(f"{file_refs[rel]} /* {Path(rel).name} */,")
        return out

    # fix the typo in f-string above - I'll write groups explicitly

    lines.pop()  # we'll rewrite groups more carefully... actually I already started. Let me not pop.

    # Wait I used an invalid f-string in files_in that's not called yet. I'll just write explicit groups.

    # Unused first draft kept from being called; generate_pbxproj_v2 is the source of truth.
    return


COMMON_DEBUG = r"""
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = dwarf;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_TESTABILITY = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu17;
				GCC_DYNAMIC_NO_PIC = NO;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREPROCESSOR_DEFINITIONS = (
					"DEBUG=1",
					"$(inherited)",
				);
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = INCLUDE_SOURCE;
				MTL_FAST_MATH = YES;
				ONLY_ACTIVE_ARCH = YES;
				SDKROOT = iphoneos;
				SWIFT_ACTIVE_COMPILATION_CONDITIONS = "DEBUG $(inherited)";
				SWIFT_OPTIMIZATION_LEVEL = "-Onone";
				SWIFT_STRICT_CONCURRENCY = targeted;
				SWIFT_VERSION = 5.0;
"""

COMMON_RELEASE = r"""
				ALWAYS_SEARCH_USER_PATHS = NO;
				CLANG_ANALYZER_NONNULL = YES;
				CLANG_ANALYZER_NUMBER_OBJECT_CONVERSION = YES_AGGRESSIVE;
				CLANG_CXX_LANGUAGE_STANDARD = "gnu++20";
				CLANG_ENABLE_MODULES = YES;
				CLANG_ENABLE_OBJC_ARC = YES;
				CLANG_ENABLE_OBJC_WEAK = YES;
				CLANG_WARN_BLOCK_CAPTURE_AUTORELEASING = YES;
				CLANG_WARN_BOOL_CONVERSION = YES;
				CLANG_WARN_COMMA = YES;
				CLANG_WARN_CONSTANT_CONVERSION = YES;
				CLANG_WARN_DEPRECATED_OBJC_IMPLEMENTATIONS = YES;
				CLANG_WARN_DIRECT_OBJC_ISA_USAGE = YES_ERROR;
				CLANG_WARN_DOCUMENTATION_COMMENTS = YES;
				CLANG_WARN_EMPTY_BODY = YES;
				CLANG_WARN_ENUM_CONVERSION = YES;
				CLANG_WARN_INFINITE_RECURSION = YES;
				CLANG_WARN_INT_CONVERSION = YES;
				CLANG_WARN_NON_LITERAL_NULL_CONVERSION = YES;
				CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF = YES;
				CLANG_WARN_OBJC_LITERAL_CONVERSION = YES;
				CLANG_WARN_OBJC_ROOT_CLASS = YES_ERROR;
				CLANG_WARN_QUOTED_INCLUDE_IN_FRAMEWORK_HEADER = YES;
				CLANG_WARN_RANGE_LOOP_ANALYSIS = YES;
				CLANG_WARN_STRICT_PROTOTYPES = YES;
				CLANG_WARN_SUSPICIOUS_MOVE = YES;
				CLANG_WARN_UNGUARDED_AVAILABILITY = YES_AGGRESSIVE;
				CLANG_WARN_UNREACHABLE_CODE = YES;
				CLANG_WARN__DUPLICATE_METHOD_MATCH = YES;
				COPY_PHASE_STRIP = NO;
				DEBUG_INFORMATION_FORMAT = "dwarf-with-dsym";
				ENABLE_NS_ASSERTIONS = NO;
				ENABLE_STRICT_OBJC_MSGSEND = YES;
				ENABLE_USER_SCRIPT_SANDBOXING = YES;
				GCC_C_LANGUAGE_STANDARD = gnu17;
				GCC_NO_COMMON_BLOCKS = YES;
				GCC_WARN_64_TO_32_BIT_CONVERSION = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES_ERROR;
				GCC_WARN_UNDECLARED_SELECTOR = YES;
				GCC_WARN_UNINITIALIZED_AUTOS = YES_AGGRESSIVE;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				LOCALIZATION_PREFERS_STRING_CATALOGS = YES;
				MTL_ENABLE_DEBUG_INFO = NO;
				MTL_FAST_MATH = YES;
				SDKROOT = iphoneos;
				SWIFT_COMPILATION_MODE = wholemodule;
				SWIFT_STRICT_CONCURRENCY = targeted;
				SWIFT_VERSION = 5.0;
				VALIDATE_PRODUCT = YES;
"""

APP_SETTINGS = r"""
				ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
				ASSETCATALOG_COMPILER_GLOBAL_ACCENT_COLOR_NAME = AccentColor;
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				ENABLE_PREVIEWS = YES;
				GENERATE_INFOPLIST_FILE = YES;
				INFOPLIST_FILE = LetterTraceDesk/Info.plist;
				INFOPLIST_KEY_CFBundleDisplayName = "Letter Trace Desk";
				INFOPLIST_KEY_LSApplicationCategoryType = "public.app-category.education";
				INFOPLIST_KEY_UIApplicationSceneManifest_Generation = YES;
				INFOPLIST_KEY_UIApplicationSupportsIndirectInputEvents = YES;
				INFOPLIST_KEY_UILaunchScreen_Generation = YES;
				INFOPLIST_KEY_UISupportedInterfaceOrientations = UIInterfaceOrientationPortrait;
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPad = "UIInterfaceOrientationPortrait UIInterfaceOrientationPortraitUpsideDown UIInterfaceOrientationLandscapeLeft UIInterfaceOrientationLandscapeRight";
				INFOPLIST_KEY_UISupportedInterfaceOrientations_iPhone = UIInterfaceOrientationPortrait;
				LD_RUNPATH_SEARCH_PATHS = (
					"$(inherited)",
					"@executable_path/Frameworks",
				);
				MARKETING_VERSION = 1.0.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.lettertracedesk.app;
				PRODUCT_NAME = LetterTraceDesk;
				SUPPORTED_PLATFORMS = "iphoneos iphonesimulator";
				SUPPORTS_MACCATALYST = NO;
				SUPPORTS_MAC_DESIGNED_FOR_IPHONE_IPAD = NO;
				SWIFT_EMIT_LOC_STRINGS = YES;
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2";
"""

TEST_SETTINGS = r"""
				BUNDLE_LOADER = "$(TEST_HOST)";
				CODE_SIGN_STYLE = Automatic;
				CURRENT_PROJECT_VERSION = 1;
				GENERATE_INFOPLIST_FILE = YES;
				IPHONEOS_DEPLOYMENT_TARGET = 17.0;
				MARKETING_VERSION = 1.0.0;
				PRODUCT_BUNDLE_IDENTIFIER = com.lettertracedesk.app.tests;
				PRODUCT_NAME = "$(TARGET_NAME)";
				SWIFT_VERSION = 5.0;
				TARGETED_DEVICE_FAMILY = "1,2";
				TEST_HOST = "$(BUILT_PRODUCTS_DIR)/LetterTraceDesk.app/$(BUNDLE_EXECUTABLE_FOLDER_PATH)/LetterTraceDesk";
"""


def generate_pbxproj_v2() -> None:
    ids = {k: oid("id", k) for k in [
        "project", "app_target", "test_target",
        "app_sources", "test_sources", "app_frameworks", "app_resources",
        "group_root", "group_app", "group_tests", "group_products", "group_frameworks",
        "group_theme", "group_models", "group_store", "group_speech", "group_tracing", "group_views",
        "app_product", "test_product", "assets", "privacy", "plist", "storekit",
        "storekit_fw", "av_fw",
        "config_list_proj", "config_list_app", "config_list_test",
        "cfg_proj_debug", "cfg_proj_release", "cfg_app_debug", "cfg_app_release",
        "cfg_test_debug", "cfg_test_release",
        "assets_build", "privacy_build", "storekit_fw_build", "av_fw_build",
    ]}

    app_file = {}
    app_build = {}
    for rel in APP_SWIFT:
        app_file[rel] = oid("src", rel)
        app_build[rel] = oid("bsrc", rel)
    test_file = {rel: oid("tsrc", rel) for rel in TEST_SWIFT}
    test_build = {rel: oid("tbsrc", rel) for rel in TEST_SWIFT}

    def cref(fid: str, comment: str) -> str:
        return f"{fid} /* {comment} */"

    out = []
    o = out.append
    o("// !$*UTF8*$!\n{\n\tarchiveVersion = 1;\n\tclasses = {\n\t};\n\tobjectVersion = 56;\n\tobjects = {\n\n")

    o("/* Begin PBXBuildFile section */\n")
    for rel in APP_SWIFT:
        name = Path(rel).name
        o(f"\t\t{app_build[rel]} /* {name} in Sources */ = {{isa = PBXBuildFile; fileRef = {app_file[rel]} /* {name} */; }};\n")
    for rel in TEST_SWIFT:
        o(f"\t\t{test_build[rel]} /* {rel} in Sources */ = {{isa = PBXBuildFile; fileRef = {test_file[rel]} /* {rel} */; }};\n")
    o(f"\t\t{ids['assets_build']} /* Assets.xcassets in Resources */ = {{isa = PBXBuildFile; fileRef = {ids['assets']} /* Assets.xcassets */; }};\n")
    o(f"\t\t{ids['privacy_build']} /* PrivacyInfo.xcprivacy in Resources */ = {{isa = PBXBuildFile; fileRef = {ids['privacy']} /* PrivacyInfo.xcprivacy */; }};\n")
    o(f"\t\t{ids['storekit_fw_build']} /* StoreKit.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['storekit_fw']} /* StoreKit.framework */; }};\n")
    o(f"\t\t{ids['av_fw_build']} /* AVFoundation.framework in Frameworks */ = {{isa = PBXBuildFile; fileRef = {ids['av_fw']} /* AVFoundation.framework */; }};\n")
    o("/* End PBXBuildFile section */\n\n")

    o("/* Begin PBXFileReference section */\n")
    o(f"\t\t{ids['app_product']} /* LetterTraceDesk.app */ = {{isa = PBXFileReference; explicitFileType = wrapper.application; includeInIndex = 0; path = LetterTraceDesk.app; sourceTree = BUILT_PRODUCTS_DIR; }};\n")
    o(f"\t\t{ids['test_product']} /* LetterTraceDeskTests.xctest */ = {{isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = LetterTraceDeskTests.xctest; sourceTree = BUILT_PRODUCTS_DIR; }};\n")
    for rel in APP_SWIFT:
        name = Path(rel).name
        o(f"\t\t{app_file[rel]} /* {name} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {name}; sourceTree = \"<group>\"; }};\n")
    o(f"\t\t{ids['assets']} /* Assets.xcassets */ = {{isa = PBXFileReference; lastKnownFileType = folder.assetcatalog; path = Assets.xcassets; sourceTree = \"<group>\"; }};\n")
    o(f"\t\t{ids['privacy']} /* PrivacyInfo.xcprivacy */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = PrivacyInfo.xcprivacy; sourceTree = \"<group>\"; }};\n")
    o(f"\t\t{ids['plist']} /* Info.plist */ = {{isa = PBXFileReference; lastKnownFileType = text.plist.xml; path = Info.plist; sourceTree = \"<group>\"; }};\n")
    o(f"\t\t{ids['storekit']} /* Configuration.storekit */ = {{isa = PBXFileReference; lastKnownFileType = text; path = Configuration.storekit; sourceTree = \"<group>\"; }};\n")
    for rel in TEST_SWIFT:
        o(f"\t\t{test_file[rel]} /* {rel} */ = {{isa = PBXFileReference; lastKnownFileType = sourcecode.swift; path = {rel}; sourceTree = \"<group>\"; }};\n")
    o(f"\t\t{ids['storekit_fw']} /* StoreKit.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = StoreKit.framework; path = System/Library/Frameworks/StoreKit.framework; sourceTree = SDKROOT; }};\n")
    o(f"\t\t{ids['av_fw']} /* AVFoundation.framework */ = {{isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = AVFoundation.framework; path = System/Library/Frameworks/AVFoundation.framework; sourceTree = SDKROOT; }};\n")
    o("/* End PBXFileReference section */\n\n")

    def emit_group(gid: str, name: str, children: list[tuple[str, str]], path: str | None = None) -> None:
        o(f"\t\t{gid} /* {name} */ = {{\n\t\t\tisa = PBXGroup;\n\t\t\tchildren = (\n")
        for cid, cname in children:
            o(f"\t\t\t\t{cid} /* {cname} */,\n")
        o("\t\t\t);\n")
        if path is not None:
            o(f"\t\t\tpath = {path};\n")
        o("\t\t\tsourceTree = \"<group>\";\n\t\t};\n")

    # The f-string `{cname */}` is wrong. Use proper format.

    def emit_group2(gid: str, name: str, children: list[tuple[str, str]], path: str | None = None) -> None:
        o(f"\t\t{gid} /* {name} */ = {{\n\t\t\tisa = PBXGroup;\n\t\t\tchildren = (\n")
        for cid, cname in children:
            o("\t\t\t\t%s /* %s */,\n" % (cid, cname))
        o("\t\t\t);\n")
        if path is not None:
            o("\t\t\tpath = %s;\n" % path)
        o("\t\t\tsourceTree = \"<group>\";\n\t\t};\n")

    o("/* Begin PBXGroup section */\n")
    emit_group2(ids["group_root"], "LetterTraceDesk", [
        (ids["group_app"], "LetterTraceDesk"),
        (ids["group_tests"], "LetterTraceDeskTests"),
        (ids["storekit"], "Configuration.storekit"),
        (ids["group_frameworks"], "Frameworks"),
        (ids["group_products"], "Products"),
    ])
    emit_group2(ids["group_products"], "Products", [
        (ids["app_product"], "LetterTraceDesk.app"),
        (ids["test_product"], "LetterTraceDeskTests.xctest"),
    ])
    emit_group2(ids["group_frameworks"], "Frameworks", [
        (ids["storekit_fw"], "StoreKit.framework"),
        (ids["av_fw"], "AVFoundation.framework"),
    ])

    def children_for(folder: str) -> list[tuple[str, str]]:
        items = []
        for rel in APP_SWIFT:
            if str(Path(rel).parent) == folder:
                items.append((app_file[rel], Path(rel).name))
        return items

    app_children = [
        (app_file["LetterTraceDeskApp.swift"], "LetterTraceDeskApp.swift"),
        (ids["group_theme"], "Theme"),
        (ids["group_models"], "Models"),
        (ids["group_store"], "Store"),
        (ids["group_speech"], "Speech"),
        (ids["group_tracing"], "Tracing"),
        (ids["group_views"], "Views"),
        (ids["assets"], "Assets.xcassets"),
        (ids["privacy"], "PrivacyInfo.xcprivacy"),
        (ids["plist"], "Info.plist"),
    ]
    emit_group2(ids["group_app"], "LetterTraceDesk", app_children, path="LetterTraceDesk")
    emit_group2(ids["group_theme"], "Theme", children_for("Theme"), path="Theme")
    emit_group2(ids["group_models"], "Models", children_for("Models"), path="Models")
    emit_group2(ids["group_store"], "Store", children_for("Store"), path="Store")
    emit_group2(ids["group_speech"], "Speech", children_for("Speech"), path="Speech")
    emit_group2(ids["group_tracing"], "Tracing", children_for("Tracing"), path="Tracing")
    emit_group2(ids["group_views"], "Views", children_for("Views"), path="Views")
    emit_group2(ids["group_tests"], "LetterTraceDeskTests", [(test_file[r], r) for r in TEST_SWIFT], path="LetterTraceDeskTests")
    o("/* End PBXGroup section */\n\n")

    o("/* Begin PBXFrameworksBuildPhase section */\n")
    o(f"\t\t{ids['app_frameworks']} /* Frameworks */ = {{\n\t\t\tisa = PBXFrameworksBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (\n")
    o(f"\t\t\t\t{ids['storekit_fw_build']} /* StoreKit.framework in Frameworks */,\n")
    o(f"\t\t\t\t{ids['av_fw_build']} /* AVFoundation.framework in Frameworks */,\n")
    o("\t\t\t);\n\t\t\trunOnlyForDeploymentPostprocessing = 0;\n\t\t};\n")
    o("/* End PBXFrameworksBuildPhase section */\n\n")

    o("/* Begin PBXNativeTarget section */\n")
    o(f"""		{ids['app_target']} /* LetterTraceDesk */ = {{
			isa = PBXNativeTarget;
			buildConfigurationList = {ids['config_list_app']} /* Build configuration list for PBXNativeTarget "LetterTraceDesk" */;
			buildPhases = (
				{ids['app_sources']} /* Sources */,
				{ids['app_frameworks']} /* Frameworks */,
				{ids['app_resources']} /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = LetterTraceDesk;
			productName = LetterTraceDesk;
			productReference = {ids['app_product']} /* LetterTraceDesk.app */;
			productType = "com.apple.product-type.application";
		}};
		{ids['test_target']} /* LetterTraceDeskTests */ = {{
			isa = PBXNativeTarget;
			buildConfigurationList = {ids['config_list_test']} /* Build configuration list for PBXNativeTarget "LetterTraceDeskTests" */;
			buildPhases = (
				{ids['test_sources']} /* Sources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = LetterTraceDeskTests;
			productName = LetterTraceDeskTests;
			productReference = {ids['test_product']} /* LetterTraceDeskTests.xctest */;
			productType = "com.apple.product-type.bundle.unit-test";
		}};
""")
    o("/* End PBXNativeTarget section */\n\n")

    o("/* Begin PBXProject section */\n")
    o(f"""		{ids['project']} /* Project object */ = {{
			isa = PBXProject;
			attributes = {{
				BuildIndependentTargetsInParallel = 1;
				LastSwiftUpdateCheck = 1540;
				LastUpgradeCheck = 1540;
				TargetAttributes = {{
					{ids['app_target']} = {{
						CreatedOnToolsVersion = 15.4;
					}};
					{ids['test_target']} = {{
						CreatedOnToolsVersion = 15.4;
						TestTargetID = {ids['app_target']};
					}};
				}};
			}};
			buildConfigurationList = {ids['config_list_proj']} /* Build configuration list for PBXProject "LetterTraceDesk" */;
			compatibilityVersion = "Xcode 14.0";
			developmentRegion = en;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
				Base,
			);
			mainGroup = {ids['group_root']};
			productRefGroup = {ids['group_products']} /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				{ids['app_target']} /* LetterTraceDesk */,
				{ids['test_target']} /* LetterTraceDeskTests */,
			);
		}};
""")
    o("/* End PBXProject section */\n\n")

    o("/* Begin PBXResourcesBuildPhase section */\n")
    o(f"\t\t{ids['app_resources']} /* Resources */ = {{\n\t\t\tisa = PBXResourcesBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (\n")
    o(f"\t\t\t\t{ids['assets_build']} /* Assets.xcassets in Resources */,\n")
    o(f"\t\t\t\t{ids['privacy_build']} /* PrivacyInfo.xcprivacy in Resources */,\n")
    o("\t\t\t);\n\t\t\trunOnlyForDeploymentPostprocessing = 0;\n\t\t};\n")
    o("/* End PBXResourcesBuildPhase section */\n\n")

    o("/* Begin PBXSourcesBuildPhase section */\n")
    o(f"\t\t{ids['app_sources']} /* Sources */ = {{\n\t\t\tisa = PBXSourcesBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (\n")
    for rel in APP_SWIFT:
        o(f"\t\t\t\t{app_build[rel]} /* {Path(rel).name} in Sources */,\n")
    o("\t\t\t);\n\t\t\trunOnlyForDeploymentPostprocessing = 0;\n\t\t};\n")
    o(f"\t\t{ids['test_sources']} /* Sources */ = {{\n\t\t\tisa = PBXSourcesBuildPhase;\n\t\t\tbuildActionMask = 2147483647;\n\t\t\tfiles = (\n")
    for rel in TEST_SWIFT:
        o(f"\t\t\t\t{test_build[rel]} /* {rel} in Sources */,\n")
    o("\t\t\t);\n\t\t\trunOnlyForDeploymentPostprocessing = 0;\n\t\t};\n")
    o("/* End PBXSourcesBuildPhase section */\n\n")

    def xcconfig(cid: str, name: str, body: str) -> None:
        o(f"\t\t{cid} /* {name} */ = {{\n\t\t\tisa = XCBuildConfiguration;\n\t\t\tbuildSettings = {{{body}\t\t\t}};\n\t\t\tname = {name};\n\t\t}};\n")

    o("/* Begin XCBuildConfiguration section */\n")
    xcconfig(ids["cfg_proj_debug"], "Debug", COMMON_DEBUG)
    xcconfig(ids["cfg_proj_release"], "Release", COMMON_RELEASE)
    xcconfig(ids["cfg_app_debug"], "Debug", APP_SETTINGS)
    xcconfig(ids["cfg_app_release"], "Release", APP_SETTINGS)
    xcconfig(ids["cfg_test_debug"], "Debug", TEST_SETTINGS)
    xcconfig(ids["cfg_test_release"], "Release", TEST_SETTINGS)
    o("/* End XCBuildConfiguration section */\n\n")

    def cfglist(cid: str, title: str, debug_id: str, release_id: str) -> None:
        o(f"""		{cid} /* {title} */ = {{
			isa = XCConfigurationList;
			buildConfigurations = (
				{debug_id} /* Debug */,
				{release_id} /* Release */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Release;
		}};
""")

    o("/* Begin XCConfigurationList section */\n")
    cfglist(ids["config_list_proj"], 'Build configuration list for PBXProject "LetterTraceDesk"', ids["cfg_proj_debug"], ids["cfg_proj_release"])
    cfglist(ids["config_list_app"], 'Build configuration list for PBXNativeTarget "LetterTraceDesk"', ids["cfg_app_debug"], ids["cfg_app_release"])
    cfglist(ids["config_list_test"], 'Build configuration list for PBXNativeTarget "LetterTraceDeskTests"', ids["cfg_test_debug"], ids["cfg_test_release"])
    o("/* End XCConfigurationList section */\n")

    o(f"\t}};\n\trootObject = {ids['project']} /* Project object */;\n}}\n")

    PROJ.mkdir(parents=True, exist_ok=True)
    (PROJ / "project.pbxproj").write_text("".join(out))

    workspace = PROJ / "project.xcworkspace"
    workspace.mkdir(parents=True, exist_ok=True)
    (workspace / "contents.xcworkspacedata").write_text(
        """<?xml version="1.0" encoding="UTF-8"?>
<Workspace
   version = "1.0">
   <FileRef
      location = "self:">
   </FileRef>
</Workspace>
"""
    )
    schemes = PROJ / "xcshareddata" / "xcschemes"
    schemes.mkdir(parents=True, exist_ok=True)
    (schemes / "LetterTraceDesk.xcscheme").write_text(
        f"""<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1540"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "{ids['app_target']}"
               BuildableName = "LetterTraceDesk.app"
               BlueprintName = "LetterTraceDesk"
               ReferencedContainer = "container:LetterTraceDesk.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      shouldAutocreateTestPlan = "YES">
      <Testables>
         <TestableReference
            skipped = "NO"
            parallelizable = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "{ids['test_target']}"
               BuildableName = "LetterTraceDeskTests.xctest"
               BlueprintName = "LetterTraceDeskTests"
               ReferencedContainer = "container:LetterTraceDesk.xcodeproj">
            </BuildableReference>
         </TestableReference>
      </Testables>
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "{ids['app_target']}"
            BuildableName = "LetterTraceDesk.app"
            BlueprintName = "LetterTraceDesk"
            ReferencedContainer = "container:LetterTraceDesk.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
      <StoreKitConfigurationFileReference
         identifier = "../../Configuration.storekit">
      </StoreKitConfigurationFileReference>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Release"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "{ids['app_target']}"
            BuildableName = "LetterTraceDesk.app"
            BlueprintName = "LetterTraceDesk"
            ReferencedContainer = "container:LetterTraceDesk.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
"""
    )
    print("Wrote", PROJ / "project.pbxproj")
    print("app target", ids["app_target"])


if __name__ == "__main__":
    write_assets()
    generate_icon()
    generate_pbxproj_v2()
    icon = APP / "Assets.xcassets" / "AppIcon.appiconset" / "AppIcon.png"
    print("icon bytes", icon.stat().st_size)
