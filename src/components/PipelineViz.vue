<script setup>
// S.S.L.O 자동 라벨링 순환 구조를 보여주는 파이프라인 시각화 (HTML/CSS, 모바일에서는 세로 배치)
defineProps({
  stages: { type: Array, required: true }, // [{ title, sub }]
  feedback: { type: String, default: '검수 완료 데이터가 다시 학습 데이터로 — Active Learning' },
});
</script>

<template>
  <div class="pv">
    <ol class="pv__row">
      <li v-for="(s, i) in stages" :key="s.title" class="pv__node" :style="{ '--i': i }">
        <span class="pv__dot">{{ String(i + 1).padStart(2, '0') }}</span>
        <strong>{{ s.title }}</strong>
        <small>{{ s.sub }}</small>
      </li>
    </ol>
    <div class="pv__loop"><span>{{ feedback }}</span></div>
  </div>
</template>

<style scoped>
.pv { position: relative; padding: 8px 0 0; }
.pv__row { position: relative; display: grid; grid-template-columns: repeat(v-bind('stages.length'), minmax(0, 1fr)); gap: 8px; }
.pv__row::before {
  content: ''; position: absolute; left: 4%; right: 4%; top: 25px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, rgb(53 128 227 / 40%), rgb(133 121 243 / 60%), rgb(217 100 182 / 40%));
}
.pv__row::after {
  content: ''; position: absolute; left: 4%; top: 22px; width: 90px; height: 6px; border-radius: 6px; filter: blur(2px);
  background: linear-gradient(90deg, transparent, #fff, transparent); animation: run 3.6s linear infinite;
}
@keyframes run { from { left: 2%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } to { left: 88%; opacity: 0; } }
.pv__node { position: relative; z-index: 1; display: grid; justify-items: center; text-align: center; gap: 6px; padding: 0 4px; }
.pv__dot {
  position: relative; width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center;
  background: var(--navy-900); border: 2px solid var(--violet-400); color: #fff; font-weight: 800; font-size: 15px; letter-spacing: 0.04em; font-variant-numeric: tabular-nums;
  box-shadow: 0 0 0 6px rgb(133 121 243 / 14%), 0 0 28px rgb(133 121 243 / 55%);
  animation: glow 3.6s ease-in-out infinite; animation-delay: calc(var(--i) * 0.5s);
}
@keyframes glow { 50% { box-shadow: 0 0 0 10px rgb(217 100 182 / 16%), 0 0 40px rgb(217 100 182 / 70%); border-color: var(--pink); } }
.pv__node strong { margin-top: 8px; color: #fff; font-size: 16px; line-height: 1.3; }
.pv__node small { color: #9ea5cf; font-size: 12.5px; line-height: 1.4; }
.pv__loop {
  position: relative; margin: 34px 6% 0; height: 54px; border: 2px dashed rgb(133 121 243 / 55%); border-top: 0;
  border-radius: 0 0 28px 28px; display: grid; place-items: end center;
}
.pv__loop span { transform: translateY(50%); padding: 4px 16px; background: var(--navy-900); color: #b9b1ff; font-size: 13px; font-weight: 600; border-radius: 999px; border: 1px solid rgb(133 121 243 / 40%); }

@media (max-width: 820px) {
  .pv__row { grid-template-columns: 1fr; gap: 22px; }
  .pv__row::after { display: none; }
  .pv__row::before { left: 25px; right: auto; top: 20px; bottom: 20px; width: 2px; height: auto; }
  .pv__node { grid-template-columns: 52px 1fr; justify-items: start; text-align: left; column-gap: 18px; align-items: center; }
  .pv__node strong { margin: 0; grid-column: 2; }
  .pv__node small { grid-column: 2; }
  .pv__dot { grid-row: span 2; }
  .pv__loop { margin: 30px 0 0; }
}
</style>
