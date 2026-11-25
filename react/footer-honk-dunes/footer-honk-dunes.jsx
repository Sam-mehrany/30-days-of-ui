import dunes from './dunes.webp';
import './footer-honk-dunes.css';

export default function FooterHonkDunes() {
  return (
    <div className="stage">
      <img className="bg" src={dunes} alt="" />
      <footer className="card">
        <div className="top">
          <div className="brand"><div className="mark">H</div><div className="word">HONK!</div></div>
          <nav className="cols">
            <div className="col"><h4>Explore</h4><ul><li><a href="#">Our Story</a></li><li><a href="#">How It Works</a></li><li><a href="#">User Stories</a></li></ul></div>
            <div className="col"><h4>App</h4><ul><li><a href="#">Download For IOS</a></li><li><a href="#">Download For Android</a></li></ul></div>
            <div className="col"><h4>Legal Pages</h4><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms &amp; Conditions</a></li></ul></div>
          </nav>
        </div>
        <div className="divider"></div>
        <div className="bottom">
          <div className="copy">© 2026 HONK! All Rights Reserved</div>
          <div className="social">
            <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.700 2.200 15.700 2 14.600 2 12.100 2 10.500 3.500 10.500 6.200v2.300H8v3.500h2.500V22H14v-10h2.600l.4-3.500z" /></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M17.800 3h3l-6.600 7.500L22 21h-6.100l-4.800-6.200L5.600 21h-3l7-8L2.200 3h6.200l4.300 5.700zm-1 16.200h1.700L7.500 4.700H5.700z" /></svg></a>
            <a href="#" aria-label="Instagram"><svg className="st" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.500" cy="6.500" r=".8" fill="currentColor" /></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.500 9H8v11H4.500zM6.300 3.500a2 2 0 110 4 2 2 0 010-4zM10 9h3.300v1.500c.5-.9 1.700-1.800 3.400-1.800 3.500 0 4.100 2.300 4.100 5.300V20h-3.500v-5.300c0-1.300 0-2.900-1.800-2.900s-2 1.400-2 2.800V20H10z" /></svg></a>
          </div>
        </div>
      </footer>
      <img className="fg" src={dunes} alt="" />
    </div>
  );
}
