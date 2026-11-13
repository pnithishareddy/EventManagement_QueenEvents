import { useState } from 'react';
export default function Login({ onLogin, go }) {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setErr(''); };
  const submit = (e) => { e.preventDefault(); if (!f.email || !f.password) return setErr('Enter your email and password'); const m = onLogin(f.email, f.password); if (m) setErr(m); };
  return (
    <section className="section narrow">
      <form className="login-box" onSubmit={submit} noValidate>
        <img src="/images/logo.jpg" alt="Queen Events" />
        <h2>Welcome back</h2>
        <p className="muted">Login to manage your registrations.</p>
        <label className="field">Email<input type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
        <label className="field">Password<input type="password" value={f.password} onChange={set('password')} autoComplete="current-password" /></label>
        {err && <p className="form-err" role="alert">{err}</p>}
        <button className="btn-q primary block" type="submit">Login</button>
        <p className="swap">New here? <a href="#signup" onClick={(e) => { e.preventDefault(); go('signup'); }}>Create an account</a></p>
        <p className="swap"><a href="#admin" onClick={(e) => { e.preventDefault(); go('admin'); }}>Admin login →</a></p>
      </form>
    </section>
  );
}
