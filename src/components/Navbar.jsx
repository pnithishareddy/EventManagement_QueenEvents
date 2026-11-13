import { useState } from 'react';
import { CATEGORIES } from '../data/events.js';
export default function Navbar({ route, go, count, user, onLogout, onSearch, onCategory }) {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const [term, setTerm] = useState('');
  const nav = (r) => { go(r); setOpen(false); setDd(false); };
  const submit = (e) => { e.preventDefault(); onSearch(term.trim()); setOpen(false); };
  const act = (r) => (route === r ? 'active' : '');
  return (
    <nav className="navbar-q">
      <div className="nav-wrap">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); nav('home'); }}><img src="/images/logo.jpg" alt="Queen Events" /></a>
        <button className="toggler" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}><span /><span /><span /></button>
        <div className={`nav-collapse ${open ? 'show' : ''}`}>
          <ul className="nav-list">
            <li><button className={act('home')} onClick={() => nav('home')}>Home</button></li>
            <li className="dropdown" onMouseLeave={() => setDd(false)}>
              <button className={['events', 'calendar', 'map'].includes(route) ? 'active' : ''} onClick={() => setDd(!dd)} aria-expanded={dd}>Events ▾</button>
              {dd && <ul className="dropdown-list">
                {CATEGORIES.map((c) => <li key={c}><button onClick={() => { onCategory(c); setOpen(false); setDd(false); }}>{c === 'All' ? 'All Events' : c}</button></li>)}
                <li className="sep" />
                <li><button onClick={() => nav('calendar')}>📅 Calendar view</button></li>
                <li><button onClick={() => nav('map')}>📍 Venue map</button></li>
              </ul>}
            </li>
            <li><button className={act('about')} onClick={() => nav('about')}>About Us</button></li>
            <li><button className={act('my-events')} onClick={() => nav('my-events')}>My Events{count > 0 && <b className="count-pill">{count}</b>}</button></li>
            {user?.role === 'admin' && <li><button className={act('admin')} onClick={() => nav('admin')}>⚙ Admin</button></li>}
            {user ? <li><button onClick={() => { onLogout(); setOpen(false); }}>Hi, {user.name.split(' ')[0]} · Logout</button></li>
              : <>
                <li><button className={act('login')} onClick={() => nav('login')}>Login</button></li>
                <li><button className="signup-btn" onClick={() => nav('signup')}>Sign up</button></li>
              </>}
          </ul>
          <form className="search-form" role="search" onSubmit={submit}>
            <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="Search events" aria-label="Search" />
            <button className="btn-q success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
