<script setup>
import NeuralCanvas from './NeuralCanvas.vue';

defineProps({
  eyebrow: String,
  title: { type: String, required: true },
  lead: String,
  crumbs: { type: Array, default: () => [] },
});
</script>

<template>
  <section class="ph">
    <div class="ph__glow" aria-hidden="true" />
    <NeuralCanvas :density="0.6" :opacity="0.7" />
    <div class="ph__fade" aria-hidden="true" />
    <div class="container ph__inner">
      <nav v-if="crumbs.length" class="ph__crumbs" aria-label="현재 위치">
        <RouterLink to="/">홈</RouterLink>
        <template v-for="c in crumbs" :key="c">
          <span aria-hidden="true">/</span><span>{{ c }}</span>
        </template>
      </nav>
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="h1">{{ title }}</h1>
      <p v-if="lead" class="lead">{{ lead }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.ph { position: relative; overflow: hidden; background: var(--navy-950); color: #fff; padding: calc(var(--header-h) + 80px) 0 88px; }
.ph__glow {
  position: absolute; inset: 0;
  background: radial-gradient(55% 90% at 88% 0%, rgb(133 121 243 / 38%), transparent 62%),
    radial-gradient(45% 70% at 0% 100%, rgb(217 100 182 / 24%), transparent 60%),
    radial-gradient(40% 60% at 40% 120%, rgb(53 128 227 / 22%), transparent 60%);
}
.ph__fade { position: absolute; inset: auto 0 0 0; height: 80px; background: linear-gradient(transparent, rgb(5 6 15 / 55%)); pointer-events: none; }
.ph__inner { position: relative; display: grid; gap: 20px; }
.ph .h1 { background: linear-gradient(180deg, #fff 30%, #c9c3ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ph__crumbs { display: flex; gap: 8px; font-size: 13px; color: #8f94bd; }
.ph__crumbs a:hover { color: #fff; }
.ph .lead { color: #b3b8dc; }
</style>
