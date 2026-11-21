import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import { product } from '../config/product';
import { useMouseParallax } from '../hooks/useMouseParallax';

const presetAngles = [0, 90, 180, 270];

export function ProductShowcase() {
  const [angle, setAngle] = useState(0);
  const [colorway, setColorway] = useState(0);
  const dragRef = useRef({ active: false, startX: 0, startAngle: 0 });
  const resumeRef = useRef<number | undefined>(undefined);
  const { x, y } = useMouseParallax();

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!dragRef.current.active) setAngle((current) => (current + 1) % 360);
    }, 45);
    return () => window.clearInterval(timer);
  }, []);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = { active: true, startX: event.clientX, startAngle: angle };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    setAngle(((dragRef.current.startAngle + (event.clientX - dragRef.current.startX) * 0.7) % 360 + 360) % 360);
  };
  const endDrag = () => {
    dragRef.current.active = false;
    window.clearTimeout(resumeRef.current);
    resumeRef.current = window.setTimeout(() => {}, 2000);
  };
  const resetView = () => setAngle(0);
  const activeColorway = product.colorways[colorway];

  return (
    <section className="showcase section-pad" id="showcase">
      <div className="section-heading reveal">
        <div className="eyebrow"><span>01</span> / THE INTRODUCTION</div>
        <h2>MEET YOUR<br /><span>NEW MOMENTUM.</span></h2>
        <p>A new perspective on every day. Presented with the Nike Air Max.</p>
      </div>
      <div className="showcase-stage">
        <div className="stage-grid" aria-hidden="true" />
        <div className="campaign-photo-scene" aria-hidden="true" style={{ transform: `translate3d(${x * 7}px, ${y * -5}px, 0)` }}>
          <img className="campaign-photo showcase-campaign-photo" src="/images/nike-air-max-cutout.png" alt="" loading="lazy" decoding="async" style={{ filter: activeColorway.filter }} />
          <span className="photo-stamp">CAMPAIGN / 001 <i>STRYDE IN MOTION</i></span>
        </div>
        <span className="stage-caption caption-left">NIKE AIR MAX<br />REAL PRODUCT IMAGE</span>
        <span className="stage-caption caption-right">ANGLE {Math.round(angle).toString().padStart(3, '0')}°<br />LIVE VIEW</span>
        <div className="showcase-glow" />
        <div
          className="showcase-product"
          style={{ transform: `perspective(1200px) rotateY(${angle}deg)`, '--shoe-accent': activeColorway.accent } as CSSProperties}
          onPointerDown={beginDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') setAngle((current) => (current - 10 + 360) % 360);
            if (event.key === 'ArrowRight') setAngle((current) => (current + 10) % 360);
            if (event.key === 'Home') resetView();
          }}
          tabIndex={0}
          role="group"
          aria-label="Drag or use arrow keys to rotate the Nike Air Max"
        >
          <img className="showcase-shoe" src="/images/nike-air-max-cutout.png" alt="Nike Air Max shoe shown in a live rotation study" draggable={false} />
        </div>
        <div className="angle-select" aria-label="Choose product view">
          {product.angles.map((label, index) => (
            <button key={label} className={Math.abs(((angle - presetAngles[index]) + 540) % 360 - 180) < 35 ? 'selected' : ''} onClick={() => setAngle(presetAngles[index])} aria-pressed={Math.abs(((angle - presetAngles[index]) + 540) % 360 - 180) < 35}>
              <span className={`angle-mark angle-${index}`} />
              {label}
            </button>
          ))}
        </div>
        <div className="viewer-controls">
          <button type="button" onClick={() => setAngle((current) => (current - 10 + 360) % 360)} aria-label="Rotate shoe left">←</button>
          <input type="range" min="0" max="360" value={Math.round(angle)} onChange={(event) => setAngle(Number(event.target.value))} aria-label="Rotation angle" />
          <button type="button" onClick={() => setAngle((current) => (current + 10) % 360)} aria-label="Rotate shoe right">→</button>
          <button type="button" className="reset-view" onClick={resetView}>RESET VIEW</button>
        </div>
        <div className="colorways" aria-label="Choose shoe colorway">
          {product.colorways.map((item, index) => (
            <button key={item.id} type="button" className={colorway === index ? 'selected' : ''} onClick={() => setColorway(index)} aria-label={item.name} aria-pressed={colorway === index}>
              <i style={{ background: item.accent }} />{item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="showcase-foot"><span>BUILT FROM THE GROUND UP</span><span>EST. FOR THE EVERYDAY EXTRAORDINARY</span></div>
    </section>
  );
}
