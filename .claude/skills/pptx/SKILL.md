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

## CRITICAL: Read All Documentation First

**Before starting any presentation task**, read ALL relevant documentation files completely to understand the full workflow:

1. **For creating new presentations (JS 템플릿 방식, 권장)**: Read [`PPT-Design-Guide.md`](PPT-Design-Guide.md) and [`ppt-template-nxtcloud.js`](ppt-template-nxtcloud.js) as reference
2. **For creating new presentations (HTML 방식)**: Read [`html2pptx.md`](html2pptx.md) and [`css.md`](css.md) in their entirety
3. **For editing existing presentations**: Read [`ooxml.md`](ooxml.md) in its entirety
4. **For template-based creation**: Read the relevant sections of this file plus [`css.md`](css.md)

**NEVER set any range limits when reading these files.** Understanding the complete workflow, constraints, and best practices before starting is essential for producing high-quality presentations. Partial knowledge leads to errors, inconsistent styling, and visual defects that require rework.

---

## Quick Start (JS 템플릿 방식 - 권장)

### NXT Cloud 스타일 PPT 생성

```bash
# 1. Create content folder
mkdir -p /Users/glen/Desktop/work/glen-claude-skills/contents/my-presentation
cd /Users/glen/Desktop/work/glen-claude-skills/contents/my-presentation

# 2. Create presentation.js based on the template
# Reference: .claude/skills/pptx/ppt-template-nxtcloud.js
# Design Guide: .claude/skills/pptx/PPT-Design-Guide.md

# 3. Generate PPT
NODE_PATH="$(npm root -g)" node presentation.js

# 4. View result
open output.pptx
```

### JS 템플릿 방식의 장점

- **정밀한 제어**: 픽셀 단위로 위치, 크기 조정 가능
- **일관된 디자인**: 색상 팔레트, 폰트 크기 등 체계화
- **다양한 레이아웃**: 타이틀, 섹션, 콘텐츠, 정리 슬라이드 등 유형별 템플릿
- **시각적 요소**: 타임라인, 카드, 아이콘, 구분선 등 풍부한 요소

---

## Quick Start (HTML 방식)

### Run Example

```bash
cd /Users/glen/Desktop/work/glen-claude-skills/contents/example
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js
open output.pptx
```

### Create New Presentation

```bash
# 1. Create content folder
mkdir -p /Users/glen/Desktop/work/glen-claude-skills/contents/my-presentation
cd /Users/glen/Desktop/work/glen-claude-skills/contents/my-presentation

# 2. Write HTML slides (slide1.html, slide2.html, ...)
# Each file uses 960×540px layout

# 3. Copy styles (optional)
cp ../example/styles.css .

# 4. Generate PPT
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js

# 5. View result
open output.pptx
```

---

## Creating a new PowerPoint presentation (JS 템플릿 방식 - 권장)

NXT Cloud 스타일의 고품질 프레젠테이션을 생성하는 권장 워크플로우입니다. pptxgenjs를 직접 사용하여 정밀한 제어가 가능합니다.

### 필수 문서

시작하기 전에 반드시 읽어야 할 파일들:

1. **[`PPT-Design-Guide.md`](PPT-Design-Guide.md)** - 색상 팔레트, 폰트 크기, 레이아웃 가이드
2. **[`ppt-template-nxtcloud.js`](ppt-template-nxtcloud.js)** - 실제 구현 예제 (참고용, 전체를 읽을 필요 없이 필요한 슬라이드 유형만 참조)

### 워크플로우

1. **프레젠테이션 기획**:
   - 주제와 대상 청중 확인
   - 섹션 구성 및 슬라이드 개요 작성
   - 각 슬라이드의 레이아웃 유형 결정

2. **색상 팔레트 설정** (PPT-Design-Guide.md 참조):
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
     const colors = { /* PPT-Design-Guide.md 참조 */ };

     // 슬라이드 생성 (ppt-template-nxtcloud.js 참조)
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

`python ooxml/scripts/unpack.py <office_file> <output_dir>`

**Note**: The unpack.py script is located at `skills/public/pptx/ooxml/scripts/unpack.py` relative to the project root. If the script doesn't exist at this path, use `find . -name "unpack.py"` to locate it.

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

## Creating a new PowerPoint presentation **without a template**

When creating a new PowerPoint presentation from scratch, use the **html2pptx** workflow to convert HTML slides to PowerPoint with accurate positioning.

### Workflow

1. **Read documentation**: Read [`html2pptx.md`](html2pptx.md) and [`css.md`](css.md) completely (see "CRITICAL: Read All Documentation First" section above)

2. **Plan the presentation**: Follow html2pptx.md "Design Philosophy" section for:
   - Aesthetic direction and bold design choices
   - Color palette selection (see "Creating your color palette")
   - Typography strategy
   - Write DETAILED outline with slide layouts and presenter notes (1-3 sentences per slide)

