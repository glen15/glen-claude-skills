# PPTX 스킬 - 예제 모음

실행 가능한 예제들입니다. 각 예제를 따라하면 스킬을 완전히 이해할 수 있습니다.

---

## 예제 1: 간단한 프레젠테이션 (5분)

### 목표
가장 간단한 프레젠테이션 만들기

### 파일: slides/hello.html

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 960px;
      height: 540px;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1e40af;
      font-family: Arial, sans-serif;
      color: white;
    }
    h1 {
      font-size: 60px;
      margin: 0;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>Hello, PowerPoint!</h1>
</body>
</html>
```

### 파일: build.js

```javascript
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("./html2pptx");

async function main() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";

  await html2pptx("slides/hello.html", pptx);

  await pptx.writeFile("output.pptx");
  console.log("✓ output.pptx 생성 완료");
}

main();
```

### 실행

```bash
NODE_PATH="$(npm root -g)" node build.js
open output.pptx
```

### 결과

- 파란 배경의 슬라이드
- 하얀색 큰 텍스트

---

## 예제 2: 여러 슬라이드와 스타일 (15분)

### 목표
CSS 변수를 사용한 일관된 디자인

### 파일: styles.css

```css
:root {
  --primary: #1e40af;
  --secondary: #7c3aed;
  --accent: #06b6d4;
  --bg-light: #f3f4f6;
  --text-dark: #1f2937;
  --text-light: #ffffff;

  --font-size-h1: 54px;
  --font-size-h2: 36px;
  --font-size-body: 24px;

  --spacing-lg: 48px;
  --spacing-md: 24px;
}

body {
  width: 960px;
  height: 540px;
  margin: 0;
  padding: var(--spacing-lg);
  font-family: Arial, sans-serif;
}

h1 {
  font-size: var(--font-size-h1);
  margin: 0 0 var(--spacing-md) 0;
}

h2 {
  font-size: var(--font-size-h2);
  margin: 0 0 var(--spacing-md) 0;
}

p {
  font-size: var(--font-size-body);
  margin: var(--spacing-md) 0;
  line-height: 1.6;
}

ul {
  font-size: var(--font-size-body);
  line-height: 1.8;
}
```

### 파일: slides/slide1-title.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../styles.css" />
  <style>
    body {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: var(--text-light);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    h1 { color: var(--text-light); }
    p { color: rgba(255, 255, 255, 0.9); }
  </style>
</head>
<body>
  <h1>프레젠테이션 제목</h1>
  <p>2025년 분기별 리포트</p>
</body>
</html>
```

### 파일: slides/slide2-content.html

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../styles.css" />
  <style>
    body {
      background: var(--bg-light);
      color: var(--text-dark);
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    h2 { color: var(--primary); }
    .content { flex: 1; }
  </style>
</head>
<body>
  <h2>주요 성과</h2>
  <div class="content">
    <ul>
      <li>목표 달성률: 125%</li>
      <li>신규 고객 확보: 45명</li>
      <li>만족도: 4.8/5.0</li>
    </ul>
  </div>
</body>
</html>
```

### 파일: build.js

```javascript
const pptxgen = require("pptxgenjs");
const { html2pptx } = require("./html2pptx");

async function main() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";

  // 슬라이드 추가
  await html2pptx("slides/slide1-title.html", pptx);
  await html2pptx("slides/slide2-content.html", pptx);

  await pptx.writeFile("output.pptx");
  console.log("✓ 2개 슬라이드 생성 완료");
}

main();
```

### 실행

```bash
NODE_PATH="$(npm root -g)" node build.js
```

### 결과

- 슬라이드 1: 타이틀 슬라이드 (그래디언트 배경)
- 슬라이드 2: 콘텐츠 슬라이드 (목록)

---

## 예제 3: 기존 PowerPoint 편집

### 목표
existing.pptx 파일의 텍스트 수정

### 단계

```bash
# 1단계: 파일 분석
python scripts/ooxml/scripts/unpack.py existing.pptx unpacked/

# 2단계: XML 파일 확인
cat unpacked/ppt/slides/slide1.xml

# 3단계: 텍스트 수정 (에디터에서)
# unpacked/ppt/slides/slide1.xml의 <a:t> 태그 수정

# 4단계: 검증
python scripts/ooxml/scripts/validate.py unpacked/ --original existing.pptx

# 5단계: 다시 압축
python scripts/ooxml/scripts/pack.py unpacked/ output.pptx
```

### 예: 제목 변경

```xml
<!-- 수정 전 -->
<a:t>Old Title</a:t>

