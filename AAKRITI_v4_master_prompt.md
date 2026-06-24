# AAKRITI — CINEMATIC EVENT WEBSITE
## MASTER BUILD PROMPT v4.0 — "Infinity Castle" Next.js Edition
## Seshadripuram Institute of Management Studies (SIMS), Bengaluru · MBA Dept · 2026

---

## 0. YOUR IDENTITY & MISSION

You are an elite Creative Frontend Engineer building **AAKRITI 2026** — the inter-collegiate fest site for the Department of MBA, SIMS Bengaluru. This is not a website. It is a cinematic experience. A visitor should feel like they have stepped through a portal into another world.

**Visual reference locked:** The Infinity Castle from Demon Slayer — endless wooden corridors defying gravity, crimson lanterns bleeding warm light into pure darkness, cherry blossom petals drifting through still air, impossible depth, stone and wood architecture suspended in void. Every section must evoke this atmosphere.

**The District system is the soul of this site.** Each of the 17 events maps to a named cinematic "District" or "Realm" — not generic event cards but named places in a living world. When a user taps on "Powerlifting", they are entering the Iron Breathing District. That distinction is everything.

**The character images in `/public/characters/` are background atmosphere only.** They are positioned behind CSS gradient overlays so the character bleeds through like a ghost from the darkness — never fully visible, always implied. The CSS gradients sit ON TOP of the image.

**Quality bar:** abhyuday.online is the minimum. Exceed it.

---

## 1. TECH STACK

### Framework & Build
```
Framework:     Next.js 15 (App Router)
Language:      TypeScript (strict mode)
Styling:       Tailwind CSS v3 with custom config
```

### Animation Layer
```
GSAP 3.x + ScrollTrigger   — scroll-driven animations, pinned sections, stagger reveals
Framer Motion 11            — page transitions, hover states, Framer scroll hooks
```

> **Rule:** GSAP owns scroll-driven and timeline animations. Framer Motion owns component-level hover/tap and page entry animations. Never mix them on the same element.

### 3D Layer
```
Three.js + @react-three/fiber + @react-three/drei
```
Used ONLY in the Hero section for the atmospheric fog/depth environment. Do NOT use Three.js in event cards or any other section.

```tsx
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// Mount on all devices
// Reduce complexity on mobile
```

Desktop:
- Full fog scene
- Ambient + point lights
- Float effects

Mobile:
- Same scene
- Lower DPR
- Lower particle count
- Simpler geometry
- Same animations

### Supporting Libraries
```
React Hook Form + Zod       — registration form
Zustand                     — global state (modal open, selected events)
Lucide React                — icons
```

### Installation
```bash
npx create-next-app@latest aakriti --typescript --tailwind --app --src-dir
cd aakriti
npm install gsap @gsap/react framer-motion @react-three/fiber @react-three/drei three
npm install react-hook-form zod @hookform/resolvers zustand lucide-react
npm install @types/three
```

---

## 2. FOLDER STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              ← Root layout: fonts, PetalCanvas, Navbar
│   ├── page.tsx                ← Home page: all sections assembled
│   └── globals.css             ← CSS custom properties, base resets
│
├── components/
│   ├── intro/
│   │   └── IntroOverlay.tsx    ← Cinematic opening (4.5s)
│   ├── navbar/
│   │   └── Navbar.tsx          ← Transparent → frosted on scroll
│   ├── hero/
│   │   ├── HeroSection.tsx     ← Full viewport hero
│   │   ├── HeroCanvas.tsx      ← Three.js fog environment (all devices)
│   │   └── CountdownTimer.tsx  ← JetBrains Mono countdown
│   ├── realms/
│   │   ├── RealmHero.tsx       ← 100vh Realm Hero component
│   │   └── RealmTransition.tsx ← Full-screen cinematic canvas transition
│   ├── events/
│   │   ├── EventsGrid.tsx      ← Renders a category grid
│   │   └── EventCard.tsx       ← Single district card
│   ├── registration/
│   │   ├── RegistrationModal.tsx
│   │   └── RegistrationForm.tsx
│   ├── shared/
│   │   ├── PetalCanvas.tsx     ← Fixed canvas, z:1, pointer-events:none
│   │   ├── SectionDivider.tsx  ← Swaying lantern divider
│   │   └── CTABanner.tsx       ← "The Castle Awaits Your Name"
│   └── footer/
│       └── Footer.tsx
│
├── hooks/
│   └── animations/
│       ├── useIntroAnimation.ts
│       ├── useHeroAnimation.ts
│       ├── useCardAnimation.ts
│       ├── useRealmTransition.ts
│       └── useScrollReveal.ts
│
├── lib/
│   ├── gsap.ts                 ← Single GSAP registration (ScrollTrigger, Flip)
│   └── constants.ts            ← Fest date, name, config
│
└── data/
    └── events.ts               ← All 17 events + category metadata
