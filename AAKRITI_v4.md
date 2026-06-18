# AAKRITI — CINEMATIC EVENT REGISTRATION SITE
## MASTER BUILD PROMPT v4.0 — "Infinity Castle" Visual Identity
## Based on actual reference art (PDF Variant 1)

---

## 0. YOUR IDENTITY & MISSION

You are an elite Creative Frontend Engineer. Your mission is to build **AAKRITI** — the intercollegate fest site for Seshadripuram Institute of Management Studies (SIMS), Bengaluru, that feels like entering a living painting — not a website.

**The visual reference is locked:** Dark stone corridors lit by crimson lanterns. Cherry blossom petals drifting through still air. A lone silhouette standing before a torii gate in the distance. Impossible depth. Absolute darkness at the edges bleeding into warm amber and deep crimson at the center.

**The card system reference is locked:** Each event gets its own named "District" or "Realm" — a cinematic scene card with its own atmospheric illustration. NOT generic cards with icons. Named places in a world.

---

## 1. THE VISUAL UNIVERSE — "INFINITY CASTLE"

### Palette (extracted directly from reference images)

```
/* Backgrounds */
--void:           #050407   /* Pure black — the void between lanterns */
--castle-deep:    #0D0810   /* Section backgrounds */
--stone:          #160F14   /* Card surfaces */
--stone-mid:      #241820   /* Borders, dividers */

/* Crimson family (lanterns, active states) */
--crimson-lo:     #8B1A1A   /* Deep crimson shadows */
--crimson:        #C0392B   /* Primary accent */
--crimson-hi:     #E53935   /* Active, hover states */
--crimson-bloom:  #FF6B6B   /* Petal pink accent — used sparingly */

/* Gold/Amber family (lamp glow, text) */
--ember:          #8B5E1A   /* Deep amber */
--gold:           #D4A054   /* Primary gold — headings, highlights */
--gold-bright:    #F0C070   /* Lamp glow peak */
--gold-fire:      #FFD700   /* Title gold — logo only */

/* Text */
--text-primary:   #EDE8E0   /* Warm white for headings */
--text-body:      #A89880   /* Warm gray for body */
--text-ghost:     #4A3A35   /* Placeholder, disabled */

/* Petal colors */
--petal-1:        #E8C4C4   /* Pale pink */
--petal-2:        #C4687A   /* Deep rose */
--petal-3:        #8B3A50   /* Crimson petal */
```

**NEVER USE:** white backgrounds, cool grays, blue tints, neon anything, Tailwind defaults.

### Typography

```
Display:   "Cinzel Decorative" — for AAKRITI logo only
Heading:   "Cinzel" — section titles, event names, district names
Body:      "EB Garamond" — descriptions, body text (matches the aged parchment feel)
Mono:      "JetBrains Mono" — countdown timer, stats only
```

Google Fonts link (put in index.html):
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

---

## 2. THE DISTRICT SYSTEM — Core Concept

**This is the most important creative decision in the entire project.**

Looking at the card layout in the reference (page 40), each event has a named "District" with its own cinematic identity. We adapt this for AAKRITI's three categories.

### District Mapping

**SPORTS → "Breathing Districts"** (stone, elements, power)
Each sport gets a named district with its own atmospheric identity:

| Event | District Name | Visual Theme |
|-------|--------------|--------------|
| Throwball | Stone Breathing District | Dark stone arena, torches |
| Volleyball | Wind Breathing District | Open sky, floating lanterns |
| Carrom | Shadow Breathing District | Candlelit table, dark chamber |
| Table Tennis | Thunder Breathing District | Electric gold, lightning |
| Powerlifting | Iron Breathing District | Forge, molten metal, chains |
| Squats Challenge | Earth Breathing District | Stone pillars, temple grounds |

**CULTURAL → Named Realms** (beauty, spectacle, wonder)

| Event | Realm Name | Visual Theme |
|-------|-----------|--------------|
| Fashion Show | District of Elegance | Crimson runway, cherry blossoms |
| Duet Dance | Moonlight Courtyard | Full moon, temple garden |
| Group Dance | Performance Plaza | Festival stage, crowd silhouettes |
| Treasure Hunt | The Hidden Path | Forest trail, glowing lanterns |
| Short Film | Chronicles Studio | Film reels, spotlight in darkness |
| BGMI (Online) | The Gaming Realm | Neon + traditional fusion |

**MANAGEMENT → Council Grounds** (strategy, wisdom, power)

| Event | District Name | Visual Theme |
|-------|--------------|--------------|
| Business Quiz | Council Chamber | Scroll room, round table |
| Ads Creation | The Market Quarter | Merchant street, lanterns |
| Mock Interview | The Dojo of Words | Formal chamber, single spotlight |
| Finance Quantum | The Treasury Vault | Gold coins, ancient ledgers |
| Startup Stall | The Innovation Quarter | Ancient city + glowing tech |

---

## 3. TECH STACK

```
Framework:    React 18 + Vite + TypeScript
Routing:      React Router v6 (required — event detail pages are full routes)
Styling:      Tailwind CSS (with custom config)
Animation:    GSAP 3.x + ScrollTrigger + Flip
Form:         React Hook Form + Zod
Icons:        Lucide React
State:        Zustand
Particles:    Custom Canvas (cherry blossom petals — NOT generic circles)
```

Install:
```bash
npm create vite@latest aakriti -- --template react-ts
cd aakriti
npm install gsap @gsap/react tailwindcss postcss autoprefixer react-hook-form zod @hookform/resolvers zustand lucide-react react-router-dom
npx tailwindcss init -p
```

**Routing architecture:**
```
/                     → Homepage (full cinematic scroll experience)
/events/:eventId      → District Detail Page (e.g. /events/sp-01)
```

Each event card's "Enter District →" button navigates to `/events/:eventId`.
React Router's `<Link>` replaces `<a>` tags on all card CTAs.
The detail page reads `eventId` from `useParams()` and looks up the event from `events.ts`.

### Architecture Law
- `src/components/` — JSX only. Zero animation code.
- `src/pages/` — Page-level components: `HomePage.tsx`, `EventDetailPage.tsx`.
- `src/hooks/animations/` — All GSAP hooks. Named `use[Feature]Animation.ts`.
- `src/lib/gsap.ts` — Single GSAP registration file.
- `src/data/events.ts` — Event data, district names, descriptions.
- `src/lib/constants.ts` — Dates, config, particle counts.

---

## 4. PARTICLE SYSTEM — Cherry Blossom Petals

**NOT generic ember dots.** The reference shows falling cherry blossom petals. These are the ambient life of the site.

Each petal is a small irregular ellipse, slightly rotated, drifting downward with a gentle sine wobble and slow rotation. Two sizes: small (3–6px) and large (6–10px). Colors alternate between `--petal-1`, `--petal-2`, and `--petal-3`.

```ts
// PetalCanvas.tsx — persistent canvas, fixed, pointer-events none, z-index 1
interface Petal {
  x: number;
  y: number;
  size: number;           // 3–10
  rotation: number;       // current rotation in degrees
  rotationSpeed: number;  // -0.8 — 0.8 degrees per frame
  speedY: number;         // 0.3–1.2 (falls downward)
  speedX: number;         // -0.3–0.3 (gentle drift)
  opacity: number;        // 0.15–0.65
  wobble: number;         // phase offset
  wobbleSpeed: number;    // 0.008–0.02
  wobbleAmp: number;      // 8–25px horizontal amplitude
  color: string;
}
```

Canvas draw per petal:
```ts
ctx.save();
ctx.translate(petal.x, petal.y);
ctx.rotate((petal.rotation * Math.PI) / 180);
ctx.globalAlpha = petal.opacity;
ctx.fillStyle = petal.color;
ctx.beginPath();
ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
ctx.fill();
ctx.restore();
```

Mobile: 35 petals. Desktop: 70 petals.
Pause loop when `document.visibilityState === 'hidden'`.

**Bonus — Lantern Sway:** Three large semi-transparent circles (60–80px, gold, 0.04 opacity) slowly sway left-right using `requestAnimationFrame` + `Math.sin`. These represent the background lanterns from the reference images.

---

## 5. ANIMATION PLAYBOOK

### 5.1 — Intro Sequence (4.5 seconds)

```
0.0s  Pure black
0.6s  Three thin horizontal gold lines appear from center, expanding outward
      (like the torii gate crossbars emerging from mist)
1.2s  "AAKRITI" reveals letter-by-letter, Cinzel Decorative 900,
      color: gold-fire, from y:40 with blur:8px
2.0s  Below logo: "SIMS Intercollegate Fest · 2026"
      EB Garamond italic, text-body, letter-spacing expands 0.5em → 0.2em
2.5s  Petal canvas begins (petals start invisible, fade in over 0.8s)
3.0s  Crimson radial pulse from center — very subtle, opacity peaks at 0.12
3.5s  IntroOverlay fades out over 0.8s
4.3s  Hero entrance animations begin
```

```ts
// src/hooks/animations/useIntroAnimation.ts
import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';

export function useIntroAnimation(refs, onComplete) {
  useGSAP(() => {
    const { overlay, lines, logoChars, subtitle, flare } = refs;
    const tl = gsap.timeline({ onComplete });

    tl.fromTo(lines,
      { scaleX: 0, opacity: 0, transformOrigin: 'center center' },
      { scaleX: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
      0.6
    );

    tl.fromTo(logoChars,
      { y: 40, opacity: 0, filter: 'blur(10px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.07, ease: 'power3.out' },
      1.2
    );

    tl.fromTo(subtitle,
      { opacity: 0, letterSpacing: '0.5em' },
      { opacity: 1, letterSpacing: '0.2em', duration: 1.0, ease: 'power2.out' },
      2.0
    );

    tl.fromTo(flare,
      { scale: 0, opacity: 0 },
      { scale: 3, opacity: 0.12, duration: 0.6, ease: 'power2.out' },
      2.8
    );
    tl.to(flare, { opacity: 0, duration: 0.4 }, 3.2);

    tl.to(overlay,
      { opacity: 0, duration: 0.9, ease: 'power2.inOut', pointerEvents: 'none' },
      3.5
    );
  });
}
```

### 5.2 — Hero Section

```
Background layers (parallax at different speeds):
  Layer 1 (deepest): void black — static
  Layer 2: very faint stone texture (CSS, 0.03 opacity) — moves at 0.1x scroll
  Layer 3: large background "AAKRITI" ghost text — moves at 0.25x scroll
  Layer 4: PetalCanvas — moves at 0.4x scroll (slightly faster than view)
  Layer 5: Content — moves at 1x (normal)

Content entrance (after intro):
  - Eyebrow: "SFGC · Department of MBA · Inter-collegiate Fest" fades in y:15
  - Main title: 2 lines, clip-path reveal from bottom
    Line 1: "AAKRITI" (Cinzel 900, huge, gold)
    Line 2: "2026" (Cinzel 400, smaller, text-body)  
  - Tagline: "Enter the Castle. Prove Your Realm." — EB Garamond italic
  - CTA: "Enter the Gate ↓" — crimson bg, Cinzel 600, sharp corners
  - Countdown: JetBrains Mono, gold numbers
```

Hero clip-path animation:
```ts
gsap.fromTo('.hero-line',
  { clipPath: 'inset(100% 0% 0% 0%)', y: 15 },
  { clipPath: 'inset(0% 0% 0% 0%)', y: 0,
    duration: 1.2, stagger: 0.25, ease: 'power4.out',
    delay: 0.3  // after intro finishes
  }
);
```

