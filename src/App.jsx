import { useState, useEffect, useMemo } from 'react';
import { EVENTS } from './data/events.js';
import { ADMIN } from './data/areas.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import useRoute from './hooks/useRoute.js';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import EventDetails from './components/EventDetails.jsx';
import RegistrationForm from './components/RegistrationForm.jsx';
import Toast from './components/Toast.jsx';
import BackToTop from './components/BackToTop.jsx';
import ThemeSwitcher from './components/ThemeSwitcher.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import MyEvents from './pages/MyEvents.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Calendar from './pages/Calendar.jsx';
import MapPage from './pages/MapPage.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [route, go] = useRoute();
  const [regs, setRegs] = useLocalStorage('qe_regs', []);
  const [user, setUser] = useLocalStorage('qe_user', null);
  const [users, setUsers] = useLocalStorage('qe_users', []);
  const [custom, setCustom] = useLocalStorage('qe_custom', []);
  const [favs, setFavs] = useLocalStorage('qe_favs', []);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sort, setSort] = useState('date');
  const [free, setFree] = useState(false);
  const [saved, setSaved] = useState(false);
  const [details, setDetails] = useState(null);
  const [registering, setRegistering] = useState(null);
  const [toast, setToast] = useState('');

  useEffect(() => { document.title = 'Queen Events – Discover & Register'; }, []);
  const events = useMemo(() => [...EVENTS, ...custom], [custom]);

  const left = (e) => e.seats - e.booked - regs.filter((r) => r.eventId === e.id).reduce((s, r) => s + r.tickets, 0);
  const isReg = (id) => regs.some((r) => r.eventId === id);
  const showCategory = (c) => { setCat(c); setQ(''); setFree(false); setSaved(false); go('events'); };
  const search = (term) => { setQ(term); setCat('All'); go('events'); };
  const register = (data) => {
    setRegs([...regs, { ...data, id: Date.now(), eventId: registering.id }]);
    setToast(`You are registered for ${registering.title}`);
    setRegistering(null); setDetails(null);
  };
  const cancel = (id) => { setRegs(regs.filter((r) => r.id !== id)); setToast('Registration cancelled'); };
  const onFav = (id) => { const has = favs.includes(id); setFavs(has ? favs.filter((x) => x !== id) : [...favs, id]); setToast(has ? 'Removed from saved' : 'Saved to your favourites'); };

  const startSession = (u, dest) => { setUser({ name: u.name, email: u.email, role: u.role }); setToast(`Welcome, ${u.name}`); go(dest); };
  const login = (email, pw) => {
    const u = [ADMIN, ...users].find((x) => x.email === email.trim().toLowerCase() && x.password === pw);
    if (!u) return 'Incorrect email or password';
    startSession(u, u.role === 'admin' ? 'admin' : 'home');
    return null;
  };
  const signup = (d) => {
    const email = d.email.trim().toLowerCase();
    if (email === ADMIN.email || users.some((u) => u.email === email)) return 'An account with this email already exists';
    const u = { ...d, email, role: 'user' };
    setUsers([...users, u]); startSession(u, 'home');
    return null;
  };

  const shared = { events, left, isReg, favs, onFav, onView: setDetails, onRegister: setRegistering };
  let page;
  if (route === 'events') page = <Events {...shared} {...{ q, setQ, cat, setCat, sort, setSort, free, setFree, saved, setSaved }} />;
  else if (route === 'calendar') page = <Calendar {...shared} />;
  else if (route === 'map') page = <MapPage events={events} onView={setDetails} />;
  else if (route === 'my-events') page = <MyEvents regs={regs} events={events} onCancel={cancel} go={go} />;
  else if (route === 'about') page = <About go={go} />;
  else if (route === 'login') page = <Login onLogin={login} go={go} />;
  else if (route === 'signup') page = <Signup onSignup={signup} go={go} />;
  else if (route === 'admin') page = <Admin user={user} custom={custom} regs={regs} total={events.length} onAdminLogin={() => login(ADMIN.email, ADMIN.password)}
    onAdd={(e) => { setCustom([...custom, e]); setToast('Event added. It is now live on the site.'); }} onDelete={(id) => { setCustom(custom.filter((c) => c.id !== id)); setToast('Event deleted'); }} />;
  else page = <Home {...shared} onCategory={showCategory} go={go} onSent={() => setToast('Message sent. We will contact you soon.')} />;

  return (
    <>
      <Navbar route={route} go={go} count={regs.length} user={user} onLogout={() => { setUser(null); setToast('Logged out'); go('home'); }} onSearch={search} onCategory={showCategory} />
      <main>{page}</main>
      <Footer />
      {details && <EventDetails event={details} left={left(details)} registered={isReg(details.id)} onClose={() => setDetails(null)} onRegister={() => setRegistering(details)} />}
      {registering && <RegistrationForm event={registering} left={left(registering)} user={user} onClose={() => setRegistering(null)} onSubmit={register} />}
      <BackToTop />
      <ThemeSwitcher />
      <Toast message={toast} onDone={() => setToast('')} />
    </>
  );
}
