---
name: pptx
description: "Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks"
license: Proprietary. LICENSE.txt has complete terms
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---

# PPTX Creation, Editing, and Analysis

.pptx 파일을 프로그래밍으로 생성, 편집, 분석합니다. html2pptx 라이브러리를 사용한 HTML → PowerPoint 변환이 메인 워크플로우입니다.

---

## Documentation

| 문서 | 설명 |
|------|------|
| **SKILL.md** (이 문서) | html2pptx 워크플로우, API, 도구 사용법 |
| [`DESIGN.md`](DESIGN.md) | 디자인 원칙, 레이아웃 존, 안티패턴 |
| [`CSS.md`](CSS.md) | CSS 프레임워크 (HTML → PPT용) |
| [`tools/ooxml.md`](tools/ooxml.md) | OOXML 직접 편집 레퍼런스 |

---

## CRITICAL: Read Documentation First

**Before starting any presentation task**, read the relevant documentation:

1. **디자인 원칙 (새 프레젠테이션 필수)**: Read [`DESIGN.md`](DESIGN.md) - 미학적 방향, 레이아웃 존, 안티패턴
2. **CSS 프레임워크**: Read [`CSS.md`](CSS.md) - 색상, 타이포그래피, 레이아웃 클래스
3. **기존 프레젠테이션 편집**: Read [`tools/ooxml.md`](tools/ooxml.md) in its entirety

---

## Quick Start

### Prerequisites

스크립트 사용 전에 html2pptx 라이브러리를 작업 디렉토리로 복사하세요:

```bash
# html2pptx 라이브러리 복사
cp -r .claude/skills/pptx/lib/html2pptx ./html2pptx
```

스크립트에서 `require("./html2pptx")` 사용.

### Basic Example

```javascript
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("./html2pptx");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "Your Name";
  pptx.title = "My Presentation";

  // HTML 슬라이드 추가
  await html2pptx("slides/title.html", pptx);
  await html2pptx("slides/content.html", pptx);

  // 저장
  await pptx.writeFile({ fileName: "presentation.pptx" });
  console.log("Presentation created!");
}

createPresentation().catch(console.error);
```

**실행:**

```bash
NODE_PATH="$(npm root -g)" node create-presentation.js 2>&1
```

---

## Creating HTML Slides

모든 HTML 슬라이드는 적절한 body 치수를 포함해야 합니다:

- **16:9** (자동 적용): `width: 960px; height: 540px`
- **4:3**: `width: 960px; height: 720px`
- **16:10**: `width: 960px; height: 600px`

### CSS 작성 방법

**필수 - 전체 파일 읽기**: [`CSS.md`](CSS.md)를 처음부터 끝까지 완전히 읽으세요.

- CSS 변수 오버라이드(`:root` 셀렉터 사용)로 색상, 타이포그래피, 간격 커스터마이즈
- [`CSS.md`](CSS.md)의 클래스를 슬라이드 생성에 사용

### Example Slide HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Slide Title</title>
    <style>
      :root {
        --color-primary: #00a4fc;
        --color-primary-foreground: #ffffff;
      }
    </style>
  </head>
  <body class="row items-fill-width gap-lg">
    <div class="p-8 pe-0">
      <h1>Slide title</h1>
      <p class="text-2xl text-muted-foreground">Subtitle or context</p>
    </div>
    <div class="placeholder w-3/5 fit"></div>
  </body>
