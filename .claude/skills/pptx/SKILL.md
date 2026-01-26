---
name: pptx
description: "Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks"
license: Proprietary. LICENSE.txt has complete terms
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---

# PPTX creation, editing, and analysis

.pptx 파일을 프로그래밍으로 생성, 편집, 분석합니다. .pptx는 XML 파일과 리소스를 담은 ZIP 아카이브입니다. 작업 유형에 따라 다양한 도구와 워크플로우를 사용할 수 있습니다.

## Overview

Create, edit, or analyze the contents of .pptx files when requested. A .pptx file is essentially a ZIP archive containing XML files and other resources. Different tools and workflows are available for different tasks.

---

## CRITICAL: Read Documentation First

**Before starting any presentation task**, read the relevant documentation:

1. **For creating new presentations (빌더 API, 권장)**: 이 문서의 Quick Start 섹션 참조
2. **For editing existing presentations**: Read [`tools/ooxml.md`](tools/ooxml.md) in its entirety

Understanding the workflow and best practices before starting is essential for producing high-quality presentations.

---

## Quick Start (빌더 API 방식 - 권장)

### PresentationBuilder로 간단하게 PPT 생성

```javascript
// presentation.js
const { PresentationBuilder } = require('/Users/glen/Desktop/work/glen-claude-skills/.claude/skills/pptx/lib');

async function main() {
  const builder = new PresentationBuilder('nxtcloud-v1');

  builder.setMetadata({ title: 'My Presentation', author: 'NXT Cloud' });
  builder.setFooter('My Presentation 2026');

  // 타이틀 슬라이드
  builder.addTitleSlide({
    title: 'AWS IAM 정책 관리',
    subtitle: '권한 관리의 모든 것',
    badge: '2026 EDITION',
    company: 'NXT Cloud',
    team: 'Technical Training Team'
  });

  // 섹션 슬라이드
  builder.addSectionSlide({
    number: '01',
    title: 'IAM 기본 개념',
    subtitle: '사용자, 그룹, 역할, 정책의 이해',
    bgColor: 'primary'
  });

  // 콘텐츠 슬라이드 (카드 4개)
  builder.addContentSlide({
    title: '핵심 구성 요소',
    subtitle: 'User, Group, Role, Policy',
    components: [
      {
        type: 'cards',
        columns: 4,
        items: [
          { icon: '👤', title: 'User', desc: '개별 사용자 계정' },
          { icon: '👥', title: 'Group', desc: 'User 논리적 집합' },
          { icon: '🎭', title: 'Role', desc: '임시 권한 위임' },
          { icon: '📋', title: 'Policy', desc: 'JSON 권한 문서' }
        ]
      }
    ]
  });

  // 요약 슬라이드
  builder.addSummarySlide({
    label: '핵심 정리',
    title: 'User + Role 모두 제어 필수',
    points: [
      { icon: '🔐', text: 'PassRole 제한이 핵심' },
      { icon: '⚠️', text: '권한 상승 공격 방지' }
    ]
  });

  await builder.save('output.pptx');
  console.log('✅ 생성 완료: output.pptx');
}

main();
```

실행:
```bash
NODE_PATH="$(npm root -g)" node presentation.js
open output.pptx
```

### 빌더 API 장점

- **선언적 데이터**: ~50줄 데이터로 프레젠테이션 생성
- **테마 시스템**: 색상, 폰트, 레이아웃 자동 적용
- **컴포넌트 기반**: 카드, 타임라인, 비교 박스 등 재사용 가능
- **일관된 디자인**: 테마가 모든 요소에 일관성 보장

---

## Creating a new PowerPoint presentation (빌더 API 방식 - 권장)

모듈화된 PresentationBuilder를 사용하여 선언적으로 프레젠테이션을 생성합니다. Claude가 콘텐츠 데이터만 정의하면 테마 시스템이 디자인을 자동 적용합니다.

### 라이브러리 구조

