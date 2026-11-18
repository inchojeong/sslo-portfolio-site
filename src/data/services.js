// AI 서비스 소개. 출처: "S.S.L.O AI 서비스 콘텐츠 기획안(개정, 데이터 분석 강화) 2026.11.18"과
// 티벨 회사소개서 2.0V (2026.10.01). 이미 사이트에 있는 데이터(sslo.js, cases.js, projects.js)는 각 페이지에서 그대로 가져다 씁니다.

export const servicesIntro = {
  title: 'AI 서비스',
  lead: '데이터를 받아 분석하고, 분석 결과를 실제 업무에 사용하는 시스템까지 구현합니다. 데이터 구축부터 분석, 시스템 개발, AI 학습·적용까지 티벨이 수행해 온 범위를 소개합니다.',
};

export const services = [
  {
    slug: 'data-build',
    no: '01',
    eyebrow: 'AI DATA BUILD',
    name: 'AI 데이터 구축',
    headline: '다양한 데이터를, 활용 가능한 자산으로',
    lead: '이미지·영상·텍스트·센서 데이터를 프로젝트 목적에 맞게 수집·정제·가공·검수하고, AI 학습과 분석에 활용할 수 있는 데이터셋 구축을 지원합니다.',
    summary: '어떤 유형의 데이터를 어떤 절차로 수집·정제·가공·검수하는가',
  },
  {
    slug: 'data-analytics',
    no: '02',
    eyebrow: 'DATA ANALYTICS',
    name: '데이터 분석·활용',
    headline: '수집된 데이터에서, 필요한 정보를 찾습니다',
    lead: '현장과 업무 시스템에서 발생하는 데이터를 정리하고 목적에 맞는 지표를 설계하여 현황, 변화 추이, 데이터 특성을 파악할 수 있는 분석 환경을 제공합니다.',
    summary: '분석할 데이터의 형태, 지표 설계, 가공 및 데이터 해석 방법',
  },
  {
    slug: 'analytics-system',
    no: '03',
    eyebrow: 'ANALYTICS SYSTEM',
    name: '데이터 분석 시스템 개발',
    headline: '분석 결과가 실제 업무에 활용되도록',
    lead: '데이터 수집·연계부터 DB 관리, 분석 처리, 대시보드와 모니터링 화면까지 연결하여 데이터 기반 운영을 지원하는 시스템을 설계·개발합니다.',
    summary: '데이터를 어떻게 수집·연계·저장하고 분석 화면으로 제공하는가',
  },
  {
    slug: 'ai-learning',
    no: '04',
    eyebrow: 'AI LEARNING',
    name: 'AI 학습·적용 기술',
    headline: '데이터 구축부터 학습과 개선까지',
    lead: '자체 AI 데이터 플랫폼과 관련 연구개발 경험을 바탕으로 학습데이터, 모델 추론, 자동 라벨링, 검증 결과가 이어지는 기술 적용을 지원합니다.',
    summary: '학습데이터 준비, 모델 추론, 자동 라벨링, 결과 검증이 어떻게 이어지는가',
  },
];

// 메인(개요) 페이지의 수행 방식: 데이터 입력 → 처리/분석 → 활용 화면 → 결과 검증
export const approach = [
  { no: '01', title: '데이터 입력', text: '이미지·영상·텍스트·센서·업무 데이터를 목적에 맞게 수집하고 연계합니다.' },
  { no: '02', title: '처리·분석', text: '정제와 가공을 거쳐 분석 기준과 지표를 설계하고 집계·비교·분석합니다.' },
  { no: '03', title: '활용 화면', text: '대시보드, 모니터링, 검색·필터 등 실무자가 쓰는 화면으로 제공합니다.' },
  { no: '04', title: '결과 검증', text: '품질검수와 결과 확인을 거쳐 데이터와 모델 개선으로 이어갑니다.' },
];

