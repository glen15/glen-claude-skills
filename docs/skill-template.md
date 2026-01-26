# 스킬 템플릿

새로운 스킬을 추가할 때 사용할 표준 템플릿입니다.

---

## 📋 Claude Code 표준 구조

```
.claude/skills/[skill-name]/
├── SKILL.md              ← 필수: 메인 스킬 파일
├── package.json          ← 선택: Node.js 의존성
├── requirements.txt      ← 선택: Python 의존성
├── lib/                  ← 선택: 라이브러리 코드
└── tools/                ← 선택: 유틸리티 도구
```

---

## 📝 파일 템플릿

### 1. SKILL.md (필수)

```markdown
---
name: skill-name
description: "스킬이 하는 일을 한 줄로"
license: Proprietary
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---

# [Skill Name]

한 줄 설명: 이 스킬은 [무엇]을 [어떻게] 합니다.

## Quick Start

### 설치

\`\`\`bash
cd .claude/skills/[skill-name]
npm install       # Node.js 의존성
pip install -r requirements.txt  # Python 의존성 (해당시)
\`\`\`

### 기본 사용법

\`\`\`javascript
const { MainClass } = require('./.claude/skills/[skill-name]/lib');

const instance = new MainClass();
// 사용 예제...
\`\`\`

## 기능

- 기능 1: 설명
- 기능 2: 설명
- 기능 3: 설명

## API Reference

### MainClass

\`\`\`javascript
const instance = new MainClass(options);
\`\`\`

**옵션:**
- `option1` (string): 설명
- `option2` (boolean): 설명

**메서드:**
- `method1(arg)`: 설명
- `method2(arg)`: 설명

## 예제

### 예제 1: 기본 사용

\`\`\`javascript
// 코드 예제
\`\`\`

### 예제 2: 고급 사용

\`\`\`javascript
// 코드 예제
\`\`\`

## 문제 해결

### 문제: [문제 설명]

**해결책:**
\`\`\`bash
[해결 명령]
\`\`\`

---

**버전**: 1.0.0
**마지막 업데이트**: YYYY-MM-DD
```

### 2. package.json (Node.js 스킬)

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "스킬 설명",
  "author": "Glen",
  "license": "Proprietary",
  "main": "lib/index.js",
  "scripts": {
    "test": "node -e \"const {MainClass}=require('./lib'); console.log('OK');\""
  },
  "keywords": [
    "skill",
    "claude-code"
  ],
  "dependencies": {
    "package1": "^1.0.0",
    "package2": "^2.0.0"
  }
}
```

### 3. requirements.txt (Python 도구)

```
# Python 의존성
# 형식: package-name>=version

package1>=1.0.0  # 설명
package2>=2.0.0  # 설명
```

### 4. lib/index.js (메인 진입점)

```javascript
/**
 * [Skill Name] - 스킬 설명
 */

const MainClass = require('./main-class');

module.exports = {
  MainClass
};
```

### 5. lib/main-class.js (메인 클래스)

```javascript
/**
 * MainClass - 주요 기능 클래스
 */
class MainClass {
  constructor(options = {}) {
    this.option1 = options.option1 || 'default';
    this.option2 = options.option2 || false;
  }

  /**
   * 메서드 설명
   * @param {string} arg - 인자 설명
   * @returns {Promise<Object>} 반환값 설명
   */
  async method1(arg) {
    // 구현
  }

  /**
   * 메서드 설명
   * @param {Object} data - 데이터 객체
   */
  method2(data) {
    // 구현
  }
}

module.exports = MainClass;
```

---

## ✅ 스킬 추가 체크리스트

### 1단계: 폴더 생성

```bash
mkdir -p .claude/skills/[skill-name]
cd .claude/skills/[skill-name]
```

### 2단계: 필수 파일 생성

```bash
touch SKILL.md
```

### 3단계: 선택 파일 생성 (필요시)

```bash
# Node.js 스킬
touch package.json
mkdir lib
touch lib/index.js

# Python 도구 포함시
touch requirements.txt
mkdir tools
```

### 4단계: 테스트

```bash
# Node.js 의존성 설치
npm install

# Python 의존성 설치 (해당시)
pip install -r requirements.txt

# 테스트 실행
npm test
```

### 5단계: 검증

- [ ] `SKILL.md` Front Matter 포함
- [ ] 의존성 버전 명시됨
- [ ] 예제 코드 실행 가능
- [ ] 폴더만 복사해도 작동 (self-contained)

---

## 🔄 실제 예시: PPTX 스킬

```
.claude/skills/pptx/
├── SKILL.md              ← 메인 스킬 파일 (886줄)
├── package.json          ← Node.js 의존성
├── lib/                  ← 빌더 API 라이브러리
│   ├── index.js
│   ├── builder.js
│   └── themes/           ← 테마 시스템
│       ├── index.js
│       ├── nxtcloud-v1/
│       └── nxtcloud-v2/
└── tools/                ← Python 편집 도구
    ├── ooxml.md
    ├── requirements.txt
    ├── inventory.py
    ├── replace.py
    ├── rearrange.py
    └── thumbnail.py
```

**사용법:**
```javascript
const { PresentationBuilder } = require('./.claude/skills/pptx/lib');

const builder = new PresentationBuilder('nxtcloud-v1');
builder.addTitleSlide({ title: '제목', subtitle: '부제목' });
await builder.save('output.pptx');
```

---

## 📝 작성 가이드

### SKILL.md 작성 팁

1. **Front Matter**: 필수 메타데이터 포함
2. **Quick Start**: 3단계 이내로 시작 가능하게
3. **예제**: 모두 실행 가능해야 함
4. **API Reference**: 복잡한 스킬은 상세 문서화
5. **문제 해결**: 가장 흔한 3-5가지 문제

### 코드 작성 팁

1. **모듈화**: 기능별로 파일 분리
2. **오류 처리**: 명확한 에러 메시지
3. **주석**: 복잡한 로직에만
4. **테스트**: npm test로 검증 가능하게

---

**마지막 업데이트**: 2026-01-26
