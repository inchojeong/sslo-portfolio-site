<script setup>
import { computed, reactive, ref } from 'vue';
import PageHero from '../components/PageHero.vue';
import { Phone, Mail, ChevronDown } from 'lucide-vue-next';
import { site } from '../data/site';

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
const MAX = 1000;

// tbell.sslo.ai/contact 와 동일한 관심 분야 목록
const interests = [
  '정부일반형 스마트공장',
  '제조AI특화 — 데이터 수집·검증',
  '제조AI특화 — AI공장 구축',
  '클라우드 종합솔루션',
  '제조데이터 상품 가공지원',
  '스마트제조 공정혁신 R&D',
];

const form = reactive({ interests: [], name: '', company: '', email: '', phone: '', message: '', agree: false });
const state = ref('idle'); // idle | sending | done | mailto | error
const errors = reactive({});
const consentOpen = ref(false);

// 글자 수: 관심 분야 + 문의 내용 합산 1000자 이내
const used = computed(() => form.interests.join(', ').length + form.message.length);
const remain = computed(() => MAX - used.value);

function toggle(name) {
  const i = form.interests.indexOf(name);
  if (i >= 0) form.interests.splice(i, 1);
  else form.interests.push(name);
  delete errors.interests;
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.interests.length) errors.interests = '관심 분야를 하나 이상 선택해 주세요.';
  if (!form.name.trim()) errors.name = '이름을 입력해 주세요.';
  if (!form.company.trim()) errors.company = '회사명을 입력해 주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = '올바른 이메일 주소를 입력해 주세요.';
  if (!/^[0-9+\-\s()]{8,}$/.test(form.phone.trim())) errors.phone = '연락처를 입력해 주세요.';
  if (!form.message.trim()) errors.message = '문의 내용을 입력해 주세요.';
  else if (remain.value < 0) errors.message = `문의 내용은 관심 분야 포함 ${MAX}자 이내로 입력해 주세요.`;
  if (!form.agree) {
    errors.agree = '개인정보 수집 및 이용에 동의해 주세요.';
    consentOpen.value = true;
  }
  return !Object.keys(errors).length;
}

async function submit() {
  if (!validate()) return;
  const { agree, ...payload } = form;

  if (endpoint) {
    state.value = 'sending';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(res.statusText);
      state.value = 'done';
    } catch {
      state.value = 'error';
    }
    return;
  }

  if (site.email) {
    const body = `관심 분야: ${form.interests.join(', ')}\n이름: ${form.name}\n회사명: ${form.company}\n이메일: ${form.email}\n연락처: ${form.phone}\n\n${form.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('[S.S.L.O 라벨링 문의] ' + form.company)}&body=${encodeURIComponent(body)}`;
    state.value = 'mailto';
    return;
  }

  state.value = 'error';
}
</script>

