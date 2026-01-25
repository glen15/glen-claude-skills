# 스킬 템플릿

새로운 스킬을 추가할 때 사용할 표준 템플릿입니다.

---

## 📋 파일 템플릿

### 1. README.md

```markdown
# [SKILL_NAME] 스킬

한 줄 설명: [이 스킬이 무엇을 하는가]

## 🎯 기능

- 기능 1
- 기능 2
- 기능 3

## 🚀 빠른 시작

### 설치

\`\`\`bash
cd .claude/skills/[skill-name]
bash install-mac.sh       # macOS
# 또는
sudo bash install-linux.sh  # Linux
\`\`\`

### 기본 사용법

\`\`\`bash
# 예제 1
[command example 1]

# 예제 2
[command example 2]
\`\`\`

## 📚 상세 가이드

더 자세한 정보는:
- **INSTALL.md** - 상세 설치 가이드
- **[추가 가이드 문서]** - 심화 내용

## 🔧 의존성

- Python 3.7+ (또는 해당 버전)
- Node.js 14+ (필요시)
- [추가 도구]

## 📝 사용 사례

- 사용 사례 1
- 사용 사례 2

## 🤝 문제 해결

일반적인 문제와 해결책:

### 문제 1: [문제 설명]

**해결책:**
\`\`\`bash
[해결 명령]
\`\`\`

### 문제 2: [문제 설명]

**해결책:**
[해결 방법]

---

**마지막 업데이트**: YYYY-MM-DD
**버전**: 1.0
```

### 2. INSTALL.md

```markdown
# 설치 가이드

## 자동 설치 (권장)

### macOS

\`\`\`bash
bash install-mac.sh
\`\`\`

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo bash install-linux.sh
\`\`\`

## 수동 설치

### 단계 1: Python 의존성

\`\`\`bash
pip install -r requirements.txt
\`\`\`

의존성:
- package1: [설명]
- package2: [설명]

### 단계 2: Node.js 의존성 (필요시)

\`\`\`bash
npm install -g [package]
\`\`\`

### 단계 3: 시스템 도구 설치 (필요시)

**macOS:**
\`\`\`bash
brew install [tool]
\`\`\`

**Linux:**
\`\`\`bash
sudo apt-get install [tool]
\`\`\`

## ✅ 설치 확인

\`\`\`bash
# 모든 의존성 확인
python --version
node --version
[도구] --version
\`\`\`

## 🔧 문제 해결

### 문제: [설치 오류]

**원인:** [원인 설명]

**해결책:**
\`\`\`bash
[해결 명령]
\`\`\`

### 문제: [권한 오류]

**원인:** [원인 설명]

**해결책:**
\`\`\`bash
[해결 명령]
\`\`\`

---

**마지막 업데이트**: YYYY-MM-DD
```

### 3. install-mac.sh

```bash
#!/bin/bash
# [SKILL_NAME] 의존성 설치 스크립트 (macOS)

set -e

echo "🚀 [SKILL_NAME] 의존성 설치 시작"
echo "================================================"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 1️⃣ Python 의존성
echo -e "${BLUE}1️⃣  Python 의존성 설치 중...${NC}"
pip install -r requirements.txt
echo -e "${GREEN}✓ Python 패키지 설치 완료${NC}\n"

# 2️⃣ Node.js 의존성 (필요시)
echo -e "${BLUE}2️⃣  Node.js 의존성 설치 중...${NC}"
npm install -g [package]
echo -e "${GREEN}✓ Node.js 패키지 설치 완료${NC}\n"

# 3️⃣ 시스템 도구 (필요시)
echo -e "${BLUE}3️⃣  시스템 도구 설치 확인 중...${NC}"
if ! command -v [tool] &> /dev/null; then
    echo -e "${YELLOW}⚠️  [Tool]을 찾을 수 없습니다.${NC}"
    echo "    설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        brew install [tool]
        echo -e "${GREEN}✓ [Tool] 설치 완료${NC}"
    else
        echo -e "${YELLOW}⏭️  [Tool] 설치 건너뜀${NC}"
    fi
else
    echo -e "${GREEN}✓ [Tool] 설치됨${NC}"
fi
echo

# 최종 확인
echo -e "${BLUE}최종 확인${NC}"
echo "================================================"

echo -n "Python [package]: "
python -c "import [package]; print([package].__version__)" 2>/dev/null && echo -e "${GREEN}✓${NC}" || echo -e "❌"

echo -n "[Tool]: "
command -v [tool] &> /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "${YELLOW}선택 사항${NC}"

echo
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✨ 설치 완료!${NC}"
echo -e "${GREEN}================================================${NC}"
echo
echo "다음 단계:"
echo "1. [스킬 사용 설명]"
echo "2. [명령 예제]"
echo
echo "자세한 사용법은 README.md를 참고하세요."
```

### 4. install-linux.sh