```
.claude/skills/pptx/lib/
├── index.js              # 메인 진입점
├── builder.js            # PresentationBuilder 클래스
├── assets/               # 로고 등 정적 리소스
└── themes/
    ├── index.js          # 테마 레지스트리
    ├── nxtcloud-v1/      # V1 테마 (중앙 정렬, 파란색)
    │   ├── config.js     # 색상, 타이포그래피, 레이아웃
    │   ├── components/   # 테마별 컴포넌트
    │   └── layouts/      # 테마별 레이아웃
    └── nxtcloud-v2/      # V2 테마 (좌측 정렬, 녹색)
        ├── config.js
        ├── components/
        └── layouts/
```

### 기본 사용법

```javascript
const { PresentationBuilder } = require('./.claude/skills/pptx/lib');

async function main() {
  const builder = new PresentationBuilder('nxtcloud-v1');

  builder.setMetadata({ title: '제목', author: '작성자' });
  builder.setFooter('프레젠테이션 이름');

  builder.addTitleSlide({ title: '메인 제목', subtitle: '부제목' });
  builder.addSectionSlide({ number: '01', title: '섹션명' });
  builder.addContentSlide({ title: '내용', components: [...] });
  builder.addSummarySlide({ title: '요약', points: [...] });

  await builder.save('output.pptx');
}
```

### 슬라이드 유형별 데이터 구조

#### 1. 타이틀 슬라이드 (`addTitleSlide`)

```javascript
builder.addTitleSlide({
  title: '메인 제목',           // 필수
  subtitle: '부제목',           // 선택
  badge: '2026 EDITION',       // 상단 배지
  company: 'NXT Cloud',        // 회사명
  team: 'Training Team',       // 팀명
  audience: '대학생 • 교수'     // 대상
});
```

#### 2. 섹션 슬라이드 (`addSectionSlide`)

```javascript
builder.addSectionSlide({
  number: '01',                // 섹션 번호
  title: '섹션 제목',           // 필수
  subtitle: '섹션 설명',        // 선택
  bgColor: 'primary'           // 배경색 (primary, navy 등)
});
```

#### 3. 콘텐츠 슬라이드 (`addContentSlide`)

```javascript
builder.addContentSlide({
  title: '슬라이드 제목',
  subtitle: '부제목',
  bgColor: 'white',            // 배경색
  components: [                // 컴포넌트 배열
    {
      type: 'cards',
      columns: 4,
      items: [
        { icon: '👤', title: 'User', desc: '설명...' },
        { icon: '👥', title: 'Group', desc: '설명...' }
      ]
    }
  ]
});
```

#### 4. 요약 슬라이드 (`addSummarySlide`)

```javascript
builder.addSummarySlide({
  label: '핵심 정리',
  title: '핵심 메시지',
  bgColor: 'navy',
  points: [
    { icon: '🔐', text: '포인트 1' },
    { icon: '⚠️', text: '포인트 2' }
  ]
});
```

### 사용 가능한 컴포넌트

#### cards (카드 그리드)
```javascript
{ type: 'cards', columns: 4, cardHeight: 2.5, items: [...] }
```

#### bullets (불릿 리스트)
```javascript
{ type: 'bullets', items: ['항목1', '항목2'], icon: '•' }
```

#### timeline (타임라인)
```javascript
{
  type: 'timeline',
  items: [
    { year: '1980', title: 'PC 시대', description: '설명...' },
    { year: '2006', title: '클라우드', description: '...' }
  ]
}
```

#### comparison (좌우 비교)
```javascript
{
  type: 'comparison',
  left: { title: '이전', items: ['항목1', '항목2'], bgColor: 'slate100' },
  right: { title: '이후', items: ['항목1', '항목2'], bgColor: 'blue100' }
}
```

#### vs (VS 비교)
```javascript
{
  type: 'vs',
  left: { title: '인간 vs AI', bgColor: 'red100', quote: '경쟁' },
  right: { title: '인간 + AI', bgColor: 'green100', checkmark: true }
}
```

#### text (텍스트)
```javascript
{ type: 'text', text: '텍스트 내용', bold: true, color: 'primary' }
```

#### box (강조 박스)
```javascript
{ type: 'box', text: '강조 메시지', bgColor: 'primary', color: 'white' }
```

### 데이터 기반 빌드

슬라이드 데이터 배열로 한 번에 생성:

