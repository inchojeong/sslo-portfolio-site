<script setup>
import { ref, computed } from 'vue';
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import CtaBand from '../components/CtaBand.vue';
import { Image, Video, Package, ShieldCheck } from 'lucide-vue-next';
import VerifyFlag from '../components/VerifyFlag.vue';
import { patents, applications, certifications, awards, evidence } from '../data/assets';
import { stats } from '../data/site';

const evidenceIcons = [Image, Video, Package, ShieldCheck];
const area = ref('all');
const areas = computed(() => ['all', ...new Set([...patents, ...applications].map((p) => p.area))]);
const match = (p) => area.value === 'all' || p.area === area.value;
const patentList = computed(() => patents.filter(match));
const appList = computed(() => applications.filter(match));
const patentStat = stats.find((s) => s.label === '보유 특허');
const appStat = stats.find((s) => s.label === '특허 출원');
</script>

<template>
  <PageHero
    eyebrow="Technology assets"
    title="기술자산 및 연구성과"
    lead="S.S.L.O와 자체 솔루션을 뒷받침하는 특허·인증·수상, 그리고 실제 증빙 자료를 한곳에 모았습니다."
    :crumbs="['기술자산']"
  />

  <section class="section">
    <div class="container">
      <SectionHead eyebrow="Patents" title="특허 및 출원" />
      <div class="sum">
        <div class="flat"><b>{{ patentStat.value }}</b><span>보유 특허</span></div>
        <div class="flat"><b>{{ appStat.value }}</b><span>특허 출원<VerifyFlag :note="appStat.verify" /></span></div>
      </div>

      <div class="filter-bar bar">
        <button v-for="a in areas" :key="a" class="filter-btn" :class="{ 'is-active': area === a }" @click="area = a">
          {{ a === 'all' ? '전체' : a }}
        </button>
      </div>

      <div v-if="patentList.length" class="table-wrap block" v-reveal>
        <table class="table">
          <caption class="cap">등록 특허</caption>
          <thead><tr><th>번호</th><th>발명의 명칭</th><th>분야</th></tr></thead>
          <tbody>
            <tr v-for="p in patentList" :key="p.no">
              <td class="nowrap">특허 {{ p.no }}</td>
              <td>{{ p.title }}</td>
              <td><span class="chip">{{ p.area }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="appList.length" class="table-wrap block" v-reveal>
        <table class="table">
          <caption class="cap">출원</caption>
          <thead><tr><th>출원번호</th><th>발명의 명칭</th><th>분야</th></tr></thead>
          <tbody>
            <tr v-for="p in appList" :key="p.no">
              <td class="nowrap">출원 {{ p.no }}</td>
              <td>{{ p.title }}</td>
              <td><span class="chip chip--blue">{{ p.area }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <SectionHead eyebrow="Certification" title="기업 인증" />
      <div class="grid grid--flat grid--2">
        <article v-for="c in certifications" :key="c.title" class="flat cert" v-reveal>

          <h3 class="h3">{{ c.title }}<VerifyFlag :note="c.verify" /></h3>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHead eyebrow="Awards" title="수상 및 표창" lead="소프트웨어 품질·기술 분야와 동반성장, 고용 분야에서 정부·기관의 인정을 받았습니다." />
      <ol class="awards">
        <li v-for="(a, i) in awards" :key="a.year + a.title" v-reveal="Math.min(i, 6) * 40">
          <b>{{ a.year }}</b>
          <span>{{ a.title }}</span>
          <em v-if="a.org">{{ a.org }}</em>
        </li>
      </ol>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <SectionHead
        eyebrow="Evidence"
        title="실제 증빙 자료"
        lead="솔루션 캡처, 기술 시연, 개발 산출물, 검증 결과를 확보하는 대로 게시합니다."
      />
      <div class="grid grid--flat grid--4">
        <article v-for="(e, i) in evidence" :key="e.title" class="flat" v-reveal>
          <component :is="evidenceIcons[i]" class="ico ev__ico" :size="20" :stroke-width="1.75" aria-hidden="true" />

          <h3 class="h3"><strong>{{ e.title }}</strong></h3>
          <p class="small ev__t">{{ e.text }}</p>
          <span class="chip chip--slate">준비 중</span>
        </article>
      </div>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.sum { display: grid; grid-template-columns: repeat(2, minmax(0, 260px)); gap: 40px; margin-bottom: 40px; }
.sum .flat { display: grid; gap: 2px; }
.sum b { font-size: 48px; line-height: 1.1; color: var(--violet-500); letter-spacing: -0.03em; }
.sum span { font-weight: 700; color: var(--ink-2); }
.bar { margin-bottom: 20px; }
.block { margin-bottom: 24px; }
.cap { text-align: left; padding: 16px 18px; font-weight: 800; font-size: 16px; border-bottom: 1px solid var(--line); }
.nowrap { white-space: nowrap; font-variant-numeric: tabular-nums; }
.cert { display: flex; align-items: center; gap: 16px; }
.cert h3 { margin: 0; }
.cert__ico { width: 44px; height: 44px; flex: none; border-radius: 50%; display: grid; place-items: center; font-weight: 900; background: var(--violet-50); color: var(--violet-500); }
.awards { display: grid; border-top: 2px solid var(--ink); }
.awards li { display: grid; grid-template-columns: 90px 1fr auto; gap: 16px; align-items: baseline; padding: 18px 6px; border-bottom: 1px solid var(--line); }
.awards b { font-size: 20px; color: var(--violet-500); letter-spacing: -0.02em; }
.awards span { font-weight: 700; }
.awards em { font-style: normal; color: var(--muted); font-size: 14px; }
.ev__ico { margin-bottom: 12px; }
.ev__t { margin: 8px 0 14px; }
@media (max-width: 640px) {
  .sum { grid-template-columns: 1fr 1fr; }
  .awards li { grid-template-columns: 70px 1fr; }
  .awards em { grid-column: 2; }
}
</style>
