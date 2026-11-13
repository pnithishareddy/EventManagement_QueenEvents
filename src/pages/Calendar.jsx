import { useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { CAT_COLORS } from '../data/areas.js';
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export default function Calendar({ events, left, isReg, favs, onFav, onView, onRegister }) {
  const first = [...events].sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  const start = first ? new Date(first.date) : new Date();
  const [m, setM] = useState(new Date(start.getFullYear(), start.getMonth(), 1));
  const [sel, setSel] = useState(start.toDateString());
  const byDay = {};
  events.forEach((e) => { const k = new Date(e.date).toDateString(); (byDay[k] = byDay[k] || []).push(e); });
  const cells = [...Array(m.getDay()).fill(null)];
  for (let d = 1; d <= new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate(); d++) cells.push(new Date(m.getFullYear(), m.getMonth(), d));
  const shift = (n) => setM(new Date(m.getFullYear(), m.getMonth() + n, 1));
  const list = byDay[sel] || [];
  return (
    <section className="section">
      <h1 className="page-title">Events Calendar</h1>
      <div className="cal">
        <div className="cal-head">
          <button className="btn-q outline" onClick={() => shift(-1)} aria-label="Previous month">‹</button>
          <h2>{m.toLocaleString('en-IN', { month: 'long', year: 'numeric' })}</h2>
          <button className="btn-q outline" onClick={() => shift(1)} aria-label="Next month">›</button>
        </div>
        <div className="cal-grid">
          {DAYS.map((d) => <div className="dow" key={d}>{d}</div>)}
          {cells.map((d, i) => {
            if (!d) return <div key={'b' + i} className="cell blank" />;
            const k = d.toDateString(); const ev = byDay[k] || [];
            return (
              <button key={k} className={`cell ${k === sel ? 'sel' : ''} ${k === new Date().toDateString() ? 'today' : ''}`} onClick={() => setSel(k)} aria-label={`${d.getDate()}, ${ev.length} events`}>
                <span className="num">{d.getDate()}</span>
                {ev.slice(0, 2).map((e) => <i key={e.id} className="chipc" style={{ background: CAT_COLORS[e.category] }}><span>{e.title}</span></i>)}
                {ev.length > 2 && <small>+{ev.length - 2} more</small>}
              </button>
            );
          })}
        </div>
        <div className="legend">{Object.entries(CAT_COLORS).map(([c, col]) => <span key={c}><i style={{ background: col }} />{c}</span>)}</div>
      </div>
      <h3 className="sel-title">{new Date(sel).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
      {list.length ? <div className="grid">{list.map((e) => <EventCard key={e.id} event={e} left={left(e)} registered={isReg(e.id)} fav={favs.includes(e.id)} onFav={() => onFav(e.id)} onView={() => onView(e)} onRegister={() => onRegister(e)} />)}</div>
        : <p className="muted">No events on this day. Pick a highlighted date.</p>}
    </section>
  );
}
