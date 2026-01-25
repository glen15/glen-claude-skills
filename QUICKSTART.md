# 빠른 시작 (Claude Code 로컬 스킬)

**이 프로젝트는 Claude Code의 로컬 스킬 저장소입니다.**

---

## 🎯 1분 안에 시작하기

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

### 3단계: 스킬 사용

Claude Code에서:

```
/pptx
```

을 입력하면 PPTX 스킬의 기능을 사용할 수 있습니다.

---

## 🎨 PPTX 스킬 사용 예제

### PowerPoint 프레젠테이션 만들기

```
/pptx

새로운 프레젠테이션을 만들어주세요.
5개의 슬라이드:
1. 제목
2. 소개
3. 내용 1
4. 내용 2
5. 마무리
```

Claude Code가 PPTX 스킬을 사용하여 프레젠테이션을 자동으로 생성합니다.

### 기존 PowerPoint 편집

```
/pptx

이 파일을 편집해주세요: input.pptx
- 첫 번째 슬라이드의 제목을 "새 제목"으로 변경
- 두 번째 슬라이드 삭제
```

---

## 📚 문서 구조

| 파일 | 위치 | 내용 |
|------|------|------|
| **SKILL.md** | .claude/skills/pptx/ | 스킬 개요 + 빠른 시작 |
| **DESIGN.md** | .claude/skills/pptx/ | 디자인 가이드 |
| **INSTALL.md** | .claude/skills/pptx/ | 설치 가이드 |
| **reference.md** | .claude/skills/pptx/ | 상세 참고서 |
| **examples.md** | .claude/skills/pptx/ | 코드 예제 |

### 프로젝트 레벨 문서

| 문서 | 목적 |
|------|------|
| **QUICKSTART.md** | ⚡ 1분 시작 (지금) |
| **README.md** | 📖 프로젝트 개요 |
| **CONTRIBUTING.md** | ➕ 새 스킬 추가 |

---

## 🔄 다음 단계

### 1. PPTX 스킬 설치 (처음 사용시만)

```bash
cd .claude/skills/pptx
bash install-mac.sh       # macOS
# 또는
sudo bash install-linux.sh  # Linux
```

### 2. 예제 실행

```bash
cd contents/example
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js
open output.pptx
```

### 3. 새 프레젠테이션 만들기

```bash
mkdir -p contents/my-presentation
cd contents/my-presentation
# slide1.html, slide2.html 작성...
NODE_PATH="$(npm root -g)" node ../../.claude/skills/pptx/build.js
```

---

## 💡 팁

### Claude Code 스킬 호출

```
/[skill-name]    ← 슬래시로 스킬 호출
```

### 프로젝트 구조 확인

```bash
# Claude Code 스킬 (인식됨)
ls .claude/skills/

# PPT 소스 콘텐츠
ls contents/
```

---

## ❓ FAQ

### Q: Claude Code가 스킬을 인식하지 못해요

**A:** 확인하세요:
1. 프로젝트가 `glen-claude-skills` 폴더인가?
2. `.claude/skills/pptx/SKILL.md` 파일이 있는가?
3. Claude Code를 다시 열었는가?

### Q: 스킬 사용에 필요한 의존성은?

**A:** PPTX 스킬의 경우:
- Node.js 14+
- Python 3.7+ (선택)

설치하려면:
```bash
cd .claude/skills/pptx
bash install-mac.sh
```

### Q: 스킬을 다른 프로젝트에서도 사용할 수 있나요?

**A:** `.claude/skills/pptx/` 폴더 전체를 다른 프로젝트의 `.claude/skills/`에 복사하면 됩니다. 스킬이 자체 포함(self-contained)되어 있어 바로 사용 가능합니다.

---

## 🚀 다음 읽을 것

1. **[README.md](README.md)** - 프로젝트 전체 개요
2. **[SKILL.md](.claude/skills/pptx/SKILL.md)** - PPTX 스킬 상세
3. **[CONTRIBUTING.md](CONTRIBUTING.md)** - 새 스킬 추가 방법

---

**마지막 업데이트**: 2026-01-26

**현재 상태**: ✅ Claude Code 표준 구조 완료
