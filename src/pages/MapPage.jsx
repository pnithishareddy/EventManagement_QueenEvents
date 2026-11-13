import { useState } from 'react';
import { AREAS, CAT_COLORS } from '../data/areas.js';
import { fmtDate, fmtTime, fmtPrice } from '../utils.js';
const W = 800, H = 520, LAT = [17.405, 17.475], LNG = [78.335, 78.495];
const pos = ([la, ln]) => [((ln - LNG[0]) / (LNG[1] - LNG[0])) * W, ((LAT[1] - la) / (LAT[1] - LAT[0])) * H];
export default function MapPage({ events, onView }) {
  const groups = {};
  events.forEach((e) => { (groups[e.area] = groups[e.area] || []).push(e); });
  const names = Object.keys(groups).filter((a) => AREAS[a]);
  const [sel, setSel] = useState(names[0]);
  const list = groups[sel] || [];
  return (
    <section className="section">
      <h1 className="page-title">Venue Map</h1>
      <div className="map-wrap">
        <div className="map-box">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Map of event venues in Hyderabad">
            <rect width={W} height={H} fill="#e8eef4" />
            <ellipse cx="640" cy="330" rx="62" ry="34" fill="#a9d3f5" /><text x="640" y="334" textAnchor="middle" fontSize="11" fill="#3d7ab5">Hussain Sagar</text>
            <g fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round"><path d="M0 250 C200 230 360 300 520 260 S740 220 800 240" /><path d="M120 0 C150 160 260 300 330 520" /><path d="M420 0 C450 150 520 260 560 520" /></g>
            <g fill="none" stroke="#fff" strokeWidth="4"><path d="M0 120 C250 100 450 150 800 90" /><path d="M0 420 C250 400 500 450 800 410" /><path d="M700 0 C690 200 720 360 700 520" /><path d="M250 0 C240 120 200 300 180 520" /></g>
            <g fill="#cfe6c8" opacity=".8"><rect x="20" y="300" width="90" height="70" rx="12" /><rect x="470" y="40" width="110" height="60" rx="12" /><rect x="560" y="430" width="120" height="60" rx="12" /></g>
            {names.map((a) => {
              const [x, y] = pos(AREAS[a]); const on = a === sel; const col = CAT_COLORS[groups[a][0].category];
              return (
                <g key={a} transform={`translate(${x},${y})`} className={`pin ${on ? 'on' : ''}`} onClick={() => setSel(a)} tabIndex="0" role="button" aria-label={`${a}, ${groups[a].length} events`} onKeyDown={(e) => e.key === 'Enter' && setSel(a)}>
                  <path d="M0,0 C-10,-14 -17,-22 -17,-30 A17,17 0 1,1 17,-30 C17,-22 10,-14 0,0 Z" fill={col} stroke="#fff" strokeWidth="3" />
                  <text y="-25" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{groups[a].length}</text>
                  <text y="18" textAnchor="middle" fontSize="12" fontWeight="700" fill="#212529" stroke="#fff" strokeWidth="3" paintOrder="stroke">{a}</text>
                </g>
              );
            })}
          </svg>
          <p className="muted map-note">Schematic map. Tap a pin to see events at that area.</p>
        </div>
        <aside className="map-side">
          <h3>{sel} <small>({list.length})</small></h3>
          {list.map((e) => (
            <div className="mini" key={e.id}>
              <img src={e.image} alt="" />
              <div>
                <b>{e.title}</b>
                <p className="muted">{fmtDate(e.date)} · {fmtTime(e.date)} · {fmtPrice(e.price)}</p>
                <p className="muted">📍 {e.venue}</p>
                <div className="btn-row">
                  <button className="btn-q outline" onClick={() => onView(e)}>Details</button>
                  <a className="btn-q primary" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.venue + ' Hyderabad')}`}>Directions</a>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
