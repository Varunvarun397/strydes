import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { brand } from './config/brand';
import { product } from './config/product';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { ShoeAnatomy } from './components/ShoeAnatomy';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { WaterScene, MacroShowcase } from './components/CinematicScenes';
import { useTheme } from './hooks/useTheme';

function ContactModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title" initial={{ y: 30, opacity: 0, scale: 0.97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.35 }}>
        <button className="modal-close" onClick={onClose} aria-label="Close contact form">×</button>
        {!submitted ? (
          <>
            <div className="eyebrow"><span>MAKE THE FIRST MOVE</span></div>
            <h2 id="contact-title">LET’S<br /><span>CONNECT.</span></h2>
            <p>Have a story to share? We’re listening.</p>
            <form onSubmit={submit}>
              <label>NAME<input name="name" autoComplete="name" required placeholder="Your name" /></label>
              <label>EMAIL<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
              <label>MESSAGE<textarea name="message" rows={3} required placeholder="Tell us what’s on your mind" /></label>
              <button className="button button-solid" type="submit"><span>SEND YOUR NOTE</span><span className="button-arrow">↗</span></button>
            </form>
          </>
        ) : (
          <div className="thank-you"><span className="status-dot" /><div className="eyebrow">MESSAGE RECEIVED</div><h2>THANK<br /><span>YOU.</span></h2><p>Your note is right where it should be. Keep moving.</p><button className="text-button" onClick={onClose}>BACK TO STRYDE <span>↗</span></button></div>
        )}
      </motion.div>
    </motion.div>
  );
}

function MovementSection() {
  return (
    <section className="movement section-pad" id="technology">
      <div className="movement-head reveal">
        <div className="eyebrow"><span>04</span> / ENGINEERED FOR MOVEMENT</div>
        <h2>MADE TO<br /><span>KEEP UP.</span></h2>
        <p>Thoughtful construction. A feeling you notice in every step.</p>
      </div>
      <div className="movement-list">
        {product.features.map((feature) => (
          <article className="movement-row reveal" key={feature.number}>
            <span className="movement-num">{feature.number}</span>
            <h3>{feature.title}</h3>
            <p>{feature.copy}</p>
            <span className="movement-plus" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  const reduced = useReducedMotion();
  return (
    <section className="experience" id="experience">
      <div className="experience-art" aria-hidden="true">
        <div className="experience-photo-scene"><img className="campaign-photo experience-campaign-photo" src="/images/nike-air-max-cutout.png" alt="" loading="lazy" decoding="async" /></div>
        <div className="experience-orbit orbit-a" /><div className="experience-orbit orbit-b" />
        <div className="experience-streak" />                        <div className="experience-silhouette"><img className="experience-shoe" src="/images/nike-air-max-cutout.png" alt="Nike Air Max photographed on display" loading="lazy" /></div>
        <div className="experience-grain" />
      </div>
      <div className={`experience-copy ${reduced ? 'is-static' : ''}`}>
        <div className="eyebrow"><span>02</span> / THE STRYDE EXPERIENCE</div>
        <h2>NOT JUST A SHOE.<br /><span>A DIFFERENT WAY<br />TO MOVE.</span></h2>
        <p>There’s a moment when you stop thinking about the next step — and just take it. STRYDE is made for that feeling.</p>
        <a href="#design" className="experience-link">FIND YOUR FLOW <span>↘</span></a>
      </div>
      <span className="experience-index">STRYDE / MOVE STUDY 001</span>
    </section>
  );
}

function DesignSection() {
  return (
    <section className="design section-pad" id="design">
      <div className="design-intro reveal">
        <div className="eyebrow"><span>02</span> / THE DESIGN</div>
        <h2>FORM FOLLOWS<br /><span>FEELING.</span></h2>
        <p>Every angle has a reason. Every detail has a role.</p>
      </div>
      <div className="design-grid">
        {product.details.map((detail, index) => (
          <article className={`design-card design-card-${index + 1} reveal`} key={detail.number}>
            <div className="detail-visual">
              <div className={`detail-shape shape-${index + 1}`} />
              <div className="detail-scanline" />
              <span className="detail-coord">STRYDE / FORM 0{index + 1}</span>
              <span className="detail-index">{detail.number}</span>
            </div>
            <div className="detail-copy"><h3>{detail.title}</h3><p>{detail.copy}</p><span className="detail-arrow">↗</span></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalReveal() {
  return (
    <section className="final-reveal" id="reveal">
      <div className="final-light" />
      <div className="final-shoe-wrap"><img className="final-shoe" src="/images/nike-air-max-cutout.png" alt="Nike Air Max in the final STRYDE campaign reveal" loading="lazy" /></div>
      <div className="final-content">
        <div className="eyebrow"><span>NOTHING STANDS STILL</span> / KEEP GOING</div>
        <h2>THE NEXT STEP<br /><span>STARTS HERE.</span></h2>
        <a href="#closing" className="text-button">DISCOVER STRYDE <span>↘</span></a>
      </div>
      <div className="final-mark">S / 01</div>
    </section>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const reduced = useReducedMotion();
  const themeState = useTheme();

  useEffect(() => {
    const open = () => setContactOpen(true);
    window.addEventListener('open-contact', open);
    return () => window.removeEventListener('open-contact', open);
  }, []);

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.add('reduced-motion');
      return () => document.documentElement.classList.remove('reduced-motion');
    }
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const scrollToAnchor = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      event.preventDefault();
      window.history.pushState(null, '', href);
      lenis.scrollTo(target, { offset: -70 });
    };
    document.addEventListener('click', scrollToAnchor);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(element, { y: 38, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: brand.motion.duration,
          ease: brand.motion.ease,
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
      gsap.fromTo('.final-shoe-wrap', { scale: 0.82, y: 70 }, {
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.final-reveal', start: 'top bottom', end: 'center center', scrub: 1 },
      });
      gsap.utils.toArray<HTMLElement>('.campaign-motion-frame, .campaign-photo').forEach((image) => {
        const section = image.closest('section');
        if (!section) return;
        gsap.fromTo(image, { scale: 1.14, yPercent: -4 }, {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
    });
    ScrollTrigger.refresh();
    return () => {
      context.revert();
      gsap.ticker.remove(tick);
      document.removeEventListener('click', scrollToAnchor);
      lenis.destroy();
    };
  }, [reduced]);

  return (
    <>
      <CustomCursor />
      <Navbar onContact={() => setContactOpen(true)} {...themeState} />
      <main>
        <Hero />
        <ProductShowcase />
        <ExperienceSection />
        <DesignSection />
        <ShoeAnatomy />
        <MovementSection />
        <WaterScene />
        <MacroShowcase />
        <BrandStory />
        <FinalReveal />
      </main>
      <Footer />
      <AnimatePresence>{contactOpen && <ContactModal key="contact" onClose={() => setContactOpen(false)} />}</AnimatePresence>
    </>
  );
}
