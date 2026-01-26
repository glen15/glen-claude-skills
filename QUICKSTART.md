# 빠른 시작 (Claude Code 로컬 스킬)

**이 프로젝트는 Claude Code의 로컬 스킬 저장소입니다.**

---

## 🎯 1분 안에 시작하기

### 1단계: 프로젝트 열기

```bash
cd /Users/glen/Desktop/work/glen-claude-skills
```

### 2단계: 스킬 확인

Claude Code에서 `/` 를 입력하면 사용 가능한 스킬이 나타납니다:

```
/pptx    ← PPTX 스킬 사용 가능
```

### 3단계: 스킬 사용

Claude Code에서 `/pptx`를 입력하면 PPTX 스킬의 기능을 사용할 수 있습니다.

---

## 🎨 PPTX 스킬 사용 예제

### PowerPoint 프레젠테이션 만들기

```
/pptx

새로운 프레젠테이션을 만들어주세요.
주제: AWS 클라우드 소개
5개의 슬라이드로 구성
```

Claude Code가 빌더 API를 사용하여 프레젠테이션을 자동으로 생성합니다.

### 기존 PowerPoint 편집

```
/pptx

이 파일을 편집해주세요: input.pptx
- 첫 번째 슬라이드의 제목을 "새 제목"으로 변경
```

---

## 🔄 설치 (처음 사용시만)

```bash
cd .claude/skills/pptx
npm install
```

---

## 📚 문서

| 파일 | 내용 |
|------|------|
| [SKILL.md](.claude/skills/pptx/SKILL.md) | 스킬 상세 가이드 |
| [tools/ooxml.md](.claude/skills/pptx/tools/ooxml.md) | OOXML 편집 레퍼런스 |

---

## ❓ FAQ

### Q: Claude Code가 스킬을 인식하지 못해요

**A:** 확인하세요:
1. 프로젝트가 `glen-claude-skills` 폴더인가?
2. `.claude/skills/pptx/SKILL.md` 파일이 있는가?

### Q: 스킬을 다른 프로젝트에서도 사용할 수 있나요?

**A:** `.claude/skills/pptx/` 폴더 전체를 다른 프로젝트의 `.claude/skills/`에 복사하면 됩니다.

---

**마지막 업데이트**: 2026-01-26
