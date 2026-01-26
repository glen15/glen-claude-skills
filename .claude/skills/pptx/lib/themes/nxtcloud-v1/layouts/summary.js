/**
 * V1 Summary Layout - 다크 배경, 중앙 정렬
 */

const { addFooter } = require('../components/footer');

function createSummarySlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const bgColor = data.bgColor || 'navy';
  const slide = pptx.addSlide();
  slide.background = { color: getColor(bgColor) };

  // 상단 라벨
  if (data.label) {
    slide.addText(data.label, {
      x: layout.margin.x, y: 0.8,
      w: layout.width - layout.margin.x * 2, h: 0.4,
      align: 'center',
      fontSize: 14,
      color: getColor('accent'),
      bold: true
    });
  }

  // 핵심 메시지
  if (data.title) {
    slide.addText(data.title, {
      x: layout.margin.x, y: data.label ? 1.3 : 1.0,
      w: layout.width - layout.margin.x * 2, h: 0.8,
      align: 'center',
      fontSize: 32,
      color: getColor('white'),
      bold: true
    });
  }

  // 구분선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: (layout.width - 2) / 2, y: data.label ? 2.2 : 1.9,
    w: 2, h: 0.04,
    fill: { type: 'solid', color: getColor('accent') }
  });

  // 요점 목록
  if (data.points && data.points.length > 0) {
    const pointsY = data.label ? 2.5 : 2.2;

    data.points.forEach((point, idx) => {
      const icon = point.icon || '•';
      const text = point.text;
      const y = pointsY + idx * 0.5;

      slide.addText(icon, {
        x: 2.5, y,
        w: 0.5, h: 0.45,
        fontSize: 18,
        valign: 'middle'
      });

      slide.addText(text, {
        x: 3.0, y,
        w: 4.5, h: 0.45,
        fontSize: 16,
        color: getColor('slate300'),
        valign: 'middle'
      });
    });
  }

  if (data.footer) {
    addFooter(slide, themeModule, { text: data.footer, color: 'slate500' });
  }

  return slide;
}

module.exports = { createSummarySlide };
