import { useEffect, useRef, useState } from 'react';
import kfA from './kf-a.webp';
import kfB from './kf-b.webp';
import './footer-halcyon.css';

/* ---- live moon phase -> spring tide ---- */
const SYN = 29.530588853, REF = Date.UTC(2000, 0, 6, 18, 14) / 864e5; // known new moon
const NAMES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent'];

function moonAge() {
  return (((Date.now() / 864e5 - REF) % SYN) + SYN) % SYN;
}

function tideText(age) {
  const frac = (1 - Math.cos(2 * Math.PI * age / SYN)) / 2;
  const name = NAMES[Math.floor(((age / SYN) * 8) + 0.5) % 8];
  const toNew = SYN - age, toFull = (SYN / 2 - age + SYN) % SYN;
  const days = Math.round(Math.min(toNew, toFull));
  return `${name}, ${Math.round(frac * 100)}% lit · ${days <= 0 ? 'spring tide tonight' : `spring tide in ${days} day${days === 1 ? '' : 's'}`}`;
}

function drawMoon(mc, age) {
  const r = 12, c = 14; mc.clearRect(0, 0, 28, 28);
  mc.fillStyle = '#2a2925'; mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.fill();
  mc.save(); mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.clip();
  mc.fillStyle = '#efe7d8';
  const waxing = age < SYN / 2, k = Math.cos(2 * Math.PI * age / SYN); // 1 new .. -1 full
  mc.beginPath();
  mc.arc(c, c, r, -Math.PI / 2, Math.PI / 2, !waxing);
  mc.ellipse(c, c, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) ? waxing : !waxing);
  mc.fill(); mc.restore();
}

/* ---- kingfisher flight plan ---- */
const PLAN = [
  { w: 150, dur: 13, delay: 0,   y: .46, drift: -.05 },
  { w: 110, dur: 15, delay: 2.8, y: .54, drift: -.04 },
  { w: 180, dur: 12, delay: 6.2, y: .42, drift: -.06 },
  { w: 90,  dur: 17, delay: 9.0, y: .58, drift: -.03 },
];

function birdStyles(root) {
  const Wd = root.clientWidth, Ht = root.clientHeight, s = Math.min(1, Wd / 1400);
  return PLAN.map((b) => {
    const w = b.w * Math.max(.6, s);
    return {
      '--w': `${w}px`, '--dur': `${b.dur}s`, '--delay': `${b.delay}s`,
      '--x0': `${-w - 40}px`, '--y0': `${Ht * b.y}px`,
      '--x1': `${Wd * .45}px`, '--y1': `${Ht * (b.y + b.drift)}px`,
      '--x2': `${Wd + 60}px`, '--y2': `${Ht * (b.y + b.drift * 1.8)}px`,
    };
  });
}

