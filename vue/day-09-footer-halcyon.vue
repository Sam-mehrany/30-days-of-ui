<template>
  <footer ref="rootEl" class="halcyon">
    <div class="art" aria-hidden="true">
      <canvas ref="starsEl" class="stars"></canvas>
      <div class="painting"></div>
      <div class="glow"></div>
      <div class="flock">
        <div v-for="(style, i) in birds" :key="i" class="bird" :style="style">
          <img class="f a" alt="" src="./assets/halcyon-kf-a.webp" /><img class="f b" alt="" src="./assets/halcyon-kf-b.webp" />
        </div>
      </div>
      <div class="grain"></div>
    </div>

    <div class="wrap">
      <div class="brand">
        <div class="mark"><h2>Halcyon</h2><span class="tag">No. 07 · Winter Tide</span></div>
        <p>A field journal of the sea, written by lantern light and printed slowly, twice a year.</p>
        <div class="social">
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 1 0 1.6.2 1.9.4.5.2.8.4 1.2.8.4.4.6.7.8 1.2.1.3.3.9.4 1.9v8.2c-.1 1-.3 1.6-.4 1.9-.2.5-.4.8-.8 1.2-.4.4-.7.6-1.2.8-.3.1-.9.3-1.9.4H7.9c-1 0-1.6-.3-1.9-.4a3 3 0 0 1-1.2-.8 3 3 0 0 1-.8-1.2c-.1-.3-.3-.9-.4-1.9V7.9c.1-1 .3-1.6.4-1.9.2-.5.4-.8.8-1.2.4-.4.7-.6 1.2-.8.3-.1.9-.3 1.9-.4H12Zm0-1.8c-2.8 0-3.1 0-4.2.1-1.1 0-1.8.2-2.5.5-.7.3-1.2.6-1.8 1.2-.6.6-1 1.1-1.2 1.8-.3.7-.4 1.4-.5 2.5v8.4c.1 1.1.2 1.8.5 2.5.3.7.6 1.2 1.2 1.8.6.6 1.1.9 1.8 1.2.7.3 1.4.4 2.5.5h8.4c1.1-.1 1.8-.2 2.5-.5a5 5 0 0 0 3-3c.3-.7.4-1.4.5-2.5V7.8c-.1-1.1-.2-1.8-.5-2.5-.3-.7-.6-1.2-1.2-1.8-.6-.6-1.1-.9-1.8-1.2-.7-.3-1.4-.4-2.5-.5H12Z"/></svg></a>
          <a href="#" aria-label="X"><svg viewBox="0 0 24 24"><path d="M17.8 2.5h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.3l7.7-8.8L.9 2.5h6.8l4.7 6.2 5.4-6.2Zm-1.2 17.5h1.8L6.6 4.4H4.6l12 15.6Z"/></svg></a>
          <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12a31 31 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z"/></svg></a>
          <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.75H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.79 2.66 4.79 6.12v6.09h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.86v5.49h-4V9.75Z"/></svg></a>
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

      <div class="letters">
        <h3>Dispatches</h3>
        <p class="lede">One letter at every spring tide.</p>
        <form :class="{ sent }" @submit.prevent="sent = true">
          <label class="field">
            <input type="email" required placeholder="Your email address" aria-label="Email address" />
            <button type="submit" aria-label="Subscribe"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          </label>
          <p class="thanks">Signed for. Watch the horizon.</p>
        </form>
        <div class="tide"><canvas ref="moonEl" width="28" height="28"></canvas><span>{{ tide }}</span></div>
        <p class="legal">© {{ year }} Halcyon. Printed by the sea in Halifax.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Canvas stars + shooting star, kingfisher flight, parallax and the live moon
// phase all run on mount and are torn down on unmount.
const rootEl = ref(null)
const starsEl = ref(null)
const moonEl = ref(null)
const tide = ref('Reading the moon…')
const birds = ref([])
const sent = ref(false)
const year = new Date().getFullYear()

/* ---- live moon phase -> spring tide ---- */
const SYN = 29.530588853, REF = Date.UTC(2000, 0, 6, 18, 14) / 864e5 // known new moon
const NAMES = ['New moon', 'Waxing crescent', 'First quarter', 'Waxing gibbous', 'Full moon', 'Waning gibbous', 'Last quarter', 'Waning crescent']

