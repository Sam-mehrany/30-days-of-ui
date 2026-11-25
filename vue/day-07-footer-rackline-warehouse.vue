<template>
  <div class="rackline-footer">
    <div class="stage">
      <img class="bg" src="./assets/rackline-warehouse.webp" alt="" />
      <footer class="card">
        <div class="top">
          <div class="brand">
            <div class="logo">
              <div class="mark">R</div>
              <div class="word">RACKLINE</div>
            </div>
            <div class="tag">Warehouse Shelving Systems</div>
          </div>
          <div class="cols">
            <div class="col">
              <h4>Products</h4>
              <ul>
                <li><a href="#">Selective Pallet Racking</a></li>
                <li><a href="#">Cantilever Racking</a></li>
                <li><a href="#">Mezzanine Floors</a></li>
                <li><a href="#">Longspan Shelving</a></li>
              </ul>
            </div>
            <div class="col">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Projects</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div class="col">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Installation</a></li>
                <li><a href="#">Safety Inspections</a></li>
                <li><a href="#">Spare Parts</a></li>
                <li><a href="#">Downloads</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="rule"></div>
        <div class="bot">
          <div class="copy">© 2026 RACKLINE. All Rights Reserved</div>
          <div class="socs">
            <a class="soc" href="#" aria-label="Facebook"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.7c0-.9.3-1.4 1.5-1.4h1.5V4.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.2H8v3h2.6V21z"
                  fill="currentColor"
                  stroke="none"
                /></svg
            ></a>
            <a class="soc" href="#" aria-label="X"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 5l14 14M19 5L5 19" /></svg
            ></a>
            <a class="soc" href="#" aria-label="Instagram"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="5" y="5" width="14" height="14" rx="4" />
                <circle cx="12" cy="12" r="3.3" />
                <circle cx="16.2" cy="7.8" r=".6" fill="currentColor" /></svg
            ></a>
            <a class="soc" href="#" aria-label="LinkedIn"
              ><svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7.5 10v7M7.5 7v.1M11 17v-7M11 13c0-2 1.3-3 2.8-3s2.2 1 2.2 2.8V17" /></svg
            ></a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
// Static footer — no reactive state.
</script>

<style scoped>
.rackline-footer {
  box-sizing: border-box;
  background: #1a1410;
  font-family:
    -apple-system, 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif;
  min-height: 100vh;
}
.rackline-footer *,
.rackline-footer *::before,
.rackline-footer *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.stage {
  position: relative;
  width: 1200px;
  height: 675px;
  overflow: hidden;
}
.bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card {
  position: absolute;
  top: 88px;
  left: 64px;
  right: 64px;
  height: 300px;
  background: #fff;
  border-radius: 24px;
  box-shadow:
    0 40px 90px rgba(60, 30, 5, 0.45),
    0 12px 28px rgba(60, 30, 5, 0.2);
  padding: 36px 44px 0;
  color: #16130f;
}
.top {
  display: flex;
  justify-content: space-between;
  height: 178px;
}
.brand {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.mark {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #e8590c;
  color: #fff;
  font-weight: 800;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.word {
  font-size: 25px;
  font-weight: 800;
  letter-spacing: 0.14em;
  color: #16130f;
}
.tag {
  font-size: 13px;
  color: #6b6760;
}
.cols {
  display: flex;
  gap: 56px;
}
h4 {
  font-size: 15px;
  font-weight: 600;
  color: #16130f;
  margin-bottom: 14px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
a {
  text-decoration: none;
}
li a {
  font-size: 13px;
  color: #6b6760;
  transition: color 0.15s;
}
li a:hover {
  color: #e8590c;
}
.rule {
  height: 1px;
  background: #e6e2dc;
}
.bot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 84px;
}
.copy {
  font-size: 12.5px;
  color: #6b6760;
}
.socs {
  display: flex;
  gap: 10px;
}
.soc {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid #16130f;
  color: #16130f;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.15s,
    border-color 0.15s;
}
.soc:hover {
  color: #e8590c;
  border-color: #e8590c;
}
</style>