```javascript
const { createPresentation } = require('./.claude/skills/pptx/lib');

const slides = [
  { type: 'title', title: 'Hello', subtitle: 'World' },
  { type: 'section', number: '01', title: 'Intro' },
  { type: 'content', title: 'Details', components: [...] },
  { type: 'summary', title: '요약', points: [...] }
];

const builder = createPresentation(slides, {
  theme: 'nxtcloud-v1',
  footer: 'My Presentation',
  metadata: { title: 'My PPT', author: 'Glen' }
});

await builder.save('output.pptx');
```

### 커스텀 슬라이드 (고급)

빈 슬라이드에 컴포넌트 직접 추가:

```javascript
const slide = builder.addBlankSlide({ title: '커스텀 슬라이드' });

builder.addCards(slide, {
  items: [...],
  startY: 2.0,
  cardHeight: 2.0
});

builder.addTimeline(slide, {
  items: [...],
  y: 4.0
});
```

### 테마 색상 참조

`nxtcloud-v1` 테마에서 사용 가능한 색상:

| 이름 | 용도 |
|------|------|
| `navy` | 어두운 배경 |
| `primary` | 주요 강조색 (파랑) |
| `accent` | 포인트 색상 (하늘색) |
| `white` | 밝은 배경 |
| `slate100` ~ `slate900` | 중립 그레이 |
| `amber500`, `green500`, `purple500`, `red500` | 시맨틱 색상 |

---

## Creating a new PowerPoint presentation (JS 템플릿 방식 - 고급)

NXT Cloud 스타일의 고품질 프레젠테이션을 생성하는 권장 워크플로우입니다. pptxgenjs를 직접 사용하여 정밀한 제어가 가능합니다.

### 테마 참조

테마별 색상, 타이포그래피, 레이아웃 설정:
- `lib/themes/nxtcloud-v1/config.js` - V1 테마 (중앙 정렬, 파란색)
- `lib/themes/nxtcloud-v2/config.js` - V2 테마 (좌측 정렬, 녹색)

### 워크플로우

1. **프레젠테이션 기획**:
   - 주제와 대상 청중 확인
   - 섹션 구성 및 슬라이드 개요 작성
   - 각 슬라이드의 레이아웃 유형 결정

2. **색상 팔레트 설정** (테마 config.js 참조):
   ```javascript
   const colors = {
     navy: "0f172a",      // 섹션 정리 배경
     primary: "2563eb",   // 주요 강조색
     accent: "38bdf8",    // 포인트 색상
     white: "ffffff",     // 일반 배경
     slate100: "f1f5f9",  // 카드 배경
     slate500: "64748b",  // 부제목
     slate900: "1e293b",  // 제목
     // ...추가 색상
   };
   ```

3. **슬라이드 유형별 레이아웃**:

   **타이틀 슬라이드**:
   - 배경: Navy
   - 상단 Primary 바
   - 중앙 정렬 제목 (54pt Bold)
   - 하단 회사명, 대상 정보

   **섹션 타이틀 슬라이드**:
   - 배경: 섹션별 테마 색상
   - 큰 섹션 번호 (01, 02...)
   - 중앙 정렬 섹션 제목 (48pt Bold)

   **내용 슬라이드**:
   - 배경: White
   - 좌측 상단 제목 (36pt Bold)
   - y 1.5 이후 내용 영역
   - 우측 하단 워터마크

   **섹션 정리 슬라이드**:
   - 배경: Navy
   - 강조 레이블 (accent 색상)
   - 핵심 메시지 + 불릿 포인트

4. **JS 파일 작성**:
   ```javascript
   const pptxgen = require("pptxgenjs");

   async function createPresentation() {
     const pptx = new pptxgen();
     pptx.layout = "LAYOUT_16x9";
     pptx.author = "NXT Cloud";
     pptx.title = "프레젠테이션 제목";

     // 색상 정의
     const colors = { /* lib/themes/nxtcloud-v1/config.js 참조 */ };

     // 슬라이드 생성
     let slide1 = pptx.addSlide();
     slide1.background = { color: colors.navy };
     // ...

     await pptx.writeFile({ fileName: "output.pptx" });
   }

   createPresentation();
   ```

5. **실행 및 검증**:
   ```bash
   NODE_PATH="$(npm root -g)" node presentation.js
   open output.pptx
   ```

### 주요 API 예시