<template>
  <PageHero
    eyebrow="Contact"
    title="데이터 라벨링 상담"
    lead="필요한 데이터와 일정, 참여 예정인 지원 사업을 알려 주시면 진행 방식을 제안해 드립니다."
    :crumbs="['문의하기']"
  />

  <section class="section">
    <div class="container wrap">
      <aside class="side">
        <ul class="info">
          <li>
            <Phone :size="18" :stroke-width="1.75" class="ico" aria-hidden="true" />
            <div><a :href="`tel:${site.tel.replace(/[^0-9]/g, '')}`">{{ site.tel }}</a><small>견적 상담</small></div>
          </li>
          <li v-if="site.email">
            <Mail :size="18" :stroke-width="1.75" class="ico" aria-hidden="true" />
            <div><a :href="`mailto:${site.email}`">{{ site.email }}</a><small>이메일</small></div>
          </li>
        </ul>
      </aside>

      <form class="form" novalidate @submit.prevent="submit">
        <div v-if="state === 'done'" class="msg msg--ok" role="status">문의가 접수되었습니다. 확인 후 연락드리겠습니다.</div>
        <div v-else-if="state === 'mailto'" class="msg msg--ok" role="status">메일 앱이 열립니다. 내용을 확인하고 전송해 주세요.</div>
        <div v-else-if="state === 'error'" class="msg msg--err" role="alert">
          지금은 온라인 접수를 할 수 없습니다. 전화({{ site.tel }})로 문의해 주세요.
        </div>

        <fieldset class="step">
          <legend><span class="no">01</span> 관심 분야 <i class="req">*</i> <small>복수 선택</small></legend>
          <div class="chips">
            <button
              v-for="t in interests"
              :key="t"
              type="button"
              class="opt"
              :class="{ on: form.interests.includes(t) }"
              :aria-pressed="form.interests.includes(t)"
              @click="toggle(t)"
            >{{ t }}</button>
          </div>
          <em v-if="errors.interests">{{ errors.interests }}</em>
        </fieldset>

        <fieldset class="step">
          <legend><span class="no">02</span> 담당자 정보</legend>
          <div class="row">
            <label>
              <span>이름 <i class="req">*</i></span>
              <input v-model="form.name" type="text" autocomplete="name" placeholder="담당자 이름" :aria-invalid="!!errors.name" />
              <em v-if="errors.name">{{ errors.name }}</em>
            </label>
            <label>
              <span>회사명 <i class="req">*</i></span>
              <input v-model="form.company" type="text" autocomplete="organization" placeholder="회사 또는 기관명" :aria-invalid="!!errors.company" />
              <em v-if="errors.company">{{ errors.company }}</em>
            </label>
            <label>
              <span>이메일 <i class="req">*</i></span>
              <input v-model="form.email" type="email" autocomplete="email" placeholder="name@company.com" :aria-invalid="!!errors.email" />
              <em v-if="errors.email">{{ errors.email }}</em>
            </label>
            <label>
              <span>연락처 <i class="req">*</i></span>
              <input v-model="form.phone" type="tel" autocomplete="tel" placeholder="010-0000-0000" :aria-invalid="!!errors.phone" />
              <em v-if="errors.phone">{{ errors.phone }}</em>
            </label>
          </div>
        </fieldset>

        <fieldset class="step">
          <legend><span class="no">03</span> 문의 내용 <i class="req">*</i></legend>
          <label>
            <textarea
              v-model="form.message"
              rows="6"
              aria-label="문의 내용"
              :aria-invalid="!!errors.message"
              placeholder="예) 제조AI특화 바우처 신청 예정. 생산라인 불량 이미지 약 5만 장 수집·라벨링 필요, 상반기 내 납품 목표"
            />
            <small class="count" :class="{ over: remain < 0 }">{{ remain }}자 남음 (관심 분야 포함 {{ MAX }}자 이내)</small>
            <em v-if="errors.message">{{ errors.message }}</em>
          </label>
        </fieldset>

        <div class="consent">
          <p class="consent__lead">
            ㈜티벨은 「개인정보 보호법」에 따라 데이터 라벨링 문의 접수 및 상담을 위해 아래와 같이 개인정보를 수집·이용하고자 합니다.
            내용을 자세히 읽으신 후 동의 여부를 선택하여 주시기 바랍니다.
          </p>
          <div class="consent__bar">
            <label class="agree">
              <input v-model="form.agree" type="checkbox" />
              <span><b>[필수]</b> 개인정보 수집 및 이용 동의</span>
            </label>
            <button
              type="button"
              class="consent__toggle"
              :aria-expanded="consentOpen"
              :aria-label="`[필수] 개인정보 수집 및 이용 동의 내용 ${consentOpen ? '접기' : '펼치기'}`"
              @click="consentOpen = !consentOpen"
            >
              <ChevronDown :size="18" :stroke-width="1.75" :class="{ rot: consentOpen }" aria-hidden="true" />
            </button>
          </div>
          <div v-show="consentOpen" class="consent__body">
            <p><b>수집·이용 목적:</b> 데이터 라벨링 문의 접수 및 상담</p>
            <p><b>수집 항목:</b> 이름, 회사명, 이메일, 연락처, 관심 분야, 문의 내용</p>
            <p><b>보유 및 이용기간:</b> 문의 및 상담 완료시 파기</p>
            <p class="note">
              ※ 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만, 필수항목의 수집 및 이용에 동의하지 않을 경우에는 문의 접수 및 회신이 제한됩니다.
              자세한 내용은 <RouterLink to="/privacy" target="_blank" class="text-link">개인정보처리방침</RouterLink>을 확인해 주세요.
            </p>
          </div>
          <em v-if="errors.agree">{{ errors.agree }}</em>
        </div>

        <div class="actions">
          <button class="btn btn--dark" type="submit" :disabled="state === 'sending'">
            {{ state === 'sending' ? '전송 중…' : '문의하기' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.wrap { display: grid; grid-template-columns: 300px 1fr; gap: 72px; align-items: start; }
.side { padding-top: 6px; border-top: 2px solid var(--ink); }
.info { display: grid; gap: 22px; padding-top: 22px; }
.info li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; }
.info .ico { margin-top: 3px; flex: none; }
.info a { font-weight: 600; color: var(--ink); }
.info a:hover { color: var(--violet-600); }
.info small { display: block; margin-top: 2px; font-size: 12.5px; color: var(--muted); }

.form { display: grid; gap: 44px; }
.step { display: grid; gap: 18px; border: 0; padding: 0; min-width: 0; }
.step legend { float: left; width: 100%; padding: 0; margin-bottom: 18px; font-weight: 800; font-size: 16px; }
.step legend small { margin-left: 6px; font-size: 12.5px; font-weight: 500; color: var(--muted); }
.no { margin-right: 6px; font-size: 12.5px; font-weight: 800; letter-spacing: 0.1em; color: var(--violet-500); }
.req { font-style: normal; color: var(--violet-500); }

.chips { display: flex; flex-wrap: wrap; gap: 8px; clear: both; }
.opt { padding: 10px 16px; border: 1px solid var(--line); border-radius: 6px; background: #fff; color: var(--ink-2); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.opt:hover { border-color: var(--violet-400); }
.opt.on { border-color: var(--violet-500); background: var(--violet-50); color: var(--violet-600); }
.opt:focus-visible { outline: 3px solid var(--violet-100); outline-offset: 1px; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 26px 32px; clear: both; }
label { display: grid; gap: 6px; }
label > span { font-weight: 700; font-size: 13px; color: var(--ink-2); }
input[type='text'], input[type='email'], input[type='tel'], textarea {
  width: 100%; padding: 10px 2px; border: 0; border-bottom: 1.5px solid var(--line); border-radius: 0; background: transparent; font-size: 15px; transition: border-color 0.2s;
}
textarea { padding: 14px; border: 1.5px solid var(--line); border-radius: 6px; resize: vertical; clear: both; }
input:focus, textarea:focus { outline: none; border-color: var(--violet-500); }
::placeholder { color: #a3a8bf; }
[aria-invalid='true'] { border-color: #e04b4b; }
em { font-style: normal; font-size: 13px; color: #d33; }
.count { text-align: right; font-size: 12.5px; color: var(--muted); }
.count.over { color: #d33; }

.consent { display: grid; gap: 14px; }
.consent__lead { font-size: 13px; color: var(--muted); }
.consent__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.agree { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
.agree input { width: 18px; height: 18px; accent-color: var(--violet-500); }
.agree b { color: var(--violet-500); }
.consent__toggle { display: grid; place-items: center; width: 32px; height: 32px; border: 0; background: none; color: var(--muted); cursor: pointer; border-radius: 6px; }
.consent__toggle:hover { color: var(--ink); background: var(--bg-soft); }
.consent__toggle .rot { transform: rotate(180deg); }
.consent__body { display: grid; gap: 4px; margin-top: -4px; padding: 16px 18px; background: var(--bg-soft); border-radius: 6px; font-size: 13px; color: var(--ink-2); }
.consent__body .note { margin-top: 6px; color: var(--muted); }

.actions { display: flex; justify-content: flex-end; }
.btn[disabled] { opacity: 0.6; cursor: wait; }
.msg { padding: 14px 18px; border-radius: 10px; font-weight: 600; }
.msg--ok { background: var(--violet-50); color: var(--violet-600); }
.msg--err { background: #fdecec; color: #b42323; }

@media (max-width: 960px) { .wrap { grid-template-columns: 1fr; gap: 40px; } }
@media (max-width: 560px) { .row { grid-template-columns: 1fr; } }
</style>