```

### Architecture Law (never violate)
- `components/` — JSX structure only. Zero raw GSAP calls inside components.
- `hooks/animations/` — All GSAP logic lives here in named hooks.
- `lib/gsap.ts` — The ONLY place where `gsap.registerPlugin()` is called.
- `data/events.ts` — Single source of truth for all event data.
- Zero `useEffect` with GSAP. Always `useGSAP()` from `@gsap/react`.

---

## 3. VISUAL UNIVERSE — "Infinity Castle"

### Color Palette (CSS Custom Properties — defined in globals.css)

```css
:root {
  /* Void & Backgrounds */
  --void:           #050407;   /* Pure black — the abyss between lanterns */
  --castle-deep:    #0D0810;   /* Section backgrounds */
  --stone:          #160F14;   /* Card surfaces */
  --stone-mid:      #241820;   /* Borders, dividers */

  /* Crimson Family */
  --crimson-lo:     #8B1A1A;   /* Deep shadow crimson */
  --crimson:        #C0392B;   /* Primary accent */
  --crimson-hi:     #E53935;   /* Active, hover */
  --crimson-bloom:  #FF6B6B;   /* Petal pink — use sparingly */

  /* Gold / Amber Family */
  --ember:          #8B5E1A;   /* Deep amber */
  --gold:           #D4A054;   /* Primary gold — headings, highlights */
  --gold-bright:    #F0C070;   /* Lamp glow peak */
  --gold-fire:      #FFD700;   /* Logo gold only */

  /* Text */
  --text-primary:   #EDE8E0;   /* Warm white */
  --text-body:      #A89880;   /* Warm gray */
  --text-ghost:     #4A3A35;   /* Disabled, placeholder */

  /* Petals */
  --petal-1:        #E8C4C4;
  --petal-2:        #C4687A;
  --petal-3:        #8B3A50;
}
```

**ABSOLUTE RULES:**
- NEVER: white backgrounds, cool grays, blue tints (except card-gaming which gets ≤0.02 opacity blue), neon colors, Tailwind default colors.
- No `border-radius` above `3px`. This world is architectural and angular.
- Ghost text opacity ceiling: `0.04`. Above that it overwhelms.
- All backgrounds: set `background-color: var(--void)` on `<html>` in globals.css so there is NEVER a white flash on load.

### Typography

```
Display:   "Cinzel Decorative" — AAKRITI logo only (weight 700, 900)
Heading:   "Cinzel" — section titles, event names, district names (weight 400, 600, 700)
Body:      "EB Garamond" — descriptions, body text, form labels
Mono:      "JetBrains Mono" — countdown digits, stat numbers only
```

In `app/layout.tsx`, import from Google Fonts via `next/font/google`:
```tsx
import { Cinzel, Cinzel_Decorative, EB_Garamond, JetBrains_Mono } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-cinzel' });
const cinzelDeco = Cinzel_Decorative({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-cinzel-deco' });
const ebGaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-garamond' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-mono' });
```

In `tailwind.config.ts`, map font variables:
```ts
fontFamily: {
  display: ['var(--font-cinzel-deco)', 'serif'],
  heading: ['var(--font-cinzel)', 'serif'],
  body: ['var(--font-garamond)', 'serif'],
  mono: ['var(--font-mono)', 'monospace'],
}
```

---

## 4. REALM ATMOSPHERE SYSTEM

This system governs the visual identity, colors, and interactive particle atmospheres for the three primary realms. Instead of heavy individual character illustrations, each realm is brought to life using custom canvas layers, CSS variables, and real-time particle simulations.

### SPORTS REALM ("The Breathing Districts")
- **Visual Identity**: Fire, Iron, Embers, Strength, Forge, Breathing Techniques
- **Atmosphere Particles**: Floating embers, fire streaks, forge glow, sword slash trails
- **Color Emphasis**: Gold (`var(--gold)`), Amber (`var(--amber)`), Crimson (`var(--crimson)`)

### CULTURAL REALM ("The Festival Realms")
- **Visual Identity**: Cherry blossoms, lanterns, moonlight, butterflies, elegance
- **Atmosphere Particles**: Petal storms, purple energy/blossom trails, floating lantern glow, butterfly particles
- **Color Emphasis**: Pink (`var(--crimson-bloom)`), Purple (`#2A2040`), Crimson (`var(--crimson-hi)`)

### MANAGEMENT REALM ("The Council Grounds")
- **Visual Identity**: Infinity Castle, ancient strategy, council chambers, golden architecture
- **Atmosphere Particles**: Floating scrolls, gold dust, castle depth illusion, moving architectural shadows
- **Color Emphasis**: Gold (`var(--gold)`), Amber (`var(--amber)`), Black (`var(--void)`)

---

## 5. SECTION FLOW — Complete Page Architecture

```
① IntroOverlay          z:9999  unmounts from DOM after 5.5s
② PetalCanvas           z:1     fixed, full viewport, pointer-events:none, persistent
③ Navbar                z:100   fixed, transparent → frosted glass on scroll > 60px
④ HeroSection           100svh  Three.js canvas (all devices) + content layers
⑤ SectionDivider                Swaying lantern
⑥ Sports Realm Hero     100vh   "THE BREATHING DISTRICTS" Entrance (Fire/Embers/Smoke background)
⑦ Sports Realm Transition       GSAP Full-screen fire slash sweep transition (1.2s)
⑧ Sports Events Grid            "The Breathing Districts" — 6 cards
⑨ SectionDivider                Swaying lantern
⑩ Cultural Realm Hero   100vh   "THE FESTIVAL REALMS" Entrance (Petals/Butterflies/Lanterns background)
⑪ Cultural Realm Transition     GSAP Full-screen petal explosion transition (1.5s)
⑫ Cultural Events Grid          "The Festival Realms" — 6 cards
⑬ SectionDivider                Swaying lantern
⑭ Management Realm Hero 100vh   "THE COUNCIL GROUNDS" Entrance (Castle/Gold dust/Architecture background)
⑮ Management Realm Transition   GSAP Full-screen castle corridor expansion transition (1.5s)
⑯ Management Events Grid        "The Council Grounds" — 5 cards
⑰ CTABanner             100svh  "The Castle Awaits Your Name"
⑱ Footer
```

**RegistrationModal** is a global component in `layout.tsx`, controlled by Zustand. It renders as a portal over everything, mounted once, shown/hidden.

---

## 6. SECTION SPECIFICATIONS

---

### SECTION ① — INTRO OVERLAY

Full viewport, `position: fixed`, `z-index: 9999`, `background: var(--void)`.

Unmounts itself from the DOM (not just hides) after the sequence completes. Use a `isMounted` state with `setTimeout`.

**Animation Timeline (GSAP) — total 5.5 seconds:**

```
0.0s   Pure black void. Silence.

0.5s   Three thin horizontal gold lines emerge from center, expanding outward
       like the crossbars of a torii gate materialising from mist.
       Each line: height 1px, color var(--gold), opacity 0.6
       Transform: scaleX 0 → 1, origin: center
       Duration: 0.7s each, stagger 0.15s, ease: power2.out

1.3s   "AAKRITI" letter-by-letter reveal
       Font: Cinzel Decorative 900
       Size: clamp(52px, 15vw, 120px)
       Color: var(--gold-fire)
       Each letter: from { y: 50, opacity: 0, filter: blur(12px) }
                    to   { y: 0,  opacity: 1, filter: blur(0)    }
       Duration per letter: 0.8s, stagger: 0.08s, ease: power3.out

2.2s   Below the logo: "SIMS · Department of MBA · Inter-collegiate Fest"
       Font: EB Garamond italic
       Color: var(--text-body)
       From: { opacity: 0, letterSpacing: '0.6em' }
       To:   { opacity: 1, letterSpacing: '0.2em' }
       Duration: 1.0s, ease: power2.out

2.8s   PetalCanvas begins — petals fade in from opacity 0 over 0.8s

3.2s   Crimson radial pulse from center of screen
       A div: border-radius 50%, background radial-gradient crimson
       From: { scale: 0, opacity: 0 }
       To:   { scale: 4, opacity: 0.08 } then { opacity: 0 }
       Duration: 0.5s out, 0.4s fade

3.8s   "ENTER THE CASTLE" CTA button fades in
       Font: Cinzel 600, 14px, letter-spacing 0.25em
       Background: var(--crimson), no border-radius (0px)
       Padding: 14px 36px
       On click: runs outro and sets introComplete = true in Zustand

4.5s   If user hasn't clicked: IntroOverlay fades out automatically
       opacity: 0, pointerEvents: 'none', duration: 0.8s
       Then setMounted(false) after 800ms

5.5s   Hero entrance animations begin (triggered by introComplete state)
```

