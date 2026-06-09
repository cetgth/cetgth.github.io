# Academic Personal Website

음악 BCI / 뇌-컴퓨터 인터페이스 연구자용 학술 개인 홈페이지.
**Astro + Tailwind** 정적 사이트 · GitHub Pages 무료 호스팅 · 빌드 1초 이내.

> 학회 포스터 QR / 동료 연구자 lookup 용도. 6개 페이지(Home · Research ·
> Publications · CV · Resources · Contact), 다크모드, BibTeX 자동 파싱 포함.

---

## 1. 빠른 시작 (로컬 개발)

```bash
npm install        # 최초 1회
npm run dev        # http://localhost:4321 에서 미리보기 (저장 시 자동 새로고침)
npm run build      # dist/ 에 정적 빌드 생성
npm run preview    # 빌드 결과를 로컬에서 확인
```

요구사항: **Node 18.17+** (확인: `node -v`).

---

## 2. 가장 먼저 할 일 — 본인 정보 채우기

거의 모든 개인정보는 **한 파일**에 있습니다:

### `src/config.ts`
이름(한/영), 소속, 직위, bio, 이메일, GitHub/Scholar/ORCID/Twitter 링크,
연구 관심사, 사진 경로, CV 경로, 연락처를 여기서 수정합니다.
**`url` 값(배포 주소)** 과 **`selfSurnames`(발행물에서 볼드 처리할 본인 성)** 도 잊지 마세요.

### `astro.config.mjs`
배포 주소 `site` 와 `base` 를 본인 저장소에 맞게 수정 (아래 "배포" 참고).

자세한 "무엇을 어디서 수정?" 은 **[CONTENT_GUIDE.md](./CONTENT_GUIDE.md)** 참고.

---

## 3. 프로젝트 구조

```
src/
  config.ts                 ← ★ 이름/링크/소개 (단일 출처)
  data/publications.bib     ← ★ 발행물 (BibTeX 붙여넣기만)
  content/
    news/*.md               ← ★ 뉴스 (파일 추가 = 홈 News 자동 갱신)
    research/*.md            ← ★ 리서치 카드 (파일 하나 = 카드 하나)
  pages/                     각 페이지 (index/research/publications/cv/resources/contact)
  components/                Header, Footer, SocialLinks, ThemeToggle
  layouts/BaseLayout.astro   공통 레이아웃(폰트, 다크모드, 메타)
  utils/                     bibtex 파서, base-aware URL 헬퍼
  styles/global.css          디자인 토큰 + 색상 (accent 색 변경 위치)
public/
  images/                    사진/그림 (profile.svg 교체)
  cv.pdf                     ← 실제 CV PDF로 교체
  favicon.svg, robots.txt
scripts/make-placeholder-pdf.mjs   placeholder PDF 생성기
.github/workflows/deploy.yml       GitHub Pages 자동 배포
```

---

## 4. 배포 (GitHub Pages, 자동)

이 저장소는 **push 하면 GitHub Actions가 자동 빌드+배포**합니다.

### A. 저장소 종류에 따라 `astro.config.mjs` 설정

| 저장소 이름            | 사이트 주소                         | 설정                                  |
| ---------------------- | ----------------------------------- | ------------------------------------- |
| `username.github.io`   | `https://username.github.io/`       | `base: "/"`  (기본값, 그대로 두기)    |
| 아무 이름 (예: `web`)  | `https://username.github.io/web/`   | `base: "/web/"` 로 변경               |

`site` 값도 본인 주소로 바꾸세요. (링크는 `base` 를 자동 반영하므로 코드 수정 불필요.)

### B. 첫 배포 (한 번만)

```bash
git init
git add -A
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git
git push -u origin main
```

그 다음 GitHub 저장소에서:
**Settings → Pages → Build and deployment → Source = "GitHub Actions"** 선택.

→ 1~2분 뒤 `https://USERNAME.github.io` 에 게시됩니다. **HTTPS 자동 적용**.

### C. 이후 업데이트 (한 줄로 빌드+배포)

```bash
git add -A && git commit -m "update" && git push
```

push 만 하면 Actions가 빌드해서 배포합니다. (로컬 `npm run build` 는 검증용으로 선택)

---

## 5. 커스텀 도메인 연결 (선택)

1. `public/CNAME` 파일을 만들고 도메인만 한 줄 적기: `www.yourdomain.com`
2. DNS 설정 (도메인 등록업체에서):
   - **apex** (`yourdomain.com`): A 레코드 4개 →
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **www 서브도메인**: CNAME → `USERNAME.github.io`
3. GitHub **Settings → Pages → Custom domain** 에 도메인 입력 → "Enforce HTTPS" 체크
4. `astro.config.mjs` 의 `site` 를 새 도메인으로 변경 후 push.

---

## 6. 현재 포함 / 다음 단계(Phase 2)

**포함됨 (Phase 1):** 6개 페이지, 반응형(모바일 우선), 다크모드 토글,
BibTeX 자동 파싱(본인 볼드/†/연도 그룹/Selected·All 토글/BibTeX 복사),
뉴스·리서치 자동 수집, 이메일 봇 방지, GitHub Pages 자동 배포, placeholder CV PDF.

**다음 단계(원하면 요청):** 한/영 다국어(`/ko` `/en`), 사이트 검색(Pagefind),
RSS 피드, Google Scholar 인용 배지, sitemap.

---

빌드 도구 외 외부 유료 서비스 의존성 없음. 폰트는 Google Fonts(한국어 Noto 포함),
나머지는 전부 정적. Lighthouse 90+ 목표에 맞춘 경량 구성입니다.
