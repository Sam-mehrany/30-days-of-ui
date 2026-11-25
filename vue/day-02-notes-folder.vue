<template>
  <div class="notes-folder">
    <div class="bezel">
      <a class="card" href="#" aria-label="Daily memo, Notes and Journaling: 5 docs, 1270 notes">
        <!-- Simulated motion-blurred photograph (layered gradients + heavy blur + streaks + grain) -->
        <svg class="photo" viewBox="0 0 1008 588" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#e86d4b" />
              <stop offset="1" stop-color="#e86d4b" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#fffce6" />
              <stop offset="0.45" stop-color="#fffce6" stop-opacity="0.85" />
              <stop offset="1" stop-color="#f6a37e" stop-opacity="0" />
            </radialGradient>
            <radialGradient id="g3" cx="50%" cy="50%" r="50%">
              <stop offset="0" stop-color="#7d0f08" />
              <stop offset="1" stop-color="#7d0f08" stop-opacity="0" />
            </radialGradient>
            <linearGradient id="base" x1="0" y1="0" x2="1" y2="0.3">
              <stop offset="0" stop-color="#ab180e" />
              <stop offset="0.35" stop-color="#c8361f" />
              <stop offset="0.7" stop-color="#e86d4b" />
              <stop offset="1" stop-color="#b8220f" />
            </linearGradient>
            <filter id="blur" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="22 9" />
            </filter>
            <filter id="streak" x="-30%" y="-100%" width="160%" height="300%">
              <feGaussianBlur stdDeviation="40 3" />
            </filter>
            <filter id="grain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.16" />
              </feComponentTransfer>
            </filter>
          </defs>

          <rect width="1008" height="588" fill="url(#base)" />

          <g filter="url(#blur)">
            <ellipse cx="90" cy="60" rx="260" ry="90" fill="url(#g3)" />
            <ellipse cx="560" cy="120" rx="360" ry="110" fill="url(#g1)" />
            <ellipse cx="860" cy="40" rx="260" ry="80" fill="url(#g1)" />
            <ellipse cx="700" cy="170" rx="280" ry="70" fill="url(#g3)" opacity="0.7" />
            <ellipse cx="330" cy="20" rx="240" ry="60" fill="url(#g1)" opacity="0.8" />
            <!-- blown-out highlights -->
            <ellipse cx="640" cy="62" rx="190" ry="44" fill="url(#g2)" />
            <ellipse cx="905" cy="128" rx="130" ry="32" fill="url(#g2)" opacity="0.9" />
            <ellipse cx="250" cy="70" rx="110" ry="22" fill="url(#g2)" opacity="0.55" />
          </g>

          <!-- horizontal motion streaks -->
          <g filter="url(#streak)">
            <rect x="120" y="34" width="560" height="7" fill="#fffce6" opacity="0.55" />
            <rect x="420" y="92" width="520" height="10" fill="#fffce6" opacity="0.6" />
            <rect x="560" y="140" width="420" height="6" fill="#fffce6" opacity="0.45" />
            <rect x="0" y="18" width="360" height="8" fill="#e86d4b" opacity="0.8" />
            <rect x="300" y="118" width="460" height="12" fill="#8f1209" opacity="0.6" />
            <rect x="700" y="12" width="300" height="6" fill="#ffd9b8" opacity="0.6" />
            <rect x="40" y="84" width="300" height="9" fill="#c8361f" opacity="0.7" />
          </g>

          <rect width="1008" height="588" filter="url(#grain)" opacity="0.9" />
        </svg>

        <!-- Dark folder body with raised tab and 45° soft shoulder -->
        <svg class="body" viewBox="0 0 1008 588" aria-hidden="true">
          <path
            fill="#1e1e1e"
            d="M0,140 Q0,100 40,100 L400,100 Q420,100 434,114 L482,162 Q496,176 516,176 L968,176 Q1008,176 1008,216 L1008,588 L0,588 Z"
          />
        </svg>

        <span class="label">2026</span>

        <div class="title">
          <h2>Daily memo</h2>
          <p>Notes &amp; Journaling</p>
        </div>

        <div class="counts hero">
          <span class="num-hero">05</span>
          <span class="unit">Doc</span>
        </div>

        <div class="counts side">
          <span class="num-side">1270 Notes</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
// Static tile — no reactive state.
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=block');

.notes-folder {
  box-sizing: border-box;
  width: 1200px;
  height: 1271px;
  overflow: hidden;
  background: #f3f3e9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.notes-folder *,
.notes-folder *::before,
.notes-folder *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Outer bezel: solid black, larger radius than the card */
.bezel {
  width: 1040px;
  padding: 16px;
  background: #000000;
  border-radius: 56px;
}

/* Card: photo behind, dark folder body on top */
.card {
  position: relative;
  width: 1008px;
  height: 588px;
  border-radius: 40px;
  overflow: hidden;
  background: #ab180e;
  display: block;
  color: #ffffff;
  text-decoration: none;
}

.photo,
.body {
  position: absolute;
  left: 0;
  top: 0;
  width: 1008px;
  height: 588px;
  display: block;
}

.label,
.title,
.counts {
  position: absolute;
}

/* Top-right image label, sitting on the photo */
.label {
  top: 28px;
  right: 30px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  color: #ffffff;
}

/* Top-left title block inside the folder tab */
.title {
  left: 30px;
  top: 128px;
}
.title h2 {
  font-size: 34px;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.005em;
  color: #ffffff;
}
.title p {
  margin-top: 4px;
  font-size: 34px;
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.005em;
  color: #afafaf;
}

/* Bottom counts */
.counts {
  bottom: 30px;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 10px;
}
.counts.hero {
  left: 30px;
}
.counts.side {
  right: 30px;
}
.num-hero {
  font-size: 72px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.unit,
.num-side {
  font-size: 34px;
  font-weight: 600;
  letter-spacing: 0;
}
</style>
