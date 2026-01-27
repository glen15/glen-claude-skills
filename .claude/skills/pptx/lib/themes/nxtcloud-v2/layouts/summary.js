/**
 * V2 Summary Layout - 밝은 배경, 카드 스타일 포인트
 */

const { addFooter } = require('../components/footer');

function createSummarySlide(pptx, themeModule, data = {}) {
  const { theme, getColor, getPaletteColor } = themeModule;
  const layout = theme.layout;

  const bgColor = data.bgColor || 'lightBg';
  const slide = pptx.addSlide();
  slide.background = { color: getColor(bgColor) };

  // 어두운 배경인지 확인 (navy, darkBg, primary 등)
  const darkBgs = ['navy', 'darkBg', 'slate800', 'slate900', 'black', 'primary', 'primaryDark'];
  const isDarkBg = darkBgs.includes(bgColor);
  const textColor = isDarkBg ? 'white' : 'slate800';
  const labelColor = isDarkBg ? 'accent' : 'primary';
  const lineColor = isDarkBg ? 'white' : 'primary';

  // 상단 라벨
  if (data.label) {
    slide.addText(data.label, {
      x: layout.margin.x, y: 0.5,
      w: layout.width - layout.margin.x * 2, h: 0.3,
      fontSize: 12,
      color: getColor(labelColor),
      bold: true
    });
  }

  // 핵심 메시지
  if (data.title) {
    slide.addText(data.title, {
      x: layout.margin.x, y: data.label ? 1.0 : 0.7,
      w: layout.width - layout.margin.x * 2, h: 1.2,
      fontSize: 28,
      color: getColor(textColor),
      bold: true
    });
  }

  // 구분선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: layout.margin.x, y: data.label ? 2.3 : 1.95,
    w: 2.5, h: 0.04,
    fill: { type: 'solid', color: getColor(lineColor) }
  });

  // 요점 목록 (카드 스타일)
  if (data.points && data.points.length > 0) {
    const pointsY = data.label ? 2.6 : 2.25;
    const maxY = layout.footer.y - 0.1;
    const availableHeight = maxY - pointsY;
    const pointCount = data.points.length;

    // 포인트 개수에 따라 카드 높이와 gap 자동 계산
    const totalGap = (pointCount - 1) * 0.1;
    const cardHeight = Math.min(0.7, (availableHeight - totalGap) / pointCount);
    const gap = pointCount > 1 ? (availableHeight - cardHeight * pointCount) / (pointCount - 1) : 0;
    const cardWidth = layout.width - layout.margin.x * 2;

    data.points.forEach((point, idx) => {
      const icon = point.icon || '→';
      const text = point.text;
      const y = pointsY + idx * (cardHeight + gap);
      const color = getPaletteColor(idx);

      // 카드 배경
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: layout.margin.x, y,
        w: cardWidth, h: cardHeight,
        fill: { type: 'solid', color: getColor('white') },
        shadow: {
          type: 'outer',
          blur: 2,
          offset: 1,
          angle: 45,
          color: '000000',
          opacity: 0.06
        },
        line: { color: getColor('gray200'), width: 0.5 }
      });

      // 좌측 컬러 바
      slide.addShape(pptx.shapes.RECTANGLE, {
        x: layout.margin.x, y,
        w: 0.1, h: cardHeight,
        fill: { type: 'solid', color: color }
      });

      // 아이콘
      slide.addText(icon, {
        x: layout.margin.x + 0.25, y,
        w: 0.5, h: cardHeight,
        fontSize: 18,
        valign: 'middle'
      });

      // 텍스트
      slide.addText(text, {
        x: layout.margin.x + 0.75, y,
        w: cardWidth - 1, h: cardHeight,
        fontSize: 14,
        color: getColor('slate700'),
        valign: 'middle'
      });
    });
  }

  if (data.footer) {
    addFooter(slide, themeModule, { text: data.footer, color: isDarkBg ? 'white' : 'slate400' });
  }

  return slide;
}

module.exports = { createSummarySlide };
