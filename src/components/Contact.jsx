import { useState } from 'react';
export default function Contact({ onSent }) {
  const [f, setF] = useState({ fullname: '', email: '', phone: '', subject: '', message: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!f.fullname.trim()) x.fullname = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Valid email required';
    if (!f.subject.trim()) x.subject = 'Required';
    if (!f.message.trim()) x.message = 'Required';
    setErr(x);
    if (!Object.keys(x).length) { setF({ fullname: '', email: '', phone: '', subject: '', message: '' }); onSent(); }
  };
  const inp = (k, label, req, type = 'text') => (
    <label className="field">{label} {req && <span className="req">*</span>}
      <input type={type} value={f[k]} onChange={set(k)} className={err[k] ? 'bad' : ''} />{err[k] && <em>{err[k]}</em>}
    </label>
  );
  return (
    <section className="contact">
      <div className="contact-in">
        <div>
          <h3 className="script">Contact</h3>
          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="two">{inp('fullname', 'Full Name', true)}{inp('email', 'Email', true, 'email')}</div>
            {inp('phone', 'Phone Number', false, 'tel')}
            {inp('subject', 'Subject', true)}
            <label className="field">Message <span className="req">*</span>
              <textarea rows="3" value={f.message} onChange={set('message')} className={err.message ? 'bad' : ''} />{err.message && <em>{err.message}</em>}
            </label>
            <button className="btn-q primary lg" type="submit">Send Message</button>
          </form>
        </div>
        <div className="info">
          <h4>Office</h4><address>4th floor, MT, HiTech city, Hyderabad</address>
          <h4>Phone &amp; Email</h4>
          <a href="tel:+919988776655">9988776655</a><br /><a href="mailto:demo@queenevents.com">demo@queenevents.com</a>
          <h4>Opening Hours</h4><p>Mon - Fri : 9AM - 5PM</p><p>Sat - Sun : 9AM - 2PM</p>
        </div>
      </div>
    </section>
  );
}
