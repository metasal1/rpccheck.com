# rpccheck brand style guide

Locked 2026-09-04. Mark: **I gutter** — pixel RPC with module gutters.

## Mark

Pixel lettermark spelling **RPC**.

- Each letter is a **5×7** module grid.
- Letters sit on one row with **2 empty modules** between them.
- Every lit module is a square with a **gutter** (~15% of the module step) so the mark reads as a screen / LED matrix, not a solid bitmap.
- Always keep the gutters. Filling them solid kills the identity.
- Prefer monochrome: ink `#fafafa` on ground `#0a0a0a`, or invert, or ink on primary `#1447e6`.

Files: `marks/rpc-gutter.svg` (master), `marks/rpc-gutter-transparent.svg`, PNG sizes 16–1080.

## Wordmark

`rpccheck` — lowercase, **Geist SemiBold**, no tracking gymnastics. Never `RPC Check` or `RpcCheck` in brand lockups.

## Colour

From the live site (`oklch` → hex):

| Token | Hex | Use |
| --- | --- | --- |
| background | `#0a0a0a` | page / mark ground |
| foreground | `#fafafa` | ink, type |
| card | `#171717` | panels |
| primary | `#1447e6` | accent, CTAs, mark field |
| muted | `#262626` | borders, quiet UI |
| muted-fg | `#a1a1a1` | secondary type |
| success | `#00bc7d` | healthy endpoint |
| warning | `#fe9a00` | degraded |
| error | `#e7000b` | down |

## Type

- UI / brand: **Geist** (sans) + **Geist Mono** (code, latency numbers).
- Mark is bitmap geometry, not a font — do not substitute Geist Pixel for the logo itself (Geist Pixel Square is a cousin, not the lock).

## Clear space

Keep at least **one module** of empty field around the mark (the height of one pixel block). Do not crowd with type closer than that.

## Do / don't

See `do-dont/do-dont.png`.

- Do: square mark, gutters intact, mono or primary field, centred.
- Don't: stretch, rotate, drop shadows, gradients on the modules, fill gutters, recolour modules individually.

## Social

`social/og-1200x630.png` — mark + wordmark + one-line dek.
