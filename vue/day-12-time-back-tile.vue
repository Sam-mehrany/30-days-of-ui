<template>
  <div class="time-back-tile">
    <div class="bp">
      <div class="bp__lines" aria-hidden="true">
        <i class="h" style="top:0"></i><i class="h" style="bottom:0"></i>
        <i class="v" style="left:0"></i><i class="v" style="right:0"></i>
        <i class="v" style="left:50%;top:0;bottom:auto;height:68px"></i><i class="v" style="left:50%;bottom:0;top:auto;height:68px"></i>
        <span class="n" style="left:0;top:0"></span><span class="n" style="left:100%;top:0"></span>
        <span class="n" style="left:0;top:100%"></span><span class="n" style="left:100%;top:100%"></span>
      </div>

      <section class="tile" aria-labelledby="tb">
        <div class="kicker" id="tb">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="8" /><path d="M10 2h4M12 14l3-3" /></svg>Get time back
        </div>
        <p class="lead"><b>Skip the meetings that don't need you.</b> Your notetaker joins, listens, and hands you the five minutes that mattered.</p>

        <div class="stage">
          <article class="notes" aria-label="Meeting notes">
            <h3>Weekly Roadmap notes</h3>
            <div class="who"><span class="av"></span><b>Maya</b> Last updated 4 min ago</div>

            <div class="player">
              <button class="play" type="button" :aria-label="playing ? 'Pause recording' : 'Play recording'" @click="toggle">
                <svg viewBox="0 0 24 24">
                  <path v-if="playing" d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  <path v-else d="M7 4v16l13-8z" />
                </svg>
              </button>
              <div ref="wave" class="wave" aria-hidden="true" @click="scrub">
                <i v-for="(h, k) in bars" :key="k" :class="{ on: k < on }" :style="{ height: h + '%' }"></i>
              </div>
              <span class="time" aria-live="off">{{ fmt(TOTAL - pos) }}</span>
            </div>

            <div class="sum">
              <h4>Summary</h4>
              <p>The team moved the billing launch to week two and agreed to cut the export feature from this cycle.</p>
              <div class="sk" style="width:86%"></div><div class="sk" style="width:62%"></div>
            </div>
          </article>

          <div class="clock" aria-hidden="true" :style="{ '--saved': deg + 'deg' }">
            <div class="face">
              <div class="wedge"></div>
              <div class="ticks">
                <i v-for="k in 60" :key="k" :class="{ m: (k - 1) % 5 }" :style="{ transform: `translateX(-50%) rotate(${(k - 1) * 6}deg)` }"></i>
              </div>
              <div class="hand" :style="{ '--a': deg - 90 + 'deg' }"></div>
              <div class="hub"></div>
              <div class="clock__label">{{ mins }} min saved</div>
              <div class="glare"></div>
              <span v-for="(d, k) in dust" :key="'d' + k" class="dust" :style="d"></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

// Playback "saves" time: the violet wedge and hand sweep up to SAVED_MAX of a one-hour dial.
const TOTAL = 32 * 60 + 42 // recording length in seconds (32:42)
const SAVED_MAX = 55 // minutes saved by skipping the full meeting
const SPEED = 60 // 60x speed demo
const N = 46 // waveform bars

const bars = Array.from({ length: N }, (_, k) =>
  Math.min(100, 18 + 70 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.43)) + (k % 7 === 0 ? 12 : 0)),
)
const dust = Array.from({ length: 16 }, () => ({
  left: 10 + Math.random() * 80 + '%',
  top: 15 + Math.random() * 75 + '%',
  animationDelay: -Math.random() * 3 + 's',
}))

