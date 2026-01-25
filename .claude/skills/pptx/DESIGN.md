# 디자인 가이드 - Modern IT Trend 스타일

HTML/CSS로 PowerPoint 슬라이드를 만들 때 사용하는 디자인 시스템입니다.

---

## 색상 팔레트

**Modern IT Trend 2026 기반:**

```css
:root {
  --color-bg: #0F172A;           /* 진한 네이비 배경 */
  --color-primary: #2563EB;      /* 기본 파란색 */
  --color-accent: #38BDF8;       /* 강조 하늘색 */
  --color-text-primary: #FFFFFF; /* 기본 텍스트 */
  --color-text-secondary: #94A3B8; /* 보조 텍스트 */
  --color-border: #64748B;       /* 테두리 */
}
```

| 용도 | 색상 | 코드 |
|------|------|------|
| 배경 | 진한 네이비 | #0F172A |
| 주강조 | 파란색 | #2563EB |
| 보조강조 | 하늘색 | #38BDF8 |
| 주 텍스트 | 흰색 | #FFFFFF |
| 보조 텍스트 | 밝은 그레이 | #94A3B8 |
| 테두리 | 그레이 | #64748B |

---

## 슬라이드 레이아웃

### 1. 타이틀 슬라이드

**구조:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="slide title">
    <div class="top-bar"></div>

    <div class="content">
      <h1>제목</h1>
      <p class="subtitle">부제목</p>
    </div>

    <div class="footer">
      <p><strong>회사명</strong> • 부서</p>
    </div>
  </div>
</body>
</html>
```

**특징:**
- 상단에 파란색 바 (#2563EB)
- 중앙 정렬된 큰 제목
- 하늘색 부제목
- 하단에 회사 정보

**CSS:**
```css
body {
  background-color: #0F172A;
  padding: 60px 80px;
}

.top-bar {
  width: 100%;
  height: 8px;
  background-color: #2563EB;
  margin-bottom: 20px;
}

h1 {
  font-size: 64px;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  font-size: 32px;
  color: #38BDF8;
  text-align: center;
}
```

---

### 2. 콘텐츠 슬라이드 (헤더 + 리스트)

**구조:**
```html
<body>
  <div class="slide content">
    <div class="header">
      <div class="bar"></div>
      <div>
        <h2>섹션 제목</h2>
        <p class="subtitle-text">부제목</p>
      </div>
    </div>

    <div class="body">
      <div class="item">
        <div class="item-number"><p>1</p></div>
        <div class="item-content">
          <h3>항목 제목</h3>
          <p>설명 텍스트</p>
        </div>
      </div>

      <!-- 더 많은 항목들... -->
    </div>
  </div>
</body>
```

**특징:**
- 상단에 헤더 (파란 바 + 제목)
- 번호가 있는 항목 리스트
- 각 항목에 제목 + 설명

---

### 3. 비교 슬라이드

**구조:**
```html
<body>
  <div class="slide">
    <div class="title-section">
      <h2>AI vs Human</h2>
      <p>우리가 기억하는 인간과 AI의 대결</p>
    </div>

    <div class="comparison">
      <div class="comparison-item ai">
        <h3>AI</h3>
        <p class="feature">특성 1</p>
        <p class="feature">특성 2</p>
      </div>

      <p class="vs">VS</p>

      <div class="comparison-item human">
        <h3>Human</h3>
        <p class="feature">특성 1</p>
        <p class="feature">특성 2</p>
      </div>
    </div>
  </div>
</body>
```

---

## 타이포그래피

### 폰트 크기

```css
h1 { font-size: 64px; }   /* 타이틀 슬라이드 제목 */
h2 { font-size: 48px; }   /* 콘텐츠 슬라이드 제목 */
h3 { font-size: 36px; }   /* 섹션 제목 */
p  { font-size: 24px; }   /* 본문 텍스트 */
.small { font-size: 16px; } /* 작은 텍스트 */
```

### 폰트 스타일

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

h1, h2, h3 {
  font-weight: 700;  /* 굵게 */
}

.subtitle {
  font-weight: 300;  /* 가늘게 */
  color: #38BDF8;
}

strong {
  font-weight: 600;
  color: #38BDF8;
}
```

