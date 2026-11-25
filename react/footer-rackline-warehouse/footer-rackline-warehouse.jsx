import warehouse from './warehouse.webp';
import './footer-rackline-warehouse.css';

export default function FooterRacklineWarehouse() {
  return (
    <div className="stage">
      <img className="bg" src={warehouse} alt="" />
      <footer className="card">
        <div className="top">
          <div className="brand">
            <div className="logo"><div className="mark">R</div><div className="word">RACKLINE</div></div>
            <div className="tag">Warehouse Shelving Systems</div>
          </div>
          <div className="cols">
            <div className="col"><h4>Products</h4><ul><li><a href="#">Selective Pallet Racking</a></li><li><a href="#">Cantilever Racking</a></li><li><a href="#">Mezzanine Floors</a></li><li><a href="#">Longspan Shelving</a></li></ul></div>
            <div className="col"><h4>Company</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Projects</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul></div>
            <div className="col"><h4>Support</h4><ul><li><a href="#">Installation</a></li><li><a href="#">Safety Inspections</a></li><li><a href="#">Spare Parts</a></li><li><a href="#">Downloads</a></li></ul></div>
          </div>
        </div>
        <div className="rule"></div>
        <div className="bot">
          <div className="copy">© 2026 RACKLINE. All Rights Reserved</div>
          <div className="socs">
            <a className="soc" href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.7c0-.9.3-1.4 1.5-1.4h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v3h2.6V21z" fill="currentColor" stroke="none" /></svg></a>
            <a className="soc" href="#" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5l14 14M19 5L5 19" /></svg></a>
            <a className="soc" href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="5" width="14" height="14" rx="4" /><circle cx="12" cy="12" r="3.3" /><circle cx="16.2" cy="7.8" r=".6" fill="currentColor" /></svg></a>
            <a className="soc" href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.5 10v7M7.5 7v.1M11 17v-7M11 13c0-2 1.3-3 2.8-3s2.2 1 2.2 2.8V17" /></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