Hook: `src/hooks/animations/useIntroAnimation.ts`
```ts
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function useIntroAnimation(
  containerRef: React.RefObject<HTMLDivElement>,
  onComplete: () => void
) {
  useGSAP(() => {
    const tl = gsap.timeline({ onComplete });

    // Lines
    tl.fromTo('.intro-line',
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 0.6, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        transformOrigin: 'center center' },
      0.5
    );

    // Logo letters — split each character into a span before animating
    tl.fromTo('.intro-char',
      { y: 50, opacity: 0, filter: 'blur(12px)' },
      { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8,
        stagger: 0.08, ease: 'power3.out' },
      1.3
    );

    // Subtitle
    tl.fromTo('.intro-subtitle',
      { opacity: 0, letterSpacing: '0.6em' },
      { opacity: 1, letterSpacing: '0.2em', duration: 1.0, ease: 'power2.out' },
      2.2
    );

    // Crimson pulse
    tl.fromTo('.intro-pulse',
      { scale: 0, opacity: 0 },
      { scale: 4, opacity: 0.08, duration: 0.5, ease: 'power2.out' },
      3.2
    );
    tl.to('.intro-pulse', { opacity: 0, duration: 0.4 }, 3.6);

    // CTA button
    tl.fromTo('.intro-cta',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      3.8
    );

    // Auto fade out at 4.5s
    tl.to('.intro-overlay',
      { opacity: 0, pointerEvents: 'none', duration: 0.8, ease: 'power2.inOut' },
      4.5
    );
  }, { scope: containerRef });
}
```

---

### SECTION ② — PETAL CANVAS

`src/components/shared/PetalCanvas.tsx`

Fixed canvas, full viewport, `z-index: 1`, `pointer-events: none`. Never re-renders after mount. Pauses when `document.visibilityState === 'hidden'`.

```ts
interface Petal {
  x: number;
  y: number;
  size: number;           // 3–10px
  rotation: number;       // degrees, current
  rotationSpeed: number;  // -0.8 to 0.8 deg/frame
  speedY: number;         // 0.3–1.2 downward
  speedX: number;         // -0.3 to 0.3 lateral drift
  opacity: number;        // 0.15–0.65
  wobble: number;         // phase offset for sine
  wobbleSpeed: number;    // 0.008–0.02
  wobbleAmp: number;      // 8–25px horizontal amplitude
  color: string;          // from ['--petal-1','--petal-2','--petal-3']
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

Petal count: mobile (< 768px) = 50, desktop = 70.

When a petal exits the bottom of the viewport, reset its `y` to `-20` and randomise its `x` across the full viewport width.

**Lantern Sway bonus:** Three large semi-transparent circles (60–80px diameter, `rgba(212, 160, 84, 0.04)`) at fixed x positions (20%, 50%, 80%), slowly swaying left-right using `Math.sin(time * 0.0008)`. These represent background lanterns.

---

### SECTION ③ — NAVBAR

Starts fully transparent. After scroll > 60px:
```ts
// useGSAP inside Navbar component
gsap.to(navRef.current, {
  backgroundColor: 'rgba(5, 4, 7, 0.90)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(212, 160, 84, 0.10)',
  duration: 0.5,
  ease: 'power2.out'
});
```

**Left:** `AAKRITI` in Cinzel Decorative, gold-fire, with a subtle gold underline that animates width 0 → 100% on hover.

**Right (desktop):** Links — Sports · Cultural · Management · Register
Each link in EB Garamond italic, var(--text-body), hover → var(--gold).

**Right (mobile):** Hamburger icon (3 horizontal lines, gold).

**Mobile menu (full screen):**
- Background: var(--castle-deep)
- Giant ghost "AAKRITI" text behind links: Cinzel 900, 20vw, opacity 0.025
- Links stagger in: from `{ y: 25, opacity: 0 }` to `{ y: 0, opacity: 1 }`, stagger 0.08s
- Each link: Cinzel 600, 28px, var(--text-primary), with gold left border on active
- Gold divider lines between links

---

### SECTION ④ — HERO SECTION

`src/components/hero/HeroSection.tsx`

Full viewport (`100svh`). **Layer stack (back to front):**

```
Layer 1: Three.js Canvas (all devices)
         Desktop: Full quality
         Mobile: Performance-optimized version — atmospheric fog
Layer 2: CSS radial gradient vignette — darkens edges
Layer 3: Ghost "AAKRITI" text — Cinzel 900, 35vw, opacity 0.025, parallax 0.25x
Layer 4: PetalCanvas (global, already rendered)
Layer 5: Hero content — centered, z:10
```

**Three.js Canvas (`HeroCanvas.tsx`) — all devices:**
Use `@react-three/fiber` and `@react-three/drei`.

Scene contents:
- Fog: `<fog attach="fog" args={['#050407', 5, 25]} />`
- Ambient light: intensity 0.3, color `#8B1A1A`
- Point light: position [0, 2, 0], color `#D4A054`, intensity 0.8
- `<Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>` wrapping a simple plane geometry (represents atmospheric depth — do NOT import any 3D model characters)
- Background color: `#050407`

This gives depth and subtle movement without any heavy 3D models.

**Hero Content (after intro completes):**

```tsx
// Entrance triggered by introComplete = true in Zustand
// All items start hidden, GSAP reveals them in sequence

<div className="eyebrow"> // EB Garamond italic, text-body, letter-spacing 0.3em
  SIMS · Department of MBA · Inter-collegiate Fest
</div>

<h1 className="hero-title"> // Cinzel 900
  <span className="hero-line" style={{ fontSize: 'clamp(64px, 18vw, 160px)', color: 'var(--gold-fire)' }}>
    AAKRITI
  </span>
  <span className="hero-line" style={{ fontSize: 'clamp(28px, 8vw, 72px)', color: 'var(--text-body)' }}>
    2026
  </span>
</h1>

<p className="hero-tagline"> // EB Garamond italic, 20px, text-body
  Enter the Castle. Prove Your Realm.
</p>

<div className="hero-actions">
  <button className="cta-primary"> // Cinzel 600, crimson bg, no radius
    Enter the Gate ↓
  </button>
  <button className="cta-secondary"> // Cinzel 400, transparent, gold border 1px
    Register Now
  </button>
</div>

<CountdownTimer /> // JetBrains Mono, gold digits
```

**Hero Clip-Path Animation (GSAP):**
```ts
// In useHeroAnimation.ts — runs after introComplete = true
gsap.fromTo('.hero-line',
  { clipPath: 'inset(100% 0% 0% 0%)', y: 20 },
  { clipPath: 'inset(0% 0% 0% 0%)', y: 0,
    duration: 1.2, stagger: 0.3, ease: 'power4.out', delay: 0.2 }
);

gsap.fromTo(['.eyebrow', '.hero-tagline', '.hero-actions', '.countdown'],
  { opacity: 0, y: 15 },
  { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.6 }
);
```

