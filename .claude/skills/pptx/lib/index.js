/**
 * PPTX Template Library - Main Entry Point
 *
 * 모듈화된 프레젠테이션 생성 라이브러리
 *
 * @example
 * // 방법 1: PresentationBuilder 사용 (권장)
 * const { PresentationBuilder } = require('./lib');
 * const builder = new PresentationBuilder('nxtcloud-v1');
 * builder.setFooter('My Presentation');
 * builder.addTitleSlide({ title: 'Hello World' });
 * await builder.save('output.pptx');
 *
 * @example
 * // 방법 2: 데이터 기반 빌드
 * const { PresentationBuilder } = require('./lib');
 * const builder = new PresentationBuilder();
 * builder.buildFromData([
 *   { type: 'title', title: 'Hello', subtitle: 'World' },
 *   { type: 'section', number: '01', title: 'Introduction' },
 *   { type: 'content', title: 'Details', components: [...] }
 * ]);
 * await builder.save('output.pptx');
 *
 * @example
 * // 방법 3: 테마별 모듈 직접 사용
 * const { themes } = require('./lib');
 * const themeModule = themes.getTheme('nxtcloud-v1');
 * const { layouts, components } = themeModule;
 * // ... 직접 슬라이드 구성
 */

const { PresentationBuilder } = require('./builder');
const themes = require('./themes');

// 편의 함수: 빠른 프레젠테이션 생성
/**
 * 슬라이드 데이터 배열로 프레젠테이션 생성
 * @param {Array} slidesData - 슬라이드 데이터 배열
 * @param {Object} [options] - 옵션
 * @param {string} [options.theme='nxtcloud-v1'] - 테마 이름
 * @param {string} [options.footer] - 기본 푸터 텍스트
 * @param {Object} [options.metadata] - 메타데이터 (title, author 등)
 * @returns {PresentationBuilder}
 */
function createPresentation(slidesData, options = {}) {
  const {
    theme = 'nxtcloud-v1',
    footer = '',
    metadata = {}
  } = options;

  const builder = new PresentationBuilder(theme);

  if (metadata.title || metadata.author) {
    builder.setMetadata(metadata);
  }

  if (footer) {
    builder.setFooter(footer);
  }

  builder.buildFromData(slidesData);

  return builder;
}

module.exports = {
  // 메인 빌더
  PresentationBuilder,

  // 편의 함수
  createPresentation,

  // 테마 레지스트리
  themes
};
