// v-reveal: 화면에 들어올 때 부드럽게 나타나는 지시자.
// 사용자가 "동작 줄이기"를 설정했거나 IntersectionObserver 가 없으면 즉시 표시합니다.
let observer;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  );
  return observer;
}

export const vReveal = {
  mounted(el, binding) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') return;
    el.classList.add('reveal');
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`;
    getObserver().observe(el);
  },
};
