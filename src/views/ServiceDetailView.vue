<script setup>
import { computed } from 'vue';
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import PipelineViz from '../components/PipelineViz.vue';
import StepFlow from '../components/StepFlow.vue';
import AnnotationSample from '../components/AnnotationSample.vue';
import VerifyFlag from '../components/VerifyFlag.vue';
import CtaBand from '../components/CtaBand.vue';
import { services, details, proofs } from '../data/services';
import { projects, projectTypes } from '../data/projects';
import { cases, deepDives } from '../data/cases';
import { dashboard, modelSupport, pipelineStages } from '../data/sslo';

const props = defineProps({ slug: { type: String, required: true } });

const service = computed(() => services.find((s) => s.slug === props.slug));
const detail = computed(() => details[props.slug]);
const others = computed(() => services.filter((s) => s.slug !== props.slug));

const toneClass = (t) => (t === 'dark' ? 'section--dark' : t === 'soft' ? 'section--soft' : '');

const annotations = [
  { kind: 'box', title: 'Bounding Box', text: '객체를 감싸는 사각형으로 위치와 크기를 지정합니다. 객체 탐지 모델 학습에 쓰입니다.' },
  { kind: 'polygon', title: 'Polygon', text: '객체의 외곽선을 따라 점을 찍어 형태를 정밀하게 지정합니다.' },
  { kind: 'keypoint', title: 'Keypoint', text: '사람·동물의 관절 등 특정 지점을 점으로 표시해 자세와 동작을 파악합니다.' },
  { kind: 'segmentation', title: 'Segmentation', text: '객체 영역을 픽셀 단위로 구분합니다. 이미지 분할 모델 학습에 쓰입니다.' },
];

const years = (p) => (p.years.length > 1 ? `${p.years[0]}~${p.years[1]}` : `${p.years[0]}`);
const project = (id) => projects.find((p) => p.id === id);
const flowOf = (it) => {
  if (it.deepDive) return deepDives.find((d) => d.id === it.deepDive).flow.map((s) => ({ label: s.text }));
  return (it.flow || []).map((label) => ({ label }));
};

const relatedProofs = computed(() =>
  proofs
    .filter((p) => p.services.includes(props.slug))
    .map((p) => {
      const pr = p.projectId ? project(p.projectId) : null;
      return { ...p, pr, period: pr ? years(pr) : p.years, verify: p.verify || pr?.verify };
    }),
);
</script>

