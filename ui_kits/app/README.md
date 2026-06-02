# UI Kit — 콜포비아 연습 앱 (mobile)

High-fidelity, interactive recreation of the two designed screens, built from the Figma
source of truth (not screenshots). 375 × 812 iOS, inside a phone bezel.

## Run
Open `index.html`. It's a click-through prototype:
- **연습하기** — switch difficulty chips, switch tabs (시나리오 연습 / 성장 기록), tap any
  scenario row to open its level detail.
- **Level roadmap** — hero progress card + 레벨 로드맵 (완료됨 / 진행 중 / 잠김). Back chevron
  returns to the picker.

## Files
| File | Contents |
|------|----------|
| `index.html` | Phone shell + React/Babel/Lucide bootstrap |
| `components.jsx` | `StatusBar`, `Header`, `Badge`, `BottomNav`, `Icon` |
| `screens.jsx` | `PracticeScreen` (+ `GrowthTab`), `RoadmapScreen`, scenario/difficulty data |
| `app.jsx` | Router root + Lucide re-render effect |

## Notes
- Tokens come from the root `colors_and_type.css`.
- Icons are **Lucide** (CDN) — see the README ICONOGRAPHY substitution flag.
- The 성장 기록 tab is a small on-brand extrapolation (no Figma source) so the tab switch
  isn't a dead end; everything else mirrors the Figma 1:1.
