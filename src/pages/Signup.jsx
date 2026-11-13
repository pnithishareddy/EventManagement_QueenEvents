import { useState } from 'react';
export default function Signup({ onSignup, go }) {
  const [f, setF] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const strength = [/.{8,}/, /[A-Z]/, /\d/, /[^\w\s]/].filter((r) => r.test(f.password)).length;
  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) x.email = 'Enter a valid email';
    if (f.password.length < 6) x.password = 'At least 6 characters';
    if (f.confirm !== f.password) x.confirm = 'Passwords do not match';
    if (!Object.keys(x).length) { const m = onSignup({ name: f.name.trim(), email: f.email, password: f.password }); if (m) x.email = m; }
    setErr(x);
  };
  const row = (k, l, t) => <label className="field" key={k}>{l}<input type={t} value={f[k]} onChange={set(k)} className={err[k] ? 'bad' : ''} />{err[k] && <em>{err[k]}</em>}</label>;
  return (
    <section className="section narrow">
      <form className="login-box" onSubmit={submit} noValidate>
        <img src="/images/logo.jpg" alt="Queen Events" />
        <h2>Create your account</h2>
        <p className="muted">Join to register, save events and track your tickets.</p>
        {row('name', 'Full Name', 'text')}{row('email', 'Email', 'email')}{row('password', 'Password', 'password')}
        {f.password && <div className="strength" data-s={strength}><i /><i /><i /><i /></div>}
        {row('confirm', 'Confirm Password', 'password')}
        <button className="btn-q primary block" type="submit">Sign up</button>
        <p className="swap">Already registered? <a href="#login" onClick={(e) => { e.preventDefault(); go('login'); }}>Login</a></p>
      </form>
    </section>
  );
}
