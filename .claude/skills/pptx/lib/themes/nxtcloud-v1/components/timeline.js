/**
 * V1 Timeline - 수평 방향
 */

function addTimeline(slide, pptx, themeModule, options = {}) {
  const { theme, getColor, getPaletteColor } = themeModule;

  const {
    items = [],
    y = 1.4,
    lineY = 2.8,
    boxHeight = 1.1
  } = options;

  if (items.length === 0) return;

  const startX = theme.layout.margin.x;
  const totalWidth = theme.layout.width - theme.layout.margin.x * 2;
  const spacing = totalWidth / items.length;

  // 기준선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: startX, y: lineY,
    w: totalWidth, h: 0.06,
    fill: { type: 'solid', color: getColor('slate200') }
  });

  items.forEach((item, idx) => {
    const itemX = startX + idx * spacing;
    const markerX = itemX + spacing / 2 - 0.175;
    const color = item.color ? getColor(item.color) : getPaletteColor(idx, 'sequence');

    // 원형 마커
    slide.addShape(pptx.shapes.OVAL, {
      x: markerX, y: lineY - 0.15,
      w: 0.35, h: 0.35,
      fill: { type: 'solid', color: color }
    });

    // 콘텐츠 박스
    const boxWidth = spacing - 0.2;
    const boxColor = item.bgColor ? getColor(item.bgColor) : getPaletteColor(idx, 'backgrounds');

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: itemX, y: y,
      w: boxWidth, h: boxHeight,
      fill: { type: 'solid', color: boxColor }
    });

    // 제목
    const titleText = item.icon ? `${item.icon} ${item.title}` : item.title;
    slide.addText(titleText, {
      x: itemX + 0.1, y: y + 0.1,
      w: boxWidth - 0.2, h: 0.35,
      fontSize: 12,
      color: getColor('slate700'),
      bold: true
    });

    // 설명
    if (item.description) {
      slide.addText(item.description, {
        x: itemX + 0.1, y: y + 0.45,
        w: boxWidth - 0.2, h: boxHeight - 0.55,
        fontSize: 9,
        color: getColor('slate500')
      });
    }
  });
}

module.exports = { addTimeline };
