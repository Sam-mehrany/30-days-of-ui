<template>
  <div class="pricing-toggle">
    <div class="card">
      <div class="toggle-wrap">
        <div class="toggle">
          <div class="thumb" :class="{ annual }"></div>
          <span :class="{ active: !annual }" @click="annual = false">Monthly</span>
          <span :class="{ active: annual }" @click="annual = true">Annual</span>
        </div>
        <div v-if="annual" class="save-badge">Save 20%</div>
      </div>
      <div class="eyebrow">PRO</div>
      <div class="price-row">
        <span class="price">{{ price }}</span>
        <span class="per">/mo</span>
        <span v-if="annual" class="strike">$24</span>
      </div>
      <div class="bill-note">{{ billNote }}</div>
      <div class="divider"></div>
      <ul class="features">
        <li><span class="check">&#10003;</span>Unlimited AI image generations</li>
        <li><span class="check">&#10003;</span>Design-system tokens &amp; export</li>
        <li><span class="check">&#10003;</span>Team workspaces &mdash; up to 5 seats</li>
        <li><span class="check">&#10003;</span>Priority support, same-day replies</li>
      </ul>
      <button class="cta" type="button">Start 14-day free trial</button>
      <div class="reassure">No card required &middot; Cancel anytime</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

// Annual is pre-selected, matching the original design.
const annual = ref(true)

const price = computed(() => (annual.value ? '$19' : '$24'))
const billNote = computed(() =>
  annual.value ? 'billed annually — $228 per year' : 'billed monthly',
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.pricing-toggle {
  box-sizing: border-box;
  width: 1200px;
  height: 675px;
  background: #f5f5f2;
  font-family: 'Inter', -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
}
.pricing-toggle *,
.pricing-toggle *::before,
.pricing-toggle *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.card {
  width: 600px;
  background: #ffffff;
  border-radius: 28px;
  padding: 40px 44px 36px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.08);
}
/* Toggle */
.toggle-wrap {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 34px;
}
.toggle {
  position: relative;
  width: 360px;
  height: 56px;
  background: #e8e8e4;
  border-radius: 999px;
  display: flex;
}
.thumb {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 175px;
  height: 46px;
  background: #ffffff;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transform: translateX(0);
  transition: transform 0.25s ease;
}
.thumb.annual {
  transform: translateX(175px);
}
.toggle span {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: #6b6b66;
  cursor: pointer;
  user-select: none;
}
.toggle span.active {
  font-weight: 600;
  color: #111111;
}
.save-badge {
  position: absolute;
  top: -11px;
  right: 6px;
  z-index: 2;
  background: #111111;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
  letter-spacing: 0.01em;
}
/* Price */
.eyebrow {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #8a8a84;
  margin-bottom: 10px;
}
.price-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 10px;
}
.price {
  font-size: 72px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #111111;
  line-height: 1;
}
.per {
  font-size: 20px;
  font-weight: 500;
  color: #8a8a84;
}
.strike {
  font-size: 20px;
  font-weight: 500;
  color: #b0b0aa;
  text-decoration: line-through;
}
.bill-note {
  text-align: center;
  font-size: 15px;
  color: #8a8a84;
  margin-top: 10px;
}
/* Divider */
.divider {
  height: 1px;
  background: #e5e5e0;
  margin: 28px 0;
}
/* Features */
.features {
  list-style: none;
}
.features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #1a1a18;
  line-height: 1.5;
  margin-bottom: 18px;
}
.features li:last-child {
  margin-bottom: 0;
}
.check {
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #16a34a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}
/* CTA */
.cta {
  margin-top: 30px;
  width: 100%;
  height: 56px;
  background: #111111;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-family: inherit;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
}
.reassure {
  text-align: center;
  font-size: 13px;
  color: #9a9a94;
  margin-top: 14px;
}
</style>
