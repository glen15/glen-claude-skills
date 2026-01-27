/**
 * V1 Bullets - 카드 스타일 (배경 박스 + 컬러 바)
 */

function addBulletList(slide, themeModule, options = {}) {
  const { theme, getColor, getPaletteColor } = themeModule;

  const {
    items = [],
    x = theme.layout.margin.x,
    y: startY = theme.layout.content.startY,
    w = theme.layout.width - theme.layout.margin.x * 2,
    gap = 0.15
  } = options;

  if (items.length === 0) return 0;

  const itemHeight = 0.6;
  let currentY = startY;

  items.forEach((item, idx) => {
    const text = typeof item === 'string' ? item : item.text;
    const icon = typeof item === 'string' ? '•' : (item.icon || '•');
    const color = getPaletteColor(idx);

    // 배경 박스
    slide.addShape('roundRect', {
      x,
      y: currentY,
      w,
      h: itemHeight,
      fill: { type: 'solid', color: getColor('slate100') },
      line: { color: getColor('slate200'), width: 0.5 }
    });

    // 좌측 컬러 바
    slide.addShape('rect', {
      x,
      y: currentY,
      w: 0.08,
      h: itemHeight,
      fill: { type: 'solid', color: color }
    });

    // 아이콘
    slide.addText(icon, {
      x: x + 0.2,
      y: currentY,
      w: 0.4,
      h: itemHeight,
      fontSize: 16,
      color: getColor('primary'),
      valign: 'middle'
    });

    // 텍스트
    slide.addText(text, {
      x: x + 0.55,
      y: currentY,
      w: w - 0.75,
      h: itemHeight,
      fontSize: 14,
      color: getColor('slate700'),
      valign: 'middle'
    });

    currentY += itemHeight + gap;
  });

  return currentY - startY;
}

module.exports = { addBulletList };
