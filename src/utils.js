export const fmtDate = (iso) => new Date(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
export const fmtTime = (iso) => new Date(iso).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' });
export const fmtPrice = (p) => (p === 0 ? 'Free' : '₹' + p.toLocaleString('en-IN'));
export const daysLeft = (iso) => { const n = Math.ceil((new Date(iso) - new Date()) / 864e5); return n <= 0 ? 'Today' : n === 1 ? 'Tomorrow' : `In ${n} days`; };
export const downloadICS = (e) => {
  const z = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(new Date(e.date).getTime() + 3 * 36e5).toISOString();
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Queen Events//EN', 'BEGIN:VEVENT', `UID:${e.id}@queenevents`, `DTSTAMP:${z(new Date().toISOString())}`,
    `DTSTART:${z(e.date)}`, `DTEND:${z(end)}`, `SUMMARY:${e.title}`, `LOCATION:${e.venue}`, `DESCRIPTION:${e.desc}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = e.title.replace(/\W+/g, '-') + '.ics';
  document.body.appendChild(a); a.click(); a.remove();
};
