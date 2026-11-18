<script setup>
import { ref, computed } from 'vue';
import PageHero from '../components/PageHero.vue';
import CtaBand from '../components/CtaBand.vue';
import { history, categories } from '../data/history';

// 보기 모드: core(연구개발 핵심) 또는 카테고리별
const filter = ref('core');
const filters = [
  { id: 'core', label: '연구개발 핵심' },
  { id: 'all', label: '전체 연혁' },
  ...Object.entries(categories).map(([id, c]) => ({ id, label: c.label })),
];

const rows = computed(() =>
  history
    .map((y) => ({
      year: y.year,
      items: y.items.filter((i) => {
        if (filter.value === 'all') return true;
        if (filter.value === 'core') return i.core;
        return i.cat === filter.value;
      }),
    }))
    .filter((y) => y.items.length)
    .reverse(),
);

const total = computed(() => rows.value.reduce((n, r) => n + r.items.length, 0));
</script>

<template>
  <PageHero
    eyebrow="R&D History"
    title="연구개발 연혁"
    lead="2016년 기업부설연구소 설립부터 최근까지 이어진 주요 개발활동을 연도별로 정리했습니다."
    :crumbs="['연구개발', '연구개발 연혁']"
  />

  <section class="section">
    <div class="container">
      <div class="bar">
        <div class="filter-bar" role="tablist" aria-label="연혁 보기 방식">
          <button
            v-for="f in filters"
            :key="f.id"
            class="filter-btn"
            :class="{ 'is-active': filter === f.id }"
            role="tab"
            :aria-selected="filter === f.id"
            @click="filter = f.id"
          >
            {{ f.label }}
          </button>
        </div>
        <p class="muted small">{{ total }}개 항목</p>
      </div>

      <ol class="tl">
        <li v-for="(r, i) in rows" :key="r.year + filter" class="tl__row" v-reveal="Math.min(i, 4) * 60">
          <div class="tl__year">
            <b class="grad-text">{{ r.year }}</b>
          </div>
          <ul class="tl__items">
            <li v-for="it in r.items" :key="it.text" :class="{ 'is-hl': it.highlight }">
              <span class="chip" :class="`chip--${categories[it.cat].color}`">
{{ categories[it.cat].label }}
              </span>
              <span class="tl__text">{{ it.text }}</span>
            </li>
          </ul>
        </li>
      </ol>

      <aside class="note">

        <div>
          <h2 class="h3">상세 이력은 프로젝트 단위로 연결됩니다</h2>
          <p>
            주요 개발 이력은 <RouterLink to="/rnd/projects" class="text-link">수행실적</RouterLink>에서 사업명·수행기간·참여 형태·티벨의
            역할·결과물 기준으로 확인할 수 있습니다.
          </p>
        </div>
      </aside>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
.tl { position: relative; display: grid; gap: 8px; }
.tl::before { content: ''; position: absolute; left: 120px; top: 8px; bottom: 8px; width: 2px; background: linear-gradient(var(--violet-400), var(--line)); }
.tl__row { display: grid; grid-template-columns: 120px 1fr; gap: 0; padding: 18px 0; }
.tl__year { position: relative; }
.tl__year b { font-size: 30px; font-weight: 800; letter-spacing: -0.03em; }
.tl__year::after { content: ''; position: absolute; right: -9px; top: 12px; width: 16px; height: 16px; border-radius: 50%; background: #fff; border: 4px solid var(--violet-500); z-index: 1; }
.tl__items { display: grid; padding-left: 44px; }
.tl__items li { display: flex; align-items: flex-start; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.tl__items li:first-child { padding-top: 6px; }
.tl__items li:last-child { border-bottom: 0; }
.tl__items li.is-hl .tl__text { color: var(--violet-600); }
.tl__items .chip { flex: none; min-width: 150px; justify-content: flex-start; }
.tl__text { font-weight: 600; font-size: 15.5px; }
.note { margin-top: 56px; padding-top: 28px; border-top: 1px solid var(--line); display: flex; align-items: center; gap: 20px; }
.note p { color: var(--ink-2); margin-top: 4px; }

@media (max-width: 720px) {
  .tl::before { left: 8px; }
  .tl__row { grid-template-columns: 1fr; }
  .tl__year { padding-left: 32px; }
  .tl__year::after { left: 0; right: auto; }
  .tl__items { padding-left: 32px; }
  .tl__items li { flex-direction: column; gap: 8px; }
}
</style>
