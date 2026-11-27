<template>
  <div class="ember-onboarding">
    <section
      class="ember"
      aria-roledescription="carousel"
      aria-label="Welcome"
      :data-last="isLast ? '' : null"
      @pointerdown="onPointerDown"
      @pointerup="onPointerUp"
      @pointermove="onPointerMove"
    >
      <header class="ember__top">
        <div class="ember__logo"><i></i>Ember</div>
        <button class="ember__skip" type="button" @click="go(LAST)">Skip</button>
      </header>

      <div class="ember__track" :style="{ transform: `translateX(${-100 * index}%)` }">
        <article
          v-for="(s, n) in SLIDES"
          :key="n"
          class="slide"
          aria-roledescription="slide"
          :aria-label="`${n + 1} of ${SLIDES.length}`"
          :aria-hidden="String(n !== index)"
        >
          <div class="hero">
            <span v-for="c in s.shards" :key="c" class="shard" :class="c"></span>
            <div class="card" :class="{ 'card--solid': s.solid }" :style="tilts[n]">
              <div class="card__row"><span class="card__chip"></span><span class="card__brand">EMBER</span></div>
              <div>
                <div class="card__label">{{ s.label }}</div>
                <div class="card__num">{{ s.num }}<small v-if="s.small">{{ s.small }}</small></div>
              </div>
              <div class="card__pan">{{ s.pan }}</div>
            </div>
          </div>
          <div class="copy"><h2>{{ s.title }}</h2><p>{{ s.body }}</p></div>
        </article>
      </div>

      <footer class="ember__foot">
        <div class="dots" role="tablist" aria-label="Choose slide">
          <button
            v-for="(_, n) in SLIDES"
            :key="n"
            class="dot"
            type="button"
            role="tab"
            :aria-label="`Slide ${n + 1}`"
            :aria-current="String(n === index)"
            @click="go(n)"
          ></button>
        </div>
        <button class="cta" type="button">Get started</button>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

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
]
const LAST = SLIDES.length - 1
const AUTO_ADVANCE_MS = 4500

const index = ref(0)
// Per-slide card tilt; starts from each slide's inline defaults, then follows the pointer.
const tilts = ref(SLIDES.map((s) => s.tilt))
const isLast = computed(() => index.value === LAST)

let timer = null
let x0 = null

function go(n) {
  const k = Math.max(0, Math.min(LAST, n))
  index.value = k
  clearTimeout(timer)
  if (k < LAST) timer = setTimeout(() => go(k + 1), AUTO_ADVANCE_MS)
}

function onPointerDown(e) {
  x0 = e.clientX
}

function onPointerUp(e) {
  if (x0 === null) return
  const dx = e.clientX - x0
  x0 = null
  if (Math.abs(dx) > 40) go(index.value + (dx < 0 ? 1 : -1))
}

// subtle tilt follows the pointer
function onPointerMove(e) {
  const r = e.currentTarget.getBoundingClientRect()
  tilts.value[index.value] = {
    '--tiltY': ((e.clientX - r.left) / r.width - 0.5) * 22 + 'deg',
    '--tiltX': ((e.clientY - r.top) / r.height - 0.5) * -16 + 'deg',
  }
}

