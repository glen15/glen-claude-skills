/**
 * V2 Section Layout - 좌측 정렬, 액센트 바
 */

function createSectionSlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;
  const section = layout.section;

  const bgColor = data.bgColor || 'primary';
  const slide = pptx.addSlide();
  slide.background = { color: getColor(bgColor) };

  // 좌측 액센트 바 (수직)
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: section.accentBarX,
    y: section.numberY,
    w: section.accentBarW,
    h: section.accentBarH,
    fill: { type: 'solid', color: getColor('white') }
  });

  // 섹션 번호 (좌측 정렬)
  if (data.number) {
    slide.addText(data.number, {
      x: section.accentBarX + section.accentBarW + 0.3,
      y: section.numberY,
      w: 2, h: 0.5,
      fontSize: theme.typography.h2.size,
      color: getColor('white'),
      bold: true
    });
  }

  // 섹션 제목 (좌측 정렬)
  if (data.title) {
    slide.addText(data.title, {
      x: section.accentBarX + section.accentBarW + 0.3,
      y: section.titleY,
      w: layout.width - section.accentBarX - section.accentBarW - 1,
      h: 0.8,
      fontSize: theme.typography.h1.size,
      color: getColor('white'),
      bold: true
    });
  }

  // 섹션 설명 (좌측 정렬)
  if (data.description || data.subtitle) {
    const desc = data.description || data.subtitle;

    slide.addText(desc, {
      x: section.accentBarX + section.accentBarW + 0.3,
      y: section.descY,
      w: layout.width - section.accentBarX - section.accentBarW - 1,
      h: 0.5,
      fontSize: theme.typography.h5.size,
      color: getColor('white')
    });
  }

  // 우측 하단 장식 패턴
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: layout.width - 2, y: layout.height - 0.5,
    w: 1.5, h: 0.04,
    fill: { type: 'solid', color: getColor('white'), transparency: 60 }
  });

  slide.addShape(pptx.shapes.RECTANGLE, {
    x: layout.width - 1.2, y: layout.height - 0.35,
    w: 0.7, h: 0.04,
    fill: { type: 'solid', color: getColor('white'), transparency: 75 }
  });

  return slide;
}

module.exports = { createSectionSlide };
