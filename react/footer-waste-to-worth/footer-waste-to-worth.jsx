import bg from './bg.webp';
import './footer-waste-to-worth.css';

export default function FooterWasteToWorth() {
  return (
    <div className="stage">
      <img className="bg" src={bg} alt="" aria-hidden="true" />
      <div className="mark">TWENIFOR</div>

      <div className="hero">
        <div className="num"><b>12,480</b><span>tonnes</span></div>
        <p className="sub">of surplus material reused</p>
        <button className="cta" type="button">List your surplus</button>
      </div>

      <nav className="links" aria-label="Footer">
        <a href="#">Home</a><i>·</i><a href="#">Marketplace</a><i>·</i><a href="#">Resources</a><i>·</i><a href="#">Contact</a>
      </nav>
    </div>
  );
}
