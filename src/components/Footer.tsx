import { MagneticButton } from './MagneticButton';

export function Footer() {
  return (
    <footer className="footer" id="closing">
      <div className="footer-cta">
        <div className="eyebrow"><span>THE NEXT STEP</span> / YOURS TO MAKE</div>
        <h2>MAKE YOUR<br /><span>MOVE.</span></h2>
        <p>Every movement tells a story.<br />Make yours extraordinary.</p>
        <MagneticButton href="#showcase">EXPLORE THE COLLECTION</MagneticButton>
      </div>
      <div className="footer-bottom">
        <div className="footer-brand"><a className="wordmark" href="#home">STRYDE<span>®</span></a><p>MOVE BEYOND LIMITS.</p></div>
        <div className="footer-links">
          <a href="#about">ABOUT</a><a href="#experience">EXPERIENCE</a><a href="#design">DESIGN</a><a href="#contact" onClick={(event) => { event.preventDefault(); window.dispatchEvent(new Event('open-contact')); }}>CONTACT</a>
        </div>
        <div className="footer-social">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">IG ↗</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">IN ↗</a>
        </div>
        <span className="copyright">© STRYDE. MOVE WITH INTENTION.</span>
      </div>
    </footer>
  );
}