export default function FooterHalcyon() {
  const rootRef = useRef(null);
  const starsRef = useRef(null);
  const moonRef = useRef(null);
  const [tide, setTide] = useState('Reading the moon…');
  const [birds, setBirds] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const age = moonAge();
    setTide(tideText(age));
    drawMoon(moonRef.current.getContext('2d'), age);

    /* ---- twinkling stars + rare shooting star ---- */
    const cv = starsRef.current, cx = cv.getContext('2d');
    let W, H, stars = [], shoot = null, raf = 0;
    function size() {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.width = root.clientWidth * d; H = cv.height = root.clientHeight * d;
      cx.setTransform(1, 0, 0, 1, 0, 0);
      const n = Math.round(root.clientWidth * root.clientHeight / 5200);
      stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H * .62, r: (Math.random() * 1.1 + .25) * d, p: Math.random() * 6.28, s: .4 + Math.random() * 1.6 }));
    }
    function frame(t) {
      cx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = .25 + .75 * Math.pow((Math.sin(s.p + t / 1000 * s.s) + 1) / 2, 3);
        cx.globalAlpha = a; cx.fillStyle = '#f4ecdc';
        cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill();
      }
      if (!shoot && Math.random() < .0025) shoot = { x: W * (.35 + Math.random() * .5), y: H * (.05 + Math.random() * .2), l: 0 };
      if (shoot) {
        shoot.l += 0.022; const L = shoot.l, len = W * .12;
        const x = shoot.x - L * W * .25, y = shoot.y + L * W * .09;
        const g = cx.createLinearGradient(x, y, x + len, y - len * .36);
        g.addColorStop(0, 'rgba(255,245,225,.9)'); g.addColorStop(1, 'rgba(255,245,225,0)');
        cx.globalAlpha = Math.sin(Math.min(L, 1) * Math.PI); cx.strokeStyle = g; cx.lineWidth = 1.4;
        cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + len, y - len * .36); cx.stroke();
        if (L >= 1) shoot = null;
      }
      cx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    const onResize = () => {
      size();
      if (reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } // redraw the still sky
      setBirds(birdStyles(root));
    };

    /* ---- gentle parallax ---- */
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * -18 + 'px');
      root.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * -10 + 'px');
    };

    size(); raf = requestAnimationFrame(frame);
    setBirds(birdStyles(root));
    window.addEventListener('resize', onResize);
    root.addEventListener('pointermove', onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      root.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <footer className="halcyon" ref={rootRef}>
      <div className="art" aria-hidden="true">
        <canvas className="stars" ref={starsRef}></canvas>
        <div className="painting"></div>
        <div className="glow"></div>
        <div className="flock">
          {birds.map((style, i) => (
            <div className="bird" style={style} key={i}>
              <img className="f a" alt="" src={kfA} /><img className="f b" alt="" src={kfB} />
            </div>
          ))}
        </div>
        <div className="grain"></div>
      </div>

      <div className="wrap">
        <div className="brand">
          <div className="mark"><h2>Halcyon</h2><span className="tag">No. 07 · Winter Tide</span></div>
          <p>A field journal of the sea, written by lantern light and printed slowly, twice a year.</p>
          <div className="social">
            <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 1 0 1.6.2 1.9.4.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.3.3.9.4 1.9v8.2c-.1 1-.3 1.6-.4 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.3.1-.9.3-1.9.4H7.9c-1 0-1.6-.3-1.9-.4a3 3 0 0 1-1.2-.8 3 3 0 0 1-.8-1.2c-.1-.3-.3-.9-.4-1.9V7.9c.1-1 .3-1.6.4-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.3-.1.9-.3 1.9-.4H12Zm0-1.8c-2.8 0-3.1 0-4.2.1-1.1 0-1.8.2-2.5.5-.7.3-1.2.6-1.8 1.2-.6.6-1 1.1-1.2 1.8-.3.7-.4 1.4-.5 2.5v8.4c.1 1.1.2 1.8.5 2.5.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.7.3 1.4.4 2.5.5h8.4c1.1-.1 1.8-.2 2.5-.5a5 5 0 0 0 3-3c.3-.7.4-1.4.5-2.5V7.8c-.1-1.1-.2-1.8-.5-2.5-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.7-.3-1.4-.4-2.5-.5H12Z" /></svg></a>
            <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M17.8 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.3l7.7-8.8L.9 2.5h6.8l4.7 6.2 5.4-6.2Zm-1.2 17.5h1.8L6.6 4.4H4.6l12 15.6Z" /></svg></a>
            <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z" /></svg></a>
            <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.75H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12v6.09h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86v5.49h-4V9.75Z" /></svg></a>
          </div>
        </div>

        <nav aria-label="Journal">
          <h3>Journal</h3>
          <ul><li><a href="#">Current Tide</a></li><li><a href="#">Logbook</a></li><li><a href="#">Correspondents</a></li><li><a href="#">Harbours</a></li></ul>
        </nav>
        <nav aria-label="House">
          <h3>House</h3>
          <ul><li><a href="#">About</a></li><li><a href="#">Submissions</a></li><li><a href="#">Contact</a></li><li><a href="#">Press</a></li></ul>
        </nav>

        <div className="letters">
          <h3>Dispatches</h3>
          <p className="lede">One letter at every spring tide.</p>
          <form className={sent ? 'sent' : undefined} onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <label className="field">
              <input type="email" required placeholder="Your email address" aria-label="Email address" />
              <button type="submit" aria-label="Subscribe"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
            </label>
            <p className="thanks">Signed for. Watch the horizon.</p>
          </form>
          <div className="tide"><canvas ref={moonRef} width="28" height="28"></canvas><span>{tide}</span></div>
          <p className="legal">© {new Date().getFullYear()} Halcyon. Printed by the sea in Halifax.</p>
        </div>
      </div>
    </footer>
  );
}
