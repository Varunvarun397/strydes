import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsMobile } from '../hooks/useIsMobile';
import { useMouseParallax } from '../hooks/useMouseParallax';
import { MagneticButton } from './MagneticButton';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let animation = 0;
    let visible = true;
    const count = isMobile ? 1500 : 6000;
    const silhouette = [
      [0.08, 0.68], [0.12, 0.57], [0.25, 0.49], [0.39, 0.43],
      [0.49, 0.28], [0.58, 0.22], [0.67, 0.27], [0.72, 0.39],
      [0.82, 0.49], [0.92, 0.56], [0.96, 0.63], [0.92, 0.70],
      [0.80, 0.75], [0.60, 0.77], [0.38, 0.75], [0.20, 0.73],
    ];
    const insideSilhouette = (x: number, y: number) => {
      let inside = false;
      for (let i = 0, j = silhouette.length - 1; i < silhouette.length; j = i++) {
        const [xi, yi] = silhouette[i];
        const [xj, yj] = silhouette[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    };
    const particles = Array.from({ length: count }, () => {
      let targetX = 0;
      let targetY = 0;
      do {
        targetX = Math.random();
        targetY = Math.random();
      } while (!insideSilhouette(targetX, targetY));
      return {
      angle: Math.random() * Math.PI * 2,
      radius: 70 + Math.random() * 560,
      speed: 0.0007 + Math.random() * 0.0014,
      offset: Math.random() * 1000,
      size: 0.35 + Math.random() * 1.35,
        targetX,
        targetY,
      };
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, width, height);
      const cx = width * 0.55;
      const cy = height * 0.48;
      const progress = reduced ? 1 : Math.min(frame / 105, 1);
      const ease = progress * progress * (3 - 2 * progress);
      particles.forEach((particle, index) => {
        const angle = particle.angle + (reduced ? 0 : frame * particle.speed);
        const inward = 0.88 + Math.sin(frame * 0.003 + particle.offset) * 0.12;
        const startX = cx + Math.cos(angle) * particle.radius * inward;
        const startY = cy + Math.sin(angle * 1.15) * particle.radius * 0.42 * inward;
        const targetX = cx + (particle.targetX - 0.5) * width * 0.72;
        const targetY = cy + (particle.targetY - 0.5) * height * 0.72;
        const x = startX + (targetX - startX) * ease;
        const y = startY + (targetY - startY) * ease;
        const alpha = (0.12 + ((index % 7) / 10)) * (0.55 + progress * 0.45);
        context.beginPath();
        context.fillStyle = index % 15 === 0 ? `rgba(198,255,0,${alpha})` : `rgba(211,219,229,${alpha * 0.65})`;
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      if (!reduced && visible) animation = window.requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced) draw();
    });
    resize();
    observer.observe(canvas);
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [isMobile, reduced]);

  return <canvas className="particle-field" ref={canvasRef} aria-hidden="true" />;
}

export function Hero() {
  const reduced = useReducedMotion();
  const { x, y } = useMouseParallax();
  const [revealed, setRevealed] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setRevealed(true);
      return;
    }
    const timer = window.setTimeout(() => setRevealed(true), 1750);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  return (
    <section className={`hero ${revealed ? 'is-revealed' : ''}`} id="home">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-halo" />
        <div className="light-streak streak-one" />
        <div className="light-streak streak-two" />
        <div className="floor-reflection" />
        <ParticleField />
      </div>
      <div className="hero-topline"><span>IN MOTION / 001</span><span>DESIGNED TO MOVE DIFFERENTLY</span></div>
      <div className="hero-shoe-wrap" style={{ transform: `translate3d(${x * 9}px, ${y * -7}px, 0) rotateX(${y * -1.5}deg) rotateY(${x * 2.5}deg)` }}>
        <div className="hero-shoe-photo-frame campaign-motion-frame">
          <img className="hero-shoe-photo" src="/images/nike-air-max-cutout.png" alt="Real Nike Air Max sneaker" />
        </div>
        <div className="shoe-aura" />
      </div>
      <div className="hero-content">
        <div className="eyebrow"><span className="status-dot" /> STRYDE / THE FIRST STEP</div>
        <h1 className="hero-title"><span>MOVE BEYOND</span><span>LIMITS<span className="period">.</span></span></h1>
        <div className="hero-bottom">
          <p>Engineered for movement.<br />Designed to stand apart.</p>
          <div className="hero-actions">
            <MagneticButton href="#experience">EXPLORE THE EXPERIENCE</MagneticButton>
            <MagneticButton href="#about" variant="outline">DISCOVER STRYDE</MagneticButton>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#experience"><span>SCROLL TO FEEL IT</span><i /></a>
      <div className="hero-coordinate">40°42’N&nbsp;&nbsp;74°00’W</div>
    </section>
  );
}
