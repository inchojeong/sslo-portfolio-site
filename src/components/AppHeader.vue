<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { ChevronDown } from 'lucide-vue-next';
import { nav } from '../data/site';

const route = useRoute();
const base = import.meta.env.BASE_URL;
const open = ref(false);
const scrolled = ref(false);
const openGroup = ref(null);

const onScroll = () => (scrolled.value = window.scrollY > 12);
onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

watch(
  () => route.fullPath,
  () => {
    open.value = false;
    openGroup.value = null;
  },
);

const isActive = (item) =>
  item.children ? item.children.some((c) => route.path.startsWith(c.to)) : route.path.startsWith(item.to);
</script>

<template>
  <header class="hd" :class="{ 'hd--solid': scrolled || open }">
    <div class="container hd__bar">
      <RouterLink to="/" class="hd__logo" aria-label="S.S.L.O 홈">
        <img class="hd__logoimg" :src="`${base}brand/sslo-logo-gradient.svg`" alt="S.S.L.O" width="116" height="21" />
        <small class="hd__by">by TBELL</small>
      </RouterLink>

      <button
        class="hd__burger"
        :aria-expanded="open"
        aria-controls="gnb"
        aria-label="메뉴 열기"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>

      <nav id="gnb" class="hd__nav" :class="{ 'is-open': open }" aria-label="주 메뉴">
        <ul>
          <li
            v-for="item in nav"
            :key="item.label"
            class="hd__item"
            @mouseenter="item.children && (openGroup = item.label)"
            @mouseleave="openGroup = null"
          >
            <RouterLink
              v-if="!item.children"
              :to="item.to"
              class="hd__link"
              :class="{ 'is-active': isActive(item) }"
            >
              {{ item.label }}
            </RouterLink>
            <template v-else>
              <button
                class="hd__link hd__link--btn"
                :class="{ 'is-active': isActive(item) }"
                :aria-expanded="openGroup === item.label"
                @click="openGroup = openGroup === item.label ? null : item.label"
              >
                {{ item.label }} <ChevronDown :size="16" :stroke-width="1.75" aria-hidden="true" />
              </button>
              <ul class="hd__sub" :class="{ 'is-open': openGroup === item.label }">
                <li v-for="c in item.children" :key="c.to">
                  <RouterLink :to="c.to">
                    <span class="hd__txt">
                      <strong>{{ c.label }}</strong>
                      <em>{{ c.desc }}</em>
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        <RouterLink to="/contact" class="btn btn--primary hd__cta">문의하기</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.hd { position: fixed; inset: 0 0 auto 0; z-index: 100; transition: background 0.3s, box-shadow 0.3s; }
.hd--solid { background: rgb(10 11 31 / 72%); backdrop-filter: blur(18px) saturate(140%); box-shadow: 0 1px 0 rgb(255 255 255 / 8%); }
.hd--solid::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--grad); opacity: 0.45; }
.hd__bar { height: var(--header-h); display: flex; align-items: center; justify-content: space-between; gap: 24px; }
.hd__logo { display: flex; align-items: center; gap: 12px; color: #fff; }
.hd__logoimg { height: 26px; width: auto; filter: drop-shadow(0 0 14px rgb(133 121 243 / 55%)); }
.hd__by { font-size: 10.5px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--violet-300); padding-left: 12px; border-left: 1px solid rgb(255 255 255 / 22%); }

.hd__nav { display: flex; align-items: center; gap: 28px; }
.hd__nav > ul { display: flex; gap: 4px; }
.hd__item { position: relative; }
.hd__link {
  display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 10px;
  color: #d8e2f2; font-weight: 600; font-size: 15.5px; background: none; border: 0; transition: color 0.2s, background 0.2s;
}
.hd__link svg { opacity: 0.7; transition: transform 0.2s; }
.hd__link[aria-expanded="true"] svg { transform: rotate(180deg); }
.hd__link:hover, .hd__link.is-active { color: #fff; background: rgb(255 255 255 / 8%); }
.hd__link.is-active { color: var(--violet-300); }

.hd__sub {
  position: absolute; left: 0; top: calc(100% + 6px); min-width: 280px; padding: 10px; border-radius: 16px;
  background: #fff; box-shadow: 0 24px 50px -18px rgb(0 0 0 / 45%); opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: all 0.22s;
}
.hd__sub.is-open { opacity: 1; visibility: visible; transform: none; }
.hd__sub a { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 10px; color: var(--ink); }
.hd__sub a:hover { background: var(--violet-50); }
.hd__txt { display: block; }
.hd__sub strong { display: block; font-size: 15px; }
.hd__sub em { display: block; font-style: normal; font-size: 13px; color: var(--muted); }
.hd__cta { padding: 10px 20px; font-size: 14.5px; }

.hd__burger { display: none; width: 44px; height: 44px; border: 0; background: none; padding: 10px; }
.hd__burger span { display: block; height: 2px; background: #fff; margin: 6px 0; border-radius: 2px; }

@media (max-width: 960px) {
  .hd__burger { display: block; }
  .hd__nav {
    position: fixed; inset: var(--header-h) 0 0 0; background: var(--navy-900); flex-direction: column; align-items: stretch;
    padding: 20px 24px 40px; gap: 16px; overflow-y: auto; transform: translateX(100%); transition: transform 0.3s; visibility: hidden;
  }
  .hd__nav.is-open { transform: none; visibility: visible; }
  .hd__nav > ul { flex-direction: column; }
  .hd__link { width: 100%; justify-content: space-between; font-size: 18px; padding: 14px 8px; }
  .hd__sub { position: static; opacity: 1; visibility: visible; transform: none; display: none; background: rgb(255 255 255 / 5%); box-shadow: none; }
  .hd__sub.is-open { display: block; }
  .hd__sub a { color: #fff; }
  .hd__sub em { color: #9ea5cf; }
  .hd__sub a:hover { background: rgb(255 255 255 / 8%); }
  .hd__cta { align-self: stretch; }
}
</style>
