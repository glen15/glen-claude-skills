# Global CSS Framework Reference

HTML 슬라이드 생성을 위한 글로벌 CSS 프레임워크 레퍼런스입니다. html2pptx 라이브러리와 함께 사용합니다.

---

## Overview

이 프레임워크는 PowerPoint로 깔끔하게 변환되는 HTML 슬라이드를 만들기 위해 특별히 설계되었습니다:

- **고정 슬라이드 치수** (960×540px, 16:9 비율)
- **일관된 디자인 시스템**: 미리 정의된 색상, 타이포그래피, 간격
- **Flexbox 기반 레이아웃 시스템**: 반응형 슬라이드 콘텐츠
- **유틸리티 우선 접근**: 빠른 슬라이드 개발
- **전문적 스타일링**: 비즈니스 프레젠테이션에 최적화

---

## No Import Necessary

글로벌 CSS 프레임워크는 모든 슬라이드에 자동으로 추가됩니다. `<style>` 또는 `<link>` 태그로 포함하지 마세요.

---

## Design System Variables

**IMPORTANT**: 프레젠테이션의 공유 CSS 파일을 만들 때 CSS 변수만 오버라이드하세요 (`:root` 셀렉터 사용). 커스텀 클래스를 만들지 마세요 - 이 프레임워크에서 제공하는 유틸리티 클래스를 사용하세요.

### Typography Variables

```css
/* Headings */
--font-family-display: Arial, sans-serif;
--font-weight-display: 600;

/* Body text */
--font-family-content: Arial, sans-serif;
--font-weight-content: 400;
--font-size-content: 16px;
--line-height-content: 1.4;
```

### Color Palette

#### Surface Colors

- `--color-surface`: `#ffffff` - 기본 배경
- `--color-surface-foreground`: `#1d1d1d` - 기본 배경의 텍스트

#### Primary Colors

- `--color-primary`: `#1791e8` - 주요 액션/악센트
- `--color-primary-light`: 밝아진 primary (10% 화이트 믹스)
- `--color-primary-dark`: 어두워진 primary (10% 블랙 믹스)
- `--color-primary-foreground`: `#fafafa` - primary 배경의 텍스트

#### Secondary Colors

- `--color-secondary`: `#f5f5f5` - 보조 액션
- `--color-secondary-foreground`: `#171717` - secondary 배경의 텍스트

#### Utility Colors

- `--color-muted`: `#f5f5f5` - 미묘한 배경
- `--color-muted-foreground`: `#737373` - 뮤트된 텍스트
- `--color-accent`: `#f5f5f5` - 악센트 요소
- `--color-accent-foreground`: `#171717` - accent 배경의 텍스트
- `--color-border`: `#c8c8c8` - 테두리 요소

### Color Utility Classes

**Background:** `.bg-surface`, `.bg-primary`, `.bg-secondary`, `.bg-muted`, `.bg-accent`, `.bg-border`

**Text:** `.text-surface-foreground`, `.text-primary`, `.text-muted-foreground`, etc.

*`*-light`와 `*-dark`를 제외한 위에 정의된 색상 변수 사용*

### Spacing & Layout

- `--spacing`: `0.25rem` - 기본 간격 단위
- `--gap`: `calc(var(--spacing) * 4)` - 표준 갭 (1rem)
- `--radius`: `0.4rem` - 표준 테두리 반경
- `--radius-pill`: `999em` - 알약 모양 테두리 반경

---

## Slide Structure

### Fixed Dimensions

```css
body {
  width: 960px;
  height: 540px;
  overflow: hidden; /* 콘텐츠 오버플로우 방지 */
}
```

---

## Layout System

### Container Classes

#### `.row` - 수평 레이아웃

- `flex-direction: row`
- `align-items: center`
- `justify-content: stretch`
- `.fill-width` 클래스가 있는 자식은 가용 너비를 채움
- `.fill-height` 클래스가 있는 자식은 가용 높이로 늘어남

#### `.col` - 수직 레이아웃

- `flex-direction: column`
- `align-items: stretch`
- `justify-content: center`
- `.fill-height` 클래스가 있는 자식은 가용 높이를 채움
- `.fill-width` 클래스가 있는 자식은 가용 너비로 늘어남

### Flex Item Behavior

#### `.fill-width` and `.fill-height` - 확장 가능한 요소

