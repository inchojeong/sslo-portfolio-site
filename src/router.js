import { createRouter, createWebHistory } from 'vue-router';

// 새 페이지는 여기에 라우트를 추가하고 data/site.js 의 nav 에 메뉴를 더하면 됩니다.
const routes = [
  { path: '/', component: () => import('./views/HomeView.vue'), meta: { title: '티벨 연구개발 포트폴리오' } },
  { path: '/rnd', redirect: '/rnd/history' },
  { path: '/rnd/history', component: () => import('./views/HistoryView.vue'), meta: { title: '연구개발 연혁' } },
  { path: '/rnd/projects', component: () => import('./views/ProjectsView.vue'), meta: { title: '수행실적' } },
  { path: '/services', component: () => import('./views/ServicesView.vue'), meta: { title: 'AI 서비스' } },
  { path: '/services/data-build', component: () => import('./views/ServiceDetailView.vue'), props: { slug: 'data-build' }, meta: { title: 'AI 데이터 구축' } },
  { path: '/services/data-analytics', component: () => import('./views/ServiceDetailView.vue'), props: { slug: 'data-analytics' }, meta: { title: '데이터 분석·활용' } },
  { path: '/services/analytics-system', component: () => import('./views/ServiceDetailView.vue'), props: { slug: 'analytics-system' }, meta: { title: '데이터 분석 시스템 개발' } },
  { path: '/services/ai-learning', component: () => import('./views/ServiceDetailView.vue'), props: { slug: 'ai-learning' }, meta: { title: 'AI 학습·적용 기술' } },
  { path: '/assets', component: () => import('./views/AssetsView.vue'), meta: { title: '기술자산 및 연구성과' } },
  { path: '/sslo', component: () => import('./views/SsloView.vue'), meta: { title: 'S.S.L.O 솔루션' } },
  { path: '/cases', component: () => import('./views/CasesView.vue'), meta: { title: '분야별 사례' } },
  { path: '/company', component: () => import('./views/CompanyView.vue'), meta: { title: '회사소개' } },
  { path: '/contact', component: () => import('./views/ContactView.vue'), meta: { title: '문의' } },
  { path: '/licenses', component: () => import('./views/LicensesView.vue'), meta: { title: '오픈소스 라이선스' } },
  { path: '/privacy', component: () => import('./views/PrivacyView.vue'), meta: { title: '개인정보처리방침' } },
  { path: '/:pathMatch(.*)*', component: () => import('./views/NotFoundView.vue'), meta: { title: '페이지를 찾을 수 없습니다' } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved;
    if (to.hash) return { el: to.hash, top: 90, behavior: 'smooth' };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  const t = to.meta?.title;
  document.title = t ? `${t} | S.S.L.O · TBELL` : 'S.S.L.O | 티벨 연구개발 포트폴리오';
});

export default router;
