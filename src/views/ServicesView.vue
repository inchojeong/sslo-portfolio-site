<script setup>
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import FlowSteps from '../components/FlowSteps.vue';
import VerifyFlag from '../components/VerifyFlag.vue';
import CtaBand from '../components/CtaBand.vue';
import { servicesIntro, services, approach, proofs, researchBase } from '../data/services';

const nameOf = (slug) => services.find((s) => s.slug === slug)?.name;
</script>

<template>
  <PageHero eyebrow="AI Services" :title="servicesIntro.title" :lead="servicesIntro.lead" :crumbs="['AI 서비스']" />

  <!-- 네 가지 서비스 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="Services"
        title="필요한 서비스를 바로 선택하세요"
        lead="데이터 구축, 분석, 시스템 개발, AI 학습 중 필요한 영역의 상세 페이지에서 수행 방식과 실제 사례를 확인할 수 있습니다."
      />
      <div class="grid grid--flat grid--2">
        <RouterLink v-for="(s, i) in services" :key="s.slug" :to="`/services/${s.slug}`" class="flat svc" v-reveal="i * 80">
          <span class="svc__no">{{ s.no }}</span>
          <p class="svc__eyebrow">{{ s.eyebrow }}</p>
          <h3 class="h3 svc__name">{{ s.name }}</h3>
          <p class="svc__head">{{ s.headline }}</p>
          <p class="muted">{{ s.summary }}</p>
          <span class="text-link">자세히 보기 →</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- 수행 방식 -->
  <section class="section section--dark">
    <div class="container">
      <SectionHead
        eyebrow="How we work"
        title="데이터 입력에서 결과 검증까지"
        lead="서비스 영역과 관계없이 티벨의 수행 과정은 이 흐름으로 이어집니다."
      />
      <FlowSteps :steps="approach" dark />
    </div>
  </section>

  <!-- 대표 실적 -->
  <section class="section section--soft">
    <div class="container">
      <SectionHead
        eyebrow="Proof & portfolio"
        title="서비스와 연결된 대표 수행 사례"
        lead="기술 소개의 끝에는 실제 수행 사례가 있습니다. 각 사례가 어떤 서비스 영역의 근거인지 함께 보여줍니다."
      />
      <ul class="rows proofs">
        <li v-for="p in proofs" :key="p.id" v-reveal>
          <div class="proofs__main">
            <h3 class="h3">{{ p.title }}<VerifyFlag :note="p.verify" /></h3>
            <p class="muted">{{ p.focus }}</p>
          </div>
          <p class="tags">
            <RouterLink v-for="s in p.services" :key="s" :to="`/services/${s}`" class="chip chip--violet">{{ nameOf(s) }}</RouterLink>
          </p>
          <RouterLink :to="p.to" class="text-link">자세히 →</RouterLink>
        </li>
      </ul>
    </div>
  </section>

  <!-- 연구개발 기반 -->
  <section class="section">
    <div class="container">
      <SectionHead eyebrow="R&D foundation" title="연구개발 기반 확인" lead="회사 연혁, 자체 솔루션, 특허·인증으로 서비스의 기술 기반을 확인할 수 있습니다." />
      <div class="grid grid--flat grid--3">
        <RouterLink v-for="(r, i) in researchBase" :key="r.to" :to="r.to" class="flat base" v-reveal="i * 80">
          <h3 class="h3">{{ r.title }}</h3>
          <p class="muted">{{ r.text }}</p>
          <span class="text-link">바로가기 →</span>
        </RouterLink>
      </div>
    </div>
  </section>

  <CtaBand title="AI 서비스 상담" text="보유한 데이터와 해결하려는 문제를 알려 주시면 맞는 서비스 영역과 진행 방식을 제안해 드립니다." />
</template>

<style scoped>
.svc, .base { display: grid; gap: 10px; align-content: start; }
.svc { position: relative; }
.svc__no { position: absolute; right: 0; top: 18px; font-size: 40px; font-weight: 800; letter-spacing: -0.04em; color: var(--violet-100); line-height: 1; }
.svc__eyebrow { font-size: 12px; font-weight: 800; letter-spacing: 0.14em; color: var(--violet-500); }
.svc__name { font-size: 24px; }
.svc__head { font-size: 17px; font-weight: 600; color: var(--ink-2); }
.svc:hover .svc__name, .base:hover .h3 { color: var(--violet-600); }
.svc .text-link, .base .text-link { margin-top: 6px; }

.proofs > li { display: grid; grid-template-columns: 1fr auto auto; gap: 12px 28px; align-items: center; }
.proofs .h3 { font-size: 17px; margin-bottom: 4px; }
.proofs .tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-end; }
.proofs .chip { transition: border-color 0.2s; }
.proofs .chip:hover { border-color: var(--violet-400); }
@media (max-width: 860px) { .proofs > li { grid-template-columns: 1fr; } .proofs .tags { justify-content: flex-start; } }
</style>
