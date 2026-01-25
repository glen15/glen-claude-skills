# Glen's Claude Skills

Claude Code에서 사용할 수 있는 스킬들의 중앙 저장소입니다.

## 🎯 시스템 구조 (Claude Code 표준)

이 저장소는 **Claude Code 표준 로컬 스킬 시스템**으로 구성되어 있습니다:

```
glen-claude-skills/
│
├── .claude/                   ← Claude Code 설정
│   ├── settings.json         ← 스킬 시스템 활성화
│   └── skills/               ← Claude Code가 인식하는 스킬
│       └── pptx/             ← PPTX 스킬 (자체 포함, self-contained)
│           ├── SKILL.md      ← 메인 스킬 파일
│           ├── DESIGN.md     ← 디자인 가이드
│           ├── INSTALL.md    ← 설치 가이드
│           ├── build.js      ← 빌드 스크립트
│           ├── styles.css    ← 기본 디자인
│           ├── html2pptx/    ← HTML→PPTX 변환 라이브러리
│           └── pptx-skill-tools/  ← PPTX 도구 모음
│               ├── inventory.py
│               ├── rearrange.py
│               ├── replace.py
│               └── ooxml/
│
└── contents/                 ← PPT 소스 콘텐츠
    ├── example/              ← 예제 프레젠테이션
    └── (사용자 프레젠테이션들)
```

### 특징

- ✅ **Claude Code 표준** 준수
- ✅ **디렉토리 기반** 구조 (파일 아님)
- ✅ **확장 가능** (파일 추가 용이)
- ✅ **자동 인식** (이 프로젝트를 열면 스킬 자동 표시)

**이 프로젝트를 열면 Claude Code가 자동으로 스킬들을 인식합니다.**

---

## 📚 사용 가능한 스킬

| 스킬 | 설명 | 상태 | 문서 |
|------|------|------|------|
| **PPTX** | PowerPoint 자동화 - HTML/CSS로 프레젠테이션 생성 및 편집 | ✅ 활성 | [SKILL.md](.claude/skills/pptx/SKILL.md) |
| (준비 중) | ... | 🔄 준비 | ... |

---

## 🚀 빠른 시작

### 예제 실행

```bash
# 예제 폴더로 이동
cd contents/example

# PPT 생성
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js

# 결과 확인
open output.pptx
```

### 새 프레젠테이션 만들기

```bash
# 1. 콘텐츠 폴더 생성
mkdir -p contents/my-presentation
cd contents/my-presentation

# 2. HTML 슬라이드 작성
# slide1.html, slide2.html, ... 파일 생성

# 3. 스타일 복사 (선택)
cp ../example/styles.css .

# 4. PPT 생성
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js

# 5. 결과 확인
open output.pptx
```

📖 **자세한 사용법**: [PPTX SKILL.md](./.claude/skills/pptx/SKILL.md)
📖 **디자인 가이드**: [DESIGN.md](./.claude/skills/pptx/DESIGN.md)
📖 **설치 가이드**: [INSTALL.md](./.claude/skills/pptx/INSTALL.md)

---

## 🔧 의존성 설치

### 필수 의존성

```bash
# Node.js 패키지 (전역 설치)
npm install -g pptxgenjs playwright
npm install -g react react-dom react-icons

# Playwright 브라우저
npx playwright install chromium --with-deps
```

### 선택 의존성

```bash
# macOS
brew install libreoffice poppler

# Linux
sudo apt-get install libreoffice poppler-utils
```

자세한 설치 방법: [INSTALL.md](./.claude/skills/pptx/INSTALL.md)

---

## 📖 문서

### PPTX 스킬

| 문서 | 설명 |
|------|------|
| [SKILL.md](.claude/skills/pptx/SKILL.md) | 메인 스킬 설명서 |
| [DESIGN.md](.claude/skills/pptx/DESIGN.md) | 디자인 가이드 |
| [INSTALL.md](.claude/skills/pptx/INSTALL.md) | 설치 가이드 |
| [reference.md](.claude/skills/pptx/reference.md) | 상세 참고서 |
| [examples.md](.claude/skills/pptx/examples.md) | 코드 예제 |

### 공통 문서

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - 기여 가이드
- **[QUICKSTART.md](QUICKSTART.md)** - 빠른 시작 가이드

---

## ➕ 새 스킬 추가하기

Claude Code 표준에 따라 새 스킬을 추가하려면:

1. `.claude/skills/[skill-name]/` 폴더 생성
2. `SKILL.md` 파일 작성 (필수)
3. 필요한 추가 파일 작성

```
.claude/skills/[skill-name]/
├── SKILL.md           ← 필수: 스킬 정의
├── INSTALL.md         ← 선택: 설치 가이드
├── reference.md       ← 선택: 상세 참고
└── ...
```

---

## 🔗 관련 리소스

- **Claude Code**: https://claude.com/claude-code
- **Anthropic API**: https://docs.anthropic.com
- **GitHub Issues**: https://github.com/anthropics/claude-code/issues

---

## 📝 스킬 상태

| 스킬 | 버전 | 마지막 업데이트 | 유지보수 |
|------|------|--------------|--------|
| PPTX | 1.0 | 2026-01-26 | ✅ 활성 |

---

**마지막 업데이트**: 2026-01-26
**상태**: 🟢 활성 개발 중

## ✅ 최근 변경사항 (2026-01-26)

- 🧹 Claude Code 표준 구조로 완전 전환
- 🧹 `.claude/skills/pptx/`에 모든 스킬 파일 통합 (self-contained)
- 🧹 `html2pptx/`, `pptx-skill-tools/` 스킬 폴더 내부로 이동
- 🧹 불필요한 폴더 정리 (`skills/`, `presentations/`, `scripts/`)
- 🧹 심링크 제거 (Claude Code 표준 준수)
- ✨ `contents/` 폴더: PPT 소스 콘텐츠 저장소
- 🎨 Modern IT Trend 2026 스타일 적용
