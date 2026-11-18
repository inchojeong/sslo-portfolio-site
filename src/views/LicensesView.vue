<script setup>
import PageHero from '../components/PageHero.vue';

const items = [
  {
    name: 'Lucide Icons (lucide-vue-next)',
    use: '기능 아이콘 (메뉴 펼침, 수행실적 펼침, 연락처 안내)',
    license: 'ISC License',
    licenseUrl: 'https://opensource.org/license/isc-license-txt',
    source: 'https://lucide.dev',
    credit: 'Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.',
    local: `${import.meta.env.BASE_URL}assets/licenses/LICENSE-Lucide.txt`,
  },
  {
    name: 'Pretendard',
    use: '본문 서체 (로컬 호스팅)',
    license: 'SIL Open Font License 1.1',
    licenseUrl: 'https://openfontlicense.org/',
    source: 'https://github.com/orioncactus/pretendard',
    credit: 'Copyright (c) 2021, Kil Hyung-jin',
    local: `${import.meta.env.BASE_URL}assets/fonts/LICENSE-Pretendard-OFL.txt`,
  },
  {
    name: 'Vue, Vue Router, Vite',
    use: '사이트 구현',
    license: 'MIT License',
    licenseUrl: 'https://opensource.org/license/mit',
    source: 'https://vuejs.org',
    credit: 'Copyright (c) Evan You and contributors',
  },
];
</script>

<template>
  <PageHero
    eyebrow="Open source"
    title="오픈소스 라이선스"
    lead="이 사이트는 아래 오픈소스를 사용합니다. 서체와 아이콘은 모두 프로젝트 안에서 제공되며 외부 CDN에 의존하지 않습니다."
    :crumbs="['오픈소스 라이선스']"
  />

  <section class="section">
    <div class="container list">
      <article v-for="it in items" :key="it.name" class="flat" v-reveal>
        <header class="head">
          <h2 class="h3">{{ it.name }}</h2>
          <a :href="it.licenseUrl" target="_blank" rel="noopener" class="chip">{{ it.license }}</a>
        </header>
        <dl>
          <div><dt>사용처</dt><dd>{{ it.use }}</dd></div>
          <div><dt>저작권</dt><dd>{{ it.credit }}</dd></div>
          <div>
            <dt>원본</dt>
            <dd><a :href="it.source" target="_blank" rel="noopener" class="text-link">{{ it.source }}</a></dd>
          </div>
          <div v-if="it.local">
            <dt>라이선스 전문</dt>
            <dd><a :href="it.local" target="_blank" class="text-link">{{ it.local }}</a></dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<style scoped>
.list { display: grid; gap: 48px; max-width: 880px; }
.head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 18px; }
dl { display: grid; gap: 12px; }
dl > div { display: grid; grid-template-columns: 110px 1fr; gap: 12px; font-size: 14.5px; }
dt { font-weight: 700; color: var(--muted); }
dd { color: var(--ink-2); word-break: break-all; }
@media (max-width: 560px) { dl > div { grid-template-columns: 1fr; gap: 2px; } }
</style>
