import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setReady(true);
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    let vx = 0;
    let vy = 0;

    const move = (event: MouseEvent) => {
      vx = event.movementX;
      vy = event.movementY;
      x = event.clientX;
      y = event.clientY;
    };
    const enter = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const rotating = target.closest('.showcase-shoe');
      cursorRef.current?.classList.toggle('is-link', Boolean(target.closest('a, button')));
      cursorRef.current?.classList.toggle('is-rotating', Boolean(rotating));
    };
    const down = () => cursorRef.current?.classList.add('is-clicked');
    const up = () => cursorRef.current?.classList.remove('is-clicked');
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      const rotation = Math.max(-14, Math.min(14, vx * 1.5));
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cx}px,${cy}px,0) rotate(${rotation + vy * 0.15}deg)`;
      }
      vx *= 0.82;
      vy *= 0.82;
      frame = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    document.documentElement.classList.add('custom-cursor-active');
    loop();
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  if (!ready) return null;
  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <svg viewBox="0 0 44 28"><path d="M3 20c4-4 7-9 11-12l5 2 5 7 9 2 5 4c-6 3-13 4-21 3L5 24Z" /><path d="M3 20c8 2 18 3 29 1l6 2c-3 4-10 5-20 4L5 25Z" /><path d="M14 8l4 8m2-6 4 7" /></svg>
    </div>
  );
}
