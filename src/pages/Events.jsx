import { useMemo } from 'react';
import Filters from '../components/Filters.jsx';
import EventCard from '../components/EventCard.jsx';
export default function Events({ events, left, isReg, q, setQ, cat, setCat, sort, setSort, free, setFree, saved, setSaved, favs, onFav, onView, onRegister }) {
  const shown = useMemo(() => {
    const s = q.trim().toLowerCase();
    return events
      .filter((e) => (cat === 'All' || e.category === cat) && (!free || e.price === 0) && (!saved || favs.includes(e.id))
        && (!s || [e.title, e.venue, e.category, e.city].some((t) => t.toLowerCase().includes(s))))
      .sort((a, b) => sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : new Date(a.date) - new Date(b.date));
  }, [events, q, cat, sort, free, saved, favs]);
  return (
    <section className="section">
      <h1 className="page-title">Upcoming Events</h1>
      <Filters {...{ q, setQ, cat, setCat, sort, setSort, free, setFree, saved, setSaved }} />
      <p className="count">{shown.length} event{shown.length !== 1 && 's'} found</p>
      {shown.length ? (
        <div className="grid">{shown.map((e) => <EventCard key={e.id} event={e} left={left(e)} registered={isReg(e.id)} fav={favs.includes(e.id)} onFav={() => onFav(e.id)} onView={() => onView(e)} onRegister={() => onRegister(e)} />)}</div>
      ) : (
        <div className="empty"><h3>No events match your search</h3><button className="btn-q primary" onClick={() => { setQ(''); setCat('All'); setFree(false); setSaved(false); }}>Reset filters</button></div>
      )}
    </section>
  );
}
