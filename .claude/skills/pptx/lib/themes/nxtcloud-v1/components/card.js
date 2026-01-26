/**
 * V1 Card - 상단 액센트 바 + 중앙 정렬
 */

function addCard(slide, pptx, themeModule, options = {}) {
  const { theme, getColor } = themeModule;

  const {
    x = 0.5, y = 1.5, w = 2.2, h = 2.5,
    icon, title, description,
    accentColor = 'primary',
    bgColor = 'white',
    titleColor = 'slate900',
    descColor = 'slate500'
  } = options;

  const padding = theme.layout.card.padding;
  const accentBarH = theme.components.accentBar.height;

  // 카드 배경
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { type: 'solid', color: getColor(bgColor) },
    line: { color: getColor('slate200'), width: 1 },
    rectRadius: theme.layout.card.cornerRadius
  });

  // 상단 액센트 바
  slide.addShape(pptx.shapes.RECTANGLE, {
    x, y, w, h: accentBarH,
    fill: { type: 'solid', color: getColor(accentColor) }
  });

  // 아이콘 (중앙)
  if (icon) {
    slide.addText(icon, {
      x, y: y + 0.2, w, h: 0.6,
      align: 'center',
      fontSize: 28
    });
  }

  // 제목 (중앙)
  if (title) {
    const titleY = icon ? y + 0.8 : y + 0.2;
    slide.addText(title, {
      x: x + padding, y: titleY,
      w: w - padding * 2, h: 0.4,
      align: 'center',
      fontSize: theme.typography.cardTitle.size,
      color: getColor(titleColor),
      bold: true
    });
  }

  // 설명 (중앙)
  if (description) {
    const descY = icon ? y + 1.2 : (title ? y + 0.6 : y + 0.2);
    slide.addText(description, {
      x: x + padding, y: descY,
      w: w - padding * 2, h: h - descY + y - 0.2,
      align: 'center',
      fontSize: theme.typography.cardBody.size,
      color: getColor(descColor)
    });
  }
}

function addCards(slide, pptx, themeModule, options = {}) {
  const { theme, getPaletteColor } = themeModule;

  const items = options.items || [];
  const columns = options.columns || Math.min(items.length, 4);
  const startY = options.startY || theme.layout.content.startY;
  const cardHeight = options.cardHeight || 2.5;

  if (items.length === 0) return;

  const gridConfig = theme.layout.grid[`columns${columns}`] || {
    width: (theme.layout.width - theme.layout.margin.x * 2 - (columns - 1) * 0.2) / columns,
    gap: 0.2
  };

  items.forEach((item, idx) => {
    const col = idx % columns;
    const row = Math.floor(idx / columns);
    const cardX = theme.layout.margin.x + col * (gridConfig.width + gridConfig.gap);
    const cardY = startY + row * (cardHeight + 0.3);
    const accentColor = item.accentColor || getPaletteColor(idx, 'sequence');

    addCard(slide, pptx, themeModule, {
      x: cardX, y: cardY,
      w: gridConfig.width, h: cardHeight,
      icon: item.icon,
      title: item.title,
      description: item.description || item.desc,
      accentColor,
      bgColor: item.bgColor || 'white'
    });
  });
}

module.exports = { addCard, addCards };
