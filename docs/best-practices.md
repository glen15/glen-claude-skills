# Best Practices

Glen's Claude Skills의 모든 스킬이 따를 Best Practices입니다.

---

## 📁 폴더 및 파일 구조

### 명명 규칙

```
✅ Good
- 폴더명: lowercase, hyphen-separated
  - skills/pdf-pro/
  - skills/image-optimizer/

- 파일명: lowercase, hyphen-separated
  - install-mac.sh
  - config-template.json

- 스크립트 함수: lowercase_with_underscores
  - install_dependencies()
  - validate_installation()

❌ Bad
- skills/PDFPro/, skills/ImageOptimizer/
- install_MAC.sh, ConfigTemplate.json
- installDependencies()
```

### 필수 파일

모든 스킬은 다음을 포함해야 합니다:

```
skills/[name]/
├── README.md              ← 필수
├── INSTALL.md             ← 필수
├── install-mac.sh         ← 필수
├── install-linux.sh       ← 필수
├── requirements.txt       ← 선택 (Python 필요시)
└── package.json          ← 선택 (Node.js 필요시)
```

### 선택적 파일

프로젝트에 따라:

```
skills/[name]/
├── CHANGELOG.md           # 버전 변경사항
├── VERSION                # 버전 파일
├── .gitignore            # Git 무시 목록
├── tools/                # 도구 폴더
├── templates/            # 템플릿 폴더
└── examples/             # 예제 폴더
```

---

## 📝 문서 작성

### README.md

**구조:**
```
제목
한 줄 설명

## 🎯 기능
- 기능 1
- 기능 2

## 🚀 빠른 시작
설치 + 기본 예제

## 📚 상세 가이드
문서 링크

## 의존성
필요한 것들

## 문제 해결
3-5가지 흔한 문제
```

**작성 팁:**
1. **깔끔함**: 스캔하기 쉽게
2. **예제**: 모두 실행 가능해야 함
3. **링크**: 모두 정상 작동해야 함
4. **길이**: 화면 한두 개 정도
5. **마크다운**: 일관된 형식

### INSTALL.md

**구조:**
```
자동 설치 (macOS)
자동 설치 (Linux)
수동 설치 (단계별)
설치 확인
문제 해결
```

**작성 팁:**
1. **명확함**: 각 단계가 명확해야 함
2. **완전함**: 0부터 끝까지
3. **문제 해결**: 최소 3가지 공통 문제
4. **코드 블록**: bash, python, json 등 형식 명시

---

## 🔧 설치 스크립트

### 공통 구조

```bash
#!/bin/bash
set -e

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 진행 상황 표시
echo -e "${BLUE}1️⃣  설명${NC}"
# 작업 수행
echo -e "${GREEN}✓ 완료${NC}"

# 최종 확인
echo -e "${GREEN}✨ 설치 완료!${NC}"
```

### install-mac.sh

**필수:**
- ✅ `#!/bin/bash` 셔뱅
- ✅ `set -e` (오류 시 중단)
- ✅ 색상 코드 (시각적 표시)
- ✅ 진행 상황 (1️⃣, 2️⃣ 등)
- ✅ 최종 확인 (설치 검증)
- ✅ 도움말 (다음 단계)

**선택사항:**
- 버전 확인
- 기존 설치 감지
- 업그레이드 옵션

### install-linux.sh

**macOS와의 차이점:**
- `sudo` 권한 확인
- `apt-get` 또는 `yum` 사용
- 시스템 도구 설치

```bash
# Root 권한 확인
if [[ $EUID -ne 0 ]]; then
   echo "관리자 권한이 필요합니다"
   exit 1
fi
```

### 공통 패턴

**의존성 확인:**
```bash
if ! command -v tool &> /dev/null; then
    # 설치
fi
```

**진행 상황 표시:**
```bash
echo -e "${BLUE}1️⃣  설명${NC}"
# 작업
echo -e "${GREEN}✓ 완료${NC}\n"
```

**최종 검증:**
```bash
echo -n "Package: "
python -c "import package; print(package.__version__)" && \
  echo -e "${GREEN}✓${NC}" || echo -e "❌"
```

---

## 🐍 Python 스크립트

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

### 로깅

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("작업 시작")
logger.warning("경고")
logger.error("오류")
```

---

## 🔤 JavaScript/Node.js

### 코드 스타일

**일관된 형식:**
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

## 📦 의존성 관리

### requirements.txt

```
✅ Good
# 주석으로 설명
numpy>=1.21.0  # 수학 계산
pandas>=1.3.0  # 데이터 처리