const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`

const pos = ref(TOTAL * 0.27) // start with a visible wedge, like the reference
const playing = ref(false)
const wave = ref(null)

const p = computed(() => pos.value / TOTAL)
const on = computed(() => Math.round(p.value * N))
const mins = computed(() => Math.round(p.value * SAVED_MAX))
const deg = computed(() => (mins.value / 60) * 360)

let raf = 0
let last = 0
function tick(t) {
  if (!playing.value) return
  if (last) pos.value = Math.min(TOTAL, pos.value + ((t - last) / 1000) * SPEED)
  last = t
  if (pos.value >= TOTAL) {
    setPlaying(false)
    return
  }
  raf = requestAnimationFrame(tick)
}
function setPlaying(value) {
  playing.value = value
  last = 0
  cancelAnimationFrame(raf)
  if (value) {
    if (pos.value >= TOTAL) pos.value = 0
    raf = requestAnimationFrame(tick)
  }
}
const toggle = () => setPlaying(!playing.value)
function scrub(e) {
  const r = wave.value.getBoundingClientRect()
  pos.value = Math.max(0, Math.min(TOTAL, ((e.clientX - r.left) / r.width) * TOTAL))
}

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

/* Root stands in for the original :root tokens + <body>. */
.time-back-tile{
  --page:#000; --panel:#111111; --grid:#202020; --node:#3a3a3a;
  --notes:#373845; --notes-2:#1a1a20;
  --violet:#6e42b7; --wedge:#634c95; --play:#6d5cf0;
  --fg:#ffffff; --fg-2:#b8b8b8;   /* 9.52:1 on #111 */
  --kicker:#a3a7aa;               /* 7.79:1 */
  --r:14px;
  --fs:clamp(20px,2.1vw,26px);    /* single size: lead = card title */
  --font:Inter, "Helvetica Neue", Arial, system-ui, sans-serif;
  box-sizing:border-box;overflow:hidden;min-height:100vh;background:var(--page);display:flex;align-items:center;justify-content:center;padding:40px 16px;font-family:var(--font);color:var(--fg);-webkit-font-smoothing:antialiased}
.time-back-tile *{box-sizing:border-box;margin:0;padding:0}

/* ============ Blueprint frame ============ */
.bp{position:relative;width:100%;max-width:760px;min-width:0;padding:clamp(40px,7vw,68px)}
.bp__lines{position:absolute;inset:0;pointer-events:none}
.bp__lines i{position:absolute;background:var(--grid)}
.h{left:-40vw;right:-40vw;height:1px} .v{top:-40vh;bottom:-40vh;width:1px}
.n{position:absolute;width:7px;height:7px;border-radius:50%;background:var(--node);transform:translate(-50%,-50%);box-shadow:0 0 0 3px var(--page)}

.tile{position:relative;background:linear-gradient(180deg,#141414,var(--panel) 40%,#0c0c0c);padding:clamp(28px,5vw,52px) clamp(24px,5vw,52px) 0;overflow:hidden;
  box-shadow:inset 0 0 0 1px var(--grid)}

.kicker{display:flex;align-items:center;gap:14px;font:400 var(--fs)/1 var(--font);color:var(--kicker)}
.kicker svg{width:1.15em;height:1.15em;stroke:var(--fg);fill:none;stroke-width:2;stroke-linecap:round}
.lead{margin-top:22px;font:400 var(--fs)/1.38 var(--font);letter-spacing:-.01em;color:var(--fg-2);max-width:32ch}
.lead b{font-weight:500;color:var(--fg)}

/* stepped tray behind notes card (chamfered corner) */
.stage{position:relative;margin:44px calc(-1 * clamp(24px,5vw,52px)) 0;padding:44px clamp(24px,5vw,52px) 0;
  background:linear-gradient(180deg,#0d0d0d,#060606);clip-path:polygon(64px 0,100% 0,100% 100%,0 100%,0 64px);
  box-shadow:inset 0 1px 0 var(--grid)}

/* ============ Notes card ============ */
.notes{position:relative;border-radius:var(--r) var(--r) 0 0;padding:28px 28px 40px;
  background:linear-gradient(160deg,var(--notes) 0%,#24252e 30%,var(--notes-2) 75%,#0b0b0d 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12),inset 0 0 0 1px rgba(255,255,255,.05);
  -webkit-mask-image:linear-gradient(180deg,#000 70%,transparent);mask-image:linear-gradient(180deg,#000 70%,transparent)}
.notes h3{font:500 var(--fs)/1.2 var(--font);letter-spacing:-.01em}
.who{display:flex;align-items:center;gap:8px;margin-top:10px;font:400 14px/1 var(--font);color:var(--fg-2)}
.who .av{width:18px;height:18px;border-radius:50%;background:linear-gradient(135deg,#e9c3a5,#8b5f45)}
.who b{color:var(--fg);font-weight:500}

/* player */
.player{display:flex;align-items:center;gap:14px;margin-top:20px;height:52px;padding:0 18px 0 7px;border-radius:999px;
  background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.03));box-shadow:inset 0 0 0 1px rgba(255,255,255,.08)}
.play{flex:none;width:38px;height:38px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;color:#fff;
  background:radial-gradient(circle at 35% 30%,#9a8cff,var(--play) 55%,#4b36c9);box-shadow:0 0 18px rgba(109,92,240,.55),inset 0 1px 0 rgba(255,255,255,.35);
  transition:transform .2s}
.play:hover{transform:scale(1.06)} .play:focus-visible{outline:2px solid #b9adff;outline-offset:3px}
.play svg{width:13px;height:13px;fill:currentColor}
.wave{flex:1 1 0;width:0;min-width:0;overflow:hidden;display:flex;align-items:center;gap:3px;height:26px;cursor:pointer}
.wave i{flex:none;width:3px;border-radius:2px;background:rgba(255,255,255,.28);transition:background .15s}
.wave i.on{background:#fff}
.time{flex:none;font:400 14px/1 var(--font);color:var(--fg-2);font-variant-numeric:tabular-nums}

.sum{margin-top:26px}
.sum h4{font:500 15px/1 var(--font);color:var(--fg)}
.sum p{margin-top:12px;font:400 15px/1.55 var(--font);color:var(--fg-2);max-width:42ch}
.sk{height:9px;border-radius:9px;background:rgba(255,255,255,.07);margin-top:14px}

/* ============ Glass clock (CSS-rendered) ============ */
.clock{--size:clamp(190px,30vw,270px);--saved:0deg;position:absolute;left:calc(50% - var(--size) / 2 + 20px);top:96px;width:var(--size);aspect-ratio:1;border-radius:50%;
  padding:calc(var(--size) * .05);
  background:conic-gradient(from 200deg,#4a4560,#a78bfa 25%,#f0abfc 40%,#5b4a86 60%,#2d2b3a 80%,#4a4560);
  box-shadow:0 0 0 1px rgba(255,255,255,.12),0 30px 80px -10px rgba(110,66,183,.55),0 0 120px -20px rgba(240,171,252,.35);
  transform:rotate(0deg);animation:tbt-float 7s ease-in-out infinite}
@keyframes tbt-float{50%{transform:translateY(-8px)}}
.face{position:relative;width:100%;height:100%;border-radius:50%;overflow:hidden;
  background:radial-gradient(120% 80% at 50% 110%,rgba(192,90,240,.55),transparent 55%),
             radial-gradient(circle at 50% 40%,#1d1b28,#0e0d14 70%);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),inset 0 10px 30px rgba(0,0,0,.6)}
.wedge{position:absolute;inset:0;border-radius:50%;
  background:conic-gradient(from 0deg,rgba(99,76,149,.12) 0deg,var(--wedge) calc(var(--saved) * .55),#d9b4ff calc(var(--saved) - 2deg),#fff2ff var(--saved),transparent var(--saved));
  transition:background .2s}
.ticks{position:absolute;inset:6%;border-radius:50%}
/* Pivot = tick-ring radius: face is 90% of --size, ring is 88% of the face, so 0.396 × --size.
   (The HTML version measured this in JS on resize; pure CSS gives the same value.) */
.ticks i{position:absolute;left:50%;top:0;width:1.5px;height:7%;background:rgba(255,255,255,.75);transform-origin:50% calc(var(--size) * .396);border-radius:2px}
.ticks i.m{height:3%;opacity:.25;width:1px}
.hand{position:absolute;left:50%;top:50%;height:2px;width:30%;background:linear-gradient(90deg,#fff,rgba(255,255,255,.7));border-radius:2px;transform-origin:0 50%;
  transform:translateY(-50%) rotate(var(--a,10deg));transition:transform .4s cubic-bezier(.3,1.6,.5,1)}
.hub{position:absolute;left:50%;top:50%;width:12%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);
  background:radial-gradient(circle at 35% 30%,#fff,#c9c9d1 60%,#8d8d99);box-shadow:0 4px 12px rgba(0,0,0,.5)}
.glare{position:absolute;inset:0;border-radius:50%;background:linear-gradient(150deg,rgba(255,255,255,.14),transparent 35%);pointer-events:none}
.dust{position:absolute;width:2px;height:2px;border-radius:50%;background:#fff;opacity:.5;animation:tbt-tw 3s ease-in-out infinite}
@keyframes tbt-tw{50%{opacity:.1}}
.clock__label{position:absolute;left:50%;bottom:20%;transform:translateX(-50%);font:500 11px/1 var(--font);letter-spacing:.12em;text-transform:uppercase;color:#e9d9ff;white-space:nowrap;opacity:.9}

@media (max-width:620px){.clock{--size:150px;top:150px;left:auto;right:-14px}.clock__label{font-size:9px}}
@media (prefers-reduced-motion:reduce){.clock,.dust{animation:none}}
</style>
