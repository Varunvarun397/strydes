const principles = [
  { number: '01', title: 'PERFORMANCE', copy: 'Designed around movement and purpose.', icon: '↗' },
  { number: '02', title: 'DESIGN', copy: 'A distinctive silhouette with a confident identity.', icon: '◈' },
  { number: '03', title: 'EXPRESSION', copy: 'Created for people who move differently.', icon: '✳' },
];

export function BrandStory() {
  return (
    <section className="brand-story section-pad" id="about">
      <div className="story-top reveal"><div className="eyebrow"><span>05</span> / A MOVING IDEA</div><span className="story-aside">OUR POINT OF VIEW — NEVER STANDING STILL</span></div>
      <h2 className="story-title reveal">BUILT FOR THOSE<br />WHO<span><br className="story-mobile-break" />NEVER<br className="story-mobile-break" /> STAND STILL.</span></h2>
      <div className="principle-grid">
        {principles.map((item) => (
          <article className="principle-card reveal" key={item.number} tabIndex={0}>
            <div className="card-top"><span>{item.number} / 03</span><span className="card-icon" aria-hidden="true">{item.icon}</span></div>
            <div className="card-bottom"><h3>{item.title}</h3><p>{item.copy}</p><span className="card-line" /></div>
          </article>
        ))}
      </div>
    </section>
  );
}
