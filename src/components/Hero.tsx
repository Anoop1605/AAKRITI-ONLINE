import React, { useState, useEffect, useRef } from 'react';
import { FEST_DATE, DEPT_NAME, COLLEGE_NAME } from '../lib/constants';
import { useHeroAnimation } from '../hooks/animations/useHeroAnimation';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const heroRef = useRef<HTMLElement>(null);
  const stoneBgRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLElement[]>([]);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    heroSection: heroRef,
    stoneBg: stoneBgRef,
    ghostText: ghostTextRef,
    heroLines: linesRef,
    eyebrow: eyebrowRef,
    tagline: taglineRef,
    cta: ctaRef,
    countdown: countdownRef,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = FEST_DATE.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (value: number) => value.toString().padStart(2, '0');

  return (
    <section ref={heroRef} className="hero relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Background Layers */}
      {/* Layer 2: Stone texture */}
      <div 
        ref={stoneBgRef} 
        className="absolute inset-[-20%] z-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22 opacity=%220.6%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] scale-110" 
      />
      
      {/* Layer 3: Ghost Text Split */}
      <div 
        ref={ghostTextRef}
        className="hero-ghost-text absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center font-display font-black text-[clamp(40px,11vw,170px)] select-none pointer-events-none leading-none tracking-[0.12em] z-0 opacity-0 flex justify-center items-center flex-nowrap whitespace-nowrap"
      >
        <span className="ghost-text-gold-red">AAKRITI</span>
      </div>

      {/* Layer 5: Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16">
        <p 
          ref={eyebrowRef} 
          className="font-body italic text-text-body text-[clamp(12px,3vw,16px)] tracking-widest uppercase mb-4 opacity-0"
        >
          {COLLEGE_NAME} &middot; {DEPT_NAME} &middot; Inter-collegiate Fest
        </p>

        <div className="flex flex-col items-center justify-center space-y-1 mb-8 relative">
          <h1 
            ref={el => { if(el) linesRef.current[0] = el; }} 
            className="hero-line hero-aakriti-animate font-display font-black text-[clamp(48px,12vw,110px)] leading-[1.1] tracking-wider opacity-0"
          >
            AAKRITI
          </h1>
          <h2 
            ref={el => { if(el) linesRef.current[1] = el; }} 
            className="hero-line font-heading font-normal text-text-body text-[clamp(24px,5vw,40px)] tracking-[0.3em] opacity-0"
          >
            2026
          </h2>
        </div>

        <p 
          ref={taglineRef} 
          className="font-body italic text-text-primary text-[clamp(18px,4vw,28px)] mb-10 opacity-0"
        >
          Enter the Castle. Prove Your Realm.
        </p>

        <div 
          ref={countdownRef}
          className="flex items-center gap-6 md:gap-10 font-mono text-gold"
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINS', value: timeLeft.mins },
            { label: 'SECS', value: timeLeft.secs }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-[clamp(24px,5vw,40px)] font-semibold leading-none mb-2">{formatUnit(item.value)}</span>
              <span className="text-text-ghost text-[10px] md:text-xs tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