</html>
```

---

## Supported HTML Elements

### Block Elements

`<div>`, `<section>`, `<header>`, `<footer>`, `<main>`, `<article>`, `<nav>`, `<aside>` - 배경/테두리 지원 컨테이너 요소 (그라데이션 및 배경 이미지 지원)

### Text Elements

- `<p>` - 스타일링이 있는 문단
- `<h1>`-`<h6>` - 스타일링이 있는 헤딩

### Lists

- `<ul>`, `<ol>` - 리스트 (수동 불릿 •, -, * 사용 금지)

### Inline Formatting

- `<b>`, `<strong>` - 굵은 텍스트
- `<i>`, `<em>` - 기울임 텍스트
- `<u>` - 밑줄 텍스트
- `<br>` - 줄바꿈

### Media

- `<img>` - 이미지

### Special Features

- `class="placeholder"` - 차트용 예약 공간 (returns `{ id, x, y, w, h }`)
- `data-balance` 속성 - 텍스트 줄 길이 자동 균형. `<h1>`과 `<h2>`는 자동 균형.

---

## Critical Text Rules

**IMPORTANT**: HTML을 PowerPoint로 안전하게 변환하기 위해 반드시 따라야 할 규칙.

### 모든 텍스트는 `<p>`, `<h1>`-`<h6>`, `<ul>`, 또는 `<ol>` 태그 안에 있어야 함

- ✅ 올바름: `<div><p>Text here</p></div>`
- ❌ 잘못됨: `<div>Text here</div>` - **텍스트가 PowerPoint에 나타나지 않음**

### 수동 불릿 기호 (•, -, *, 등) 절대 사용 금지

`<ul>` 또는 `<ol>` 리스트 대신 사용

### flexbox 대신 `row` 및 `col` 클래스 사용

- ✅ 올바름: `<div class="row"><p>Text here</p></div>`
- ❌ 잘못됨: `<div style="display: flex;"><p>Text here</p></div>`

### 웹 안전 폰트만 사용

- ✅ 웹 안전 폰트: `Arial`, `Helvetica`, `Times New Roman`, `Georgia`, `Courier New`, `Verdana`, `Tahoma`, `Trebuchet MS`, `Impact`
- ❌ 잘못됨: `'Segoe UI'`, `'SF Pro'`, `'Roboto'`, 커스텀 폰트

### 타이틀에 `white-space: nowrap` 절대 사용 금지

PowerPoint는 이 속성을 존중하지 않습니다. 대신 텍스트 박스 너비를 확보하세요.

---

## Shape Styling (block elements only)

**IMPORTANT**: 배경, 테두리, 그림자는 block 요소에만 작동하며 텍스트 요소에는 작동하지 않습니다.

### Backgrounds

```css
background: var(--color-surface);
background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary-dark) 100%);
background: url(path/to/image.png);
```

### Borders

```css
border: 1px solid var(--color-border);
border-left: 4px solid var(--color-primary);
```

### Border Radius

- `rounded` CSS 클래스로 기본 border-radius 적용
- `pill` CSS 클래스로 알약 모양

### Box Shadows

```css
box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
```

---

## Icons

아이콘은 인라인 SVG 또는 SVG 파일로 포함 가능합니다.

### react-icons 사용 방법

```javascript
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { FaHome } = require("react-icons/fa");

function renderIconSvg(IconComponent, color, size = "48") {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color: color, size: size })
  );
}

const homeIconSvg = renderIconSvg(FaHome, "#4472c4", "48");
```

---

## html2pptx API Reference

### Function Signature

```javascript
await html2pptx(htmlFilePath, pptxPresentation, options);
```

### Parameters

- `htmlFilePath` (string): HTML 파일 경로
- `pptxPresentation` (pptxgen): PptxGenJS 프레젠테이션 인스턴스
- `options` (object, optional):
  - `tmpDir` (string): 임시 디렉토리 (default: `process.env.TMPDIR || '/tmp'`)

### Returns

```javascript
{
    slide: pptxgenSlide,           // 생성된 슬라이드
    placeholders: [                 // placeholder 위치 배열
        { id: string, x: number, y: number, w: number, h: number },
        ...
    ]
}
```

### Validation

라이브러리는 자동으로 검증합니다:

1. **HTML 치수가 프레젠테이션 레이아웃과 일치해야 함**
2. **콘텐츠가 body를 넘치면 안 됨**
3. **텍스트 요소 스타일링** (block 요소에만 허용)

**모든 검증 오류가 한 번에 수집되고 보고됩니다.**

---

## Working with Placeholders

```javascript
const { slide, placeholders } = await html2pptx("slide.html", pptx);

