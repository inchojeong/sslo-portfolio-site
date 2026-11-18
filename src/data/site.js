// 사이트 전역 정보. 문구/수치는 "티벨 회사소개서 2.0V (2026.10.01)" 및
// "연구개발 이력 및 홈페이지 개편 기획 요약(2026.11.18)" 기준입니다.

export const site = {
  name: 'S.S.L.O',
  company: '티벨(TBELL)',
  tagline: 'AI 학습데이터 구축과 소프트웨어 기술개발, 그 누적된 연구개발 포트폴리오',
  ceo: '김종균',
  founded: '2015.05.18',
  employees: { value: 220, asOf: '2025.12' },
  bizNo: '376-81-00089',
  tel: '070-7777-9113',
  fax: '070-7610-7540',
  web: 'https://www.tbell.co.kr',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'staff@tbell.co.kr',
  offices: [
    {
      type: '본사',
      address: '서울특별시 강남구 강남대로 354, 9층 (역삼동, 혜천빌딩)',
    },
    {
      type: '가산 지사',
      address: '서울특별시 금천구 가산디지털1로 168, A동 601호 (가산동, 우림라이온스밸리)',
    },
  ],
};

// 내비게이션: children 이 있으면 드롭다운으로 표시됩니다.
// 새 페이지를 추가할 때는 router.js 와 이 목록에만 항목을 더하면 됩니다.
export const nav = [
  {
    label: '연구개발',
    to: '/rnd/history',
    children: [
      { label: '연구개발 연혁', to: '/rnd/history', desc: '2015년부터 이어진 개발 활동' },
      { label: '수행실적', to: '/rnd/projects', desc: '프로젝트별 역할과 결과물' },
    ],
  },
  {
    label: 'AI 서비스',
    to: '/services',
    children: [
      { label: '서비스 전체 보기', to: '/services', desc: '네 가지 서비스와 대표 수행 사례' },
      { label: 'AI 데이터 구축', to: '/services/data-build', desc: '수집·정제·가공·검수' },
      { label: '데이터 분석·활용', to: '/services/data-analytics', desc: '지표 설계와 데이터 해석' },
      { label: '데이터 분석 시스템 개발', to: '/services/analytics-system', desc: '수집·저장·분석·대시보드' },
      { label: 'AI 학습·적용 기술', to: '/services/ai-learning', desc: '학습·추론·자동 라벨링·검수' },
    ],
  },
  { label: '기술자산', to: '/assets' },
  { label: 'S.S.L.O', to: '/sslo' },
  { label: '분야별 사례', to: '/cases' },
  { label: '회사소개', to: '/company' },
];

export const stats = [
  { value: 2016, label: '기업부설연구소 설립', suffix: '년', note: '연구개발 기반', animate: false },
  { value: 7, label: '보유 특허', suffix: '종', note: '회사소개서 기재 기준' },
  {
    value: 4,
    label: '특허 출원',
    suffix: '종',
    note: '회사소개서 기재 기준',
  },
  { value: 220, label: '임직원', suffix: '명', note: '2025년 12월 기준' },
];

// 홈 "신뢰 구조": 수행실적 → 자체 솔루션 → 검증 가능한 성과
export const evidenceChain = [
  { step: '01', title: '수행실적', text: '연도별 연구개발 이력과 프로젝트별 역할·결과물', to: '/rnd/projects' },
  { step: '02', title: '자체 솔루션', text: 'S.S.L.O 데이터 관리·자동 라벨링·검수 흐름', to: '/sslo' },
  { step: '03', title: '검증 가능한 성과', text: '특허·인증·수상과 시연 화면, 산출물', to: '/assets' },
];

export const businessAreas = [
  {
    title: '테스트 자동화 및 인공지능 플랫폼 개발',
    items: ['UI·UX 테스트 자동화 개발', '이미지 라벨링 분야 인공지능 플랫폼 자체 개발'],
  },
  {
    title: 'AI 기반 품질검증 및 지능형 평가 솔루션',
    items: ['AI 기반 자동평가 및 소프트웨어 품질검증 체계 구축', 'LLM 기반 평가기술을 활용한 지능형 품질분석 솔루션 개발'],
  },
  {
    title: 'AI·DATA 구축 및 AX 전환 컨설팅',
    items: ['AI 학습데이터 구축을 위한 수집·가공·검증 체계 구축', '데이터 활용 기반 AI·AX 전환 컨설팅 및 구축 지원'],
  },
];

export const organization = [
  { team: '경영지원실', en: 'Human resources', tasks: ['인사/총무', '자금', '회계/경리', '전략기획', '운영지원'] },
  { team: 'AI팀', en: 'Data Labeling', tasks: ['데이터 수집', '데이터 가공', '데이터 검수', '데이터 관리'] },
  { team: '기획·개발', en: 'Program / Tool', tasks: ['Tool 개발', '시스템 개발', '웹 플랫폼 개발', '프로세스 관리'] },
];

export const customers = [
  { name: 'TMAP MOBILITY', works: ['TMAP AUTO 테스트 자동화 운영 (’22~’24)', 'TMAP AUTO Speech 테스트 자동화 구축 (’23)', 'TMAP AUTO Core 고도화 및 OEM 테스트 자동화 구축 (’22)'] },
  { name: '한국자동차연구원', works: ['차량 주행 및 환경에 따른 차체·샤시 부품 영향도 분석 DB 구축 (’24)', '전장부품 실증(실차) 기반 데이터 취득 및 모니터링 시스템 구축 (’23)'] },
  { name: 'SK Telecom', works: ['VUX 자동화 QA 구축 (’24)', '웹 테스트 검증 자동화 (’24)'] },
  { name: '웅진씽크빅', works: ['북클럽 앱 테스트 자동화 운영 (’23~’24)', '북클럽 앱 테스트 자동화 구축 (’22)'] },
  { name: 'Samsung Card', works: ['VOC 관리 자동화 및 검증용 단말기 관리 프로세스 구축 (’24)'] },
  { name: 'LIG Nex1', works: ['DevOps(SLM 시스템) 업그레이드 및 프로세스 개선 (’21)'] },
  { name: 'Nuri Flex', works: ['AMI(Advanced Metering Infrastructure) 테스트 자동화 (’22)'] },
  { name: '하나은행', works: ['VOC 관리 자동화 프로세스 구축 (’20)'] },
  { name: 'BMW', works: ['Refactoring 검증 자동화 구축 (’24)'] },
];

export const esg = [
  { title: '함께 일하는 세상', text: '직장에서의 사회적 통합과 다양성·창의성을 촉진하고, 모든 직원에게 공평하고 존중하는 근무환경을 조성합니다.' },
  { title: '동반성장', text: '장애인 직원에게 교육과 지원을 제공해 전문성을 개발하고 경력 기회를 개선하며, 동반성장을 위해 노력합니다.' },
  { title: '책임과 지속가능성', text: '투명하고 윤리적인 IT 경영을 실천하고, 환경보호와 사회적 책임으로 지속가능한 미래를 만듭니다.' },
];
