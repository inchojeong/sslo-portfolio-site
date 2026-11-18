<script setup>
// 흐르는 키워드 줄. items 를 두 번 이어 붙여 끊김 없이 순환합니다.
defineProps({
  items: { type: Array, required: true },
  duration: { type: Number, default: 40 },
  reverse: Boolean,
});
</script>

<template>
  <div class="marquee" :style="{ '--dur': duration + 's' }" aria-hidden="true">
    <div class="marquee__track" :style="{ animationDirection: reverse ? 'reverse' : 'normal' }">
      <span v-for="(it, i) in [...items, ...items]" :key="i" class="m-item">
        <i /> {{ it }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.m-item {
  display: inline-flex; align-items: center; gap: 12px; padding: 12px 26px; border-radius: 999px; white-space: nowrap;
  font-weight: 700; font-size: 17px; color: #dfe2ff; border: 1px solid var(--glass-line); background: var(--glass);
}
.m-item i { width: 8px; height: 8px; border-radius: 50%; background: var(--grad); box-shadow: 0 0 12px rgb(133 121 243 / 90%); }
</style>
