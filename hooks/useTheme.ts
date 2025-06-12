import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'auto');

  useEffect(() => {
    const root = window.document.documentElement;
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const applyTheme = () => {
      if (theme === 'dark' || (theme === 'auto' && systemIsDark)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    const systemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        e.matches ? root.classList.add('dark') : root.classList.remove('dark');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', systemThemeChange);
    return () => mediaQuery.removeEventListener('change', systemThemeChange);
  }, [theme]);

  return [theme, setTheme] as const;
}
