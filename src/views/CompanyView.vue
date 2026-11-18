<script setup>
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import CtaBand from '../components/CtaBand.vue';
import { HeartHandshake, Sprout, Globe, MapPin } from 'lucide-vue-next';
import VerifyFlag from '../components/VerifyFlag.vue';
import { site, businessAreas, organization, customers, esg } from '../data/site';

const esgIcons = [HeartHandshake, Sprout, Globe];
const mapUrl = (addr) => `https://map.naver.com/p/search/${encodeURIComponent(addr.replace(/\(.*?\)/g, '').trim())}`;
const info = [
  ['회사명', site.company],
  ['대표자', site.ceo],
  ['설립일', site.founded],
  ['주요사업', '소프트웨어 테스트 및 개발·유지보수, AI·DATA 구축'],
  ['임직원 수', `${site.employees.value}명 (${site.employees.asOf} 기준)`],
  ['사업자등록번호', site.bizNo],
];
</script>

<template>
  <PageHero
    eyebrow="About TBELL"
    title="회사소개"
    lead="교육, 통신, 전자상거래, 금융, 자동차 등 다양한 산업분야에서 최고의 기술과 데이터로 고객의 요구사항 만족을 위한 자동화 구축 서비스와 스마트한 솔루션을 제공합니다."
    :crumbs="['회사소개']"
  />

  <section class="section">
    <div class="container two">
      <div>
        <SectionHead eyebrow="Overview" title="일반현황" />
        <dl class="info flat" v-reveal>
          <div v-for="[k, v] in info" :key="k"><dt>{{ k }}</dt><dd>{{ v }}</dd></div>
        </dl>
      </div>
      <div>
        <SectionHead eyebrow="Business" title="사업영역" />
        <div class="stack biz" style="--gap: 40px">
          <article v-for="(b, i) in businessAreas" :key="b.title" class="flat" v-reveal="i * 70">
            <div class="biz__h"><h3 class="h3">{{ b.title }}</h3></div>
            <ul class="dot">
              <li v-for="it in b.items" :key="it">{{ it }}</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--soft">
    <div class="container">
      <SectionHead eyebrow="Organization" title="조직" />
      <div class="grid grid--flat grid--3">
        <article v-for="(o, i) in organization" :key="o.team" class="flat" v-reveal="i * 70">

          <p class="eyebrow org__en">{{ o.en }}</p>
          <h3 class="h3 org__t">{{ o.team }}</h3>
          <ul class="tags">
            <li v-for="t in o.tasks" :key="t" class="chip chip--slate">{{ t }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHead eyebrow="Clients" title="고객사 및 수행 사례" lead="소프트웨어 품질·테스트 자동화부터 데이터 구축까지, 다양한 고객과 협업해 왔습니다.">
      </SectionHead>
      <div class="grid grid--flat grid--3">
        <article v-for="(c, i) in customers" :key="c.name" class="flat" v-reveal="Math.min(i, 5) * 50">
          <h3 class="h3">{{ c.name }}</h3>
          <ul class="dot">
            <li v-for="w in c.works" :key="w">{{ w }}</li>
          </ul>
        </article>
      </div>
      <p class="muted small note">
        고객사·연구기관명과 수행 내용은 외부 공개 가능 여부 확인 후 게시 범위를 조정합니다.
        <VerifyFlag note="고객사명 외부 공개 가능 여부 확인 필요" />
      </p>
    </div>
  </section>

  <section class="section section--dark">
    <div class="container">
      <SectionHead eyebrow="ESG" title="ESG 경영" />
      <div class="grid grid--flat grid--3">
        <article v-for="(e, i) in esg" :key="e.title" class="flat" v-reveal="i * 70">
          <div class="esg__top"><span class="esg__no">0{{ i + 1 }}</span><component :is="esgIcons[i]" class="ico" :size="20" :stroke-width="1.75" aria-hidden="true" /></div>
          <h3 class="h3">{{ e.title }}</h3>
          <p class="esg__p">{{ e.text }}</p>
        </article>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <SectionHead eyebrow="Location" title="오시는 길" />
      <div class="grid grid--flat grid--2">
        <article v-for="o in site.offices" :key="o.type" class="flat" v-reveal>
          <div class="loc__top"><MapPin class="ico" :size="20" :stroke-width="1.75" aria-hidden="true" /><span class="chip">{{ o.type }}</span></div>
          <p class="h3 addr">{{ o.address }}<VerifyFlag :note="o.verify" /></p>
          <a :href="mapUrl(o.address)" target="_blank" rel="noopener" class="text-link">지도에서 보기 ↗</a>
        </article>
      </div>
      <p class="muted tel">Tel {{ site.tel }} · Fax {{ site.fax }}</p>
    </div>
  </section>

  <CtaBand />
</template>

<style scoped>
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
.info { padding-top: 6px; }
.info > div { display: grid; grid-template-columns: 130px 1fr; gap: 12px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.info > div:last-child { border: 0; }
.info dt { font-weight: 700; color: var(--muted); }
.info dd { font-weight: 600; }
.dot { display: grid; gap: 8px; margin-top: 12px; color: var(--ink-2); font-size: 14.5px; }
.dot li { position: relative; padding-left: 16px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 6px; height: 6px; border-radius: 50%; background: var(--violet-500); }
.biz__h { display: flex; align-items: center; gap: 14px; }
.org__en { margin-top: 16px; }
.esg__top, .loc__top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.loc__top { justify-content: flex-start; }
.org__t { margin: 6px 0 14px; font-size: 22px; }
.tags { display: flex; flex-wrap: wrap; gap: 6px; }
.note { margin-top: 24px; }
.esg__no { font-weight: 800; letter-spacing: 0.1em; color: var(--violet-400); }
.esg__p { margin-top: 10px; color: #9ea5cf; font-size: 14.5px; }
.addr { margin: 14px 0; }
.tel { margin-top: 20px; }
@media (max-width: 960px) { .two { grid-template-columns: 1fr; gap: 24px; } }
</style>
