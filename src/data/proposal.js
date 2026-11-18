// 기존 소스(solution-frontend, solution-ai-model)에서 가져온 보강 후보 콘텐츠.
// 아직 실제 페이지에는 적용하지 않았고, /review 페이지에서 현재 내용과 비교하기 위한 데이터입니다.

export const sources = {
  site: 'solution-frontend/src/components/main_sslo',
  ai: 'solution-ai-model',
};

// ---------- 1. 솔루션 캡처 ----------
export const captures = [
  {
    src: '/assets/review/dashboard.png',
    title: '대시보드',
    caption: '프로젝트 세부현황, 수집 건수·용량 추이 그래프, 검수 작업자 현황을 한 화면에서 확인합니다.',
    origin: 'solution-frontend/src/assets/images/sslo/dashboard.png',
    size: '1920 × 1143',
    notes: ['화면 속 프로젝트명·작업자명은 샘플 데이터입니다.', '게시 전 현재 UI와 다른 부분이 없는지 확인이 필요합니다.'],
  },
  {
    src: '/assets/review/labeling-projects.png',
    title: '프로젝트 목록 (작업 시작 화면)',
    caption: '프로젝트 카드별 진행률, 이미지·텍스트 작업 유형, 새 프로젝트 추가 진입점을 보여줍니다.',
    origin: 'solution-frontend/src/assets/images/sslo/labeling01.png',
    size: '580 × 327',
    notes: ['해상도가 낮은 목업입니다. 실제 화면으로 다시 캡처하는 것을 권장합니다.', '샘플 사진의 사용권, 작업자명("홍길동"), 구 로고 표기를 확인해야 합니다.'],
  },
];

export const captureExcluded = [
  { name: 'dataset.png', reason: '화면 캡처가 아닌 데이터 활용 순환 인포그래픽이며, 연결선 끝의 설명 문구가 원본에서 빠져 있습니다.' },
  { name: 'solution/*.png, image-boxing.png, studio/sample-image.png', reason: '도구 시연 이미지에 스톡 사진이 사용되어 사용권 확인 전에는 게시할 수 없습니다.' },
  { name: 'case1~7.png, sub4/ltem*.png', reason: '사례 사진(스톡 추정)과 고객사 로고라 사용권·공개 동의가 필요합니다.' },
];

// ---------- 2. 아키텍처·순서도 (solution-ai-model/img 기준으로 재구성) ----------
export const coreArch = {
  lanes: [
    { title: 'Web Front-end', groups: [{ nodes: ['웹 작업 화면'] }] },
    {
      title: 'REST API',
      groups: [{ nodes: ['로그인', '프로젝트 관리', 'Active Learning', 'Auto Labeling', 'Model Export'] }],
    },
    {
      title: 'AI Core',
      groups: [
        { nodes: ['Data Augmentation'] },
        { nodes: ['Model Validation', 'Model Converter', 'Model Deployment'], chain: true },
        { nodes: ['Inference Client'] },
      ],
    },
    {
      title: '실행 환경',
      groups: [
        { title: 'DL Server', nodes: ['Train container', 'Train container ···'] },
        { title: 'Inference', nodes: ['Serving container', 'Serving container ···'] },
      ],
    },
    {
      title: 'Local File System',
      groups: [
        { title: 'Data dir', nodes: ['projectN / images', 'projectN / labels'] },
        { title: 'Model Repo', nodes: ['학습 모델 저장소'] },
      ],
    },
  ],
  flows: [
    'Active Learning 요청(조건 지정) → Data Augmentation → Train container에서 학습',
    '학습 데이터와 라벨은 Data dir에서 읽고, 학습된 모델은 Model Repo에 저장',
    'Model Validation → Model Converter → Model Deployment → Serving container로 배포',
    'Auto Labeling: 원본 이미지 → Inference Client → Serving container → 라벨(annotation) 데이터 반환',
  ],
};

export const trainPipeline = {
  title: '학습 컨테이너 파이프라인',
  caption: '사용자 데이터셋으로 학습한 뒤 검증·변환을 거쳐 서빙 가능한 모델로 내보냅니다.',
  steps: [
    { label: 'Dataset split', sub: '학습/검증 분할' },
    { tag: 'split', branches: [[{ label: 'Train set' }], [{ label: 'Valid set' }]] },
    { label: 'Data registration', sub: '데이터 등록' },
    { label: 'Train', sub: '학습' },
    { label: 'Logging metric', sub: '지표 기록' },
    { label: 'Save model', sub: '모델 저장' },
    { label: 'Model validation', sub: '최소 loss 모델 선정' },
    { label: 'Export to TorchScript', sub: 'tracing mode' },
    { label: 'Servable model config', sub: '서빙 설정' },
    { label: 'Export', sub: 'Model Repo 저장' },
  ],
};

