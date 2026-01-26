/**
 * V2 Header Component
 * 라벨 + 제목 + 부제목 + 구분선 (좌측 정렬)
 */

function addHeader(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;
  const header = layout.header;

  const {
    label,
    title,
    subtitle,
    labelColor = 'primary',
    titleColor = 'slate900',
    subtitleColor = 'slate500',
    showDivider = true
  } = options;

  // 라벨 (선택적)
  if (label) {
    slide.addText(label, {
      x: layout.margin.x,
      y: header.labelY,
      w: layout.width - layout.margin.x * 2,
      h: 0.25,
      fontSize: 11,
      color: getColor(labelColor),
      bold: true
    });
  }

  // 메인 제목
  if (title) {
    const titleY = label ? header.titleY : header.labelY;
    slide.addText(title, {
      x: layout.margin.x,
      y: titleY,
      w: layout.width - layout.margin.x * 2,
      h: 0.5,
      fontSize: theme.typography.h1.size,
      color: getColor(titleColor),
      bold: true
    });
  }

  // 부제목
  if (subtitle) {
    const subtitleY = label ? header.subtitleY : header.subtitleY - 0.2;
    slide.addText(subtitle, {
      x: layout.margin.x,
      y: subtitleY,
      w: layout.width - layout.margin.x * 2,
      h: 0.35,
      fontSize: theme.typography.h5.size,
      color: getColor(subtitleColor)
    });
  }

  // 구분선
  if (showDivider) {
    const lineY = label ? header.lineY : header.lineY - 0.15;
    slide.addShape('rect', {
      x: layout.margin.x,
      y: lineY,
      w: layout.width - layout.margin.x * 2,
      h: 0.02,
      fill: { type: 'solid', color: getColor('gray200') }
    });
  }
}

module.exports = { addHeader };
