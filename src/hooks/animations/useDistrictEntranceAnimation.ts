import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { DISTRICT_ENTRANCE_MAP, buildDefaultEntrance } from '../../lib/districtEntrances';

export function useDistrictEntranceAnimation(
  containerRef: React.RefObject<HTMLElement | null>,
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

    // Apply will-change for performance
    const leftBar = container.querySelector('.detail-left-bar') as HTMLElement;
    const bg = container.querySelector('.detail-bg') as HTMLElement;
    const logistics = container.querySelector('.detail-logistics') as HTMLElement;
    if (leftBar) leftBar.style.willChange = 'opacity, transform';
    if (bg) bg.style.willChange = 'transform, opacity, filter';
    if (logistics) logistics.style.willChange = 'opacity, transform';

    const master = gsap.timeline({
      onComplete: () => {
        // Will-change cleanup after Phase C begins / entrance finishes
        if (leftBar) leftBar.style.willChange = 'auto';
        if (bg) bg.style.willChange = 'auto';
        if (logistics) logistics.style.willChange = 'auto';
        
        ScrollTrigger.refresh();
      }
    });

    // ── PHASE A: Environment builds (unique per district, 0.8–1.2s) ──
    const phaseA = DISTRICT_ENTRANCE_MAP[districtTheme]?.(container)
      ?? buildDefaultEntrance(container);
    master.add(phaseA, 0);

    // ── PHASE B: Content enters (shared, 0.9s) ──
    const districtLabel = container.querySelector('.detail-district-label');
    const eventName = container.querySelector('.detail-event-name');
    const tagline = container.querySelector('.detail-tagline');
    const statsBox = container.querySelector('.detail-stats-box');
    const description = container.querySelector('.detail-description');
    const ctaBtn = container.querySelector('.detail-cta');

    master.fromTo(districtLabel,
      { y: 20, opacity: 0, letterSpacing: '0.5em' },
      { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 0.5, ease: 'power2.out' },
      0.6
    );
    master.fromTo(eventName,
      { clipPath: 'inset(100% 0% 0% 0%)', y: 12, opacity: 0 },
      { clipPath: 'inset(0% 0% 0% 0%)', y: 0, opacity: 1, duration: 0.8, ease: 'power4.out' },
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
    master.fromTo(logistics,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      1.55
    );
    master.fromTo(ctaBtn,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
      1.7
    );

    // ── PHASE C: Idle loop (shared, repeats indefinitely) ──
    // Left bar breathes
    if (leftBar) {
      gsap.to(leftBar, {
        opacity: 0.6, duration: 2.2,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
        delay: 1.8
      });
    }

    // Background very slowly breathes scale
    if (bg) {
      gsap.to(bg, {
        scale: 1.015, duration: 8,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
        delay: 2.0
      });
    }

  }, { scope: containerRef });
}
