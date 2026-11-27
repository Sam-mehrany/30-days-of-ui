import { useEffect, useRef, useState } from 'react';
import './time-back-tile.css';

/* Playback "saves" time: the violet wedge and hand sweep up to SAVED_MAX of a one-hour dial. */
const TOTAL = 32 * 60 + 42;  // recording length in seconds (32:42)
const SAVED_MAX = 55;        // minutes saved by skipping the full meeting
const SPEED = 60;            // 60x speed demo
const N = 46;                // waveform bars

const TICKS = Array.from({ length: 60 }, (_, k) => k);
const BARS = Array.from({ length: N }, (_, k) =>
  Math.min(100, 18 + 70 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.43)) + (k % 7 === 0 ? 12 : 0)),
);

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function TimeBackTile() {
  const [pos, setPos] = useState(TOTAL * 0.27); // start with a visible wedge, like the reference
  const [playing, setPlaying] = useState(false);
  const waveRef = useRef(null);

  // Dust motes: random once per mount.
  const [dust] = useState(() =>
    Array.from({ length: 16 }, () => ({
      left: 10 + Math.random() * 80 + '%',
      top: 15 + Math.random() * 75 + '%',
      animationDelay: -Math.random() * 3 + 's',
    })),
  );

  // rAF playback loop; cancelled on pause and on unmount.
  useEffect(() => {
    if (!playing) return undefined;
    let last = 0;
    let id = requestAnimationFrame(function tick(t) {
      if (last) setPos((p) => Math.min(TOTAL, p + ((t - last) / 1000) * SPEED));
      last = t;
      id = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(id);
  }, [playing]);

  // Stop at the end of the recording.
  useEffect(() => {
    if (playing && pos >= TOTAL) setPlaying(false);
  }, [playing, pos]);

  const toggle = () => {
    if (!playing && pos >= TOTAL) setPos(0);
    setPlaying(!playing);
  };

  const scrub = (e) => {
    const r = waveRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(TOTAL, ((e.clientX - r.left) / r.width) * TOTAL)));
  };

  const p = pos / TOTAL;
  const on = Math.round(p * N);
  const mins = Math.round(p * SAVED_MAX);
  const deg = (mins / 60) * 360;

  return (
    <div className="time-back-tile">
      <div className="bp">
        <div className="bp__lines" aria-hidden="true">
          <i className="h" style={{ top: 0 }}></i><i className="h" style={{ bottom: 0 }}></i>
          <i className="v" style={{ left: 0 }}></i><i className="v" style={{ right: 0 }}></i>
          <i className="v" style={{ left: '50%', top: 0, bottom: 'auto', height: 68 }}></i>
          <i className="v" style={{ left: '50%', bottom: 0, top: 'auto', height: 68 }}></i>
          <span className="n" style={{ left: 0, top: 0 }}></span><span className="n" style={{ left: '100%', top: 0 }}></span>
          <span className="n" style={{ left: 0, top: '100%' }}></span><span className="n" style={{ left: '100%', top: '100%' }}></span>
        </div>

        <section className="tile" aria-labelledby="tb">
          <div className="kicker" id="tb">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="8" /><path d="M10 2h4M12 14l3-3" /></svg>Get time back
          </div>
          <p className="lead"><b>Skip the meetings that don&apos;t need you.</b> Your notetaker joins, listens, and hands you the five minutes that mattered.</p>

          <div className="stage">
            <article className="notes" aria-label="Meeting notes">
              <h3>Weekly Roadmap notes</h3>
              <div className="who"><span className="av"></span><b>Maya</b> Last updated 4 min ago</div>

              <div className="player">
                <button className="play" type="button" aria-label={playing ? 'Pause recording' : 'Play recording'} onClick={toggle}>
                  <svg viewBox="0 0 24 24">
                    {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 4v16l13-8z" />}
                  </svg>
                </button>
                <div className="wave" aria-hidden="true" ref={waveRef} onClick={scrub}>
                  {BARS.map((h, k) => (
                    <i key={k} className={k < on ? 'on' : undefined} style={{ height: h + '%' }}></i>
                  ))}
                </div>
                <span className="time" aria-live="off">{fmt(TOTAL - pos)}</span>
              </div>

              <div className="sum">
                <h4>Summary</h4>
                <p>The team moved the billing launch to week two and agreed to cut the export feature from this cycle.</p>
                <div className="sk" style={{ width: '86%' }}></div><div className="sk" style={{ width: '62%' }}></div>
              </div>
            </article>

            <div className="clock" aria-hidden="true" style={{ '--saved': deg + 'deg' }}>
              <div className="face">
                <div className="wedge"></div>
                <div className="ticks">
                  {TICKS.map((k) => (
                    <i key={k} className={k % 5 ? 'm' : undefined} style={{ transform: `translateX(-50%) rotate(${k * 6}deg)` }}></i>
                  ))}
                </div>
                <div className="hand" style={{ '--a': deg - 90 + 'deg' }}></div>
                <div className="hub"></div>
                <div className="clock__label">{mins} min saved</div>
                <div className="glare"></div>
                {dust.map((d, k) => (
                  <span key={k} className="dust" style={d}></span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
