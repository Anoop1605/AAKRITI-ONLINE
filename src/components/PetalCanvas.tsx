import React, { useEffect, useRef } from 'react';
import { PETAL_COUNT_DESKTOP, PETAL_COUNT_MOBILE, MOBILE_BREAKPOINT } from '../lib/constants';

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  color: string;
}

interface Lantern {
  x: number;
  y: number;
  size: number;
  phase: number;
  speed: number;
  amp: number;
}

const PETAL_COLORS = ['#E8C4C4', '#C4687A', '#8B3A50'];

export const PetalCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    let lanterns: Lantern[] = [];
    let width = 0;
    let height = 0;

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const isMobile = width < MOBILE_BREAKPOINT;
      const count = isMobile ? PETAL_COUNT_MOBILE : PETAL_COUNT_DESKTOP;

      // Initialize petals
      petals = Array.from({ length: count }).map(() => createPetal(true));

      // Initialize 3 background lanterns
      lanterns = [
        { x: width * 0.2, y: height * 0.3, size: 70, phase: Math.random() * Math.PI * 2, speed: 0.001, amp: 40 },
        { x: width * 0.8, y: height * 0.6, size: 80, phase: Math.random() * Math.PI * 2, speed: 0.0008, amp: 60 },
        { x: width * 0.5, y: height * 0.8, size: 60, phase: Math.random() * Math.PI * 2, speed: 0.0012, amp: 30 },
      ];
    };

    const createPetal = (randomY = false): Petal => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -20,
      size: Math.random() > 0.5 ? 4 + Math.random() * 2.5 : 2 + Math.random() * 2, // 2 to 6.5
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.6, // -0.8 to 0.8
      speedY: 0.3 + Math.random() * 0.9, // 0.3 to 1.2
      speedX: (Math.random() - 0.5) * 0.6, // -0.3 to 0.3
      opacity: 0.10 + Math.random() * 0.16, // 0.06 to 0.22
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.008 + Math.random() * 0.012, // 0.008 to 0.02
      wobbleAmp: 8 + Math.random() * 17, // 8 to 25
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    });

    const render = (time: number) => {
      // Skip rendering if page is hidden
      if (document.visibilityState === 'hidden') {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render lanterns
      lanterns.forEach(lantern => {
        const currentX = lantern.x + Math.sin(time * lantern.speed + lantern.phase) * lantern.amp;
        ctx.save();
        ctx.beginPath();
        ctx.arc(currentX, lantern.y, lantern.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 160, 84, 0.04)'; // Gold with 0.04 opacity
        ctx.fill();
        ctx.restore();
      });

      // Render petals
      petals.forEach((petal, index) => {
        // Update petal
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.rotation += petal.rotationSpeed;
        petal.wobble += petal.wobbleSpeed;

        const currentX = petal.x + Math.sin(petal.wobble) * petal.wobbleAmp;

        // Reset if off screen
        if (petal.y > height + 20 || currentX > width + 20 || currentX < -20) {
          petals[index] = createPetal(false);
        }

        // Draw
        ctx.save();
        ctx.translate(currentX, petal.y);
        ctx.rotate((petal.rotation * Math.PI) / 180);
        ctx.globalAlpha = petal.opacity;
        ctx.fillStyle = petal.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, petal.size, petal.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', initCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[900]"
      aria-hidden="true"
    />
  );
};
