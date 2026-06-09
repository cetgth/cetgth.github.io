# 콘텐츠 추가 Cheatsheet

"무엇을 바꾸려면 어떤 파일을 수정?" — 빠른 참조표.
수정 후 `npm run dev` 로 확인하거나, 바로 `git push` 하면 자동 배포됩니다.

---

## 새 논문 추가 ✍️

**파일:** `src/data/publications.bib`
맨 아래에 BibTeX 블록을 붙여넣기만 하면 `/publications` 에 연도별로 자동 정렬됩니다.

```bibtex
@article{key2026,
  title        = {논문 제목},
  author       = {Lastname, Firstname and Coauthor, Second},
  journal      = {저널 이름},
  year         = {2026},
  doi          = {10.xxxx/xxxxx},      % 있으면 → [DOI] 버튼
  pdf          = {https://...pdf},     % 있으면 → [PDF] 버튼 (없으면 url/doi 사용)
  code         = {https://github.com/...},  % 있으면 → [Code] 버튼
  url          = {https://...},        % PDF 없을 때 [PDF] 버튼이 이 링크 사용
  selected     = {true},               % "Selected" 뷰에 노출
  equalcontrib = {Lastname, Coauthor}, % 이 저자들에게 † (공동 1저자) 표시
  note         = {In preparation}      % 제목 옆에 표시 (예: In preparation)
}
```

- **본인 이름 볼드:** 자동. `src/config.ts` 의 `selfSurnames: ["Lastname"]` 에
  본인 성을 적어두면 저자 목록에서 자동 볼드 처리됩니다.
- **저자 형식:** `Last, First` 또는 `First Last` 둘 다 인식. `and` 로 구분.
- **연도 그룹:** `year` 기준 내림차순. `year` 없으면 "In preparation" 그룹 최상단.
- **BibTeX 복사:** 각 논문의 [BibTeX] 버튼이 원본 블록을 클립보드에 복사.

---

## 뉴스 추가 📰

**폴더:** `src/content/news/`
`.md` 파일 하나를 추가하면 홈페이지 News에 **최신순으로 자동** 표시(상위 5개).

```markdown
---
date: 2026-07-01
title: "여기에 소식 제목"
link: "https://..." # (선택) 클릭 시 이동할 링크
---
```

파일명은 자유 (`2026-07-01-something.md` 권장). 정렬은 `date` 기준.

---

## 리서치 카드 추가 🔬

**폴더:** `src/content/research/`
`.md` 파일 하나 = 카드 하나. (`/research` 페이지)

```markdown
---
title: "프로젝트 제목"
summary: "1-2줄 설명."
image: "images/research-1.svg" # (선택) /public/images/ 안의 그림
order: 4 # 정렬 (작을수록 앞)
pub: "https://..." # (선택) 관련 논문 링크
pubLabel: "Lastname et al., 2026" # (선택) 링크 표시 텍스트
tags: ["EEG", "BCI"] # (선택) 태그 칩
---

본문(선택). 카드에는 summary가 표시됩니다.
```

---

## 이름 · 소속 · 링크 변경 👤

**파일:** `src/config.ts` (사이트 전체의 단일 출처)
이름(한/영), 직위, lab/학과/대학, bio 문단, 관심사 한 줄,
이메일·GitHub·Scholar·ORCID·Twitter, 연락처(office/주소/메시지) 모두 여기.
링크를 `""` (빈 문자열)로 두면 해당 아이콘이 숨겨집니다.

---

## 사진 교체 🖼️

1. 본인 사진을 `public/images/profile.jpg` (또는 .png/.webp) 로 저장
2. `src/config.ts` 의 `photo: "images/profile.jpg"` 로 경로 변경
   (정사각형 권장, 400×400 이상. 큰 사진은 미리 리사이즈 권장)

---

## CV PDF 교체 📄

`public/cv.pdf` 파일을 본인 실제 CV로 덮어쓰기만 하면 됩니다.
(`/cv` 페이지의 "Download PDF" 버튼이 이 파일을 가리킴.)
웹 버전 CV 텍스트는 `src/pages/cv.astro` 에서 수정.
placeholder가 다시 필요하면 `npm run make:pdf`.

---

## 강조 색상(accent) 변경 🎨

두 곳을 같은 색으로 맞추면 됩니다:

- `src/styles/global.css` 의 `--accent` (light) / `html.dark { --accent }` (dark)
- `tailwind.config.mjs` 의 `colors.accent.DEFAULT`

추천: deep blue `#1e3a8a` (기본), forest green `#064e3b`, burgundy `#7f1d1d`.

---

## 메뉴(네비게이션) 변경 🧭

**파일:** `src/components/Header.astro` 의 `nav` 배열에서 항목 추가/삭제/순서 변경.
