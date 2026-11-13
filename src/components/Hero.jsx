import { useState, useEffect } from 'react';
const SLIDES = ['/images/hero1.jpg', '/images/hero2.jpg', '/images/hero3.jpg', '/images/hero4.jpg'];
export default function Hero({ onExplore }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);
  const prev = () => setI((i + SLIDES.length - 1) % SLIDES.length);
  const next = () => setI((i + 1) % SLIDES.length);
  return (
    <header className="hero" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-in">
        <div className="hero-stage">
          {SLIDES.map((s, n) => <img key={s} src={s} alt="Queen Events celebration" className={n === i ? 'on' : ''} />)}
          <button className="arrow l" onClick={prev} aria-label="Previous slide">‹</button>
          <button className="arrow r" onClick={next} aria-label="Next slide">›</button>
          <div className="dots">{SLIDES.map((_, n) => <button key={n} className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} />)}</div>
        </div>
        <div className="hero-text">
          <p className="script">Queen Events</p>
          <h1>Celebrate every moment with us</h1>
          <button className="btn-q cta" onClick={onExplore}>Explore upcoming events <span className="ar">→</span></button>
        </div>
      </div>
    </header>
  );
}
