# Textbox Lab

Thirty-two text input designs. Each card has a Copy CSS button that pulls
the exact rule set for that template out of the page's own stylesheet.

Live: https://kiavashmax.github.io/textbox-lab/

## Theme

A theme toggle in the header switches between dark and light. The choice
is saved in `localStorage`. Templates that are intentionally styled a
specific way (Neon, Terminal, Retro, Paper, Brutal, Neumorph, Glass, Cosmic,
Code, Vapor, Mist, Runic) stay that way on both themes. Everything else
adapts through CSS variables on `html[data-theme]`.

## The set

| # | Name | Technique |
|---|---|---|
| 01 | Ghost | Underline grows from the middle |
| 02 | Neon | Layered box-shadow with a pulse |
| 03 | Brutal | Hard offset shadow |
| 04 | Neumorph | Inset light and dark shadows |
| 05 | Glass | backdrop-filter blur over gradient |
| 06 | Terminal | Monospace green caret |
| 07 | Float | Label lifts out of the field |
| 08 | Magnetic | Gradient follows the pointer |
| 09 | Outline | Halo on focus |
| 10 | Diagonal | Corner triangle accent |
| 11 | Retro | 80s double neon border |
| 12 | iOS | Apple rounded field |
| 13 | Gradient | Gradient border via mask |
| 14 | Pill | Fully rounded |
| 15 | Paper | Lined notebook |
| 16 | Lift | Rises with deeper shadow |
| 17 | Dashed | Dash becomes solid |
| 18 | Ribbon | Corner tag |
| 19 | Inset | Pressed-in look |
| 20 | Soft | Borderless tint |
| 21 | Cosmic | Starfield background |
| 22 | Code | Editor side accent |
| 23 | Vapor | Vaporwave chroma shadow |
| 24 | Notched | clip-path cut corners |
| 25 | Double | 3px double border |
| 26 | Shimmer | Sweep animation |
| 27 | Chrome | Metallic gradient border |
| 28 | Sketch | Hand-drawn radius |
| 29 | Dotline | Dotted underline |
| 30 | Mist | Blurred warm tint |
| 31 | Runic | Angled corners, uppercase |
| 32 | Glow | Bleeding golden halo |

## Stack

- Plain HTML, CSS, JavaScript
- No libraries, no preprocessors
- Copy button extracts rules from `document.styleSheets`
- Theme saved in `localStorage`, defaults to dark

## Run

Open `index.html` directly, or use `run.bat` / `run.sh`.

## Deploy

Run `deploy.bat`. Commits, pushes, enables GitHub Pages via `gh` if present.

## License

MIT &copy; 2026 [@kiavashmax](https://github.com/kiavashmax). See LICENSE.