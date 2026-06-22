import React, { useEffect, useRef, useState } from 'react';

export const IntroOverlay: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const toriiCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const slashLRef = useRef<HTMLDivElement>(null);
  const slashRRef = useRef<HTMLDivElement>(null);
  const logoCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const ringsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const flash = flashRef.current;
    const toriiCanvas = toriiCanvasRef.current;
    if (!root || !flash || !toriiCanvas) return;

    const tCtx = toriiCanvas.getContext('2d');
    if (!tCtx) return;

    const chars = logoCharsRef.current;
    const eyebrow = eyebrowRef.current;
    const subtitle = subtitleRef.current;
    const tagline = taglineRef.current;
    const slashL = slashLRef.current;
    const slashR = slashRRef.current;
    const rings = ringsRef.current;

    let W = 0, H = 0;
    let animId: number;
    let isFinished = false;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      if (toriiCanvas) {
        toriiCanvas.width = W; 
        toriiCanvas.height = H;
        if (isFinished) {
          drawTorii(1, 0.5); // Redraw final state if resized after intro
        }
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // Easing helpers
    const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOut4 = (t: number) => 1 - Math.pow(1 - t, 4);
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const setEl = (el: HTMLElement | null, props: any) => el && Object.assign(el.style, props);

    // Torii Gate Draw
    function drawTorii(progress: number, glowAlpha: number) {
      // Get exact canvas dimensions
      const W = toriiCanvas!.width;
      const H = toriiCanvas!.height;

      // Safe Dynamic Scaling for the Gate
      // Mobile: Takes up 85% of screen width. Desktop: Caps at 600px wide.
      const gateW = Math.min(W * 0.85, 600); 
      
      // Mobile: Takes up 75% of screen height. Desktop: Caps at 650px tall.
      const gateH = Math.min(H * 0.75, 650);

      // Ensure context exists and dimensions are valid before drawing
      if (!tCtx || gateW <= 0 || gateH <= 0) return;

      tCtx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const postH = gateH * 0.85;
      const postW = 5;
      const legH = gateH * 0.12;
      const beam1Y = cy - gateH * 0.5;
      const beam2Y = cy - gateH * 0.35;

      tCtx!.save();
      tCtx!.globalAlpha = Math.min(progress, 1) * 0.22 * (1 + glowAlpha * 0.5);
      const grad = tCtx!.createRadialGradient(cx, cy - gateH * 0.1, 20, cx, cy - gateH * 0.1, gateW * 0.7);
      grad.addColorStop(0, 'rgba(139,30,26,0.25)');
      grad.addColorStop(0.5, 'rgba(139,94,26,0.08)');
      grad.addColorStop(1, 'transparent');
      tCtx!.fillStyle = grad;
      tCtx!.fillRect(0, 0, W, H);
      tCtx!.restore();

      if (progress < 0.05) return;

      const p = Math.min((progress - 0.05) / 0.95, 1);
      const ease = 1 - Math.pow(1 - p, 3);

      tCtx!.save();
      tCtx!.globalAlpha = ease * 0.18;
      tCtx!.strokeStyle = '#D4A054';
      tCtx!.lineWidth = postW;
      tCtx!.lineCap = 'round';

      const lx = cx - gateW * 0.4;
      const rx2 = cx + gateW * 0.4;
      const topY = cy - gateH * 0.5;
      const botY = topY + postH;

      const postReveal = Math.min(ease * 1.6, 1);
      tCtx!.beginPath(); tCtx!.moveTo(lx, topY); tCtx!.lineTo(lx, topY + postH * postReveal); tCtx!.stroke();
      tCtx!.beginPath(); tCtx!.moveTo(rx2, topY); tCtx!.lineTo(rx2, topY + postH * postReveal); tCtx!.stroke();

      if (ease > 0.3) {
        const bEase = Math.min((ease - 0.3) / 0.7, 1);
        tCtx!.lineWidth = 9;
        tCtx!.beginPath(); tCtx!.moveTo(cx - gateW * 0.5 * bEase, beam1Y); tCtx!.lineTo(cx + gateW * 0.5 * bEase, beam1Y); tCtx!.stroke();
      }
      if (ease > 0.5) {
        const bEase = Math.min((ease - 0.5) / 0.5, 1);
        tCtx!.lineWidth = 6;
        tCtx!.beginPath(); tCtx!.moveTo(cx - gateW * 0.36 * bEase, beam2Y); tCtx!.lineTo(cx + gateW * 0.36 * bEase, beam2Y); tCtx!.stroke();
      }
      if (ease > 0.7) {
        const fEase = Math.min((ease - 0.7) / 0.3, 1);
        tCtx!.lineWidth = 8;
        tCtx!.beginPath(); tCtx!.moveTo(lx - 8, botY); tCtx!.lineTo(lx - 8, botY + legH * fEase); tCtx!.stroke();
        tCtx!.beginPath(); tCtx!.moveTo(lx + 8, botY); tCtx!.lineTo(lx + 8, botY + legH * fEase); tCtx!.stroke();
        tCtx!.beginPath(); tCtx!.moveTo(rx2 - 8, botY); tCtx!.lineTo(rx2 - 8, botY + legH * fEase); tCtx!.stroke();
        tCtx!.beginPath(); tCtx!.moveTo(rx2 + 8, botY); tCtx!.lineTo(rx2 + 8, botY + legH * fEase); tCtx!.stroke();
      }
      tCtx!.restore();
    }

    // Petals removed in favor of external PetalCanvas.tsx

    function burstRing(ring: HTMLElement | null, delay: number) {
      if (!ring) return;
      setTimeout(() => {
        ring.style.transition = 'none';
        ring.style.transform = 'scale(0)';
        ring.style.borderColor = 'rgba(192,57,43,0.6)';
        ring.style.opacity = '1';
        setTimeout(() => {
          ring.style.transition = 'transform 1.4s cubic-bezier(0,0.2,0.6,1), opacity 1.4s ease-out, border-color 1.4s ease-out';
          ring.style.transform = 'scale(1)';
          ring.style.borderColor = 'rgba(192,57,43,0)';
          ring.style.opacity = '0';
        }, 30);
      }, delay);
    }

    // Initialize animation state
    cancelAnimationFrame(animId!);
    tCtx!.clearRect(0, 0, W, H);

    chars.forEach(c => { if(c){ c.style.opacity = '0'; c.style.transform = 'translateY(30px) scaleY(0.7)'; }});
    setEl(eyebrow, { opacity: '0', transform: 'translateY(8px)' });
    setEl(subtitle, { opacity: '0' });
    setEl(tagline, { opacity: '0' });
    setEl(slashL, { width: '0', opacity: '0' });
    setEl(slashR, { width: '0', opacity: '0' });
    rings.forEach(r => { if(r){ r.style.transform = 'scale(0)'; r.style.opacity = '0'; }});
    setEl(flash, { opacity: '1' });


    let start: number | null = null;
    const TOTAL = 5200;

    function makeCracks() {
      const cx = W/2, cy = H/2;
      const crackData = [
        { x: cx, y: cy - 30, angle: -85, len: cy * 0.9 },
        { x: cx - 20, y: cy + 20, angle: 92, len: (H - cy) * 0.95 },
        { x: cx + 15, y: cy - 10, angle: -78, len: cy * 0.7 },
        { x: cx - 30, y: cy + 40, angle: 105, len: (H - cy) * 0.6 },
      ];
      crackData.forEach((c, i) => {
        const el = document.createElement('div');
        el.style.cssText = `
          position: absolute;
          background: linear-gradient(180deg, rgba(192,57,43,0.7), rgba(192,57,43,0));
          width: 1px;
          left: ${c.x}px; top: ${c.y}px;
          height: ${c.len}px;
          transform: rotate(${c.angle}deg) scaleY(0);
          transform-origin: top center;
          opacity: 0;
          pointer-events: none;
          z-index: 3;
        `;
        root!.appendChild(el);
        setTimeout(() => {
          el.style.transition = 'opacity 0.1s, transform 0.4s ease-out';
          el.style.opacity = '0.8';
          el.style.transform = `rotate(${c.angle}deg) scaleY(1)`;
          setTimeout(() => {
            el.style.transition = 'opacity 0.6s';
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 700);
          }, 250 + i * 50);
        }, 80 + i * 60);
      });
    }

    function frame(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / TOTAL, 1);

      if (elapsed < 500) {
        flash!.style.opacity = String(1 - elapsed / 500);
      } else {
        flash!.style.opacity = '0';
      }

      const toriiT = Math.min(Math.max((elapsed - 300) / 2200, 0), 1);
      const toriiGlow = Math.sin(elapsed * 0.002) * 0.5 + 0.5;
      drawTorii(easeOut3(toriiT), toriiGlow);


      if (elapsed > 1800) {
        const ep = Math.min((elapsed - 1800) / 600, 1);
        eyebrow!.style.opacity = String(easeOut3(ep));
        eyebrow!.style.transform = `translateY(${lerp(8, 0, easeOut3(ep))}px)`;
      }

      if (elapsed > 2200) {
        const sp = Math.min((elapsed - 2200) / 400, 1);
        const sw = Math.round(lerp(0, Math.min(W * 0.12, 80), easeOut3(sp)));
        slashL!.style.width = sw + 'px';
        slashL!.style.opacity = String(easeOut3(sp));
        slashR!.style.width = sw + 'px';
        slashR!.style.opacity = String(easeOut3(sp));
      }

      chars.forEach((c, i) => {
        const charStart = 2400 + i * 110;
        if (elapsed > charStart && c) {
          const cp = Math.min((elapsed - charStart) / 550, 1);
          const e = easeOut4(cp);
          c.style.opacity = String(e);
          c.style.transform = `translateY(${lerp(30, 0, e)}px) scaleY(${lerp(0.7, 1, e)})`;
        }
      });

      if (elapsed > 3600) {
        const sp = Math.min((elapsed - 3600) / 700, 1);
        subtitle!.style.opacity = String(easeOut3(sp));
      }

      if (elapsed >= 3200 && elapsed < 3250) burstRing(rings[0], 0);
      if (elapsed >= 3500 && elapsed < 3550) burstRing(rings[1], 0);
      if (elapsed >= 3800 && elapsed < 3850) burstRing(rings[2], 0);

      if (elapsed > 4200) {
        const tp = Math.min((elapsed - 4200) / 700, 1);
        tagline!.style.opacity = String(easeOut3(tp));
      }

      if (t < 1) {
        animId = requestAnimationFrame(frame);
      } else {
        isFinished = true;
        setDone(true);
        if (root) {
          root.style.transition = 'opacity 1s ease-in-out';
          root.style.opacity = '0';
        }
      }
    }

    setTimeout(makeCracks, 50);
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={toriiCanvasRef} className="fixed inset-0 pointer-events-none z-[1]" />

      <div 
        ref={rootRef} 
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden ${done ? 'pointer-events-none' : ''}`}
      >
        <div ref={flashRef} className="absolute inset-0 bg-[#050407] z-[15] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050407_100%)] z-[5] pointer-events-none" />

        <div className="relative z-[10] flex flex-col items-center gap-0 text-center select-none">
          <div ref={eyebrowRef} className="font-heading text-[11px] tracking-[0.5em] text-[#8B5E1A] uppercase opacity-0 translate-y-2 transition-none mb-5">
            SIMS · Dept. of MBA · Bengaluru
          </div>
          <div className="relative flex items-center gap-0">
            <div ref={slashLRef} className="h-px bg-gradient-to-r from-transparent via-[#D4A054] to-transparent mx-4 opacity-0 self-center shrink-0 transition-none" />
            <div className="flex flex-nowrap whitespace-nowrap">
              {"AAKRITI".split('').map((char, i) => (
                <span 
                  key={i} 
                  ref={el => { logoCharsRef.current[i] = el; }} 
                  className="font-display font-black text-[clamp(38px,9vw,90px)] text-[#FFD700] drop-shadow-[0_0_60px_rgba(255,215,0,0.15)] opacity-0 inline-block leading-none"
                  style={{ transform: 'translateY(30px) scaleY(0.7)' }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div ref={slashRRef} className="h-px bg-gradient-to-r from-transparent via-[#D4A054] to-transparent mx-4 opacity-0 self-center shrink-0 transition-none" />
          </div>
          <div ref={subtitleRef} className="font-body italic text-[14px] tracking-[0.35em] text-[#A89880] opacity-0 mt-[18px] whitespace-nowrap">
            SIMS Intercollegiate Fest · 2026
          </div>
          <div ref={taglineRef} className="font-heading text-[11px] tracking-[0.3em] text-[#C0392B] opacity-0 mt-[28px] uppercase">
            Enter the Castle. Prove Your Realm.
          </div>
        </div>

        <div ref={el => { ringsRef.current[0] = el; }} className="absolute border border-transparent rounded-full pointer-events-none z-[1] scale-0" style={{ width: '160px', height: '160px', marginLeft: '-80px', marginTop: '-80px', top: '50%', left: '50%' }} />
        <div ref={el => { ringsRef.current[1] = el; }} className="absolute border border-transparent rounded-full pointer-events-none z-[1] scale-0" style={{ width: '320px', height: '320px', marginLeft: '-160px', marginTop: '-160px', top: '50%', left: '50%' }} />
        <div ref={el => { ringsRef.current[2] = el; }} className="absolute border border-transparent rounded-full pointer-events-none z-[1] scale-0" style={{ width: '520px', height: '520px', marginLeft: '-260px', marginTop: '-260px', top: '50%', left: '50%' }} />
      </div>
    </>
  );
};