**텍스트 추가**:
```javascript
slide.addText("제목", {
  x: 0.5, y: 0.4, w: 9, h: 0.6,
  fontSize: 36, color: colors.slate900, bold: true
});
```

**도형 추가**:
```javascript
slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 1.5, w: 4, h: 2,
  fill: { type: "solid", color: colors.slate100 }
});
```

**워터마크**:
```javascript
slide.addText("Modern IT Trend 2026", {
  x: 7.5, y: 5.2, w: 2.3, h: 0.3,
  align: "right", fontSize: 10, color: colors.slate400
});
```

---

## Reading and analyzing content

### Text extraction

To read just the text content of a presentation, convert the document to markdown:

```bash
# Convert document to markdown
python -m markitdown path-to-file.pptx
```

### Raw XML access

Use raw XML access for: comments, speaker notes, slide layouts, animations, design elements, and complex formatting. To access these features, unpack a presentation and read its raw XML contents.

#### Unpacking a file

```bash
mkdir -p unpacked && unzip -q presentation.pptx -d unpacked
```

#### Key file structures

- `ppt/presentation.xml` - Main presentation metadata and slide references
- `ppt/slides/slide{N}.xml` - Individual slide contents (slide1.xml, slide2.xml, etc.)
- `ppt/notesSlides/notesSlide{N}.xml` - Speaker notes for each slide
- `ppt/comments/modernComment_*.xml` - Comments for specific slides
- `ppt/slideLayouts/` - Layout templates for slides
- `ppt/slideMasters/` - Master slide templates
- `ppt/theme/` - Theme and styling information
- `ppt/media/` - Images and other media files

#### Typography and color extraction

**To emulate example designs**, analyze the presentation's typography and colors first using the methods below:

1. **Read theme file**: Check `ppt/theme/theme1.xml` for colors (`<a:clrScheme>`) and fonts (`<a:fontScheme>`)
2. **Sample slide content**: Examine `ppt/slides/slide1.xml` for actual font usage (`<a:rPr>`) and colors
3. **Search for patterns**: Use grep to find color (`<a:solidFill>`, `<a:srgbClr>`) and font references across all XML files

---

## Editing an existing PowerPoint presentation

To edit slides in an existing PowerPoint presentation, work with the raw Office Open XML (OOXML) format. This involves unpacking the .pptx file, editing the XML content, and repacking it.

### Workflow

1. **Read documentation**: Read [`tools/ooxml.md`](tools/ooxml.md) completely
2. **Unpack** the presentation:
   ```bash
   mkdir -p unpacked && unzip -q presentation.pptx -d unpacked
   ```
3. **Edit** the XML files (primarily `ppt/slides/slide{N}.xml` and related files)
4. **Repack** the presentation:
   ```bash
   cd unpacked && zip -q -r ../output.pptx . && cd ..
   ```

### Python 도구 (고급)

`tools/` 디렉토리에 편집 도구가 있습니다:

- `inventory.py` - 텍스트 추출
- `replace.py` - 텍스트 교체
- `rearrange.py` - 슬라이드 재배치
- `thumbnail.py` - 썸네일 생성

```bash
# 의존성 설치
pip install -r tools/requirements.txt

# 텍스트 추출
python tools/inventory.py presentation.pptx output.json

# 텍스트 교체
python tools/replace.py input.pptx replacements.json output.pptx
```

---

## Modifying Speaker Notes (발표자 메모 수정)

발표자 메모는 OOXML 편집으로 수정할 수 있습니다. 메모는 `ppt/notesSlides/notesSlide{N}.xml` 파일에 저장됩니다.

### 워크플로우

```bash
# 1. PPTX 압축 해제
mkdir -p unpacked && unzip -q presentation.pptx -d unpacked

# 2. 발표자 메모 파일 확인
ls unpacked/ppt/notesSlides/

# 3. 메모 편집 (XML 직접 수정)
# <a:t> 태그 안의 텍스트를 수정

# 4. 다시 압축
cd unpacked && zip -q -r ../output.pptx . && cd ..
```

---

## Creating a new PowerPoint presentation **using a template**

To create a presentation that follows an existing template's design, duplicate and re-arrange template slides before replacing placeholder content.

### Workflow

