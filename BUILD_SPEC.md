# Build Spec — Thanushika Madhusith Portfolio
**For: Google Antigravity (or any agentic coding assistant)**
**Type:** Cinematic, luxury-editorial personal portfolio (developer × photographer)

> Feed this file to Antigravity as the project brief. It contains locked design
> decisions, full copy, section-by-section requirements, and an implementation
> plan so the agent can scaffold, build, and verify the site with minimal
> back-and-forth.

---

## 0. One-line brief

A single-page, scroll-driven site that reads like a luxury editorial magazine,
not a resume: near-black canvas, champagne-gold accents, oversized serif
type, and a signature **aperture-iris transition** (a nod to photography)
that opens between chapters instead of a generic slide/fade.

---

## 1. Design tokens (locked — do not substitute defaults)

### Color
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0908` | Base canvas, near-black (not pure #000) |
| `--surface` | `#15130F` | Panels, cards, section alternation |
| `--surface-2` | `#1E1B15` | Raised surfaces, hover states |
| `--gold` | `#C9A876` | Primary accent — labels, rules, CTAs |
| `--gold-soft` | `#E8D9BC` | Highlight text, hover states |
| `--ink` | `#F4F1EA` | Primary text (soft white, not pure white) |
| `--ink-muted` | `#8C877C` | Secondary text, captions |
| `--line` | `rgba(201,168,118,0.18)` | Hairline borders/dividers |