function tideText(age) {
  const frac = (1 - Math.cos(2 * Math.PI * age / SYN)) / 2
  const name = NAMES[Math.floor(((age / SYN) * 8) + 0.5) % 8]
  const toNew = SYN - age, toFull = (SYN / 2 - age + SYN) % SYN
  const days = Math.round(Math.min(toNew, toFull))
  return `${name}, ${Math.round(frac * 100)}% lit · ${days <= 0 ? 'spring tide tonight' : `spring tide in ${days} day${days === 1 ? '' : 's'}`}`
}

function drawMoon(mc, age) {
  const r = 12, c = 14; mc.clearRect(0, 0, 28, 28)
  mc.fillStyle = '#2a2925'; mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.fill()
  mc.save(); mc.beginPath(); mc.arc(c, c, r, 0, 7); mc.clip()
  mc.fillStyle = '#efe7d8'
  const waxing = age < SYN / 2, k = Math.cos(2 * Math.PI * age / SYN) // 1 new .. -1 full
  mc.beginPath()
  mc.arc(c, c, r, -Math.PI / 2, Math.PI / 2, !waxing)
  mc.ellipse(c, c, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, (k > 0) ? waxing : !waxing)
  mc.fill(); mc.restore()
}

/* ---- kingfisher flight plan ---- */
const PLAN = [
  { w: 150, dur: 13, delay: 0,   y: .46, drift: -.05 },
  { w: 110, dur: 15, delay: 2.8, y: .54, drift: -.04 },
  { w: 180, dur: 12, delay: 6.2, y: .42, drift: -.06 },
  { w: 90,  dur: 17, delay: 9.0, y: .58, drift: -.03 },
]

function placeBirds(root) {
  const Wd = root.clientWidth, Ht = root.clientHeight, s = Math.min(1, Wd / 1400)
  birds.value = PLAN.map((b) => {
    const w = b.w * Math.max(.6, s)
    return {
      '--w': `${w}px`, '--dur': `${b.dur}s`, '--delay': `${b.delay}s`,
      '--x0': `${-w - 40}px`, '--y0': `${Ht * b.y}px`,
      '--x1': `${Wd * .45}px`, '--y1': `${Ht * (b.y + b.drift)}px`,
      '--x2': `${Wd + 60}px`, '--y2': `${Ht * (b.y + b.drift * 1.8)}px`,
    }
  })
}

let cleanup = () => {}

onMounted(() => {
  const root = rootEl.value
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const age = (((Date.now() / 864e5 - REF) % SYN) + SYN) % SYN
  tide.value = tideText(age)
  drawMoon(moonEl.value.getContext('2d'), age)

  /* ---- twinkling stars + rare shooting star ---- */
  const cv = starsEl.value, cx = cv.getContext('2d')
  let W, H, stars = [], shoot = null, raf = 0
  function size() {
    const d = Math.min(window.devicePixelRatio || 1, 2)
    W = cv.width = root.clientWidth * d; H = cv.height = root.clientHeight * d
    cx.setTransform(1, 0, 0, 1, 0, 0)
    const n = Math.round(root.clientWidth * root.clientHeight / 5200)
    stars = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H * .62, r: (Math.random() * 1.1 + .25) * d, p: Math.random() * 6.28, s: .4 + Math.random() * 1.6 }))
  }
  function frame(t) {
    cx.clearRect(0, 0, W, H)
    for (const s of stars) {
      const a = .25 + .75 * Math.pow((Math.sin(s.p + t / 1000 * s.s) + 1) / 2, 3)
      cx.globalAlpha = a; cx.fillStyle = '#f4ecdc'
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 6.283); cx.fill()
    }
    if (!shoot && Math.random() < .0025) shoot = { x: W * (.35 + Math.random() * .5), y: H * (.05 + Math.random() * .2), l: 0 }
    if (shoot) {
      shoot.l += 0.022; const L = shoot.l, len = W * .12
      const x = shoot.x - L * W * .25, y = shoot.y + L * W * .09
      const g = cx.createLinearGradient(x, y, x + len, y - len * .36)
      g.addColorStop(0, 'rgba(255,245,225,.9)'); g.addColorStop(1, 'rgba(255,245,225,0)')
      cx.globalAlpha = Math.sin(Math.min(L, 1) * Math.PI); cx.strokeStyle = g; cx.lineWidth = 1.4
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x + len, y - len * .36); cx.stroke()
      if (L >= 1) shoot = null
    }
    cx.globalAlpha = 1
    if (!reduce) raf = requestAnimationFrame(frame)
  }

  const onResize = () => {
    size()
    if (reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame) } // redraw the still sky
    placeBirds(root)
  }

  /* ---- gentle parallax ---- */
  const onMove = (e) => {
    const r = root.getBoundingClientRect()
    root.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5) * -18 + 'px')
    root.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5) * -10 + 'px')
  }

  size(); raf = requestAnimationFrame(frame)
  placeBirds(root)
  window.addEventListener('resize', onResize)
  root.addEventListener('pointermove', onMove)

  cleanup = () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
    root.removeEventListener('pointermove', onMove)
  }
})