// 수행 사례 연결. projectId 가 있으면 data/projects.js 의 연도·고객·기술·결과물을 함께 보여줍니다.
export const proofs = [
  {
    id: 'voucher',
    title: 'AI 학습데이터 구축 프로젝트 (2020~2022)',
    projectId: 'data-voucher',
    services: ['data-build'],
    focus: '연도별 다수 구축 수행 경험 및 데이터 구축 체계',
    to: '/rnd/projects',
  },
  {
    id: 'sslo',
    title: 'S.S.L.O 자동 라벨링 플랫폼',
    years: '자체 개발',
    services: ['data-build', 'ai-learning'],
    focus: '자동 가공, 검수, 모델 연동 프로세스 및 실제 화면',
    to: '/sslo',
  },
  {
    id: 'ocr',
    title: '한국전력 전력량계 AI-OCR · E-CHECK',
    projectId: 'kepco-ocr',
    services: ['data-analytics', 'analytics-system', 'ai-learning'],
    focus: '이미지 인식, 전력량 파악 및 분석 화면',
    to: '/rnd/projects',
  },
  {
    id: 'can',
    title: '차량 CAN 데이터 분석 모니터링',
    projectId: 'vehicle-field-data',
    services: ['data-analytics', 'analytics-system'],
    focus: '실차 데이터 취득, DB 관리, 웹 모니터링 구성',
    to: '/rnd/projects',
  },
  {
    id: 'dashboard',
    title: '데이터 분석·가공 현황 대시보드',
    years: '자체 운영',
    services: ['data-analytics', 'analytics-system'],
    focus: '메타데이터·가공 현황·팀별 진행률의 시각화',
    to: '/sslo',
  },
  {
    id: 'baas',
    title: '폐배터리 BaaS 서비스 기획·구축',
    projectId: 'baas',
    services: ['data-analytics', 'analytics-system'],
    focus: '배터리 이력·성능정보 연계 서비스 기획 및 SW 도입',
    to: '/rnd/projects',
  },
  {
    id: 'ai-eval',
    title: 'AI 모델 및 평가 기술 개발 이력',
    years: '2022 · 2025',
    services: ['ai-learning'],
    focus: '인간 인식 모델 베타, LLM as a Judge 평가 기술',
    to: '/rnd/history',
  },
];

export const researchBase = [
  { title: '연구개발 연혁', text: '2015년부터 이어진 개발 활동', to: '/rnd/history' },
  { title: '자체 솔루션 S.S.L.O', text: '데이터 관리·자동 라벨링·검수 플랫폼', to: '/sslo' },
  { title: '특허·인증·수상', text: '기술자산과 연구성과', to: '/assets' },
];

