/**
 * 테마 레지스트리
 * 테마 등록 및 조회 관리
 */

const nxtcloudV1 = require('./nxtcloud-v1');
const nxtcloudV2 = require('./nxtcloud-v2');

// 테마 저장소
const themes = new Map();

// 기본 테마 등록
themes.set('nxtcloud-v1', nxtcloudV1);
themes.set('nxtcloud-v2', nxtcloudV2);
themes.set('default', nxtcloudV1);

/**
 * 테마 가져오기
 * @param {string} name - 테마 이름
 * @returns {Object} 테마 객체
 */
function getTheme(name = 'default') {
  const themeModule = themes.get(name);
  if (!themeModule) {
    throw new Error(`Theme '${name}' not found. Available: ${listThemes().join(', ')}`);
  }
  return themeModule;
}

/**
 * 새 테마 등록
 * @param {string} name - 테마 이름
 * @param {Object} themeModule - 테마 모듈 (theme, getColor, etc.)
 */
function registerTheme(name, themeModule) {
  if (!themeModule.theme || !themeModule.getColor) {
    throw new Error('Theme module must export theme and getColor');
  }
  themes.set(name, themeModule);
}

/**
 * 등록된 테마 목록
 * @returns {string[]} 테마 이름 배열
 */
function listThemes() {
  return Array.from(themes.keys()).filter(name => name !== 'default');
}

/**
 * 테마 존재 여부 확인
 * @param {string} name - 테마 이름
 * @returns {boolean}
 */
function hasTheme(name) {
  return themes.has(name);
}

module.exports = {
  getTheme,
  registerTheme,
  listThemes,
  hasTheme
};
