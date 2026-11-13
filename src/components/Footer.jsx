const LINKS = [['in', 'LinkedIn', 'https://www.linkedin.com/'], ['t', 'Twitter', 'https://twitter.com/'], ['ig', 'Instagram', 'https://www.instagram.com/'], ['f', 'Facebook', 'https://www.facebook.com/']];
export default function Footer() {
  return (
    <footer className="footer-q">
      <h2 className="script">Follow Us</h2>
      <div className="social">
        {LINKS.map(([l, n, u]) => <a key={n} href={u} target="_blank" rel="noreferrer" aria-label={n}>{l}</a>)}
      </div>
      <p className="copy">Copyright © 2026 Queen Events. All rights reserved.</p>
    </footer>
  );
}
