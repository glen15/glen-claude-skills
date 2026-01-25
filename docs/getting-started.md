# 시작하기

Glen's Claude Skills를 처음 사용하는 분들을 위한 가이드입니다.

---

## 🎯 이것은 무엇인가?

**Glen's Claude Skills**는 Claude Code를 확장하는 스킬들의 중앙 저장소입니다.

- 📚 **여러 스킬 관리**: PowerPoint, PDF, 이미지 등 다양한 작업 자동화
- 🔧 **자체 포함**: 각 스킬은 독립적으로 설치 및 사용 가능 (self-contained)
- 📖 **명확한 문서**: 각 스킬마다 상세한 사용 설명서 제공
- ✨ **확장 가능**: 새로운 스킬을 쉽게 추가 가능한 구조

---

## 🚀 5분 안에 시작하기

### 1단계: 프로젝트 열기

```bash
cd /Users/glen/Desktop/work/glen-claude-skills
```

또는 Claude Code에서:
```
File → Open Folder → glen-claude-skills 선택
```

### 2단계: 스킬 확인

Claude Code에서 `/` 를 입력하면 사용 가능한 스킬이 나타납니다:

```
/pptx    ← 이 스킬 사용 가능
```

### 3단계: 스킬 설치 (처음 사용시만)

```bash
cd .claude/skills/pptx
bash install-mac.sh       # macOS
# 또는
sudo bash install-linux.sh  # Linux
```

### 4단계: 사용 시작

Claude Code에서:
```
/pptx

새로운 프레젠테이션을 만들어주세요.
```

---

## 📂 폴더 구조 이해하기

```
glen-claude-skills/              ← 메인 폴더
│
├── README.md                    ← 프로젝트 소개
├── QUICKSTART.md                ← 빠른 시작
├── CONTRIBUTING.md              ← 새 스킬 추가 가이드
│
├── .claude/                     ← Claude Code 설정
│   └── skills/                  ← 스킬 저장소
│       └── pptx/                ← PPTX 스킬 (자체 포함)
│           ├── SKILL.md         ← 메인 스킬 파일
│           ├── INSTALL.md       ← 설치 가이드
│           ├── html2pptx/       ← 핵심 라이브러리
│           └── ...
│
├── contents/                    ← PPT 소스 콘텐츠
│   └── example/                 ← 예제 프레젠테이션
│
└── docs/                        ← 공통 문서
    ├── getting-started.md       ← 지금 읽는 파일
    └── ...
```

---

## 📖 문서 읽는 순서

### 처음 사용하는 경우

1. **이 파일** (지금 읽고 있음)
2. **[README.md](../README.md)** - 전체 프로젝트 소개
3. **[SKILL.md](../.claude/skills/pptx/SKILL.md)** - PPTX 스킬 상세

### 새 스킬을 추가하는 경우

1. **[CONTRIBUTING.md](../CONTRIBUTING.md)** - 추가 가이드
2. **기존 스킬 분석** (`.claude/skills/pptx/`)

---

## 🛠️ PPTX 스킬 예제

### 스킬 소개

**PowerPoint 자동화**
- HTML + CSS로 슬라이드 작성
- 기존 파일 편집
- 템플릿 기반 생성

### 빠른 시작

```bash
# 1. 예제 폴더로 이동
cd contents/example

# 2. PPT 생성
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js

# 3. 결과 확인
open output.pptx
```

### 새 프레젠테이션 만들기

```bash
# 1. 폴더 생성
mkdir -p contents/my-presentation
cd contents/my-presentation

# 2. HTML 슬라이드 작성 (slide1.html, slide2.html, ...)

# 3. 스타일 복사 (선택)
cp ../example/styles.css .

# 4. PPT 생성
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js
```

---

## ❓ 자주 묻는 질문

### Q: Claude Code가 스킬을 인식하지 못해요

**A:** 확인하세요:
1. 프로젝트가 `glen-claude-skills` 폴더인가?
2. `.claude/skills/pptx/SKILL.md` 파일이 있는가?
3. Claude Code를 다시 열었는가?

### Q: Python/Node.js가 없어도 되나요?

**A:** PPTX 스킬의 경우:
- Node.js 14+ 필수
- Python 3.7+ 선택 (일부 기능에 필요)

### Q: 새 스킬을 추가하고 싶은데?

**A:** [CONTRIBUTING.md](../CONTRIBUTING.md)를 읽고 `.claude/skills/[skill-name]/` 폴더를 생성하세요.

### Q: 스킬을 다른 프로젝트에서 사용할 수 있나요?

**A:** `.claude/skills/pptx/` 폴더 전체를 복사하면 됩니다. 스킬이 자체 포함(self-contained)되어 있어 바로 사용 가능합니다.

---

## 🔗 다음 단계

선택하세요:

1. **PPTX 스킬 사용**: [SKILL.md](../.claude/skills/pptx/SKILL.md)로 이동
2. **새 스킬 추가**: [CONTRIBUTING.md](../CONTRIBUTING.md) 읽기

---

**마지막 업데이트**: 2026-01-26

이제 준비됐습니다! 즐거운 스킬 사용 되세요! 🚀
