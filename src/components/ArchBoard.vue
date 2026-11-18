<script setup>
// 시스템 구성도: lanes = [{ title, groups: [{ title?, nodes: [string], chain? }] }]
defineProps({
  lanes: { type: Array, required: true },
});
</script>

<template>
  <div class="ab">
    <section v-for="(l, i) in lanes" :key="l.title" class="ab__lane">
      <h4 class="ab__title">{{ l.title }}</h4>
      <div v-for="(g, gi) in l.groups" :key="gi" class="ab__group" :class="{ 'is-titled': g.title }">
        <p v-if="g.title" class="ab__gt">{{ g.title }}</p>
        <ul class="ab__nodes" :class="{ 'is-chain': g.chain }">
          <li v-for="n in g.nodes" :key="n">{{ n }}</li>
        </ul>
      </div>
      <span v-if="i < lanes.length - 1" class="ab__arrow" aria-hidden="true">→</span>
    </section>
  </div>
</template>

<style scoped>
.ab { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 22px; }
.ab__lane { position: relative; display: grid; align-content: start; gap: 12px; padding: 14px 12px 16px; border-radius: 12px; background: rgb(255 255 255 / 3%); border: 1px solid var(--glass-line); }
.ab__title { font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--violet-300); text-align: center; padding-bottom: 10px; border-bottom: 1px solid var(--glass-line); }
.ab__group.is-titled { padding: 8px; border-radius: 8px; border: 1px dashed rgb(133 121 243 / 40%); }
.ab__gt { font-size: 12px; font-weight: 700; color: #aeb4d8; margin-bottom: 6px; }
.ab__nodes { display: grid; gap: 6px; }
.ab__nodes li { padding: 8px 10px; border-radius: 6px; border: 1px solid var(--glass-line); background: rgb(255 255 255 / 5%); color: #fff; font-size: 13px; font-weight: 600; text-align: center; line-height: 1.35; }
.ab__nodes.is-chain li + li { position: relative; margin-top: 8px; }
.ab__nodes.is-chain li + li::before { content: '↓'; position: absolute; left: 50%; top: -15px; transform: translateX(-50%); font-size: 12px; color: var(--violet-300); }
.ab__arrow { position: absolute; right: -19px; top: 20px; width: 16px; text-align: center; color: var(--violet-300); font-size: 15px; z-index: 1; }
@media (max-width: 1000px) {
  .ab { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ab__arrow { display: none; }
}
@media (max-width: 560px) { .ab { grid-template-columns: 1fr; } }
</style>