Avoid pure black (#000) and pure white (#FFF) everywhere — always the warm
off-black / off-white pair above. No neon, no blue-purple gradients.

### Type
- **Display:** `Cormorant Garamond` (weights 300/500/600) — huge, high-contrast
  serif for names, section titles, pull quotes. Letter-spacing tight or slightly
  negative at large sizes.
- **Body / UI:** `Manrope` (weights 400/500/700) — labels, nav, body copy,
  buttons. Eyebrow labels are Manrope, uppercase, `letter-spacing: 0.2–0.3em`,
  12–13px, gold.
- Scale: hero name ~ clamp(3.5rem, 11vw, 9rem); section titles ~ clamp(2rem,
  5vw, 4rem); body ~ 1.05rem / 1.7 line-height.

### Layout
- Full-bleed, full-viewport sections (`100svh` where cinematic, auto-height
  where content-driven).
- Asymmetric grids for projects (not a uniform 3-col card grid) — large image
  left/right alternating with number + text column.
- Generous whitespace; max content width ~1400px with wide gutters.
- No border-radius on large surfaces (sharp, editorial); small radius (2–4px)
  only on tags/pills.

### Signature element
**The Aperture Iris.** Between the Hero and the first chapter (and reused
sparingly at 1–2 other major transitions), a circular iris built from thin
gold wedge shapes contracts/expands like a camera aperture, revealing the
next section through the growing circle. This is the one "big move" of the
site — everything else stays quiet and disciplined.

### Motion
- Libraries: **GSAP** + **ScrollTrigger**, **Lenis** (smooth scroll),
  `IntersectionObserver` for lightweight reveals.
- Page-load sequence (see §3), scroll-triggered text/image reveals (mask
  reveal, not fade-only), magnetic buttons, custom cursor states.
- Respect `prefers-reduced-motion`: disable parallax/iris/magnetic effects,
  keep only simple opacity/translate reveals ≤200ms.

---

## 2. Tech stack recommendation

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS (with the token values above as CSS variables /
  Tailwind theme extension) — or plain CSS modules if the agent prefers finer
  control over the iris/mask effects.
- **Animation:** GSAP + ScrollTrigger, Lenis for smooth scroll
- **Images:** `next/image`, WebP/AVIF, lazy-loaded, blur placeholders
- **Fonts:** `next/font` for Cormorant Garamond + Manrope (self-hosted, no
  layout shift)
- **Deploy target:** Vercel

### Suggested file structure
```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Preloader.tsx
  CustomCursor.tsx
  Nav.tsx
  Hero.tsx
  ApertureTransition.tsx
  About.tsx
  TechStack.tsx
  Projects/
    ProjectsGrid.tsx
    ProjectCaseStudy.tsx
  Photography/
    PhotoGallery.tsx
    Lightbox.tsx
  Lab.tsx
  Journey.tsx
  Philosophy.tsx
  Contact.tsx
  Footer.tsx
lib/
  projects.ts   // project data (see §5)
  motion.ts      // GSAP/Lenis setup helpers
public/
  images/...
```

---

## 3. Section-by-section spec

### 3.1 Preloader
Black screen → small centered gold ring/line loader → percentage or word
cycle ("TECHNOLOGY", "CREATIVITY", "PHOTOGRAPHY") → fades out into Hero.
Duration ~1.5–2.5s max; never block for real asset loading beyond that.

### 3.2 Hero (full-screen)
- Eyebrow: `DIGITAL CREATOR · DEVELOPER · PHOTOGRAPHER`
- Name, two lines, huge serif: `THANUSHIKA` / `MADHUSITH`
- Statement: "I build digital experiences where technology meets creativity."
- CTAs: `EXPLORE MY WORLD` (primary, gold outline→fill on hover), `VIEW
  PROJECTS` (secondary, text + underline)
- Portrait: large, desaturated-to-color reveal on load, subtle parallax on
  scroll (moves slower than foreground text).
- Load sequence: black → loader → name types/reveals via clip-path mask →
  portrait fades/scales in → ambient gold particles/grain settle.

### 3.3 Aperture transition → About
Scroll-triggered iris opens to reveal the About chapter beneath.

### 3.4 About — "A LITTLE ABOUT ME"
Editorial two-column: short intro paragraph (see copy below) + three theme
tiles: **Technology**, **Innovation**, **Creativity**, each with a one-line
description. Not icon-cards — treat as an editorial pull-quote layout with
thin gold dividers.

> Copy: "Thanushika is a BSc (Hons) IT student from Sri Lanka with a strong
> interest in software development, artificial intelligence, IoT, automation,
> interactive interfaces, and creative technology. He also works with
> photography, allowing technology and visual creativity to exist side by
> side — one discipline sharpening the other."

### 3.5 What I Build (Technology)
Title: `WHAT I BUILD`. Five categories as horizontal, scroll-reveal typographic
rows (not a logo grid): Software Development, Databases, AI / Intelligent
Systems, Real-Time & Infrastructure, IoT. Each row: category name (serif,
large) + comma-separated stack (Manrope, muted) + thin gold rule.

### 3.6 Selected Work (Projects)
Title: `SELECTED WORK`. Large asymmetric editorial panels, alternating
image-left/image-right. Each panel: project number (`01`–`07`), name,
category label, one-line description, 3–4 stack tags, `VIEW PROJECT →`.
Clicking opens a full case-study transition (route or modal) with: hero
image, Overview, Problem, Solution, Technology, Key Features, Screenshots,
Outcome, and a `← ALL PROJECTS` back control. See §5 for full project data.

### 3.7 Through My Lens (Photography)
Title: `THROUGH MY LENS` / subtitle: `Moments, light and stories.` Full
immersive masonry/horizontal-scroll gallery across categories: Portraits,
Events, Lifestyle, Nature, Creative, Automotive, Street. Lightbox on click,
smooth zoom on hover. Small identity line: `Canon 90D` and the statement
*"Technology captures information. Photography captures emotion."*

### 3.8 The Lab
Title: `THE LAB`. Interactive grid/list of experiments (AI assistants,
computer vision, gesture interfaces, IoT devices, smart home automation,
experimental UI) — hover reveals a short description panel per item.

### 3.9 Current Stack
Quiet, animated-on-scroll list grouped by Frontend / Backend / Database / AI
/ Real-time / Desktop / IoT / Computer Vision / Tools (full list in original
brief — reproduce as grouped tag rows, not logo soup).

### 3.10 The Journey (Timeline)
Title: `THE JOURNEY`. Vertical (mobile) / horizontal (desktop) timeline:
Programming → Software Development → Database Systems → Web Development →
IoT → AI → Computer Vision → Creative Technology. Framed as continuous
learning, not mastery.

### 3.11 Philosophy
Full-screen quote section. Large serif: `BUILD. EXPERIMENT. CREATE.`
Subtext: "I believe the best projects happen when technology is combined
with curiosity and creativity."

### 3.12 Contact — "LET'S CREATE SOMETHING"
Text: "Have an idea, project or collaboration in mind?" Buttons: `EMAIL ME`,
`GITHUB`, `LINKEDIN`, `INSTAGRAM`. Simple form: Name, Email, Message, Send
Message (gold underline inputs, no boxy borders).

### 3.13 Footer
`THANUSHIKA` / `Technology × Creativity` · links: Projects, Photography,
About, Contact · `© 2026 Thanushika Madhusith`

### 3.14 Nav
Floating, becomes minimal/transparent on scroll down, reappears on scroll
up. Logo `THANUSHIKA`, links HOME / ABOUT / WORK / PHOTOGRAPHY / LAB /
CONTACT. Mobile: full-screen menu with staggered link reveal.

### 3.15 Custom cursor (desktop only)
Small circular dot by default. Expands + relabels contextually: `VIEW`
(projects), `EXPLORE` (photography), `OPEN` (images), expands plainly over
links. Disabled entirely on touch devices.

---

## 4. Accessibility & performance checklist
- [ ] Semantic HTML landmarks (`header`, `nav`, `main`, `section`, `footer`)
- [ ] Visible keyboard focus states (gold outline, 2px)
- [ ] Alt text on every image (descriptive, not filenames)
- [ ] Color contrast: `--ink` on `--bg` passes AA for body text
- [ ] `prefers-reduced-motion` strips parallax/iris/magnetic effects
- [ ] Images lazy-loaded, served as WebP/AVIF, responsive `srcset`
- [ ] No layout shift from custom fonts (`next/font`, `font-display: swap`)
- [ ] Lighthouse performance ≥ 90 on mobile

---

## 5. Project data (source of truth for `lib/projects.ts`)

1. **ValuFlow SL** — `DIGITAL WORKFLOW · GOVERNMENT SYSTEM` — task/workflow
   platform for the Department of Valuation; paper→digital transformation.
   Stack: React, Node.js, PostgreSQL, Prisma, Socket.IO, Redis, LangChain,
   Azure OpenAI. Features: role-based workflows, Kanban, real-time updates,
   controlled registration, AI-powered summaries, intelligent workflow
   assistance.
2. **Wishwin LMS** — `EDTECH · LMS` — learning platform for tuition classes.
   Stack: React, Node.js, Express, MySQL, PayHere, OBS, AI. Features:
   registration, grade/class selection, payment receipts, live + recorded
   classes, PDF tutorials, Sinhala quizzes, chatbot, voice interaction,
   gamification, weak-area detection, admin dashboard.
3. **Jarvis / AI Assistant** — `AI · COMPUTER VISION · HCI` — gesture-based
   computer control. Stack: Python, OpenCV, MediaPipe, macOS integration.
   Features: hand-gesture recognition, cursor control, pinch-to-click, drag,
   virtual keyboard, volume/media control, sci-fi HUD.
4. **Smart Bulb Holder** — `IOT · SMART HOME` — Stack: ESP32, LD2410C mmWave
   sensor, MOSFET control. Features: mobile control, scheduling, device
   grouping, multi-user access, lighting zones, mosquito-repellent concept,
   motion sensing.
5. **Tea Factory Automation** — `INDUSTRIAL IOT · AUTOMATION` — sensor-based
   monitoring/control concept for tea manufacturing: environmental
   monitoring, automation, data collection, real-time monitoring.
6. **TN Book Store ERP** — `DESKTOP SOFTWARE · ERP` — Stack: Electron, React,
   Node.js, MySQL. Features: inventory, book management, sales, data
   management.
7. **Clothing Warehouse Management** — `JAVA · DATABASE · MANAGEMENT SYSTEM`
   — Stack: Java, Java Swing, MySQL. Inventory + management workflows.

---

## 6. Build order (recommended for the agent)

1. Scaffold Next.js + Tailwind + fonts; wire design tokens as CSS variables.
2. Static layout for all sections with real copy (no animation yet) — get
   structure and responsiveness right first.
3. Nav + custom cursor + Lenis smooth scroll.
4. Hero load sequence + Aperture transition (the signature piece).
5. Scroll-reveal system (GSAP + ScrollTrigger) applied consistently across
   sections.
6. Projects case-study view/route.
7. Photography gallery + lightbox.
8. Reduced-motion pass, accessibility pass, performance pass (images,
   Lighthouse).
9. Mobile-specific simplification of iris/door transitions → swipe/slide.

---

## 7. What "done" looks like
Opening the site should feel like stepping into a small, confident studio —
not a template. The one big swing is the aperture iris; everything else
(type, spacing, restraint) should feel considered and quiet around it.