export const inferencePipeline = {
  title: '추론(자동 라벨링) 로직',
  caption: '자동 라벨링 요청을 Triton Serving 컨테이너로 보내 탐지·분할 결과를 라벨 데이터로 되돌려줍니다.',
  steps: [
    { label: 'Auto Labeling 요청' },
    { label: 'Triton Serving client', sub: 'HTTP' },
    {
      tag: 'Triton Serving container',
      branches: [
        [{ label: 'Faster R-CNN', sub: 'object detection' }],
        [{ label: 'preprocess' }, { label: 'Mask R-CNN', sub: 'segmentation' }, { label: 'postprocess' }],
      ],
    },
    { label: '결과 데이터 변환', sub: 'Re-format' },
    { label: '라벨 데이터 반환' },
  ],
};

export const augmentPipeline = {
  title: '데이터 증강 파이프라인',
  caption: '사용자 데이터셋의 이미지·라벨을 불러와 증강하고, 품질 검증 후 COCO 형식으로 저장합니다.',
  steps: [
    { label: 'Data loader', sub: '이미지 · 라벨 로드' },
    { tag: 'prepare', branches: [[{ label: 'Generate mask' }], [{ label: 'Extract bbox' }]] },
    { label: 'Augmentation', sub: '증강' },
    { label: 'Quality validation', sub: '품질 검증' },
    { tag: 'save', branches: [[{ label: 'Save images' }], [{ label: 'Convert to COCO' }, { label: 'Save annotation' }]] },
  ],
};

export const modelSelection = {
  title: '모델 검증·내보내기',
  caption: '프로젝트 모델 후보들의 metric.json을 비교해 loss가 가장 낮은 최신 모델을 서빙용으로 내보냅니다.',
  steps: [
    { tag: 'Model Repo', branches: [[{ label: 'model A', sub: 'metric.json' }], [{ label: 'model B', sub: 'metric.json' }], [{ label: 'model C', sub: 'metric.json' }], [{ label: 'model D (latest)', sub: 'metric.json' }]] },
    { label: 'Model validation', sub: 'get min loss' },
    { label: 'Model export', sub: 'tracing mode' },
    { label: 'Servable Model Repo', sub: 'Model.ts · config.pbtxt' },
  ],
};

export const archNotes = [
  '원본(solution-ai-model/img, 영문·회색 PNG)의 구성과 흐름을 그대로 옮겨 새 디자인으로 다시 그렸습니다.',
  '모델 표기는 소스 기준(Faster R-CNN, Mask R-CNN, Detectron2, Triton)입니다. 현재 사이트의 "적용 모델(YOLOv5·YOLOv7·DETR·FocalNet-H)"과 다르므로 어느 쪽을 게시할지 개발팀 확인이 필요합니다.',
  '컨테이너 구성은 소스 README 기준이며 현재 운영 구조와 일치하는지 확인이 필요합니다.',
];

// ---------- 3. 서비스 절차·도구·데이터 처리 기법 (Service.vue / Solution.vue 기준) ----------
export const processSteps = [
  { title: '프로젝트 협의', items: ['작업기간 협의', '산출물 협의', '데이터 정의 및 설계', '파일 규칙 협의'] },
  { title: '프로젝트 준비', items: ['작업 수행 계획 수립', '작업 환경 구축', '작업 도구 선정 및 커스텀', '작업 지침 및 가이드 작성', '작업자 확보 및 선정'] },
  { title: '데이터 수집', items: ['직접 수집', '고객사 API 연동', '오픈 데이터 활용', '웹·SNS 크롤링 및 스크래핑'] },
  {
    title: '데이터 전처리',
    items: [
      '분류 (카테고리 / 주제 / 형식 등)',
      '변환 (리사이징 / 파일형식 / 배경제거 등)',
      '축소 (인코딩 / 숫자축소 / 주성분 분석 등)',
      '통합 (결합 / 병합)',
      '정제 (무효데이터 제거 / 중복제거 / 개인정보처리 등)',
    ],
  },
  { title: '데이터 가공', items: ['영상 라벨링', '이미지 라벨링', '텍스트 태깅 / 추출 / OCR 등'] },
  { title: '검수', items: ['전문가를 통한 검수', '인력을 통한 교차 검수', '도구를 통한 이중 검수', '단계별 데이터 검수', '부적합 데이터 재가공'] },
  { title: '테스트', items: ['테스트 모델 선정', '테스트 모델 검증', '모델 학습 테스트', '테스트 모델 평가'] },
  { title: '완료', items: ['최종 결과 확인', '산출물 납품'] },
];

