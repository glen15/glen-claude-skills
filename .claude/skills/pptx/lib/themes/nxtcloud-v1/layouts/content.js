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

  // 사용 가능한 콘텐츠 영역 계산 (footer 영역 제외)
  const maxY = theme.layout.footer.y - 0.15;
  const availableHeight = maxY - currentY;

  // cards 컴포넌트 개수와 기타 컴포넌트 높이 추정
  const cardsCount = components.filter(c => c.type === 'cards').length;
  const otherComponentsHeight = components.reduce((sum, c) => {
    if (c.type === 'cards') return sum;
    if (c.type === 'box') return sum + (c.h || 1.0) + 0.2;
    if (c.type === 'text') return sum + 0.6;
    if (c.type === 'bullets') return sum + 1.2;
    if (c.type === 'comparison') return sum + (c.height || 2.0) + 0.3;
    if (c.type === 'timeline') return sum + 2.0;
    return sum + 0.5;
  }, 0);

  // cards에 할당 가능한 높이 계산
  const heightForCards = availableHeight - otherComponentsHeight;
  const autoCardHeight = cardsCount > 0 ? Math.max(1.2, (heightForCards - (cardsCount - 1) * 0.3) / cardsCount) : 2.5;

  components.forEach(comp => {
    switch (comp.type) {
      case 'cards':
        const cardH = comp.cardHeight || autoCardHeight;
        addCards(slide, pptx, themeModule, {
          items: comp.items,
          columns: comp.columns,
          startY: comp.y || currentY,
          cardHeight: cardH
        });
        currentY += cardH + 0.3;
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
        const textX = comp.x || theme.layout.margin.x;
        const textW = comp.w || theme.layout.width - theme.layout.margin.x * 2;
        const textFontSize = comp.fontSize || theme.typography.body.size;

        // 텍스트 길이에 따라 높이 자동 계산
        const charsPerLine = Math.floor(textW * 5);
        const estimatedLines = Math.ceil(comp.text.length / charsPerLine);
        const lineHeight = textFontSize / 72 * 1.5;
        const autoHeight = Math.max(0.4, estimatedLines * lineHeight);
        const textH = comp.h || autoHeight;

        slide.addText(comp.text, {
          x: textX,
          y: comp.y || currentY,
          w: textW,
          h: textH,
          fontSize: textFontSize,
          color: getColor(comp.color || 'slate700'),
          valign: 'top'
        });
        currentY += textH + 0.2;
        break;

      case 'box':
        const boxX = comp.x || theme.layout.margin.x;
        const boxW = comp.w || theme.layout.width - theme.layout.margin.x * 2;
        const boxH = comp.h || 1.0;
        const boxBgColor = comp.bgColor || 'slate100';
        const boxTextColor = comp.color || (['accent', 'primary', 'navy', 'slate800', 'slate900'].includes(boxBgColor) ? 'white' : 'slate800');

        // 박스 배경
        slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
          x: boxX, y: currentY,
          w: boxW, h: boxH,
          fill: { type: 'solid', color: getColor(boxBgColor) },
          line: { color: getColor(boxBgColor), width: 0 }
        });

        // 박스 텍스트
        slide.addText(comp.text, {
          x: boxX + 0.2, y: currentY,
          w: boxW - 0.4, h: boxH,
          fontSize: comp.fontSize || 14,
          color: getColor(boxTextColor),
          valign: 'middle',
          align: comp.align || 'left'
        });
        currentY += boxH + 0.2;
        break;
    }
  });
}

module.exports = { createContentSlide, renderComponents };
