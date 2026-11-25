<template>
  <div class="stage">
    <img class="scene" src="./assets/red-mesa-landscape.webp" alt="" aria-hidden="true" />

    <div class="shade-l"></div>
    <div class="shade-r"></div>
    <div class="shade-b"></div>

    <div class="brand">
      <div class="logo"><span class="n">24</span><span class="w">TWENIFOR</span></div>
      <p class="tag">Reduce waste with us, practice a construction sustainable environment</p>
      <div class="contact">Contact Us:</div>
      <div class="social">
        <a href="#" aria-label="Facebook"
          ><svg viewBox="0 0 16 16">
            <path
              d="M9.2 15V8.8h2.1l.3-2.4H9.2V4.9c0-.7.2-1.1 1.2-1.1h1.3V1.6C11.5 1.6 10.700 1.500 9.900 1.500 8.100 1.500 6.900 2.600 6.900 4.600v1.800H4.800v2.400h2.100V15z"
            /></svg
        ></a>
        <a href="#" aria-label="Instagram"
          ><svg viewBox="0 0 16 16">
            <rect class="s" x="2" y="2" width="12" height="12" rx="3.5" />
            <circle class="s" cx="8" cy="8" r="2.8" />
            <circle cx="11.6" cy="4.4" r=".9" /></svg
        ></a>
        <a href="#" aria-label="X"
          ><svg viewBox="0 0 16 16">
            <path class="s" d="M2.500 2.500 13.500 13.500M13.500 2.500 2.500 13.500" /></svg
        ></a>
        <a href="#" aria-label="LinkedIn"
          ><svg viewBox="0 0 16 16">
            <rect x="2.200" y="6" width="2.600" height="7.800" />
            <circle cx="3.500" cy="3.400" r="1.500" />
            <path
              d="M6.600 6h2.500v1.100c.4-.7 1.300-1.300 2.500-1.300 2.200 0 2.800 1.400 2.800 3.400v4.600h-2.600V9.800c0-1-.2-1.700-1.200-1.700s-1.400.8-1.400 1.700v4H6.600z"
            /></svg
        ></a>
      </div>
    </div>

    <nav class="cols" aria-label="Footer">
      <div class="col">
        <h4>Twenifor</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Buyer</a></li>
          <li><a href="#">Seller</a></li>
          <li><a href="#">Marketplace</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Marketplace</h4>
        <ul>
          <li><a href="#">Materials</a></li>
          <li><a href="#">Machinery &amp; Equipment</a></li>
          <li><a href="#">Tools</a></li>
          <li><a href="#">Systems for concrete</a></li>
          <li><a href="#">Appliances</a></li>
          <li><a href="#">Safety Materials</a></li>
          <li><a href="#">View All</a></li>
        </ul>
      </div>
      <div class="col">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Support</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Career</a></li>
          <li><a href="#">Pricing</a></li>
        </ul>
      </div>
    </nav>

    <div class="bar"><span>© 2026 Twenifor</span><span>Privacy · Terms</span></div>
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
  background: #000;
  flex: none;
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
.scene {
  position: absolute;
  inset: 0;
  width: 1200px;
  height: 675px;
  display: block;
  object-fit: cover;
  object-position: 50% 100%;
}
.shade-l {
  position: absolute;
  left: 0;
  top: 0;
  width: 520px;
  height: 340px;
  background: radial-gradient(ellipse at 20% 30%, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0) 70%);
}
.shade-r {
  position: absolute;
  right: 0;
  top: 0;
  width: 620px;
  height: 380px;
  background: radial-gradient(ellipse at 70% 35%, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 72%);
}
.shade-b {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 70px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
}

.brand {
  position: absolute;
  left: 64px;
  top: 60px;
  width: 400px;
  color: #fff;
}
.logo {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.logo .n {
  font-size: 34px;
  letter-spacing: -0.02em;
}
.logo .w {
  font-size: 20px;
  letter-spacing: 0.22em;
  font-weight: 700;
}
.tag {
  margin-top: 18px;
  font-size: 15px;
  line-height: 1.5;
  color: #d3d6dc;
  max-width: 340px;
}
.contact {
  margin-top: 28px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}
.social {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
.social a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #6b707a;
  display: grid;
  place-items: center;
  text-decoration: none;
}
.social a:hover {
  background: #8a909b;
}
.social svg {
  width: 16px;
  height: 16px;
  fill: #fff;
  stroke: none;
}
.social svg .s {
  fill: none;
  stroke: #fff;
  stroke-width: 1.8;
}

.cols {
  position: absolute;
  right: 64px;
  top: 64px;
  display: flex;
  gap: 44px;
}
.col h4 {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 14px;
  letter-spacing: 0.01em;
}
.col ul {
  list-style: none;
}
.col li {
  margin-bottom: 9px;
}
.col a {
  font-size: 13px;
  color: #cfd2d8;
  text-decoration: none;
  line-height: 1.3;
}
.col a:hover {
  color: #fff;
  text-decoration: underline;
}

.bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  padding: 0 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  font-size: 12px;
  color: #a9adb5;
  background: rgba(0, 0, 0, 0.35);
}
</style>
