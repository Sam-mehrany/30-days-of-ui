import { useEffect, useRef, useState } from 'react';
import './ember-onboarding.css';

const SLIDES = [
  {
    shards: ['s1', 's2', 's3', 's4'],
    tilt: {},
    label: 'Balance', num: '$12,480', small: '.50', pan: '•••• 4821',
    title: 'Your money, glowing',
    body: 'See every account in one place, updated the moment anything moves.',
  },
  {
    shards: ['s2', 's3', 's1'],
    tilt: { '--tiltY': '10deg' },
    label: 'Saved this month', num: '$842', small: '.10', pan: 'Round-ups on',
    title: 'Savings on autopilot',
    body: 'Every purchase rounds up to the next dollar and quietly stacks the rest.',
  },
  {
    shards: ['s4', 's1', 's2'],
    tilt: { '--tiltX': '4deg', '--tiltY': '-4deg' },
    solid: true,
    label: 'Spend limit', num: '$2,000', pan: '•••• 4821',
    title: 'Lock it with a tap',
    body: 'Freeze, unfreeze and set limits instantly, right from your lock screen.',
  },
];
const LAST = SLIDES.length - 1;
const AUTO_ADVANCE_MS = 4500;

export default function EmberOnboarding() {
  const [index, setIndex] = useState(0);
  // Per-slide card tilt; starts from each slide's inline defaults, then follows the pointer.
  const [tilts, setTilts] = useState(() => SLIDES.map((s) => s.tilt));
  const indexRef = useRef(0);
  const timerRef = useRef(null);
  const x0Ref = useRef(null);

  function go(n) {
    const k = Math.max(0, Math.min(LAST, n));
    indexRef.current = k;
    setIndex(k);
    clearTimeout(timerRef.current);
    if (k < LAST) timerRef.current = setTimeout(() => go(k + 1), AUTO_ADVANCE_MS);
  }

  useEffect(() => {
    go(0);
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(indexRef.current + 1);
      if (e.key === 'ArrowLeft') go(indexRef.current - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onPointerDown(e) {
    x0Ref.current = e.clientX;
  }

  function onPointerUp(e) {
    if (x0Ref.current === null) return;
    const dx = e.clientX - x0Ref.current;
    x0Ref.current = null;
    if (Math.abs(dx) > 40) go(indexRef.current + (dx < 0 ? 1 : -1));
  }

  // subtle tilt follows the pointer
  function onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const tilt = {
      '--tiltY': ((e.clientX - r.left) / r.width - 0.5) * 22 + 'deg',
      '--tiltX': ((e.clientY - r.top) / r.height - 0.5) * -16 + 'deg',
    };
    const k = indexRef.current;
    setTilts((t) => t.map((v, n) => (n === k ? tilt : v)));
  }

  return (
    <section
      className="ember"
      aria-roledescription="carousel"
      aria-label="Welcome"
      data-last={index === LAST ? '' : undefined}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      <header className="ember__top">
        <div className="ember__logo"><i></i>Ember</div>
        <button className="ember__skip" type="button" onClick={() => go(LAST)}>Skip</button>
      </header>

      <div className="ember__track" style={{ transform: `translateX(${-100 * index}%)` }}>
        {SLIDES.map((s, n) => (
          <article
            key={n}
            className="slide"
            aria-roledescription="slide"
            aria-label={`${n + 1} of ${SLIDES.length}`}
            aria-hidden={n !== index}
          >
            <div className="hero">
              {s.shards.map((c) => <span key={c} className={`shard ${c}`}></span>)}
              <div className={s.solid ? 'card card--solid' : 'card'} style={tilts[n]}>
                <div className="card__row"><span className="card__chip"></span><span className="card__brand">EMBER</span></div>
                <div>
                  <div className="card__label">{s.label}</div>
                  <div className="card__num">{s.num}{s.small && <small>{s.small}</small>}</div>
                </div>
                <div className="card__pan">{s.pan}</div>
              </div>
            </div>
            <div className="copy"><h2>{s.title}</h2><p>{s.body}</p></div>
          </article>
        ))}
      </div>

      <footer className="ember__foot">
        <div className="dots" role="tablist" aria-label="Choose slide">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              className="dot"
              type="button"
              role="tab"
              aria-label={`Slide ${n + 1}`}
              aria-current={n === index}
              onClick={() => go(n)}
            ></button>
          ))}
        </div>
        <button className="cta" type="button">Get started</button>
      </footer>
    </section>
  );
}
