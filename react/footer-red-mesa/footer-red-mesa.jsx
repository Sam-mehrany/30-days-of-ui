import scene from './scene.webp';
import './footer-red-mesa.css';

export default function FooterRedMesa() {
  return (
    <div className="stage">
      <img className="scene" src={scene} alt="" aria-hidden="true" />

      <div className="shade-l"></div>
      <div className="shade-r"></div>
      <div className="shade-b"></div>

      <div className="brand">
        <div className="logo"><span className="n">24</span><span className="w">TWENIFOR</span></div>
        <p className="tag">Reduce waste with us, practice a construction sustainable environment</p>
        <div className="contact">Contact Us:</div>
        <div className="social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 16 16"><path d="M9.2 15V8.8h2.1l.3-2.4H9.2V4.9c0-.7.2-1.1 1.2-1.1h1.3V1.6C11.5 1.6 10.700 1.500 9.900 1.500 8.100 1.500 6.900 2.600 6.900 4.600v1.800H4.800v2.400h2.100V15z" /></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 16 16"><rect className="s" x="2" y="2" width="12" height="12" rx="3.5" /><circle className="s" cx="8" cy="8" r="2.8" /><circle cx="11.6" cy="4.4" r=".9" /></svg></a>
          <a href="#" aria-label="X"><svg viewBox="0 0 16 16"><path className="s" d="M2.500 2.500 13.500 13.500M13.500 2.500 2.500 13.500" /></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 16 16"><rect x="2.200" y="6" width="2.600" height="7.800" /><circle cx="3.500" cy="3.400" r="1.500" /><path d="M6.600 6h2.500v1.100c.4-.7 1.300-1.300 2.500-1.300 2.200 0 2.800 1.400 2.800 3.400v4.600h-2.600V9.800c0-1-.2-1.700-1.200-1.700s-1.400.8-1.400 1.700v4H6.600z" /></svg></a>
        </div>
      </div>

      <nav className="cols" aria-label="Footer">
        <div className="col"><h4>Twenifor</h4><ul>
          <li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Buyer</a></li><li><a href="#">Seller</a></li>
          <li><a href="#">Marketplace</a></li><li><a href="#">Terms of Use</a></li><li><a href="#">Privacy Policy</a></li></ul></div>
        <div className="col"><h4>Marketplace</h4><ul>
          <li><a href="#">Materials</a></li><li><a href="#">Machinery &amp; Equipment</a></li><li><a href="#">Tools</a></li>
          <li><a href="#">Systems for concrete</a></li><li><a href="#">Appliances</a></li><li><a href="#">Safety Materials</a></li><li><a href="#">View All</a></li></ul></div>
        <div className="col"><h4>Resources</h4><ul>
          <li><a href="#">Support</a></li><li><a href="#">Blog</a></li><li><a href="#">Career</a></li><li><a href="#">Pricing</a></li></ul></div>
      </nav>

      <div className="bar"><span>© 2026 Twenifor</span><span>Privacy · Terms</span></div>
    </div>
  );
}