**Ghost Text Parallax (GSAP ScrollTrigger):**
```ts
gsap.to('.hero-ghost-text', {
  y: '-30%',
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});
```

**Countdown Timer:**
```tsx
// CountdownTimer.tsx
// JetBrains Mono, var(--gold) digits, var(--text-ghost) labels
// Updates every second with real Date arithmetic vs FEST_DATE
// Format: [DD] Days [HH] Hours [MM] Min [SS] Sec
// When a digit changes: brief scale 1.2 → 1.0, duration 0.2s (Framer Motion)
```

---

### SECTION ⑤ — REALM HERO & TRANSITIONS

This replaces the horizontal category pin with three cinematic, full-screen (100vh) Realm Heroes and interactive full-screen Realm Transitions.

#### 1. Sports Realm: "The Breathing Districts"
- **Realm Hero Component (`RealmHero` with category="sports")**:
  - **Large Title**: "THE BREATHING DISTRICTS" — Cinzel 700, clamp(32px, 6vw, 64px), var(--gold)
  - **Subtitle**: "Where Strength Meets Honour" — EB Garamond italic, var(--text-body)
  - **Atmosphere Background**: Full viewport canvas displaying animated fire, smoke clouds, and floating embers.
- **Transition Animation (`useRealmTransition` with category="sports")**:
  - **Trigger**: Entered when the user scrolls past the Sports Realm Hero.
  - **Cinematic Reveal**: A dynamic diagonal fire slash sweeps across the screen, camera zooms in slightly, and embers ignite to introduce the Sports Section grid.
  - **GSAP Timeline (1.2s)**:
    ```js
    fireTrail.scaleX(0 => 1)
    embers.opacity(0 => 1)
    title.reveal()
    ```

#### 2. Cultural Realm: "The Festival Realms"
- **Realm Hero Component (`RealmHero` with category="cultural")**:
  - **Large Title**: "THE FESTIVAL REALMS" — Cinzel 700, clamp(32px, 6vw, 64px), var(--crimson-hi)
  - **Subtitle**: "Where Art Becomes Legend" — EB Garamond italic, var(--text-body)
  - **Atmosphere Background**: Full viewport canvas showing falling cherry blossom petals, moonlight glow, and floating lanterns.
- **Transition Animation (`useRealmTransition` with category="cultural")**:
  - **Trigger**: Entered when the user scrolls past the Cultural Realm Hero.
  - **Cinematic Reveal**: Petals burst outward in an explosion across the screen, glowing lanterns fade in, and butterfly particles swarm the viewport.
  - **GSAP Timeline (1.5s)**:
    ```js
    petals.explode()
    butterflies.fadeIn()
    title.reveal()
    ```

#### 3. Management Realm: "The Council Grounds"
- **Realm Hero Component (`RealmHero` with category="management")**:
  - **Large Title**: "THE COUNCIL GROUNDS" — Cinzel 700, clamp(32px, 6vw, 64px), var(--gold)
  - **Subtitle**: "Where Strategy Rules All" — EB Garamond italic, var(--text-body)
  - **Atmosphere Background**: Full viewport canvas showing floating ancient scrolls, falling gold dust, and deep architectural shadows of the Infinity Castle.
- **Transition Animation (`useRealmTransition` with category="management")**:
  - **Trigger**: Entered when the user scrolls past the Management Realm Hero.
  - **Cinematic Reveal**: A deep castle corridor forms in 3D perspective, expanding outward as gold dust gathers to present the final grid.
  - **GSAP Timeline (1.5s)**:
    ```js
    corridor.expand()
    goldDust.fadeIn()
    title.reveal()
    ```

---

### SECTION ⑥ — SECTION DIVIDER

`src/components/shared/SectionDivider.tsx`

A thin horizontal gold line with a small lantern SVG centered on it. The line draws from center outward on scroll entrance. The lantern sways continuously.

```ts
// Line draw
gsap.fromTo('.divider-line',
  { scaleX: 0 },
  { scaleX: 1, duration: 1.0, ease: 'power2.out',
    transformOrigin: 'center center',
    scrollTrigger: { trigger: '.section-divider', start: 'top 85%' }
  }
);

// Lantern sway (infinite)
gsap.to('.divider-lantern', {
  rotation: 4,
  duration: 2.8,
  ease: 'sine.inOut',
  repeat: -1,
  yoyo: true,
  transformOrigin: 'top center'
});
```

---

### SECTIONS ⑦ ⑨ ⑪ — EVENT GRIDS

`src/components/events/EventsGrid.tsx`

```tsx
// Props
interface EventsGridProps {
  category: 'sports' | 'cultural' | 'management';
  title: string;       // "The Breathing Districts"
  subtitle: string;    // "Where Strength Meets Honour"
  accentColor: string; // CSS variable string: 'var(--gold)'
}
```

**Section heading animation (GSAP stagger reveal):**
```ts
// Letters split into spans, each revealed with clip-path
gsap.fromTo('.grid-title-char',
  { clipPath: 'inset(100% 0% 0% 0%)', y: 10 },
  { clipPath: 'inset(0% 0% 0% 0%)', y: 0,
    duration: 0.7, stagger: 0.03, ease: 'power3.out',
    scrollTrigger: { trigger: '.grid-heading', start: 'top 80%' }
  }
);
```

Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, gap `1.5rem`.

Card scroll entrance:
```ts
gsap.fromTo('.event-card',
  { y: 70, opacity: 0, rotateX: 10 },
  {
    y: 0, opacity: 1, rotateX: 0,
    duration: 0.9, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.events-grid', start: 'top 78%' }
  }
);
```

---

### EVENT CARD COMPONENT

`src/components/events/EventCard.tsx`

**Card anatomy:**
```
┌────────────────────────────────────────┐
│                                        │
│  [CSS SCENE + optional character art]  │ ← background layers
│                                        │
│  ── DISTRICT NAME ─────────────────── │ ← Cinzel 400, var(--gold), 10px, ls:0.3em
│     of the [Category] Realm            │ ← EB Garamond italic, var(--text-ghost), 11px
│                                        │
│  EVENT NAME                            │ ← Cinzel 700, var(--text-primary), clamp(16,4.5vw,22px)
│  Team size · Duration                  │ ← EB Garamond, var(--text-ghost), 12px
│                                        │
│  ─────────────── ✦ ─────────────────  │ ← thin gold divider, 0.4 opacity
│  "Tagline in italic"                   │ ← EB Garamond italic, var(--text-body), 13px
│                                        │
│  [ Enter District → ]                  │ ← Cinzel 500, crimson, hidden until hover/tap
│                                        │
└────────────────────────────────────────┘

Left edge: 3px vertical bar
  Sports     → var(--gold)
  Cultural   → var(--crimson)
  Management → var(--ember)

Top edge on hover: gold line draws left → right (scaleX: 0 → 1)
Card height: min 320px on mobile, 380px on desktop
border-radius: 2px (nearly sharp)
```

