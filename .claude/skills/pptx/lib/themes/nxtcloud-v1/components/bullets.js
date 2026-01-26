/**
 * V1 Bullets - 심플 스타일 (아이콘 + 텍스트)
 */

function addBulletList(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;

  const {
    items = [],
    x = theme.layout.margin.x,
    y = theme.layout.content.startY,
    w = theme.layout.width - theme.layout.margin.x * 2,
    color = 'slate700',
    fontSize = theme.typography.body.size,
    lineHeight = 0.45,
    defaultIcon = '•'
  } = options;

  items.forEach((item, idx) => {
    const currentY = y + idx * lineHeight;
    const itemData = typeof item === 'string'
      ? { text: item, icon: defaultIcon }
      : item;

    const icon = itemData.icon || defaultIcon;
    const text = itemData.text;

    slide.addText(icon, {
      x, y: currentY,
      w: 0.4, h: lineHeight,
      fontSize,
      color: getColor(color),
      valign: 'middle'
    });

    slide.addText(text, {
      x: x + 0.4, y: currentY,
      w: w - 0.4, h: lineHeight,
      fontSize,
      color: getColor(color),
      valign: 'middle'
    });
  });

  return items.length * lineHeight;
}

module.exports = { addBulletList };
