<script setup>
import NeuralCanvas from './NeuralCanvas.vue';

defineProps({
  title: { type: String, default: '프로젝트 협력·기술 문의' },
  text: { type: String, default: '연구개발 협력, 데이터 구축, S.S.L.O 시연 요청 등 궁금하신 내용을 남겨 주세요.' },
});
</script>

<template>
  <section class="cta">
    <NeuralCanvas :density="0.7" :opacity="0.85" />
    <div class="container cta__in" v-reveal>
      <div>
        <p class="eyebrow">Let’s build together</p>
        <h2 class="h2 cta__t">{{ title }}</h2>
        <p class="lead">{{ text }}</p>
      </div>
      <div class="cta__btns">
        <RouterLink to="/contact" class="btn btn--primary">문의하기 →</RouterLink>
        <RouterLink to="/sslo" class="btn btn--ghost">S.S.L.O 살펴보기</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative; overflow: hidden; padding: 104px 0; color: #fff;
  background: radial-gradient(60% 120% at 80% 0%, rgb(133 121 243 / 45%), transparent 65%),
    radial-gradient(50% 100% at 0% 100%, rgb(217 100 182 / 28%), transparent 60%), var(--navy-950);
}
.cta__in { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 40px; flex-wrap: wrap; }
.cta .eyebrow { color: #b9b1ff; margin-bottom: 14px; }
.cta__t { color: #fff; }
.cta .lead { margin-top: 14px; color: #b3b8dc; }
.cta__btns { display: flex; gap: 12px; flex-wrap: wrap; }
</style>
