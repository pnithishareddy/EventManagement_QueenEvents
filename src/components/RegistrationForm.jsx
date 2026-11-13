import { useState } from 'react';
import Modal from './Modal.jsx';
import { fmtPrice, fmtDate } from '../utils.js';
export default function RegistrationForm({ event: e, left, user, onClose, onSubmit }) {
  const [f, setF] = useState({ name: user?.name || '', email: user?.email || '', phone: '', tickets: 1, note: '' });
  const [err, setErr] = useState({});
  const set = (k) => (ev) => setF({ ...f, [k]: ev.target.value });
  const submit = (ev) => {
    ev.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Please enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email address';
    if (!/^[+\d][\d\s-]{7,}$/.test(f.phone)) x.phone = 'Enter a valid phone number';
    setErr(x);
    if (!Object.keys(x).length) onSubmit({ ...f, name: f.name.trim(), tickets: Number(f.tickets) });
  };
  const fields = [['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone Number', 'tel']];
  return (
    <Modal onClose={onClose} label="Register">
      <form className="pad" onSubmit={submit} noValidate>
        <h2>Register for event</h2>
        <p className="muted">{e.title} · {fmtDate(e.date)}</p>
        {fields.map(([k, label, type]) => (
          <label className="field" key={k}>{label} <span className="req">*</span>
            <input type={type} value={f[k]} onChange={set(k)} className={err[k] ? 'bad' : ''} />
            {err[k] && <em>{err[k]}</em>}
          </label>
        ))}
        <label className="field">Number of tickets
          <select value={f.tickets} onChange={set('tickets')}>{Array.from({ length: Math.max(1, Math.min(6, left)) }, (_, i) => <option key={i + 1}>{i + 1}</option>)}</select>
        </label>
        <label className="field">Special requests (optional)
          <textarea rows="2" value={f.note} onChange={set('note')} />
        </label>
        <div className="total"><span>Total</span><b>{e.price === 0 ? 'Free' : fmtPrice(e.price * f.tickets)}</b></div>
        <button className="btn-q primary block" type="submit">Confirm registration</button>
      </form>
    </Modal>
  );
}
