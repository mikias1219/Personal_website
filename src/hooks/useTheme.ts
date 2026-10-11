import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const apply = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

/** Theme state. The initial value is set before first paint by the inline script in index.html. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme) || 'dark'
  );

  // Follow the OS setting until the visitor makes an explicit choice
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (readStored()) return;
      const next: Theme = e.matches ? 'dark' : 'light';
      apply(next);
      setThemeState(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  // Keep every useTheme() instance in sync
  useEffect(() => {
    const onThemeEvent = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail);
    window.addEventListener('themechange', onThemeEvent);
    return () => window.removeEventListener('themechange', onThemeEvent);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
    window.dispatchEvent(new CustomEvent<Theme>('themechange', { detail: next }));
  }, []);

  const toggleTheme = useCallback(() => setTheme(theme === 'dark' ? 'light' : 'dark'), [theme, setTheme]);

  return { theme, setTheme, toggleTheme };
}
