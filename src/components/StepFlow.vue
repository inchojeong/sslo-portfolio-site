<script setup>
// 순서도: steps = [{ label, sub } | { tag, branches: [[node, node], [node]] }]
// 병렬 구간(branches)은 세로로 쌓고, 각 branch 안의 노드는 › 로 이어집니다.
defineProps({
  steps: { type: Array, required: true },
});
</script>

<template>
  <ol class="sf">
    <li v-for="(s, i) in steps" :key="i" class="sf__cell">
      <div v-if="s.branches" class="sf__par">
        <span v-if="s.tag" class="sf__tag">{{ s.tag }}</span>
        <div v-for="(b, bi) in s.branches" :key="bi" class="sf__branch">
          <template v-for="(n, ni) in b" :key="ni">
            <span v-if="ni" class="sf__sep" aria-hidden="true">›</span>
            <span class="sf__node"><b>{{ n.label }}</b><small v-if="n.sub">{{ n.sub }}</small></span>
          </template>
        </div>
      </div>
      <span v-else class="sf__node"><b>{{ s.label }}</b><small v-if="s.sub">{{ s.sub }}</small></span>
      <span v-if="i < steps.length - 1" class="sf__arrow" aria-hidden="true">→</span>
    </li>
  </ol>
</template>

<style scoped>
.sf { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 6px; }
.sf__cell { display: flex; align-items: center; gap: 6px; }
.sf__node { display: grid; gap: 2px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--glass-line); background: rgb(255 255 255 / 4%); color: #fff; min-width: 96px; }
.sf__node b { font-size: 13.5px; font-weight: 700; line-height: 1.35; }
.sf__node small { font-size: 11.5px; color: #9ea5cf; line-height: 1.35; }
.sf__arrow { color: var(--violet-300); font-size: 15px; padding: 0 2px; }
.sf__par { display: grid; gap: 6px; padding: 10px; border-radius: 10px; border: 1px dashed rgb(133 121 243 / 45%); }
.sf__tag { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--violet-300); }
.sf__branch { display: flex; align-items: center; gap: 6px; }
.sf__sep { color: var(--violet-300); }
@media (max-width: 720px) {
  .sf { flex-direction: column; align-items: stretch; }
  .sf__cell { flex-direction: column; align-items: stretch; }
  .sf__arrow { align-self: center; transform: rotate(90deg); }
  .sf__branch { flex-wrap: wrap; }
}
</style>