// 첫 번째 placeholder 사용
slide.addChart(pptx.charts.BAR, data, placeholders[0]);

// ID로 찾기
const chartArea = placeholders.find((p) => p.id === "chart-area");
slide.addChart(pptx.charts.LINE, data, chartArea);
```

---

## Complete Example with Charts

```javascript
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("./html2pptx");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";

  // Slide 1: Title
  await html2pptx("slides/title.html", pptx);

  // Slide 2: Content with chart
  const { slide, placeholders } = await html2pptx("slides/data.html", pptx);

  const chartData = [
    {
      name: "Sales",
      labels: ["Q1", "Q2", "Q3", "Q4"],
      values: [4500, 5500, 6200, 7100],
    },
  ];

  slide.addChart(pptx.charts.BAR, chartData, {
    ...placeholders[0],
    showTitle: true,
    title: "Quarterly Sales",
    chartColors: ["4472C4"],
  });

  await pptx.writeFile({ fileName: "presentation.pptx" });
}

createPresentation().catch(console.error);
```

---

## Using PptxGenJS

`html2pptx`로 HTML을 슬라이드로 변환한 후, PptxGenJS를 사용하여 차트, 이미지 등 동적 콘텐츠를 추가합니다.

### Critical Rules

#### Colors

- PptxGenJS에서 hex 색상에 **절대 `#` 접두사 사용 금지** - 파일 손상 발생
- ✅ 올바름: `color: "FF0000"`, `fill: { color: "0066CC" }`
- ❌ 잘못됨: `color: "#FF0000"`

### Adding Charts

**대부분의 차트에 필수:** `catAxisTitle`과 `valAxisTitle`을 사용한 축 레이블.

#### Bar/Column Chart

```javascript
slide.addChart(pptx.charts.BAR, [
  {
    name: "Sales 2024",
    labels: ["Q1", "Q2", "Q3", "Q4"],
    values: [4500, 5500, 6200, 7100],
  },
], {
  ...placeholders[0],
  barDir: "col",
  showTitle: true,
  title: "Quarterly Sales",
  chartColors: ["4472C4"],
});
```

#### Line Chart

```javascript
slide.addChart(pptx.charts.LINE, [
  {
    name: "Temperature",
    labels: ["Jan", "Feb", "Mar", "Apr"],
    values: [32, 35, 42, 55],
  },
], {
  x: 1, y: 1, w: 8, h: 4,
  lineSize: 4,
  lineSmooth: true,
  chartColors: ["4472C4"],
});
```

#### Pie Chart

```javascript
slide.addChart(pptx.charts.PIE, [
  {
    name: "Market Share",
    labels: ["Product A", "Product B", "Other"],
    values: [35, 45, 20],
  },
], {
  x: 2, y: 1, w: 6, h: 4,
  showPercent: true,
  showLegend: true,
  chartColors: ["4472C4", "ED7D31", "A5A5A5"],
});
```

### Adding Tables

```javascript
slide.addTable([
  ["Header 1", "Header 2", "Header 3"],
  ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
], {
  x: 0.5, y: 1, w: 9, h: 3,
  border: { pt: 1, color: "999999" },
  fill: { color: "F1F1F1" },
});
```

### Adding Images

```javascript
const imgWidth = 1860, imgHeight = 1519;
const aspectRatio = imgWidth / imgHeight;
const h = 3;
const w = h * aspectRatio;
const x = (10 - w) / 2;

slide.addImage({ path: "chart.png", x, y: 1.5, w, h });
```

---

## Reading and Analyzing Content

### Text extraction

