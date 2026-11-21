import type { CSSProperties } from 'react';

export function WaterScene() {
  return (
    <section className="water-experience" id="water">
      <div className="water-drops" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} style={{ '--drop': index, left: `${(index * 37) % 100}%`, top: `${12 + (index * 6.3) % 55}%` } as CSSProperties} />
        ))}
      </div>
      <div className="water-copy reveal">
        <div className="eyebrow"><span>05</span> / THROUGH ANY CONDITION</div>
        <h2>FORWARD.<br /><span>NO MATTER WHAT.</span></h2>
      </div>
      <div className="water-shoe reveal" role="img" aria-label="Real STRYDE sneaker study reflected in motion">
        <img src="/images/nike-air-max-cutout.png" alt="Nike Air Max for the cinematic water experience" loading="lazy" />
        <span className="water-splash" />
      </div>
      <div className="water-caption">A STUDY IN LIGHT / WATER / MOVEMENT</div>
    </section>
  );
}

export function MacroShowcase() {
  return (
    <section className="macro-showcase section-pad" id="macro">
      <div className="macro-heading reveal">
        <div className="eyebrow"><span>06</span> / EXTREME MACRO</div>
        <h2>THE DETAILS<br /><span>MAKE THE DIFFERENCE.</span></h2>
      </div>
      <div className="macro-grid">
        <article className="macro-card macro-main reveal"><img src="/images/nike-air-max-97.jpg" alt="Close-up crop of the Nike Air Max 97 upper" loading="lazy" /><span>UPPER / MATERIAL</span></article>
        <article className="macro-card macro-detail-a reveal"><img src="/images/nike-air-max-97.jpg" alt="Close-up crop of the Nike Air Max 97 panel structure" loading="lazy" /><span>STITCH / STRUCTURE</span></article>
        <article className="macro-card macro-detail-b reveal"><img src="/images/nike-air-max-97.jpg" alt="Close-up crop of the Nike Air Max 97 sole" loading="lazy" /><span>SOLE / FOUNDATION</span></article>
      </div>
    </section>
  );
}
