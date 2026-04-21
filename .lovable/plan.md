
# MOVE — Mobility Innovation Centre Ecosystem Site

A single-page interactive site visualizing York University's MOVE program — its 5 research themes and 23 faculty members — using the same brand language as MTEC (red + black, IBM Plex Sans).

## Hero layout
- Full viewport, two columns side-by-side, vertically centered
- **Left (50%):** tagline above wheel — `MOBILITY · INNOVATION · ANALYTICS · CONNECTED · SUSTAINABLE` (uppercase, light, wide tracking)
- **Right:** 3-column grid of faculty bubbles (2 cols on tablet, 1–2 on mobile)
- Stacks vertically below `md` breakpoint
- Background: warm off-white `#fcfbf8` (matching screenshot)

## The wheel (centerpiece)
- SVG circle split into **5 equal slices** (72° each), one per MOVE theme:
  1. Autonomous Mobility
  2. Sustainable Mobility
  3. Mobility Analytics
  4. IoT, Shared & Connected Mobility
  5. AR/VR Mobility
- Each slice gets a distinct muted earthy tone (sand, sage, slate, taupe, warm gray)
- **Outer ring:** York/Lassonde red `#E31837`
- **Center hub:** black circle labeled **MOVE** — clicking resets all filters
- Slice labels wrap inside their wedge in IBM Plex Sans bold
- Hover: slice darkens slightly + cursor pointer
- Selected slice(s): solid color; unselected: faded

## Faculty grid (23 PIs)
- Circular bubbles 80px, fill `#D6CFCA`, thin black border
- Two-line name (first / last) in IBM Plex Sans bold 12px
- All 23 York/Lassonde members from the spreadsheet, mapped to their primary + secondary themes

### Filtering behavior
- **Click a slice:** members tagged with that theme (primary OR secondary) stay 100% opacity; others fade to 30%
- **Multi-select:** shift/ctrl-click or just click additional slices to combine themes (union filter); selected slices show a subtle ring
- **Click MOVE hub:** clears all selections
- **Hover a bubble:** small floating card appears with name, title, department, and a colored chip per theme

## Faculty popup (click bubble)
- Clean dialog, white bg, rounded, max-w ~950px, X close button
- **For 18 members with full PDF capability slides:** show the slide as a single full-bleed image (extracted from the uploaded PDF, baked-in info)
- **For the 5 members without slides:** auto-generated branded info card showing portrait placeholder, name, title, department, email link, theme chips, and "Profile coming soon" note — styled to match the slide aesthetic (red header bar + black footer)
- Accessible: hidden DialogTitle, focus trap, Esc closes

## Research Areas Editor (admin panel)
- Floating "Edit themes" button bottom-right opens a side sheet
- Lets the user rename themes, change slice colors via swatches, edit the tagline, and edit the hub label
- Changes persist to localStorage and update the wheel + hover cards live
- Reset-to-default button restores MOVE's original 5 themes

## Brand & typography
- IBM Plex Sans (300/400/600/700) loaded from Google Fonts
- Color tokens (HSL) in `index.css`:
  - `--brand-red` York red, `--brand-black`, `--brand-cream` background, `--bubble-fill`, plus 5 `--theme-{1–5}` slice colors
- Logos: small "MOVE • Lassonde School of Engineering • York University" footer line
- All colors via semantic tokens — no inline hex in components

## SEO & accessibility
- Single H1 (sr-only) "MOVE — Mobility Innovation Centre at York University"
- Per-route `head()` meta (title, description, og:title/description)
- All bubbles are `<button>`, slices have ARIA labels, dialogs have hidden titles
- Keyboard: Tab through bubbles, Enter to open, Esc to close

## Deliverables
- Responsive (mobile → desktop)
- 23 faculty wired up with correct theme mappings from the uploaded spreadsheet
- 18 PDF slide images extracted and embedded as profile popups
- 5 fallback branded info cards for members without slides
- Hover cards, multi-theme filtering, and live themes editor all functional
