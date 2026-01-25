# 의존성 설치 가이드

cowork-pptx 스킬을 사용하기 위한 모든 의존성을 설치합니다.

---

## 🚀 빠른 설치 (자동) ⭐

설치 스크립트가 **자동으로 가상환경을 설정**합니다.

### macOS

```bash
cd /Users/glen/Desktop/work/glen-claude-skills/skills/pptx
bash install-mac.sh
```

### Linux (Ubuntu/Debian)

```bash
cd /Users/glen/Desktop/work/glen-claude-skills/skills/pptx
sudo bash install-linux.sh
```

---

## ✅ 설치 후 사용하기

### 1️⃣ 새 터미널에서 가상환경 활성화 (매번 필요)

```bash
# skills/pptx 폴더로 이동
cd /Users/glen/Desktop/work/glen-claude-skills/skills/pptx

# 가상환경 활성화
source venv/bin/activate
```

**확인**: 터미널 왼쪽에 `(venv)`가 표시되면 활성화된 것입니다.

```bash
(venv) ~/Desktop/work/glen-claude-skills/skills/pptx $
```

### 2️⃣ 테스트 실행

```bash
# 테스트 폴더로 이동
cd test-quick

# PPT 생성
NODE_PATH="$(npm root -g)" node build.js

# 결과 확인
open output.pptx
```

### 3️⃣ 실제 프레젠테이션 생성

```bash
# 프레젠테이션 폴더로 이동
cd presentations/my-presentation

# PPT 생성
NODE_PATH="$(npm root -g)" node build.js

# 결과 확인
open output.pptx
```

---

## 📖 가상환경이란?

**가상환경(Virtual Environment)**은 프로젝트별로 독립적인 Python 환경을 만드는 것입니다.

**이점:**
- ✅ 프로젝트별 패키지 독립 관리
- ✅ 시스템 Python 건드리지 않음
- ✅ 다른 프로젝트와 충돌 없음
- ✅ 재설치/삭제 용이

**활성화 방법:**
```bash
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate       # Windows
```

---

## 📋 수동 설치

자동 설치 스크립트가 작동하지 않으면 다음 단계를 따르세요.

### 1단계: 가상환경 생성

```bash
cd /Users/glen/Desktop/work/glen-claude-skills/skills/pptx
python3 -m venv venv
source venv/bin/activate
```

### 2단계: Python 의존성

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**설치되는 패키지:**
- **markitdown**: PowerPoint 텍스트 추출
- **defusedxml**: XML 보안 처리

### 3단계: Node.js 의존성 (전역 설치)

```bash
npm install -g pptxgenjs playwright
npm install -g react react-dom react-icons
```

### 4단계: 시스템 도구 (선택)

**macOS:**
```bash
brew install libreoffice poppler
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install libreoffice poppler-utils
```

### 5단계: html2pptx 라이브러리 추출

```bash
mkdir -p html2pptx
tar -xzf pptx-skill-tools/html2pptx.tgz -C html2pptx
```

---

## ✅ 설치 확인

모든 의존성이 제대로 설치되었는지 확인합니다:

```bash
# 가상환경 활성화 확인
which python
# /path/to/venv/bin/python 이어야 함

# Python 패키지 확인
python -c "import markitdown; print(markitdown.__version__)"

# Node.js 패키지 확인
npm list -g pptxgenjs

# 시스템 도구 확인
soffice --version    # LibreOffice
pdftoppm -version    # Poppler
```

---

## 🔧 문제 해결

### 문제 1: "pip: command not found"

**원인:** 가상환경이 활성화되지 않았음

**해결책:**
```bash
# 가상환경 활성화 확인
source venv/bin/activate
# 터미널에 (venv)가 표시되어야 함
```

### 문제 2: "No module named 'markitdown'"

**원인:** Python 패키지가 설치되지 않음

**해결책:**
```bash
# 가상환경 활성화
source venv/bin/activate

# 재설치
pip install markitdown defusedxml
```

### 문제 3: "Cannot find module 'pptxgenjs'"

**원인:** Node.js 패키지가 설치되지 않음

**해결책:**
```bash
npm install -g pptxgenjs playwright
npm install -g react react-dom react-icons
```

### 문제 4: "soffice: command not found"

**원인:** LibreOffice가 설치되지 않음

**해결책:**
```bash
# macOS
brew install --cask libreoffice

# Linux
sudo apt-get install libreoffice
```

**주의:** LibreOffice 없으면 PDF 변환이 안 되지만, PPT 생성은 가능합니다.

### 문제 5: "pdftoppm: command not found"

**원인:** Poppler가 설치되지 않음

**해결책:**
```bash
# macOS
brew install poppler

# Linux
sudo apt-get install poppler-utils
```

**주의:** Poppler 없으면 PDF→이미지 변환이 안 되지만, PPT 생성은 가능합니다.

---

## 🎯 설치 완료 체크리스트

- [ ] 가상환경 생성됨 (`venv/` 폴더)
- [ ] 가상환경 활성화 가능 (`source venv/bin/activate`)
- [ ] markitdown 설치됨
- [ ] pptxgenjs 설치됨
- [ ] playwright 설치됨
- [ ] html2pptx 추출됨 (`html2pptx/` 폴더)
- [ ] test-quick에서 `node build.js` 실행 가능

---

## 💡 팁

### .zshrc 또는 .bashrc에 별칭 추가

자주 가상환경을 활성화하므로 별칭을 만들면 편합니다:

```bash
# ~/.zshrc 또는 ~/.bashrc에 추가
alias pptx-env='cd /Users/glen/Desktop/work/glen-claude-skills/skills/pptx && source venv/bin/activate'
```

사용:
```bash
pptx-env    # 바로 이동 및 활성화
```

---

**마지막 업데이트**: 2026-01-25
