import { useRef, useState } from 'react';
import Hero from '../components/Hero.jsx';
import EventCard from '../components/EventCard.jsx';
import Contact from '../components/Contact.jsx';
import Countdown from '../components/Countdown.jsx';
import Highlights from '../components/Highlights.jsx';
const CARDS = [
  ['Wedding', '/images/cat-wedding.jpg', 'Haldi, mehendi, mandap decor and complete wedding planning.'],
  ['Birthday', '/images/cat-birthday.jpg', 'Themed parties, cakes and surprise celebrations for all ages.'],
  ['Social', '/images/cat-social.jpg', 'Meetups, reunions and networking events made effortless.'],
  ['Musical', '/images/cat-musical.jpg', 'Concerts, DJ nights and festivals with pro sound and lights.'],
];
export default function Home({ events, left, isReg, favs, onFav, onCategory, onView, onRegister, go, onSent }) {
  const ref = useRef(null);
  const [flash, setFlash] = useState(false);
  const explore = () => { ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); setFlash(true); setTimeout(() => setFlash(false), 1900); };
  const next = [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
  return (
    <>
      <Hero onExplore={explore} onAll={() => onCategory('All')} />
      <section className="band">
        <div className="cat-grid">
          {CARDS.map(([c, img, txt]) => (
            <div className="cat-card" key={c} onClick={() => onCategory(c)}>
              <img src={img} alt={c} />
              <div><h5>{c} events</h5><p>{txt}</p></div>
            </div>
          ))}
        </div>
      </section>
      <Countdown event={next[0]} onView={() => onView(next[0])} />
      <section id="upcoming" ref={ref} className={`section${flash ? ' flash' : ''}`}>
        <div className="head"><h2 className="script">Upcoming Events</h2><button className="btn-q outline" onClick={() => onCategory('All')}>View all →</button></div>
        <div className="grid">
          {next.map((e) => <EventCard key={e.id} event={e} left={left(e)} registered={isReg(e.id)} fav={favs.includes(e.id)} onFav={() => onFav(e.id)} onView={() => onView(e)} onRegister={() => onRegister(e)} />)}
        </div>
      </section>
      <Highlights />
      {/* <section className="video">
        <video src="/images/video.mp4" controls preload="metadata" />
      </section> */}
      <Contact onSent={onSent} />
    </>
  );
}
