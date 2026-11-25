<template>
  <div class="stage">
    <img class="bg" src="./assets/waste-to-worth-bg.webp" alt="" aria-hidden="true" />
    <div class="mark">TWENIFOR</div>

    <div class="hero">
      <div class="num"><b>12,480</b><span>tonnes</span></div>
      <p class="sub">of surplus material reused</p>
      <button class="cta" type="button">List your surplus</button>
    </div>

    <nav class="links" aria-label="Footer">
      <a href="#">Home</a><i>·</i><a href="#">Marketplace</a><i>·</i><a href="#">Resources</a><i>·</i><a href="#">Contact</a>
    </nav>
  </div>
</template>

<script setup>
// Static footer — no reactive state.
</script>

<style scoped>
.stage {
  box-sizing: border-box;
  position: relative;
  width: 1200px;
  height: 675px;
  overflow: hidden;
  flex: none;
  background: #0a0a0c;
  color: #fff;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.stage *,
.stage *::before,
.stage *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.bg {
  position: absolute;
  inset: 0;
  width: 1200px;
  height: 675px;
  display: block;
  object-fit: cover;
  object-position: 50% 50%;
}
.mark {
  position: absolute;
  left: 64px;
  top: 56px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.28em;
}
.hero {
  position: absolute;
  left: 0;
  right: 0;
  top: 128px;
  text-align: center;
}
.num {
  display: inline-flex;
  align-items: baseline;
  gap: 22px;
  line-height: 1;
}
.num b {
  font-size: 200px;
  font-weight: 800;
  letter-spacing: -0.045em;
  font-variant-numeric: tabular-nums;
}
.num span {
  font-size: 72px;
  font-weight: 600;
  letter-spacing: -0.02em;
}
.sub {
  margin-top: 22px;
  font-size: 26px;
  color: #8d8d94;
  letter-spacing: -0.005em;
}
.cta {
  display: inline-block;
  margin-top: 42px;
  padding: 16px 34px;
  border-radius: 999px;
  background: #d01f1f;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;
  border: 0;
  cursor: pointer;
  font-family: inherit;
}
.cta:hover {
  background: #e32b2b;
}
.links {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 13px;
  color: #9a9aa2;
}
.links a {
  color: #a6a6ae;
  text-decoration: none;
}
.links a:hover {
  color: #fff;
}
.links i {
  font-style: normal;
  color: #6a5a5c;
}
</style>