- `.fill-width`: row 컨테이너에서 `flex: 1` (가용 너비를 채움)
- `.fill-height`: column 컨테이너에서 `flex: 1` (가용 높이를 채움)
- 교차축 변형은 `align-self: stretch`도 적용
- flex 컨테이너 내에서 확장해야 하는 요소에 **필수**
- 주요 콘텐츠 영역에 사용

#### `.items-fill-width` and `.items-fill-height` - 자동 확장 자식

- `.items-fill-width`: 모든 직접 자식을 수평으로 확장 가능하게 (`flex: 1`)
- `.items-fill-height`: 모든 직접 자식을 수직으로 확장 가능하게 (`flex: 1`)
- 교차축 변형은 자식에 `align-self: stretch`도 적용
- 각 자식에 `.fill-width`/`.fill-height` 클래스 추가하는 편리한 대안
- 모든 자식이 동등하게 확장되어야 할 때 사용

#### `.fit`, `.fit-width`, and `.fit-height` - 고정 크기 요소

- `flex: none` (자연 크기 유지)
- `align-self: auto` (부모의 align-items 값 사용)
- `.fill-width`/`.fill-height` 클래스 없는 요소의 **기본 동작**
- `.fit-width`: row 컨테이너용 축별 (수평 확장 방지)
- `.fit-height`: column 컨테이너용 축별 (수직 확장 방지)
- `.items-fill-width`/`.items-fill-height` 컨테이너 내 고정 크기 요소에 사용

#### `.center` - 콘텐츠 중앙 정렬

- 콘텐츠를 수평 및 수직으로 중앙 정렬

### Example Layout Structure

```html
<body class="col">
  <header>Fixed header</header>
  <main class="fill-height row">
    <aside>Sidebar</aside>
    <section class="fill-width">Main content</section>
  </main>
  <footer>Fixed footer</footer>
</body>
```

---

## Typography Scale

### Text Sizes

| Class | Size | Pixels |
|-------|------|--------|
| `.text-xs` | 0.75rem | 12px |
| `.text-sm` | 0.875rem | 14px |
| `.text-base` | 1rem | 16px |
| `.text-lg` | 1.125rem | 18px |
| `.text-xl` | 1.25rem | 20px |
| `.text-2xl` | 1.5rem | 24px |
| `.text-3xl` | 1.875rem | 30px |
| `.text-4xl` | 2.25rem | 36px |
| `.text-5xl` | 3rem | 48px |
| `.text-6xl` | 3.75rem | 60px |
| `.text-7xl` | 4.5rem | 72px |
| `.text-8xl` | 6rem | 96px |

---

## Utility Classes

### Alignment Classes

| Type | Classes |
|------|---------|
| **text-align** | `.text-left`, `.text-right`, `.text-center` |
| **align-items** | `.items-start`, `.items-center`, `.items-baseline`, `.items-stretch`, `.items-end` |
| **align-self** | `.self-start`, `.self-center`, `.self-end` |
| **justify-content** | `.justify-start`, `.justify-center`, `.justify-end` |

### Spacing

#### Gap Classes

| Class | Description |
|-------|-------------|
| `.gap-sm` | 표준 갭의 절반 |
| `.gap` | 표준 갭 (1rem) |
| `.gap-lg` | 표준 갭의 2배 |
| `.gap-xl` | 표준 갭의 3배 |
| `.gap-2xl` | 표준 갭의 4배 |

#### Spacing Classes (Padding & Margin)

**Scale**: `0` (0), `1` (0.25rem), `2` (0.5rem), `4` (1rem), `6` (1.5rem), `8` (2rem), `10` (2.5rem), `12` (3rem), `16` (4rem)

**Padding**: `.p-*` (all), `.px-*` (horizontal), `.py-*` (vertical), `.pt-*` (top), `.pb-*` (bottom), `.ps-*` (start), `.pe-*` (end)

**Margin**: `.m-*` (all), `.mx-*` (horizontal), `.my-*` (vertical), `.mt-*` (top), `.mb-*` (bottom), `.ms-*` (start), `.me-*` (end)

### Visual Utilities

#### Opacity

- `.opacity-0` ~ `.opacity-100` (10 단위)

#### Border Radius

- `.rounded`: 표준 테두리 반경
- `.pill`: 알약 모양 (완전히 둥근)

#### Width/Height Classes

- `.w-full`, `.h-full` - 전체 너비/높이
- `.w-1/2` ~ `.w-5/6`, `.h-1/2` ~ `.h-5/6` - 분수 크기 (halves, thirds, fourths, sixths 가능)