```bash
#!/bin/bash
# [SKILL_NAME] 의존성 설치 스크립트 (Linux)

set -e

echo "🚀 [SKILL_NAME] 의존성 설치 시작 (Linux)"
echo "================================================"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Root 권한 확인
if [[ $EUID -ne 0 ]]; then
   echo -e "${YELLOW}⚠️  이 스크립트는 관리자 권한이 필요합니다.${NC}"
   echo "    다시 실행하세요: sudo bash install-linux.sh"
   exit 1
fi

# 1️⃣ Python 의존성
echo -e "${BLUE}1️⃣  Python 의존성 설치 중...${NC}"
pip install -r requirements.txt
echo -e "${GREEN}✓ Python 패키지 설치 완료${NC}\n"

# 2️⃣ Node.js 의존성 (필요시)
echo -e "${BLUE}2️⃣  Node.js 의존성 설치 중...${NC}"
npm install -g [package]
echo -e "${GREEN}✓ Node.js 패키지 설치 완료${NC}\n"

# 3️⃣ 시스템 도구 (필요시)
echo -e "${BLUE}3️⃣  시스템 도구 설치 확인 중...${NC}"
if ! command -v [tool] &> /dev/null; then
    echo -e "${YELLOW}⚠️  [Tool]을 찾을 수 없습니다.${NC}"
    echo "    설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        apt-get update
        apt-get install -y [tool]
        echo -e "${GREEN}✓ [Tool] 설치 완료${NC}"
    else
        echo -e "${YELLOW}⏭️  [Tool] 설치 건너뜀${NC}"
    fi
else
    echo -e "${GREEN}✓ [Tool] 설치됨${NC}"
fi
echo

# 최종 확인
echo -e "${BLUE}최종 확인${NC}"
echo "================================================"

echo -n "Python [package]: "
python -c "import [package]; print([package].__version__)" 2>/dev/null && echo -e "${GREEN}✓${NC}" || echo -e "❌"

echo -n "[Tool]: "
command -v [tool] &> /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "${YELLOW}선택 사항${NC}"

echo
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✨ 설치 완료!${NC}"
echo -e "${GREEN}================================================${NC}"
echo
echo "다음 단계:"
echo "1. [스킬 사용 설명]"
echo "2. [명령 예제]"
echo
echo "자세한 사용법은 README.md를 참고하세요."
```

### 5. requirements.txt

```
# Python 의존성
# 형식: package-name>=version

package1>=1.0.0
package2>=2.0.0
```

### 6. package.json

```json
{
  "name": "[skill-name]",
  "version": "1.0.0",
  "description": "[One line description]",
  "author": "Glen",
  "license": "Proprietary",
  "globalDependencies": {
    "package1": "^1.0.0",
    "package2": "^2.0.0"
  },
  "scripts": {
    "install-global": "npm install -g package1 package2"
  },
  "keywords": ["skill", "claude-code"]
}
```

---

## 📝 작성 가이드

### README.md 작성 팁

1. **제목**: 스킬의 이름과 주요 기능을 명확히
2. **한 줄 설명**: "이것은 ___를 자동화합니다"
3. **기능 목록**: 3-5개 핵심 기능
4. **빠른 시작**: 3단계 이내로 시작 가능하게
5. **코드 예제**: 모두 실행 가능해야 함
6. **문제 해결**: 가장 흔한 3-5가지 문제
7. **다음 단계**: 자세한 가이드로 링크

### 설치 스크립트 작성 팁

1. **진행 상황 표시**: 숫자 이모지 + 색상
2. **단계별 설명**: 각 단계가 무엇인지 명확히
3. **오류 처리**: 실패 시 중단
4. **옵션 처리**: 선택사항은 사용자에게 묻기
5. **최종 확인**: 설치 성공 여부 검증
6. **도움말**: 마지막에 다음 단계 안내

---

## ✅ 체크리스트

새 스킬 추가 전 확인:

- [ ] 폴더명 결정 (소문자, 하이픈)
- [ ] README.md 작성
- [ ] INSTALL.md 작성
- [ ] install-mac.sh 작성 (chmod +x)
- [ ] install-linux.sh 작성 (chmod +x)
- [ ] requirements.txt 또는 package.json 작성
- [ ] 도구/리소스 폴더 생성
- [ ] macOS에서 설치 테스트
- [ ] Linux에서 설치 테스트
- [ ] README.md의 예제 테스트
- [ ] 최상위 README.md 업데이트

---

## 🔄 사용 예시

### 예: PDF 스킬 추가

```bash
# 1. 폴더 생성
mkdir -p .claude/skills/pdf

# 2. 파일 생성
cd .claude/skills/pdf
touch README.md INSTALL.md install-mac.sh install-linux.sh requirements.txt

# 3. 이 템플릿을 참고하여 파일 작성

# 4. 권한 설정
chmod +x install-*.sh

# 5. 테스트
bash install-mac.sh
```

---

**마지막 업데이트**: 2026-01-25
