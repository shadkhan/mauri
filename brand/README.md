# Mauri Brand Kit — File Guide

## Files in this kit

| File | Purpose | Use when |
|------|---------|----------|
| `mauri-mark.svg` | Logo mark only, no text | App icon source, favicon, social avatar, embroidery |
| `mauri-logo-primary.svg` | Mark + wordmark + tagline (light bg) | Website header, pitch decks, letterhead, light UI |
| `mauri-logo-reversed.svg` | Mark + wordmark on dark teal | Dark mode UI, app splash screen, dark backgrounds |
| `mauri-app-icon-1024.svg` | 1024×1024 app icon with rounded square | Play Store / App Store submission source |
| `mauri-icons.svg` | 14 app UI module icons | App navigation, feature cards, blog thumbnails |

---

## Brand colours

| Name | Hex | Use |
|------|-----|-----|
| Deep Teal | `#1D9E75` | Primary brand, spine, upper branches |
| Dark Teal | `#085041` | Reversed background, deep emphasis |
| Mid Teal | `#0F6E56` | Secondary teal moments |
| Soft Teal | `#E1F5EE` | Light backgrounds, cards |
| Spirit Purple | `#7F77DD` | Mid branches, homeopathy, spiritual layer |
| Soft Lavender | `#EEEDFE` | Purple backgrounds |
| Warm Amber | `#EF9F27` | Celebrations, energy, milestones |
| Soft Amber | `#FAEEDA` | Amber backgrounds, alerts |
| Rose | `#D4537E` | Period tracker, feminine layer |
| Warm White | `#F7F6F2` | Page background (not cold white) |

---

## Typography

**Wordmark:** Georgia (serif), weight 400, letter-spacing wide (10px at 64px size)
**Tagline / UI:** System sans-serif stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial`
**Alternative serif for production:** Playfair Display (Google Fonts, free) — closer to the intended character

---

## Converting SVG → PNG (free methods)

### Method 1 — Browser (quickest)
1. Open the .svg file in Chrome or Firefox
2. Right-click → "Save image as" → saves as PNG at screen resolution
3. For high-res: zoom browser to 200% before saving

### Method 2 — Inkscape (best quality, free desktop app)
```bash
inkscape mauri-mark.svg --export-png=mauri-mark-512.png --export-width=512
inkscape mauri-app-icon-1024.svg --export-png=mauri-app-icon.png --export-width=1024
```

### Method 3 — Online converter (no install)
- https://svgtopng.com — free, up to 2000px output
- https://cloudconvert.com/svg-to-png — handles large sizes, free tier

### Method 4 — Node.js (if you want to automate)
```bash
npm install -g sharp-cli
sharp -i mauri-mark.svg -o mauri-mark-512.png resize 512
```

---

## Extracting individual icons from mauri-icons.svg

Each icon is in a `<g transform="translate(x, y)">` group.
Open in Inkscape → select the group → File → Export Selection.

Icon grid positions (top-left corner of each tile):
| Icon | x | y |
|------|---|---|
| your protocol | 40 | 40 |
| lab markers | 160 | 40 |
| period tracker | 280 | 40 |
| supplements | 400 | 40 |
| diet plan | 520 | 40 |
| voice check-in | 640 | 40 |
| milestone | 760 | 40 |
| sisterhood | 40 | 200 |
| energy sync | 160 | 200 |
| grocery plan | 280 | 200 |
| case studies | 400 | 200 |
| homeopathy | 520 | 200 |
| graduate | 640 | 200 |
| herbal & Unani | 760 | 200 |

---

## For production logo polish

Take `mauri-mark.svg` to a designer with this brief:
> "Refine this SVG mark — clean bezier paths, optimise for small sizes (32px, 64px),
> ensure stroke weights are consistent at all scales. Deliver: SVG, PDF, PNG at 1x/2x/3x/4x."
> Budget: ₹3,000–6,000 on Behance or Dribbble India.

For the wordmark: ask the designer to set "mauri" in **Playfair Display Regular**
with letter-spacing +0.18em — this matches the geometric serif intent of this kit.
