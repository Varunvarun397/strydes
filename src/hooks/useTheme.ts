import { useEffect, useState } from 'react';
import { themes, type StyleId, type ThemeId } from '../config/themes';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeId>(() => (localStorage.getItem('stryde-theme') as ThemeId) || 'midnight');
  const [style, setStyle] = useState<StyleId>(() => (localStorage.getItem('stryde-style') as StyleId) || 'cinematic');

  useEffect(() => {
    const selected = themes[theme];
    const root = document.documentElement;
    root.style.setProperty('--accent', selected.accent);
    root.style.setProperty('--black', selected.background);
    root.style.setProperty('--charcoal', selected.surface);
    root.style.setProperty('--panel', selected.surface);
    root.style.setProperty('--silver', selected.glow);
    root.style.setProperty('--white', selected.text);
    root.style.setProperty('--muted', selected.muted);
    root.style.setProperty('--cursor-glow', selected.glow);
    root.dataset.theme = theme;
    root.dataset.style = style;
    localStorage.setItem('stryde-theme', theme);
    localStorage.setItem('stryde-style', style);
  }, [theme, style]);

  return { theme, setTheme, style, setStyle };
}
