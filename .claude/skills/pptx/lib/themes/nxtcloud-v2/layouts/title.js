/**
 * V2 Title Layout - 좌측 정렬, 사이드 액센트 바
 */

const fs = require('fs');

function createTitleSlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const slide = pptx.addSlide();
  slide.background = { color: getColor('navy') };

  // 좌측 액센트 바 (수직)
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0,
    w: 0.15, h: layout.height,
    fill: { type: 'solid', color: getColor('primary') }
  });

  // 상단 장식 라인
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 0.4,
    w: 2, h: 0.04,
    fill: { type: 'solid', color: getColor('primary') }
  });

  // 배지
  if (data.badge) {
    const badgeW = 2.2;
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.6, y: 1.4,
      w: badgeW, h: 0.4,
      fill: { type: 'solid', color: getColor('navy') },
      line: { color: getColor('accent'), width: 1 }
    });

    slide.addText(data.badge, {
      x: 0.6, y: 1.4,
      w: badgeW, h: 0.4,
      align: 'center', valign: 'middle',
      fontSize: 11,
      color: getColor('accent'),
      bold: true
    });
  }

  // 메인 제목 (좌측 정렬)
  if (data.title) {
    slide.addText(data.title, {
      x: 0.6, y: layout.title.mainY,
      w: layout.width - 1.2, h: 0.8,
      valign: 'middle',
      fontSize: theme.typography.display.size,
      color: getColor('white'),
      bold: true
    });
  }

  // 부제목 (좌측 정렬)
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 0.6, y: layout.title.subtitleY,
      w: layout.width - 1.2, h: 0.5,
      valign: 'middle',
      fontSize: theme.typography.h4.size,
      color: getColor('slate400')
    });
  }

  // 하단 구분선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.6, y: 3.6,
    w: 3, h: 0.04,
    fill: { type: 'solid', color: getColor('accent') }
  });

  // 로고
  if (data.logo) {
    const logoPath = typeof data.logo === 'string' ? data.logo : theme.assets?.logo;

    if (logoPath && fs.existsSync(logoPath)) {
      const logoH = data.logoHeight || 0.6;
      const logoRatio = theme.assets?.logoRatio || 1.0;
      const logoW = logoH * logoRatio;

      slide.addImage({
        path: logoPath,
        x: 0.6,
        y: layout.title.companyY - 0.1,
        w: logoW, h: logoH
      });

      if (data.team) {
        slide.addText(data.team, {
          x: 0.6 + logoW + 0.2, y: layout.title.companyY,
          w: 3, h: 0.4,
          valign: 'middle',
          fontSize: 14,
          color: getColor('slate400')
        });
      }
    }
  } else if (data.company) {
    slide.addText(data.company, {
      x: 0.6, y: layout.title.companyY,
      w: layout.width - 1.2, h: 0.35,
      fontSize: 16,
      color: getColor('white')
    });

    if (data.team) {
      slide.addText(data.team, {
        x: 0.6, y: layout.title.teamY,
        w: layout.width - 1.2, h: 0.3,
        fontSize: 14,
        color: getColor('slate500')
      });
    }
  }

  return slide;
}

module.exports = { createTitleSlide };