<!-- 수정 후 -->
<a:t>New Title</a:t>
```

---

## 예제 4: 템플릿 기반 생성

### 목표
template.pptx를 기반으로 3개 프레젠테이션 생성

### 단계 1: 템플릿 분석

```bash
python scripts/thumbnail.py template.pptx
python -m markitdown template.pptx > template-content.md
```

### 단계 2: 슬라이드 선택

템플릿이 다음 슬라이드를 가지고 있다고 가정:
- 0: Title
- 1: Content
- 2: Closing

필요한 배열: `0,1,1,2`

```bash
python scripts/rearrange.py template.pptx working.pptx 0,1,1,2
```

### 단계 3: 텍스트 추출

```bash
python scripts/inventory.py working.pptx text-inventory.json
cat text-inventory.json  # 구조 확인
```

### 단계 4: 교체 텍스트 준비 (replacement.json)

```json
{
  "slide-0": {
    "shape-0": {
      "paragraphs": [
        {
          "text": "Project Alpha",
          "bold": true,
          "alignment": "CENTER",
          "font_size": 54
        }
      ]
    },
    "shape-1": {
      "paragraphs": [
        {
          "text": "Final Report 2025"
        }
      ]
    }
  },
  "slide-1": {
    "shape-0": {
      "paragraphs": [
        {
          "text": "Achievements",
          "bold": true
        }
      ]
    },
    "shape-1": {
      "paragraphs": [
        { "text": "Point 1", "bullet": true, "level": 0 },
        { "text": "Point 2", "bullet": true, "level": 0 }
      ]
    }
  },
  "slide-2": {
    "shape-0": {
      "paragraphs": [
        {
          "text": "Thank You",
          "bold": true,
          "alignment": "CENTER"
        }
      ]
    }
  }
}
```

### 단계 5: 적용

```bash
python scripts/replace.py working.pptx replacement.json output.pptx
```

### 결과

완성된 프레젠테이션 (output.pptx)

---

## 예제 5: 대량 생성 (자동화)

### 목표
CSV 데이터를 기반으로 여러 프레젠테이션 생성

### 파일: data.csv

```csv
company,revenue,growth,status
CompanyA,1000,25%,Good
CompanyB,2000,15%,Great
CompanyC,1500,30%,Excellent
```

### 파일: batch-build.js

```javascript
const fs = require('fs');
const csv = require('csv-parse/sync');
const pptxgen = require('pptxgenjs');

// CSV 읽기
const data = csv.parse(fs.readFileSync('data.csv'), {
  columns: true
});

// 각 행마다 프레젠테이션 생성
data.forEach((row, index) => {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";

  // 슬라이드 추가
  pptx.addSlide().addText(row.company, {
    x: 0.5, y: 2, w: 9, h: 1,
    fontSize: 44, bold: true, align: 'center'
  });

  pptx.addSlide().addText(`Revenue: $${row.revenue}M`, {
    x: 0.5, y: 1, w: 9, h: 1,
    fontSize: 32, align: 'center'
  });

  pptx.addSlide().addText(`Growth: ${row.growth}`, {
    x: 0.5, y: 1, w: 9, h: 1,
    fontSize: 32, align: 'center'
  });

  // 저장
  pptx.writeFile(`output_${row.company}.pptx`);
  console.log(`✓ output_${row.company}.pptx 생성 완료`);
});
```

### 실행

```bash
npm install csv-parse
NODE_PATH="$(npm root -g)" node batch-build.js
```

### 결과

- output_CompanyA.pptx
- output_CompanyB.pptx
- output_CompanyC.pptx

---

## 문제 해결 체크리스트

### HTML 슬라이드 문제

- [ ] 폭/높이가 960×540인가?
- [ ] 모든 이미지 경로가 상대 경로인가?
- [ ] CSS가 `<head>`에 로드되었는가?
- [ ] 폰트 크기가 18px 이상인가?

### 빌드 스크립트 문제

- [ ] html2pptx 폴더가 추출되었는가?
- [ ] NODE_PATH가 설정되었는가?
- [ ] 파일 경로가 올바른가?

### XML 편집 문제

- [ ] unpack.py가 작동하는가?
- [ ] validate.py에서 오류가 없는가?
- [ ] XML 문법이 올바른가?

---

## 다음 단계

1. **예제 1 실행**: 간단한 프레젠테이션 만들기
2. **예제 2 실행**: CSS와 스타일 이해
3. **예제 3-5**: 자신의 필요에 맞는 예제 선택

---

**마지막 업데이트**: 2026-01-25