---

## 컴포넌트

### 상단 바

```html
<div class="top-bar"></div>
```

```css
.top-bar {
  width: 100%;
  height: 8px;
  background-color: #2563EB;
}
```

### 강조 박스

```html
<div class="highlight">
  <p>중요한 내용</p>
</div>
```

```css
.highlight {
  background-color: rgba(56, 189, 248, 0.15);
  border-left: 4px solid #38BDF8;
  padding: 24px;
  margin: 24px 0;
}
```

### 카드

```html
<div class="card">
  <h3>제목</h3>
  <p>설명</p>
</div>
```

```css
.card {
  background-color: rgba(37, 99, 235, 0.1);
  border-left: 4px solid #38BDF8;
  padding: 16px;
  border-radius: 4px;
}

.card h3 {
  color: #38BDF8;
  margin-bottom: 8px;
}
```

---

## HTML 작성 규칙

### 필수 규칙 (html2pptx 검증)

1. **모든 텍스트는 태그로 감싸기**
   ```html
   ✅ <p>텍스트</p>
   ✅ <h1>제목</h1>
   ❌ <div>텍스트</div>  <!-- DIV 안에 직접 텍스트 불가 -->
   ```

2. **여백 확보**
   ```css
   body {
     padding: 60px 80px;  /* 여백 필수 */
     /* 최소 0.5" 여백 필요 */
   }
   ```

3. **높이 초과 금지**
   - 슬라이드 높이(540px)를 초과하면 안 됨
   - 콘텐츠를 여러 슬라이드로 나누기

### 권장 구조

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="styles.css">
  <style>
    /* 슬라이드별 추가 스타일 */
  </style>
</head>
<body>
  <div class="slide">
    <!-- 슬라이드 콘텐츠 -->
  </div>
</body>
</html>
```

---

## 실제 예제

### test-quick 폴더 구조

```
test-quick/
├── styles.css       ← 글로벌 스타일 (모든 슬라이드에서 사용)
├── slide1.html      ← 타이틀 슬라이드
├── slide2.html      ← 콘텐츠 슬라이드 (리스트)
├── slide3.html      ← 비교 슬라이드
└── build.js         ← 빌드 스크립트 (자동으로 slide*.html 찾아서 합치기)
```

### 빌드 및 실행

```bash
cd test-quick

# 3개 슬라이드를 하나의 pptx로 합치기
NODE_PATH="$(npm root -g)" node build.js

# 결과 확인
open output.pptx
```

---

## 커스터마이징

### 색상 변경

`styles.css`에서 `:root` 변수 변경:

```css
:root {
  --color-bg: #0F172A;        /* 배경색 변경 */
  --color-primary: #2563EB;   /* 주강조 색 변경 */
  --color-accent: #38BDF8;    /* 보조강조 색 변경 */
}
```

### 폰트 변경

```css
body {
  font-family: "Georgia", serif;  /* 세리프 폰트로 변경 */
}
```

### 레이아웃 변경

각 슬라이드 HTML에서 CSS 수정:

```html
<style>
  h1 {
    font-size: 72px;  /* 더 크게 */
  }
</style>
```

---

## 팁

- **슬라이드가 너무 많으면?** → 여러 폴더로 나누기
- **폰트가 안 보이면?** → 브라우저 폰트로 변경 (serif, sans-serif)
- **색상이 이상하면?** → 16진수 컬러코드 확인
- **높이 오류?** → 콘텐츠 줄이기 또는 슬라이드 나누기

---

**마지막 업데이트**: 2026-01-26