onBeforeUnmount(() => cleanup())
</script>

<style scoped>
/* Halcyon footer — Day 9/30. Converted from day-09-footer-halcyon.html.
   Images: ./assets/halcyon-painting.webp, ./assets/halcyon-kf-a.webp, ./assets/halcyon-kf-b.webp. */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

.halcyon, .halcyon * { box-sizing: border-box; margin: 0; padding: 0; }
.halcyon {
  --ink: #05070a; --paper: #efe7d8; --muted: #8c8a85; --dim: #5b5a57;
  --gold: #c9a96a; --coral: #d9785c; --line: rgba(239,231,216,.16);
  --serif: "Cormorant Garamond", "Cormorant", Garamond, "Times New Roman", serif;
  --sans: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  position: relative; overflow: hidden; isolation: isolate; display: block;
  background: var(--ink); color: var(--paper); font-family: var(--sans);
  min-height: min(100vh, 980px);
}

/* ---------- art layer ---------- */
.halcyon .art { position: absolute; inset: 0; z-index: -1; pointer-events: none; }
.halcyon .stars { position: absolute; inset: 0; width: 100%; height: 100%; }
.halcyon .painting { position: absolute; left: -2%; right: -2%; bottom: -1%; height: 72%;
  background: url('./assets/halcyon-painting.webp') center bottom/cover no-repeat;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 34%, #000 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 34%, #000 100%);
  transform: translate3d(var(--px, 0), var(--py, 0), 0) scale(1.04);
  transition: transform 1.2s cubic-bezier(.2,.7,.2,1);
  animation: halcyon-breathe 18s ease-in-out infinite alternate; }
@keyframes halcyon-breathe { to { filter: brightness(1.07) saturate(1.05); } }
.halcyon .glow { position: absolute; left: 21%; bottom: 41%; width: 22vw; height: 22vw; max-width: 340px; max-height: 340px; transform: translate(-50%, 50%);
  background: radial-gradient(circle, rgba(255,196,110,.30), rgba(255,170,80,.08) 40%, transparent 68%);
  mix-blend-mode: screen; animation: halcyon-flicker 3.4s ease-in-out infinite; }
@keyframes halcyon-flicker { 0%, 100% { opacity: .75; } 35% { opacity: 1; } 55% { opacity: .82; } 70% { opacity: .95; } }
.halcyon .grain { position: absolute; inset: 0; opacity: .07; mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }

/* ---------- kingfishers ---------- */
.halcyon .flock { position: absolute; inset: 0; }
.halcyon .bird { position: absolute; left: 0; top: 0; width: var(--w); opacity: 0; will-change: transform, opacity;
  filter: drop-shadow(0 6px 14px rgba(0,0,0,.45)) brightness(.92);
  animation: halcyon-fly var(--dur) cubic-bezier(.35,.05,.4,1) var(--delay) infinite; }
.halcyon .bird .f { position: absolute; left: 0; top: 50%; width: 100%; transform: translateY(-50%); }
.halcyon .bird .f.a { position: relative; transform: none; top: 0; }
.halcyon .bird .f.b { animation: halcyon-flap .36s steps(1, end) infinite; }
.halcyon .bird .f.a { animation: halcyon-flapA .36s steps(1, end) infinite; }
@keyframes halcyon-flap { 0% { opacity: 0; } 50% { opacity: 1; } }
@keyframes halcyon-flapA { 0% { opacity: 1; } 50% { opacity: 0; } }
@keyframes halcyon-fly {
  0%   { opacity: 0; transform: translate(var(--x0), var(--y0)) rotate(-4deg); }
  8%   { opacity: 1; }
  55%  { transform: translate(var(--x1), var(--y1)) rotate(2deg); }
  88%  { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--x2), var(--y2)) rotate(-6deg); }
}

