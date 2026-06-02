# 콜포비아 연습 앱 — Design System

A design system for a **call-phobia (콜포비아 / 전화 공포증) practice app**: a Korean
mobile product that helps people who feel anxious on the phone build confidence by
rehearsing real-world calls in **leveled, gamified scenarios** before they have to make
them for real.

The core loop: pick a **난이도 (difficulty)** → pick a **시나리오 (scenario)** like ordering
delivery, booking a hospital appointment, or calling a government office → run a guided
practice call → climb a **레벨 로드맵 (level roadmap)** as you complete each stage.

## Source

- **Figma (home / practice):** `4-1 uxui 조서영(edit).fig` → Page-1, 2 frames
  - `단계별 난이도 연습 모드` (node `1:19`) — "배달 문의" level-roadmap detail screen
  - `연습하기 — 시나리오 선택` (node `1:115`) — difficulty + scenario picker
- **Figma (signup onboarding):** `제목 없음.fig` → Page-1, 3 frames
  - `회원가입 2 — 불안 유형` (node `4:5` / `4:63`) — anxiety-type multi-select grid ("어떤 상황이 가장 부담스러우신가요?")
  - `회원가입 3 — 알림 설정` (node `4:116`) — daily-practice notification settings (toggle + time)
  - `토글` (node `4:227`) — toggle component (on / off)
- Platform: **iOS mobile**, 375 × 812 pt artboards.
- This README assumes the reader may not have Figma access; everything needed to design
  on-brand lives in this folder.

## Index — what's in this folder

| Path | What it is |
|------|------------|
| `README.md` | This file — context + content + visual + iconography rules |
| `colors_and_type.css` | All color, type, spacing, radius, shadow tokens + semantic classes |
| `preview/` | Design-system cards (colors, type, spacing, components) shown in the DS tab |
| `ui_kits/app/` | High-fidelity React recreation: onboarding signup + practice/roadmap screens + reusable components |
| `assets/` | Extracted brand icons (`assets/raw/`) |
| `SKILL.md` | Lets this system be used as a downloadable Claude Agent Skill |

---

## CONTENT FUNDAMENTALS

The product is **entirely in Korean**, written to feel **calm, encouraging, and competence-
building** — never clinical or alarmist. It treats phone anxiety as a skill gap to train,
not a disorder to fix.

- **Tone:** supportive coach. Gamified but gentle — levels, progress bars and "완료됨 /
  진행 중 / 잠김" states give momentum without pressure.
- **Voice / person:** addresses the task, not the user directly. Labels are noun phrases
  (`난이도 선택`, `시나리오 선택`, `레벨 로드맵`), not commands. Descriptions use the polite
  declarative `-입니다` ending: e.g. *"기본적인 비즈니스 매너와 간단한 용건을 전달하고 메뉴를
  주문하는 실전 연습입니다."*
- **Casing / glyphs:** Korean has no case. The middle dot **`·`** is the signature
  separator for label + state — `레벨 2 · 진행 중`, `레벨 1 · 완료됨`. Use it consistently.
- **Numerals:** Western digits (레벨 2, 9:41).
- **No emoji.** State and meaning are carried by color, icons, and the `·` pattern.
- **Status vocabulary:** `완료됨` (done) · `진행 중` (in progress) · `잠김` (locked).
  **Difficulty vocabulary:** `초급` (beginner) · `중급` (intermediate) · `고급` (advanced).
- **Microcopy is short.** Scenario names are 2–5 syllables (`배달 문의`, `병원 예약`,
  `관공서 문의`). Chip subtitles are one phrase (`짧고 간단한 통화`, `예상 외 상황 포함`).
- **Nav labels:** `홈 · 연습하기 · 통화 보조 · 마이페이지`.

---

## VISUAL FOUNDATIONS

A **bright, trustworthy, single-hue blue system** on a cool near-white. It reads like a
modern fintech/health utility: confident primary blue, lots of soft `#CEDBFF` strokes,
generous white space, and one filled blue "hero" card per screen that anchors attention.

### Color
- **One dominant hue.** Everything is blue (`#3C70FF` primary) stepped down through
  `#6991FF → #A0BAFF → #CEDBFF`. There is no secondary brand color.
- **Backgrounds** are a cool near-white `#FAFDFD`; cards a barely-warmer `#FCFCFE`; the top
  header bar can go pure `#FFFFFF`. Keep whites desaturated.
- **Text** is `#373B45` (never pure black for body), muted to `#AEB4C3` for inactive /
  locked / secondary, with `#000000` reserved for the centered header page-title.
- **Accents appear ONLY inside the filled blue hero card:** `#8DFFC3` green progress fill
  and `#FFF46C` yellow for the active "진행 중" label. Never use these on white surfaces.

