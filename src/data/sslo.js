// S.S.L.O 솔루션 소개. 출처: 회사소개서 10, 13, 14페이지

export const sslo = {
  headline: '수집부터 가공·검수·배포까지, AI 학습데이터 구축 원스톱 플랫폼',
  intro:
    'S.S.L.O는 티벨이 자체 개발한 AI 학습데이터 구축 및 자동 라벨링 플랫폼입니다. 소량의 수동 라벨링으로 모델을 학습하고, 그 모델이 나머지 데이터를 자동으로 라벨링하며, 사람이 검수해 다시 학습 데이터로 돌려보내는 순환 구조로 구축 시간과 인력 부담을 줄입니다.',
};

// 상단에 보여줄 4단계 (기획 요약본의 흐름)
export const headlineFlow = [
  { no: '01', title: '원본 데이터', text: '사용자가 수집한 원본 데이터셋(Raw Dataset)과 초기 소량의 수동 라벨링 데이터' },
  { no: '02', title: '학습·추론', text: '라벨링 데이터로 모델을 학습(Train)하고, 나머지 원본에 대해 추론(Inference)' },
  { no: '03', title: '자동 라벨링', text: '추론 결과를 자동 레이블링 데이터(Auto-Labeled Data)로 생성' },
  { no: '04', title: '검수·데이터셋', text: '잘못된 라벨은 사람이 검수(Validation)하고, 완성된 데이터셋을 내보내기(Export)' },
];

// 세부 순환 흐름
export const loop = [
  'Labeled Dataset (초기 수동 라벨링)',
  'Raw Dataset (원본)',
  'Train',
  'Inference',
  'Auto-Labeled Data',
  'Validation (인간 검수)',
  'Labeled Data',
  'Export Dataset',
];

// 파이프라인 시각화용 단계
export const pipelineStages = [
  { title: '초기 라벨링', sub: '소량 수동 Labeled Dataset' },
  { title: '모델 학습', sub: 'Train' },
  { title: '추론', sub: 'Inference · Raw Dataset' },
  { title: '자동 라벨링', sub: 'Auto-Labeled Data' },
  { title: '인간 검수', sub: 'Validation' },
  { title: '데이터셋 배포', sub: 'Export · YOLO / COCO' },
];

export const toolGroups = [
  { name: 'AI Assistant Tools', badge: 'HD · OD · IS · SES', text: '객체 탐지·분할 등 AI 보조 도구로 라벨링을 빠르게 시작합니다.' },
  { name: 'Semi-Auto Tools', badge: '스마트펜 · 오토포인트', text: '사용자의 몇 번의 클릭으로 영역을 자동 보정하는 반자동 도구입니다.' },
  { name: 'Manual Tools', badge: '박싱, 폴리곤 등 8종', text: 'Boxing, Polygon, Polyline, Keypoint, Point, 3D Cube, Brush, Magic Wand' },
];

export const extras = [
  { title: '이미지 데이터 복원', text: '저화질 흑백 이미지를 고화질 컬러 이미지로 복원해 모델 인식률 향상에 도움을 줍니다.' },
  { title: '이미지 데이터 생성', text: '원하는 키워드 조합으로 이미지를 간단히 생성해 데이터 수집의 어려움을 해소합니다.' },
];

export const formats = ['YOLO', 'COCO'];
export const models = ['YOLOv5', 'YOLOv7', 'DETR', 'FocalNet-H'];

export const dashboard = {
  title: '데이터 분석 솔루션 및 작업 현황 모니터링',
  text: '데이터 분석 대시보드로 주요 지표의 변화 추이를 체계적으로 관리하고 선제적 대응을 지원합니다.',
  groups: [
    { title: '데이터 관리 시스템', items: ['이미지 DB, Annotation 파일 스토리지', 'Meta Data SQL 연동 및 관리 도구', '대시보드 Visualization (가공 DB, 실시간 작업 현황)'] },
    { title: '가공 현황 모니터링', items: ['Class Categorization DB 현황 관리', '실시간 Labeling 수행 진척도 관리 및 보고', '프로젝트 / 팀 / 멤버별 Milestone 관리'] },
  ],
  effects: [
    { title: '데이터 기반 의사결정 및 운영 효율 향상', text: '직관이 아닌 객관적 데이터 기반 의사결정 체계 구축' },
    { title: '데이터 추이 모니터링을 통한 선제적 대응', text: '지표 변화를 한눈에 파악하고 이상 징후에 신속 대응' },
    { title: '정부지원사업 연계 기반 AI·AX 전환 구축', text: '데이터바우처 등 정부지원사업 연계로 AI·AX 전환까지 단계적 지원' },
  ],
};

// 데이터 구축 서비스 진행 절차 (회사소개서 10p)
export const serviceProcess = [
  { title: '의뢰 & 미팅', items: ['요구사항', '샘플 데이터 제공', '견적 및 일정 전달'] },
  { title: '계약·작업 준비', items: ['계약', '작업 준비', 'Tool Customizing'] },
  { title: '데이터 구축', items: ['데이터 수집', '중복 제거 및 전처리', '데이터 가공 (Labeling Tool)', '데이터 관리'] },
  { title: '가공 완료', items: ['산출물 확인', '결과 보고서 제공'] },
  { title: '데이터 전달', items: ['최종 전달', '완료된 데이터 파기'] },
];

export const modelSupport = [
  { title: '생성형 AI', targets: 'LLM · VLM 모델', text: '텍스트·이미지·음성 데이터, 텍스트-이미지 페어 데이터 구축' },
  { title: '컴퓨터 비전', targets: '객체 탐지 · 결함 탐지 모델', text: '이미지·영상 데이터 구축, Bbox / Polygon / Mask 라벨' },
  { title: '시계열·예측 AI', targets: '이상 탐지 · 예측 모델', text: '시계열 데이터, 센서 로그 데이터 구축' },
  { title: '추천·의사결정', targets: '추천 시스템 · 행동 예측 모델', text: '사용자 행동 로그, 상태·행동·보상 구조 데이터 구축' },
];