**Hover / Tap Animation (GSAP — from `useCardAnimation.ts`):**

Desktop Hover:
- Card floats up slightly (y: -8)
- Character image/background zooms slightly (scale: 1.04)
- Top gold line draws left to right
- Letter spacing of district label expands
- CTA "Enter District →" appears

Mobile Tap:
- Same GSAP animation on touchstart (card expands/floats, image zooms, CTA appears)
- Haptic feedback (10ms vibration) triggered if supported
- reverse on touchend after a 1200ms delay to keep the visual response clear

```ts
// Applied once to ALL cards in a grid — event delegation pattern
export function useCardAnimation(gridRef: React.RefObject<HTMLDivElement>) {
  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll('.event-card') ?? [];

    cards.forEach((card) => {
      const borderTop = card.querySelector('.card-border-top');
      const distLabel = card.querySelector('.card-district-label');
      const enterBtn  = card.querySelector('.card-enter-btn');
      const bgLayer   = card.querySelector('.card-bg');

      const tl = gsap.timeline({ paused: true });
      tl
        .to(card,       { y: -8, duration: 0.35, ease: 'power2.out' })
        .to(bgLayer,    { scale: 1.04, duration: 0.4, ease: 'power2.out' }, 0)
        .to(borderTop,  { scaleX: 1, transformOrigin: 'left center', duration: 0.4, ease: 'power2.inOut' }, 0)
        .to(distLabel,  { letterSpacing: '0.38em', duration: 0.3, ease: 'power2.out' }, 0.05)
        .to(enterBtn,   { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' }, 0.1);

      card.addEventListener('mouseenter', () => tl.play());
      card.addEventListener('mouseleave', () => tl.reverse());
      
      // Mobile tap interaction with haptic feedback
      card.addEventListener('touchstart', () => {
        tl.play();
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(10);
        }
      }, { passive: true });
      
      card.addEventListener('touchend', () => {
        setTimeout(() => tl.reverse(), 1200);
      }, { passive: true });
    });
  }, { scope: gridRef });
}
```

---

## 7. COMPLETE EVENT DATA (`src/data/events.ts`)

```ts
export type EventCategory = 'sports' | 'cultural' | 'management';

export interface EventData {
  id: string;
  name: string;
  category: EventCategory;
  districtName: string;
  districtSubLabel: string;
  districtTheme: string;       // Base realm class (e.g. 'card-sports-base')
  tagline: string;
  description: string;
  teamSize: string;
  duration: string;
  icon: string;                // Lucide icon name
}

export const events: EventData[] = [

  // ══ SPORTS — The Breathing Districts ══

  {
    id: 'sp-01', name: 'Throwball', category: 'sports',
    districtName: 'Stone Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'Strength hurled into the air.',
    description: 'Fast-paced battle of reflexes and raw throwing power.',
    teamSize: '9v9', duration: '45 min', icon: 'Circle'
  },
  {
    id: 'sp-02', name: 'Volleyball', category: 'sports',
    districtName: 'Wind Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'Rise above. Spike harder.',
    description: 'Six warriors per side. One court. Endless sky.',
    teamSize: '6v6', duration: '60 min', icon: 'ArrowUp'
  },
  {
    id: 'sp-03', name: 'Carrom', category: 'sports',
    districtName: 'Shadow Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'In silence, only precision survives.',
    description: 'In the quiet chamber, only focus survives.',
    teamSize: '1v1 / 2v2', duration: '30 min', icon: 'Target'
  },
  {
    id: 'sp-04', name: 'Table Tennis', category: 'sports',
    districtName: 'Thunder Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'Faster than thought. Strike.',
    description: 'Lightning reflexes. Millisecond decisions.',
    teamSize: '1v1', duration: '20 min', icon: 'Zap'
  },
  {
    id: 'sp-05', name: 'Powerlifting', category: 'sports',
    districtName: 'Iron Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'Forge beyond your limit.',
    description: 'Test the absolute limits of raw human strength.',
    teamSize: 'Solo', duration: '45 min', icon: 'Dumbbell'
  },
  {
    id: 'sp-06', name: 'Squats Challenge', category: 'sports',
    districtName: 'Earth Breathing District',
    districtSubLabel: 'of the Breathing Districts',
    districtTheme: 'card-sports-base',
    tagline: 'One more. Always one more.',
    description: 'Max reps. Max will. Who breaks first?',
    teamSize: 'Solo', duration: '15 min', icon: 'TrendingDown'
  },

  // ══ CULTURAL — The Festival Realms ══

  {
    id: 'cu-01', name: 'Fashion Show', category: 'cultural',
    districtName: 'District of Elegance',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Walk the crimson path. Own it.',
    description: 'The crimson runway awaits. Own every step.',
    teamSize: '5–10', duration: '90 min', icon: 'Sparkles'
  },
  {
    id: 'cu-02', name: 'Duet Dance', category: 'cultural',
    districtName: 'Moonlight Courtyard',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Two souls. One eternal rhythm.',
    description: 'Under the full moon, synchrony becomes art.',
    teamSize: '2', duration: '5 min', icon: 'Music'
  },
  {
    id: 'cu-03', name: 'Group Dance', category: 'cultural',
    districtName: 'Performance Plaza',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Many voices. One thunder.',
    description: 'The stage belongs to those who command it.',
    teamSize: '6–15', duration: '8 min', icon: 'Radio'
  },
  {
    id: 'cu-04', name: 'Treasure Hunt', category: 'cultural',
    districtName: 'The Hidden Path',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Seek. Decode. Triumph.',
    description: 'Clues hidden across campus. Race your rivals.',
    teamSize: '3–5', duration: '120 min', icon: 'Map'
  },
  {
    id: 'cu-05', name: 'Short Film', category: 'cultural',
    districtName: 'Chronicles Studio',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Ten minutes. One story. No forgetting.',
    description: 'A story told in under 10 minutes. Make it unforgettable.',
    teamSize: '2–8', duration: 'Submit 72h prior', icon: 'Film'
  },
  {
    id: 'cu-06', name: 'BGMI Online', category: 'cultural',
    districtName: 'The Gaming Realm',
    districtSubLabel: 'of the Festival Realms',
    districtTheme: 'card-cultural-base',
    tagline: 'Squad up. The zone is closing.',
    description: 'The battlefield is digital. The glory is real.',
    teamSize: '4', duration: '2 matches', icon: 'Gamepad2'
  },

  // ══ MANAGEMENT — The Council Grounds ══

  {
    id: 'mg-01', name: 'Business Quiz', category: 'management',
    districtName: 'The Council Chamber',
    districtSubLabel: 'of the Council Grounds',
    districtTheme: 'card-management-base',
    tagline: 'Know the market. Command the room.',
    description: 'Market trends, strategy, trivia — all tested.',
    teamSize: '2', duration: '60 min', icon: 'BrainCircuit'
  },
  {
    id: 'mg-02', name: 'Ads Creation', category: 'management',
    districtName: 'The Market Quarter',
    districtSubLabel: 'of the Council Grounds',
    districtTheme: 'card-management-base',
    tagline: 'Sell the unsellable. Make them believe.',
    description: 'Creativity meets commerce. Make them believe.',
    teamSize: '2–4', duration: '90 min', icon: 'Megaphone'
  },
  {
    id: 'mg-03', name: 'Mock Interview', category: 'management',
    districtName: 'The Dojo of Words',
    districtSubLabel: 'of the Council Grounds',
    districtTheme: 'card-management-base',
    tagline: 'The spotlight is yours. Do not blink.',
    description: 'The spotlight is yours. Defend your worth.',
    teamSize: 'Solo', duration: '20 min/slot', icon: 'UserCheck'
  },
  {
    id: 'mg-04', name: 'Finance Quantum', category: 'management',
    districtName: 'The Treasury Vault',
    districtSubLabel: 'of the Council Grounds',
    districtTheme: 'card-management-base',
    tagline: 'Numbers are power. Wield them.',
    description: 'Financial warfare through strategy and calculation.',
    teamSize: '2', duration: '75 min', icon: 'BarChart2'
  },
  {
    id: 'mg-05', name: 'Startup Stall', category: 'management',
    districtName: 'The Innovation Quarter',
    districtSubLabel: 'of the Council Grounds',
    districtTheme: 'card-management-base',
    tagline: 'Build it. Pitch it. Win the quarter.',
    description: 'Pitch your idea. Win the market. Claim the quarter.',
    teamSize: '2–5', duration: 'Full day', icon: 'Lightbulb'
  },
];

export const categories = {
  sports: {
    title: 'The Breathing Districts',
    subtitle: 'Where Strength Meets Honour',
    count: 6,
    accentColor: 'var(--gold)',
  },
  cultural: {
    title: 'The Festival Realms',
    subtitle: 'Where Art Becomes Legend',
    count: 6,
    accentColor: 'var(--crimson)',
  },
  management: {
    title: 'The Council Grounds',
    subtitle: 'Where Strategy Rules All',
    count: 5,
    accentColor: 'var(--ember)',
  },
};
```

