/**
 * V1 Content Layout
 */

const { addHeader } = require('../components/header');
const { addFooter } = require('../components/footer');
const { addCards } = require('../components/card');
const { addBulletList } = require('../components/bullets');
const { addTimeline } = require('../components/timeline');
const { addComparison } = require('../components/comparison');

function createContentSlide(pptx, themeModule, data = {}) {
  const { theme, getColor } = themeModule;

  const bgColor = data.bgColor || 'white';
  const slide = pptx.addSlide();
  slide.background = { color: getColor(bgColor) };

  // 헤더
  addHeader(slide, themeModule, {
    title: data.title,
    subtitle: data.subtitle,
    titleColor: bgColor === 'white' ? 'slate900' : 'white',
    subtitleColor: bgColor === 'white' ? 'slate500' : 'slate400'
  });

  // 컴포넌트 렌더링
  if (data.components && data.components.length > 0) {
    renderComponents(slide, pptx, themeModule, data.components);
  }

  // 푸터
  if (data.footer) {
    addFooter(slide, themeModule, {
      text: data.footer,
      color: bgColor === 'white' ? 'slate400' : 'slate500'
    });
  }

  return slide;
}

function renderComponents(slide, pptx, themeModule, components) {
  const { theme, getColor } = themeModule;
  let currentY = theme.layout.content.startY;

  components.forEach(comp => {
    switch (comp.type) {
      case 'cards':
        addCards(slide, pptx, themeModule, {
          items: comp.items,
          columns: comp.columns,
          startY: comp.y || currentY,
          cardHeight: comp.cardHeight
        });
        currentY += (comp.cardHeight || 2.5) + 0.3;
        break;

      case 'bullets':
      case 'bullet-list':
        const height = addBulletList(slide, themeModule, {
          items: comp.items,
          x: comp.x,
          y: comp.y || currentY,
          w: comp.w
        });
        currentY += height + 0.3;
        break;

      case 'timeline':
        addTimeline(slide, pptx, themeModule, {
          items: comp.items,
          y: comp.y || currentY
        });
        currentY += 2.0;
        break;

      case 'comparison':
        addComparison(slide, pptx, themeModule, {
          left: comp.left,
          right: comp.right,
          y: comp.y || currentY,
          height: comp.height
        });
        currentY += (comp.height || 2.0) + 0.3;
        break;

      case 'text':
        slide.addText(comp.text, {
          x: comp.x || theme.layout.margin.x,
          y: comp.y || currentY,
          w: comp.w || theme.layout.width - theme.layout.margin.x * 2,
          h: comp.h || 0.5,
          fontSize: comp.fontSize || theme.typography.body.size,
          color: getColor(comp.color || 'slate700')
        });
        currentY += (comp.h || 0.5) + 0.2;
        break;
    }
  });
}

module.exports = { createContentSlide, renderComponents };
