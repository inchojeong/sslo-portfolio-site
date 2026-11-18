<script setup>
import { computed } from 'vue';
import SectionHead from '../components/SectionHead.vue';
import CtaBand from '../components/CtaBand.vue';
import NeuralCanvas from '../components/NeuralCanvas.vue';
import MarqueeRow from '../components/MarqueeRow.vue';
import PipelineViz from '../components/PipelineViz.vue';
import { evidenceChain } from '../data/site';
import { history } from '../data/history';
import { pipelineStages, toolGroups, formats, models, extras } from '../data/sslo';
import { cases } from '../data/cases';
import { awards } from '../data/assets';

// 홈 타임라인 미리보기: 2020년 이후 연구개발 항목 중 강조 항목만
const preview = computed(() =>
  history
    .filter((h) => h.year >= 2020)
    .map((h) => ({ year: h.year, items: h.items.filter((i) => i.highlight) }))
    .filter((h) => h.items.length),
);

const domains = [...new Set(cases.map((c) => c.domain))];
const keywords = ['AI 학습데이터 구축', '자동 라벨링', 'Active Learning', 'OCR', '모빌리티 데이터', 'LLM as a Judge', 'BaaS', 'Data Pipeline'];
const topAwards = awards.filter((a) => a.org).slice(0, 4);
</script>

