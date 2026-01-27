/**
 * V2 Comparison Component
 * 좌우 비교 레이아웃 (카드 스타일)
 */

function addComparison(slide, pptx, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const {
    left = {},
    right = {},
    y: startY = layout.content.startY,
    height = 2.8,
    gap = 0.3
  } = options;

  const boxWidth = (layout.width - layout.margin.x * 2 - gap) / 2;
  const leftX = layout.margin.x;
  const rightX = layout.margin.x + boxWidth + gap;

  // 좌측 박스
  addComparisonBox(slide, pptx, themeModule, {
    x: leftX,
    y: startY,
    w: boxWidth,
    h: height,
    ...left,
    color: left.color || 'primary'
  });

  // 우측 박스
  addComparisonBox(slide, pptx, themeModule, {
    x: rightX,
    y: startY,
    w: boxWidth,
    h: height,
    ...right,
    color: right.color || 'secondary'
  });
}

function addComparisonBox(slide, pptx, themeModule, options = {}) {
  const { getColor } = themeModule;

  const {
    x, y, w, h,
    title,
    items = [],
    points = [],
    color = 'primary'
  } = options;

  const listItems = items.length > 0 ? items : points;
  const padding = 0.2;

  // 카드 배경
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { type: 'solid', color: getColor('white') },
    shadow: {
      type: 'outer',
      blur: 3,
      offset: 1,
      angle: 45,
      color: '000000',
      opacity: 0.08
    },
    line: { color: getColor('gray200'), width: 0.5 }
  });

  // 상단 헤더 바
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x,
    y: y,
    w: w,
    h: 0.5,
    fill: { type: 'solid', color: getColor(color) }
  });

  // 제목 - 헤더 바 색상에 따라 텍스트 색상 결정
  if (title) {
    const lightColors = ['white', 'slate50', 'slate100', 'slate200', 'gray50', 'gray100', 'gray200', 'lightBg'];
    const titleTextColor = lightColors.includes(color) ? 'slate800' : 'white';

    slide.addText(title, {
      x: x + padding,
      y: y + 0.05,
      w: w - padding * 2,
      h: 0.4,
      fontSize: 16,
      color: getColor(titleTextColor),
      bold: true,
      valign: 'middle'
    });
  }

  // 항목 목록
  if (listItems.length > 0) {
    const itemHeight = 0.45;
    const itemStartY = y + 0.6;

    listItems.forEach((item, idx) => {
      const text = typeof item === 'string' ? item : item.text;
      const icon = typeof item === 'string' ? '•' : (item.icon || '•');

      slide.addText(icon, {
        x: x + padding,
        y: itemStartY + idx * itemHeight,
        w: 0.3,
        h: itemHeight,
        fontSize: 14,
        color: getColor(color),
        valign: 'middle'
      });

      slide.addText(text, {
        x: x + padding + 0.3,
        y: itemStartY + idx * itemHeight,
        w: w - padding * 2 - 0.3,
        h: itemHeight,
        fontSize: 12,
        color: getColor('slate700'),
        valign: 'middle'
      });
    });
  }
}

module.exports = { addComparison };
