/**
 * V1 Header - 심플 스타일 (라벨/구분선 없음)
 */

function addHeader(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const {
    title,
    subtitle,
    titleColor = 'slate900',
    subtitleColor = 'slate500'
  } = options;

  if (!title) return;

  slide.addText(title, {
    x: layout.margin.x,
    y: layout.header.titleY,
    w: layout.width - layout.margin.x * 2,
    h: layout.header.titleH,
    fontSize: theme.typography.h2.size,
    color: getColor(titleColor),
    bold: true
  });

  if (subtitle) {
    slide.addText(subtitle, {
      x: layout.margin.x,
      y: layout.header.subtitleY,
      w: layout.width - layout.margin.x * 2,
      h: layout.header.subtitleH,
      fontSize: theme.typography.h6.size,
      color: getColor(subtitleColor)
    });
  }
}

module.exports = { addHeader };