#### Aspect Ratio Classes

| Type | Classes |
|------|---------|
| **Auto** | `.aspect-auto` (브라우저 기본) |
| **Square** | `.aspect-1/1` |
| **Landscape** | `.aspect-4/3`, `.aspect-3/2`, `.aspect-16/9`, `.aspect-21/9` |
| **Portrait** | `.aspect-2/3`, `.aspect-3/4`, `.aspect-9/16` |

---

## Components

### Badge Component

```html
<p><span class="badge">Status</span></p>
```

### Placeholder Component

```html
<div class="placeholder">Chart Area</div>
```

**Styling**:
- 기본 `aspect-ratio: 4 / 3;` 사용
- `width`, `height` 또는 `aspect-ratio` 속성 설정으로 커스터마이즈
- 가용 컨테이너 공간을 채우도록 자동 확장
- 개발 중 시각적 표시 제공
- 차트나 다른 콘텐츠로 채워질 예약 영역에 사용

---

## Usage Examples

### Title Slide

```html
<body class="col center">
  <h1>Presentation Title</h1>
  <h2 class="text-2xl opacity-70">Subtitle</h2>
  <p class="text-sm opacity-50">Author Name • Date</p>
</body>
```

### Content Slide with Sidebar

```html
<body class="col">
  <header>
    <h2 class="text-primary">Slide Title</h2>
  </header>
  <main class="fill-height row gap-lg">
    <section class="fill-width">
      <p>Main content goes here...</p>
    </section>
    <aside class="bg-muted p-4 rounded" style="min-width: 200px;">
      <div class="badge bg-primary text-primary-foreground">Important</div>
      <p class="text-sm text-muted-foreground">Sidebar content</p>
    </aside>
  </main>
</body>
```

### Two-Column Layout

```html
<body class="col">
  <h2 class="fit text-center">Comparison</h2>
  <div class="fill-height row gap-lg items-fill-width">
    <section>
      <h3>Option A</h3>
      <p>Content for option A...</p>
    </section>
    <section>
      <h3>Option B</h3>
      <p>Content for option B...</p>
    </section>
  </div>
</body>
```

### Centered Content with List

```html
<body class="col center">
  <h2>Key Points</h2>
  <ul>
    <li>First important point</li>
    <li>Second important point</li>
    <li>Third important point</li>
  </ul>
</body>
```

---

## Best Practices

### Layout Structure

1. **body 클래스로 시작**: 수직 레이아웃에 `.col`, 수평 레이아웃에 `.row`, 중앙 콘텐츠에 `.center` 추가
2. **`.fill-width`/`.fill-height` 및 `.fit` 적용**: 어떤 요소가 확장하고 어떤 요소가 고정 크기를 유지할지 제어
3. **계층 유지**: 적절한 헤딩 레벨 사용 (h1-h6)

### Spacing and Visual Hierarchy

1. **일관된 갭**: flex 항목 사이에 마진 대신 갭 클래스 사용
2. **호흡 공간을 위한 패딩**: 개별 요소가 아닌 컨테이너에 패딩 클래스 적용
3. **선택적 마진**: flex 컨테이너 외부의 특정 조정에만 마진 클래스를 아껴서 사용
4. **방향성 간격**: 비대칭 간격이 필요할 때만 방향성 클래스 (px, py, mx, my) 사용
5. **타이포그래피 스케일**: 일관된 폰트 크기를 위해 유틸리티 클래스 사용
6. **색상 사용**: 전문적 외관을 위해 정의된 색상 팔레트 고수

### Responsive Considerations

1. **고정 치수**: 콘텐츠는 960×540px 내에 맞아야 함
2. **오버플로우 방지**: 콘텐츠가 너무 커지지 않도록 `.fit` 클래스 사용
3. **텍스트 스케일링**: 가독성을 위해 적절한 텍스트 크기 클래스 사용
4. **여백**: 단일 슬라이드에 너무 많은 콘텐츠를 넣지 마세요

### Performance Tips

1. **최소한의 커스텀 CSS**: 커스텀 스타일 작성 대신 유틸리티 클래스 활용
2. **일관된 구조**: 슬라이드 전체에서 유사한 레이아웃 패턴 사용
3. **시맨틱 HTML**: PowerPoint로의 더 나은 변환을 위해 적절한 HTML 요소 사용

---

**Last Updated**: 2026-01-29
