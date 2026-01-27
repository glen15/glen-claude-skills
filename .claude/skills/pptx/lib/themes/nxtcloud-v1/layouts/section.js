/**
 * V1 Section Layout - 중앙 정렬, 컬러 배경
 */

function createSectionSlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;
  const section = layout.section;

  const bgColor = data.bgColor || 'primary';
  const slide = pptx.addSlide();
  slide.background = { color: getColor(bgColor) };

  // 섹션 번호
  // 어두운 배경에서는 밝은 색상 사용
  const darkBgs = ['navy', 'navyLight', 'slate800', 'slate900', 'primary', 'primaryDark'];
  const isDarkBg = darkBgs.includes(bgColor);

  if (data.number) {
    const numberColor = bgColor === 'primary' ? '93c5fd' :
                        isDarkBg ? getColor('slate300') : getColor('slate600');

    slide.addText(data.number, {
      x: layout.margin.x, y: section.numberY,
      w: layout.width - layout.margin.x * 2, h: 0.8,
      align: 'center',
      fontSize: theme.typography.h1.size,
      color: numberColor,
      bold: true
    });
  }

  // 섹션 제목
  if (data.title) {
    slide.addText(data.title, {
      x: layout.margin.x, y: section.titleY,
      w: layout.width - layout.margin.x * 2, h: 0.9,
      align: 'center',
      fontSize: theme.typography.h1.size,
      color: getColor('white'),
      bold: true
    });
  }

  // 섹션 설명
  if (data.description || data.subtitle) {
    const desc = data.description || data.subtitle;
    const subtitleColor = bgColor === 'primary' ? '93c5fd' :
                          isDarkBg ? getColor('slate300') : getColor('slate500');

    slide.addText(desc, {
      x: layout.margin.x, y: section.descY,
      w: layout.width - layout.margin.x * 2, h: 0.5,
      align: 'center',
      fontSize: theme.typography.h5.size,
      color: subtitleColor
    });
  }

  // 구분선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: (layout.width - 2) / 2, y: section.lineY,
    w: 2, h: 0.04,
    fill: { type: 'solid', color: getColor('white') }
  });

  return slide;
}

module.exports = { createSectionSlide };
