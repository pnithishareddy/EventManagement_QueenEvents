import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
const THEMES = [['classic', 'Classic Blue', 'linear-gradient(135deg,#0d6efd 50%,#ffc107 50%)'], ['royal', 'Royal Purple', 'linear-gradient(135deg,#6f42c1 50%,#f7b32b 50%)'], ['emerald', 'Emerald', 'linear-gradient(135deg,#0f9d8a 50%,#ffb703 50%)'], ['sunset', 'Sunset', 'linear-gradient(135deg,#e8590c 50%,#ffd43b 50%)'], ['rose', 'Rose', 'linear-gradient(135deg,#d6336c 50%,#ffc107 50%)']];
export default function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage('qe_theme', 'classic');
  const [open, setOpen] = useState(false);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return (
    <div className="themes">
      {open && <div className="theme-panel"><b>Colour theme</b>{THEMES.map(([k, n, g]) => <button key={k} className={theme === k ? 'on' : ''} onClick={() => { setTheme(k); setOpen(false); }}><i style={{ background: g }} />{n}</button>)}</div>}
      <button onClick={() => setOpen(!open)} aria-label="Change colour theme" aria-expanded={open}>🎨</button>
    </div>
  );
}