<template>
  <!-- HERO -->
  <section class="hero">
    <div class="hero__bg" aria-hidden="true">
      <span class="hero__orb hero__orb--a" />
      <span class="hero__orb hero__orb--b" />
      <span class="hero__orb hero__orb--c" />
    </div>
    <NeuralCanvas :density="1.15" />
    <div class="hero__vignette" aria-hidden="true" />

    <div class="container hero__in">
      <div class="hero__copy">
        <h1 class="h1">
          데이터를 구축하고<br />
          소프트웨어를 개발해 온<br />
          <span class="grad-text">검증 가능한 기술기업</span>
        </h1>
        <p class="lead">
          티벨은 AI 사업을 새로 시작한 기업이 아닙니다. 2016년 기업부설연구소 설립 이후 쌓아 온 수행실적을 바탕으로
          여러 산업의 데이터 구축과 기술개발 프로젝트를 수행해 왔습니다.
        </p>
        <div class="hero__btns">
          <RouterLink to="/rnd/history" class="btn btn--primary">연구개발 연혁 보기 →</RouterLink>
          <RouterLink to="/sslo" class="btn btn--ghost">S.S.L.O 솔루션</RouterLink>
        </div>
      </div>

    </div>

    <a href="#chain" class="hero__scroll" aria-label="아래로 스크롤"><span /></a>
  </section>

  <!-- KEYWORD MARQUEE -->
  <section class="mq">
    <MarqueeRow :items="keywords" :duration="46" />
    <MarqueeRow :items="domains" :duration="52" reverse />
  </section>

  <!-- EVIDENCE CHAIN -->
  <section id="chain" class="section">
    <div class="container">
      <SectionHead
        eyebrow="How we show"
        title="실적에서 성과까지, 확인 순서대로 보여드립니다"
        lead="기술을 화려하게 나열하기보다 수행실적 → 자체 솔루션 → 검증 가능한 성과 순으로 근거를 제시합니다."
      />
      <ol class="chain">
        <li v-for="(c, i) in evidenceChain" :key="c.to" v-reveal="i * 90">
          <RouterLink :to="c.to" class="card card--link chain__card">
            <span class="chain__top">

              <span class="chain__no grad-text">{{ c.step }}</span>
            </span>
            <h3 class="h3">{{ c.title }}</h3>
            <p>{{ c.text }}</p>
            <span class="chain__go">자세히 보기 <i>→</i></span>
          </RouterLink>
        </li>
      </ol>
    </div>
  </section>

  <!-- S.S.L.O SHOWCASE -->
  <section class="section section--dark showcase">
    <div class="container">
      <SectionHead
        eyebrow="Our solution"
        title="S.S.L.O — 모델이 라벨링하고, 사람이 검수하며, 함께 똑똑해지는 플랫폼"
        lead="소량의 수동 라벨링으로 모델을 학습하고, 모델이 자동 라벨링한 결과를 사람이 검수해 다시 학습에 돌려보내는 순환 구조입니다."
      />
      <div class="viz" v-reveal><PipelineViz :stages="pipelineStages" /></div>

      <div class="bento">
        <article class="flat bento__a" v-reveal>

          <p class="eyebrow">Labeling tools</p>
          <h3 class="h3 bento__t">AI 보조부터 수동까지, 3단계 도구</h3>
          <ul class="tools">
            <li v-for="t in toolGroups" :key="t.name">
              <b>{{ t.name }}</b>
              <span>{{ t.badge }}</span>
            </li>
          </ul>
        </article>
        <article class="flat bento__b" v-reveal="80">

          <p class="eyebrow">Models &amp; formats</p>
          <h3 class="h3 bento__t">최신 딥러닝 모델과 데이터셋 포맷</h3>
          <p class="tags"><span v-for="m in models" :key="m" class="chip">{{ m }}</span></p>
          <p class="tags"><span v-for="f in formats" :key="f" class="chip">{{ f }}</span></p>
        </article>
        <article v-for="(e, i) in extras" :key="e.title" class="flat bento__c" v-reveal="(i + 2) * 80">

          <h3 class="h3">{{ e.title }}</h3>
          <p>{{ e.text }}</p>
        </article>
      </div>
      <p class="more"><RouterLink to="/sslo" class="btn btn--primary">S.S.L.O 자세히 보기 →</RouterLink></p>
    </div>
  </section>

  <!-- TIMELINE PREVIEW -->
  <section class="section section--soft">
    <div class="container">
      <SectionHead
        eyebrow="R&D History"
        title="2016년 연구소 설립부터 이어진 개발 활동"
        lead="AI 학습데이터 구축, 라벨링 플랫폼, 차량·에너지 데이터 솔루션까지. 최근 6년간의 주요 활동입니다."
      />
      <div class="tl">
        <div v-for="(h, i) in preview" :key="h.year" class="tl__col" v-reveal="i * 70">
          <b class="tl__year grad-text">{{ h.year }}</b>
          <ul>
            <li v-for="it in h.items" :key="it.text">{{ it.text }}</li>
          </ul>
        </div>
      </div>
      <p class="more"><RouterLink to="/rnd/history" class="text-link">전체 연혁과 수상 이력 보기 →</RouterLink></p>
    </div>
  </section>

  <!-- AWARDS -->
  <section class="section section--dark section--tight">
    <div class="container">
      <SectionHead eyebrow="Recognition" title="정부·기관으로부터 인정받은 성과" />
      <div class="grid grid--flat grid--4">
        <article v-for="(a, i) in topAwards" :key="a.title + a.year" class="flat" v-reveal="i * 70">

          <span class="award__y grad-text">{{ a.year }}</span>
          <h3 class="h3 award__t">{{ a.title }}</h3>
          <p class="muted small">{{ a.org }}</p>
        </article>
      </div>
      <p class="more"><RouterLink to="/assets" class="text-link">특허·인증·수상 전체 보기 →</RouterLink></p>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
