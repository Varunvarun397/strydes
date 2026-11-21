import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation } from '../config/brand';
import { ThemeSwitcher } from './ThemeSwitcher';
import type { StyleId, ThemeId } from '../config/themes';

type Props = {
  onContact: () => void;
  theme: ThemeId;
  style: StyleId;
  setTheme: (theme: ThemeId) => void;
  setStyle: (style: StyleId) => void;
};

export function Navbar({ onContact, theme, style, setTheme, setStyle }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('#home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="wordmark" href="#home" onClick={close} aria-label="STRYDE home">STRYDE<span>®</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} className={active === item.href ? 'active' : ''} href={item.href}>{item.label}</a>
          ))}
        </nav>
        <ThemeSwitcher theme={theme} style={style} setTheme={setTheme} setStyle={setStyle} />
        <button className="nav-contact" onClick={onContact}>LET’S TALK <span>↗</span></button>
        <button className={`menu-toggle ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          <i /><i />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}>
            <nav aria-label="Mobile navigation">
              {navigation.map((item, index) => (
                <motion.a key={item.href} href={item.href} onClick={close} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.09 * index }}>{item.label}<span>0{index + 1}</span></motion.a>
              ))}
              <button onClick={() => { close(); onContact(); }}>CONTACT <span>↗</span></button>
            </nav>
            <p>MOVE BEYOND LIMITS.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