export const strengths = [
  { title: '최고 품질', text: '교차검수·이중검수·단계별 검수를 진행하고, 모델 학습 테스트로 품질을 높입니다.' },
  { title: '정책 수립', text: '데이터 보안, 개인정보, 개인정보 활용 등 관련 정책을 수립하고 긴급상황 대응 체계를 마련합니다.' },
  { title: '자동화 솔루션', text: '데이터 구축 시간과 인력 리소스 문제를 해결합니다.' },
  { title: '컨설팅', text: '데이터 활용 방법과 구축 방식에 대한 컨설팅을 지원합니다.' },
  { title: '전문인력', text: '초기 데이터 구축과 판단이 필요한 데이터 가공을 전문 인력이 수행합니다.' },
  { title: '고객 맞춤', text: 'AI 비즈니스 고객을 위한 맞춤형 데이터 솔루션을 제공합니다.' },
];

export const labelingTools = [
  { name: 'Boxing', text: '객체탐지·객체인식을 위해 상자의 두 모서리를 표시해 이미지에 배치하는 가장 간단한 주석 형식입니다.' },
  { name: 'Polygon', text: '다각형 모양으로 객체의 가시 영역 외곽선을 따라 점을 찍어 그리는 라벨링 방법입니다.' },
  { name: 'Polyline', text: '여러 개의 점을 가진 선으로 특정 영역을 라벨링해 인도, 차선 등을 구분할 때 사용합니다.' },
  { name: 'Keypoint', text: '손, 사람, 동물 등 특정 지점을 라벨링합니다. 안면 인식 기반 감정 분석처럼 정밀한 작업에 쓰입니다.' },
  { name: 'Point', text: '클래스에 해당하는 지점을 마우스로 클릭해 점 형태로 지정합니다.' },
  { name: '3D Cube', text: '2D로 작업하기 어려운 자동차, 건물 등 입체 객체를 정육면체로 생성하는 라벨링 방식입니다.' },
  { name: 'Brush', text: 'segmentation 영역 지정 도구입니다. 커서가 원 형태로 바뀌며 객체 위를 드래그해 분할합니다.' },
  { name: 'Magic Wand', text: '객체 픽셀 위를 point 도구로 클릭하면 유사 픽셀 간 polygon을 생성합니다.' },
];

export const preprocessing = {
  image: ['그레이스케일', '이진화', '확대/축소', '회전', '변환', '밝기/대비', '자르기', '노이즈 제거', '비식별화(모자이크)', '배경제거'],
  purification: ['영상 프레임 단위 이미지 추출', '중복 데이터 제거'],
};

export const collection = [
  { name: '인간 데이터셋', text: '자체 수집 데이터' },
  { name: '웹 크롤러', text: '네이버, 다음, 구글, 인스타' },
  { name: '커스텀', text: '고객 맞춤형 데이터 수집' },
];

export const automation = [
  { name: '데이터 수집 자동화', text: '대용량 웹 크롤링이나 커스텀 수집을 작업으로 구성하고 예약해 자동으로 수집합니다. 사용자는 수집 추이와 결과만 확인하고 최종 산출물을 받습니다.' },
  { name: '데이터 정제 자동화', text: '필요한 정제 기능을 순서대로 선택해 정제 대상에 적용하는 작업을 구성하고, 예약 기능으로 자동 정제합니다.' },
  { name: '라벨링 자동화', text: '정해진 객체 인식·식별을 자동화하고, 능동 학습(Active Learning)으로 사용자가 만든 커스텀 모델이 원하는 객체를 자동 라벨링합니다.' },
];

export const deployFormats = ['TensorFlow', 'PyTorch', 'ONNX'];

export const industries = ['AI', 'Healthcare', 'E-Commerce', 'BigData', 'Medical', 'Media', 'Finance', 'Game', 'Traffic', 'Education', 'Farm', 'Work'];

export const processNotes = [
  '출처: solution-frontend의 Service.vue, Solution.vue(소개사이트 구성요소). 2021~2022년 기준으로 작성된 문구라 현재 기능과 맞는지 확인이 필요합니다.',
  '원문의 "Magig Wand"는 "Magic Wand"로, 전처리 "백그라운드제거"는 "배경제거"로 표기를 정리했습니다.',
  '현재 사이트의 "오토포인트" 도구는 기존 소개사이트 문구에는 없습니다(스튜디오 UI에는 존재).',
];