```bash
python -m markitdown path-to-file.pptx
```

### Raw XML access

```bash
mkdir -p unpacked && unzip -q presentation.pptx -d unpacked
```

#### Key file structures

- `ppt/presentation.xml` - 메인 프레젠테이션 메타데이터
- `ppt/slides/slide{N}.xml` - 개별 슬라이드 콘텐츠
- `ppt/notesSlides/notesSlide{N}.xml` - 발표자 노트
- `ppt/theme/` - 테마 및 스타일링 정보
- `ppt/media/` - 이미지 및 미디어 파일

---

## Editing an Existing Presentation

OOXML 직접 편집으로 기존 프레젠테이션을 수정합니다.

### Workflow

1. **Read documentation**: Read [`tools/ooxml.md`](tools/ooxml.md)
2. **Unpack**:
   ```bash
   mkdir -p unpacked && unzip -q presentation.pptx -d unpacked
   ```
3. **Edit** XML files
4. **Repack**:
   ```bash
   cd unpacked && zip -q -r ../output.pptx . && cd ..
   ```

### Python Tools

`tools/` 디렉토리에 편집 도구가 있습니다:

| 도구 | 설명 |
|------|------|
| `inventory.py` | 텍스트 추출 |
| `replace.py` | 텍스트 교체 |
| `rearrange.py` | 슬라이드 재배치 |
| `thumbnail.py` | 썸네일 생성 |
| `unpack.py` | PPTX → 포맷된 XML |
| `pack.py` | XML → PPTX |
| `validate.py` | XML 스키마 검증 |

```bash
# 의존성 설치
pip install -r tools/requirements.txt

# 텍스트 추출
python tools/inventory.py presentation.pptx output.json

# 텍스트 교체
python tools/replace.py input.pptx replacements.json output.pptx

# 썸네일 생성
python tools/thumbnail.py presentation.pptx
```

---

## Creating from Template

템플릿 기반 프레젠테이션 생성 워크플로우:

1. **템플릿 분석**: 텍스트 추출 및 썸네일 생성
2. **슬라이드 재배치**: `rearrange.py`로 필요한 슬라이드만 선택
3. **텍스트 추출**: `inventory.py`로 모든 텍스트 추출
4. **텍스트 교체**: `replace.py`로 새 콘텐츠 적용

```bash
# 1. 썸네일 생성
python tools/thumbnail.py template.pptx

# 2. 슬라이드 재배치 (0-indexed)
python tools/rearrange.py template.pptx working.pptx 0,34,50,52

# 3. 텍스트 추출
python tools/inventory.py working.pptx inventory.json

# 4. 텍스트 교체
python tools/replace.py working.pptx replacements.json output.pptx
```

---

## Creating Thumbnail Grids

```bash
python tools/thumbnail.py template.pptx [output_prefix]
```

**Features**:
- Creates: `thumbnails.jpg` (또는 대형 덱의 경우 여러 파일)
- Default: 5 columns, max 30 slides per grid
- Custom: `python tools/thumbnail.py template.pptx my-grid --cols 4`

---

## Dependencies

### Node.js

```bash
cd .claude/skills/pptx && npm install
```

### Python (편집 도구)

```bash
pip install -r tools/requirements.txt
```

### 시스템 도구 (선택사항)

- **LibreOffice**: PDF 변환 - `brew install --cask libreoffice`
- **Poppler**: 이미지 변환 - `brew install poppler`

---

## Code Style Guidelines

**IMPORTANT**: PPTX 작업 코드 생성 시:

- Write concise code
- Avoid verbose variable names
- Avoid unnecessary print statements

---

## Archive: Builder API

Builder API(선언적 테마 기반 생성)는 글로벌 경로 `~/.claude/skills/pptx/archive/`에 보관되어 있습니다.
필요시 해당 폴더의 `README.md`를 참조하세요.

---

**Last Updated**: 2026-01-29
