<script setup>
// AI 신경망을 형상화한 캔버스 배경: 떠다니는 노드, 가까운 노드 간 연결선, 연결선을 따라 흐르는 신호(pulse),
// 마우스 위치에 반응하는 연결. 화면 밖이거나 탭이 숨겨지면 멈추고, "동작 줄이기" 설정 시 정지 화면으로 그립니다.
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  density: { type: Number, default: 1 }, // 노드 밀도 배율
  interactive: { type: Boolean, default: true },
  opacity: { type: Number, default: 1 },
});

const wrap = ref(null);
const canvas = ref(null);

const COLORS = [
  [53, 128, 227], // blue
  [133, 121, 243], // violet
  [181, 120, 239], // lilac
  [217, 100, 182], // pink
];

let ctx, w = 0, h = 0, dpr = 1, raf = 0, running = false, visible = true;
let nodes = [];
let pulses = [];
const mouse = { x: -9999, y: -9999, active: false };
let ro, io;
const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function build() {
  const count = Math.min(150, Math.max(24, Math.round(((w * h) / 14000) * props.density)));
  nodes = Array.from({ length: count }, () => {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 1.6 + 0.8,
      c,
      ph: Math.random() * Math.PI * 2,
    };
  });
  pulses = [];
}

function resize() {
  const box = wrap.value.getBoundingClientRect();
  w = box.width;
  h = box.height;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.value.width = w * dpr;
  canvas.value.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  build();
  if (reduce) frame(0);
}

const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

function frame(t) {
  ctx.clearRect(0, 0, w, h);
  const link = Math.min(170, Math.max(110, w / 9));
  const link2 = link * link;

  // 이동
  if (!reduce) {
    for (const n of nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < -20) n.x = w + 20;
      else if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20;
      else if (n.y > h + 20) n.y = -20;
      if (props.interactive && mouse.active) {
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 24000) {
          n.x += dx * 0.0022;
          n.y += dy * 0.0022;
        }
      }
    }
  }

  // 연결선
  const edges = [];
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < link2) {
        const k = 1 - d2 / link2;
        ctx.strokeStyle = rgba(a.c, k * 0.34);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        if (k > 0.45) edges.push([a, b]);
      }
    }
    // 마우스 연결
    if (props.interactive && mouse.active) {
      const dx = a.x - mouse.x;
      const dy = a.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 32000) {
        ctx.strokeStyle = rgba([217, 100, 182], (1 - d2 / 32000) * 0.65);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }

  // 신호(pulse) 발생과 이동
  if (!reduce && edges.length && pulses.length < 14 && Math.random() < 0.09) {
    const e = edges[Math.floor(Math.random() * edges.length)];
    pulses.push({ a: e[0], b: e[1], p: 0, s: 0.012 + Math.random() * 0.016 });
  }
  pulses = pulses.filter((p) => (p.p += p.s) < 1);
  for (const p of pulses) {
    const x = p.a.x + (p.b.x - p.a.x) * p.p;
    const y = p.a.y + (p.b.y - p.a.y) * p.p;
    const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.25, rgba(p.b.c, 0.7));
    g.addColorStop(1, rgba(p.b.c, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  // 노드
  for (const n of nodes) {
    const tw = reduce ? 1 : 0.65 + 0.35 * Math.sin(t * 0.0015 + n.ph);
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
    g.addColorStop(0, rgba(n.c, 0.55 * tw));
    g.addColorStop(1, rgba(n.c, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = rgba([255, 255, 255], 0.9 * tw);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();
  }

  if (running) raf = requestAnimationFrame(frame);
}

function start() {
  if (reduce || running || !visible || document.hidden) return;
  running = true;
  raf = requestAnimationFrame(frame);
}
function stop() {
  running = false;
  cancelAnimationFrame(raf);
}

function onMove(e) {
  const r = wrap.value.getBoundingClientRect();
  mouse.x = e.clientX - r.left;
  mouse.y = e.clientY - r.top;
  mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= r.width && mouse.y <= r.height;
}
const onLeave = () => (mouse.active = false);
const onVis = () => (document.hidden ? stop() : start());

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  resize();
  ro = new ResizeObserver(resize);
  ro.observe(wrap.value);
  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    visible ? start() : stop();
  });
  io.observe(wrap.value);
  document.addEventListener('visibilitychange', onVis);
  if (props.interactive) {
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
  }
  start();
});

onBeforeUnmount(() => {
  stop();
  ro?.disconnect();
  io?.disconnect();
  document.removeEventListener('visibilitychange', onVis);
  window.removeEventListener('pointermove', onMove);
  document.removeEventListener('pointerleave', onLeave);
});
</script>

<template>
  <div ref="wrap" class="neural" aria-hidden="true" :style="{ opacity }">
    <canvas ref="canvas" />
  </div>
</template>

<style scoped>
.neural { position: absolute; inset: 0; pointer-events: none; }
.neural canvas { width: 100%; height: 100%; display: block; }
</style>
