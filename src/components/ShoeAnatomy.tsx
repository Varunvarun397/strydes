import { useState } from 'react';
import { product } from '../config/product';

export function ShoeAnatomy() {
  const [exploded, setExploded] = useState(false);
  return (
    <section className="anatomy section-pad" id="anatomy">
      <div className="anatomy-intro reveal">
        <div className="eyebrow"><span>03</span> / INSIDE THE FORM</div>
        <h2>EVERY LAYER.<br /><span>EVERY INTENTION.</span></h2>
        <p>Nothing is here by accident. Take a closer look at the pieces that make the whole.</p>
        <button className="text-button" onClick={() => setExploded(!exploded)} aria-pressed={exploded}>
          {exploded ? 'REASSEMBLE' : 'EXPLORE THE DESIGN'} <span>{exploded ? '−' : '+'}</span>
        </button>
      </div>
      <div className={`anatomy-visual ${exploded ? 'is-exploded' : ''}`}>
        <div className="anatomy-halo" />
        <div className="anatomy-product">
          <img className="anatomy-shoe" src="/images/nike-air-max-cutout.png" alt="Nike Air Max sneaker anatomy study" loading="lazy" />
        </div>
        <div className="anatomy-labels">
          {product.layers.map((layer, index) => (
            <div className={`anatomy-label label-${index + 1}`} key={layer.id} style={{ transitionDelay: exploded ? `${index * 80}ms` : '0ms' }}>
              <span className="connector" />
              <span className="label-index">0{index + 1}</span>
              <div><strong>{layer.title}</strong><p>{layer.copy}</p></div>
            </div>
          ))}
        </div>
        <span className="anatomy-note">A STUDY IN PURPOSE / FORM 001</span>
      </div>
      <div className="anatomy-mobile-list">
        {product.layers.map((layer, index) => <p key={layer.id}><b>0{index + 1} / {layer.title}</b><span>{layer.copy}</span></p>)}
      </div>
    </section>
  );
}
