<script setup>
import { ref, computed } from 'vue';
import PageHero from '../components/PageHero.vue';
import CtaBand from '../components/CtaBand.vue';
import VerifyFlag from '../components/VerifyFlag.vue';
import { ChevronDown } from 'lucide-vue-next';
import { projects, projectTypes } from '../data/projects';

const type = ref('all');
const open = ref(null);

const list = computed(() =>
  [...projects]
    .filter((p) => type.value === 'all' || p.type === type.value)
    .sort((a, b) => b.years[0] - a.years[0]),
);

const period = (p) => (p.years.length > 1 && p.years[0] !== p.years[1] ? `${p.years[0]} ~ ${p.years[1]}` : `${p.years[0]}`);
const toggle = (id) => (open.value = open.value === id ? null : id);

// 확정 정보가 아직 없는 필드
const pendingFields = (p) => ['program', 'role', 'client', 'outputs'].filter((k) => !p[k] || (Array.isArray(p[k]) && !p[k].length));
const labels = { program: '사업 구분', role: '티벨 역할', client: '참여·수요기관', outputs: '결과물' };
</script>

<template>
  <PageHero
    eyebrow="Track record"
    title="정부지원사업 및 연구개발 수행실적"
    lead="프로젝트별로 사업명·수행기간·참여기관·티벨의 역할·개발 결과물을 정리합니다. 확정된 자료부터 순서대로 게시합니다."
    :crumbs="['연구개발', '수행실적']"
  />

  <section class="section">
    <div class="container">
      <div class="filter-bar bar">
        <button class="filter-btn" :class="{ 'is-active': type === 'all' }" @click="type = 'all'">전체 {{ projects.length }}</button>
        <button
          v-for="(label, key) in projectTypes"
          :key="key"
          class="filter-btn"
          :class="{ 'is-active': type === key }"
          @click="type = key"
        >
          {{ label }}
        </button>
      </div>

      <ul class="list">
        <li v-for="(p, i) in list" :key="p.id" class="item" v-reveal="Math.min(i, 5) * 50">
          <button class="item__head" :aria-expanded="open === p.id" @click="toggle(p.id)">
            <span class="item__year">{{ period(p) }}</span>
            <span class="item__main">
              <span class="chip">{{ projectTypes[p.type] }}</span>
              <strong class="item__title">{{ p.title }}<VerifyFlag :note="p.verify" /></strong>
              <span v-if="p.client" class="muted small">{{ p.client }}</span>
            </span>
            <ChevronDown class="item__arrow" :class="{ 'is-open': open === p.id }" :size="20" :stroke-width="1.75" aria-hidden="true" />
          </button>

          <div v-show="open === p.id" class="item__body">
            <p>{{ p.summary }}</p>

            <dl class="meta">
              <div v-if="p.program"><dt>사업 구분</dt><dd>{{ p.program }}</dd></div>
              <div v-if="p.client"><dt>참여·수요기관</dt><dd>{{ p.client }}</dd></div>
              <div v-if="p.role"><dt>티벨 역할</dt><dd>{{ p.role }}</dd></div>
              <div v-if="p.outputs?.length">
                <dt>결과물</dt>
                <dd><ul class="dot"><li v-for="o in p.outputs" :key="o">{{ o }}</li></ul></dd>
              </div>
              <div v-if="p.tech?.length">
                <dt>기술 키워드</dt>
                <dd class="tags"><span v-for="t in p.tech" :key="t" class="chip chip--slate">{{ t }}</span></dd>
              </div>
            </dl>

            <p v-if="pendingFields(p).length" class="pending small">
              <strong>상세 정보 준비 중</strong> — {{ pendingFields(p).map((k) => labels[k]).join(' · ') }}은(는) 확정되는 대로 게시합니다.
            </p>
            <p class="muted small">근거: {{ p.source }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <CtaBand title="협력 가능한 과제를 찾고 계신가요?" text="수행 경험과 기술자산을 바탕으로 공동 연구개발·데이터 구축 협력을 논의할 수 있습니다." />
</template>

<style scoped>
.bar { margin-bottom: 32px; }
.list { display: grid; }
.item { border-top: 1px solid var(--line); }
.item:last-child { border-bottom: 1px solid var(--line); }
.item__head { width: 100%; display: grid; grid-template-columns: 130px 1fr 32px; gap: 16px; align-items: center; padding: 24px 8px; border: 0; background: none; text-align: left; }
.item__year { font-weight: 800; font-size: 18px; color: var(--violet-500); letter-spacing: -0.02em; }
.item__main { display: grid; gap: 6px; justify-items: start; }
.item__title { font-size: 18px; line-height: 1.45; letter-spacing: -0.02em; }
.item__arrow { color: var(--muted); justify-self: center; transition: transform 0.2s; }
.item__arrow.is-open { transform: rotate(180deg); color: var(--violet-500); }
.item__body { padding: 4px 8px 28px 154px; display: grid; gap: 18px; color: var(--ink-2); }
.meta { display: grid; gap: 12px; }
.meta > div { display: grid; grid-template-columns: 110px 1fr; gap: 12px; }
.meta dt { font-weight: 700; color: var(--ink); font-size: 14px; }
.dot li { position: relative; padding-left: 14px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 5px; height: 5px; border-radius: 50%; background: var(--violet-500); }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.pending { padding: 14px 18px; }

@media (max-width: 720px) {
  .item__head { grid-template-columns: 1fr 24px; }
  .item__year { grid-column: 1 / -1; }
  .item__body { padding: 0 8px 22px; }
  .meta > div { grid-template-columns: 1fr; gap: 2px; }
}
</style>
