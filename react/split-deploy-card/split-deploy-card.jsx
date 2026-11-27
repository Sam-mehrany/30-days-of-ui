import { Fragment, useEffect, useRef, useState } from 'react';
import './split-deploy-card.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'builds', label: 'Builds' },
  { id: 'logs', label: 'Logs' },
];

const VIEWS = {
  overview: {
    lt: 'feat/checkout-redesign',
    lp: 'Built from your branch with its own URL, so reviewers can click through before anything merges.',
    l: [['Commit', 'a91c4e2'], ['Build time', '38s'], ['Reviewers', '2 approved']],
    dt: 'Production',
    dp: 'Live on halcyon.studio across 18 edge regions, with instant rollback to any earlier build.',
  },
  builds: {
    lt: 'Last 24 hours',
    lp: 'Fourteen builds, one failed on a type error and was fixed in the next push.',
    l: [['Succeeded', '13'], ['Median time', '41s'], ['Cache hit', '92%']],
    dt: 'Production build',
    dp: 'Promoted from preview a91c4e1 after review. Previous build kept warm for rollback.',
  },
  logs: {
    lt: 'Runtime logs',
    lp: 'Streaming from every region. Filter by route, status or request ID.',
    l: [['Requests / min', '2,310'], ['Errors', '0.02%'], ['Cold starts', '3']],
    dt: 'Live tail',
    dp: 'The last few lines from production, newest at the bottom.',
  },
};

const LOG_LINES = [
  ['200', ' GET /            12ms  yul1'],
  ['200', ' GET /journal     31ms  iad1'],
  ['200', ' POST /api/sub    84ms  yyz1'],
  ['304', ' GET /og.png       4ms  cdg1'],
];

export default function SplitDeployCard() {
  const [active, setActive] = useState('overview');
  const [restarting, setRestarting] = useState(false);
  const [ago, setAgo] = useState('Updated 2m ago');
  const thumbRef = useRef(null);
  const tabRefs = useRef({});
  const timeoutRef = useRef(null);

  const view = VIEWS[active];
  const isLog = active === 'logs';

  // Slide the thumb under the selected tab; re-measure on resize.
  useEffect(() => {
    const moveThumb = () => {
      const b = tabRefs.current[active], thumb = thumbRef.current;
      if (!b || !thumb) return;
      thumb.style.width = b.offsetWidth + 'px';
      thumb.style.transform = `translateX(${b.offsetLeft}px)`;
    };
    const raf = requestAnimationFrame(moveThumb);
    window.addEventListener('resize', moveThumb);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', moveThumb);
    };
  }, [active]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const i = TABS.findIndex((t) => t.id === active);
    const n = TABS[(i + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length];
    tabRefs.current[n.id]?.focus();
    setActive(n.id);
  };

  const restart = () => {
    setRestarting(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setRestarting(false);
      setAgo('Updated just now');
    }, 2200);
  };

  return (
    <div className="split-deploy">
      <section className="deploy" aria-labelledby="dh">
        <header className="deploy__head">
          <h2 id="dh"><span>Every push gets a preview.</span> Promote it to production when it looks right.</h2>
          <div className="seg" role="tablist" aria-label="Environment view" onKeyDown={onKeyDown}>
            <span className="seg__thumb" aria-hidden="true" ref={thumbRef}></span>
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id ? 'true' : 'false'}
                ref={(el) => { tabRefs.current[t.id] = el; }}
                onClick={() => setActive(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <div className="tray">
          <div className="panes">
            <article className="card card--light">
              <div className="card__top">
                <span className="icon"><svg viewBox="0 0 24 24"><path d="M6 3v12M18 9a3 3 0 1 0 0-.01M6 21a3 3 0 1 0 0-.01M18 12a9 9 0 0 1-9 9" /></svg></span>
                <span className="pill">Preview</span>
              </div>
              <h3>{view.lt}</h3>
              <p>{view.lp}</p>
              <div className="meta">
                {view.l.map(([k, v]) => (
                  <div key={k}><span>{k}</span><b>{v}</b></div>
                ))}
              </div>
            </article>

            <article className="card card--dark">
              <div className="card__top">
                <span className="icon"><svg viewBox="0 0 24 24"><path d="M12 2 3 7v10l9 5 9-5V7z M3 7l9 5 9-5 M12 12v10" /></svg></span>
                <span className={restarting ? 'pill pill--busy' : 'pill pill--ok'}><i></i>{restarting ? 'Restarting' : 'Deployed'}</span>
              </div>
              <h3>{view.dt}</h3>
              <p>{view.dp}</p>
              {isLog ? (
                <pre className="log">
                  {LOG_LINES.map(([code, rest], i) => (
                    <Fragment key={i}>{i > 0 && '\n'}<span className="ok">{code}</span>{rest}</Fragment>
                  ))}
                </pre>
              ) : (
                <div className="meta">
                  <div><span>Commit</span><b>3f2a9c1</b></div>
                  <div><span>Uptime, 30 days</span><b>99.99%</b></div>
                  <div><span>p95 response</span><b>84 ms</b></div>
                </div>
              )}
            </article>
          </div>

          <div className="strip">
            <span className="pill">main</span>
            <span className="pill">Node 22</span>
            <span className="pill">{ago}</span>
            <span className="spacer"></span>
            <button className="chip" type="button" disabled={restarting} onClick={restart}>
              <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>Restart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
