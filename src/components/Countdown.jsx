import { useState, useEffect } from 'react';
import { fmtDate, fmtTime } from '../utils.js';
export default function Countdown({ event: e, onView }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  if (!e) return null;
  const s = Math.max(0, Math.floor((new Date(e.date) - now) / 1000));
  const parts = [['Days', Math.floor(s / 86400)], ['Hours', Math.floor(s / 3600) % 24], ['Minutes', Math.floor(s / 60) % 60], ['Seconds', s % 60]];
  return (
    <section className="countdown" style={{ backgroundImage: `linear-gradient(90deg,rgba(15,15,25,.92),rgba(15,15,25,.7)),url(${e.image})` }}>
      <div className="cd-in">
        <div>
          <span className="cd-tag">⏰ Next big event</span>
          <h2>{e.title}</h2>
          <p>{fmtDate(e.date)} · {fmtTime(e.date)} · {e.venue}</p>
          <button className="btn-q cta" onClick={onView}>View details <span className="ar">→</span></button>
        </div>
        <div className="cd-boxes">{parts.map(([l, v]) => <div key={l}><b>{String(v).padStart(2, '0')}</b><small>{l}</small></div>)}</div>
      </div>
    </section>
  );
}
