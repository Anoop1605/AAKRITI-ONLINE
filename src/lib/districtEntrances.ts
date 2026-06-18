import { gsap } from './gsap';

export type EntranceFn = (container: HTMLElement) => GSAPTimeline;

export const DISTRICT_ENTRANCE_MAP: Record<string, EntranceFn> = {
  'card-stone': buildStoneEntrance,
  'card-wind': buildWindEntrance,
  'card-shadow': buildShadowEntrance,
  'card-thunder': buildThunderEntrance,
  'card-iron': buildIronEntrance,
  'card-earth': buildEarthEntrance,
  'card-elegance': buildEleganceEntrance,
  'card-moonlight': buildMoonlightEntrance,
  'card-plaza': buildPlazaEntrance,
  'card-path': buildHiddenPathEntrance,
  'card-studio': buildStudioEntrance,
  'card-gaming': buildGamingEntrance,
  'card-council': buildCouncilEntrance,
  'card-market': buildMarketEntrance,
  'card-dojo': buildDojoEntrance,
  'card-vault': buildVaultEntrance,
  'card-innovation': buildInnovationEntrance,
};

// --- SPORTS ENTRANCES ---

function buildStoneEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const torches = container.querySelectorAll('.detail-torch-glow');
  const dust = container.querySelector('.detail-dust-overlay') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { scale: 1.12, opacity: 0, filter: 'brightness(0)' },
    { scale: 1.08, opacity: 1, filter: 'brightness(0.4)', duration: 0.9, ease: 'power2.out' },
    0
  );

  tl.to(bg,
    { filter: 'brightness(1)', scale: 1.0, duration: 0.8, ease: 'power1.inOut' },
    0.5
  );

  tl.fromTo(torches,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(2.5)' },
    0.3
  );

  tl.fromTo(dust,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.5
  );

  return tl;
}

function buildWindEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const lantern = container.querySelector('.detail-wind-lantern') as HTMLElement;
  const streaks = container.querySelectorAll('.detail-wind-streak');

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { scale: 1.1, opacity: 0 },
    { scale: 1.0, opacity: 1, duration: 1.0, ease: 'power2.inOut' },
    0
  );

  tl.fromTo(streaks,
    { x: '-120%', opacity: 0 },
    { x: '120%', opacity: 0.25, duration: 0.55, stagger: 0.08, ease: 'power3.in' },
    0.2
  );

  tl.to(streaks, { opacity: 0, duration: 0.2 }, 0.65);

  tl.fromTo(lantern,
    { y: '60%', opacity: 0, scale: 0.6 },
    { y: '0%', opacity: 1, scale: 1.0, duration: 0.9, ease: 'power3.out' },
    0.35
  );

  return tl;
}

function buildShadowEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const candle = container.querySelector('.detail-candle-glow') as HTMLElement;
  const flame = container.querySelector('.detail-candle-flame') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: 'power1.out' },
    0
  );

  tl.fromTo(candle,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.1, ease: 'power1.out' },
    0.4
  );

  tl.fromTo(flame,
    { scaleY: 0, opacity: 0 },
    { scaleY: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' },
    0.6
  );

  tl.to(flame,
    { scaleY: 0.85, scaleX: 1.1, duration: 0.25, ease: 'sine.inOut', repeat: -1, yoyo: true },
    0.9
  );

  return tl;
}

function buildThunderEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const flashDiv = container.querySelector('.detail-thunder-flash') as HTMLElement;
  const crack = container.querySelector('.detail-lightning-crack') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(flashDiv,
    { opacity: 0 },
    { opacity: 0.85, duration: 0.06, ease: 'none' },
    0.1
  );
  tl.to(flashDiv,
    { opacity: 0, duration: 0.35, ease: 'power3.out' },
    0.16
  );

  tl.fromTo(flashDiv,
    { opacity: 0 },
    { opacity: 0.35, duration: 0.04 },
    0.3
  );
  tl.to(flashDiv, { opacity: 0, duration: 0.2 }, 0.34);

  tl.fromTo(bg,
    { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.out' },
    0.12
  );

  tl.fromTo(crack,
    { opacity: 0, scaleY: 0, transformOrigin: 'top center' },
    { opacity: 0.08, scaleY: 1, duration: 0.4, ease: 'power4.out' },
    0.15
  );
  tl.to(crack, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 0.7);

  return tl;
}

function buildIronEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const heat = container.querySelector('.detail-forge-heat') as HTMLElement;
  const sparks = container.querySelectorAll('.detail-spark');

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { scale: 1.1, opacity: 0, filter: 'brightness(0) saturate(0)' },
    { scale: 1.02, opacity: 1, filter: 'brightness(0.5) saturate(1.5)', duration: 0.7, ease: 'power2.out' },
    0
  );
  tl.to(bg,
    { filter: 'brightness(1) saturate(1)', scale: 1.0, duration: 0.8, ease: 'power1.inOut' },
    0.6
  );

  tl.fromTo(heat,
    { y: '30%', opacity: 0, scale: 0.6 },
    { y: '0%', opacity: 1, scale: 1.0, duration: 0.9, ease: 'power2.out' },
    0.2
  );

  sparks.forEach((spark, i) => {
    const el = spark as HTMLElement;
    const xEnd = (i % 2 === 0 ? -1 : 1) * (20 + i * 8);
    tl.fromTo(el,
      { y: 0, x: 0, opacity: 1, scale: 1 },
      { y: -(80 + i * 15), x: xEnd, opacity: 0, scale: 0.3, duration: 0.6 + i * 0.05, ease: 'power2.out' },
      0.3 + i * 0.04
    );
  });

  return tl;
}

function buildEarthEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const pillarL = container.querySelector('.detail-pillar-left') as HTMLElement;
  const pillarR = container.querySelector('.detail-pillar-right') as HTMLElement;
  const dust = container.querySelector('.detail-dust-overlay') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { scale: 1.08, opacity: 0, y: '3%' },
    { scale: 1.0, opacity: 1, y: '0%', duration: 1.2, ease: 'power1.inOut' },
    0
  );

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

  tl.fromTo(dust,
    { opacity: 0 },
    { opacity: 0.4, duration: 0.5, ease: 'power2.out' },
    0.5
  );
  tl.to(dust, { opacity: 0.15, duration: 1.5, ease: 'power1.inOut' }, 1.0);

  return tl;
}

// --- CULTURAL ENTRANCES ---

function buildEleganceEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const runway = container.querySelector('.detail-runway-line') as HTMLElement;
  const petals = container.querySelectorAll('.detail-elegance-petal');

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { scale: 1.08, opacity: 0, filter: 'saturate(0)' },
    { scale: 1.0, opacity: 1, filter: 'saturate(1)', duration: 1.0, ease: 'power2.inOut' },
    0
  );

  tl.fromTo(runway,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 0.08, duration: 0.8, ease: 'power3.out' },
    0.3
  );

  petals.forEach((petal, i) => {
    const fromLeft = i < 3;
    const el = petal as HTMLElement;
    tl.fromTo(el,
      { x: fromLeft ? '-120%' : '120%', opacity: 0, rotation: fromLeft ? -40 : 40 },
      { x: '0%', opacity: 1, rotation: 0, duration: 0.7, ease: 'power2.out' },
      0.4 + i * 0.07
    );
  });

  return tl;
}

function buildMoonlightEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const moon = container.querySelector('.detail-moon') as HTMLElement;
  const moonGlow = container.querySelector('.detail-moon-glow') as HTMLElement;
  const spotLeft = container.querySelector('.detail-spot-left') as HTMLElement;
  const spotRight = container.querySelector('.detail-spot-right') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: 'power1.out' },
    0
  );

  tl.fromTo(moon,
    { scale: 0, opacity: 0, y: '-20px' },
    { scale: 1, opacity: 1, y: '0px', duration: 0.9, ease: 'back.out(1.4)' },
    0.3
  );

  tl.fromTo(moonGlow,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.1, ease: 'power1.out' },
    0.5
  );

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

  tl.to(moon,
    { y: '6px', duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true },
    1.5
  );

  return tl;
}

function buildPlazaEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const stageLight = container.querySelector('.detail-stage-light') as HTMLElement;
  const crowd = container.querySelector('.detail-crowd-silhouette') as HTMLElement;
  const curtainL = container.querySelector('.detail-curtain-left') as HTMLElement;
  const curtainR = container.querySelector('.detail-curtain-right') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.04 },
    { opacity: 1, scale: 1.0, duration: 0.5, ease: 'power2.out' },
    0
  );

  tl.fromTo(stageLight,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.6, ease: 'power3.out' },
    0.1
  );

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

  tl.fromTo(crowd,
    { y: '40%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.6, ease: 'power2.out' },
    0.5
  );

  return tl;
}

function buildHiddenPathEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const fog = container.querySelector('.detail-fog') as HTMLElement;
  const lanterns = container.querySelectorAll('.detail-path-lantern');
  const mapFrag = container.querySelector('.detail-map-fragment') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.06 },
    { opacity: 1, scale: 1.0, duration: 0.9, ease: 'power1.inOut' },
    0
  );

  tl.fromTo(fog,
    { x: '-40%', opacity: 0 },
    { x: '0%', opacity: 1, duration: 1.2, ease: 'power1.out' },
    0.1
  );

  tl.fromTo(lanterns,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, stagger: 0.3, ease: 'back.out(2)' },
    0.5
  );

  tl.fromTo(mapFrag,
    { opacity: 0, rotation: -8 },
    { opacity: 0.12, rotation: -5, duration: 0.6, ease: 'power2.out' },
    1.0
  );

  return tl;
}

function buildStudioEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const spotlight = container.querySelector('.detail-studio-spot') as HTMLElement;
  const filmStrip = container.querySelector('.detail-film-strip') as HTMLElement;
  const clap = container.querySelector('.detail-clap-flash') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: 'none' },
    0.4
  );

  tl.fromTo(clap,
    { opacity: 0 },
    { opacity: 0.6, duration: 0.04 },
    0.42
  );
  tl.to(clap, { opacity: 0, duration: 0.2 }, 0.46);

  tl.fromTo(spotlight,
    { scaleX: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleX: 1, opacity: 1, duration: 0.65, ease: 'power3.out' },
    0.5
  );

  tl.fromTo(filmStrip,
    { y: '0%', opacity: 0 },
    { y: '-30%', opacity: 0.04, duration: 6, ease: 'none', repeat: -1 },
    0.7
  );

  return tl;
}

function buildGamingEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const scanBar = container.querySelector('.detail-scan-bar') as HTMLElement;
  const grid = container.querySelector('.detail-gaming-grid') as HTMLElement;
  const zone = container.querySelector('.detail-zone-ring') as HTMLElement;
  const marker = container.querySelector('.detail-squad-marker') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, filter: 'brightness(0)' },
    { opacity: 1, filter: 'brightness(1)', duration: 0.5, ease: 'power2.out' },
    0
  );

  tl.fromTo(scanBar,
    { y: '-100%', opacity: 0 },
    { y: '100%', opacity: 1, duration: 0.65, ease: 'none' },
    0.1
  );
  tl.to(scanBar, { opacity: 0, duration: 0.1 }, 0.75);

  tl.fromTo(grid,
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: 'power2.out' },
    0.5
  );

  tl.fromTo(zone,
    { scale: 2.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.6
  );

  tl.fromTo(marker,
    { opacity: 0 },
    { opacity: 1, duration: 0.08, repeat: 5, yoyo: true },
    0.9
  );

  return tl;
}

// --- MANAGEMENT ENTRANCES ---

function buildCouncilEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const table = container.querySelector('.detail-table-glow') as HTMLElement;
  const candles = container.querySelectorAll('.detail-council-candle');
  const scroll = container.querySelector('.detail-scroll-line') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, filter: 'brightness(0)' },
    { opacity: 1, filter: 'brightness(0.5)', duration: 0.8, ease: 'power1.out' },
    0
  );
  tl.to(bg,
    { filter: 'brightness(1)', duration: 0.9, ease: 'power1.inOut' },
    0.7
  );

  tl.fromTo(table,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.3
  );

  tl.fromTo(candles,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.35, stagger: 0.22, ease: 'back.out(3)' },
    0.5
  );

  tl.fromTo(scroll,
    { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
    { scaleX: 1, opacity: 0.35, duration: 0.6, ease: 'power2.inOut' },
    0.9
  );

  return tl;
}

function buildMarketEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const lanterns = container.querySelectorAll('.detail-market-lantern');
  const banner = container.querySelector('.detail-market-banner') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' },
    0
  );

  tl.fromTo(banner,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.55, ease: 'power3.out' },
    0.2
  );

  tl.fromTo(lanterns,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.4, stagger: 0.18, ease: 'back.out(2.5)' },
    0.4
  );

  lanterns.forEach((lantern, i) => {
    tl.to(lantern,
      { rotation: 4, duration: 1.8 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true, transformOrigin: 'top center' },
      1.5 + i * 0.1
    );
  });

  return tl;
}

function buildDojoEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const spotlight = container.querySelector('.detail-dojo-spot') as HTMLElement;
  const chairGlow = container.querySelector('.detail-chair-glow') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0 },
    { opacity: 1, duration: 0.2, ease: 'none' },
    0.5
  );

  tl.fromTo(spotlight,
    { scaleY: 0, opacity: 0, transformOrigin: 'top center' },
    { scaleY: 1, opacity: 1, duration: 0.55, ease: 'power4.out' },
    0.55
  );

  tl.fromTo(chairGlow,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' },
    0.9
  );

  tl.to(spotlight,
    { opacity: 0.85, duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true },
    1.5
  );

  return tl;
}

function buildVaultEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const ringOuter = container.querySelector('.detail-vault-ring-outer') as HTMLElement;
  const ringInner = container.querySelector('.detail-vault-ring-inner') as HTMLElement;
  const goldLight = container.querySelector('.detail-vault-light') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1.0, duration: 0.7, ease: 'power2.out' },
    0
  );

  tl.fromTo(ringOuter,
    { scale: 0, rotation: -90, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.2
  );

  tl.fromTo(ringInner,
    { scale: 0, rotation: 90, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'power2.out' },
    0.3
  );

  tl.fromTo(goldLight,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out' },
    0.8
  );

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

function buildInnovationEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const grid = container.querySelector('.detail-innovation-grid') as HTMLElement;
  const pagodaB = container.querySelector('.detail-pagoda-base') as HTMLElement;
  const pagodaT = container.querySelector('.detail-pagoda-top') as HTMLElement;
  const pulse = container.querySelector('.detail-data-pulse') as HTMLElement;

  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.04 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' },
    0
  );

  tl.fromTo(grid,
    { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 },
    { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 0.7, ease: 'power2.out' },
    0.1
  );

  tl.fromTo(pagodaB,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.55, ease: 'power3.out' },
    0.5
  );

  tl.fromTo(pagodaT,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' },
    0.7
  );

  tl.fromTo(pulse,
    { scale: 0, opacity: 0.5 },
    { scale: 3, opacity: 0, duration: 1.0, ease: 'power2.out' },
    0.9
  );

  tl.fromTo(pulse,
    { scale: 0, opacity: 0.3 },
    { scale: 3, opacity: 0, duration: 1.4, ease: 'power2.out', repeat: -1, repeatDelay: 1.5 },
    2.1
  );

  return tl;
}

export function buildDefaultEntrance(container: HTMLElement): GSAPTimeline {
  const bg = container.querySelector('.detail-bg') as HTMLElement;
  const tl = gsap.timeline({ paused: true });

  tl.fromTo(bg,
    { opacity: 0, scale: 1.05 },
    { opacity: 1, scale: 1.0, duration: 0.8, ease: 'power2.inOut' }
  );

  return tl;
}