// ---------------------------------------------------------------------------
// 서비스별 상세 구성. section.type 에 따라 ServiceDetailView 가 그립니다.
//   steps   : 번호가 있는 단계 목록
//   grid    : 항목 카드(구분선형)
//   compare : 비교표
//   layers  : 계층 구조
//   cases   : 시스템 구성 사례(흐름도)
// 나머지(type: 'types' | 'annotation' | 'ssloUse' | 'domains' | 'monitoring' | 'loop' | 'tracks')는 서비스에 맞는 전용 블록입니다.
// ---------------------------------------------------------------------------
export const details = {
  'data-build': {
    intro:
      '티벨은 AI 모델의 목적과 데이터 특성에 맞춰 자료를 수집·정제·전처리·가공·검수하고, 후속 학습이나 분석에 활용할 수 있는 데이터셋 형태로 제공합니다. 데이터 구축은 단순한 라벨링 작업이 아니라 데이터 요구조건과 품질을 관리하는 전 과정입니다.',
    sections: [
      {
        type: 'types',
        tone: 'light',
        eyebrow: 'Data types',
        title: '데이터 유형별 구축',
        lead: '이미지·영상뿐 아니라 텍스트·음성·센서·정형 데이터까지, 유형에 따라 수집 원천과 가공 방법이 달라집니다. 모델 유형에 맞춰 구축 범위를 설계합니다.',
        dataTypes: ['이미지', '영상', '텍스트', '음성', '센서', '정형 데이터'],
      },
      {
        type: 'steps',
        tone: 'soft',
        eyebrow: 'Process',
        title: '수집·가공·검증 프로세스',
        lead: '요구사항을 학습데이터셋으로 전환하는 6단계입니다.',
        items: [
          { title: '요구사항 정의', text: '데이터 요구조건과 품질 기준, 산출물 형식을 협의합니다.' },
          { title: '수집', text: '프로젝트 목적에 맞는 원천에서 데이터를 수집합니다.' },
          { title: '정제', text: '중복 제거와 전처리로 가공 대상 데이터를 정리합니다.' },
          { title: '가공', text: '라벨링 도구로 Bounding Box, Polygon, Keypoint, Segmentation 등을 작업합니다.' },
          { title: '검수', text: '품질 기준에 따라 오류와 누락을 확인하고 바로잡습니다.' },
          { title: '전달', text: '산출물 확인과 결과 보고서를 제공하고, 완료된 데이터는 파기합니다.' },
        ],
      },
      { type: 'annotation', tone: 'light', eyebrow: 'Annotation', title: '가공 방식 예시', lead: '같은 이미지라도 모델 목적에 따라 라벨 형태가 달라집니다.' },
      {
        type: 'ssloUse',
        tone: 'dark',
        eyebrow: 'with S.S.L.O',
        title: '자체 플랫폼으로 구축 시간을 줄입니다',
        lead: '구축 과정에서 S.S.L.O를 이렇게 활용합니다. 플랫폼 자체의 소개는 S.S.L.O 페이지에서 볼 수 있습니다.',
        items: [
          { title: '자동 라벨링', text: '학습 모델의 추론 결과를 가공 대상 데이터의 라벨 제안으로 활용합니다.' },
          { title: '반자동 가공', text: '스마트펜·오토포인트로 몇 번의 클릭만으로 영역을 자동 보정합니다.' },
          { title: '사람 검수', text: '자동 결과의 오류와 누락을 사람이 확인하고 데이터셋에 반영합니다.' },
          { title: '데이터 내보내기', text: 'YOLO, COCO 형식의 데이터셋으로 내보냅니다.' },
        ],
      },
      {
        type: 'domains',
        tone: 'light',
        eyebrow: 'Experience',
        title: '구축 적용 사례',
        lead: '스마트시티·스마트팜·환경·교육 등 다양한 분야의 데이터를 구축해 왔습니다.',
      },
    ],
  },

  'data-analytics': {
    intro:
      '데이터를 수집해 저장하는 것만으로는 현장의 문제를 해결하기 어렵습니다. 티벨은 서로 다른 형태의 데이터를 정리하고, 활용 목적에 맞는 분석 기준과 지표를 마련하며, 분석 결과를 사용자가 이해할 수 있는 정보로 제공합니다.',
    sections: [
      {
        type: 'steps',
        tone: 'light',
        eyebrow: 'Process',
        title: '분석 수행 과정',
        lead: '분석 목적 정의부터 의사결정 지원까지 5단계로 진행합니다.',
        items: [
          { title: '분석 목적과 데이터 확인', text: '어떤 현상을 파악할지 정의하고, 현장·센서·차량·이미지·업무 데이터의 구조와 상태를 확인합니다.' },
          { title: '데이터 정제 및 정합성 확보', text: '결측·중복·이상값을 다루고 원천 간 시간·대상·식별 정보를 맞춥니다.' },
          { title: '지표 및 분석 기준 설계', text: '운영현황, 상태 변화, 누적량, 비교 구간 등 서비스 목적에 맞는 지표와 집계 기준을 마련합니다.' },
          { title: '분석 및 결과 해석', text: '설계한 기준으로 데이터를 집계·비교·분석하고 변화와 특이사항을 확인할 수 있게 구성합니다.' },
          { title: '시각화 및 의사결정 지원', text: '현황판, 차트, 검색·필터, 보고서 등 실무자가 분석 결과를 사용할 수 있는 형태로 제공합니다.' },
        ],
      },
      {
        type: 'grid',
        tone: 'soft',
        eyebrow: 'Analysis types',
        title: '분석 유형',
        lead: '운영현황, 변화 추이, 데이터 품질, 현장 데이터의 네 가지 영역을 다룹니다.',
        cols: 4,
        items: [
          { title: '운영현황 분석', text: '기간·대상별 실적 집계' },
          { title: '변화 추이 분석', text: '시간 흐름에 따른 지표 비교' },
          { title: '데이터 품질·정합성 점검', text: '누락·불일치 확인' },
          { title: '현장 데이터 분석', text: '차량·센서 등 현장에서 취득한 데이터 분석' },
        ],
      },
      { type: 'monitoring', tone: 'dark' },
    ],
  },

  'analytics-system': {
    intro:
      '데이터 분석 결과를 일회성 보고서로 끝내지 않고, 데이터가 지속해서 유입되고 사용자가 필요할 때 조회·분석·모니터링할 수 있는 시스템으로 구현합니다.',
    sections: [
      {
        type: 'compare',
        tone: 'light',
        eyebrow: 'Analytics vs System',
        title: '분석 서비스와 분석 시스템 개발은 이렇게 다릅니다',
        cols: ['데이터 분석·활용 서비스', '데이터 분석 시스템 개발'],
        rows: [
          { label: '핵심 산출물', values: ['분석 기준, 데이터 처리 결과, 지표·보고서', '데이터 수집·저장·분석·조회가 가능한 운영 시스템'] },
          { label: '주요 업무', values: ['데이터 정제, 지표 정의, 집계·비교·해석', 'DB·API·서버·웹 화면 설계 및 개발, 시스템 연계'] },
          { label: '고객 관점', values: ['현재 데이터를 어떻게 이해하고 활용할 것인가', '분석 기능을 업무 환경에서 지속해서 어떻게 사용할 것인가'] },
        ],
      },
      {
        type: 'layers',
        tone: 'soft',
        eyebrow: 'Architecture',
        title: '구축 구조',
        lead: '데이터 원천에서 사용자 화면까지 5개 계층으로 설계합니다. 구성은 프로젝트에 맞춰 달라집니다.',
        items: [
          { title: '데이터 원천', text: '센서, 차량, 이미지 인식 결과, 업무 시스템, 외부 데이터 등' },
          { title: '수집·연계 계층', text: 'API, 파일, 장치 인터페이스 등 프로젝트에 맞는 수집·연동 기능' },
          { title: '데이터 저장·관리', text: '데이터 특성에 맞는 DB·스토리지, 메타데이터·이력 관리' },
          { title: '분석·처리 계층', text: '집계, 변환, 지표 연산, 데이터 조회·필터링 등 분석 기능' },
          { title: '사용자 인터페이스', text: '대시보드, 모니터링, 검색, 기간별 비교, 결과 화면 및 보고 기능' },
        ],
      },
      {
        type: 'grid',
        tone: 'light',
        eyebrow: 'Components',
        title: '시스템 구성 요소',
        cols: 3,
        items: [
          { title: '시스템 구축 개요', text: '데이터 입력·분석·조회가 연계된 웹 기반 활용 환경' },
          { title: '수집·연계 기능', text: '서로 다른 원천의 정보를 수신하고 필요한 형태로 저장' },
          { title: '분석·모니터링', text: '현황·추이·구간별 비교, 주요 지표 집계' },
          { title: '관리·운영 기능', text: '프로젝트·대상·데이터 관리, 권한, 이력·진척도 등' },
          { title: '구축 실적', text: '차량 CAN 모니터링, 라벨링 진척도 관리, OCR 연계 시스템' },
        ],
      },
      {
        type: 'cases',
        tone: 'dark',
        eyebrow: 'Implementation',
        title: '실제 사례로 보는 시스템 구성',
        lead: '사용자가 보는 정보와 그 뒤에서 데이터가 수집·관리되는 흐름을 함께 보여줍니다.',
        items: [
          {
            title: '차량 CAN 데이터 분석 모니터링',
            deepDive: 'can',
            projectId: 'vehicle-field-data',
            text: '차량과 장치에서 수집되는 CAN·GPS·센서 데이터를 서버와 DB로 연결하고, 웹 화면에서 확인하는 시스템입니다.',
          },
          {
            title: '데이터 가공 현황 대시보드',
            fromDashboard: true,
            text: '이미지·Annotation 파일 및 메타데이터를 관리하고, 라벨링 진행 상황과 프로젝트·팀별 마일스톤을 확인하는 운영 화면입니다.',
            flow: ['이미지 DB · Annotation 스토리지', 'Meta Data SQL 연동', '대시보드 Visualization', '진척도 · Milestone 관리'],
          },
          {
            title: 'E-CHECK 전력량계 인식 솔루션',
            deepDive: 'ocr',
            projectId: 'kepco-ocr',
            text: '전력량계 이미지에서 객체 탐지·이미지 분류 결과를 처리하고 이용 전력량을 파악·분석합니다. 데이터 인식과 서비스 구현이 이어지는 사례입니다.',
          },
        ],
      },
    ],
  },

  'ai-learning': {
    intro:
      '학습데이터가 모델 개발과 추론에 어떻게 쓰이고, 검증 결과가 어떻게 데이터 개선으로 이어지는지를 S.S.L.O의 학습·추론·검수 순환 구조로 보여드립니다.',
    sections: [
      {
        type: 'steps',
        tone: 'light',
        eyebrow: 'Core technology',
        title: '핵심 기술 내용',
        lead: '학습데이터 준비에서 반복 학습까지 5단계가 순환합니다.',
        items: [
          { title: '학습데이터 준비', text: '라벨링된 초기 데이터셋과 모델 목적에 맞는 입력 데이터를 구성합니다.' },
          { title: '모델 학습 및 추론', text: '학습한 모델로 신규 데이터에 대해 객체 탐지·이미지 분할 등의 결과를 생성합니다.' },
          { title: '자동 라벨링', text: '모델 추론 결과를 가공 대상 데이터의 라벨 제안으로 활용합니다.' },
          { title: '검수 및 개선', text: '오류·누락 결과를 사람이 확인하고 데이터셋에 반영합니다.' },
          { title: '반복 학습 지원', text: '추가된 데이터를 활용해 모델 개선 과정으로 연결합니다.' },
        ],
      },
      { type: 'loop', tone: 'dark', eyebrow: 'S.S.L.O loop', title: '학습·추론·검수 순환 구조', lead: 'S.S.L.O에서는 이 과정이 아래 순환 구조로 동작합니다.' },
      {
        type: 'tracks',
        tone: 'light',
        eyebrow: 'Implementation & R&D',
        title: '대표 구현기술과 연구개발 이력',
        lead: '성격이 다른 두 가지를 구분해 소개합니다.',
        columns: [
          {
            title: '대표 구현기술 (S.S.L.O)',
            items: [
              '학습·추론·검수 순환 구조',
              '자동·반자동 데이터 가공 도구',
              '데이터셋 내보내기 (YOLO · COCO)',
              '이미지 데이터 복원·생성 지원',
            ],
          },
          {
            title: '연구개발 이력',
            items: ['2022 · 인간 인식 AI 모델(베타) 개발', '2025 · AI 기반 LLM as a Judge 자동평가 기술 개발'],
          },
        ],
      },
    ],
  },
};
