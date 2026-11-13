import { useState, useEffect } from 'react';
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 500); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  if (!show) return null;
  return <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>;
}
