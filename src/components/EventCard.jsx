import { fmtDate, fmtTime, fmtPrice, daysLeft } from '../utils.js';
export default function EventCard({ event: e, left, registered, fav, onFav, onView, onRegister }) {
  const d = new Date(e.date);
  return (
    <article className="ev-card">
      <div className="ev-img" onClick={onView}>
        <img src={e.image} alt={e.title} loading="lazy" />
        <span className="badge-cat">{e.category}</span>
        <button className={`heart ${fav ? 'on' : ''}`} onClick={(ev) => { ev.stopPropagation(); onFav(); }} aria-label={fav ? 'Remove from saved' : 'Save event'} aria-pressed={!!fav}>{fav ? '♥' : '♡'}</button>
        <span className="badge-date"><b>{d.getDate()}</b>{d.toLocaleString('en-IN', { month: 'short' })}</span>
      </div>
      <div className="ev-body">
        <h3 onClick={onView}>{e.title}</h3>
        <p className="muted">📅 {fmtDate(e.date)} · {fmtTime(e.date)} <em>({daysLeft(e.date)})</em></p>
        <p className="muted">📍 {e.venue}</p>
        <div className="ev-foot">
          <div><span className="price">{fmtPrice(e.price)}</span>{left > 0 && left <= 20 && <small className="warn"> Only {left} left</small>}</div>
          <div className="btn-row">
            <button className="btn-q outline" onClick={onView}>Details</button>
            {registered ? <button className="btn-q success" disabled>Registered ✓</button>
              : left <= 0 ? <button className="btn-q primary" disabled>Sold out</button>
              : <button className="btn-q primary" onClick={onRegister}>Register</button>}
          </div>
        </div>
      </div>
    </article>
  );
}
