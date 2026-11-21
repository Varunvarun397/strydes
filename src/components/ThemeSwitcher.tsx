import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { styles, themes, type StyleId, type ThemeId } from '../config/themes';

type Props = {
  theme: ThemeId;
  style: StyleId;
  setTheme: (theme: ThemeId) => void;
  setStyle: (style: StyleId) => void;
};

export function ThemeSwitcher({ theme, style, setTheme, setStyle }: Props) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);

  return (
    <div className="theme-switcher" ref={panelRef}>
      <button className="theme-trigger" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-haspopup="dialog">
        THEME <span style={{ background: themes[theme].accent }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="theme-panel" role="dialog" aria-label="Appearance settings" initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ duration: 0.22 }}>
            <div className="theme-group">
              <span className="theme-label">COLOR</span>
              <div className="theme-options">
                {(Object.keys(themes) as ThemeId[]).map((id) => (
                  <button key={id} type="button" className={theme === id ? 'selected' : ''} onClick={() => setTheme(id)} aria-pressed={theme === id}>
                    <i style={{ background: themes[id].accent }} />{themes[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="theme-group">
              <span className="theme-label">STYLE</span>
              <div className="theme-options style-options">
                {(Object.keys(styles) as StyleId[]).map((id) => (
                  <button key={id} type="button" className={style === id ? 'selected' : ''} onClick={() => setStyle(id)} aria-pressed={style === id}>{styles[id].label}</button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
