<script setup>
// 가공 방식 설명용 모식도: 원본 → 라벨 적용 (이미지 사용권 문제 없이 직접 그린 단순 도형)
defineProps({
  kind: { type: String, required: true }, // box | polygon | keypoint | segmentation
});
</script>

<template>
  <svg class="as" viewBox="0 0 240 100" role="img" :aria-label="`${kind} 가공 전후 모식도`">
    <rect x="2" y="2" width="108" height="96" rx="8" class="as__bg" />
    <rect x="130" y="2" width="108" height="96" rx="8" class="as__bg" />
    <path d="M113 50h14m-5-4 5 4-5 4" class="as__arrow" />

    <!-- 원본 -->
    <g v-if="kind !== 'keypoint'" class="as__subject">
      <path d="M32 60 L42 40 H68 L78 60 Z" />
      <rect x="22" y="58" width="66" height="20" rx="7" />
      <circle cx="38" cy="80" r="7" class="as__wheel" />
      <circle cx="72" cy="80" r="7" class="as__wheel" />
    </g>
    <g v-else class="as__subject">
      <circle cx="56" cy="26" r="9" />
      <rect x="45" y="38" width="22" height="28" rx="9" />
      <rect x="46" y="62" width="8" height="28" rx="3" />
      <rect x="58" y="62" width="8" height="28" rx="3" />
    </g>

    <!-- 라벨 적용 -->
    <g transform="translate(128 0)">
      <template v-if="kind === 'box'">
        <g class="as__subject">
          <path d="M32 60 L42 40 H68 L78 60 Z" /><rect x="22" y="58" width="66" height="20" rx="7" />
          <circle cx="38" cy="80" r="7" class="as__wheel" /><circle cx="72" cy="80" r="7" class="as__wheel" />
        </g>
        <rect x="16" y="32" width="78" height="56" class="as__box" />
        <g class="as__dot"><rect x="13" y="29" width="6" height="6" /><rect x="91" y="29" width="6" height="6" /><rect x="13" y="85" width="6" height="6" /><rect x="91" y="85" width="6" height="6" /></g>
      </template>
      <template v-else-if="kind === 'polygon'">
        <g class="as__subject">
          <path d="M32 60 L42 40 H68 L78 60 Z" /><rect x="22" y="58" width="66" height="20" rx="7" />
          <circle cx="38" cy="80" r="7" class="as__wheel" /><circle cx="72" cy="80" r="7" class="as__wheel" />
        </g>
        <polygon points="20,66 32,60 42,38 68,38 78,60 90,66 92,82 82,88 28,88 18,80" class="as__poly" />
        <g class="as__dot as__dot--c"><circle cx="20" cy="66" r="3" /><circle cx="32" cy="60" r="3" /><circle cx="42" cy="38" r="3" /><circle cx="68" cy="38" r="3" /><circle cx="78" cy="60" r="3" /><circle cx="90" cy="66" r="3" /><circle cx="92" cy="82" r="3" /><circle cx="82" cy="88" r="3" /><circle cx="28" cy="88" r="3" /><circle cx="18" cy="80" r="3" /></g>
      </template>
      <template v-else-if="kind === 'segmentation'">
        <g class="as__mask">
          <path d="M32 60 L42 40 H68 L78 60 Z" /><rect x="22" y="58" width="66" height="20" rx="7" />
          <circle cx="38" cy="80" r="7" /><circle cx="72" cy="80" r="7" />
        </g>
      </template>
      <template v-else>
        <g class="as__subject">
          <circle cx="56" cy="26" r="9" /><rect x="45" y="38" width="22" height="28" rx="9" />
          <rect x="46" y="62" width="8" height="28" rx="3" /><rect x="58" y="62" width="8" height="28" rx="3" />
        </g>
        <g class="as__line"><path d="M56 26V42M56 42 44 46M56 42 68 46M44 46 38 58M68 46 74 58M56 42V64M56 64 50 78M56 64 62 78M50 78 50 90M62 78 62 90" /></g>
        <g class="as__dot as__dot--c"><circle cx="56" cy="26" r="3" /><circle cx="56" cy="42" r="3" /><circle cx="44" cy="46" r="3" /><circle cx="68" cy="46" r="3" /><circle cx="38" cy="58" r="3" /><circle cx="74" cy="58" r="3" /><circle cx="56" cy="64" r="3" /><circle cx="50" cy="78" r="3" /><circle cx="62" cy="78" r="3" /><circle cx="50" cy="90" r="3" /><circle cx="62" cy="90" r="3" /></g>
      </template>
    </g>
  </svg>
</template>

<style scoped>
.as { width: 100%; height: auto; display: block; }
.as__bg { fill: #f3f2fc; stroke: #e4e3f2; }
.as__arrow { fill: none; stroke: #8579f3; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.as__subject { fill: #bcb9d9; }
.as__subject .as__wheel { fill: #8f8bb3; }
.as__box { fill: rgb(106 91 230 / 8%); stroke: #6a5be6; stroke-width: 1.6; stroke-dasharray: 4 3; }
.as__poly { fill: rgb(106 91 230 / 14%); stroke: #6a5be6; stroke-width: 1.6; }
.as__dot { fill: #6a5be6; }
.as__dot--c circle { stroke: #fff; stroke-width: 1; }
.as__mask { fill: rgb(106 91 230 / 62%); }
.as__line { fill: none; stroke: #6a5be6; stroke-width: 1.6; stroke-linecap: round; }
</style>
