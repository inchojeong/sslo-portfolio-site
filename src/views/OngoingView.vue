<script setup>
import PageHero from '../components/PageHero.vue';
import CtaBand from '../components/CtaBand.vue';
import { Hourglass } from 'lucide-vue-next';
import { ongoingProjects, ongoingUpdatedAt } from '../data/ongoing';
import { history } from '../data/history';

// 2025년까지의 최근 개발 활동 (진행 현황이 확정되기 전까지 맥락으로 제공)
const recent = history.find((h) => h.year === 2025).items.filter((i) => i.cat === 'rnd');
const statusLabel = { done: '완료', active: '진행 중', todo: '예정' };
</script>

<template>
  <PageHero
    eyebrow="Now in progress"
    title="현재 진행 중인 연구개발"
    lead="2026년 이후 실제 수행 중인 사업과 단계별 개발·실증 현황을 게시합니다."
    :crumbs="['연구개발', '진행 중 연구개발']"
  >
    <p v-if="ongoingUpdatedAt" class="muted small upd">최종 업데이트 {{ ongoingUpdatedAt }}</p>
  </PageHero>

  <section class="section">
    <div class="container">
      <div v-if="ongoingProjects.length" class="list">
        <article v-for="p in ongoingProjects" :key="p.id" class="flat proj" v-reveal>
          <header class="proj__head">
            <div>
              <span class="chip">{{ p.program }}</span>
              <h2 class="h3 proj__t">{{ p.title }}</h2>
              <p class="muted small">{{ p.period }}<template v-if="p.partners?.length"> · {{ p.partners.join(', ') }}</template></p>
            </div>
            <div v-if="p.progress != null" class="proj__pct"><b>{{ p.progress }}</b>%</div>
          </header>
          <p>{{ p.summary }}</p>
          <p v-if="p.role" class="small"><b>티벨의 역할</b> {{ p.role }}</p>
          <div v-if="p.progress != null" class="bar" role="progressbar" :aria-valuenow="p.progress" aria-valuemin="0" aria-valuemax="100">
            <span :style="{ width: p.progress + '%' }" />
          </div>
          <ol v-if="p.milestones?.length" class="ms">
            <li v-for="m in p.milestones" :key="m.label" :class="`is-${m.status}`">
              <i aria-hidden="true" />
              <span>{{ m.label }}</span>
              <em>{{ statusLabel[m.status] }}</em>
            </li>
          </ol>
        </article>
      </div>

      <div v-else class="pending empty" v-reveal>

        <Hourglass class="ico" :size="24" :stroke-width="1.75" aria-hidden="true" />
        <h2 class="h3">진행 현황을 준비하고 있습니다</h2>
        <p>
          2026년 이후 수행 중인 사업의 과제명·사업 구분·참여기관과 단계별 마일스톤은 공개 가능 여부 확인을 마치는 대로 이곳에 게시하고,
          정기적으로 갱신합니다.
        </p>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <h2 class="h2 head">최근 개발 활동 (2025)</h2>
      <ul class="grid grid--flat grid--2">
        <li v-for="r in recent" :key="r.text" class="flat" v-reveal>

          <span class="chip recent__y">2025</span>
          <p class="h3 recent__t">{{ r.text }}</p>
        </li>
      </ul>
      <p class="more"><RouterLink to="/rnd/projects" class="text-link">수행실적에서 더 보기 →</RouterLink></p>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.upd { margin-top: 4px; }
.list { display: grid; gap: 56px; }
.proj { display: grid; gap: 14px; }
.proj__head { display: flex; justify-content: space-between; gap: 20px; }
.proj__t { margin: 10px 0 4px; }
.proj__pct { font-size: 18px; color: var(--muted); }
.proj__pct b { font-size: 40px; color: var(--violet-500); letter-spacing: -0.03em; }
.bar { height: 8px; border-radius: 999px; background: var(--bg-soft); overflow: hidden; }
.bar span { display: block; height: 100%; background: linear-gradient(90deg, var(--violet-500), var(--violet-400)); border-radius: inherit; }
.ms { display: grid; gap: 8px; }
.ms li { display: grid; grid-template-columns: 18px 1fr auto; gap: 12px; align-items: center; font-size: 14.5px; }
.ms i { width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--line); }
.ms .is-done i { background: var(--violet-500); border-color: var(--violet-500); }
.ms .is-active i { border-color: var(--violet-500); box-shadow: 0 0 0 4px var(--violet-100); }
.ms em { font-style: normal; font-size: 12.5px; color: var(--muted); }
.empty { padding: 48px; text-align: center; display: grid; gap: 10px; justify-items: center; }
.empty p { max-width: 56ch; }
.head { margin-bottom: 28px; }
.recent__y { margin-left: 10px; }
.recent__t { margin-top: 12px; font-size: 18px; }
.more { margin-top: 28px; }
</style>
