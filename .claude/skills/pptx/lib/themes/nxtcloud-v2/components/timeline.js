/**
 * V2 Timeline Component
 * 수직 방향 타임라인
 */

function addTimeline(slide, pptx, themeModule, options = {}) {
  const { theme, getColor, getPaletteColor } = themeModule;
  const layout = theme.layout;

  const {
    items = [],
    x = layout.margin.x + 0.5,
    y: startY = layout.content.startY,
    lineColor = 'gray300'
  } = options;

  if (items.length === 0) return;

  const itemHeight = 0.9;
  const totalHeight = items.length * itemHeight;

  // 수직선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: x,
    y: startY,
    w: 0.03,
    h: totalHeight - 0.3,
    fill: { type: 'solid', color: getColor(lineColor) }
  });

  items.forEach((item, idx) => {
    const itemY = startY + idx * itemHeight;
    const color = item.color || getPaletteColor(idx);

    // 마커 (원형)
    slide.addShape(pptx.shapes.OVAL, {
      x: x - 0.12,
      y: itemY,
      w: 0.27,
      h: 0.27,
      fill: { type: 'solid', color: color },
      line: { color: getColor('white'), width: 2 }
    });

    // 아이콘 또는 번호
    const markerText = item.icon || String(idx + 1);
    slide.addText(markerText, {
      x: x - 0.12,
      y: itemY,
      w: 0.27,
      h: 0.27,
      align: 'center',
      valign: 'middle',
      fontSize: item.icon ? 12 : 10,
      color: getColor('white'),
      bold: !item.icon
    });

    // 제목
    if (item.title) {
      slide.addText(item.title, {
        x: x + 0.35,
        y: itemY - 0.05,
        w: layout.width - x - layout.margin.x - 0.5,
        h: 0.35,
        fontSize: 14,
        color: getColor('slate800'),
        bold: true
      });
    }

    // 설명
    if (item.desc) {
      slide.addText(item.desc, {
        x: x + 0.35,
        y: itemY + 0.3,
        w: layout.width - x - layout.margin.x - 0.5,
        h: 0.45,
        fontSize: 11,
        color: getColor('slate500')
      });
    }
  });

  return totalHeight;
}

module.exports = { addTimeline };
