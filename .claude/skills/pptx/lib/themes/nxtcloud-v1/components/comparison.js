/**
 * V1 Comparison - 좌우 박스 스타일
 */

function addComparison(slide, pptx, themeModule, options = {}) {
  const { theme, getColor } = themeModule;

  const {
    left, right,
    y = theme.layout.content.startY,
    height = 2.0
  } = options;

  const boxWidth = 4.4;
  const leftX = theme.layout.margin.x - 0.1;
  const rightX = 5.2;

  if (left) {
    addComparisonBox(slide, pptx, themeModule, {
      x: leftX, y, w: boxWidth, h: height,
      ...left
    });
  }

  if (right) {
    addComparisonBox(slide, pptx, themeModule, {
      x: rightX, y, w: boxWidth, h: height,
      ...right
    });
  }
}

function addComparisonBox(slide, pptx, themeModule, options) {
  const { getColor } = themeModule;

  const {
    x, y, w, h,
    title,
    items, points,
    icon,
    bgColor = 'slate100',
    color // 헤더 바 색상 (v2 호환)
  } = options;

  // 배경색에 따라 텍스트 색상 자동 결정
  const darkBgs = ['navy', 'navyLight', 'primary', 'primaryDark', 'slate800', 'slate900', 'accent'];
  const effectiveBgColor = color || bgColor;
  const isDarkBg = darkBgs.includes(effectiveBgColor);
  const titleColor = isDarkBg ? 'white' : 'slate700';
  const textColor = isDarkBg ? 'slate200' : 'slate500';

  const listItems = items || points || [];
  const padding = 0.2;

  // 배경
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { type: 'solid', color: getColor(effectiveBgColor) }
  });

  // 제목
  const titleText = icon ? `${icon} ${title}` : title;
  slide.addText(titleText, {
    x: x + padding, y: y + 0.1,
    w: w - padding * 2, h: 0.35,
    fontSize: 13,
    color: getColor(titleColor),
    bold: true
  });

  // 항목 리스트
  if (listItems.length > 0) {
    const itemsText = listItems.map(item =>
      `• ${typeof item === 'string' ? item : item.text}`
    ).join('\n');

    slide.addText(itemsText, {
      x: x + padding, y: y + 0.5,
      w: w - padding * 2, h: h - 0.6,
      fontSize: 11,
      color: getColor(textColor),
      lineSpacing: 22
    });
  }
}

module.exports = { addComparison, addComparisonBox };
