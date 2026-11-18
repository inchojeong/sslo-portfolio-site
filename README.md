# S.S.L.O 확장형 소개사이트

티벨 연구개발 이력·수행실적·기술자산과 S.S.L.O 솔루션을 소개하는 온라인 포트폴리오 (Vue 3 + Vite + vue-router).

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## 콘텐츠 수정 (코드 수정 없이 `src/data/*.js`만 편집)

| 파일 | 내용 |
|---|---|
| `site.js` | 회사 정보, 메뉴(`nav`), 핵심 지표, 사업영역, 조직, 고객사, ESG |
| `history.js` | 연도별 연혁 (`core: true` = "연구개발 핵심" 보기에 포함) |
| `projects.js` | 수행실적 — 비어 있는 필드는 "상세 정보 준비 중"으로 표시 |
| `ongoing.js` | 2026년 이후 진행 중 과제 (배열이 비면 안내 문구 표시) |
| `assets.js` | 특허·출원·인증·수상·증빙 자료 |
| `sslo.js` | S.S.L.O 흐름·도구·대시보드·서비스 절차 |
| `cases.js` | 분야별 사례, 구현 사례 상세 |

- `verify` 필드가 있는 항목은 개발 모드에서 "확인 필요" 배지가 보입니다. 배포 빌드에서는 숨겨집니다. (`VITE_SHOW_VERIFY=true`로 켤 수 있음)
- 새 페이지: `src/views/`에 뷰 추가 → `src/router.js`에 라우트 → `src/data/site.js`의 `nav`에 메뉴 추가.
- 문의 폼: `.env.example` 참고. `VITE_CONTACT_ENDPOINT`(API) 또는 `VITE_CONTACT_EMAIL`(mailto) 설정.

## 오픈소스 자산 및 라이선스

- **아이콘**: [Lucide](https://lucide.dev) (ISC) — `lucide-vue-next`에서 필요한 아이콘만 개별 import하는 단색 라인 아이콘. 기능상 필요한 곳(메뉴 펼침, 연락처 등)에만 18~24px로 사용하며, 이모지/컬러 일러스트는 사용하지 않습니다. 라이선스 전문: `public/assets/licenses/LICENSE-Lucide.txt`.
- **서체**: Pretendard (SIL OFL 1.1) — `public/assets/fonts/`에서 로컬 제공.
- 외부 CDN은 사용하지 않으며, 출처는 `/licenses` 페이지에 정리돼 있습니다.
