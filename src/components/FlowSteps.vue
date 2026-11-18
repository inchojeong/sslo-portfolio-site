<script setup>
defineProps({
  steps: { type: Array, required: true }, // [{ no, title, text }]
  dark: Boolean,
});
</script>

<template>
  <ol class="flow" :class="{ 'flow--dark': dark }">
    <li v-for="(s, i) in steps" :key="s.title" class="flow__step" v-reveal="i * 90">
      <span class="flow__no">{{ s.no }}</span>
      <h3 class="h3">{{ s.title }}</h3>
      <p>{{ s.text }}</p>
    </li>
  </ol>
</template>

<style scoped>
.flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 40px 56px; }
.flow__step { position: relative; padding-top: 26px; border-top: 1px solid var(--line); }
.flow__step::before { content: ''; position: absolute; left: 0; top: -1px; width: 44px; height: 3px; background: var(--grad); }
.flow--dark .flow__step { border-top-color: var(--glass-line); }
.flow__step:not(:last-child)::after {
  content: '→'; position: absolute; right: -43px; top: -15px; z-index: 2;
  width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; font-size: 14px;
  background: var(--grad); color: #fff; font-weight: 800; box-shadow: 0 6px 16px -4px rgb(133 121 243 / 70%);
}

.flow__no { font-size: 13px; font-weight: 800; letter-spacing: 0.14em; color: var(--violet-500); }
.flow--dark .flow__no { color: #b9b1ff; }
.flow__step h3 { margin: 8px 0 10px; font-size: 21px; }
.flow--dark .flow__step h3 { color: #fff; }
.flow__step p { font-size: 14.5px; color: var(--muted); }
.flow--dark .flow__step p { color: #9ea5cf; }
@media (max-width: 960px) {
  .flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .flow__step:not(:last-child)::after { display: none; }
}
@media (max-width: 560px) { .flow { grid-template-columns: 1fr; } }
</style>
