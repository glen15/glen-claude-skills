# Best Practices

Glen's Claude Skills의 모든 스킬이 따를 Best Practices입니다.

---

## 📁 폴더 및 파일 구조

### Claude Code 표준 구조

```
.claude/skills/[skill-name]/
├── SKILL.md              ← 필수: 메인 스킬 파일
├── package.json          ← 선택: Node.js 의존성
├── requirements.txt      ← 선택: Python 의존성
├── lib/                  ← 선택: 라이브러리 코드
└── tools/                ← 선택: 유틸리티 도구
```

### 명명 규칙

```
✅ Good
- 폴더명: lowercase, hyphen-separated
  - .claude/skills/pdf/
  - .claude/skills/image-optimizer/

- 파일명: lowercase, hyphen-separated
  - config.js
  - bullet-list.js

- 스크립트 함수: camelCase (JS) 또는 snake_case (Python)
  - validateFile()
  - validate_file()

❌ Bad
- .claude/skills/PDFPro/, skills/ImageOptimizer/
- Config.js, BulletList.js
```

### 필수 파일

모든 스킬은 다음을 포함해야 합니다:

```
.claude/skills/[name]/
└── SKILL.md              ← 유일한 필수 파일
```

### 권장 파일

스킬 복잡도에 따라:

```
.claude/skills/[name]/
├── SKILL.md              # 메인 스킬 정의
├── package.json          # Node.js 의존성 (npm install 용)
├── requirements.txt      # Python 의존성 (pip install 용)
├── lib/                  # 라이브러리 코드
│   ├── index.js          # 메인 진입점
│   └── ...
└── tools/                # 유틸리티 도구
    └── ...
```

---

## 📝 SKILL.md 작성

### Front Matter (필수)

```yaml
---
name: skill-name
description: "스킬 설명"
license: Proprietary
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---
```

### 본문 구조 (권장)

```markdown
# [Skill Name]

한 줄 설명

## Quick Start

설치 + 기본 예제

## 기능

- 기능 1
- 기능 2

## 사용법

상세 사용법...

## API Reference (해당시)

API 문서...
```

**작성 팁:**
1. **간결함**: 스캔하기 쉽게
2. **예제**: 모두 실행 가능해야 함
3. **구조화**: 섹션을 명확히 구분
4. **최신화**: 코드 변경 시 문서도 업데이트

---

## 🔧 의존성 관리

### package.json (Node.js)

```json
{
  "name": "skill-name",
  "version": "1.0.0",
  "description": "스킬 설명",
  "main": "lib/index.js",
  "dependencies": {
    "package": "^1.0.0"
  }
}
```

**설치:**
```bash
cd .claude/skills/[skill-name]
npm install
```

### requirements.txt (Python)

```
# 주석으로 설명
numpy>=1.21.0  # 수학 계산
pandas>=1.3.0  # 데이터 처리
```

**설치:**
```bash
cd .claude/skills/[skill-name]
pip install -r requirements.txt
```

### 버전 명시 원칙

```
✅ Good
package>=1.0.0     # 최소 버전
package>=1.0,<2.0  # 버전 범위
package^1.0.0      # 마이너 업데이트 허용

❌ Bad
package            # 버전 없음
package==1.0.0     # 너무 고정적
package*           # 어떤 버전이든
```

---

## 🐍 Python 코드

### 코드 스타일

**PEP 8 준수:**
```python
✅ Good
def validate_file(filepath: str) -> bool:
    """파일 검증"""
    if not os.path.exists(filepath):
        return False
    return True

❌ Bad
def validateFile(filepath):
    # 파일 검증
    if not os.path.exists(filepath):
        return False
    return True
```

### 오류 처리

```python
✅ Good
try:
    result = process_file(filepath)
except FileNotFoundError:
    print(f"파일을 찾을 수 없습니다: {filepath}")
    sys.exit(1)
except Exception as e:
    print(f"오류: {e}")
    sys.exit(1)

❌ Bad
result = process_file(filepath)  # 오류 처리 없음
```

