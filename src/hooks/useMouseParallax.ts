import { useEffect, useState } from 'react';

export function useMouseParallax() {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPoint({
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return point;
}