Scroll parallax:
```ts
gsap.to('.hero-ghost-text', {
  y: '-25%',
  ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 }
});
```

### 5.3 — District Category Section (PINNED)

Three full-height panels side by side. The user scrolls but the section stays pinned, revealing panels:

```
Panel 1: Sports — "The Breathing Districts"
  Background tint: deep stone gray, torch-lit amber
  Icon: ⚔️ styled SVG — crossed swords motif
  Tagline: "Where Strength Meets Honour"
  
Panel 2: Cultural — "The Festival Realms"
  Background tint: deep crimson to black
  Icon: 🏮 styled SVG — lantern motif
  Tagline: "Where Art Becomes Legend"

Panel 3: Management — "The Council Grounds"
  Background tint: deep amber to void
  Icon: 📜 styled SVG — scroll motif
  Tagline: "Where Strategy Rules All"
```

```ts
// useCategoryAnimation.ts
ScrollTrigger.create({
  trigger: '.category-pin-section',
  start: 'top top',
  end: '+=250%',
  pin: true,
  scrub: 1.2,
  onUpdate: (self) => {
    const p = self.progress;
    // Panel track moves: 0 → -66.67% over scroll
    gsap.set('.category-track', { x: `-${p * 66.67 * 2}vw` });
    // Fade in panel content based on which panel is active
    if (p > 0.05 && p < 0.45) {
      gsap.to('.panel-sports-content', { opacity: 1, y: 0, duration: 0.1 });
    }
    // etc.
  }
});
```

### 5.4 — District Event Cards

**This is the signature element.** Each card represents a named District, not just an event.

Card anatomy:
```
┌─────────────────────────────────┐
│ [BACKGROUND: atmospheric scene  │  ← SVG/CSS scene, not a photo
│  matching the district theme]   │
│                                 │
│  ── STONE BREATHING DISTRICT ── │  ← Cinzel, gold, uppercase, letter-spaced
│       of the Sports Arena       │  ← EB Garamond italic, text-body
│                                 │
│  THROWBALL                      │  ← Cinzel 700, text-primary, large
│  Team 9v9 · 45 minutes          │  ← EB Garamond, text-ghost
│                                 │
│  [───────────────]              │  ← gold divider line
│  Strength. Speed. Precision.    │  ← tagline, EB Garamond italic
│                                 │
│  [ Enter District → ]           │  ← appears on hover only
└─────────────────────────────────┘
```

CSS scene backgrounds (pure CSS + SVG, no images needed):
```css
.card-stone:before {
  /* Stone gray gradient, subtle texture using repeating-linear-gradient */
  background: 
    radial-gradient(ellipse at 50% 100%, #3A2A10 0%, transparent 60%),
    linear-gradient(180deg, #0D0810 0%, #1A1210 100%);
}
.card-flame:before {
  background:
    radial-gradient(ellipse at 50% 100%, #8B1A0A 0%, transparent 70%),
    linear-gradient(180deg, #0D0810 0%, #1A0A08 100%);
}
.card-moonlight:before {
  background:
    radial-gradient(circle at 50% 20%, #2A2040 0%, transparent 60%),
    linear-gradient(180deg, #080610 0%, #0D0A18 100%);
}
/* etc. for each district theme */
```

Hover animation:
```ts
const cardHoverTl = gsap.timeline({ paused: true });
cardHoverTl
  .to(card, { y: -8, duration: 0.35, ease: 'power2.out' })
  .to(cardBg, { scale: 1.04, duration: 0.4, ease: 'power2.out' }, 0)
  .to(borderTop, { scaleX: 1, duration: 0.4, ease: 'power2.inOut' }, 0)
  .to(districtLabel, { letterSpacing: '0.35em', duration: 0.3 }, 0.05)
  .to(enterBtn, { opacity: 1, y: 0, duration: 0.25 }, 0.1);
```

Scroll entrance (staggered per grid):
```ts
gsap.fromTo('.event-card',
  { y: 60, opacity: 0, rotateX: 8 },
  {
    y: 0, opacity: 1, rotateX: 0,
    duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.events-grid',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  }
);
```

### 5.4 — District Event Cards (Complete — All 17 Events + 3 Placeholder Slots)

**Core Card Architecture (applies to ALL cards)**

Card anatomy:
┌─────────────────────────────────────┐

│ [CSS SCENE BACKGROUND — per theme]  │  ← Pure CSS gradient, no images

│  subtle texture overlay (0.04 opacity)│

│                                     │

│  ── DISTRICT NAME ──────────────── │  ← Cinzel 400, gold, 10px, letter-spacing:0.3em

│     of the [Category] Realm         │  ← EB Garamond italic, text-ghost, 11px

│                                     │

│  EVENT NAME                         │  ← Cinzel 700, text-primary, clamp(16px,4.5vw,22px)

│  Team size · Duration               │  ← EB Garamond, text-ghost, 12px

│                                     │

│  ─────────────── ✦ ─────────────── │  ← thin gold divider, 0.4 opacity

│  "Tagline in italic"                │  ← EB Garamond italic, text-body, 13px

│                                     │

│  [ Enter District → ]               │  ← Cinzel 500, crimson, hidden until hover/tap

└─────────────────────────────────────┘
Left edge: 3px vertical bar — color varies per category:

