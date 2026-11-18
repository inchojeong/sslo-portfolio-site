// 분야별 데이터 구축·개발 사례. 출처: 회사소개서 12~18페이지

export const labelTypes = ['Bounding Box', 'Polygon', 'Key Point', 'Skeleton Key Point', 'Segmentation', 'Caption'];

export const cases = [
  { id: 'smartcity', domain: '스마트시티', title: '교통약자 맞춤형 서비스 제공 시스템 개발', labels: ['Bounding Box', 'Skeleton Key Point'] },
  { id: 'beauty', domain: '생활(뷰티)', title: '피부 상태 및 결점 사항 기반 맞춤형 화장품 추천 서비스 시스템 개발', labels: ['Polygon'] },
  { id: 'education', domain: '교육', title: '이미지 설명 영어 문장 생성 시각 연상 교육 시스템 개발', labels: ['Caption'] },
  { id: 'smartfarm-livestock', domain: '스마트팜', title: '한우 번식·비육 관리를 위한 섭취·번식 등 특정 행위 인식 시스템 개발', labels: ['Bounding Box', 'Key Point'] },
  { id: 'sports', domain: '생활(스포츠)', title: '실시간 동적 행위 인식·분석을 통한 자세 피드백 및 경기 분석 시스템 개발', labels: ['Bounding Box', 'Skeleton Key Point', 'Segmentation'] },
  { id: 'smartfarm-crop', domain: '스마트팜', title: '버섯 등 농작물 상태 인식 및 관리 시스템 개발', labels: ['Bounding Box', 'Polygon'] },
  { id: 'eudr', domain: '환경·농업', title: '농지 훼손 분석 결과를 활용한 EUDR 적합 농가 정보 제공 시스템 개발', labels: ['Polygon'] },
  { id: 'fashion', domain: '생활(의류)', title: '의류 반품 상품 가치 판단 및 적정 반품 처리 지원 시스템 개발', labels: ['Bounding Box', 'Key Point'] },
  { id: 'document', domain: '업무·문서', title: '필체 기반 문서 OCR 수행을 통한 실물 문서 데이터화 시스템 개발', labels: ['Bounding Box', 'Key Point'] },
];

// 구현 사례 상세 (기술 구성도가 있는 사례). flow 의 각 단계는 아키텍처 구성요소입니다.
export const deepDives = [
  {
    id: 'ocr',
    domain: '에너지·OCR',
    title: 'E-CHECK OCR 전력량계 인식 솔루션',
    summary: '복잡한 계산 없이 전력량계 촬영만으로 사용 전력량을 자동 파악·분석합니다.',
    flow: [
      { text: 'Input Image' },
      { text: 'Preprocessing' },
      { text: 'Object Detection (YOLOv4)' },
      { text: 'Image Classifier (ResNet-50 / MobileNet)' },
      { text: '실시간 데이터 수집' },
      { text: 'DB · 사용자 실시간 분석' },
    ],
  },
  {
    id: 'safety',
    domain: '스마트시티',
    title: '교통안전사고 예방 서비스 개발 데이터 구축',
    summary: '도심 내 안전사고 분석을 통해 잠재적인 위험요소 데이터를 구축하고, 데이터 기반 통합 관제 플랫폼에 활용합니다.',
    flow: [
      { text: '군중 밀집 데이터셋' },
      { text: '도로 노면 균열 데이터셋' },
      { text: '생활도로 객체 데이터셋' },
      { text: '옥외광고물 데이터셋' },
      { text: '안전사고 모니터링·예측' },
      { text: '도시 운영 관리' },
    ],
  },
  {
    id: 'can',
    domain: '모빌리티',
    title: '차량 CAN 데이터 분석·모니터링',
    summary: '경형 차종의 실제 주행 데이터와 환경 정보를 취득하고 분석 기법을 적용합니다.',
    flow: [
      { text: 'OBD-II · Sensor · GPS 취득' },
      { text: 'LTE / HTTP (구간 암호화)' },
      { text: 'API Server · Web Server' },
      { text: 'InfluxDB(CAN) · MySQL(차종)' },
      { text: 'React 대시보드 · 데이터 분석' },
    ],
  },
  {
    id: 'baas',
    domain: '에너지·순환경제',
    title: 'BaaS (Battery as a Service)',
    summary: '폐배터리의 재사용·재제조·재활용을 하나의 통합 서비스로 제공하는 순환 중개 시스템입니다.',
    flow: [
      { text: '폐배터리 제공처' },
      { text: '성능 평가·이력 정보' },
      { text: '순환 중개 시스템 (티벨 S/W)' },
      { text: '재사용 · 재제조 · 재활용' },
      { text: 'ESS · UPS · 가정용 활용' },
    ],
  },
];