function onKey(e) {
  if (e.key === 'ArrowRight') go(index.value + 1)
  if (e.key === 'ArrowLeft') go(index.value - 1)
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  go(0)
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* Wrapper carries the original <body> scaffold (#050505 field, centered) and the tokens. */
.ember-onboarding{
  --field:#101010;          /* page field */
  --field-2:#17161a;        /* card-adjacent surface */
  --accent:#fb592a;         /* card face, logo, shards */
  --accent-hi:#ff5e30;
  --accent-dot:#f55b32;     /* active pagination */
  --dot-idle:#3a3f3c;       /* was #1d2220 (invisible) -> 1.77:1, visible as a non-text mark */
  --title:#ffffff;          /* ~20:1 */
  --body:#a3a09c;           /* was #686868 (3.23:1 FAIL) -> 6.92:1 AA */
  --label:#b4a69e;          /* was #867973 (~4.6 borderline) -> 7.62:1 */
  --on-accent:#1a0c06;      /* dark ink on orange: 5.97:1 (white was 3.20:1 FAIL) */

  /* type scale: numeral 3x body, title 1.9x body */
  --fs-body:14px; --fs-title:26.5px; --fs-num:42px;
  --radius:14px;
  --font:Inter, "Helvetica Neue", Arial, system-ui, sans-serif;
  box-sizing:border-box;min-height:100vh;background:#050505;display:grid;place-items:center;
  font-family:var(--font);-webkit-font-smoothing:antialiased}
.ember-onboarding *,.ember-onboarding *::before,.ember-onboarding *::after{box-sizing:border-box;margin:0;padding:0}

/* ============ Component ============ */
.ember{position:relative;width:390px;height:844px;max-width:100vw;max-height:100vh;overflow:hidden;
  background:radial-gradient(120% 70% at 50% 30%, var(--field-2), var(--field) 70%);
  border-radius:44px;color:var(--title);display:flex;flex-direction:column;user-select:none;touch-action:pan-y}

.ember__top{display:flex;align-items:center;justify-content:space-between;padding:58px 28px 0}
.ember__logo{display:flex;align-items:center;gap:8px;font:700 15px/1 var(--font);letter-spacing:-.01em}
.ember__logo i{width:18px;height:18px;border-radius:5px;background:var(--accent);transform:rotate(45deg) scale(.8)}
.ember__skip{background:none;border:0;color:var(--body);font:500 14px/1 var(--font);cursor:pointer;padding:8px}
.ember__skip:hover{color:var(--title)}

.ember__track{flex:1;display:flex;transition:transform .6s cubic-bezier(.22,.8,.2,1)}
.slide{flex:0 0 100%;display:flex;flex-direction:column;align-items:center;padding:0 32px}

/* --- hero: shards + frosted card --- */
.hero{position:relative;width:100%;height:400px;display:grid;place-items:center;margin-top:12px}
.hero::before{content:"";position:absolute;width:220px;height:150px;left:50%;top:50%;transform:translate(-30%,-55%) rotate(-12deg);border-radius:30px;background:linear-gradient(135deg,var(--accent-hi),#b8350f);filter:blur(8px)}
.shard{position:absolute;background:linear-gradient(140deg,var(--accent-hi),#c23a12 70%,#6b1d07);
  filter:blur(var(--b,0px));opacity:var(--o,1);transform:rotate(var(--r)) translateZ(0);
  border-radius:6px;animation:drift 9s ease-in-out infinite alternate;animation-delay:var(--d,0s)}
@keyframes drift{to{transform:rotate(calc(var(--r) + 8deg)) translate(var(--tx,6px),var(--ty,-10px))}}
.s1{width:120px;height:150px;left:6%;top:16%;--r:-24deg;clip-path:polygon(20% 0,100% 30%,70% 100%,0 70%);--b:2px}
.s2{width:150px;height:110px;right:2%;top:8%;--r:18deg;clip-path:polygon(0 20%,100% 0,85% 100%);--b:6px;--o:.85;--d:-3s;--tx:-8px}
.s3{width:90px;height:90px;right:12%;bottom:8%;--r:40deg;clip-path:polygon(50% 0,100% 100%,0 80%);--b:1px;--d:-5s}
.s4{width:70px;height:100px;left:16%;bottom:6%;--r:-60deg;clip-path:polygon(0 0,100% 40%,30% 100%);--b:10px;--o:.6;--d:-1s}

.card{position:relative;width:270px;aspect-ratio:1.586;border-radius:var(--radius);padding:20px 22px;
  display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;
  background:linear-gradient(135deg,rgba(251,89,42,.42),rgba(251,89,42,.12) 55%,rgba(255,255,255,.04));
  backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.22), inset 0 1px 0 rgba(255,255,255,.45), 0 0 60px rgba(251,89,42,.25);
  transform:perspective(900px) rotateX(var(--tiltX,8deg)) rotateY(var(--tiltY,-10deg));transition:transform .4s ease}
.card::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.18) 45%,transparent 60%);
  transform:translateX(-120%);animation:sheen 5.5s ease-in-out infinite}
@keyframes sheen{55%,100%{transform:translateX(120%)}}
.card__row{display:flex;justify-content:space-between;align-items:center}
.card__chip{width:30px;height:22px;border-radius:5px;background:linear-gradient(135deg,#ffd6c4,#f0a07f);opacity:.85}
.card__brand{font:700 13px/1 var(--font);letter-spacing:.02em;color:#fff}
.card__label{font:500 11px/1 var(--font);letter-spacing:.08em;text-transform:uppercase;color:var(--label);margin-bottom:6px}
.card__num{font:700 var(--fs-num)/1 var(--font);letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.card__num small{font-size:.5em;color:rgba(255,255,255,.7);font-weight:600}
.card__pan{font:500 12px/1 var(--font);letter-spacing:.14em;color:rgba(255,255,255,.75)}

/* solid-accent variant (slide 3): dark ink keeps AA */
.card--solid{background:linear-gradient(135deg,var(--accent-hi),var(--accent) 60%,#e04a1f);color:var(--on-accent);
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.25),0 30px 60px -20px rgba(251,89,42,.55)}
.card--solid .card__brand,.card--solid .card__pan{color:var(--on-accent)}
.card--solid .card__label{color:rgba(26,12,6,.78)}
.card--solid .card__num small{color:rgba(26,12,6,.7)}

/* --- copy --- */
.copy{text-align:center;margin-top:28px;max-width:300px}
.copy h2{font:700 var(--fs-title)/1.15 var(--font);letter-spacing:-.02em;color:var(--title)}
.copy p{margin-top:12px;font:400 var(--fs-body)/1.5 var(--font);color:var(--body)}

/* --- pagination --- */
.ember__foot{padding:0 28px 46px;display:flex;flex-direction:column;align-items:center;gap:26px}
.dots{display:flex;gap:8px}
.dot{width:8px;height:8px;border-radius:99px;border:0;background:var(--dot-idle);cursor:pointer;
  transition:width .45s cubic-bezier(.22,.8,.2,1),background .3s}
.dot[aria-current="true"]{width:26px;background:var(--accent-dot)}
.dot:focus-visible,.ember__skip:focus-visible,.cta:focus-visible{outline:2px solid var(--accent);outline-offset:3px}
.cta{width:100%;height:54px;border-radius:16px;border:0;cursor:pointer;background:var(--accent);color:var(--on-accent);
  font:600 16px/1 var(--font);opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .4s,transform .4s}
.ember[data-last] .cta{opacity:1;transform:none;pointer-events:auto}

@media (prefers-reduced-motion:reduce){.shard,.card::after{animation:none}.ember__track{transition:none}}
</style>
