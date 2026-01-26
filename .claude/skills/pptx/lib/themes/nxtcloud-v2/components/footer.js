/**
 * V2 Footer Component
 * 우측 하단 워터마크
 */

function addFooter(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const {
    text = '',
    color = 'slate400'
  } = options;

  if (!text) return;

  slide.addText(text, {
    x: layout.margin.x,
    y: layout.footer.y,
    w: layout.width - layout.margin.x * 2,
    h: 0.3,
    align: 'right',
    fontSize: 9,
    color: getColor(color)
  });
}

module.exports = { addFooter };
