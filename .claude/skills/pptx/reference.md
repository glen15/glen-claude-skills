# PPTX 스킬 - 상세 참고서

각 방식의 상세 가이드와 기술 정보입니다.

---

## 방식 1: HTML → PowerPoint (새 프레젠테이션)

### 최고의 선택 조건

- ✅ 처음부터 프레젠테이션을 만들 때
- ✅ 깔끔한 디자인이 필요할 때
- ✅ HTML/CSS에 익숙할 때
- ✅ 완전한 제어를 원할 때

### 단계별 프로세스

**Step 1: 프로젝트 설정**

```bash
cd skills/pptx/presentations/my-presentation
# 폴더 구조:
# - slides/          (HTML 파일들)
# - images/         (이미지 리소스)
# - styles.css      (전역 스타일)
# - build.js        (빌드 스크립트)
```

**Step 2: HTML 슬라이드 작성**

```html
<!-- slides/slide1.html -->
<html>
<head>
  <link rel="stylesheet" href="../styles.css" />
  <style>
    body {
      width: 960px;
      height: 540px;
      background: linear-gradient(135deg, #1e40af, #7c3aed);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }
    h1 { font-size: 60px; }
    p { font-size: 24px; }
  </style>
</head>
<body>
  <h1>프레젠테이션 제목</h1>
  <p>부제목</p>
</body>
</html>
```

**중요:**
- 반드시 **960×540px** (16:9)
- `<body>` 크기 명시 필수
- CSS로 모든 스타일 처리

**Step 3: CSS 설정**

```css
/* styles.css */
:root {
  --color-primary: #1e40af;
  --color-secondary: #7c3aed;
  --font-size-h1: 54px;
  --spacing-md: 24px;
}

/* HTML에서 사용 */
background: var(--color-primary);
padding: var(--spacing-md);
```

**Step 4: 빌드 스크립트**

```javascript
// build.js
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("../../html2pptx");

async function build() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";

  // 슬라이드 추가
  await html2pptx("slides/slide1.html", pptx);
  await html2pptx("slides/slide2.html", pptx);

  // 저장
  await pptx.writeFile("output.pptx");
}

build();
```

**Step 5: 생성 및 검증**

```bash
NODE_PATH="$(npm root -g)" node build.js

# 검증: 이미지로 변환
soffice --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide

# 이미지 확인: slide-1.jpg, slide-2.jpg 등
```

### 문제 해결

| 문제 | 원인 | 해결책 |
|------|------|--------|
| 텍스트 잘림 | 크기 너무 큼 | 폰트 크기 줄이기 또는 여백 증가 |
| 이미지 안 보임 | 경로 오류 | 절대 경로 사용 또는 base64 인코딩 |
| PDF 변환 실패 | LibreOffice 없음 | `brew install --cask libreoffice` |

---

## 방식 2: XML 편집 (기존 파일)

### 최고의 선택 조건

- ✅ 기존 PowerPoint 파일을 수정할 때
- ✅ 슬라이드 추가/삭제할 때
- ✅ 세밀한 제어가 필요할 때

### 단계별 프로세스

**Step 1: 파일 분석**

```bash
# 파일 구조 확인
python scripts/ooxml/scripts/unpack.py input.pptx unpacked/

# 주요 파일들:
# - unpacked/ppt/slides/slide1.xml    (슬라이드 내용)
# - unpacked/ppt/theme/theme1.xml     (색상, 폰트)
# - unpacked/ppt/slideMasters/        (마스터 슬라이드)
```

**Step 2: XML 편집**

```xml
<!-- unpacked/ppt/slides/slide1.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<p:sld xmlns:p="...">
  <p:cSld>
    <p:bg>...</p:bg>
    <p:spTree>
      <!-- 텍스트 박스 수정 -->
      <p:sp>
        <p:nvSpPr>...</p:nvSpPr>
        <p:spPr>...</p:spPr>
        <p:txBody>
          <a:p>
            <a:r>
              <a:t>새로운 텍스트</a:t>
            </a:r>
          </a:p>
        </p:txBody>
      </p:sp>
    </p:spTree>
  </p:cSld>
</p:sld>
```

**Step 3: 검증**

```bash
python scripts/ooxml/scripts/validate.py unpacked/ --original input.pptx
```

**Step 4: 다시 압축**

```bash
python scripts/ooxml/scripts/pack.py unpacked/ output.pptx
```

### 일반적인 수정 작업

