/**
 * V1 Footer
 */

function addFooter(slide, themeModule, options = {}) {
  const { theme, getColor } = themeModule;
  const layout = theme.layout;

  const {
    text,
    color = 'slate400'
  } = options;

  if (!text) return;

  slide.addText(text, {
    x: layout.footer.rightX,
    y: layout.footer.y,
    w: layout.footer.rightW,
    h: layout.footer.height,
    align: 'right',
    fontSize: theme.typography.small.size,
    color: getColor(color)
  });
}

module.exports = { addFooter };
