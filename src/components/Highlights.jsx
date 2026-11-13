import { useState, useEffect } from 'react';
const STATS = [[500, '+', 'Events organised'], [12000, '+', 'Happy guests'], [10, '+', 'Years of experience'], [49, '', 'Average rating (out of 5)']];
const REVIEWS = [
  ['Ananya R.', 'Birthday', 'Queen Events planned my daughter’s birthday perfectly. The decor was stunning and we did not lift a finger.'],
  ['Rahul & Sneha', 'Wedding', 'From haldi to the mandap, every detail was handled. Our guests are still talking about the setup.'],
  ['Kiran M.', 'Musical', 'Registering took seconds and the concert was brilliantly run. Easily the smoothest booking I have done.'],
];
function Count({ to, suffix }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, t0;
    const step = (t) => { t0 = t0 || t; const p = Math.min(1, (t - t0) / 1400); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <b>{to === 49 ? (v / 10).toFixed(1) : v.toLocaleString('en-IN')}{suffix}</b>;
}
export default function Highlights() {
  return (
    <>
      <section className="stats">{STATS.map(([n, s, l]) => <div key={l}><Count to={n} suffix={s} /><small>{l}</small></div>)}</section>
      <section className="section">
        <h2 className="script center">What our guests say</h2>
        <div className="reviews">
          {REVIEWS.map(([n, t, q]) => <figure key={n}><div className="stars">★★★★★</div><blockquote>“{q}”</blockquote><figcaption><b>{n}</b> · {t}</figcaption></figure>)}
        </div>
      </section>
    </>
  );
}