# 혹은 버전 범위
package>=1.0,<2.0

❌ Bad
numpy
pandas  # 버전 명시 없음

numpy==1.21.0  # 너무 고정적
```

### package.json

```json
✅ Good
"globalDependencies": {
  "pptxgenjs": "^3.0.0",  // 마이너 버전까지 자동 업데이트
  "playwright": "^1.40.0"
}

❌ Bad
"globalDependencies": {
  "pptxgenjs": "3.0.0",   // 버전 명시 없음
  "playwright": "*"        // 어떤 버전이든
}
```

---

## 🧪 테스트

### 설치 테스트 체크리스트

```
□ macOS에서 전체 설치 테스트
□ Linux에서 전체 설치 테스트
□ 기존 설치 상태에서 재실행 테스트
□ 의존성 업데이트 테스트 (pip install --upgrade)
□ 시간 여유 충분할 때 (느린 설치도 포함)
```

### 기능 테스트

```
□ README의 모든 예제 실행
□ 에러 메시지가 명확한가?
□ 예상치 못한 입력에 대한 처리
□ 다른 스킬과 간섭 없음
```

---

## 🎨 사용자 경험 (UX)

### 설치 스크립트 UX

**좋은 예:**
```
🚀 PPTX 의존성 설치 시작
================================================
1️⃣  Python 패키지 설치 중...
✓ Python 설치 완료

2️⃣  Node.js 패키지 설치 중...
✓ Node.js 설치 완료

최종 확인
================================================
markitdown: ✓
pptxgenjs: ✓

✨ 설치 완료!
================================================

다음 단계:
1. cd presentations/my-presentation
2. NODE_PATH="$(npm root -g)" node build.js
```

**나쁜 예:**
```
Installing...
Done.
```

### 오류 메시지

**좋은 예:**
```
❌ 오류: LibreOffice를 찾을 수 없습니다.
해결책: brew install --cask libreoffice

또는 공식 웹사이트에서 다운로드:
https://www.libreoffice.org/download/
```

**나쁜 예:**
```
Error: command not found
```

---

## 📋 문서 체크리스트

### README.md
- [ ] 한 줄 설명 있음
- [ ] 기능 목록 (3-5개)
- [ ] 빠른 시작 (3단계)
- [ ] 코드 예제 (2-3개)
- [ ] 링크 모두 정상
- [ ] 마지막 업데이트 날짜

### INSTALL.md
- [ ] 자동 설치 (macOS)
- [ ] 자동 설치 (Linux)
- [ ] 수동 설치 단계별
- [ ] 설치 확인 방법
- [ ] 문제 해결 (최소 3가지)
- [ ] 마지막 업데이트 날짜

### 설치 스크립트
- [ ] 진행 상황 표시
- [ ] 색상/이모지 사용
- [ ] 오류 처리
- [ ] 최종 확인
- [ ] 도움말 포함
- [ ] 실행 가능한가 (chmod +x)

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

### 스크립트

```
❌ 오류 처리 없음
❌ 실패해도 계속 진행
❌ 색상/진행 상황 표시 없음
❌ 관리자 권한 확인 없음 (Linux)
❌ 의존성 버전 명시 없음
```

### 의존성

```
❌ 불필요한 의존성
❌ 버전 명시 없음
❌ 호환성 확인 없음
❌ 보안 취약점
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
- 마이너 업데이트: 자동 설치 가능
- 메이저 업데이트: 사용자 확인 후
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

## 💡 일반 조언

### 공식 문서 참고

- Python: [PEP 8](https://pep8.org/)
- Node.js: [Google Style Guide](https://google.github.io/styleguide/tsguide.html)
- Bash: [ShellCheck](https://www.shellcheck.net/)

### 테스트 먼저

설치 스크립트를 작성한 후:
1. macOS에서 전체 테스트
2. Linux에서 전체 테스트
3. 문서의 모든 예제 테스트

### 사용자 피드백

새 스킬을 추가한 후:
1. 동료에게 설치 테스트 요청
2. 피드백 수집
3. 문서 개선
4. 스크립트 개선

---

## 📚 참고 자료

- [PEP 8](https://pep8.org/) - Python 스타일 가이드
- [Google Shell Guide](https://google.github.io/styleguide/shellguide.html) - Bash 가이드
- [Markdown Guide](https://www.markdownguide.org/) - 마크다운 가이드

---

**마지막 업데이트**: 2026-01-25