<template>
  <template v-if="service && detail">
    <PageHero :eyebrow="service.eyebrow" :title="service.name" :lead="service.lead" :crumbs="['AI 서비스', service.name]">
      <p class="intro">{{ detail.intro }}</p>
    </PageHero>

    <section v-for="(s, si) in detail.sections" :key="si" class="section" :class="toneClass(s.tone)">
      <div class="container">
        <!-- 데이터 유형 + 모델 유형 -->
        <template v-if="s.type === 'types'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <p class="tags types"><span v-for="t in s.dataTypes" :key="t" class="chip chip--violet">{{ t }}</span></p>
          <div class="grid grid--flat grid--4">
            <article v-for="(m, i) in modelSupport" :key="m.title" class="flat" v-reveal="i * 70">
              <h3 class="h3">{{ m.title }}</h3>
              <p class="chip chip--violet badge">{{ m.targets }}</p>
              <p class="muted small">{{ m.text }}</p>
            </article>
          </div>
        </template>

        <!-- 단계 -->
        <template v-else-if="s.type === 'steps'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <ol class="steps" :class="`steps--${s.items.length}`">
            <li v-for="(it, i) in s.items" :key="it.title" v-reveal="i * 60">
              <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="h3">{{ it.title }}</h3>
              <p>{{ it.text }}</p>
            </li>
          </ol>
        </template>

        <!-- 가공 방식 -->
        <template v-else-if="s.type === 'annotation'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <div class="grid grid--flat grid--4">
            <article v-for="(a, i) in annotations" :key="a.kind" class="flat" v-reveal="i * 70">
              <AnnotationSample :kind="a.kind" />
              <h3 class="h3 ann__t">{{ a.title }}</h3>
              <p class="muted small">{{ a.text }}</p>
            </article>
          </div>
        </template>

        <!-- S.S.L.O 활용 -->
        <template v-else-if="s.type === 'ssloUse'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <div class="grid grid--flat grid--4">
            <article v-for="(it, i) in s.items" :key="it.title" class="flat" v-reveal="i * 70">
              <h3 class="h3">{{ it.title }}</h3>
              <p class="dim">{{ it.text }}</p>
            </article>
          </div>
          <p class="more"><RouterLink to="/sslo" class="text-link">S.S.L.O 솔루션 자세히 보기 →</RouterLink></p>
        </template>

        <!-- 구축 적용 사례 -->
        <template v-else-if="s.type === 'domains'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <ul class="rows domains">
            <li v-for="c in cases" :key="c.id" v-reveal>
              <span class="domains__d">{{ c.domain }}</span>
              <span class="domains__t">{{ c.title }}</span>
              <span class="tags"><span v-for="l in c.labels" :key="l" class="chip chip--blue">{{ l }}</span></span>
            </li>
          </ul>
          <p class="more"><RouterLink to="/cases" class="text-link">분야별 사례 전체 보기 →</RouterLink></p>
        </template>

        <!-- 분석 근거: 기존 대시보드 데이터 -->
        <template v-else-if="s.type === 'monitoring'">
          <SectionHead eyebrow="Evidence" :title="dashboard.title" :lead="dashboard.text" />
          <div class="grid grid--flat grid--2">
            <article v-for="g in dashboard.groups" :key="g.title" class="flat" v-reveal>
              <h3 class="h3">{{ g.title }}</h3>
              <ul class="dot">
                <li v-for="it in g.items" :key="it">{{ it }}</li>
              </ul>
            </article>
          </div>
          <div class="grid grid--flat grid--3 effects">
            <article v-for="(e, i) in dashboard.effects" :key="e.title" class="flat" v-reveal="i * 80">
              <h3 class="h3">{{ e.title }}</h3>
              <p class="dim">{{ e.text }}</p>
            </article>
          </div>
        </template>

        <!-- 비교표 -->
        <template v-else-if="s.type === 'compare'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" />
          <div class="tbl-wrap" v-reveal>
            <table class="tbl">
              <thead>
                <tr><th scope="col"><span class="sr">구분</span></th><th v-for="c in s.cols" :key="c" scope="col">{{ c }}</th></tr>
              </thead>
              <tbody>
                <tr v-for="r in s.rows" :key="r.label">
                  <th scope="row">{{ r.label }}</th>
                  <td v-for="(v, i) in r.values" :key="i">{{ v }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>

        <!-- 계층 -->
        <template v-else-if="s.type === 'layers'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <ol class="layers">
            <li v-for="(it, i) in s.items" :key="it.title" v-reveal="i * 80">
              <span class="no">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="h3">{{ it.title }}</h3>
              <p>{{ it.text }}</p>
            </li>
          </ol>
        </template>

        <!-- 항목 카드 -->
        <template v-else-if="s.type === 'grid'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <div class="grid grid--flat" :class="`grid--${s.cols}`">
            <article v-for="(it, i) in s.items" :key="it.title" class="flat" v-reveal="i * 60">
              <h3 class="h3">{{ it.title }}</h3>
              <p class="muted">{{ it.text }}</p>
            </article>
          </div>
        </template>

        <!-- 시스템 구성 사례 -->
        <template v-else-if="s.type === 'cases'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <div class="cases">
            <article v-for="it in s.items" :key="it.title" class="flat" v-reveal>
              <h3 class="h3">{{ it.title }}<VerifyFlag :note="it.verify" /></h3>
              <p class="dim">{{ it.text }}</p>
              <p v-if="it.projectId && project(it.projectId)?.tech" class="tags">
                <span v-for="t in project(it.projectId).tech" :key="t" class="chip">{{ t }}</span>
              </p>
              <div class="cases__flow"><StepFlow :steps="flowOf(it)" /></div>
            </article>
          </div>
        </template>

        <!-- S.S.L.O 순환 -->
        <template v-else-if="s.type === 'loop'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <PipelineViz :stages="pipelineStages" />
          <p class="more"><RouterLink to="/sslo" class="text-link">S.S.L.O 솔루션 자세히 보기 →</RouterLink></p>
        </template>

        <!-- 구현기술 vs 연구개발 -->
        <template v-else-if="s.type === 'tracks'">
          <SectionHead :eyebrow="s.eyebrow" :title="s.title" :lead="s.lead" />
          <div class="grid grid--flat grid--2">
            <article v-for="c in s.columns" :key="c.title" class="flat" v-reveal>
              <h3 class="h3">{{ c.title }}<VerifyFlag v-if="c.title.startsWith('대표')" :note="s.verify" /></h3>
              <ul class="dot">
                <li v-for="it in c.items" :key="it">{{ it }}</li>
              </ul>
            </article>
          </div>
        </template>
      </div>
    </section>

    <!-- 관련 수행 사례 -->
    <section class="section section--soft">
      <div class="container">
        <SectionHead eyebrow="Proof & portfolio" title="관련 수행 사례" lead="무슨 데이터를 다뤘고, 어떤 시스템을 만들었으며, 티벨이 어떤 역할을 맡았는지 수행 사례로 확인할 수 있습니다." />
        <div class="grid grid--flat grid--2">
          <article v-for="p in relatedProofs" :key="p.id" class="flat proof" v-reveal>
            <p class="proof__meta">
              <span v-if="p.period">{{ p.period }}</span>
              <span v-if="p.pr?.client">{{ p.pr.client }}</span>
              <span v-if="p.pr" class="chip chip--slate">{{ projectTypes[p.pr.type] }}</span>
            </p>
            <h3 class="h3">{{ p.title }}<VerifyFlag :note="p.verify" /></h3>
            <p class="muted">{{ p.focus }}</p>
            <p v-if="p.pr?.outputs" class="tags"><span v-for="o in p.pr.outputs.filter((x) => !x.startsWith('특허'))" :key="o" class="chip chip--violet">{{ o }}</span></p>
            <RouterLink :to="p.to" class="text-link">자세히 보기 →</RouterLink>
          </article>
        </div>

        <nav class="others" aria-label="다른 AI 서비스">
          <p class="others__t">다른 AI 서비스</p>
          <RouterLink v-for="o in others" :key="o.slug" :to="`/services/${o.slug}`" class="others__a">
            <small>{{ o.eyebrow }}</small><b>{{ o.name }}</b>
          </RouterLink>
        </nav>
      </div>
    </section>

    <CtaBand
      :title="`${service.name}, 상담해 보세요`"
      text="보유한 데이터와 목표를 알려 주시면 수행 범위와 진행 방식을 제안해 드립니다."
    />
  </template>
</template>

<style scoped>
.intro { max-width: 70ch; color: #b3b8dc; font-size: 16px; }
.dim { color: #9ea5cf; font-size: 14.5px; margin-top: 8px; }
.badge { margin: 12px 0; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.types { margin: 0 0 40px; }
.more { margin-top: 36px; }
.effects { margin-top: 56px; }
.dot { display: grid; gap: 10px; margin-top: 14px; }
.dot li { position: relative; padding-left: 16px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 6px; height: 6px; border-radius: 50%; background: var(--violet-400); }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }

.no { display: inline-grid; place-items: center; min-width: 30px; height: 28px; padding: 0 8px; border-radius: 999px; background: var(--grad); color: #fff; font-weight: 800; font-size: 13px; margin-bottom: 14px; }

.steps { display: grid; gap: 36px 28px; grid-template-columns: repeat(5, minmax(0, 1fr)); }
.steps--6 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.steps > li { position: relative; padding-top: 22px; border-top: 1px solid var(--line); }
.steps > li::before { content: ''; position: absolute; left: 0; top: -1px; width: 44px; height: 2px; background: var(--grad); }
.steps .h3 { font-size: 17px; margin-bottom: 8px; }
.steps p { font-size: 14.5px; color: var(--ink-2); }
.section--soft .steps > li { border-top-color: #d9d7ee; }

.ann__t { margin-top: 16px; font-size: 17px; }
.domains > li { display: grid; grid-template-columns: 120px 1fr auto; gap: 8px 24px; align-items: center; }
.domains__d { font-weight: 700; color: var(--violet-600); font-size: 14px; }
.domains__t { color: var(--ink-2); }
.domains .tags { margin-top: 0; }

.tbl-wrap { overflow-x: auto; }
.tbl { width: 100%; border-collapse: collapse; font-size: 15px; min-width: 640px; }
.tbl th, .tbl td { padding: 18px 20px; text-align: left; vertical-align: top; border-bottom: 1px solid var(--line); }
.tbl thead th { font-size: 16px; font-weight: 800; border-bottom: 2px solid var(--ink); }
.tbl thead th:last-child { color: var(--violet-600); border-bottom-color: var(--violet-500); }
.tbl tbody th { width: 140px; font-weight: 700; color: var(--muted); }
.tbl td { color: var(--ink-2); }

.layers { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; counter-reset: l; }
.layers > li { position: relative; padding: 22px 22px 24px; border-top: 3px solid var(--violet-500); background: #fff; border-left: 1px solid var(--line); border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.layers > li:not(:first-child) { margin-left: -1px; }
.layers > li:nth-child(2) { border-top-color: #7a6cf0; }
.layers > li:nth-child(3) { border-top-color: #8e7ff5; }
.layers > li:nth-child(4) { border-top-color: #a28ff7; }
.layers > li:nth-child(5) { border-top-color: #b79af8; }
.layers .h3 { font-size: 16px; margin-bottom: 8px; }
.layers p { font-size: 14px; color: var(--ink-2); }
.layers > li:not(:last-child)::after { content: '→'; position: absolute; right: -9px; top: 22px; z-index: 1; width: 18px; height: 18px; display: grid; place-items: center; border-radius: 50%; background: var(--violet-500); color: #fff; font-size: 11px; }

.cases { display: grid; gap: 56px; }
.cases__flow { margin-top: 22px; }

.proof { display: grid; gap: 10px; align-content: start; }
.proof__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; font-size: 13px; color: var(--muted); font-weight: 600; }
.proof .tags { margin-top: 2px; }
.proof .text-link { margin-top: 4px; }

.others { margin-top: 64px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap; align-items: center; gap: 12px 28px; }
.others__t { font-weight: 700; color: var(--muted); font-size: 14px; }
.others__a { display: grid; gap: 2px; padding: 4px 0; border-bottom: 1.5px solid transparent; }
.others__a small { font-size: 11px; font-weight: 800; letter-spacing: 0.12em; color: var(--violet-500); }
.others__a b { font-size: 15.5px; }
.others__a:hover { border-bottom-color: var(--violet-400); }

@media (max-width: 1100px) { .steps, .steps--6 { grid-template-columns: repeat(3, minmax(0, 1fr)); } .layers { grid-template-columns: repeat(3, minmax(0, 1fr)); row-gap: 14px; } .layers > li::after { display: none; } .layers > li { margin-left: 0 !important; } }
@media (max-width: 720px) { .steps, .steps--6, .layers { grid-template-columns: 1fr; } .domains > li { grid-template-columns: 1fr; } }
</style>
