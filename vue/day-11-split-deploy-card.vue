<template>
  <div class="split-deploy">
    <section class="deploy" aria-labelledby="dh">
      <header class="deploy__head">
        <h2 id="dh"><span>Every push gets a preview.</span> Promote it to production when it looks right.</h2>
        <div class="seg" role="tablist" aria-label="Environment view" @keydown="onKeydown">
          <span ref="thumb" class="seg__thumb" aria-hidden="true"></span>
          <button
            v-for="t in tabs"
            :key="t.id"
            :ref="(el) => (tabEls[t.id] = el)"
            role="tab"
            :aria-selected="active === t.id ? 'true' : 'false'"
            @click="active = t.id"
          >{{ t.label }}</button>
        </div>
      </header>

      <div class="tray">
        <div class="panes">
          <article class="card card--light">
            <div class="card__top">
              <span class="icon"><svg viewBox="0 0 24 24"><path d="M6 3v12M18 9a3 3 0 1 0 0-.01M6 21a3 3 0 1 0 0-.01M18 12a9 9 0 0 1-9 9" /></svg></span>
              <span class="pill">Preview</span>
            </div>
            <h3>{{ view.lt }}</h3>
            <p>{{ view.lp }}</p>
            <div class="meta">
              <div v-for="[k, v] in view.l" :key="k"><span>{{ k }}</span><b>{{ v }}</b></div>
            </div>
          </article>

          <article class="card card--dark">
            <div class="card__top">
              <span class="icon"><svg viewBox="0 0 24 24"><path d="M12 2 3 7v10l9 5 9-5V7z M3 7l9 5 9-5 M12 12v10" /></svg></span>
              <span :class="['pill', restarting ? 'pill--busy' : 'pill--ok']"><i></i>{{ restarting ? 'Restarting' : 'Deployed' }}</span>
            </div>
            <h3>{{ view.dt }}</h3>
            <p>{{ view.dp }}</p>
            <pre v-if="isLog" class="log"><template v-for="([code, rest], i) in logLines" :key="i">{{ i > 0 ? '\n' : '' }}<span class="ok">{{ code }}</span>{{ rest }}</template></pre>
            <div v-else class="meta">
              <div><span>Commit</span><b>3f2a9c1</b></div>
              <div><span>Uptime, 30 days</span><b>99.99%</b></div>
              <div><span>p95 response</span><b>84 ms</b></div>
            </div>
          </article>
        </div>

        <div class="strip">
          <span class="pill">main</span>
          <span class="pill">Node 22</span>
          <span class="pill">{{ ago }}</span>
          <span class="spacer"></span>
          <button class="chip" type="button" :disabled="restarting" @click="restart">
            <svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg>Restart
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'builds', label: 'Builds' },
  { id: 'logs', label: 'Logs' },
]

const views = {
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
}

const logLines = [
  ['200', ' GET /            12ms  yul1'],
  ['200', ' GET /journal     31ms  iad1'],
  ['200', ' POST /api/sub    84ms  yyz1'],
  ['304', ' GET /og.png       4ms  cdg1'],
]

const active = ref('overview')
const restarting = ref(false)
const ago = ref('Updated 2m ago')
const thumb = ref(null)
const tabEls = {}
let raf = 0
let timer = null

const view = computed(() => views[active.value])
const isLog = computed(() => active.value === 'logs')

function moveThumb() {
  const b = tabEls[active.value]
  if (!b || !thumb.value) return
  thumb.value.style.width = b.offsetWidth + 'px'
  thumb.value.style.transform = `translateX(${b.offsetLeft}px)`
}

function onKeydown(e) {
  if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
  const i = tabs.findIndex((t) => t.id === active.value)
  const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length]
  tabEls[n.id]?.focus()
  active.value = n.id
}

function restart() {
  restarting.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    restarting.value = false
    ago.value = 'Updated just now'
  }, 2200)
}

watch(active, () => nextTick(moveThumb))

onMounted(() => {
  raf = requestAnimationFrame(moveThumb)
  window.addEventListener('resize', moveThumb)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearTimeout(timer)
  window.removeEventListener('resize', moveThumb)
})
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
