<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import PageHero from '../components/PageHero.vue';
import SectionHead from '../components/SectionHead.vue';
import PipelineViz from '../components/PipelineViz.vue';
import StepFlow from '../components/StepFlow.vue';
import ArchBoard from '../components/ArchBoard.vue';
import { evidence } from '../data/assets';
import { pipelineStages, toolGroups, serviceProcess } from '../data/sslo';
import {
  captures, captureExcluded, coreArch, trainPipeline, inferencePipeline, augmentPipeline, modelSelection, archNotes,
  processSteps, strengths, labelingTools, preprocessing, collection, automation, deployFormats, industries, processNotes,
} from '../data/proposal';

// 검토용 페이지: 메뉴에 노출하지 않고 검색엔진 색인도 막습니다.
let meta;
onMounted(() => {
  meta = document.createElement('meta');
  meta.name = 'robots';
  meta.content = 'noindex, nofollow';
  document.head.appendChild(meta);
});
onBeforeUnmount(() => meta?.remove());

const diagrams = [trainPipeline, inferencePipeline, augmentPipeline, modelSelection];
</script>

<template>
  <PageHero
    eyebrow="Review"
    title="기존 소스 반영안 비교"
    lead="기존 솔루션 소스(solution-frontend, solution-ai-model)에서 가져온 보강안을 현재 사이트 내용과 나란히 비교합니다. 이 페이지는 검토용이며 실제 페이지에는 아직 적용하지 않았습니다."
    :crumbs="['반영안 비교']"
  />

  <!-- 1. 솔루션 캡처 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="Compare 1"
        title="솔루션 캡처"
        lead="기술자산 페이지의 '실제 증빙 자료 - 솔루션 캡처(준비 중)' 자리에 기존 소스의 화면 이미지를 넣었을 때입니다."
      />
      <div class="cmp">
        <div class="cmp__col">
          <p class="cmp__tag">현재 적용 중 · 기술자산 페이지</p>
          <ul class="cur-ev">
            <li v-for="e in evidence" :key="e.title">
              <strong>{{ e.title }}</strong>
              <span>{{ e.text }}</span>
              <em class="chip chip--slate">준비 중</em>
            </li>
          </ul>
        </div>
        <div class="cmp__col">
          <p class="cmp__tag cmp__tag--new">제안 · 기존 소스 반영</p>
          <div class="caps">
            <figure v-for="c in captures" :key="c.src" class="cap">
              <div class="cap__frame"><img :src="c.src" :alt="c.title" loading="lazy" /></div>
              <figcaption>
                <strong>{{ c.title }}</strong>
                <span>{{ c.caption }}</span>
                <small>원본 {{ c.origin }} · {{ c.size }}</small>
                <ul class="notes"><li v-for="n in c.notes" :key="n">{{ n }}</li></ul>
              </figcaption>
            </figure>
          </div>
          <div class="excl">
            <p class="excl__t">게시 후보에서 제외한 이미지</p>
            <ul>
              <li v-for="x in captureExcluded" :key="x.name"><b>{{ x.name }}</b> — {{ x.reason }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. 아키텍처·순서도 -->
  <section class="section section--dark">
    <div class="container">
      <SectionHead
        eyebrow="Compare 2"
        title="아키텍처 · 순서도"
        lead="S.S.L.O 페이지에는 단계 요약(순환 구조)만 있습니다. 기존 AI 코어 문서의 구성도와 처리 흐름을 새 디자인으로 다시 그린 안입니다."
      />

      <div class="blk">
        <p class="cmp__tag">현재 적용 중 · S.S.L.O 페이지 &quot;세부 순환 구조&quot;</p>
        <div class="panel"><PipelineViz :stages="pipelineStages" /></div>
      </div>

      <div class="blk">
        <p class="cmp__tag cmp__tag--new">제안 · 시스템 구성도 (AI Core Architecture)</p>
        <div class="panel">
          <ArchBoard :lanes="coreArch.lanes" />
          <ol class="flows">
            <li v-for="f in coreArch.flows" :key="f">{{ f }}</li>
          </ol>
        </div>
      </div>

      <div v-for="d in diagrams" :key="d.title" class="blk">
        <p class="cmp__tag cmp__tag--new">제안 · {{ d.title }}</p>
        <div class="panel">
          <p class="panel__cap">{{ d.caption }}</p>
          <StepFlow :steps="d.steps" />
        </div>
      </div>

      <ul class="notes notes--dark">
        <li v-for="n in archNotes" :key="n">{{ n }}</li>
      </ul>
    </div>
  </section>

  <!-- 3. 절차·도구·데이터 처리 -->
  <section class="section">
    <div class="container">
      <SectionHead
        eyebrow="Compare 3"
        title="서비스 절차 · 도구 · 데이터 처리 기법"
        lead="기존 소개사이트(Service.vue, Solution.vue)의 상세 문구를 현재 내용과 비교합니다."
      />

      <!-- 3-1 절차 -->
      <h3 class="h3 sub">3-1. 데이터 구축 진행 절차</h3>
      <div class="cmp">
        <div class="cmp__col">
          <p class="cmp__tag">현재 적용 중 · 5단계 (고객 관점)</p>
          <ol class="proc proc--cur">
            <li v-for="(s, i) in serviceProcess" :key="s.title">
              <span class="proc__no">{{ String(i + 1).padStart(2, '0') }}</span>
              <h4>{{ s.title }}</h4>
              <ul class="dot"><li v-for="it in s.items" :key="it">{{ it }}</li></ul>
            </li>
          </ol>
        </div>
        <div class="cmp__col">
          <p class="cmp__tag cmp__tag--new">제안 · 8단계 (작업 관점, 세부 항목 포함)</p>
          <ol class="proc proc--new">
            <li v-for="(s, i) in processSteps" :key="s.title">
              <span class="proc__no">{{ String(i + 1).padStart(2, '0') }}</span>
              <h4>{{ s.title }}</h4>
              <ul class="dot"><li v-for="it in s.items" :key="it">{{ it }}</li></ul>
            </li>
          </ol>
        </div>
      </div>
      <p class="muted small cap-note">두 안은 단계 구분 기준이 다릅니다. 현재 안에만 있는 &quot;계약·견적, 완료된 데이터 파기&quot;와 제안 안에만 있는 &quot;정책 수립, 테스트(모델 학습 검증)&quot;를 합칠지 정해야 합니다.</p>

      <!-- 3-2 강점 -->
      <h3 class="h3 sub">3-2. 서비스 강점</h3>
      <div class="cmp">
        <div class="cmp__col">
          <p class="cmp__tag">현재 적용 중</p>
          <p class="empty">현재 사이트에는 서비스 강점 6가지에 해당하는 항목이 없습니다.</p>
        </div>
        <div class="cmp__col">
          <p class="cmp__tag cmp__tag--new">제안</p>
          <ul class="str">
            <li v-for="s in strengths" :key="s.title">
              <strong>{{ s.title }}</strong>
              <span>{{ s.text }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- 3-3 도구 -->
      <h3 class="h3 sub">3-3. 라벨링 도구</h3>
      <div class="cmp">
        <div class="cmp__col">
          <p class="cmp__tag">현재 적용 중 · 3단계 도구</p>
          <ul class="tg">
            <li v-for="t in toolGroups" :key="t.name">
              <strong>{{ t.name }}</strong>
              <em class="chip chip--violet">{{ t.badge }}</em>
              <span>{{ t.text }}</span>
            </li>
          </ul>
        </div>
        <div class="cmp__col">
          <p class="cmp__tag cmp__tag--new">제안 · Manual Tools 8종 설명 추가</p>
          <dl class="tools">
            <div v-for="t in labelingTools" :key="t.name"><dt>{{ t.name }}</dt><dd>{{ t.text }}</dd></div>
          </dl>
        </div>
      </div>

      <!-- 3-4 데이터 처리 -->
      <h3 class="h3 sub">3-4. 데이터 수집 · 전처리 · 자동화</h3>
      <div class="cmp">
        <div class="cmp__col">
          <p class="cmp__tag">현재 적용 중</p>
          <p class="empty">현재 사이트에는 전처리·정제 기법과 수집 방식, 자동화 기능의 세부 목록이 없습니다.</p>
        </div>
        <div class="cmp__col">
          <p class="cmp__tag cmp__tag--new">제안</p>
          <div class="grp">
            <h4>수집 방식</h4>
            <ul class="kv"><li v-for="c in collection" :key="c.name"><b>{{ c.name }}</b> {{ c.text }}</li></ul>
          </div>
          <div class="grp">
            <h4>이미지 전처리 기술 {{ preprocessing.image.length }}종</h4>
            <p class="tags"><span v-for="p in preprocessing.image" :key="p" class="chip chip--blue">{{ p }}</span></p>
          </div>
          <div class="grp">
            <h4>정제 기술 {{ preprocessing.purification.length }}종</h4>
            <p class="tags"><span v-for="p in preprocessing.purification" :key="p" class="chip chip--blue">{{ p }}</span></p>
          </div>
          <div class="grp">
            <h4>자동화 기능</h4>
            <ul class="kv kv--block"><li v-for="a in automation" :key="a.name"><b>{{ a.name }}</b><span>{{ a.text }}</span></li></ul>
          </div>
          <div class="grp">
            <h4>모델 배포 형식</h4>
            <p class="tags"><span v-for="f in deployFormats" :key="f" class="chip chip--blue">{{ f }}</span></p>
          </div>
          <div class="grp">
            <h4>적용 산업 분야</h4>
            <p class="tags"><span v-for="i in industries" :key="i" class="chip chip--slate">{{ i }}</span></p>
          </div>
        </div>
      </div>

      <ul class="notes">
        <li v-for="n in processNotes" :key="n">{{ n }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.cmp { display: grid; grid-template-columns: 1fr 1.25fr; gap: 40px; align-items: start; }
.cmp__tag { display: inline-flex; margin-bottom: 18px; padding: 4px 12px; border-radius: 999px; font-size: 12.5px; font-weight: 700; background: #f1f2f9; color: #4a5073; border: 1px solid #e3e5f2; }
.cmp__tag--new { background: var(--violet-50); color: var(--violet-600); border-color: var(--violet-100); }
.section--dark .cmp__tag { background: rgb(255 255 255 / 6%); color: #aeb4d8; border-color: var(--glass-line); }
.section--dark .cmp__tag--new { background: rgb(133 121 243 / 16%); color: var(--violet-300); border-color: rgb(133 121 243 / 35%); }
.sub { margin: 72px 0 24px; padding-top: 22px; border-top: 1px solid var(--line); }
.sub:first-of-type { margin-top: 8px; }
.cap-note { margin-top: 16px; }
.empty { padding: 22px; border: 1.5px dashed #c9c6ea; border-radius: var(--radius); background: #fbfaff; color: var(--muted); font-size: 14.5px; }

/* 1 */
.cur-ev { display: grid; gap: 14px; }
.cur-ev li { display: grid; gap: 4px; padding: 16px 18px; border: 1.5px dashed #c9c6ea; border-radius: var(--radius); background: #fbfaff; }
.cur-ev span { font-size: 14px; color: var(--muted); }
.cur-ev .chip { justify-self: start; margin-top: 4px; }
.caps { display: grid; gap: 28px; }
.cap__frame { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fff; box-shadow: var(--shadow-sm); }
.cap__frame img { width: 100%; height: auto; }
.cap figcaption { display: grid; gap: 6px; margin-top: 14px; }
.cap figcaption strong { font-size: 17px; }
.cap figcaption span { color: var(--ink-2); font-size: 14.5px; }
.cap figcaption small { color: var(--muted); font-size: 12.5px; word-break: break-all; }
.notes { display: grid; gap: 4px; margin-top: 4px; font-size: 13px; color: #9a5b00; }
.notes li { position: relative; padding-left: 14px; }
.notes li::before { content: ''; position: absolute; left: 0; top: 0.65em; width: 5px; height: 5px; border-radius: 50%; background: #e0a22a; }
.notes--dark { margin-top: 40px; color: #e9c46a; }
.excl { margin-top: 28px; padding-top: 18px; border-top: 1px solid var(--line); font-size: 13.5px; color: var(--ink-2); }
.excl__t { font-weight: 700; margin-bottom: 8px; }
.excl ul { display: grid; gap: 6px; }

/* 2 */
.blk { margin-top: 48px; }
.blk:first-of-type { margin-top: 8px; }
.panel { padding: 28px; border-radius: var(--radius); border: 1px solid var(--glass-line); background: rgb(255 255 255 / 3%); }
.panel__cap { margin-bottom: 18px; color: #aeb4d8; font-size: 14.5px; }
.flows { counter-reset: f; display: grid; gap: 8px; margin-top: 26px; padding-top: 20px; border-top: 1px solid var(--glass-line); color: #c8cdea; font-size: 14px; }
.flows li { counter-increment: f; display: flex; gap: 12px; }
.flows li::before { content: counter(f, decimal-leading-zero); flex: none; font-weight: 800; color: var(--violet-300); letter-spacing: 0.1em; }

/* 3 */
.proc { display: grid; gap: 22px 18px; counter-reset: p; }
.proc--cur { grid-template-columns: 1fr; }
.proc--new { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.proc > li { position: relative; padding-top: 18px; border-top: 1px solid var(--line); }
.proc > li::before { content: ''; position: absolute; left: 0; top: -1px; width: 44px; height: 2px; background: var(--grad); }
.proc__no { font-size: 12.5px; font-weight: 800; letter-spacing: 0.14em; color: var(--violet-500); }
.proc h4 { margin: 4px 0 8px; font-size: 17px; }
.dot { display: grid; gap: 6px; font-size: 14px; color: var(--ink-2); }
.dot li { position: relative; padding-left: 14px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 5px; height: 5px; border-radius: 50%; background: var(--violet-500); }
.str { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 28px; }
.str li { display: grid; gap: 4px; padding-top: 14px; border-top: 1px solid var(--line); }
.str span { font-size: 14px; color: var(--ink-2); }
.tg { display: grid; gap: 18px; }
.tg li { display: grid; gap: 6px; padding-top: 14px; border-top: 1px solid var(--line); justify-items: start; }
.tg span { font-size: 14px; color: var(--muted); }
.tools { display: grid; gap: 0; }
.tools > div { display: grid; grid-template-columns: 110px 1fr; gap: 14px; padding: 13px 0; border-top: 1px solid var(--line); font-size: 14.5px; }
.tools > div:last-child { border-bottom: 1px solid var(--line); }
.tools dt { font-weight: 800; color: var(--violet-600); }
.tools dd { color: var(--ink-2); }
.grp { margin-bottom: 26px; }
.grp h4 { font-size: 15px; margin-bottom: 10px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.kv { display: grid; gap: 6px; font-size: 14.5px; color: var(--ink-2); }
.kv b { margin-right: 8px; color: var(--ink); }
.kv--block { gap: 12px; }
.kv--block li { display: grid; gap: 2px; }

@media (max-width: 960px) {
  .cmp { grid-template-columns: 1fr; }
  .proc--new, .str { grid-template-columns: 1fr; }
}
@media (max-width: 560px) { .tools > div { grid-template-columns: 1fr; gap: 2px; } }
</style>
