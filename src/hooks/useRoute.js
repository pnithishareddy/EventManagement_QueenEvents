import { useState, useEffect } from 'react';
const read = () => { try { return decodeURIComponent(window.location.hash.slice(1)) || 'home'; } catch { return 'home'; } };
export default function useRoute() {
  const [route, setRoute] = useState(read);
  useEffect(() => { const h = () => setRoute(read()); window.addEventListener('hashchange', h); return () => window.removeEventListener('hashchange', h); }, []);
  const go = (r) => { setRoute(r); try { window.location.hash = r; } catch { /* ignore */ } window.scrollTo({ top: 0 }); };
  return [route, go];
}
