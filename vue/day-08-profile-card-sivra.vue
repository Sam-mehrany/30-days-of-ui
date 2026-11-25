<template>
  <div class="sivra-profile-card">
    <div class="stage">
      <div class="card">
        <div class="banner">
          <h1>SIVRA<br />BUSINESS<br />SOLUTION</h1>
        </div>
        <div class="logo">S</div>
        <div class="bio">
          <div>
            <div class="name">
              sivra
              <svg width="18" height="18" viewBox="0 0 18 18" aria-label="Verified">
                <circle cx="9" cy="9" r="9" fill="#0059F2" />
                <path
                  d="M5.2 9.3l2.5 2.5 5-5.3"
                  fill="none"
                  stroke="#FFFFFF"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="handle">@sivra</div>
            <div class="line">Business solutions, built to scale.</div>
          </div>
          <button
            class="btn"
            :class="{ following }"
            type="button"
            @click="following = !following"
          >
            {{ following ? 'Following' : 'Follow' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const following = ref(false)
</script>

<style scoped>
.sivra-profile-card {
  box-sizing: border-box;
  width: 1200px;
  height: 675px;
  background: #000000;
  overflow: hidden;
  font-family:
    -apple-system, 'Helvetica Neue', 'Segoe UI', Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.sivra-profile-card *,
.sivra-profile-card *::before,
.sivra-profile-card *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.stage {
  position: relative;
  width: 1200px;
  height: 675px;
  background: #000000;
}
.card {
  position: absolute;
  left: 260px;
  top: 168px;
  width: 680px;
  height: 340px;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 30px;
  box-shadow: none;
}
.banner {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 190px;
  border-radius: 29px 29px 0 0;
  background-color: #cedbfe;
  background-image: url('./assets/sivra-banner.webp');
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
  padding: 28px;
  overflow: hidden;
}
.banner h1 {
  font-size: 30px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.15;
  color: #000000;
}
.logo {
  position: absolute;
  left: 28px;
  top: 158px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #0059f2;
  border: 4px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 30px;
  line-height: 1;
}
.bio {
  position: absolute;
  left: 0;
  top: 190px;
  width: 100%;
  height: 150px;
  padding: 52px 28px 26px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.name {
  display: flex;
  align-items: center;
  gap: 7px;
  font-size: 19px;
  font-weight: 500;
  color: #161616;
  line-height: 1.2;
}
.handle {
  font-size: 14px;
  color: #6e6e6e;
  margin-top: 4px;
  line-height: 1.3;
}
.line {
  font-size: 16px;
  color: #161616;
  margin-top: 12px;
  line-height: 1.4;
}
.btn {
  height: 46px;
  padding: 0 28px;
  border: 0;
  border-radius: 999px;
  background: #000000;
  color: #ffffff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}
.btn.following {
  background: #f0f0f0;
  color: #161616;
}
</style>