3. **Set CSS variables**: Override CSS variables in a shared `.css` file for colors, typography, and spacing (see css.md "Design System Variables")

4. **Create HTML slides** (960px × 540px for 16:9): Follow html2pptx.md for:
   - Slide layout zones (title, content, footnote)
   - Critical text rules (proper HTML tags)
   - Supported elements and styling

5. Create and run a JavaScript file using the [`html2pptx`](./html2pptx) library to convert HTML slides to PowerPoint and save the presentation

   - Run with: `NODE_PATH="$(npm root -g)" node your-script.js 2>&1`
   - Use the `html2pptx` function to process each HTML file
   - Add charts and tables to placeholder areas using PptxGenJS API
   - Save the presentation using `pptx.writeFile()`

   - **⚠️ CRITICAL:** Your script MUST follow this example structure. Think aloud before writing the script to make sure that you correctly use the APIs. Do NOT call `pptx.addSlide`.

   ```javascript
   const pptxgen = require("pptxgenjs");
   const { html2pptx } = require("./html2pptx");

   // Create a new pptx presentation
   const pptx = new pptxgen();
   pptx.layout = "LAYOUT_16x9"; // Must match HTML body dimensions
   pptx.defineLayout({ name: "LAYOUT_16x9", width: 10, height: 5.625 });

   // Add an HTML-only slide
   await html2pptx("slide1.html", pptx);

   // Add a HTML slide with chart placeholders
   const { slide: slide2, placeholders } = await html2pptx("slide2.html", pptx);
   slide2.addChart(pptx.ChartTypes.line, chartData, placeholders[0]);

   // Save the presentation
   await pptx.writeFile({ fileName: "output.pptx" });
   ```

6. **Visual validation**: Convert to images and inspect for layout issues
   - Convert PPTX to PDF first: `soffice --headless --convert-to pdf output.pptx`
   - Then convert PDF to images: `pdftoppm -jpeg -r 150 output.pdf slide`
     - This creates files like `slide-1.jpg`, `slide-2.jpg`, etc.
   - Read each generated image file and carefully examine for:
     - **Text cutoff**: Text being cut off by header bars, shapes, or slide edges
     - **Text overlap**: Text overlapping with other text or shapes
     - **Positioning issues**: Content too close to slide boundaries or other elements
     - **Contrast issues**: Insufficient contrast between text and backgrounds
     - **Alignment problems**: Elements not properly aligned with each other
     - **Visual hierarchy**: Important content properly emphasized
   - **CRITICAL: All slides MUST pass these validation checks before delivering to the user.** Do not skip this step or deliver presentations with visual defects.
   - If issues found, fix them in the following order of priority:
     1. **Increase margins** - Add more padding/spacing around problematic elements
     2. **Adjust font size** - Reduce text size to fit within available space
     3. **Rethink the layout entirely** - If the above fixes don't work, redesign the slide layout
   - Regenerate the presentation after making changes
   - Repeat until all slides are visually correct

---

## Editing an existing PowerPoint presentation

To edit slides in an existing PowerPoint presentation, work with the raw Office Open XML (OOXML) format. This involves unpacking the .pptx file, editing the XML content, and repacking it.

### Workflow

1. **Read documentation**: Read [`ooxml.md`](ooxml.md) completely (see "CRITICAL: Read All Documentation First" section above)
2. Unpack the presentation: `python ooxml/scripts/unpack.py <office_file> <output_dir>`
3. Edit the XML files (primarily `ppt/slides/slide{N}.xml` and related files)
4. **CRITICAL**: Validate immediately after each edit: `python ooxml/scripts/validate.py <dir> --original <file>`
5. Pack the final presentation: `python ooxml/scripts/pack.py <input_directory> <office_file>`

---

## Modifying Speaker Notes Only (발표자 메모 수정)

기존 PPTX 파일의 발표자 메모만 수정할 때 사용합니다. 전체 프레젠테이션을 다시 생성하지 않고 메모만 업데이트합니다.

### 사용 시나리오

- 처음 생성 시 슬라이드와 발표자 메모가 함께 만들어진 후
- 사용자가 발표자 메모를 더 상세하게 작성해달라고 요청할 때
- 기존 메모를 수정하거나 보완할 때

### 워크플로우

1. **가상환경 활성화** (python-pptx 사용):
   ```bash
   source /Users/glen/Desktop/work/glen-claude-skills/.claude/skills/pptx/venv/bin/activate
   ```

2. **기존 메모 추출** (선택사항):
   ```bash
   python /Users/glen/Desktop/work/glen-claude-skills/.claude/skills/pptx/update-notes.py extract presentation.pptx notes-current.json
   ```

   출력 예시:
   ```
   슬라이드 1: 250 글자
   슬라이드 2: 180 글자
   ...
   추출 완료: notes-current.json
   ```

