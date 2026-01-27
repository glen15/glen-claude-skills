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

  // 어두운 배경인지 확인
  const darkBgs = ['navy', 'navyLight', 'slate800', 'slate900', 'primary', 'primaryDark'];
  const isDarkBg = darkBgs.includes(bgColor);
  const textColor = isDarkBg ? 'white' : 'slate800';
  const labelColor = isDarkBg ? 'accent' : 'primary';

  // 상단 라벨
  if (data.label) {
    slide.addText(data.label, {
      x: layout.margin.x, y: 0.8,
      w: layout.width - layout.margin.x * 2, h: 0.4,
      align: 'center',
      fontSize: 14,
      color: getColor(labelColor),
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
      color: getColor(textColor),
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
    const maxY = layout.footer.y - 0.1;
    const availableHeight = maxY - pointsY;
    const pointCount = data.points.length;

    // 포인트 개수에 따라 높이와 gap 자동 계산
    const totalGap = (pointCount - 1) * 0.05;
    const itemHeight = Math.min(0.5, (availableHeight - totalGap) / pointCount);
    const gap = pointCount > 1 ? (availableHeight - itemHeight * pointCount) / (pointCount - 1) : 0;

    data.points.forEach((point, idx) => {
      const icon = point.icon || '•';
      const text = point.text;
      const y = pointsY + idx * (itemHeight + gap);

      slide.addText(icon, {
        x: 2.5, y,
        w: 0.5, h: itemHeight,
        fontSize: 18,
        valign: 'middle'
      });

      slide.addText(text, {
        x: 3.0, y,
        w: 4.5, h: itemHeight,
        fontSize: 16,
        color: getColor(isDarkBg ? 'slate300' : 'slate600'),
        valign: 'middle'
      });
    });
  }

  if (data.footer) {
    addFooter(slide, themeModule, { text: data.footer, color: isDarkBg ? 'slate500' : 'slate400' });
  }

  return slide;
}

module.exports = { createSummarySlide };