1. **Extract template text AND create visual thumbnail grid**:

   - Extract text: `python -m markitdown template.pptx > template-content.md`
   - Read `template-content.md` completely to understand the template contents
   - Create thumbnail grids: `python tools/thumbnail.py template.pptx`
   - See [Creating Thumbnail Grids](#creating-thumbnail-grids) section for more details

2. **Analyze template and save inventory to a file**:

   - **Visual Analysis**: Review thumbnail grid(s) to understand slide layouts, design patterns, and visual structure
   - Create and save a template inventory file at `template-inventory.md` containing:

     ```markdown
     # Template Inventory Analysis

     **Total Slides: [count]**
     **IMPORTANT: Slides are 0-indexed (first slide = 0, last slide = count-1)**

     ## [Category Name]

     - Slide 0: [Layout code if available] - Description/purpose
     - Slide 1: [Layout code] - Description/purpose
     - Slide 2: [Layout code] - Description/purpose
       [... EVERY slide must be listed individually with its index ...]
     ```

   - **Using the thumbnail grid**: Reference the visual thumbnails to identify:
     - Layout patterns (title slides, content layouts, section dividers)
     - Image placeholder locations and counts
     - Design consistency across slide groups
     - Visual hierarchy and structure
   - This inventory file is REQUIRED for selecting appropriate templates in the next step

3. **Create presentation outline based on template inventory**:

   - Review available templates from step 2.
   - Choose an intro or title template for the first slide. This should be one of the first templates.
   - Choose safe, text-based layouts for the other slides.
   - **CRITICAL: Match layout structure to actual content**:
     - Single-column layouts: Use for unified narrative or single topic
     - Two-column layouts: Use ONLY when there are exactly 2 distinct items/concepts
     - Three-column layouts: Use ONLY when there are exactly 3 distinct items/concepts
     - Image + text layouts: Use ONLY when there are actual images to insert
     - Quote layouts: Use ONLY for actual quotes from people (with attribution), never for emphasis
     - Never use layouts with more placeholders than available content
     - With 2 items, avoid forcing them into a 3-column layout
     - With 4+ items, consider breaking into multiple slides or using a list format
   - Count actual content pieces BEFORE selecting the layout
   - Verify each placeholder in the chosen layout will be filled with meaningful content
   - Select one option representing the **best** layout for each content section.
   - Save `outline.md` with content AND template mapping that leverages available designs
   - Example template mapping:
     ```
     # Template slides to use (0-based indexing)
     # WARNING: Verify indices are within range! Template with 73 slides has indices 0-72
     # Mapping: slide numbers from outline -> template slide indices
     template_mapping = [
         0,   # Use slide 0 (Title/Cover)
         34,  # Use slide 34 (B1: Title and body)
         34,  # Use slide 34 again (duplicate for second B1)
         50,  # Use slide 50 (E1: Quote)
         54,  # Use slide 54 (F2: Closing + Text)
     ]
     ```

4. **Duplicate, reorder, and delete slides using `rearrange.py`**:

   - Use the `tools/rearrange.py` script to create a new presentation with slides in the desired order:
     ```bash
     python tools/rearrange.py template.pptx working.pptx 0,34,34,50,52
     ```
   - The script handles duplicating repeated slides, deleting unused slides, and reordering automatically
   - Slide indices are 0-based (first slide is 0, second is 1, etc.)
   - The same slide index can appear multiple times to duplicate that slide

5. **Extract ALL text using the `inventory.py` script**:

   - **Run inventory extraction**:
     ```bash
     python tools/inventory.py working.pptx text-inventory.json
     ```
   - **Read text-inventory.json** completely to understand all shapes and their properties

   - The inventory JSON structure:

     ```json
     {
       "slide-0": {
         "shape-0": {
           "placeholder_type": "TITLE", // or null for non-placeholders
           "left": 1.5, // position in inches
           "top": 2.0,
           "width": 7.5,
           "height": 1.2,
           "paragraphs": [
             {
               "text": "Paragraph text",
               // Optional properties (only included when non-default):
               "bullet": true, // explicit bullet detected
               "level": 0, // only included when bullet is true
               "alignment": "CENTER", // CENTER, RIGHT (not LEFT)
               "space_before": 10.0, // space before paragraph in points
               "space_after": 6.0, // space after paragraph in points
               "line_spacing": 22.4, // line spacing in points
               "font_name": "Arial", // from first run
               "font_size": 14.0, // in points
               "bold": true,
               "italic": false,
               "underline": false,
               "color": "FF0000" // RGB color
             }
           ]
         }
       }
     }
     ```

   - Key features:
     - **Slides**: Named as "slide-0", "slide-1", etc.
     - **Shapes**: Ordered by visual position (top-to-bottom, left-to-right) as "shape-0", "shape-1", etc.
     - **Placeholder types**: TITLE, CENTER_TITLE, SUBTITLE, BODY, OBJECT, or null
     - **Default font size**: `default_font_size` in points extracted from layout placeholders (when available)
     - **Slide numbers are filtered**: Shapes with SLIDE_NUMBER placeholder type are automatically excluded from inventory
     - **Bullets**: When `bullet: true`, `level` is always included (even if 0)
     - **Spacing**: `space_before`, `space_after`, and `line_spacing` in points (only included when set)
     - **Colors**: `color` for RGB (e.g., "FF0000"), `theme_color` for theme colors (e.g., "DARK_1")
     - **Properties**: Only non-default values are included in the output

6. **Generate replacement text and save the data to a JSON file**

   Based on the text inventory from the previous step:

   - **CRITICAL**: First verify which shapes exist in the inventory - only reference shapes that are actually present
   - **VALIDATION**: The replace.py script validates that all shapes in the replacement JSON exist in the inventory
     - Referencing a non-existent shape produces an error showing available shapes
     - Referencing a non-existent slide produces an error indicating the slide doesn't exist
     - All validation errors are shown at once before the script exits
   - **IMPORTANT**: The replace.py script uses inventory.py internally to identify ALL text shapes
   - **AUTOMATIC CLEARING**: ALL text shapes from the inventory are cleared unless "paragraphs" are provided for them
   - Add a "paragraphs" field to shapes that need content (not "replacement_paragraphs")
   - Shapes without "paragraphs" in the replacement JSON have their text cleared automatically
   - Paragraphs with bullets are automatically left aligned. Avoid setting the `alignment` property when `"bullet": true`
   - Generate appropriate replacement content for placeholder text
   - Use shape size to determine appropriate content length
   - **CRITICAL**: Include paragraph properties from the original inventory - don't just provide text
   - **IMPORTANT**: When bullet: true, do NOT include bullet symbols (•, -, \*) in text - they're added automatically
   - **ESSENTIAL FORMATTING RULES**:
     - Headers/titles should typically have `"bold": true`
     - List items should have `"bullet": true, "level": 0` (level is required when bullet is true)
     - Preserve any alignment properties (e.g., `"alignment": "CENTER"` for centered text)
     - Include font properties when different from default (e.g., `"font_size": 14.0`, `"font_name": "Lora"`)
     - Colors: Use `"color": "FF0000"` for RGB or `"theme_color": "DARK_1"` for theme colors
     - The replacement script expects **properly formatted paragraphs**, not just text strings
     - **Overlapping shapes**: Prefer shapes with larger default_font_size or more appropriate placeholder_type
   - Save the updated inventory with replacements to `replacement-text.json`
   - **WARNING**: Different template layouts have different shape counts - always check the actual inventory before creating replacements

   Example paragraphs field showing proper formatting:

   ```json
   "paragraphs": [
     {
       "text": "New presentation title text",
       "alignment": "CENTER",
       "bold": true
     },
     {
       "text": "Section Header",
       "bold": true
     },
     {
       "text": "First bullet point without bullet symbol",
       "bullet": true,
       "level": 0
     },
     {
       "text": "Red colored text",
       "color": "FF0000"
     },
     {
       "text": "Theme colored text",
       "theme_color": "DARK_1"
     },
     {
       "text": "Regular paragraph text without special formatting"
     }
   ]
   ```

   **Shapes not listed in the replacement JSON are automatically cleared**:

   ```json
   {
     "slide-0": {
       "shape-0": {
         "paragraphs": [...] // This shape gets new text
       }
       // shape-1 and shape-2 from inventory will be cleared automatically
     }
   }
   ```

   **Common formatting patterns for presentations**:

   - Title slides: Bold text, sometimes centered
   - Section headers within slides: Bold text
   - Bullet lists: Each item needs `"bullet": true, "level": 0`
   - Body text: Usually no special properties needed
   - Quotes: May have special alignment or font properties

7. **Apply replacements using the `replace.py` script**

   ```bash
   python tools/replace.py working.pptx replacement-text.json output.pptx
   ```

   The script will:

   - First extract the inventory of ALL text shapes using functions from inventory.py
   - Validate that all shapes in the replacement JSON exist in the inventory
   - Clear text from ALL shapes identified in the inventory
   - Apply new text only to shapes with "paragraphs" defined in the replacement JSON
   - Preserve formatting by applying paragraph properties from the JSON
   - Handle bullets, alignment, font properties, and colors automatically
   - Save the updated presentation

   Example validation errors:

   ```
   ERROR: Invalid shapes in replacement JSON:
     - Shape 'shape-99' not found on 'slide-0'. Available shapes: shape-0, shape-1, shape-4
     - Slide 'slide-999' not found in inventory
   ```

   ```
   ERROR: Replacement text made overflow worse in these shapes:
     - slide-0/shape-2: overflow worsened by 1.25" (was 0.00", now 1.25")
   ```

---

## Creating Thumbnail Grids

To create visual thumbnail grids of PowerPoint slides for quick analysis and reference:

```bash
python tools/thumbnail.py template.pptx [output_prefix]
```

**Features**:

- Creates: `thumbnails.jpg` (or `thumbnails-1.jpg`, `thumbnails-2.jpg`, etc. for large decks)
- Default: 5 columns, max 30 slides per grid (5×6)
- Custom prefix: `python tools/thumbnail.py template.pptx my-grid`
  - Note: The output prefix should include the path if you want output in a specific directory (e.g., `workspace/my-grid`)
- Adjust columns: `--cols 4` (range: 3-6, affects slides per grid)
- Grid limits: 3 cols = 12 slides/grid, 4 cols = 20, 5 cols = 30, 6 cols = 42
- Slides are zero-indexed (Slide 0, Slide 1, etc.)

**Use cases**:

- Template analysis: Quickly understand slide layouts and design patterns
- Content review: Visual overview of entire presentation
- Navigation reference: Find specific slides by their visual appearance
- Quality check: Verify all slides are properly formatted

**Examples**:

```bash
# Basic usage
python tools/thumbnail.py presentation.pptx

# Combine options: custom name, columns
python tools/thumbnail.py template.pptx analysis --cols 4
```

---

## Converting Slides to Images

To visually analyze PowerPoint slides, convert them to images using a two-step process:

1. **Convert PPTX to PDF**:

   ```bash
   soffice --headless --convert-to pdf template.pptx
   ```

2. **Convert PDF pages to JPEG images**:
   ```bash
   pdftoppm -jpeg -r 150 template.pdf slide
   ```
   This creates files like `slide-1.jpg`, `slide-2.jpg`, etc.

Options:

- `-r 150`: Sets resolution to 150 DPI (adjust for quality/size balance)
- `-jpeg`: Output JPEG format (use `-png` for PNG if preferred)
- `-f N`: First page to convert (e.g., `-f 2` starts from page 2)
- `-l N`: Last page to convert (e.g., `-l 5` stops at page 5)
- `slide`: Prefix for output files

Example for specific range:

```bash
pdftoppm -jpeg -r 150 -f 2 -l 5 template.pdf slide  # Converts only pages 2-5
```

---

## Code Style Guidelines

**IMPORTANT**: When generating code for PPTX operations:

- Write concise code
- Avoid verbose variable names and redundant operations
- Avoid unnecessary print statements

---

## Dependencies

### Node.js (빌더 API)

```bash
cd .claude/skills/pptx && npm install
```

### Python (편집 도구, 선택사항)

```bash
pip install -r tools/requirements.txt
```

### 시스템 도구 (선택사항)

- **LibreOffice**: PDF 변환 - `brew install --cask libreoffice` (macOS)
- **Poppler**: 이미지 변환 - `brew install poppler` (macOS)

---

**Last Updated**: 2026-01-26
