/**
 * V1 Header - 제목 + 부제목 + 구분선
 */

function addHeader(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const {
    title,
    subtitle,
    titleColor = 'slate900',
    subtitleColor = 'slate500',
    showDivider = true
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

  // 구분선
  if (showDivider) {
    const lineY = subtitle ? layout.header.subtitleY + layout.header.subtitleH + 0.1 : layout.header.titleY + layout.header.titleH + 0.1;
    slide.addShape('rect', {
      x: layout.margin.x,
      y: lineY,
      w: layout.width - layout.margin.x * 2,
      h: 0.02,
      fill: { type: 'solid', color: getColor('slate200') }
    });
  }
}

module.exports = { addHeader };