| 작업 | XML 경로 |
|------|---------|
| 텍스트 변경 | `ppt/slides/slide*.xml` → `<a:t>` 수정 |
| 색상 변경 | `ppt/theme/theme1.xml` → `<a:clrScheme>` |
| 이미지 추가 | `ppt/media/`, `ppt/slides/` 수정 |
| 슬라이드 삭제 | `ppt/slides/` 파일 삭제, `presentation.xml.rels` 수정 |

---

## 방식 3: 템플릿 기반 (기존 디자인)

### 최고의 선택 조건

- ✅ 일관된 디자인이 필요할 때
- ✅ 기존 템플릿이 있을 때
- ✅ 대량 문서 생성할 때

### 단계별 프로세스

**Step 1: 템플릿 분석**

```bash
# 썸네일 생성
python scripts/thumbnail.py template.pptx

# 텍스트 추출
python -m markitdown template.pptx > template-content.md
```

**Step 2: 슬라이드 재배열**

```bash
# format: 0,1,1,2,3
# 의미: slide0 사용, slide1 2번 사용, slide2, slide3
python scripts/rearrange.py template.pptx working.pptx 0,1,1,2,3
```

**Step 3: 텍스트 추출**

```bash
python scripts/inventory.py working.pptx text-inventory.json
```

**Step 4: 교체 텍스트 준비**

```json
{
  "slide-0": {
    "shape-0": {
      "paragraphs": [
        {
          "text": "새로운 제목",
          "bold": true,
          "alignment": "CENTER"
        }
      ]
    }
  }
}
```

**Step 5: 적용**

```bash
python scripts/replace.py working.pptx replacement-text.json output.pptx
```

### 팁

- 템플릿에서 모든 텍스트가 자동 추출됨
- 불필요한 슬라이드는 선택하지 않음
- 같은 슬라이드 여러 번 사용 가능

---

## 🔧 고급 기능

### 차트/표 추가

```javascript
// build.js에서
const chartData = {
  title: "2025년 판매",
  labels: ["1월", "2월", "3월"],
  series: [
    { name: "판매", labels: ["1월", "2월", "3월"], data: [100, 200, 300] }
  ]
};

slide.addChart(pptx.ChartTypes.bar, chartData, { x: 1, y: 1, w: 8, h: 4 });
```

### 발표자 노트

```bash
# XML에서 발표자 노트 확인/수정
unpacked/ppt/notesSlides/notesSlide1.xml
```

### 댓글/리뷰

```bash
# 댓글 파일
unpacked/ppt/comments/modernComment_*.xml
```

---

## 📊 성능 최적화

### 권장사항

| 항목 | 권장값 |
|------|--------|
| 슬라이드 크기 | 960×540px (16:9) |
| 최대 슬라이드 수 | 100개 |
| 이미지 크기 | 400KB 이상 권장 안 함 |
| 요소 수 | 슬라이드당 10개 이상 권장 안 함 |

### 최적화 팁

1. **이미지 압축**: WebP 또는 압축된 JPEG 사용
2. **폰트 제한**: 2-3개 폰트만 사용
3. **단순 레이아웃**: 복잡한 그래픽은 이미지로 변환
4. **배치 처리**: 여러 파일은 반복 실행

---

## 📝 파일 구조

### 프로젝트 레이아웃

```
presentations/my-presentation/
├── slides/
│   ├── slide1.html
│   ├── slide2.html
│   └── slide3.html
├── images/
│   ├── logo.png
│   └── chart.jpg
├── styles.css
├── build.js
└── output.pptx
```

### 심링크된 도구

```
skills/pptx/
├── scripts/              (Python 도구)
│   ├── thumbnail.py
│   ├── inventory.py
│   ├── rearrange.py
│   └── replace.py
├── pptx-skill-tools/    (메인 라이브러리)
└── html2pptx/           (Node.js 라이브러리)
```

---

## 🚨 일반적인 오류

| 오류 | 원인 | 해결책 |
|------|------|--------|
| `html2pptx not found` | 라이브러리 미추출 | `tar -xzf pptx-skill-tools/html2pptx.tgz -C html2pptx` |
| `LibreOffice: command not found` | 설치 안 됨 | `brew install --cask libreoffice` |
| `NODE_PATH not set` | 환경 변수 없음 | `NODE_PATH="$(npm root -g)"` 사용 |
| `PowerPoint 손상됨` | XML 오류 | `validate.py`로 검증 후 오류 수정 |

---

**마지막 업데이트**: 2026-01-25
