import { CATEGORIES } from '../data/events.js';
export default function Filters({ q, setQ, cat, setCat, sort, setSort, free, setFree, saved, setSaved }) {
  return (
    <section className="filters">
      <div className="f-search">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by event, venue or category…" aria-label="Search events" />
        {q && <button onClick={() => setQ('')} aria-label="Clear search">✕</button>}
      </div>
      <div className="chips">
        {CATEGORIES.map((c) => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <div className="f-row">
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort events">
          <option value="date">Soonest first</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
        <label className="check"><input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} /> Free events only</label>
        <label className="check"><input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} /> ♥ Saved only</label>
      </div>
    </section>
  );
}