3. **새 발표자 메모 JSON 작성** (`notes.json`):

   **형식 1**: 슬라이드 번호 지정
   ```json
   {
     "notes": [
       {"slide": 1, "text": "첫 번째 슬라이드 발표자 메모입니다.\n\n강조할 포인트:\n- 첫 번째 포인트\n- 두 번째 포인트"},
       {"slide": 3, "text": "세 번째 슬라이드 메모 (2번은 건너뜀)"},
       {"slide": 5, "text": "다섯 번째 슬라이드 메모"}
     ]
   }
   ```

   **형식 2**: 순서대로 적용 (모든 슬라이드)
   ```json
   {
     "notes": [
       "첫 번째 슬라이드 메모",
       "두 번째 슬라이드 메모",
       "세 번째 슬라이드 메모"
     ]
   }
   ```

4. **발표자 메모 업데이트**:
   ```bash
   python /Users/glen/Desktop/work/glen-claude-skills/.claude/skills/pptx/update-notes.py presentation.pptx notes.json
   ```

   출력 예시:
   ```
   ✓ 슬라이드 1 메모 업데이트 완료
   ✓ 슬라이드 3 메모 업데이트 완료
   ✓ 슬라이드 5 메모 업데이트 완료

   저장 완료: presentation.pptx
   ```

5. **다른 파일로 저장** (선택사항):
   ```bash
   python /Users/glen/Desktop/work/glen-claude-skills/.claude/skills/pptx/update-notes.py presentation.pptx notes.json updated-presentation.pptx
   ```

### 발표자 메모 작성 팁

- **개행**: `\n`을 사용하여 줄바꿈
- **구조화**: 불릿 포인트(-, •)를 사용하여 핵심 포인트 나열
- **분량**: 슬라이드당 3-5문장 권장 (발표 시간 기준 2-3분 분량)
- **내용**: 슬라이드에 없는 배경 정보, 예시, 강조점 포함

### 스크립트 전체 사용법

```bash
# 도움말
python update-notes.py

# 메모 추출
python update-notes.py extract <pptx_file> [output.json]

# 메모 업데이트
python update-notes.py <pptx_file> <notes.json> [output.pptx]
```

### 주의사항

- python-pptx가 설치된 가상환경을 활성화해야 합니다
- 원본 파일을 덮어쓰기 전에 백업을 권장합니다
- 슬라이드 번호는 1부터 시작합니다 (0-indexed가 아님)

---

## Creating a new PowerPoint presentation **using a template**

To create a presentation that follows an existing template's design, duplicate and re-arrange template slides before replacing placeholder content.

### Workflow

1. **Extract template text AND create visual thumbnail grid**:

   - Extract text: `python -m markitdown template.pptx > template-content.md`
   - Read `template-content.md` completely to understand the template contents
   - Create thumbnail grids: `python scripts/thumbnail.py template.pptx`
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

   - Use the `scripts/rearrange.py` script to create a new presentation with slides in the desired order:
     ```bash
     python scripts/rearrange.py template.pptx working.pptx 0,34,34,50,52
     ```
   - The script handles duplicating repeated slides, deleting unused slides, and reordering automatically
   - Slide indices are 0-based (first slide is 0, second is 1, etc.)
   - The same slide index can appear multiple times to duplicate that slide

5. **Extract ALL text using the `inventory.py` script**:

   - **Run inventory extraction**:
     ```bash
     python scripts/inventory.py working.pptx text-inventory.json
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
   python scripts/replace.py working.pptx replacement-text.json output.pptx
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
python scripts/thumbnail.py template.pptx [output_prefix]
```

**Features**:

- Creates: `thumbnails.jpg` (or `thumbnails-1.jpg`, `thumbnails-2.jpg`, etc. for large decks)
- Default: 5 columns, max 30 slides per grid (5×6)
- Custom prefix: `python scripts/thumbnail.py template.pptx my-grid`
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
python scripts/thumbnail.py presentation.pptx

# Combine options: custom name, columns
python scripts/thumbnail.py template.pptx analysis --cols 4
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

Required dependencies (should already be installed):

- **markitdown**: `pip install "markitdown[pptx]"` (for text extraction from presentations)
- **pptxgenjs**: `npm install -g pptxgenjs` (for creating presentations via html2pptx)
- **playwright**: `npm install -g playwright` (for HTML rendering in html2pptx)
- **react-icons**: `npm install -g react-icons react react-dom` (for icons in SVG format)
- **LibreOffice**: For PDF conversion (required for visual validation step)
  - macOS: `brew install --cask libreoffice`
  - Linux: `sudo apt-get install libreoffice`
- **Poppler**: `sudo apt-get install poppler-utils` (for pdftoppm to convert PDF to images)
- **defusedxml**: `pip install defusedxml` (for secure XML parsing)

---

**Last Updated**: 2026-01-26
