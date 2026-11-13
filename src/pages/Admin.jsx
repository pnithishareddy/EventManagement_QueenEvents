import { useState } from 'react';
import { AREAS, IMAGES, ADMIN } from '../data/areas.js';
import { CATEGORIES } from '../data/events.js';
import { fmtDate, fmtPrice } from '../utils.js';
const blank = { title: '', category: 'Social', date: '', venue: '', area: 'HITEC City', price: 0, seats: 100, organizer: 'Queen Events', desc: '', img: '/images/s1.jpg' };
export default function Admin({ user, custom, regs, total, onAdminLogin, onAdd, onDelete }) {
  const [f, setF] = useState(blank);
  const [err, setErr] = useState({});
  if (user?.role !== 'admin') {
    return (
      <section className="section narrow">
        <div className="login-box">
          <img src="/images/logo.jpg" alt="Queen Events" />
          <h2>Admin login</h2>
          <p className="muted">Default admin details are saved. Just press Login.</p>
          <label className="field">Email<input value={ADMIN.email} readOnly /></label>
          <label className="field">Password<input type="password" value={ADMIN.password} readOnly /></label>
          <button className="btn-q primary block" onClick={onAdminLogin}>Login as Admin</button>
        </div>
      </section>
    );
  }
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.title.trim().length < 3) x.title = 'Enter a title';
    if (!f.date || new Date(f.date) < new Date()) x.date = 'Pick a future date and time';
    if (!f.venue.trim()) x.venue = 'Enter the venue';
    if (Number(f.price) < 0 || f.price === '') x.price = 'Price must be 0 or more';
    if (Number(f.seats) < 1) x.seats = 'At least 1 seat';
    if (f.desc.trim().length < 10) x.desc = 'Write a short description (10+ characters)';
    setErr(x);
    if (Object.keys(x).length) return;
    onAdd({ id: Date.now(), title: f.title.trim(), category: f.category, image: f.img, date: new Date(f.date).toISOString(), venue: f.venue.trim(), area: f.area, city: 'Hyderabad', price: Number(f.price), seats: Number(f.seats), booked: 0, organizer: f.organizer || 'Queen Events', desc: f.desc.trim(), includes: ['Entry pass', 'On-site event support'], custom: true });
    setF(blank);
  };
  const field = (k, l, t = 'text', extra = {}) => <label className="field">{l}<input type={t} value={f[k]} onChange={set(k)} className={err[k] ? 'bad' : ''} {...extra} />{err[k] && <em>{err[k]}</em>}</label>;
  const imgs = IMAGES[f.category] || [];
  return (
    <section className="section">
      <h1 className="page-title">Admin Dashboard</h1>
      <div className="adm-stats">
        <div><b>{total}</b><small>Total events</small></div><div><b>{custom.length}</b><small>Added by you</small></div>
        <div><b>{regs.length}</b><small>Registrations</small></div><div><b>{regs.reduce((s, r) => s + r.tickets, 0)}</b><small>Tickets booked</small></div>
      </div>
      <div className="adm-grid">
        <form className="adm-form" onSubmit={submit} noValidate>
          <h3>Add a new event</h3>
          {field('title', 'Event title')}
          <div className="two"><label className="field">Category<select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value, img: IMAGES[e.target.value][0] })}>{CATEGORIES.slice(1).map((c) => <option key={c}>{c}</option>)}</select></label>{field('date', 'Date & time', 'datetime-local')}</div>
          {field('venue', 'Venue name & address')}
          <div className="two"><label className="field">Area (for the map)<select value={f.area} onChange={set('area')}>{Object.keys(AREAS).map((a) => <option key={a}>{a}</option>)}</select></label>{field('organizer', 'Organizer')}</div>
          <div className="two">{field('price', 'Price (₹, 0 = free)', 'number', { min: 0 })}{field('seats', 'Total seats', 'number', { min: 1 })}</div>
          <label className="field">Description<textarea rows="3" value={f.desc} onChange={set('desc')} className={err.desc ? 'bad' : ''} />{err.desc && <em>{err.desc}</em>}</label>
          <div className="field">Banner image<div className="thumbs">{imgs.map((i) => <button type="button" key={i} className={f.img === i ? 'on' : ''} onClick={() => setF({ ...f, img: i })} aria-label="Choose banner"><img src={i} alt="" /></button>)}</div></div>
          <button className="btn-q primary block" type="submit">Add event</button>
        </form>
        <div className="adm-list">
          <h3>Events you added</h3>
          {!custom.length ? <p className="muted">Nothing yet. New events appear instantly on the Events page, Calendar and Map.</p>
            : custom.map((e) => (
              <div className="mini" key={e.id}><img src={e.image} alt="" /><div><b>{e.title}</b><p className="muted">{fmtDate(e.date)} · {e.area} · {fmtPrice(e.price)}</p><button className="btn-q danger" onClick={() => onDelete(e.id)}>Delete</button></div></div>
            ))}
        </div>
      </div>
    </section>
  );
}
