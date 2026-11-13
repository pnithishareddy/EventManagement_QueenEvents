import { fmtDate, fmtTime, fmtPrice, downloadICS } from '../utils.js';
export default function MyEvents({ regs, events, onCancel, go }) {
  const items = regs.map((r) => ({ r, e: events.find((x) => x.id === r.eventId) })).filter((x) => x.e);
  const total = items.reduce((s, { r, e }) => s + r.tickets * e.price, 0);
  return (
    <section className="section narrow">
      <h1 className="page-title">My Events</h1>
      {!items.length ? (
        <div className="empty"><h3>You haven’t registered for any events yet</h3><p className="muted">Events you register for will appear here.</p><button className="btn-q primary" onClick={() => go('events')}>Browse events</button></div>
      ) : (
        <>
          <p className="count">{items.length} registered event{items.length > 1 && 's'} · Total <b>{total === 0 ? 'Free' : fmtPrice(total)}</b></p>
          <div className="list">
            {items.map(({ r, e }) => (
              <div className="ticket" key={r.id}>
                <img src={e.image} alt={e.title} />
                <div className="t-info">
                  <h3>{e.title}</h3>
                  <p className="muted">📅 {fmtDate(e.date)} · {fmtTime(e.date)}</p>
                  <p className="muted">📍 {e.venue}</p>
                  <p className="muted">👤 {r.name} · {r.tickets} ticket{r.tickets > 1 && 's'} · Ref #{String(r.id).slice(-6)}</p>
                </div>
                <div className="btn-row col"><button className="btn-q outline" onClick={() => downloadICS(e)}>📅 Calendar</button><button className="btn-q danger" onClick={() => onCancel(r.id)}>Cancel</button></div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
