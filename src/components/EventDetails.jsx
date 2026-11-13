import Modal from './Modal.jsx';
import { fmtDate, fmtTime, fmtPrice, downloadICS } from '../utils.js';
export default function EventDetails({ event: e, left, registered, onClose, onRegister }) {
  const pct = Math.min(100, Math.round(((e.seats - left) / e.seats) * 100));
  return (
    <Modal onClose={onClose} label={e.title}>
      <img className="det-img" src={e.image} alt={e.title} />
      <div className="pad">
        <span className="badge-inline">{e.category}</span>
        <h2>{e.title}</h2>
        <p className="muted">Organized by {e.organizer}</p>
        <div className="facts">
          <div><small>Date</small><b>{fmtDate(e.date)}</b></div>
          <div><small>Time</small><b>{fmtTime(e.date)}</b></div>
          <div><small>Venue</small><b>{e.venue}</b></div>
          <div><small>Price / ticket</small><b>{fmtPrice(e.price)}</b></div>
        </div>
        <h4>About this event</h4>
        <p className="muted">{e.desc}</p>
        <h4>What’s included</h4>
        <ul className="incl">{e.includes.map((x) => <li key={x}>✓ {x}</li>)}</ul>
        <div className="bar"><i style={{ width: pct + '%' }} /></div>
        <p className="muted">{left > 0 ? `${left} of ${e.seats} seats left` : 'Sold out'}</p>
        <button className="btn-q outline block" onClick={() => downloadICS(e)}>📅 Add to my calendar</button>
        {registered ? <button className="btn-q success block" disabled>You are registered ✓</button>
          : <button className="btn-q primary block" disabled={left <= 0} onClick={onRegister}>{left > 0 ? 'Register now' : 'Sold out'}</button>}
      </div>
    </Modal>
  );
}
