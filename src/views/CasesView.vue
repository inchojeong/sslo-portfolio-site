<script setup>
import { ref, computed } from 'vue';
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import CtaBand from '../components/CtaBand.vue';
import { cases, deepDives, labelTypes } from '../data/cases';

const label = ref('all');
const list = computed(() => cases.filter((c) => label.value === 'all' || c.labels.includes(label.value)));
</script>

<template>
  <PageHero
    eyebrow="Domain cases"
    title="분야별 개발 사례"
    lead="다양한 도메인의 사례를 통해 한 산업에 국한되지 않은 데이터 구축·기술개발 수행 경험을 보여드립니다."
    :crumbs="['분야별 사례']"
  />

  <section class="section">
    <div class="container">
      <div class="filter-bar bar">
        <button class="filter-btn" :class="{ 'is-active': label === 'all' }" @click="label = 'all'">전체 라벨 유형</button>
        <button v-for="l in labelTypes" :key="l" class="filter-btn" :class="{ 'is-active': label === l }" @click="label = l">
          {{ l }}
        </button>
      </div>

      <TransitionGroup tag="ul" name="fade" class="grid grid--flat grid--3">
        <li v-for="c in list" :key="c.id" class="flat case">
          <div class="case__top">

            <span class="chip">{{ c.domain }}</span>
          </div>
          <h2 class="h3">{{ c.title }}</h2>
          <p class="tags">
            <span v-for="l in c.labels" :key="l" class="chip chip--slate">{{ l }}</span>
          </p>
        </li>
      </TransitionGroup>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <SectionHead
        eyebrow="Deep dive"
        title="구현 사례 상세"
        lead="전력량계 OCR, 도시 안전 데이터, 차량 데이터 모니터링, BaaS 서비스 등 구성도가 있는 구현 사례입니다."
      />
      <div class="dive">
        <article v-for="d in deepDives" :key="d.id" class="flat" v-reveal>
          <div class="dive__top">

            <span class="chip chip--blue">{{ d.domain }}</span>
          </div>
          <h3 class="h3 dive__t">{{ d.title }}</h3>
          <p class="muted">{{ d.summary }}</p>
          <ol class="arch">
            <li v-for="s in d.flow" :key="s.text">

              <span>{{ s.text }}</span>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>

  <CtaBand title="우리 분야의 데이터도 구축할 수 있을까요?" text="산업·데이터 유형·목표 모델을 알려주시면 유사 사례와 함께 구축 방식을 안내해 드립니다." />
</template>

<style scoped>
.bar { margin-bottom: 32px; }
.case { display: grid; gap: 14px; align-content: start; }
.case__top, .dive__top { display: flex; align-items: center; gap: 12px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.dive { display: grid; gap: 72px; }
.dive__t { margin: 12px 0 8px; font-size: 22px; }
.arch { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: 28px; counter-reset: a; }
.arch li { position: relative; counter-increment: a; display: grid; align-content: start; gap: 8px; padding: 16px 16px 18px; font-size: 14px; font-weight: 600; line-height: 1.45; border-radius: 14px; background: #fff; border: 1px solid var(--violet-100); }
.arch li::before { content: counter(a, decimal-leading-zero); font-size: 12px; font-weight: 700; letter-spacing: 0.14em; color: var(--violet-500); }
.arch li:not(:last-child)::after { content: '→'; position: absolute; right: -13px; top: 50%; transform: translateY(-50%); z-index: 2; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 13px; line-height: 1; color: #fff; background: var(--grad); }
@media (max-width: 720px) { .arch li:not(:last-child)::after { display: none; } }
.fade-enter-active, .fade-leave-active { transition: all 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }
</style>
