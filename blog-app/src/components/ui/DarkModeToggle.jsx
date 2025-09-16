import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const handleToggle = () => {
    setIsDark(prev => !prev);
  };

  return (
    <button
      className={`btn btn-sm btn-ghost ${isDark ? 'bg-base-200' : ''}`}
      aria-label="Toggle dark mode"
      onClick={handleToggle}
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
