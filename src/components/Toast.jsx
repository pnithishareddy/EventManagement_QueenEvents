import { useEffect } from 'react';
export default function Toast({ message, onDone }) {
  useEffect(() => { if (!message) return; const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [message]);
  if (!message) return null;
  return <div className="toast-msg" role="status">✓ {message}</div>;
}
