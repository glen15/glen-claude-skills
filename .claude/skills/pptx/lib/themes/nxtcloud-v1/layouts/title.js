/**
 * V1 Title Layout - 중앙 정렬, 상단 액센트 바
 */

const fs = require('fs');

function createTitleSlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const slide = pptx.addSlide();
  slide.background = { color: getColor('navy') };

  // 상단 액센트 바
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0,
    w: layout.width, h: theme.components.accentBar.topBar,
    fill: { type: 'solid', color: getColor('primary') }
  });

  // 배지
  if (data.badge) {
    const badgeW = 2.6;
    const badgeX = (layout.width - badgeW) / 2;

    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: badgeX, y: 1.8,
      w: badgeW, h: 0.5,
      fill: { type: 'solid', color: getColor('navy') },
      line: { color: getColor('accent'), width: 1 }
    });

    slide.addText(data.badge, {
      x: badgeX, y: 1.8,
      w: badgeW, h: 0.5,
      align: 'center', valign: 'middle',
      fontSize: 12,
      color: getColor('accent'),
      bold: true
    });
  }

  // 메인 제목
  if (data.title) {
    slide.addText(data.title, {
      x: layout.margin.x, y: layout.title.mainY,
      w: layout.width - layout.margin.x * 2, h: 0.9,
      align: 'center', valign: 'middle',
      fontSize: theme.typography.display.size,
      color: getColor('white'),
      bold: true
    });
  }

  // 부제목
  if (data.subtitle) {
    slide.addText(data.subtitle, {
      x: 1, y: layout.title.subtitleY,
      w: layout.width - 2, h: 0.5,
      align: 'center', valign: 'middle',
      fontSize: theme.typography.h4.size,
      color: getColor('slate400')
    });
  }

  // 구분선
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: (layout.width - 1.6) / 2, y: 4.1,
    w: 1.6, h: 0.04,
    fill: { type: 'solid', color: getColor('accent') }
  });

  // 로고
  if (data.logo) {
    const logoPath = typeof data.logo === 'string' ? data.logo : theme.assets?.logo;

    if (logoPath && fs.existsSync(logoPath)) {
      const logoH = data.logoHeight || 0.7;
      const logoRatio = theme.assets?.logoRatio || 1.0;
      const logoW = logoH * logoRatio;

      slide.addImage({
        path: logoPath,
        x: (layout.width - logoW) / 2,
        y: layout.title.companyY - 0.1,
        w: logoW, h: logoH
      });

      if (data.team) {
        slide.addText(data.team, {
          x: layout.margin.x, y: layout.title.companyY + logoH + 0.1,
          w: layout.width - layout.margin.x * 2, h: 0.3,
          align: 'center',
          fontSize: 14,
          color: getColor('slate400')
        });
      }
    }
  } else if (data.company) {
    slide.addText(data.company, {
      x: layout.margin.x, y: layout.title.companyY,
      w: layout.width - layout.margin.x * 2, h: 0.35,
      align: 'center',
      fontSize: 16,
      color: getColor('white')
    });

    if (data.team) {
      slide.addText(data.team, {
        x: layout.margin.x, y: layout.title.teamY,
        w: layout.width - layout.margin.x * 2, h: 0.3,
        align: 'center',
        fontSize: 14,
        color: getColor('slate500')
      });
    }
  }

  return slide;
}

module.exports = { createTitleSlide };