### Type
- **Roboto** throughout (400 / 500 / 700). **Inter** SemiBold appears only for the status-bar
  time `9:41`. Korean glyphs fall back to system Apple SD Gothic Neo / Malgun Gothic.
- Scale is tight: 18 / 16 / 14 / 12 / 10 px. Titles are 16px **Bold**; the hero card title
  is 18px Medium; body 14–16px Regular; badges & nav labels 10px.

### Shape, depth & layout
- **Corner radii** step with hierarchy: hero card `12`, difficulty chip & roadmap row `8`,
  scenario row `6`, badge `4`, progress bar / dots fully round.
- **Shadows are whisper-soft.** Cards lift on `0 1px 2px rgba(0,0,0,.05)`; the selected
  difficulty chip gets `1px 1px 5px rgba(0,0,0,.10)`. Nothing heavier.
- **Borders do the work, not shadows.** Most containers are defined by a 1px `#CEDBFF`
  stroke on a near-white fill. Selected/active state = swap to a `#6991FF` border (roadmap)
  or a solid `#3C70FF` fill (difficulty chip).
- **Layout:** fixed top status bar (44pt) + header (56pt) + scrollable main + fixed bottom
  tab bar (80pt). 24px horizontal page padding. Vertical rhythm in 12 / 16 / 32 gaps.
- **Lists** are stacks of full-width rows with 12px gaps, each row left-label / right-affordance
  (chevron, check, lock, badge).
- **No gradients, no glassmorphism, no background imagery.** Flat fills only.

### State & interaction
- **Selected** = fill inverts to primary blue with white/yellow text (difficulty chip,
  active roadmap level). **Default** = white fill + blue stroke. **Locked/disabled** =
  muted `#AEB4C3` text + faint stroke + lock icon. **Done** = blue check circle.
- Tabs use a 2px `#CEDBFF` underline track with the active tab in `#373B45` bold, inactive
  `#AEB4C3`.
- Recommended motion (not in static Figma, applied in the UI kit): 150–200ms ease-out on
  press, subtle scale-down `0.97` on tap, progress bars animate width. Keep it quiet and
  reassuring — no bounces.

### Onboarding patterns (signup flow)
- **Option cards** are square, `16`-radius tiles in a 2-col grid, each with a `48×48`
  `8`-radius icon chip above a centered 14px label. **Idle** = white fill + 2px `#EDF0F6`
  (`--line-100`) stroke, grey `#AEB4C3` icon. **Selected** = pale-blue `#E0E8FF`
  (`--blue-200`) fill + 2px `#3C70FF` stroke, solid-blue icon chip with white glyph, blue
  500-weight label, and a `22px` blue check circle pinned top-right.
- **Toggle** is a `56×32` pill: ON = `#3C70FF` track, knob right; OFF = `#CBD2E3`
  (`--line-300`) track, knob left. White `26px` knob with a faint drop shadow.
- **Step progress** = thin `6px` pill track (`#E0E8FF`) with a `#3C70FF` fill, a left
  back-arrow and a right `n/3` counter in `#6991FF`.
- **Inline fields** (time picker, info note) use a `1px #A0BAFF` stroke on white at `8`
  radius — lighter than the primary blue, signalling editable/secondary surfaces.
- **Primary CTA** is a full-width `56px`, `8`-radius blue button, bold white label.
  **Disabled** state swaps the fill to muted `#AEB4C3` (used until a selection is made).

---

## ICONOGRAPHY

- Style is **clean, rounded, mostly line icons** with the occasional **solid fill** for the
  active state (the home glyph fills in when its tab is active).
- The status bar uses standard iOS-style **signal bars / wi-fi / battery**.
- Affordances: back **chevron-left**, list **chevron-right**, completed **check (in a filled
  blue circle)**, locked **padlock**, active level **arrow-right**, plus nav glyphs
  **home · mic (연습하기) · phone-call (통화 보조) · person (마이페이지)**.
- **Extracted brand icons** live in `assets/raw/` (`icon-nav-a.svg` = home, `icon-status.svg`
  = signal bars, `icon-check.svg`). These use `fill="currentColor"` so they tint to any token.
- **Substitution flag:** the Figma extraction collapsed the distinct nav glyphs (mic /
  phone / person) and the lock glyph into a single shared vector, so those specific icons
  were **not** recoverable as separate files. The UI kit uses **[Lucide](https://lucide.dev)**
  (MIT, CDN) — `home, mic, phone-call, user, chevron-left, chevron-right, check, lock,
  arrow-right, wifi, battery` — as the closest match to the rounded line style. **If you have
  the original icon SVGs, drop them into `assets/` and we'll swap Lucide out.**
- **No emoji, ever.** Icons + color carry state.
