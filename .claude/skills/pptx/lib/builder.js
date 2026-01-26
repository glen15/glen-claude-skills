/**
 * Presentation Builder
 * 선언적 API로 프레젠테이션 생성
 */

const pptxgen = require('pptxgenjs');
const { getTheme } = require('./themes');

/**
 * 프레젠테이션 빌더 클래스
 *
 * @example
 * const builder = new PresentationBuilder('nxtcloud-v1');
 * builder.setMetadata({ title: 'My Presentation', author: 'Glen' });
 * builder.setFooter('My Presentation');
 * builder.addTitleSlide({ title: 'Hello', subtitle: 'World' });
 * builder.addContentSlide({ title: 'Content', components: [...] });
 * await builder.save('output.pptx');
 */
class PresentationBuilder {
  /**
   * @param {string} [themeName='nxtcloud-v1'] - 테마 이름
   */
  constructor(themeName = 'nxtcloud-v1') {
    this.pptx = new pptxgen();
    this.pptx.layout = 'LAYOUT_16x9';

    this.themeModule = getTheme(themeName);
    this.theme = this.themeModule.theme;
    this.layouts = this.themeModule.layouts;
    this.components = this.themeModule.components;

    this.footerText = '';
    this.slides = [];
  }

  /**
   * 프레젠테이션 메타데이터 설정
   * @param {Object} metadata
   * @param {string} [metadata.title] - 제목
   * @param {string} [metadata.author] - 작성자
   * @param {string} [metadata.subject] - 주제
   * @param {string} [metadata.company] - 회사
   * @returns {PresentationBuilder}
   */
  setMetadata(metadata = {}) {
    if (metadata.title) this.pptx.title = metadata.title;
    if (metadata.author) this.pptx.author = metadata.author;
    if (metadata.subject) this.pptx.subject = metadata.subject;
    if (metadata.company) this.pptx.company = metadata.company;
    return this;
  }

  /**
   * 기본 푸터 텍스트 설정
   * @param {string} text - 푸터 텍스트
   * @returns {PresentationBuilder}
   */
  setFooter(text) {
    this.footerText = text;
    return this;
  }

  /**
   * 타이틀 슬라이드 추가
   * @param {Object} data - 슬라이드 데이터
   * @returns {Object} 생성된 슬라이드
   */
  addTitleSlide(data = {}) {
    const slide = this.layouts.createTitleSlide(this.pptx, this.themeModule, data);
    this.slides.push(slide);
    return slide;
  }

  /**
   * 섹션 슬라이드 추가
   * @param {Object} data - 슬라이드 데이터
   * @returns {Object} 생성된 슬라이드
   */
  addSectionSlide(data = {}) {
    const slideData = { ...data, footer: data.footer || this.footerText };
    const slide = this.layouts.createSectionSlide(this.pptx, this.themeModule, slideData);
    this.slides.push(slide);
    return slide;
  }

  /**
   * 콘텐츠 슬라이드 추가
   * @param {Object} data - 슬라이드 데이터
   * @returns {Object} 생성된 슬라이드
   */
  addContentSlide(data = {}) {
    const slideData = { ...data, footer: data.footer || this.footerText };
    const slide = this.layouts.createContentSlide(this.pptx, this.themeModule, slideData);
    this.slides.push(slide);
    return slide;
  }

  /**
   * 요약 슬라이드 추가
   * @param {Object} data - 슬라이드 데이터
   * @returns {Object} 생성된 슬라이드
   */
  addSummarySlide(data = {}) {
    const slideData = { ...data, footer: data.footer || this.footerText };
    const slide = this.layouts.createSummarySlide(this.pptx, this.themeModule, slideData);
    this.slides.push(slide);
    return slide;
  }

  // ========== 컴포넌트 직접 접근 ==========

  /**
   * 슬라이드에 카드 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 카드 옵션
   */
  addCard(slide, options) {
    this.components.addCard(slide, this.pptx, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 카드 그리드 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 카드 그리드 옵션
   */
  addCards(slide, options) {
    this.components.addCards(slide, this.pptx, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 타임라인 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 타임라인 옵션
   */
  addTimeline(slide, options) {
    this.components.addTimeline(slide, this.pptx, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 불릿 리스트 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 불릿 리스트 옵션
   */
  addBulletList(slide, options) {
    this.components.addBulletList(slide, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 비교 박스 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 비교 옵션
   */
  addComparison(slide, options) {
    this.components.addComparison(slide, this.pptx, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 헤더 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 헤더 옵션
   */
  addHeader(slide, options) {
    this.components.addHeader(slide, this.themeModule, options);
    return this;
  }

  /**
   * 슬라이드에 푸터 추가
   * @param {Object} slide - 슬라이드 객체
   * @param {Object} options - 푸터 옵션
   */
  addFooter(slide, options) {
    this.components.addFooter(slide, this.themeModule, options);
    return this;
  }

  // ========== 데이터 기반 빌드 ==========

  /**
   * 슬라이드 배열로 전체 프레젠테이션 생성
   * @param {Array} slidesData - 슬라이드 데이터 배열
   * @returns {PresentationBuilder}
   */
  buildFromData(slidesData = []) {
    slidesData.forEach(data => {
      switch (data.type) {
        case 'title':
          this.addTitleSlide(data);
          break;
        case 'section':
          this.addSectionSlide(data);
          break;
        case 'content':
          this.addContentSlide(data);
          break;
        case 'summary':
          this.addSummarySlide(data);
          break;
        default:
          console.warn(`Unknown slide type: ${data.type}`);
      }
    });
    return this;
  }

  // ========== 저장 ==========

  /**
   * 프레젠테이션 저장
   * @param {string} fileName - 저장할 파일명
   * @returns {Promise<string>} 저장된 파일 경로
   */
  async save(fileName) {
    const filePath = await this.pptx.writeFile({ fileName });
    return filePath;
  }

  /**
   * Base64 문자열로 반환
   * @returns {Promise<string>} Base64 인코딩된 PPTX
   */
  async toBase64() {
    return await this.pptx.write({ outputType: 'base64' });
  }

  /**
   * Buffer로 반환 (Node.js)
   * @returns {Promise<Buffer>}
   */
  async toBuffer() {
    return await this.pptx.write({ outputType: 'nodebuffer' });
  }

  // ========== 유틸리티 ==========

  /**
   * pptxgenjs 인스턴스 직접 접근
   * @returns {Object}
   */
  getPptx() {
    return this.pptx;
  }

  /**
   * 테마 모듈 직접 접근
   * @returns {Object}
   */
  getThemeModule() {
    return this.themeModule;
  }

  /**
   * 색상 조회 (테마 기반)
   * @param {string} colorName - 색상 이름
   * @returns {string} 색상 코드
   */
  getColor(colorName) {
    return this.themeModule.getColor(colorName);
  }

  /**
   * 슬라이드 수 반환
   * @returns {number}
   */
  getSlideCount() {
    return this.slides.length;
  }
}

module.exports = { PresentationBuilder };