---

## 8. CSS SCENE BACKGROUNDS (globals.css)

Each `districtTheme` maps to a CSS class. These are applied to the card's `::before` pseudo-element which fills the card background. The character image (if present) is added as an additional `background-image` layer in the component's inline style, stacked BEHIND the gradient.

**Sports Cards (gold accent category):**

```css
## 8. CSS SCENE BACKGROUNDS (globals.css)

Each card inherits category atmosphere classes (`card-sports-base`, `card-cultural-base`, `card-management-base`). These are defined inside `globals.css` using lightweight CSS layers.

```css
/* ══ BASE REALM CARD GRADIENTS ══ */

/* Sports Cards: Fire, Iron, Embers theme background */
.card-sports-base {
  background: 
    radial-gradient(ellipse at 50% 100%, rgba(139, 94, 26, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 50% 0%, rgba(192, 57, 43, 0.08) 0%, transparent 50%),
    linear-gradient(180deg, #0A0806 0%, #160F14 100%);
  position: relative;
  overflow: hidden;
}

/* Cultural Cards: Petals, Moonlight, Lantern theme background */
.card-cultural-base {
  background: 
    radial-gradient(circle at 50% 5%, rgba(220, 210, 255, 0.08) 0%, transparent 35%),
    radial-gradient(ellipse at 50% 100%, rgba(192, 57, 43, 0.12) 0%, transparent 60%),
    linear-gradient(180deg, #080610 0%, #0D0810 100%);
  position: relative;
  overflow: hidden;
}

/* Management Cards: Infinity Castle, Gold Dust theme background */
.card-management-base {
  background: 
    radial-gradient(ellipse at 50% 100%, rgba(212, 160, 84, 0.08) 0%, transparent 60%),
    radial-gradient(circle at 50% 30%, rgba(139, 94, 26, 0.05) 0%, transparent 40%),
    linear-gradient(180deg, #0A0A06 0%, #160F14 100%);
  position: relative;
  overflow: hidden;
}
```

> **Design and Budget Allocation Guidance:**
> Do not spend frontend budget or asset loading overhead on high-resolution card artwork within the main page grids. Keep page grids lightweight, utilizing only the base category gradients for a premium feel with rapid initial load times.
> Reserve complex, full-screen cinematic character images and custom artwork for future event-specific detail subpages (e.g. `/events/powerlifting`, `/events/fashion-show`, `/events/business-quiz`), where a targeted layout can absorb the asset footprint.

---

## 9. REGISTRATION MODAL

`src/components/registration/RegistrationModal.tsx`

**Global state (Zustand):**
```ts
// src/lib/store.ts
interface AppStore {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedEventIds: string[];
  toggleEvent: (id: string) => void;
  preselectedEventId: string | null;
  setPreselectedEvent: (id: string) => void;
}
```

Modal is mounted once in `layout.tsx`. Open/close driven by store.

**Modal appearance:**
- Mobile (< 768px): Bottom sheet — slides up from bottom, `100vw` wide, `88vh` tall, `border-radius: 12px 12px 0 0`
- Desktop: Centered dialog, `560px` max-width, `border-radius: 4px`
- Backdrop: `rgba(5, 4, 7, 0.85)`, `backdrop-filter: blur(8px)`

**Framer Motion enter/exit:**
```tsx
// Mobile bottom sheet
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'spring', damping: 28, stiffness: 260 }}
>

// Desktop centered
<motion.div
  initial={{ scale: 0.92, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.95, opacity: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
```

**Header:** Thin gold line + "ENTER THE REGISTRY" in Cinzel 600, letter-spacing 0.25em

**Progress bar:** 3-step, gold `scaleX` grows across top of modal
- Step 1: "Your Identity"
- Step 2: "Choose Your District"
- Step 3: "Confirm & Enter"

**Step 1 — Identity fields:**
```
Name      — text input
Email     — email input
Phone     — tel input (Indian mobile validation: /^[6-9]\d{9}$/)
College   — text input
Year      — select: 1st Year / 2nd Year / Final Year / Other
```

All inputs: sharp corners (`border-radius: 0`), `background: var(--stone-mid)`, `border: 1px solid var(--stone-mid)`, on focus: `border-color: var(--crimson)` with `box-shadow: 0 0 0 2px rgba(192,57,43,0.2)`.

**Step 2 — Event selection:**
Mini event cards in a 2-column grid. Each card shows district name + event name. Tap to select:
- Unselected: `border: 1px solid var(--stone-mid)`
- Selected: `border: 1px solid var(--crimson)` + `box-shadow: 0 0 12px rgba(192,57,43,0.3)` + gold checkmark top-right

**Step 3 — Confirm:**
Summary of selected events + all form data. Submit button.

**Submit button:** "IGNITE YOUR ENTRY" — Cinzel 700, 14px, full width, `background: var(--crimson)`, `border-radius: 0`, height 52px. On success: checkmark animation, "ENTRY REGISTERED. THE CASTLE KNOWS YOUR NAME." message.

**Zod schema:**
```ts
export const registrationSchema = z.object({
  name:           z.string().min(2),
  email:          z.string().email(),
  phone:          z.string().regex(/^[6-9]\d{9}$/),
  college:        z.string().min(3),
  year:           z.enum(['1st', '2nd', 'Final', 'Other']),
  selectedEvents: z.array(z.string()).min(1, 'Select at least one event'),
});
```

**Step transition animation (GSAP):**
```ts
const stepTl = gsap.timeline();
stepTl
  .to('.modal-step-current', { x: '-100%', opacity: 0, duration: 0.35, ease: 'power2.in' })
  .fromTo('.modal-step-next',
    { x: '100%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 0.38, ease: 'power3.out' }
  );
```

---

## 10. SECTION ⑫ — CTA BANNER

`src/components/shared/CTABanner.tsx`

Full viewport height (`100svh`). Background:
```css
background:
  radial-gradient(ellipse at center, rgba(192,57,43,0.18) 0%, transparent 65%),
  radial-gradient(ellipse at center, rgba(192,57,43,0.06) 0%, transparent 90%),
  var(--void);
```

Content (centered):
```
[ghost "AAKRITI" text — 40vw, opacity 0.025, behind]

"THE CASTLE AWAITS" — Cinzel 400, 13px, letter-spacing 0.5em, var(--text-ghost)

"YOUR NAME." — Cinzel 900, clamp(52px, 12vw, 100px), var(--gold-fire)
               with background-clip:text fire shimmer animation (CSS keyframes)

"AAKRITI 2026 · SIMS MBA · Bengaluru" — EB Garamond italic, var(--text-body)

[ ENTER THE REGISTRY ] — large CTA, Cinzel 700, var(--crimson) background
                          width: clamp(280px, 60vw, 400px), height: 64px
                          On click: openModal() from Zustand store
```

Fire shimmer keyframe on ghost text:
```css
@keyframes fire-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

.fire-text {
  background: linear-gradient(90deg,
    var(--gold-fire) 0%,
    var(--crimson-hi) 30%,
    var(--gold-bright) 60%,
    var(--gold-fire) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fire-shimmer 3s ease infinite;
}
```

When this section enters viewport (ScrollTrigger): PetalCanvas petal density doubles — emit a custom event `window.dispatchEvent(new Event('double-petals'))` and handle it in PetalCanvas by temporarily spawning extra petals.

---

## 11. FOOTER

Clean, minimal. Dark. No clutter.

```
Background: var(--castle-deep)
Top border: 1px solid rgba(212, 160, 84, 0.08)

Ghost text: "AAKRITI 2026" — Cinzel 900, 20vw, opacity 0.025, centered behind

Content (centered column):
  - "AAKRITI" — Cinzel Decorative 700, var(--gold), 32px
  - "Seshadripuram Institute of Management Studies" — EB Garamond, var(--text-ghost), 13px
  - "Department of MBA · Bengaluru, Karnataka" — same
  - Gold divider line (60px wide, centered)
  - Social icons (Lucide: Instagram, Linkedin, Mail) — var(--text-ghost), hover var(--gold)
  - "aakriti@simsblr.ac.in" — EB Garamond, var(--text-body)
  - "© 2026 AAKRITI · All Rights Reserved" — EB Garamond, var(--text-ghost), 11px
```

---

## 12. CONSTANTS (`src/lib/constants.ts`)

```ts
export const FEST_NAME     = 'AAKRITI';
export const FEST_YEAR     = '2026';
export const FEST_DATE     = new Date('2026-09-20T09:00:00'); // ← UPDATE THIS
export const FEST_VENUE    = 'SIMS Main Campus, Bengaluru';
export const FEST_TAGLINE  = 'Enter the Castle. Prove Your Realm.';
export const COLLEGE_NAME  = 'Seshadripuram Institute of Management Studies';
export const DEPT_NAME     = 'Department of MBA';
export const CONTACT_EMAIL = 'aakriti@simsblr.ac.in';

export const PETAL_COUNT_MOBILE  = 50;
export const PETAL_COUNT_DESKTOP = 70;
export const MOBILE_BREAKPOINT   = 768;
export const INTRO_DURATION_MS   = 5500;
```

---

## 13. GSAP REGISTRATION (`src/lib/gsap.ts`)

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.normalizeScroll(true); // smooth cross-device scroll
}

export { gsap, ScrollTrigger, Flip };
```

Import ONLY from `@/lib/gsap`, never directly from `'gsap'`.

---

## 14. TAILWIND CONFIG (`tailwind.config.ts`)

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-cinzel-deco)', 'serif'],
        heading:  ['var(--font-cinzel)', 'serif'],
        body:     ['var(--font-garamond)', 'serif'],
        mono:     ['var(--font-mono)', 'monospace'],
      },
      colors: {
        void:        '#050407',
        castle:      '#0D0810',
        stone:       '#160F14',
        'stone-mid': '#241820',
        crimson:     '#C0392B',
        'crimson-hi':'#E53935',
        gold:        '#D4A054',
        'gold-fire': '#FFD700',
        ember:       '#8B5E1A',
      },
      animation: {
        'fire-shimmer': 'fire-shimmer 3s ease infinite',
        'lantern-sway': 'lantern-sway 2.8s ease-in-out infinite alternate',
      },
      keyframes: {
        'fire-shimmer': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'lantern-sway': {
          '0%':   { transform: 'rotate(-4deg)' },
          '100%': { transform: 'rotate(4deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 15. MOBILE-FIRST SPECIFICATIONS

**Base viewport: 390px (iPhone 14). Everything else is an enhancement.**

### ANIMATION PARITY RULE

Mobile and desktop must provide the same emotional experience.

Animations may be optimized for performance but must never be removed solely because the device is mobile.

**Allowed:**
- ✓ Lower particle counts
- ✓ Lower DPR
- ✓ Smaller travel distances
- ✓ Reduced blur intensity

**Not Allowed:**
- ✗ Removing hero animations
- ✗ Removing section transitions
- ✗ Removing card interactions
- ✗ Replacing animated experiences with static layouts

```
Font clamps:
  Logo (intro + hero):      clamp(52px, 15vw, 120px)
  Section titles:           clamp(24px, 7vw, 52px)
  Card district name:       clamp(10px, 2.8vw, 13px)
  Card event name:          clamp(16px, 4.5vw, 22px)
  Body text:                clamp(13px, 3.5vw, 16px)
  CTA buttons:              clamp(12px, 3vw, 14px)

Grid:
  Cards: grid-cols-1 (default) → sm:grid-cols-2 → lg:grid-cols-3
  Gap: 1.5rem on mobile, 2rem on desktop

Modal:
  < 768px: bottom sheet (100vw, 88vh, border-radius: 12px 12px 0 0)
  ≥ 768px: centered dialog (max-width: 560px)

Three.js:
  Mount on all devices.

  Desktop:
  Full quality.

  Tablet:
  Medium quality.

  Mobile:
  Performance profile:
  - DPR capped to 1.5
  - Reduced fog complexity
  - Reduced geometry count
  - Same cinematic motion

Performance:
  ONLY animate: transform and opacity (compositor-thread only)
  NEVER animate: width, height, top, left, margin, padding
  will-change: transform on pinned sections and PetalCanvas
  next/image for all character images (automatic WebP, lazy loading)
  Canvas loop: visibilityState check before each frame
  ScrollTrigger markers: MUST be false in production
```

---

## 16. GLOBAL CSS FOUNDATIONS (`src/app/globals.css`)

```css
/* Prevent white flash — CRITICAL */
html {
  background-color: #050407;
  scroll-behavior: auto; /* GSAP handles smooth scroll */
}

body {
  background-color: #050407;
  color: #EDE8E0;
  font-family: var(--font-garamond), serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* No border-radius above 3px anywhere */
* {
  box-sizing: border-box;
}

/* Scrollbar — dark themed */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #050407; }
::-webkit-scrollbar-thumb { background: #241820; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #8B1A1A; }

/* Selection color */
::selection {
  background: rgba(192, 57, 43, 0.3);
  color: #EDE8E0;
}
```

---

## 17. QUALITY CHECKLIST

Before considering the build complete, verify every item:

```
□ html background-color: #050407 — zero white flash on load
□ No color used that isn't in the approved palette (Section 3)
□ No border-radius above 3px anywhere
□ Ghost text opacity never exceeds 0.04
□ PetalCanvas: fixed, pointer-events none, never re-renders
□ IntroOverlay: unmounts from DOM (setMounted(false)), not just hides
□ useGSAP() hook used everywhere — zero raw useEffect with GSAP
□ All GSAP logic in src/hooks/animations/ — zero GSAP in component files
□ gsap.registerPlugin() called ONLY in src/lib/gsap.ts
□ Three.js canvas mounts on all devices (with performance optimization on mobile)
□ Realm Transitions: GSAP screen-sweeps trigger correctly on scroll
□ CountdownTimer: live Date arithmetic vs FEST_DATE constant
□ Registration modal: bottom sheet mobile, centered dialog desktop
□ Card hover: rotateX entrance (gives depth feel on mobile)
□ ScrollTrigger.markers = false in all instances (production)
□ ScrollTrigger.normalizeScroll(true) called once in gsap.ts
□ Card motifs: SVG shapes show correctly on hover/tap
□ No Tailwind default colors — only custom palette via CSS vars
□ Framer Motion and GSAP never applied to the SAME element
□ Mobile cards: touch events (touchstart/touchend) on hover animations
□ Section divider lantern sway: infinite, all three dividers
□ Zod validation on all form fields before step progression
□ Fire shimmer animation on CTA banner text (background-clip: text)
□ Modal backdrop: blur(8px) on the overlay
□ Card entrance: stagger 0.1s, rotateX 10 → 0 (depth illusion)
```

---

## 18. BUILD PHASES

The agent must build in this exact order, pausing after each phase to confirm before proceeding:

**Phase 1 — Foundation**
Files: `tailwind.config.ts`, `src/app/globals.css`, `src/lib/gsap.ts`, `src/lib/constants.ts`, `src/data/events.ts`, `src/app/layout.tsx` (fonts + global providers only)

**Phase 2 — Particle & Canvas Systems**
Files: `src/components/shared/PetalCanvas.tsx`, `src/components/hero/HeroCanvas.tsx` (Three.js fog, all devices)

**Phase 3 — Intro & Navbar**
Files: `src/components/intro/IntroOverlay.tsx`, `src/hooks/animations/useIntroAnimation.ts`, `src/components/navbar/Navbar.tsx`

**Phase 4 — Hero Section**
Files: `src/components/hero/HeroSection.tsx`, `src/components/hero/CountdownTimer.tsx`, `src/hooks/animations/useHeroAnimation.ts`

**Phase 5 — Realm Heroes & Transitions**
Files: `src/components/realms/RealmHero.tsx`, `src/components/realms/RealmTransition.tsx`, `src/hooks/animations/useRealmTransition.ts`

**Phase 6 — Event Cards & Grids**
Files: `src/components/events/EventCard.tsx`, `src/components/events/EventsGrid.tsx`, `src/hooks/animations/useCardAnimation.ts`, `src/hooks/animations/useScrollReveal.ts`

**Phase 7 — Registration**
Files: `src/lib/store.ts`, `src/components/registration/RegistrationModal.tsx`, `src/components/registration/RegistrationForm.tsx`

**Phase 8 — CTA, Dividers, Footer**
Files: `src/components/shared/SectionDivider.tsx`, `src/components/shared/CTABanner.tsx`, `src/components/footer/Footer.tsx`

**Phase 9 — Home Page Assembly**
Files: `src/app/page.tsx` — assemble all sections in order from Section 5

---

## 19. OPENING INSTRUCTION

When this prompt is submitted, respond ONLY with:

> **"AAKRITI v4.0 — Infinity Castle Protocol Initiated.**
> The void is ready. The petals are falling.
> Beginning Phase 1 — Foundation."**

Then immediately generate all Phase 1 files — complete, production-ready code. Not skeletons. Not placeholders. Real, working code.

After each phase, pause and ask:
*"Phase [N] complete. [Brief summary of what was built]. Proceed to Phase [N+1] — [Phase Name]?"*

Do not proceed to the next phase until confirmed.

---

*AAKRITI Master Prompt v4.0 — Next.js 15 · Three.js · GSAP · Framer Motion · Infinity Castle Edition*
*Built for SIMS MBA · Bengaluru · 2026*
