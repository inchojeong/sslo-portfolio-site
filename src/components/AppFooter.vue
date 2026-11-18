<script setup>
import { Phone, Printer, MapPin } from 'lucide-vue-next';
import { nav, site } from '../data/site';

const links = nav.flatMap((n) => (n.children ? n.children : [n]));
const year = new Date().getFullYear();
const base = import.meta.env.BASE_URL;
</script>

<template>
  <footer class="ft">
    <div class="container ft__grid">
      <div>
        <p class="ft__brand"><img :src="`${base}brand/sslo-logo-gradient.svg`" alt="S.S.L.O" width="116" height="21" /><small>by TBELL</small></p>
        <p class="ft__desc">
          데이터를 구축하고 소프트웨어 기술을 개발해 온 티벨의 연구개발 이력과 자체 솔루션을 소개합니다.
        </p>
      </div>
      <div>
        <h2 class="ft__title">바로가기</h2>
        <ul>
          <li v-for="l in links" :key="l.to"><RouterLink :to="l.to">{{ l.label }}</RouterLink></li>
          <li><RouterLink to="/contact">문의하기</RouterLink></li>
        </ul>
      </div>
      <div>
        <h2 class="ft__title">연락처</h2>
        <ul class="ft__info">
          <li class="hi"><Phone class="ico" :size="16" :stroke-width="1.75" aria-hidden="true" />Tel {{ site.tel }}</li>
          <li class="hi"><Printer class="ico" :size="16" :stroke-width="1.75" aria-hidden="true" />Fax {{ site.fax }}</li>
          <li v-for="o in site.offices" :key="o.type" class="addr"><MapPin class="ico" :size="16" :stroke-width="1.75" aria-hidden="true" /><span><b>{{ o.type }}</b> {{ o.address }}</span></li>
        </ul>
      </div>
    </div>
    <div class="container ft__bottom">
      <span>© {{ year }} {{ site.company }}. All rights reserved.</span>
      <span class="ft__credit"><RouterLink to="/privacy">개인정보처리방침</RouterLink> · <RouterLink to="/licenses">오픈소스 라이선스</RouterLink></span>
      <a :href="site.web" target="_blank" rel="noopener">tbell.co.kr</a>
    </div>
  </footer>
</template>

<style scoped>
.ft { background: linear-gradient(180deg, var(--navy-950), #070815); border-top: 1px solid #14163a; color: #9aa0c8; padding: 72px 0 28px; font-size: 14.5px; }
.ft__grid { display: grid; grid-template-columns: 1.4fr 0.8fr 1.6fr; gap: 48px; }
.ft__brand { display: flex; align-items: center; gap: 12px; }
.ft__brand img { height: 22px; width: auto; }
.ft__brand small { color: var(--violet-300); font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; padding-left: 12px; border-left: 1px solid rgb(255 255 255 / 22%); }
.ft__desc { margin-top: 14px; max-width: 38ch; }
.ft__title { color: #fff; font-size: 15px; margin-bottom: 14px; }
.ft ul { display: grid; gap: 8px; }
.ft a:hover { color: var(--violet-300); }
.ft__info .addr { display: flex; align-items: flex-start; gap: 10px; }
.ft__info .addr .ico { margin-top: 4px; }
.ft__info .hi { gap: 10px; }
.ft__info b { color: #d8e2f2; margin-right: 8px; }
.ft__bottom { margin-top: 48px; padding-top: 22px; border-top: 1px solid #1c1f46; display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.ft__credit { font-size: 12.5px; color: #7f86b3; max-width: 62ch; }
.ft__credit a { text-decoration: underline; text-underline-offset: 3px; }
@media (max-width: 800px) { .ft__grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
