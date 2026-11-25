<template>
  <div class="stage">
    <img class="bg" src="./assets/honk-dunes.webp" alt="" />
    <footer class="card">
      <div class="top">
        <div class="brand">
          <div class="mark">H</div>
          <div class="word">HONK!</div>
        </div>
        <nav class="cols">
          <div class="col">
            <h4>Explore</h4>
            <ul>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">User Stories</a></li>
            </ul>
          </div>
          <div class="col">
            <h4>App</h4>
            <ul>
              <li><a href="#">Download For IOS</a></li>
              <li><a href="#">Download For Android</a></li>
            </ul>
          </div>
          <div class="col">
            <h4>Legal Pages</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="divider"></div>
      <div class="bottom">
        <div class="copy">© 2026 HONK! All Rights Reserved</div>
        <div class="social">
          <a href="#" aria-label="Facebook"
            ><svg viewBox="0 0 24 24">
              <path
                d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.700 2.200 15.700 2 14.600 2 12.100 2 10.500 3.500 10.500 6.200v2.300H8v3.500h2.500V22H14v-10h2.600l.4-3.500z"
              /></svg
          ></a>
          <a href="#" aria-label="X"
            ><svg viewBox="0 0 24 24">
              <path
                d="M17.800 3h3l-6.600 7.500L22 21h-6.100l-4.800-6.200L5.600 21h-3l7-8L2.200 3h6.200l4.300 5.700zm-1 16.200h1.700L7.500 4.700H5.700z"
              /></svg
          ></a>
          <a href="#" aria-label="Instagram"
            ><svg class="st" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.500" cy="6.500" r=".8" fill="currentColor" /></svg
          ></a>
          <a href="#" aria-label="LinkedIn"
            ><svg viewBox="0 0 24 24">
              <path
                d="M4.500 9H8v11H4.500zM6.300 3.500a2 2 0 110 4 2 2 0 010-4zM10 9h3.300v1.500c.5-.9 1.700-1.800 3.400-1.800 3.500 0 4.100 2.300 4.100 5.300V20h-3.500v-5.300c0-1.300 0-2.900-1.800-2.900s-2 1.400-2 2.800V20H10z"
              /></svg
          ></a>
        </div>
      </div>
    </footer>
    <img class="fg" src="./assets/honk-dunes.webp" alt="" />
  </div>
</template>

<script setup>
// Static footer — no reactive state.
// The same dunes image is used twice, as in the original: once as the full
// background (.bg) and once as the masked foreground (.fg) that rises over
// the card's bottom corners.
</script>

<style scoped>
.stage {
  box-sizing: border-box;
  position: relative;
  width: 1200px;
  height: 675px;
  overflow: hidden;
  flex: none;
  background: #c8591f;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif;
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
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.fg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 2;
  pointer-events: none;
  -webkit-mask-image:
    radial-gradient(ellipse 70% 68% at 0% 98%, #000 30%, transparent 70%),
    radial-gradient(ellipse 70% 68% at 100% 98%, #000 30%, transparent 70%);
  mask-image:
    radial-gradient(ellipse 70% 68% at 0% 98%, #000 30%, transparent 70%),
    radial-gradient(ellipse 70% 68% at 100% 98%, #000 30%, transparent 70%);
}
.card {
  position: absolute;
  z-index: 1;
  top: 88px;
  left: 64px;
  right: 64px;
  height: 300px;
  background: #fff;
  border-radius: 24px;
  box-shadow:
    0 40px 90px rgba(90, 35, 5, 0.42),
    0 12px 28px rgba(90, 35, 5, 0.2),
    0 2px 8px rgba(90, 35, 5, 0.12);
  padding: 40px 48px 0;
  display: flex;
  flex-direction: column;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.mark {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #f26a1b;
  color: #fff;
  font-weight: 800;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word {
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.02em;
  color: #1a1612;
}
.cols {
  display: flex;
  gap: 72px;
}
.col h4 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1612;
  margin-bottom: 16px;
}
.col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.col a {
  font-size: 13px;
  color: #7a746e;
  text-decoration: none;
}
.col a:hover {
  color: #f26a1b;
}
.divider {
  height: 1px;
  background: #ece7e2;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 72px;
}
.copy {
  font-size: 12.5px;
  color: #8a847e;
}
.social {
  display: flex;
  gap: 10px;
}
.social a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid #1a1612;
  color: #1a1612;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.15s;
}
.social a:hover {
  background: #1a1612;
  color: #fff;
}
.social svg {
  width: 15px;
  height: 15px;
  fill: currentColor;
}
.social svg.st {
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}
</style>
