<script setup>
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import FlowSteps from '../components/FlowSteps.vue';
import PipelineViz from '../components/PipelineViz.vue';
import CtaBand from '../components/CtaBand.vue';
import { WandSparkles, MousePointerClick, PenTool } from 'lucide-vue-next';
import {
  sslo, headlineFlow, pipelineStages, toolGroups, extras, formats, models, dashboard, serviceProcess, modelSupport,
} from '../data/sslo';
const toolIcons = [WandSparkles, MousePointerClick, PenTool];
</script>

<template>
  <PageHero eyebrow="Our solution" title="S.S.L.O" :lead="sslo.headline" :crumbs="['S.S.L.O']">
    <p class="intro">{{ sslo.intro }}</p>
  </PageHero>

  <!-- 흐름 -->
  <section class="section section--dark">
    <div class="container">
      <SectionHead
        eyebrow="Workflow"
        title="데이터 관리 → 자동 라벨링 → 검수 → 모델 개선"
        lead="실제 화면과 시연으로 설명하는 것이 가장 효과적인 흐름입니다. 핵심 4단계와 세부 순환 구조를 함께 소개합니다."
      />
      <FlowSteps :steps="headlineFlow" dark />

      <div class="viz" v-reveal>
        <h3 class="h3 viz__t">세부 순환 구조</h3>
        <PipelineViz :stages="pipelineStages" />
      </div>
    </div>
  </section>
  <!-- 도구 -->
  <section class="section section--soft">
    <div class="container">
      <SectionHead eyebrow="Labeling tools" title="AI 보조부터 수동까지, 3단계 라벨링 도구" />
      <div class="grid grid--flat grid--3">
        <article v-for="(t, i) in toolGroups" :key="t.name" class="flat" v-reveal="i * 80">

          <h3 class="h3 hi"><component :is="toolIcons[i]" class="ico" :size="20" :stroke-width="1.75" aria-hidden="true" />{{ t.name }}</h3>
          <p class="chip chip--violet badge">{{ t.badge }}</p>
          <p class="muted">{{ t.text }}</p>
        </article>
      </div>
      <div class="grid grid--flat grid--2 extras">
        <article v-for="(e, i) in extras" :key="e.title" class="flat" v-reveal="i * 80">

          <h3 class="h3">{{ e.title }}</h3>
          <p class="muted">{{ e.text }}</p>
        </article>
      </div>
      <div class="spec" v-reveal>
        <div>
          <h3 class="spec__t">지원 데이터셋 포맷</h3>
          <p class="tags"><span v-for="f in formats" :key="f" class="chip chip--blue">{{ f }}</span></p>
        </div>
        <div>
          <h3 class="spec__t">최신 딥러닝 모델 적용</h3>
          <p class="tags"><span v-for="m in models" :key="m" class="chip chip--blue">{{ m }}</span></p>
        </div>
      </div>
    </div>
  </section>

  <!-- 대시보드 -->
  <section class="section section--dark">
    <div class="container">
      <SectionHead eyebrow="Dashboard" :title="dashboard.title" :lead="dashboard.text" />
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
          <p>{{ e.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- 모델 유형 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="Dataset coverage"
        title="모델 유형별 데이터 구축 지원"
        lead="이미지·텍스트·센서·정형 데이터 등 멀티 타입 데이터셋을 AI·ML 모델 특성과 도메인에 맞춰 구축합니다."
      />
      <div class="grid grid--flat grid--4">
        <article v-for="(m, i) in modelSupport" :key="m.title" class="flat" v-reveal="i * 70">

          <h3 class="h3">{{ m.title }}</h3>
          <p class="chip chip--violet badge">{{ m.targets }}</p>
          <p class="muted small">{{ m.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- 서비스 절차 -->
  <section class="section section--soft">
    <div class="container">
      <SectionHead eyebrow="Service process" title="AI 데이터 구축 서비스 진행 절차" lead="고객 요구사항 기반으로 데이터 수집부터 가공·검증까지, AI 학습에 바로 활용 가능한 데이터를 제공합니다." />
      <ol class="proc">
        <li v-for="(s, i) in serviceProcess" :key="s.title" v-reveal="i * 70">
          <span class="proc__top"><span class="proc__no">{{ String(i + 1).padStart(2, '0') }}</span></span>
          <h3 class="h3">{{ s.title }}</h3>
          <ul class="dot">
            <li v-for="it in s.items" :key="it">{{ it }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>

  <CtaBand title="S.S.L.O 시연이 필요하신가요?" text="데이터 유형과 목표를 알려주시면 샘플 데이터 기반 시연과 구축 방식을 안내해 드립니다." />
</template>

<style scoped>
.intro { max-width: 70ch; color: #b3b8dc; font-size: 16px; }
.viz { margin-top: 72px; padding-top: 32px; border-top: 1px solid var(--glass-line); }
.viz__t { color: #fff; margin-bottom: 28px; }
.badge { margin: 12px 0; }

.extras { margin-top: 48px; }
.spec { margin-top: 56px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; padding-top: 28px; border-top: 1px solid var(--line); }
.spec__t { font-size: 15px; margin-bottom: 10px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.dot { display: grid; gap: 10px; margin-top: 14px; }
.dot li { position: relative; padding-left: 16px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 6px; height: 6px; border-radius: 50%; background: var(--violet-400); }
.effects { margin-top: 56px; }
.effects p { color: #9ea5cf; font-size: 14.5px; margin-top: 8px; }
.proc { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 32px 28px; }
.proc > li { position: relative; padding-top: 22px; border-top: 1px solid var(--line); }
.proc > li::before { content: ''; position: absolute; left: 0; top: -1px; width: 44px; height: 2px; background: var(--grad); }
.proc__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.proc__no { display: inline-grid; place-items: center; min-width: 30px; height: 28px; padding: 0 8px; border-radius: 999px; background: var(--grad); color: #fff; font-weight: 800; font-size: 13px; }
.proc .h3 { font-size: 17px; }
.proc .dot { font-size: 14px; color: var(--ink-2); }
.proc .dot li::before { background: var(--violet-500); }
@media (max-width: 960px) { .proc { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) { .proc, .spec { grid-template-columns: 1fr; } }
</style>