/* ---------- content ---------- */
.halcyon .wrap { position: relative; max-width: 1320px; margin: 0 auto; padding: clamp(40px,5vw,72px) clamp(24px,4vw,56px) 0;
  display: grid; grid-template-columns: 1.25fr .55fr .55fr 1fr; gap: clamp(24px,3.4vw,56px); }
.halcyon .brand .mark { display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.halcyon .brand h2 { font: 300 clamp(34px,3.6vw,52px)/1 var(--serif); letter-spacing: .2em; text-transform: uppercase; }
.halcyon .tag { font: 600 10px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--gold); }
.halcyon .brand p { margin-top: 18px; font: italic 400 clamp(17px,1.35vw,20px)/1.45 var(--serif); color: #d8d0c2; max-width: 30ch; }
.halcyon .social { display: flex; gap: 18px; margin-top: 26px; }
.halcyon .social a { color: var(--muted); transition: color .25s, transform .25s; }
.halcyon .social a:hover { color: var(--paper); transform: translateY(-2px); }
.halcyon .social svg { width: 15px; height: 15px; display: block; fill: currentColor; }

.halcyon h3 { font: 600 10.5px/1 var(--sans); letter-spacing: .22em; text-transform: uppercase; color: var(--paper); margin-bottom: 20px; }
.halcyon nav ul { list-style: none; display: grid; gap: 12px; }
.halcyon nav a { position: relative; font: 400 17px/1.2 var(--serif); color: var(--muted); text-decoration: none; transition: color .3s; }
.halcyon nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform .45s cubic-bezier(.2,.7,.2,1); }
.halcyon nav a:hover { color: var(--paper); }
.halcyon nav a:hover::after { transform: scaleX(1); }

.halcyon .letters .lede { font: 400 18px/1.35 var(--serif); color: var(--paper); margin-bottom: 16px; }
.halcyon .field { display: flex; align-items: center; border: 1px solid var(--line); border-radius: 999px; padding: 5px 5px 5px 20px; background: rgba(5,7,10,.55); backdrop-filter: blur(6px); transition: border-color .3s, box-shadow .3s; }
.halcyon .field:focus-within { border-color: rgba(201,169,106,.6); box-shadow: 0 0 0 4px rgba(201,169,106,.08); }
.halcyon .field input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: var(--paper); font: 400 13px/1 var(--sans); padding: 10px 0; }
.halcyon .field input::placeholder { color: var(--dim); }
.halcyon .field button { width: 36px; height: 36px; border-radius: 50%; border: 0; cursor: pointer; background: var(--paper); color: var(--ink); display: grid; place-items: center; transition: transform .35s cubic-bezier(.2,.7,.2,1), background .3s; }
.halcyon .field button:hover { transform: rotate(-45deg); background: var(--gold); }
.halcyon .field button svg { width: 14px; height: 14px; }
.halcyon .tide { display: flex; align-items: center; gap: 10px; margin-top: 16px; font: 400 12px/1.3 var(--sans); color: #b9b3a8; }
.halcyon .tide canvas { width: 14px; height: 14px; flex: none; }
.halcyon .thanks { display: none; margin-top: 12px; font: italic 400 16px/1.3 var(--serif); color: var(--gold); }
.halcyon form.sent .thanks { display: block; }
.halcyon .legal { margin-top: 10px; font: 400 11px/1.4 var(--sans); color: var(--dim); }

@media (max-width: 900px) {
  .halcyon .wrap { grid-template-columns: 1fr 1fr; }
  .halcyon .brand, .halcyon .letters { grid-column: 1 / -1; }
  .halcyon { min-height: 1100px; }
  .halcyon .painting { height: 52%; background-position: 18% bottom; background-size: auto 100%; }
  .halcyon .glow { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .halcyon .bird, .halcyon .painting, .halcyon .glow { animation: none !important; }
  .halcyon .bird { opacity: 0; }
}
</style>
