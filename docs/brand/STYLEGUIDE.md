# rpccheck.com — graphic standards

v1 · 4 September 2026. Locks the **ping** mark. Keeps signal-bars as an alternate in the kit.

**rpccheck.com** is a real-time status page for Solana RPC endpoints (mainnet, devnet, testnet). Community / product register, not Milysec lab.

Voice: **Terse, ops-facing.** Numbers first. No hype.

Channels: [rpccheck.com](https://rpccheck.com) · GitHub [metasal1/rpccheck.com](https://github.com/metasal1/rpccheck.com) · author [metasal.xyz](https://metasal.xyz)

---

## Naming

| Use | Form |
|---|---|
| Wordmark | lowercase **rpccheck** |
| Domain / title | **rpccheck.com** |
| Product one-liner | Real-time Solana RPC status |
| Metadata title (live) | RPC Check for Solana — keep until a rename pass |

Do not write `RPCcheck`, `RPCCheck`, or `RPC Check` in lockups. Sentence case “RPC check” is fine in body copy.

---

## Mark

A solid nucleus and three concentric arcs. A network ping. Not a Lucide tick. Not Wi‑Fi chrome with a phone.

Construction (viewBox `0 0 200 200`):

- Nucleus centre `(108, 100)`, radius `18`
- Arc radii `42`, `66`, `90`
- Stroke `14`, round caps
- Arc span ≈ `−40°` to `+55°` (east = 0°, clockwise, +y down)

Primary: ink `#FAFAFA` on ground `#0A0A0A`. Invert (void on paper `#F7F8F7`) allowed, not default. Transparent white / transparent void for compositing. Primary blue on the mark is for rare accent tiles only — never the default.

### Files

| File | Use |
|---|---|
| `logo/mark-on-black.svg` (+ pngs) | Primary. Ink on ground. |
| `logo/mark-on-white.svg` (+ pngs) | Invert. |
| `logo/mark-white.svg` (+ pngs) | White ping, transparent. |
| `logo/mark-black.svg` | Void ping, transparent. |
| `logo/mark-primary.svg` | Blue on ground — accent only. |
| `logo/mark-bars-on-black.svg` | Alternate. Three ascending capsules. Keep in kit; do not ship as default. |

### Clear space

One quarter of mark height on all sides. Do not crowd the outer arc.

### Size

Minimum **48px** square. Never below **32px**. Favicon uses the ping, not the wordmark.

### Retired / never ship

- Live `public/placeholder-logo.svg` (v0 / Vercel placeholder) — dead for brand work.
- Lucide `CheckCircle` as the brand mark (fine as a table status icon; not the identity).
- Solana gradient on the mark.
- Milysec mint `#08D592` / purple `#9C32DF` on the mark.

---

## Colour

Identity is ground + ink. Primary blue is the interactive accent. Status colours are system, not brand chrome on the mark.

| Token | Hex | Role |
|---|---|---|
| Ground | `#0A0A0A` | Field. Social, covers, avatars. From live `--background` oklch(0.145 0 0). |
| Ink | `#FAFAFA` | Mark and type. From live `--foreground`. |
| Card | `#171717` | Panels. From live `--card`. |
| Border | `#262626` | Rules. From live `--border`. |
| Muted | `#A1A1A1` | Captions. From live `--muted-foreground`. |
| Primary | `#1447E6` | Links, primary buttons, rare accent. From live `--primary`. |
| Success | `#00BC7D` | Online. From live `--success`. |
| Warning | `#FE9A00` | Slow. From live `--warning`. |
| Error | `#E7000B` | Offline. From live `--error`. |
| Paper | `#F7F8F7` | Invert field only. |

### Forbidden on the mark

Milysec lab `#08D592` `#9C32DF` `#070A08` `#0C100D`. Solana purple→green gradient. Neon violet. Drop shadow, outline, or glow baked into the arcs.

Status colours may sit next to the mark in UI (badges, health bars). They do not recolour the mark.

---

## Type

One family: **Geist** 400 / 500 / 600. Site already loads `geist/font/sans` and `geist/font/mono`.

Wordmark: lowercase **rpccheck** or **rpccheck.com**, Geist 600, tracking `−0.04em`.

Geist Mono for latency, block height, health %.

Forbidden for brand work: MoonWalk, Bricolage Grotesque, EconoSans, Inter as the wordmark face (Inter is fine if a future UI pass needs it; Geist stays the lock).

---

## Lockups

Mark alone is the default (avatars, heroes, favicon).

| File | Use |
|---|---|
| `lockups/lockup-rpccheck.png` | Horizontal. Mark + `rpccheck`. |
| `lockups/lockup-rpccheck-com.png` | Horizontal. Mark + `rpccheck.com`. |
| `lockups/lockup-stacked-rpccheck.png` | Stacked. |

Gap between mark and word ≈ one fifth of mark height. Do not redraw the ping in type. Do not set Solana, Superteam, or Milysec next to the mark.

---

## Social

| Surface | Size | File |
|---|---|---|
| X / OG landscape | 1600×900 | `social/x-16x9.png` |
| OG default | 1200×675 | `social/og-1200x675.png` |
| Square / avatar crop | 1080×1080 | `social/x-1x1.png` |
| X list cover | 1500×500 | `social/x-list-cover-1500x500.png` |

Ground `#0A0A0A`. Mark centred. Optional muted dek. One small primary disc as atmosphere is allowed — never on the mark.

---

## Do / don’t

See `logo/do-dont.png`.

**Do:** ink on ground; arcs with round caps; status colours only in UI chrome.

**Don’t:** Solana gradient fill; Lucide tick as the logo; Milysec lab colours; stretch the arcs; add a fourth arc.

---

## Tokens

Machine-readable: `tokens.css`, `tokens.json`. Mirror the live CSS variables; hex is the brand-kit form of the oklch values already shipping.
