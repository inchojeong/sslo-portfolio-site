<script setup>
import PageHero from '../components/PageHero.vue';
import VerifyFlag from '../components/VerifyFlag.vue';
import { site } from '../data/site';

const effective = '2026년 11월 18일';

const collected = [
  { k: '필수', v: '이름, 회사명, 이메일, 연락처, 관심 분야, 문의 내용' },
];
</script>

<template>
  <PageHero
    eyebrow="Privacy"
    title="개인정보처리방침"
    :lead="`${site.company}(이하 '회사')는 문의하기를 통해 수집하는 개인정보를 소중히 다루며, 관련 법령을 준수합니다.`"
    :crumbs="['개인정보처리방침']"
  />

  <section class="section">
    <div class="container doc">
      <article class="flat" v-reveal>
        <h2 class="h3">1. 수집하는 개인정보 항목과 방법</h2>
        <p>회사는 홈페이지 &quot;문의하기&quot; 양식에서 이용자가 직접 입력한 정보만 수집합니다.</p>
        <dl class="kv">
          <div v-for="c in collected" :key="c.k"><dt>{{ c.k }}</dt><dd>{{ c.v }}</dd></div>
        </dl>
        <p class="muted small">문의 내용에 주민등록번호 등 고유식별정보나 민감정보는 입력하지 마십시오.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">2. 개인정보의 수집·이용 목적</h2>
        <ul class="dot">
          <li>데이터 라벨링 문의 접수 및 상담</li>
          <li>문의 내용 확인, 답변 및 회신을 위한 연락</li>
        </ul>
        <p>수집한 정보는 위 목적 외의 용도로 이용하지 않습니다.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">3. 보유 및 이용 기간</h2>
        <p>수집한 개인정보는 문의 및 상담이 완료되면 지체 없이 파기하며, 전자 파일은 복구할 수 없는 방법으로 삭제합니다.</p>
        <p class="muted small">다른 법령에서 보존 의무를 정한 경우에는 해당 기간 동안 분리하여 보관합니다.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">4. 개인정보의 제3자 제공과 처리위탁<VerifyFlag note="문의 접수 서버·메일 서비스를 외부에 위탁하면 수탁자와 위탁 업무를 여기에 명시해야 합니다." /></h2>
        <p>회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 법령에 근거가 있거나 수사기관이 적법한 절차로 요구하는 경우는 예외로 합니다.</p>
        <p>개인정보 처리업무를 외부에 위탁하는 경우에는 위탁받는 자와 위탁 업무 내용을 이 방침에 공개합니다.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">5. 이용자의 권리와 행사 방법</h2>
        <p>이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있으며 수집·이용 동의를 철회할 수 있습니다. 아래 연락처로 요청하시면 지체 없이 조치하겠습니다.</p>
        <p class="muted small">동의를 거부할 권리가 있으나, 필수 항목 수집에 동의하지 않으면 문의 접수가 제한됩니다.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">6. 자동 수집 장치(쿠키 등)</h2>
        <p>이 사이트는 방문자 분석 도구, 광고용 쿠키 등 이용자 행태정보를 수집하는 장치를 사용하지 않습니다.<VerifyFlag note="추후 접속 통계(GA 등)를 도입하면 이 항목과 쿠키 안내를 함께 수정해야 합니다." /></p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">7. 개인정보의 안전성 확보 조치<VerifyFlag note="실제 적용 중인 보호조치(암호화, 접근권한 관리 등)에 맞게 수정해 주세요." /></h2>
        <ul class="dot">
          <li>개인정보에 접근할 수 있는 담당자를 최소한으로 제한합니다.</li>
          <li>전송 구간은 암호화(HTTPS)하고, 접근 기록을 관리합니다.</li>
          <li>보유 기간이 지난 개인정보는 즉시 파기합니다.</li>
        </ul>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">8. 개인정보 보호책임자 및 문의처<VerifyFlag note="개인정보 보호책임자의 성명·직책·연락처를 확정해 입력해 주세요(개인정보 보호법 제31조)." /></h2>
        <dl class="kv">
          <div><dt>회사명</dt><dd>{{ site.company }}</dd></div>
          <div><dt>개인정보 보호책임자</dt><dd>(성명·직책 입력 필요)</dd></div>
          <div v-if="site.email"><dt>이메일</dt><dd>{{ site.email }}</dd></div>
          <div v-if="site.tel"><dt>전화</dt><dd>{{ site.tel }}</dd></div>
        </dl>
        <p class="muted small">개인정보 침해 신고·상담은 개인정보침해신고센터(privacy.kisa.or.kr, 국번 없이 118), 개인정보분쟁조정위원회(kopico.go.kr, 1833-6972)에 문의할 수 있습니다.</p>
      </article>

      <article class="flat" v-reveal>
        <h2 class="h3">9. 방침의 변경</h2>
        <p>이 방침은 {{ effective }}부터 적용됩니다.<VerifyFlag note="실제 시행일을 확정해 주세요." /> 내용이 변경되는 경우 시행 7일 전부터 홈페이지를 통해 알려드립니다.</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.doc { display: grid; gap: 44px; max-width: 840px; }
.flat { display: grid; gap: 12px; font-size: 15.5px; color: var(--ink-2); }
.flat .h3 { color: var(--ink); }
.dot { display: grid; gap: 6px; }
.dot li { position: relative; padding-left: 16px; }
.dot li::before { content: ''; position: absolute; left: 0; top: 0.72em; width: 5px; height: 5px; border-radius: 50%; background: var(--violet-500); }
.kv { display: grid; gap: 8px; }
.kv > div { display: grid; grid-template-columns: 150px 1fr; gap: 12px; font-size: 15px; }
.kv dt { font-weight: 700; color: var(--ink); }
@media (max-width: 560px) { .kv > div { grid-template-columns: 1fr; gap: 2px; } }
</style>
