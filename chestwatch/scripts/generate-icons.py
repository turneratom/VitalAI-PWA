#!/usr/bin/env python3
"""Generate ChestWatch PWA icons (gold bezel on black)."""

from __future__ import annotations

import struct
import zlib
from pathlib import Path


def chunk(tag: bytes, data: bytes) -> bytes:
    return (
        struct.pack(">I", len(data))
        + tag
        + data
        + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)
    )


def encode_png(width: int, height: int, rgba: bytes) -> bytes:
    raw = b"".join(b"\x00" + rgba[y * width * 4 : (y + 1) * width * 4] for y in range(height))
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def draw(size: int) -> bytes:
    pixels = bytearray(size * size * 4)
    cx = cy = (size - 1) / 2
    outer = size * 0.46
    mid = size * 0.40
    inner = size * 0.34
    lens = size * 0.16
    for y in range(size):
        for x in range(size):
            dx = x - cx
            dy = y - cy
            r = (dx * dx + dy * dy) ** 0.5
            i = (y * size + x) * 4
            pixels[i : i + 4] = bytes([7, 7, 10, 255])
            if r <= outer:
                pixels[i : i + 4] = bytes([201, 162, 39, 255])
            if r <= mid:
                pixels[i : i + 4] = bytes([111, 90, 22, 255])
            if r <= inner:
                # dark glass
                glow = max(0, 1 - r / inner)
                pixels[i] = int(18 + 40 * glow)
                pixels[i + 1] = int(18 + 28 * glow)
                pixels[i + 2] = int(22 + 10 * glow)
                pixels[i + 3] = 255
            if r <= lens:
                pixels[i : i + 4] = bytes([201, 162, 39, 255])
    return bytes(pixels)


def main() -> None:
    public = Path(__file__).resolve().parent.parent / "public"
    public.mkdir(exist_ok=True)
    for size, name in (
        (192, "icon-192.png"),
        (512, "icon-512.png"),
        (180, "apple-touch-icon.png"),
    ):
        (public / name).write_bytes(encode_png(size, size, draw(size)))
        print("wrote", name)


if __name__ == "__main__":
    main()