### 안전한 명령 실행

```python
✅ Good
import subprocess
result = subprocess.run(
    ['soffice', '--headless', '--convert-to', 'pdf', filepath],
    check=True
)

❌ Bad
os.system(f"soffice --headless --convert-to pdf {filepath}")
```

---

## 🔤 JavaScript/Node.js

### 코드 스타일

```javascript
✅ Good
const fs = require('fs');

function validateFile(filepath) {
  if (!fs.existsSync(filepath)) {
    return false;
  }
  return true;
}

❌ Bad
const fs=require("fs");
function validateFile(filepath){
  if (!fs.existsSync(filepath)) {
    return false;
  }
  return true;
}
```

### 오류 처리

```javascript
✅ Good
try {
  const result = await processFile(filepath);
} catch (error) {
  console.error(`오류: ${error.message}`);
  process.exit(1);
}

❌ Bad
const result = await processFile(filepath);  // 오류 처리 없음
```

---

## 🧪 테스트

### 기능 테스트 체크리스트

```
□ SKILL.md의 모든 예제 실행
□ 에러 메시지가 명확한가?
□ 예상치 못한 입력에 대한 처리
□ 다른 스킬과 간섭 없음
```

### 설치 테스트

```
□ npm install 또는 pip install 성공
□ 의존성 충돌 없음
□ 기존 설치 상태에서 재실행 테스트
```

---

## 🔄 버전 관리

### Semantic Versioning

```
MAJOR.MINOR.PATCH
  |       |       |
  |       |       └─ 버그 수정 (1.0.1)
  |       └─────── 기능 추가, 하위호환 (1.1.0)
  └───────────── 주요 변경, 호환 불가 (2.0.0)
```

### 업데이트 전략

```
✅ Good
- 마이너 업데이트: 기존 코드 호환
- 메이저 업데이트: Migration 가이드 제공
- 긴급 보안 패치: 즉시 배포

❌ Bad
- 버전 관리 없음
- 예고 없이 주요 변경
- 하위호환성 무시
```

---

## 🔐 보안

### 입력 검증

```python
✅ Good
def process_file(filepath: str):
    # 입력 검증
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"파일 없음: {filepath}")
    if not filepath.endswith('.pptx'):
        raise ValueError("PowerPoint 파일만 지원됩니다")
    # 처리

❌ Bad
def process_file(filepath: str):
    # 검증 없음
    with open(filepath) as f:
        # ...
```

---

## 🚫 피해야 할 것들

### 문서

```
❌ 오래된 정보
❌ 깨진 링크
❌ 실행 불가능한 코드 예제
❌ 과도하게 기술적인 설명
❌ 마크다운 형식 불일치
```

### 코드

```
❌ 오류 처리 없음
❌ 실패해도 계속 진행
❌ 의존성 버전 명시 없음
```

### 구조

```
❌ 심링크 사용 (self-contained 위반)
❌ 스킬 폴더 외부 의존
❌ SKILL.md 없음
```

---

## 📋 스킬 추가 체크리스트

### 기본 구조
- [ ] `.claude/skills/[skill-name]/` 폴더 생성
- [ ] `SKILL.md` 작성 (Front Matter 포함)

### 자체 포함 (Self-Contained)
- [ ] 모든 필요한 코드가 스킬 폴더 내에 있음
- [ ] 심링크 사용 안 함
- [ ] 폴더만 복사하면 다른 프로젝트에서 작동

### 의존성
- [ ] package.json 또는 requirements.txt 작성
- [ ] 버전 명시됨
- [ ] 설치 테스트 완료

### 문서
- [ ] SKILL.md에 Quick Start 포함
- [ ] 모든 예제 실행 가능
- [ ] 마지막 업데이트 날짜

---

## 💡 참고 자료

- [PEP 8](https://pep8.org/) - Python 스타일 가이드
- [Markdown Guide](https://www.markdownguide.org/) - 마크다운 가이드
- [Semantic Versioning](https://semver.org/) - 버전 관리

---

**마지막 업데이트**: 2026-01-26
