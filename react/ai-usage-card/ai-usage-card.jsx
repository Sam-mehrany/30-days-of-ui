import './ai-usage-card.css';

export default function AiUsageCard() {
  return (
    <main className="stage">
      <section className="card" aria-label="AI Usage">
        <header className="head">
          <h1 className="title"><span className="dot"></span>AI Usage</h1>
          <span className="range">Last 30 days</span>
        </header>

        <div className="hero">
          <div className="big">12,480<small>credits</small></div>
          <div className="pct"><strong>78%</strong>of plan used</div>
        </div>

        <div className="bar" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" aria-label="Plan usage"><span></span></div>
        <div className="bar-meta">
          <span>3,520 left</span>
          <span>16,000 plan</span>
        </div>

        <div className="spark">
          <div className="spark-label"><span>Daily usage</span><span>30 days</span></div>
          <svg viewBox="0 0 536 64" preserveAspectRatio="none" role="img" aria-label="Daily credit usage over the last 30 days, trending up">
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6EA8FE" stopOpacity="0.28" />
                <stop offset="1" stopColor="#6EA8FE" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#6EA8FE" />
                <stop offset="1" stopColor="#8B7CF6" />
              </linearGradient>
            </defs>
            <path fill="url(#fill)" d="M0,50 L18.5,38 L37,44 L55.4,32 L73.9,36 L92.4,54 L110.9,58 L129.4,30 L147.9,22 L166.3,26 L184.8,34 L203.3,40 L221.8,48 L240.3,52 L258.8,24 L277.2,18 L295.7,20 L314.2,28 L332.7,32 L351.2,42 L369.7,46 L388.1,16 L406.6,10 L425.1,14 L443.6,22 L462.1,28 L480.6,36 L499,20 L517.5,12 L536,6 L536,64 L0,64 Z" />
            <polyline fill="none" stroke="url(#stroke)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
              points="0,50 18.5,38 37,44 55.4,32 73.9,36 92.4,54 110.9,58 129.4,30 147.9,22 166.3,26 184.8,34 203.3,40 221.8,48 240.3,52 258.8,24 277.2,18 295.7,20 314.2,28 332.7,32 351.2,42 369.7,46 388.1,16 406.6,10 425.1,14 443.6,22 462.1,28 480.6,36 499,20 517.5,12 536,6" />
            <circle cx="536" cy="6" r="3.5" fill="#8B7CF6" stroke="#0B0F14" strokeWidth="2" />
          </svg>
        </div>

        <footer className="foot">
          <div>
            <div className="cost-label">Monthly cost</div>
            <div className="cost">$48.20</div>
          </div>
          <label className="toggle">
            <input type="checkbox" defaultChecked />
            <span className="track" aria-hidden="true"></span>
            <span className="text">Auto top-up<span className="state"></span></span>
          </label>
        </footer>
      </section>

      <p className="credit">Design concept — Day 1/30 • @sam_mehrany</p>
    </main>
  );
}