Sports     → gold (#D4A054)

Cultural   → crimson (#C0392B)

Management → ember (#8B5E1A)
Top edge on hover: gold line draws in from left (scaleX: 0 → 1)

Card lift on hover: y: -8px

---

#### ══ SPORTS — The Breathing Districts ══

**Card SP-01 — THROWBALL**
districtTheme:    card-stone

District Name:    Stone Breathing District

Sub-label:        of the Sports Arena

Event Name:       THROWBALL

Team/Duration:    9v9 · 45 minutes

Tagline:          "Strength hurled into the air."
CSS Scene (card-stone):

background:

radial-gradient(ellipse at 50% 110%, #3A2510 0%, transparent 55%),

radial-gradient(ellipse at 20% 80%, #1A1008 0%, transparent 40%),

linear-gradient(180deg, #0D0A08 0%, #160E0A 100%);

before pseudo (texture):

repeating-linear-gradient(

45deg, transparent, transparent 2px,

rgba(212,160,84,0.015) 2px, rgba(212,160,84,0.015) 4px

);

Left bar color: #D4A054

---

**Card SP-02 — VOLLEYBALL**
districtTheme:    card-wind

District Name:    Wind Breathing District

Sub-label:        of the Sports Arena

Event Name:       VOLLEYBALL

Team/Duration:    6v6 · 60 minutes

Tagline:          "Rise above. Spike harder."
CSS Scene (card-wind):

background:

radial-gradient(ellipse at 50% 0%, #1A2A1A 0%, transparent 50%),

radial-gradient(ellipse at 80% 90%, #0A1A0A 0%, transparent 40%),

linear-gradient(180deg, #080C08 0%, #0D1210 100%);

Faint vertical streaks via repeating-linear-gradient (wind effect):

repeating-linear-gradient(

180deg, transparent, transparent 8px,

rgba(180,220,160,0.012) 8px, rgba(180,220,160,0.012) 9px

);

Left bar color: #D4A054

---

**Card SP-03 — CARROM**
districtTheme:    card-shadow

District Name:    Shadow Breathing District

Sub-label:        of the Sports Arena

Event Name:       CARROM

Team/Duration:    1v1 / 2v2 · 30 minutes

Tagline:          "In silence, only precision survives."
CSS Scene (card-shadow):

background:

radial-gradient(circle at 50% 60%, #1A1520 0%, transparent 50%),

radial-gradient(circle at 50% 60%, #2A1035 0%, #050407 60%);

Candle-glow spot at bottom center:

radial-gradient(ellipse at 50% 100%, #8B5E1A22 0%, transparent 40%);

Left bar color: #D4A054

---

**Card SP-04 — TABLE TENNIS**
districtTheme:    card-thunder

District Name:    Thunder Breathing District

Sub-label:        of the Sports Arena

Event Name:       TABLE TENNIS

Team/Duration:    1v1 · 20 minutes

Tagline:          "Faster than thought. Strike."
CSS Scene (card-thunder):

background:

radial-gradient(ellipse at 50% 20%, #2A2A08 0%, transparent 45%),

radial-gradient(ellipse at 30% 70%, #1A1A05 0%, transparent 35%),

linear-gradient(180deg, #0A0A06 0%, #12100A 100%);

Lightning crack SVG overlay (inline, 0.06 opacity):

A single jagged diagonal line from top-right to bottom-left,

stroke: #F0C070, strokeWidth: 0.5, path drawn via CSS clip-path trick.

Left bar color: #D4A054

---

**Card SP-05 — POWERLIFTING**
districtTheme:    card-iron

District Name:    Iron Breathing District

Sub-label:        of the Sports Arena

Event Name:       POWERLIFTING

Team/Duration:    Solo · 45 minutes

Tagline:          "Forge beyond your limit."
CSS Scene (card-iron):

background:

radial-gradient(ellipse at 50% 100%, #3A1A08 0%, transparent 50%),

radial-gradient(ellipse at 50% 100%, #8B3A0A18 0%, transparent 30%),

linear-gradient(180deg, #0A0806 0%, #1A0E08 100%);

Horizontal chain texture:

repeating-linear-gradient(

90deg, transparent, transparent 14px,

rgba(139,94,26,0.02) 14px, rgba(139,94,26,0.02) 16px

);

Left bar color: #D4A054

---

**Card SP-06 — SQUATS CHALLENGE**
districtTheme:    card-earth

District Name:    Earth Breathing District

Sub-label:        of the Sports Arena

Event Name:       SQUATS CHALLENGE

Team/Duration:    Solo · 15 minutes

Tagline:          "One more. Always one more."
CSS Scene (card-earth):

background:

radial-gradient(ellipse at 50% 100%, #2A1A08 0%, transparent 55%),

radial-gradient(ellipse at 20% 30%, #1A1008 0%, transparent 30%),

linear-gradient(180deg, #0A0806 0%, #14100A 100%);

Subtle stone pillar silhouettes (CSS border trick — two thin dark divs

positioned left and right of card at 15% and 85% x, full height,

width 2px, background rgba(30,20,10,0.5)):

Left bar color: #D4A054

---

#### ══ CULTURAL — The Festival Realms ══

**Card CU-01 — FASHION SHOW**
districtTheme:    card-elegance

District Name:    District of Elegance

Sub-label:        of the Festival Realms

Event Name:       FASHION SHOW

Team/Duration:    5–10 members · 90 minutes

Tagline:          "Walk the crimson path. Own it."
CSS Scene (card-elegance):

background:

radial-gradient(ellipse at 50% 100%, #3A0A10 0%, transparent 55%),

radial-gradient(ellipse at 50% 0%, #1A0508 0%, transparent 40%),

linear-gradient(160deg, #0D0608 0%, #1A0810 50%, #0D0608 100%);

Runway suggestion — thin vertical center line:

linear-gradient(180deg, transparent 0%, rgba(212,160,84,0.06) 40%,

rgba(212,160,84,0.06) 60%, transparent 100%) at x:50%, width:1px

Left bar color: #C0392B

---

**Card CU-02 — DUET DANCE**
districtTheme:    card-moonlight

District Name:    Moonlight Courtyard

Sub-label:        of the Festival Realms

Event Name:       DUET DANCE

Team/Duration:    2 members · 5 minutes

Tagline:          "Two souls. One eternal rhythm."
CSS Scene (card-moonlight):

background:

radial-gradient(circle at 50% 20%, #2A2040 0%, transparent 45%),

radial-gradient(circle at 50% 18%, #1A1530 0%, transparent 30%),

linear-gradient(180deg, #080610 0%, #0D0A18 100%);

Moon glow (top center):

radial-gradient(circle at 50% 5%, rgba(220,210,255,0.08) 0%, transparent 35%)

Left bar color: #C0392B

---

**Card CU-03 — GROUP DANCE**
districtTheme:    card-plaza

District Name:    Performance Plaza

Sub-label:        of the Festival Realms

Event Name:       GROUP DANCE

Team/Duration:    6–15 members · 8 minutes

Tagline:          "Many voices. One thunder."
CSS Scene (card-plaza):

background:

radial-gradient(ellipse at 50% 100%, #3A1010 0%, transparent 50%),

radial-gradient(ellipse at 50% 70%, #8B1A1A18 0%, transparent 35%),

linear-gradient(180deg, #0A0606 0%, #160A0A 100%);

Stage light cone from top center:

conic-gradient from 50% 0%, narrow angle, gold at 0.04 opacity, fades out at 70%

Left bar color: #C0392B

---

**Card CU-04 — TREASURE HUNT**
districtTheme:    card-path

District Name:    The Hidden Path

Sub-label:        of the Festival Realms

Event Name:       TREASURE HUNT

Team/Duration:    3–5 members · 120 minutes

Tagline:          "Seek. Decode. The path is yours."
CSS Scene (card-path):

background:

radial-gradient(ellipse at 50% 100%, #1A2A10 0%, transparent 50%),

radial-gradient(ellipse at 20% 50%, #0A1A08 0%, transparent 30%),

linear-gradient(180deg, #060A06 0%, #0D1208 100%);

Winding path suggestion — subtle diagonal lighter streak at 0.025 opacity

Forest silhouette CSS shapes (3 triangles, dark, bottom of card, 15% height)

Left bar color: #C0392B

---

**Card CU-05 — SHORT FILM**
districtTheme:    card-studio

District Name:    Chronicles Studio

Sub-label:        of the Festival Realms

Event Name:       SHORT FILM

Team/Duration:    2–8 members · Submit 72h prior

Tagline:          "Ten minutes. One story. No forgetting."
CSS Scene (card-studio):

background:

radial-gradient(circle at 30% 40%, #2A1A08 0%, transparent 40%),

radial-gradient(circle at 70% 60%, #1A1008 0%, transparent 30%),

linear-gradient(180deg, #080604 0%, #120E08 100%);

Spotlight cone (off-center):

conic-gradient positioned at 25% 0%, warm gold 0.05 opacity, narrow angle

Film strip suggestion:

repeating-linear-gradient(

90deg, rgba(212,160,84,0.03) 0px, rgba(212,160,84,0.03) 3px,

transparent 3px, transparent 20px

) — bottom 12% of card only

Left bar color: #C0392B

---

**Card CU-06 — BGMI ONLINE**
districtTheme:    card-gaming

District Name:    The Gaming Realm

Sub-label:        of the Festival Realms

Event Name:       BGMI ONLINE

Team/Duration:    4 members · 2 matches

Tagline:          "Squad up. The zone is closing."
CSS Scene (card-gaming):

background:

radial-gradient(ellipse at 50% 50%, #0A1A2A 0%, transparent 55%),

radial-gradient(ellipse at 80% 20%, #0A0A1A 0%, transparent 40%),

linear-gradient(180deg, #050508 0%, #0A0C14 100%);

Grid overlay (tech feel, very subtle):

repeating-linear-gradient(0deg, transparent, transparent 20px,

rgba(100,150,255,0.018) 20px, rgba(100,150,255,0.018) 21px),

repeating-linear-gradient(90deg, transparent, transparent 20px,

rgba(100,150,255,0.018) 20px, rgba(100,150,255,0.018) 21px)

Note: This is the ONLY card allowed a faint blue tint — the Gaming Realm

exists in a different dimension. Keep it at ≤ 0.02 opacity.

Left bar color: #C0392B

---

#### ══ MANAGEMENT — The Council Grounds ══

**Card MG-01 — BUSINESS QUIZ**
districtTheme:    card-council

District Name:    The Council Chamber

Sub-label:        of the Council Grounds

Event Name:       BUSINESS QUIZ

Team/Duration:    2 members · 60 minutes

Tagline:          "Know the market. Command the room."
CSS Scene (card-council):

background:

radial-gradient(circle at 50% 60%, #2A1A08 0%, transparent 50%),

radial-gradient(ellipse at 50% 100%, #3A2208 0%, transparent 40%),

linear-gradient(180deg, #0A0806 0%, #16100A 100%);

Round table suggestion:

radial-gradient(ellipse at 50% 120%, rgba(212,160,84,0.06) 0%, transparent 30%)

Candle glow spots (3 small radial gradients at x:25%, 50%, 75%, y:70%):

each: radial-gradient(circle 20px, rgba(240,192,112,0.08), transparent)

Left bar color: #8B5E1A

---

**Card MG-02 — ADS CREATION**
districtTheme:    card-market

District Name:    The Market Quarter

Sub-label:        of the Council Grounds

Event Name:       ADS CREATION

Team/Duration:    2–4 members · 90 minutes

Tagline:          "Sell the unsellable. Make them believe."
CSS Scene (card-market):

background:

radial-gradient(ellipse at 50% 80%, #2A1808 0%, transparent 55%),

radial-gradient(ellipse at 10% 50%, #1A1008 0%, transparent 30%),

linear-gradient(180deg, #0A0806 0%, #160E08 100%);

Market lantern glow (multiple small warm spots along bottom half):

4× radial-gradient circles, 15px each, rgba(212,160,84,0.07),

positioned at x: 15%, 35%, 65%, 85%, y: 80%

Hanging banner silhouette (CSS — two thin dark rectangles, 8px wide,

40px tall, positioned top-left and top-right, dark fill)

Left bar color: #8B5E1A

---

**Card MG-03 — MOCK INTERVIEW**
districtTheme:    card-dojo

District Name:    The Dojo of Words

Sub-label:        of the Council Grounds

Event Name:       MOCK INTERVIEW

Team/Duration:    Solo · 20 min/slot

Tagline:          "The spotlight is yours. Do not blink."
CSS Scene (card-dojo):

background:

radial-gradient(ellipse at 50% 0%, #2A1A08 0%, transparent 40%),

radial-gradient(ellipse at 50% 30%, #1A1008 0%, transparent 35%),

linear-gradient(180deg, #0A0806 0%, #14100A 100%);

Single center spotlight cone from top:

Positioned at 50% 0%, narrow conic, gold 0.07 opacity, fades at 60% height

Formal wood panel feeling — horizontal repeating lines at 0.015 opacity

Left bar color: #8B5E1A

---

**Card MG-04 — FINANCE QUANTUM**
districtTheme:    card-vault

District Name:    The Treasury Vault

Sub-label:        of the Council Grounds

Event Name:       FINANCE QUANTUM

Team/Duration:    2 members · 75 minutes

Tagline:          "Numbers are power. Wield them."
CSS Scene (card-vault):

background:

radial-gradient(circle at 50% 50%, #1A1508 0%, transparent 55%),

radial-gradient(ellipse at 50% 100%, #2A2008 0%, transparent 40%),

linear-gradient(180deg, #0A0A06 0%, #141208 100%);

Vault door circles (CSS — two concentric border-only circles,

centered, 80px and 50px diameter, border: 1px solid rgba(212,160,84,0.06))

Gold coin suggestion (radial gradient, bottom-right corner, 0.04 opacity)

Left bar color: #8B5E1A

---

**Card MG-05 — STARTUP STALL**
districtTheme:    card-innovation

District Name:    The Innovation Quarter

Sub-label:        of the Council Grounds

Event Name:       STARTUP STALL

Team/Duration:    2–5 members · Full day

Tagline:          "Build it. Pitch it. Win the quarter."
CSS Scene (card-innovation):

background:

radial-gradient(ellipse at 50% 80%, #1A1808 0%, transparent 55%),

radial-gradient(ellipse at 80% 20%, #101408 0%, transparent 35%),

linear-gradient(180deg, #080A06 0%, #101208 100%);

Innovation grid overlay (matches card-gaming but amber tinted):

repeating-linear-gradient(0deg, transparent, transparent 18px,

rgba(212,160,84,0.014) 18px, rgba(212,160,84,0.014) 19px),

repeating-linear-gradient(90deg, transparent, transparent 18px,

rgba(212,160,84,0.014) 18px, rgba(212,160,84,0.014) 19px)

Pagoda silhouette (CSS — two dark rectangles stacked with decreasing width,

bottom-center of card, very dark, 0.3 opacity)

Left bar color: #8B5E1A

---

#### ══ PLACEHOLDER SLOTS (3 reserved) ══

**Card PH-01 — [RESERVED EVENT SLOT]**
districtTheme:    card-placeholder-1

District Name:    The Forgotten District

Sub-label:        of [Category TBD]

Event Name:       [EVENT NAME]

Team/Duration:    [TEAM] · [DURATION]

Tagline:          "[To be written]"
CSS Scene: Same as card-stone (stone as default fallback)

Left bar color: #4A3A35 (ghost — signals "not yet revealed")

Card opacity: 0.6 (slightly faded — "coming soon" effect)

Overlay text: "COMING SOON" in Cinzel, letter-spaced, crimson, opacity 0.4

**Card PH-02 — [RESERVED EVENT SLOT]**
districtTheme:    card-placeholder-2

(same structure as PH-01)

**Card PH-03 — [RESERVED EVENT SLOT]**
districtTheme:    card-placeholder-3

(same structure as PH-01)

Activating a placeholder — just update `events.ts`:
```ts
// Change this:
{ id: 'ph-01', name: '[EVENT NAME]', districtTheme: 'card-placeholder-1', ... }
// To this:
{ id: 'ph-01', name: 'New Event', districtName: 'The New District', districtTheme: 'card-stone', ... }
// The card automatically activates — no other changes needed.
```

---

**Shared hover timeline for ALL 20 cards (sports/cultural/management):**
```ts
// useCardAnimation.ts — applied once, works for all card types
cards.forEach((card) => {
  const borderTop  = card.querySelector('.card-border-top');
  const distLabel  = card.querySelector('.card-district-label');
  const enterBtn   = card.querySelector('.card-enter-btn');
  const bgLayer    = card.querySelector('.card-bg');

  const tl = gsap.timeline({ paused: true });
  tl
    .to(card,       { y: -8, duration: 0.35, ease: 'power2.out' })
    .to(bgLayer,    { scale: 1.04, duration: 0.4, ease: 'power2.out' }, 0)
    .to(borderTop,  { scaleX: 1, transformOrigin: 'left', duration: 0.4, ease: 'power2.inOut' }, 0)
    .to(distLabel,  { letterSpacing: '0.35em', duration: 0.3, ease: 'power2.out' }, 0.05)
    .to(enterBtn,   { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, 0.1);

  card.addEventListener('mouseenter', () => tl.play());
  card.addEventListener('mouseleave', () => tl.reverse());

  // Mobile tap equivalent
  card.addEventListener('touchstart', () => tl.play(), { passive: true });
  card.addEventListener('touchend',   () => setTimeout(() => tl.reverse(), 800), { passive: true });
});
```
That's the complete 5.4 — every one of the 17 events has its own card spec, plus 3 placeholder slots. A few things worth noting:
Why each card has its own CSS scene instead of a photo: Since you're building a React app for mobile and can't guarantee fast image loads, pure CSS gradients render instantly, stay crisp at all resolutions, and cost zero network. The atmospheric feel comes from the layering — you can always swap a real background image in later by just adding it as an additional background layer behind the gradients.
The placeholder pattern is important — "The Forgotten District" at 0.6 opacity and a "Coming Soon" label lets you ship with the 17 confirmed events and reveal new ones just by updating events.ts. No code changes needed.
Card PH-01 through PH-03 also serve as teasers —

### 5.5 — Section Transitions

Between each major section (Hero → Category → Sports → Cultural → Management → Footer), add a visual "breath" element:

```tsx
// SectionDivider.tsx — reusable
// A thin gold horizontal line with a small lantern icon (SVG) centered on it
// The line draws from center outward on scroll entrance
// The lantern sways with a slow GSAP repeat animation
```

```ts
gsap.to('.lantern-divider', {
  rotation: 3,
  duration: 2.5,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  transformOrigin: 'top center'
});
```

### 5.6 — Navbar

Starts transparent. On scroll > 60px:
```ts
gsap.to('.navbar', {
  backgroundColor: 'rgba(5, 4, 7, 0.88)',
  backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(212, 160, 84, 0.12)',
  duration: 0.5
});
```

Mobile hamburger → full screen menu:
```
Background: castle-deep
Large ghost "AAKRITI" text — Cinzel 900, 15vw, opacity: 0.03, centered
Links stagger in from y:25, EB Garamond, 28px
Gold line dividers between links
Petals continue playing behind
```

---

### 5.7 — District Detail Page (Full-Page Event View)

**File:** `src/pages/EventDetailPage.tsx`
**Route:** `/events/:eventId`
**Hook:** `src/hooks/animations/useDistrictEntranceAnimation.ts`

This is the cinematic centerpiece triggered when a user clicks "Enter District →" on any card. Each of the 17 events gets its own named entrance animation — the world *opens* differently for every District.

---

#### Page Layout

```
┌─────────────────────────────────────────────────────┐
│  [FULL VIEWPORT BACKGROUND — district CSS scene,    │
│   same gradient as card but now full-screen]        │
│                                                     │
│  ← Back to Districts          [AAKRITI logo, right] │  ← Navbar (frosted)
│                                                     │
│  ── DISTRICT NAME ─────────────────────────────── ─ │  ← Cinzel 400, gold, 11px
│     of the [Category] Realm                         │
│                                                     │
│  EVENT NAME                                         │  ← Cinzel 900, text-primary
│                                                     │  ← clamp(36px, 10vw, 72px)
│  "Tagline in italic"                                │  ← EB Garamond italic
│                                                     │
│  ╔══════════════════════════╗                       │
│  ║  Team: 9v9               ║  ← gold border box   │
│  ║  Duration: 45 minutes    ║                       │
│  ║  Category: Sports        ║                       │
│  ╚══════════════════════════╝                       │
│                                                     │
│  [Description paragraph]                            │  ← EB Garamond, body
│                                                     │
│  ─────────── ✦ ───────────                         │  ← divider
│                                                     │
│  [ REGISTER FOR THIS DISTRICT → ]                   │  ← Full-width crimson CTA
│                                                     │
│  [PetalCanvas continues floating behind]            │
└─────────────────────────────────────────────────────┘
```

Background: Same CSS gradient class as the card (e.g. `card-stone`) but applied to the full viewport via a fixed `::before` pseudo-element. Scale starts at 1.08 and settles to 1.0 as part of the entrance, giving the feeling of the world zooming into view.

Mobile layout: All content stacks vertically, single column, 24px side padding. Stats box goes full-width. CTA button is 100% width.

---

#### Entrance Animation Architecture

**All 17 entrances share this three-phase skeleton:**

```ts
// src/hooks/animations/useDistrictEntranceAnimation.ts

import { useGSAP } from '@gsap/react';
import { gsap } from '../../lib/gsap';
import { DISTRICT_ENTRANCE_MAP } from '../lib/districtEntrances';

export function useDistrictEntranceAnimation(
  containerRef: React.RefObject<HTMLElement>,
  districtTheme: string
) {
  useGSAP(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const container = containerRef.current;
    if (!container) return;

    if (prefersReduced) {
      // Instant fade — no complex animation
      gsap.fromTo(container,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      return;
    }

    const master = gsap.timeline();

    // ── PHASE A: Environment builds (unique per district, 0.8–1.2s) ──
    const phaseA = DISTRICT_ENTRANCE_MAP[districtTheme]?.(container)
      ?? buildDefaultEntrance(container); // fallback for placeholders
    master.add(phaseA, 0);

    // ── PHASE B: Content enters (shared, 0.9s) ──
    const districtLabel = container.querySelector('.detail-district-label');
    const eventName     = container.querySelector('.detail-event-name');
    const tagline       = container.querySelector('.detail-tagline');
    const statsBox      = container.querySelector('.detail-stats-box');
    const description   = container.querySelector('.detail-description');
    const ctaBtn        = container.querySelector('.detail-cta');

    master.fromTo(districtLabel,
      { y: 20, opacity: 0, letterSpacing: '0.5em' },
      { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 0.5, ease: 'power2.out' },
      0.6
    );
    master.fromTo(eventName,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 12 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.8, ease: 'power4.out' },
      0.75
    );
    master.fromTo(tagline,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      1.1
    );
    master.fromTo(statsBox,
      { opacity: 0, y: 15, rotateX: 6 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.55, ease: 'power3.out' },
      1.25
    );
    master.fromTo(description,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' },
      1.45
    );
    master.fromTo(ctaBtn,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      1.6
    );

    // ── PHASE C: Idle loop (shared, repeats indefinitely) ──
    const leftBar = container.querySelector('.detail-left-bar');
    const bg      = container.querySelector('.detail-bg');

    // Left bar breathes
    gsap.to(leftBar, {
      opacity: 0.6, duration: 2.2,
      ease: 'sine.inOut', repeat: -1, yoyo: true,
      delay: 1.8
    });

    // Background very slowly breathes scale
    gsap.to(bg, {
      scale: 1.015, duration: 8,
      ease: 'sine.inOut', repeat: -1, yoyo: true,
      delay: 2.0
    });

  }, { scope: containerRef });
}
```

---

#### DISTRICT_ENTRANCE_MAP — All 17 Unique Phase A Entrances

**File:** `src/lib/districtEntrances.ts`

Each function receives the page container element and returns a **paused GSAP timeline** that Phase A plays. Every entrance animates only `transform` and `opacity` — compositor-thread only, zero layout thrash.

```ts
// src/lib/districtEntrances.ts
import { gsap } from './gsap';

export type EntranceFn = (container: HTMLElement) => GSAPTimeline;
export const DISTRICT_ENTRANCE_MAP: Record<string, EntranceFn> = {
  'card-stone':      buildStoneEntrance,
  'card-wind':       buildWindEntrance,
  'card-shadow':     buildShadowEntrance,
  'card-thunder':    buildThunderEntrance,
  'card-iron':       buildIronEntrance,
  'card-earth':      buildEarthEntrance,
  'card-elegance':   buildEleganceEntrance,
  'card-moonlight':  buildMoonlightEntrance,
  'card-plaza':      buildPlazaEntrance,
  'card-path':       buildHiddenPathEntrance,
  'card-studio':     buildStudioEntrance,
  'card-gaming':     buildGamingEntrance,
  'card-council':    buildCouncilEntrance,
  'card-market':     buildMarketEntrance,
  'card-dojo':       buildDojoEntrance,
  'card-vault':      buildVaultEntrance,
  'card-innovation': buildInnovationEntrance,
};
```

---

##### ══ SPORTS ENTRANCES ══

**SP-01 · Stone Breathing District · THROWBALL**
*The stone arena emerges from absolute darkness. Ancient torches ignite one by one from left to right.*

```ts
function buildStoneEntrance(container: HTMLElement): GSAPTimeline {
  const bg      = container.querySelector('.detail-bg') as HTMLElement;
  const torches = container.querySelectorAll('.detail-torch-glow'); // 3 pseudo-elements via JS-injected divs
  const dust    = container.querySelector('.detail-dust-overlay') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Background rises from void — scale AND brightness
  tl.fromTo(bg,
    { scale: 1.12, opacity: 0, filter: 'brightness(0)' },
    { scale: 1.08, opacity: 1, filter: 'brightness(0.4)',
      duration: 0.9, ease: 'power2.out' },
    0
  );
  // Brightness increases to full as content arrives
  tl.to(bg,
    { filter: 'brightness(1)', scale: 1.0,
      duration: 0.8, ease: 'power1.inOut' },
    0.5
  );

  // Three torch glows bloom left → center → right (staggered 0.2s apart)
  // Each is a small div absolutely positioned at torch locations
  tl.fromTo(torches,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4,
      stagger: 0.2, ease: 'back.out(2.5)' },
    0.3
  );

  // Stone dust particles drift down (opacity only — positions set randomly by CSS)
  tl.fromTo(dust,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.5
  );

  return tl;
}
```

Torch glow divs (injected by `EventDetailPage.tsx` for stone/iron themes):
```tsx
// Placed absolutely inside .detail-bg, pointer-events: none
<div className="detail-torch-glow" style={{ left: '15%', top: '60%' }} />
<div className="detail-torch-glow" style={{ left: '50%', top: '55%' }} />
<div className="detail-torch-glow" style={{ left: '85%', top: '60%' }} />
// Each: width/height 80px, borderRadius 50%,
//        background: radial-gradient(circle, rgba(212,160,84,0.18) 0%, transparent 70%)
```

---

**SP-02 · Wind Breathing District · VOLLEYBALL**
*The sky opens. A single lantern tears upward from below, trailing light.*

```ts
function buildWindEntrance(container: HTMLElement): GSAPTimeline {
  const bg      = container.querySelector('.detail-bg') as HTMLElement;
  const lantern = container.querySelector('.detail-wind-lantern') as HTMLElement;
  const streaks = container.querySelectorAll('.detail-wind-streak'); // 4 thin divs

  const tl = gsap.timeline({ paused: true });

  // Sky brightens from bottom (the horizon appears)
  tl.fromTo(bg,
    { scale: 1.1, opacity: 0 },
    { scale: 1.0, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
    0
  );

  // Wind streaks shoot horizontally across (left to right, staggered)
  tl.fromTo(streaks,
    { x: '-120%', opacity: 0 },
    { x: '120%', opacity: 0.25,
      duration: 0.55, stagger: 0.08, ease: 'power3.in' },
    0.2
  );
  // Fade streaks out after crossing
  tl.to(streaks, { opacity: 0, duration: 0.2 }, 0.65);

  // Lantern rises from below center
  tl.fromTo(lantern,
    { y: '60%', opacity: 0, scale: 0.6 },
    { y: '0%', opacity: 1, scale: 1.0,
      duration: 0.9, ease: 'power3.out' },
    0.35
  );

  return tl;
}
```

Wind streak divs: `height: 1px`, `width: 40%`, `background: rgba(180,220,160,0.4)`, positioned at different vertical offsets across the card.

---

**SP-03 · Shadow Breathing District · CARROM**
*Pure darkness. A single candle flame appears at the center bottom and slowly bleeds light outward — never fully illuminating the room.*

```ts
function buildShadowEntrance(container: HTMLElement): GSAPTimeline {
  const bg     = container.querySelector('.detail-bg') as HTMLElement;
  const candle = container.querySelector('.detail-candle-glow') as HTMLElement;
  const flame  = container.querySelector('.detail-candle-flame') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Background appears — stays very dark
  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power1.out' },
    0
  );

  // Candle glow radiates slowly from bottom center
  tl.fromTo(candle,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.1, ease: 'power1.out' },
    0.4
  );

  // Flame flickers in (small scale variation, repeat)
  tl.fromTo(flame,
    { scaleY: 0, opacity: 0 },
    { scaleY: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' },
    0.6
  );

  // Ongoing flame flicker (yoyo repeat from onset)
  tl.to(flame,
    { scaleY: 0.85, scaleX: 1.1, duration: 0.25,
      ease: 'sine.inOut', repeat: -1, yoyo: true },
    0.9
  );

  return tl;
}
```

Candle glow div: `position: absolute`, `bottom: 20%`, `left: 50%`, `transform: translateX(-50%)`, `width: 200px`, `height: 200px`, `borderRadius: 50%`, `background: radial-gradient(circle, rgba(139,94,26,0.22) 0%, transparent 70%)`.

Flame div: `width: 6px`, `height: 18px`, `borderRadius: 3px 3px 50% 50%`, `background: linear-gradient(180deg, #F0C070, #C0392B)`, `bottom: calc(20% + 100px)`, centered.

---

**SP-04 · Thunder Breathing District · TABLE TENNIS**
*A flash of lightning splits the screen. The afterburn lingers. Then the world resolves.*

```ts
function buildThunderEntrance(container: HTMLElement): GSAPTimeline {
  const bg        = container.querySelector('.detail-bg') as HTMLElement;
  const flashDiv  = container.querySelector('.detail-thunder-flash') as HTMLElement;
  const crack     = container.querySelector('.detail-lightning-crack') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Full white flash (the lightning strike)
  tl.fromTo(flashDiv,
    { opacity: 0 },
    { opacity: 0.85, duration: 0.06, ease: 'none' },
    0.1
  );
  tl.to(flashDiv,
    { opacity: 0, duration: 0.35, ease: 'power3.out' },
    0.16
  );

  // Second smaller flash (echo)
  tl.fromTo(flashDiv,
    { opacity: 0 },
    { opacity: 0.35, duration: 0.04 },
    0.3
  );
  tl.to(flashDiv, { opacity: 0, duration: 0.2 }, 0.34);

  // Background fades in during afterburn
  tl.fromTo(bg,
    { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.out' },
    0.12
  );

  // Lightning crack SVG fades in as afterimage
  tl.fromTo(crack,
    { opacity: 0, scaleY: 0, transformOrigin: 'top center' },
    { opacity: 0.08, scaleY: 1, duration: 0.4, ease: 'power4.out' },
    0.15
  );
  tl.to(crack, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.7);

  return tl;
}
```

Flash div: `position: fixed`, `inset: 0`, `background: #F0C070`, `pointerEvents: none`, `zIndex: 10`.
Lightning crack: inline SVG `<path>` — jagged diagonal from top-right to bottom-left, `stroke: #F0C070`, `strokeWidth: 1.5`, `fill: none`.

---

**SP-05 · Iron Breathing District · POWERLIFTING**
*The forge awakens. Heat rises from the bottom. Sparks arc upward. Metal screams into existence.*

```ts
function buildIronEntrance(container: HTMLElement): GSAPTimeline {
  const bg     = container.querySelector('.detail-bg') as HTMLElement;
  const heat   = container.querySelector('.detail-forge-heat') as HTMLElement;
  const sparks = container.querySelectorAll('.detail-spark'); // 8 tiny divs

  const tl = gsap.timeline({ paused: true });

  // Background up from dark with heat tint
  tl.fromTo(bg,
    { scale: 1.1, opacity: 0, filter: 'brightness(0) saturate(0)' },
    { scale: 1.02, opacity: 1, filter: 'brightness(0.5) saturate(1.5)',
      duration: 0.7, ease: 'power2.out' },
    0
  );
  tl.to(bg,
    { filter: 'brightness(1) saturate(1)', scale: 1.0,
      duration: 0.8, ease: 'power1.inOut' },
    0.6
  );

  // Forge heat bloom rises from bottom
  tl.fromTo(heat,
    { y: '30%', opacity: 0, scale: 0.6 },
    { y: '0%', opacity: 1, scale: 1.0,
      duration: 0.9, ease: 'power2.out' },
    0.2
  );

  // Sparks arc upward from bottom (each on different trajectory)
  // Positions pre-set via CSS custom props on each .detail-spark element
  sparks.forEach((spark, i) => {
    const el = spark as HTMLElement;
    const xEnd = (i % 2 === 0 ? -1 : 1) * (20 + i * 8);
    tl.fromTo(el,
      { y: 0, x: 0, opacity: 1, scale: 1 },
      { y: -(80 + i * 15), x: xEnd, opacity: 0, scale: 0.3,
        duration: 0.6 + i * 0.05, ease: 'power2.out' },
      0.3 + i * 0.04
    );
  });

  return tl;
}
```

Spark divs: `width: 3px`, `height: 3px`, `borderRadius: 50%`, `background: #F0C070`, clustered near `bottom: 30%`, `left: 45–55%`.
Forge heat div: same structure as torch glow but larger — `width: 400px`, `height: 300px`, `bottom: 0`, centered.

---

**SP-06 · Earth Breathing District · SQUATS CHALLENGE**
*Stone pillars rise from below. Dust settles. The temple grounds reveal themselves — slow, inevitable, ancient.*

```ts
function buildEarthEntrance(container: HTMLElement): GSAPTimeline {
  const bg      = container.querySelector('.detail-bg') as HTMLElement;
  const pillarL = container.querySelector('.detail-pillar-left') as HTMLElement;
  const pillarR = container.querySelector('.detail-pillar-right') as HTMLElement;
  const dust    = container.querySelector('.detail-dust-overlay') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Earth tone bg rises — heavier, slower than stone
  tl.fromTo(bg,
    { scale: 1.08, opacity: 0, y: '3%' },
    { scale: 1.0, opacity: 1, y: '0%',
      duration: 1.2, ease: 'power1.inOut' },
    0
  );

  // Left pillar rises from below (slightly delayed from right)
  tl.fromTo(pillarL,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out' },
    0.2
  );
  tl.fromTo(pillarR,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out' },
    0.3
  );

  // Dust settles (fades in then slowly out)
  tl.fromTo(dust,
    { opacity: 0 },
    { opacity: 0.4, duration: 0.5, ease: 'power2.out' },
    0.5
  );
  tl.to(dust, { opacity: 0.15, duration: 1.5, ease: 'power1.inOut' }, 1.0);

  return tl;
}
```

Pillar divs: `position: absolute`, `width: 14px`, `height: 70%`, `bottom: 0`, one at `left: 14%`, one at `right: 14%`. `background: linear-gradient(180deg, rgba(20,16,10,0) 0%, rgba(30,22,14,0.6) 100%)`.

---

##### ══ CULTURAL ENTRANCES ══

**CU-01 · District of Elegance · FASHION SHOW**
*The crimson runway materializes center-screen, extending toward the viewer. Cherry blossoms cascade from both sides. The catwalk awaits.*

```ts
function buildEleganceEntrance(container: HTMLElement): GSAPTimeline {
  const bg       = container.querySelector('.detail-bg') as HTMLElement;
  const runway   = container.querySelector('.detail-runway-line') as HTMLElement;
  const petals   = container.querySelectorAll('.detail-elegance-petal'); // 6 divs

  const tl = gsap.timeline({ paused: true });

  // Background reveals with a crimson saturation bloom
  tl.fromTo(bg,
    { scale: 1.08, opacity: 0, filter: 'saturate(0)' },
    { scale: 1.0, opacity: 1, filter: 'saturate(1)',
      duration: 1.0, ease: 'power2.inOut' },
    0
  );

  // Runway line draws from center downward (scaleY)
  tl.fromTo(runway,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 0.08, duration: 0.8, ease: 'power3.out' },
    0.3
  );

  // Petals sweep in from both sides (3 from left, 3 from right)
  petals.forEach((petal, i) => {
    const fromLeft = i < 3;
    const el = petal as HTMLElement;
    tl.fromTo(el,
      { x: fromLeft ? '-120%' : '120%', opacity: 0, rotation: fromLeft ? -40 : 40 },
      { x: '0%', opacity: 1, rotation: 0,
        duration: 0.7, ease: 'power2.out' },
      0.4 + i * 0.07
    );
  });

  return tl;
}
```

Runway line: `position: absolute`, `left: 50%`, `transform: translateX(-50%)`, `width: 1px`, `height: 80%`, `top: 10%`, `background: linear-gradient(180deg, transparent, rgba(212,160,84,0.25), transparent)`.
Petal divs: irregular ellipses using `border-radius: 50% 50% 50% 0`, `width: 20px`, `height: 12px`, colors from `--petal-1/2/3`, scattered across upper 60% of container.

---

**CU-02 · Moonlight Courtyard · DUET DANCE**
*Total darkness. A full moon rises from the center top, casting silver light that bleeds slowly downward. Two soft spotlight pools bloom at the bottom — the dance positions.*

```ts
function buildMoonlightEntrance(container: HTMLElement): GSAPTimeline {
  const bg        = container.querySelector('.detail-bg') as HTMLElement;
  const moon      = container.querySelector('.detail-moon') as HTMLElement;
  const moonGlow  = container.querySelector('.detail-moon-glow') as HTMLElement;
  const spotLeft  = container.querySelector('.detail-spot-left') as HTMLElement;
  const spotRight = container.querySelector('.detail-spot-right') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Background fades to deep indigo-void
  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power1.out' },
    0
  );

  // Moon rises from top (scale from 0)
  tl.fromTo(moon,
    { scale: 0, opacity: 0, y: '-20px' },
    { scale: 1, opacity: 1, y: '0px', duration: 0.9, ease: 'back.out(1.4)' },
    0.3
  );

  // Moon glow expands around it
  tl.fromTo(moonGlow,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.1, ease: 'power1.out' },
    0.5
  );

  // Two dance position spots bloom at bottom
  tl.fromTo(spotLeft,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.8
  );
  tl.fromTo(spotRight,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.95
  );

  // Ongoing: moon sways very gently (the courtyard breathes)
  tl.to(moon,
    { y: '6px', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true },
    1.5
  );

  return tl;
}
```

Moon div: `width: 60px`, `height: 60px`, `borderRadius: 50%`, `background: radial-gradient(circle, rgba(220,210,255,0.9) 0%, rgba(180,170,230,0.3) 60%, transparent 100%)`, `top: 8%`, centered.
Moon glow: `width: 200px`, `height: 200px`, `borderRadius: 50%`, same center, `background: radial-gradient(circle, rgba(200,190,255,0.12) 0%, transparent 70%)`.
Spot divs: `width: 120px`, `height: 120px`, `borderRadius: 50%`, `bottom: 15%`, at `left: 30%` and `right: 30%`. `background: radial-gradient(circle, rgba(200,190,255,0.1) 0%, transparent 70%)`.

---

**CU-03 · Performance Plaza · GROUP DANCE**
*The stage flood-lights hit all at once — a broad wash of warm amber. Crowd silhouettes appear at the bottom. The curtain rises.*

```ts
function buildPlazaEntrance(container: HTMLElement): GSAPTimeline {
  const bg          = container.querySelector('.detail-bg') as HTMLElement;
  const stageLight  = container.querySelector('.detail-stage-light') as HTMLElement;
  const crowd       = container.querySelector('.detail-crowd-silhouette') as HTMLElement;
  const curtainL    = container.querySelector('.detail-curtain-left') as HTMLElement;
  const curtainR    = container.querySelector('.detail-curtain-right') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Background snaps in with the lights — fast
  tl.fromTo(bg,
    { opacity: 0, scale: 1.04 },
    { opacity: 1, scale: 1.0, duration: 0.5, ease: 'power2.out' },
    0
  );

  // Stage light cone bursts from top center
  tl.fromTo(stageLight,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
    0.1
  );

  // Curtains pull apart (scaleX from center outward)
  tl.fromTo(curtainL,
    { x: '0%' },
    { x: '-100%', duration: 0.7, ease: 'power2.inOut' },
    0.05
  );
  tl.fromTo(curtainR,
    { x: '0%' },
    { x: '100%', duration: 0.7, ease: 'power2.inOut' },
    0.05
  );

  // Crowd rises into view from bottom
  tl.fromTo(crowd,
    { y: '40%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.5
  );

  return tl;
}
```

Curtain divs: `position: absolute`, `top: 0`, `width: 50%`, `height: 100%`. Left at `left: 0`, right at `right: 0`. `background: rgba(8,4,6,0.9)`.
Stage light: wide conic div — `position: absolute`, `top: 0`, centered, `width: 80%`, `height: 70%`, `clipPath: polygon(40% 0%, 60% 0%, 90% 100%, 10% 100%)`, `background: radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.06) 0%, transparent 70%)`.
Crowd: CSS-only silhouettes — `position: absolute`, `bottom: 0`, `width: 100%`, `height: 18%`, `background` using repeating humped shapes approximated by `border-radius` on multiple small divs, all very dark `rgba(5,4,7,0.85)`.

---

**CU-04 · The Hidden Path · TREASURE HUNT**
*Fog rolls in from the left. Lanterns flicker into existence along a winding path. The map reveals itself one fragment at a time.*

```ts
function buildHiddenPathEntrance(container: HTMLElement): GSAPTimeline {
  const bg       = container.querySelector('.detail-bg') as HTMLElement;
  const fog      = container.querySelector('.detail-fog') as HTMLElement;
  const lanterns = container.querySelectorAll('.detail-path-lantern'); // 3 divs
  const mapFrag  = container.querySelector('.detail-map-fragment') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Forest dark background
  tl.fromTo(bg,
    { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1.0, duration: 0.9, ease: 'power1.inOut' },
    0
  );

  // Fog drifts in from left
  tl.fromTo(fog,
    { x: '-40%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 1.2, ease: 'power1.out' },
    0.1
  );

  // Lanterns flicker on one by one along the "path"
  tl.fromTo(lanterns,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4,
      stagger: 0.3, ease: 'back.out(2)' },
    0.5
  );

  // Map fragment fades in at bottom (a subtle hint of treasure)
  tl.fromTo(mapFrag,
    { opacity: 0, rotation: -8 },
    { opacity: 0.12, rotation: -5, duration: 0.6, ease: 'power2.out' },
    1.0
  );

  return tl;
}
```

Fog div: `position: absolute`, `inset: 0`, `background: radial-gradient(ellipse at 30% 50%, rgba(20,30,15,0.5) 0%, transparent 70%)`, `pointerEvents: none`.
Lantern divs: three small circular glows (`width: 24px`, `height: 24px`, `borderRadius: 50%`, `background: radial-gradient(circle, rgba(212,160,84,0.6) 0%, transparent 70%)`), positioned along a diagonal path from `bottom: 30%, left: 20%` → `center` → `top: 40%, right: 60%`.

---

**CU-05 · Chronicles Studio · SHORT FILM**
*Black. A single spotlight clicks on — off-center, like a movie set. Film reel texture scrolls upward faintly. A clapperboard slaps: the scene begins.*

```ts
function buildStudioEntrance(container: HTMLElement): GSAPTimeline {
  const bg          = container.querySelector('.detail-bg') as HTMLElement;
  const spotlight   = container.querySelector('.detail-studio-spot') as HTMLElement;
  const filmStrip   = container.querySelector('.detail-film-strip') as HTMLElement;
  const clap        = container.querySelector('.detail-clap-flash') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Black — held for a beat (dramatic)
  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'none' },
    0.4
  );

  // Clap flash — single frame white burst
  tl.fromTo(clap,
    { opacity: 0 },
    { opacity: 0.6, duration: 0.04 },
    0.42
  );
  tl.to(clap, { opacity: 0, duration: 0.2 }, 0.46);

  // Spotlight cone opens (scaleX from 0 at top)
  tl.fromTo(spotlight,
    { scaleX: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
    0.5
  );

  // Film strip scrolls up (translateY animation on a tall strip div)
  tl.fromTo(filmStrip,
    { y: '0%', opacity: 0 },
    { y: '-30%', opacity: 0.04,
      duration: 6, ease: 'none', repeat: -1 },
    0.7
  );

  return tl;
}
```

Spotlight: `position: absolute`, `top: 0`, `left: 20%`, `width: 35%`, `height: 75%`, `clipPath: polygon(35% 0%, 65% 0%, 90% 100%, 10% 100%)`, `background: radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.07) 0%, transparent 80%)`.
Film strip: `position: absolute`, `top: 0`, `width: 100%`, `height: 200%`, `background` using `repeating-linear-gradient` for frame lines at the edges (12px wide strips at `left: 0` and `right: 0`, with `background: repeating-linear-gradient(180deg, rgba(212,160,84,0.04) 0px, rgba(212,160,84,0.04) 3px, transparent 3px, transparent 22px)`).

---

**CU-06 · The Gaming Realm · BGMI ONLINE**
*A digital grid scans in from top to bottom — like a radar sweep. Zone circle contracts from the edges. A squad marker blinks into existence.*

```ts
function buildGamingEntrance(container: HTMLElement): GSAPTimeline {
  const bg      = container.querySelector('.detail-bg') as HTMLElement;
  const scanBar = container.querySelector('.detail-scan-bar') as HTMLElement;
  const grid    = container.querySelector('.detail-gaming-grid') as HTMLElement;
  const zone    = container.querySelector('.detail-zone-ring') as HTMLElement;
  const marker  = container.querySelector('.detail-squad-marker') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Blue-tinted void activates
  tl.fromTo(bg,
    { opacity: 0, filter: 'brightness(0)' },
    { opacity: 1, filter: 'brightness(1)', duration: 0.5, ease: 'power2.out' },
    0
  );

  // Scan bar sweeps top → bottom (the radar sweep)
  tl.fromTo(scanBar,
    { y: '-100%', opacity: 0 },
    { y: '100%', opacity: 1,
      duration: 0.65, ease: 'none' },
    0.1
  );
  tl.to(scanBar, { opacity: 0, duration: 0.1 }, 0.75);

  // Grid fades in after scan
  tl.fromTo(grid,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' },
    0.5
  );

  // Zone ring contracts (scale from 2 to 1)
  tl.fromTo(zone,
    { scale: 2.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.6
  );

  // Squad marker blinks 3 times then stays on
  tl.fromTo(marker,
    { opacity: 0 },
    { opacity: 1, duration: 0.08, repeat: 5, yoyo: true },
    0.9
  );

  return tl;
}
```

Scan bar: `position: absolute`, `left: 0`, `width: 100%`, `height: 2px`, `background: linear-gradient(90deg, transparent, rgba(100,150,255,0.6), transparent)`, `boxShadow: 0 0 8px rgba(100,150,255,0.4)`.
Zone ring: `position: absolute`, centered, `width: 200px`, `height: 200px`, `borderRadius: 50%`, `border: 1px solid rgba(100,150,255,0.25)`, `background: transparent`.
Squad marker: `width: 8px`, `height: 8px`, `borderRadius: 50%`, `background: rgba(100,200,100,0.8)`, `boxShadow: 0 0 6px rgba(100,200,100,0.6)`, positioned near `center`.
Note: This is the one card where the `boxShadow` subtle glow is permitted — it matches the Gaming Realm's established "different dimension" exception.

---

##### ══ MANAGEMENT ENTRANCES ══

**MG-01 · The Council Chamber · BUSINESS QUIZ**
*Three candles ignite on a round table. A scroll unfurls. The council is now in session.*

```ts
function buildCouncilEntrance(container: HTMLElement): GSAPTimeline {
  const bg      = container.querySelector('.detail-bg') as HTMLElement;
  const table   = container.querySelector('.detail-table-glow') as HTMLElement;
  const candles = container.querySelectorAll('.detail-council-candle'); // 3
  const scroll  = container.querySelector('.detail-scroll-line') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Chamber materializes — amber warmth creeps in slowly
  tl.fromTo(bg,
    { opacity: 0, filter: 'brightness(0)' },
    { opacity: 1, filter: 'brightness(0.5)', duration: 0.8, ease: 'power1.out' },
    0
  );
  tl.to(bg,
    { filter: 'brightness(1)', duration: 0.9, ease: 'power1.inOut' },
    0.7
  );

  // Table glow radiates from bottom center
  tl.fromTo(table,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.3
  );

  // Three candles ignite staggered (same mechanic as torch glows, amber)
  tl.fromTo(candles,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35,
      stagger: 0.22, ease: 'back.out(3)' },
    0.5
  );

  // Scroll line draws across (scaleX: 0 → 1)
  tl.fromTo(scroll,
    { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
    { scaleX: 1, opacity: 0.35, duration: 0.6, ease: 'power2.inOut' },
    0.9
  );

  return tl;
}
```

---

**MG-02 · The Market Quarter · ADS CREATION**
*Merchant lanterns flicker on one by one, left to right. A banner unfurls from the top. The market opens for business.*

```ts
function buildMarketEntrance(container: HTMLElement): GSAPTimeline {
  const bg       = container.querySelector('.detail-bg') as HTMLElement;
  const lanterns = container.querySelectorAll('.detail-market-lantern'); // 4
  const banner   = container.querySelector('.detail-market-banner') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Warm amber market light fills in
  tl.fromTo(bg,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' },
    0
  );

  // Banner unfurls from top (scaleY: 0 → 1, transformOrigin top)
  tl.fromTo(banner,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.55, ease: 'power3.out' },
    0.2
  );

  // Lanterns flicker on left → right
  tl.fromTo(lanterns,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4,
      stagger: 0.18, ease: 'back.out(2.5)' },
    0.4
  );

  // Ongoing: lanterns sway very slightly
  lanterns.forEach((lantern, i) => {
    tl.to(lantern,
      { rotation: 4, duration: 1.8 + i * 0.3,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
        transformOrigin: 'top center' },
      1.5 + i * 0.1
    );
  });

  return tl;
}
```

---

**MG-03 · The Dojo of Words · MOCK INTERVIEW**
*Pure black. A single spotlight drops from the top — precisely centered. The panel chair is lit. Nothing else exists.*

```ts
function buildDojoEntrance(container: HTMLElement): GSAPTimeline {
  const bg         = container.querySelector('.detail-bg') as HTMLElement;
  const spotlight  = container.querySelector('.detail-dojo-spot') as HTMLElement;
  const chairGlow  = container.querySelector('.detail-chair-glow') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Complete black held for 0.5s (tension building)
  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.2, ease: 'none' },
    0.5
  );

  // Spotlight drops from top center — narrows to a sharp cone
  tl.fromTo(spotlight,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.55, ease: 'power4.out' },
    0.55
  );

  // Chair/position glow blooms at spotlight base
  tl.fromTo(chairGlow,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
    0.9
  );

  // Subtle ongoing: spotlight intensity breathes (opacity 0.9 → 1.0)
  tl.to(spotlight,
    { opacity: 0.85, duration: 3.5,
      ease: 'sine.inOut', repeat: -1, yoyo: true },
    1.5
  );

  return tl;
}
```

Spotlight: `position: absolute`, `top: 0`, centered, `width: 28%`, `height: 80%`, `clipPath: polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)`, `background: radial-gradient(ellipse at 50% 0%, rgba(212,160,84,0.09) 0%, transparent 80%)`.
Chair glow: `width: 160px`, `height: 60px`, `borderRadius: 50%`, `bottom: 20%`, centered, `background: radial-gradient(ellipse, rgba(212,160,84,0.12) 0%, transparent 70%)`.

---

**MG-04 · The Treasury Vault · FINANCE QUANTUM**
*The vault door opens. Two concentric rings rotate apart. Gold light floods in from the center. The numbers materialize.*

```ts
function buildVaultEntrance(container: HTMLElement): GSAPTimeline {
  const bg       = container.querySelector('.detail-bg') as HTMLElement;
  const ringOuter = container.querySelector('.detail-vault-ring-outer') as HTMLElement;
  const ringInner = container.querySelector('.detail-vault-ring-inner') as HTMLElement;
  const goldLight = container.querySelector('.detail-vault-light') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Dark vault interior appears
  tl.fromTo(bg,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1.0, duration: 0.7, ease: 'power2.out' },
    0
  );

  // Outer ring rotates clockwise while scaling in
  tl.fromTo(ringOuter,
    { scale: 0, rotation: -90, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.2
  );

  // Inner ring rotates counter-clockwise (vault unlocking)
  tl.fromTo(ringInner,
    { scale: 0, rotation: 90, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.3
  );

  // Gold light floods center as rings complete
  tl.fromTo(goldLight,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
    0.8
  );

  // Ongoing: rings slowly counter-rotate (the vault breathes)
  tl.to(ringOuter,
    { rotation: 5, duration: 8, ease: 'none', repeat: -1, yoyo: true },
    1.5
  );
  tl.to(ringInner,
    { rotation: -5, duration: 6, ease: 'none', repeat: -1, yoyo: true },
    1.5
  );

  return tl;
}
```

Ring outer: `position: absolute`, centered, `width: 180px`, `height: 180px`, `borderRadius: 50%`, `border: 1px solid rgba(212,160,84,0.12)`, `background: transparent`.
Ring inner: same, `width: 110px`, `height: 110px`, `border: 1px solid rgba(212,160,84,0.08)`.
Gold light: `width: 250px`, `height: 250px`, `borderRadius: 50%`, centered, `background: radial-gradient(circle, rgba(212,160,84,0.10) 0%, transparent 70%)`.

---

**MG-05 · The Innovation Quarter · STARTUP STALL**
*An amber grid scans in. A pagoda silhouette assembles from blocks rising from the bottom. A data pulse radiates outward — ancient meets future.*

```ts
function buildInnovationEntrance(container: HTMLElement): GSAPTimeline {
  const bg        = container.querySelector('.detail-bg') as HTMLElement;
  const grid      = container.querySelector('.detail-innovation-grid') as HTMLElement;
  const pagodaB   = container.querySelector('.detail-pagoda-base') as HTMLElement;
  const pagodaT   = container.querySelector('.detail-pagoda-top') as HTMLElement;
  const pulse     = container.querySelector('.detail-data-pulse') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  // Background — dark with amber undertone
  tl.fromTo(bg,
    { opacity: 0, scale: 1.04 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' },
    0
  );

  // Amber grid scans in top → bottom (like BGMI but amber not blue)
  tl.fromTo(grid,
    { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
    { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1,
      duration: 0.7, ease: 'power2.out' },
    0.1
  );

  // Pagoda base rises
  tl.fromTo(pagodaB,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' },
    0.5
  );

  // Pagoda top assembles on top of base
  tl.fromTo(pagodaT,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' },
    0.7
  );

  // Data pulse radiates from pagoda center
  tl.fromTo(pulse,
    { scale: 0, opacity: 0.5 },
    { scale: 3, opacity: 0, duration: 1.0, ease: 'power2.out' },
    0.9
  );
  // Repeating pulse
  tl.fromTo(pulse,
    { scale: 0, opacity: 0.3 },
    { scale: 3, opacity: 0, duration: 1.4, ease: 'power2.out',
      repeat: -1, repeatDelay: 1.5 },
    2.1
  );

  return tl;
}
```

Grid div: same repeating-linear-gradient as `card-innovation` CSS scene, full container size.
Pagoda base: `position: absolute`, `bottom: 15%`, centered, `width: 60px`, `height: 30px`, `background: rgba(10,12,8,0.5)`.
Pagoda top: `position: absolute`, `bottom: calc(15% + 30px)`, centered, `width: 40px`, `height: 20px`, `background: rgba(10,12,8,0.5)`.
Data pulse: `position: absolute`, centered to pagoda, `width: 40px`, `height: 40px`, `borderRadius: 50%`, `border: 1px solid rgba(212,160,84,0.3)`, `background: transparent`.

---

#### Default Fallback Entrance (Placeholder Cards)

```ts
function buildDefaultEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' }
  );

  return tl;
}
```

---

#### Page-Level Component Notes

```tsx
// src/pages/EventDetailPage.tsx — structural requirements

// 1. On mount: call useDistrictEntranceAnimation(containerRef, event.districtTheme)
// 2. On unmount: kill all GSAP tweens scoped to containerRef (automatic with useGSAP scope)
// 3. Back button: gsap.to(container, { opacity: 0, y: -20, duration: 0.3 }) then navigate(-1)
// 4. Register CTA: opens the existing 3-step registration modal with event pre-selected
//    (passes event.id to registrationStore — no new modal code needed)
// 5. PetalCanvas persists — it is fixed and lives outside EventDetailPage
// 6. Ambient elements (.detail-torch-glow, .detail-candle-glow etc.) are rendered
//    conditionally based on districtTheme — use a switch/lookup in the JSX
// 7. ScrollTrigger.refresh() called after entrance animation completes
```

**Exit animation (back to homepage):**
```ts
// useDistrictExitAnimation.ts
export function useDistrictExitAnimation(containerRef, onComplete) {
  return () => {
    gsap.to(containerRef.current, {
      opacity: 0, y: -24, duration: 0.35,
      ease: 'power2.in', onComplete
    });
  };
}
```

---

## 6. COMPLETE EVENT DATA (`src/data/events.ts`)

```ts
export type EventCategory = 'sports' | 'cultural' | 'management';

export interface Event {
  id: string;
  name: string;
  category: EventCategory;
  districtName: string;      // The cinematic "place" name
  districtTheme: string;     // CSS class for background scene
  tagline: string;           // 3–4 words, dramatic
  description: string;
  teamSize: string;
  duration: string;
  icon: string;              // Lucide icon name
}

export const events: Event[] = [
  // ── SPORTS ──────────────────────────────────────────
  {
    id: 'sp-01', name: 'Throwball', category: 'sports',
    districtName: 'Stone Breathing District',
    districtTheme: 'card-stone',
    tagline: 'Strength. Speed. Precision.',
    description: 'Fast-paced battle of reflexes and raw throwing power.',
    teamSize: '9v9', duration: '45 min', icon: 'Circle'
  },
  {
    id: 'sp-02', name: 'Volleyball', category: 'sports',
    districtName: 'Wind Breathing District',
    districtTheme: 'card-wind',
    tagline: 'Rise. Spike. Conquer.',
    description: 'Six warriors per side. One court. Endless sky.',
    teamSize: '6v6', duration: '60 min', icon: 'ArrowUp'
  },
  {
    id: 'sp-03', name: 'Carrom', category: 'sports',
    districtName: 'Shadow Breathing District',
    districtTheme: 'card-shadow',
    tagline: 'Precision. Silence. Victory.',
    description: 'In the quiet chamber, only focus survives.',
    teamSize: '1v1 / 2v2', duration: '30 min', icon: 'Target'
  },
  {
    id: 'sp-04', name: 'Table Tennis', category: 'sports',
    districtName: 'Thunder Breathing District',
    districtTheme: 'card-thunder',
    tagline: 'Strike. Faster.',
    description: 'Lightning reflexes. Millisecond decisions.',
    teamSize: '1v1', duration: '20 min', icon: 'Zap'
  },
  {
    id: 'sp-05', name: 'Powerlifting', category: 'sports',
    districtName: 'Iron Breathing District',
    districtTheme: 'card-iron',
    tagline: 'Forge. Break. Surpass.',
    description: 'Test the absolute limits of raw human strength.',
    teamSize: 'Solo', duration: '45 min', icon: 'Dumbbell'
  },
  {
    id: 'sp-06', name: 'Squats Challenge', category: 'sports',
    districtName: 'Earth Breathing District',
    districtTheme: 'card-earth',
    tagline: 'One more. Always one more.',
    description: 'Max reps. Max will. Who breaks first?',
    teamSize: 'Solo', duration: '15 min', icon: 'TrendingDown'
  },

  // ── CULTURAL ────────────────────────────────────────
  {
    id: 'cu-01', name: 'Fashion Show', category: 'cultural',
    districtName: 'District of Elegance',
    districtTheme: 'card-elegance',
    tagline: 'Walk. Own. Reign.',
    description: 'The crimson runway awaits. Own every step.',
    teamSize: '5–10', duration: '90 min', icon: 'Sparkles'
  },
  {
    id: 'cu-02', name: 'Duet Dance', category: 'cultural',
    districtName: 'Moonlight Courtyard',
    districtTheme: 'card-moonlight',
    tagline: 'Two souls. One rhythm.',
    description: 'Under the full moon, synchrony becomes art.',
    teamSize: '2', duration: '5 min', icon: 'Music'
  },
  {
    id: 'cu-03', name: 'Group Dance', category: 'cultural',
    districtName: 'Performance Plaza',
    districtTheme: 'card-plaza',
    tagline: 'Many voices. One thunder.',
    description: 'The stage belongs to those who command it.',
    teamSize: '6–15', duration: '8 min', icon: 'Radio'
  },
  {
    id: 'cu-04', name: 'Treasure Hunt', category: 'cultural',
    districtName: 'The Hidden Path',
    districtTheme: 'card-path',
    tagline: 'Seek. Decode. Triumph.',
    description: 'Clues hidden across campus. Race your rivals.',
    teamSize: '3–5', duration: '120 min', icon: 'Map'
  },
  {
    id: 'cu-05', name: 'Short Film', category: 'cultural',
    districtName: 'Chronicles Studio',
    districtTheme: 'card-studio',
    tagline: 'Tell it. In 10 minutes.',
    description: 'A story told in under 10 minutes. Make it unforgettable.',
    teamSize: '2–8', duration: 'Submit 72h prior', icon: 'Film'
  },
  {
    id: 'cu-06', name: 'BGMI Online', category: 'cultural',
    districtName: 'The Gaming Realm',
    districtTheme: 'card-gaming',
    tagline: 'Squad. Strategy. Survive.',
    description: 'The battlefield is digital. The glory is real.',
    teamSize: '4', duration: '2 matches', icon: 'Gamepad2'
  },

  // ── MANAGEMENT ──────────────────────────────────────
  {
    id: 'mg-01', name: 'Business Quiz', category: 'management',
    districtName: 'The Council Chamber',
    districtTheme: 'card-council',
    tagline: 'Know. React. Win.',
    description: 'Market trends, strategy, trivia — all tested.',
    teamSize: '2', duration: '60 min', icon: 'BrainCircuit'
  },
  {
    id: 'mg-02', name: 'Ads Creation', category: 'management',
    districtName: 'The Market Quarter',
    districtTheme: 'card-market',
    tagline: 'Sell the unsellable.',
    description: 'Creativity meets commerce. Make them believe.',
    teamSize: '2–4', duration: '90 min', icon: 'Megaphone'
  },
  {
    id: 'mg-03', name: 'Mock Interview', category: 'management',
    districtName: 'The Dojo of Words',
    districtTheme: 'card-dojo',
    tagline: 'Face the panel. Hold ground.',
    description: 'The spotlight is yours. Defend your worth.',
    teamSize: 'Solo', duration: '20 min/slot', icon: 'UserCheck'
  },
  {
    id: 'mg-04', name: 'Finance Quantum', category: 'management',
    districtName: 'The Treasury Vault',
    districtTheme: 'card-vault',
    tagline: 'Numbers are power.',
    description: 'Financial warfare through strategy and calculation.',
    teamSize: '2', duration: '75 min', icon: 'BarChart2'
  },
  {
    id: 'mg-05', name: 'Startup Stall', category: 'management',
    districtName: 'The Innovation Quarter',
    districtTheme: 'card-innovation',
    tagline: 'Build. Pitch. Conquer.',
    description: 'Pitch your idea. Win the market. Claim the quarter.',
    teamSize: '2–5', duration: 'Full day', icon: 'Lightbulb'
  },
];

// Category metadata
export const categories = {
  sports: {
    title: 'The Breathing Districts',
    subtitle: 'Where Strength Meets Honour',
    count: 6,
    theme: 'stone',
    color: '#D4A054'
  },
  cultural: {
    title: 'The Festival Realms',
    subtitle: 'Where Art Becomes Legend',
    count: 6,
    theme: 'crimson',
    color: '#C0392B'
  },
  management: {
    title: 'The Council Grounds',
    subtitle: 'Where Strategy Rules All',
    count: 5,
    theme: 'ember',
    color: '#8B5E1A'
  }
};
```

---

## 7. REGISTRATION FORM

```ts
// Zod schema
export const registrationSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Enter a valid email'),
  phone:    z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid Indian mobile number'),
  college:  z.string().min(3, 'College name required'),
  year:     z.enum(['1st', '2nd', 'Final', 'Other']),
  selectedEvents: z.array(z.string()).min(1, 'Choose at least one event'),
});
```

**Modal design (mobile = bottom sheet, desktop = centered):**

```
Header bar: thin gold line + "ENTER THE REGISTRY" in Cinzel 600
Progress: gold line grows across top, 3 steps:
  ● → ○ → ○   "Your Identity"
  ○ → ● → ○   "Choose Your District"  
  ○ → ○ → ●   "Confirm & Enter"

Inputs: sharp corners, stone-mid background, crimson focus glow
Step 2: Event cards shown as mini-checkboxes — card style, tap to select
  Selected = crimson border + glow + checkmark
Submit: "IGNITE YOUR ENTRY" — full width, crimson, Cinzel 700, sharp corners
```

Step transitions (GSAP Flip):
```ts
const stepTl = gsap.timeline();
stepTl
  .to('.current-step', { x: '-100%', opacity: 0, duration: 0.4, ease: 'power2.in' })
  .fromTo('.next-step',
    { x: '100%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 0.4, ease: 'power3.out' }
  );
```

---

## 8. COMPLETE SECTION ORDER & PAGE FLOW

```
① IntroOverlay (z:9999, unmounts after 4.5s)
② PetalCanvas (fixed, full viewport, z:1, persistent)
③ Navbar (fixed, z:100, transparent→frosted)
④ Hero Section (100svh)
    - Ghost AAKRITI behind content (Cinzel 900, 35vw, opacity:0.025)
    - Eyebrow → Title → Tagline → CTA → Countdown
⑤ "THREE REALMS AWAIT" — animated pillars (Sports / Cultural / Management)
    Each pillar: Cinzel label + count + theme color + entrance animation
⑥ PINNED Category Discovery Section (Sports panel → Cultural → Management)
    3 full-screen panels, horizontal scroll scrub
⑦ SectionDivider (swaying lantern)
⑧ Sports Events Grid
    - "The Breathing Districts" heading (Cinzel, stagger reveal)
    - 6 district cards in responsive grid (1 col → 2 col → 3 col)
⑨ SectionDivider
⑩ Cultural Events Grid
    - "The Festival Realms"
    - 6 district cards
⑪ SectionDivider
⑫ Management Events Grid
    - "The Council Grounds"
    - 5 district cards
⑬ Registration CTA Banner
    - Full viewport height
    - "THE CASTLE AWAITS YOUR NAME"
    - Crimson radial background
    - Petals density doubles here (via canvas event)
    - Large CTA button
⑭ Footer
    - College name + address + contact
    - Thin Cinzel text
    - Social icons (Lucide)
    - "AAKRITI 2026" ghost text
```

---

## 9. MOBILE-FIRST SPECIFICATIONS

**Base viewport: 390px. Everything else is an enhancement.**

```
Font clamps:
  Logo: clamp(32px, 12vw, 80px)
  Section titles: clamp(24px, 7vw, 52px)
  Card district name: clamp(10px, 2.8vw, 14px)
  Card event name: clamp(16px, 4.5vw, 22px)
  Body: clamp(13px, 3.5vw, 16px)

Layout:
  Cards: 1 column (390px) → 2 columns (640px) → 3 columns (1024px)
  Pinned section: scrolls horizontally on all sizes
  Modal: bottom sheet (100vw, 90vh, slides up) on mobile
         centered dialog (560px max-width) on desktop

Touch:
  ScrollTrigger.normalizeScroll(true) — smooth cross-device scroll
  Card hover effects → tap equivalent via :active state
  Petal canvas: 35 petals mobile, 70 desktop

Performance rules:
  NEVER animate: width, height, top, left, margin, padding
  ONLY animate: transform (translate, scale, rotate) and opacity
  will-change: transform on pinned sections
  IntersectionObserver for lazy loading event grids
  Canvas loop: check document.visibilityState before each frame
```

---

## 10. CONSTANTS (`src/lib/constants.ts`)

```ts
export const FEST_NAME = 'AAKRITI';
export const FEST_YEAR = '2026';
export const FEST_DATE = new Date('2026-09-20T09:00:00'); // UPDATE THIS
export const FEST_VENUE = 'SIMS Main Campus, Bengaluru';
export const FEST_TAGLINE = 'Enter the Castle. Prove Your Realm.';
export const COLLEGE_NAME = 'Seshadripuram Institute of Management Studies';
export const DEPT_NAME = 'Department of MBA';
export const CONTACT_EMAIL = 'aakriti@simsblr.ac.in';
export const COLLEGE_WEBSITE = 'https://www.simsblr.ac.in';

export const PETAL_COUNT_MOBILE = 35;
export const PETAL_COUNT_DESKTOP = 70;
export const MOBILE_BREAKPOINT = 768;

export const INTRO_DURATION_MS = 4500;
```

---

## 11. QUALITY CHECKLIST

```
□ No color exists that isn't in the approved palette (Section 1)
□ Every card has a districtName AND a districtTheme CSS class
□ PetalCanvas is a fixed canvas with pointer-events: none — never re-renders
□ IntroOverlay removes itself from DOM (setMounted(false)) after animation
□ All GSAP calls use useGSAP() hook — zero raw useEffect with GSAP
□ Animation files live ONLY in src/hooks/animations/
□ ScrollTrigger.normalizeScroll(true) called once in App.tsx
□ Countdown uses real Date arithmetic vs FEST_DATE constant
□ Registration modal opens as bottom sheet on < 768px
□ Cards use rotateX: 8 → 0 entrance (adds depth sense on mobile)
□ Section divider lantern sway plays on all sections
□ Ghost text opacity never exceeds 0.04 (or it overwhelms)
□ No border-radius above 3px (the world is architectural, not soft)
□ Body background set on <html> in index.html — no white flash ever
□ markers: false on all ScrollTrigger instances in production build
□ Lighthouse mobile performance > 68 after production build

□ React Router v6 installed — routes defined in App.tsx (/ and /events/:eventId)
□ Every card's "Enter District →" uses React Router <Link to="/events/{id}"> not <a href>
□ EventDetailPage.tsx reads eventId via useParams() and 404s gracefully for unknown ids
□ DISTRICT_ENTRANCE_MAP covers all 17 districtTheme keys — no missing entry throws
□ buildDefaultEntrance fallback handles placeholder cards (card-placeholder-1/2/3)
□ prefers-reduced-motion check fires BEFORE any GSAP timeline is built
□ Phase A entrance: only transform and opacity animated — zero layout properties
□ Ambient elements (.detail-torch-glow, .detail-candle-glow, etc.) are pointer-events:none
□ will-change: transform applied on mount, removed after Phase C begins (GSAP onComplete)
□ GSAP scope: useGSAP({ scope: containerRef }) used — no leaked tweens on back-navigate
□ Detail page back button triggers exit animation BEFORE navigate(-1) fires
□ ScrollTrigger.refresh() called after entrance animation completes on detail page
□ PetalCanvas petal count does NOT change on detail page (stays at mobile:35 / desktop:70)
□ Registration CTA on detail page passes event.id to registrationStore, opens modal Step 2
□ Gaming Realm glow exception is isolated: boxShadow only on .detail-squad-marker, nowhere else
```

---

## 12. OPENING INSTRUCTION

When this prompt is submitted, respond ONLY with:

> "**AAKRITI v4 — Infinity Castle Protocol Active.**
> The Castle takes shape. Petals are falling. Districts await their visitors.
> Beginning Phase 1 — Foundation (tailwind.config.ts, gsap.ts, constants.ts, events.ts, index.html, App.tsx with React Router)."

Then immediately generate Phase 1 files — complete, production-quality code. Not skeletons.

After Phase 1, pause and ask: *"Phase 1 complete. Proceed to Phase 2 — PetalCanvas + Navbar + IntroOverlay?"*

---

*AAKRITI Master Prompt v4.0 — Built from actual visual reference. Mobile-first. District system. 17 unique entrance animations. No compromises.*
