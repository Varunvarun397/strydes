export type ThemeId = 'midnight' | 'volt' | 'crimson' | 'solar' | 'arctic' | 'studio';
export type StyleId = 'cinematic' | 'street' | 'minimal';

export const themes: Record<ThemeId, {
  label: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  glow: string;
  particle: string;
}> = {
  midnight: { label: 'Midnight Cyan', accent: '#c6ff00', background: '#050507', surface: '#121216', text: '#f5f6f7', muted: '#898d95', glow: '#a9bbca', particle: '#d3dbe5' },
  volt: { label: 'Volt Green', accent: '#99ff17', background: '#050706', surface: '#111712', text: '#f4fff5', muted: '#91a094', glow: '#7dff9d', particle: '#baffc9' },
  crimson: { label: 'Crimson Red', accent: '#ff3c55', background: '#090507', surface: '#191013', text: '#fff5f6', muted: '#a08e92', glow: '#ff7890', particle: '#ffc1cb' },
  solar: { label: 'Solar Orange', accent: '#ff9d28', background: '#080604', surface: '#19130d', text: '#fffaf3', muted: '#a39789', glow: '#ffc16a', particle: '#ffe0b5' },
  arctic: { label: 'Arctic Silver', accent: '#9edcff', background: '#080a0d', surface: '#171c21', text: '#f3f8fc', muted: '#91a0aa', glow: '#d7efff', particle: '#edf7ff' },
  studio: { label: 'Studio White', accent: '#1a6cff', background: '#eceff2', surface: '#ffffff', text: '#151719', muted: '#5d646a', glow: '#a9bde0', particle: '#6f7a86' },
};

export const styles: Record<StyleId, { label: string }> = {
  cinematic: { label: 'Cinematic Dark' },
  street: { label: 'Street Bold' },
  minimal: { label: 'Minimal Studio' },
};
