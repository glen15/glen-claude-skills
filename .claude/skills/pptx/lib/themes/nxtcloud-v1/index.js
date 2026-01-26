/**
 * NXT Cloud Theme v1
 * 중앙 정렬, 상단 액센트 바, 컬러풀한 스타일
 */

const { theme, getColor, getTypography, getPaletteColor } = require('./config');

// Components
const { addHeader } = require('./components/header');
const { addFooter } = require('./components/footer');
const { addCard, addCards } = require('./components/card');
const { addTimeline } = require('./components/timeline');
const { addBulletList } = require('./components/bullets');
const { addComparison } = require('./components/comparison');

// Layouts
const { createTitleSlide } = require('./layouts/title');
const { createSectionSlide } = require('./layouts/section');
const { createContentSlide, renderComponents } = require('./layouts/content');
const { createSummarySlide } = require('./layouts/summary');

module.exports = {
  // Config
  theme,
  getColor,
  getTypography,
  getPaletteColor,

  // Components
  components: {
    addHeader,
    addFooter,
    addCard,
    addCards,
    addTimeline,
    addBulletList,
    addComparison
  },

  // Layouts
  layouts: {
    createTitleSlide,
    createSectionSlide,
    createContentSlide,
    createSummarySlide,
    renderComponents
  }
};
