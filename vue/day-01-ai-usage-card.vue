<template>
  <main class="ai-usage">
    <section class="card" aria-label="AI Usage">
      <header class="head">
        <h1 class="title"><span class="dot"></span>AI Usage</h1>
        <span class="range">Last 30 days</span>
      </header>

      <div class="hero">
        <div class="big">12,480<small>credits</small></div>
        <div class="pct"><strong>78%</strong>of plan used</div>
      </div>

      <div
        class="bar"
        role="progressbar"
        aria-valuenow="78"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Plan usage"
      >
        <span></span>
      </div>
      <div class="bar-meta">
        <span>3,520 left</span>
        <span>16,000 plan</span>
      </div>

      <div class="spark">
        <div class="spark-label"><span>Daily usage</span><span>30 days</span></div>
        <svg
          viewBox="0 0 536 64"
          preserveAspectRatio="none"
          role="img"
          aria-label="Daily credit usage over the last 30 days, trending up"
        >
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#6EA8FE" stop-opacity="0.28" />
              <stop offset="1" stop-color="#6EA8FE" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stop-color="#6EA8FE" />
              <stop offset="1" stop-color="#8B7CF6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#fill)"
            d="M0,50 L18.5,38 L37,44 L55.4,32 L73.9,36 L92.4,54 L110.9,58 L129.4,30 L147.9,22 L166.3,26 L184.8,34 L203.3,40 L221.8,48 L240.3,52 L258.8,24 L277.2,18 L295.7,20 L314.2,28 L332.7,32 L351.2,42 L369.7,46 L388.1,16 L406.6,10 L425.1,14 L443.6,22 L462.1,28 L480.6,36 L499,20 L517.5,12 L536,6 L536,64 L0,64 Z"
          />
          <polyline
            fill="none"
            stroke="url(#stroke)"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            vector-effect="non-scaling-stroke"
            points="0,50 18.5,38 37,44 55.4,32 73.9,36 92.4,54 110.9,58 129.4,30 147.9,22 166.3,26 184.8,34 203.3,40 221.8,48 240.3,52 258.8,24 277.2,18 295.7,20 314.2,28 332.7,32 351.2,42 369.7,46 388.1,16 406.6,10 425.1,14 443.6,22 462.1,28 480.6,36 499,20 517.5,12 536,6"
          />
          <circle cx="536" cy="6" r="3.5" fill="#8B7CF6" stroke="#0B0F14" stroke-width="2" />
        </svg>
      </div>

      <footer class="foot">
        <div>
          <div class="cost-label">Monthly cost</div>
          <div class="cost">$48.20</div>
        </div>
        <label class="toggle">
          <input v-model="autoTopUp" type="checkbox" />
          <span class="track" :class="{ on: autoTopUp }" aria-hidden="true"></span>
          <span class="text"
            >Auto top-up<span class="state" :class="{ on: autoTopUp }">{{
              autoTopUp ? 'On' : 'Off'
            }}</span></span
          >
        </label>
      </footer>
    </section>

    <p class="credit">Design concept — Day 1/30 • @sam_mehrany</p>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const autoTopUp = ref(true)
</script>

<style scoped>
.ai-usage {
  --bg: #0b0f14;
  --text: #e8edf3;
  --muted: #8a96a6;
  --faint: #5b6675;
  --accent: #6ea8fe;
  --accent-2: #8b7cf6;
  --good: #34d399;
  --line: rgba(255, 255, 255, 0.08);
  box-sizing: border-box;
  width: 1200px;
  height: 675px;
  background: var(--bg);
  color: var(--text);
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background:
    radial-gradient(520px 320px at 30% 25%, rgba(110, 168, 254, 0.16), transparent 70%),
    radial-gradient(480px 300px at 72% 78%, rgba(139, 124, 246, 0.14), transparent 70%),
    var(--bg);
}
.ai-usage *,
.ai-usage *::before,
.ai-usage *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.card {
  width: 600px;
  padding: 28px 32px 26px;
  border-radius: 20px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025));
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 24px 60px -12px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}
.range {
  font-size: 12px;
  color: var(--muted);
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.03);
}
.hero {
  margin-top: 22px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.big {
  font-size: 52px;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.big small {
  font-size: 16px;
  font-weight: 500;
  color: var(--muted);
  letter-spacing: 0;
  margin-left: 6px;
}
.pct {
  text-align: right;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  font-variant-numeric: tabular-nums;
}
.pct strong {
  display: block;
  font-size: 22px;
  font-weight: 600;
  color: var(--text);
}
.bar {
  margin-top: 16px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}
.bar > span {
  display: block;
  width: 78%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 12px rgba(110, 168, 254, 0.45);
}
.bar-meta {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--faint);
  font-variant-numeric: tabular-nums;
}
.spark {
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}
.spark-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 8px;
}
.spark svg {
  display: block;
  width: 100%;
  height: 64px;
  overflow: visible;
}
.foot {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cost-label {
  font-size: 12px;
  color: var(--muted);
}
.cost {
  font-size: 22px;
  font-weight: 600;
  margin-top: 2px;
  font-variant-numeric: tabular-nums;
}
.toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
}
.toggle input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.track {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}
.track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease;
}
.track.on {
  background: var(--good);
  border-color: var(--good);
}
.track.on::after {
  transform: translateX(20px);
}
.toggle input:focus-visible + .track {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.state {
  font-size: 12px;
  color: var(--faint);
}
.state.on {
  color: var(--good);
}
.text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
}
.credit {
  margin-top: 22px;
  font-size: 12px;
  color: var(--faint);
  letter-spacing: 0.02em;
}
</style>
