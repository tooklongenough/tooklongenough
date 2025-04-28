'use client';

import { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.css';

const themes = [
  { value: 'theme-neon', label: 'Neon' },
  { value: 'theme-electric', label: 'Electric Blue' },
  { value: 'theme-classical', label: 'Tasteful Classical' },
  { value: 'theme-vapourwave', label: 'Vapourwave' },
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState('theme-neon');

  useEffect(() => {
    const savedTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1];
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    } else {
      document.body.className = 'theme-neon';
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.body.className = selectedTheme;
    document.cookie = `theme=${selectedTheme}; path=/; max-age=${60 * 60 * 24 * 30}`;
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="theme-select" className={styles.label}>
        Choose Theme:
      </label>
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className={styles.select}
      >
        {themes.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
