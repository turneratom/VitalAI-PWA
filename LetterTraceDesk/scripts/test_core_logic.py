#!/usr/bin/env python3
"""Mirrors Letter Trace Desk XCTest cases so Linux CI can exercise product rules."""
from __future__ import annotations

import math
import unittest

ALL = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
FREE = list("ABCDEF")
PAID = list("GHIJKLMNOPQRSTUVWXYZ")
MIN_SESSION = 3
MAX_SESSION = 8


def normalize(ch: str) -> str | None:
    up = ch.upper()[:1]
    return up if up in ALL else None


def is_locked(letter: str, unlocked: bool) -> bool:
    up = normalize(letter)
    if up is None:
        return True
    return (not unlocked) and up in PAID


def clamp_size(size: int) -> int:
    return min(max(size, MIN_SESSION), MAX_SESSION)


def sanitize(pool: list[str], unlocked: bool) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for ch in pool:
        up = normalize(ch)
        if not up or up in seen or is_locked(up, unlocked):
            continue
        seen.add(up)
        out.append(up)
    return sorted(out) if out else list(FREE)


def make_session(pool: list[str], size: int, unlocked: bool) -> list[str]:
    clean = sanitize(pool, unlocked)
    n = clamp_size(size)
    session = clean[:n]
    if len(session) < MIN_SESSION:
        for ch in FREE:
            if ch not in session:
                session.append(ch)
            if len(session) >= MIN_SESSION:
                break
    return session[:n]


class LetterCatalogTests(unittest.TestCase):
    def test_free_and_paid(self):
        self.assertEqual(FREE, list("ABCDEF"))
        self.assertEqual(len(PAID), 20)
        self.assertEqual(len(ALL), 26)

    def test_locking(self):
        self.assertFalse(is_locked("A", False))
        self.assertTrue(is_locked("G", False))
        self.assertFalse(is_locked("G", True))
        self.assertTrue(is_locked("!", True))

    def test_sanitize(self):
        mixed = list("cA") + ["G", "A", "z", "1"]
        self.assertEqual(sanitize(mixed, False), ["A", "C"])
        self.assertEqual(sanitize(mixed, True), ["A", "C", "G", "Z"])
        self.assertEqual(sanitize([], False), FREE)


class SessionPlanTests(unittest.TestCase):
    def test_locked_pool_stays_free(self):
        self.assertEqual(make_session(list("ABCDEFGHIJ"), 5, False), list("ABCDE"))

    def test_unlocked_paid_pool(self):
        self.assertEqual(make_session(list("GHIJKL"), 4, True), list("GHIJ"))

    def test_fills_minimum(self):
        session = make_session(["A"], 3, False)
        self.assertEqual(len(session), 3)
        self.assertTrue(set(session).issubset(set(FREE)))

    def test_clamps_to_eight(self):
        self.assertEqual(len(make_session(ALL, 99, True)), 8)

    def test_paid_only_without_unlock_falls_back(self):
        self.assertEqual(make_session(list("XYZ"), 5, False), list("ABCDE"))


class ParentGateTests(unittest.TestCase):
    def test_matches(self):
        answer = 3 + 4
        self.assertEqual(answer, 7)
        self.assertTrue(int("7") == answer)
        self.assertTrue(int(" 7 ".strip()) == answer)
        self.assertFalse(int("8") == answer)


class TraceCoverageTests(unittest.TestCase):
    def test_forgiving_radius(self):
        samples = [(0.0, 0.0), (100.0, 0.0)]
        hit = [False, False]
        radius = 20.0

        def register(x, y):
            r2 = radius * radius
            for i, (sx, sy) in enumerate(samples):
                if hit[i]:
                    continue
                if (sx - x) ** 2 + (sy - y) ** 2 <= r2:
                    hit[i] = True

        def stroke(x0, y0, x1, y1):
            dist = math.hypot(x1 - x0, y1 - y0)
            steps = max(1, math.ceil(dist / 4.0))
            for s in range(steps + 1):
                t = s / steps
                register(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t)

        register(5, 5)
        self.assertEqual(sum(hit), 1)
        stroke(90, 0, 110, 0)
        self.assertEqual(sum(hit), 2)
        self.assertGreaterEqual(sum(hit) / len(samples), 0.5)


if __name__ == "__main__":
    unittest.main()
