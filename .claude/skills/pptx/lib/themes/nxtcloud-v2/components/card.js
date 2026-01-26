/**
 * V2 Card Component
 * 좌측 정렬, 원형 아이콘, 배지 지원
 */

function addCard(slide, pptx, themeModule, options = {}) {
  const { theme, getColor, getPaletteColor } = themeModule;

  const {
    x = 0,
    y = 0,
    w = 2.0,
    h = 2.0,
    icon,
    title,
    desc,
    badge,
    accentColor,
    index = 0
  } = options;

  const color = accentColor || getPaletteColor(index);
  const padding = 0.15;

  // 카드 배경 (둥근 모서리)
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { type: 'solid', color: getColor('white') },
    shadow: {
      type: 'outer',
      blur: 4,
      offset: 2,
      angle: 45,
      color: '000000',
      opacity: 0.1
    },
    line: { color: getColor('gray200'), width: 0.5 }
  });

  // 배지 (선택적)
  if (badge) {
    const badgeW = Math.min(badge.length * 0.12 + 0.3, w - 0.3);
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: x + w - badgeW - padding,
      y: y + padding,
      w: badgeW,
      h: 0.28,
      fill: { type: 'solid', color: color }
    });
    slide.addText(badge, {
      x: x + w - badgeW - padding,
      y: y + padding,
      w: badgeW,
      h: 0.28,
      align: 'center',
      valign: 'middle',
      fontSize: 9,
      color: getColor('white'),
      bold: true
    });
  }

  // 아이콘 (원형 배경)
  if (icon) {
    const iconY = badge ? y + 0.5 : y + padding + 0.1;
    const circleSize = 0.55;

    // 원형 배경
    slide.addShape(pptx.shapes.OVAL, {
      x: x + padding,
      y: iconY,
      w: circleSize,
      h: circleSize,
      fill: { type: 'solid', color: color, transparency: 85 },
      line: { color: color, width: 1.5 }
    });

    // 아이콘
    slide.addText(icon, {
      x: x + padding,
      y: iconY,
      w: circleSize,
      h: circleSize,
      align: 'center',
      valign: 'middle',
      fontSize: 20
    });
  }

  // 제목 (좌측 정렬)
  if (title) {
    const titleY = icon ? (badge ? y + 1.15 : y + 0.85) : y + padding;
    slide.addText(title, {
      x: x + padding,
      y: titleY,
      w: w - padding * 2,
      h: 0.35,
      fontSize: 13,
      color: getColor('slate800'),
      bold: true
    });
  }

  // 설명 (좌측 정렬)
  if (desc) {
    const descY = icon ? (badge ? y + 1.45 : y + 1.15) : y + 0.45;
    slide.addText(desc, {
      x: x + padding,
      y: descY,
      w: w - padding * 2,
      h: h - descY + y - padding,
      fontSize: 11,
      color: getColor('slate500'),
      valign: 'top'
    });
  }
}

function addCards(slide, pptx, themeModule, options = {}) {
  const { theme } = themeModule;
  const layout = theme.layout;

  const {
    items = [],
    columns,
    startY = layout.content.startY,
    cardHeight = 2.2,
    gap = 0.2
  } = options;

  if (items.length === 0) return;

  // 컬럼 수 자동 결정
  const cols = columns || Math.min(items.length, 4);
  const availableWidth = layout.width - layout.margin.x * 2;
  const cardWidth = (availableWidth - gap * (cols - 1)) / cols;

  items.forEach((item, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);

    const x = layout.margin.x + col * (cardWidth + gap);
    const y = startY + row * (cardHeight + gap);

    addCard(slide, pptx, themeModule, {
      x, y,
      w: cardWidth,
      h: cardHeight,
      icon: item.icon,
      title: item.title,
      desc: item.desc,
      badge: item.badge,
      accentColor: item.color,
      index: idx
    });
  });
}

module.exports = { addCard, addCards };