/* ---------- hero ---------- */
.hero { position: relative; overflow: hidden; background: var(--navy-950); color: #fff; padding: calc(var(--header-h) + 96px) 0 128px; min-height: 100svh; display: grid; align-items: center; }
.hero__bg { position: absolute; inset: 0; }
.hero__orb { position: absolute; border-radius: 50%; filter: blur(90px); animation: float 16s ease-in-out infinite; }
.hero__orb--a { width: 560px; height: 560px; right: -140px; top: -160px; background: #6a5be6; opacity: 0.55; }
.hero__orb--b { width: 460px; height: 460px; left: -160px; bottom: -180px; background: #d964b6; opacity: 0.32; animation-delay: -6s; }
.hero__orb--c { width: 380px; height: 380px; left: 38%; top: 55%; background: #3580e3; opacity: 0.25; animation-delay: -11s; }
@keyframes float { 50% { transform: translate(-36px, 28px) scale(1.06); } }
.hero__vignette { position: absolute; inset: 0; background: radial-gradient(80% 70% at 50% 50%, transparent 40%, rgb(5 6 15 / 70%)); pointer-events: none; }

.hero__in { position: relative; display: grid; grid-template-columns: 1fr; align-items: center; }
.hero__copy { display: grid; gap: 26px; justify-items: start; }
.hero .h1 { text-shadow: 0 0 60px rgb(133 121 243 / 35%); }
.hero .lead { color: #b3b8dc; }
.hero__btns { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px; }

.hero__scroll { position: absolute; left: 50%; bottom: 36px; width: 26px; height: 42px; border: 2px solid rgb(255 255 255 / 40%); border-radius: 14px; transform: translateX(-50%); }
.hero__scroll span { position: absolute; left: 50%; top: 8px; width: 4px; height: 8px; margin-left: -2px; border-radius: 2px; background: #fff; animation: wheel 1.8s infinite; }
@keyframes wheel { to { transform: translateY(14px); opacity: 0; } }

/* ---------- marquee ---------- */
.mq { display: grid; gap: 14px; padding: 36px 0; background: var(--navy-950); border-top: 1px solid #15183f; border-bottom: 1px solid #15183f; }

/* ---------- chain ---------- */
.chain { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.chain__card { display: grid; gap: 10px; height: 100%; padding: 32px 26px; }
.chain__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.chain__no { font-size: 36px; font-weight: 800; line-height: 1; letter-spacing: -0.04em; }
.chain__card .h3 { font-size: 22px; margin-top: 8px; }
.chain__card p { color: var(--muted); font-size: 14.5px; }
.chain__go { margin-top: 10px; font-weight: 700; font-size: 14px; color: var(--violet-500); display: inline-flex; gap: 6px; }
.chain__go i { font-style: normal; transition: transform 0.25s; }
.chain__card:hover .chain__go i { transform: translateX(6px); }

/* ---------- showcase ---------- */
.viz { margin: 8px 0 72px; }
.bento { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 56px 56px; }
.bento__a { grid-column: span 3; }
.bento__b { grid-column: span 3; }
.bento__c { grid-column: span 3; }

.bento__t { margin: 12px 0 18px; font-size: 22px; color: #fff; }
.bento .flat .h3 { color: #fff; }
.bento__c p { margin-top: 10px; color: #9ea5cf; font-size: 14.5px; }
.tools { display: grid; }
.tools li { display: flex; justify-content: space-between; gap: 12px; padding: 13px 0; border-top: 1px solid var(--glass-line); font-size: 14.5px; }
.tools li:last-child { border-bottom: 1px solid var(--glass-line); }
.tools b { color: #fff; display: inline-flex; align-items: center; gap: 8px; }
.tools span { color: var(--violet-300); font-size: 13px; text-align: right; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.more { margin-top: 40px; }

/* ---------- timeline ---------- */
.tl { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); position: relative; }
.tl::before { content: ''; position: absolute; left: 0; right: 0; top: 14px; height: 3px; border-radius: 3px; background: var(--grad); box-shadow: 0 0 18px rgb(133 121 243 / 60%); }
.tl__col { padding: 0 16px 0 0; position: relative; }
.tl__year { display: inline-block; position: relative; padding-top: 38px; font-size: 28px; font-weight: 800; letter-spacing: -0.03em; }
.tl__year::before { content: ''; position: absolute; left: 0; top: 5px; width: 20px; height: 20px; border-radius: 50%; background: #fff; border: 5px solid var(--violet-400); box-shadow: 0 0 0 5px rgb(133 121 243 / 18%); }
.tl__col ul { display: grid; gap: 10px; margin-top: 14px; font-size: 14px; color: var(--ink-2); }
.tl__col li { padding-left: 12px; border-left: 2px solid var(--violet-100); }

/* ---------- awards ---------- */
.award__y { display: block; font-size: 32px; font-weight: 800; letter-spacing: -0.03em; }
.award__t { margin: 8px 0 6px; font-size: 17px; }

@media (max-width: 960px) {
  .hero { min-height: auto; padding-bottom: 100px; }
  .hero__in { grid-template-columns: 1fr; }
  .chain { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .tl { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 36px; }
  .tl::before { display: none; }
  .bento__a, .bento__b, .bento__c { grid-column: span 6; }
  .viz { padding: 28px 20px 32px; }
}
@media (max-width: 560px) { .chain, .tl { grid-template-columns: 1fr; } .hero__scroll { display: none; } }
</style>
