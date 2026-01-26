# 새 스킬 추가 가이드

Glen's Claude Skills에 새로운 스킬을 추가하는 방법을 설명합니다.

---

## 🎯 Claude Code 표준 구조

모든 스킬은 **Claude Code 표준**에 따라 `.claude/skills/` 폴더에 위치합니다:

```
.claude/skills/[skill-name]/
├── SKILL.md              ← 필수: 메인 스킬 파일
├── package.json          ← 선택: Node.js 의존성
├── lib/                  ← 선택: 라이브러리 코드
└── tools/                ← 선택: 유틸리티 도구
```

**핵심 원칙:**
- 스킬은 **자체 포함**(self-contained)되어야 함
- 심링크 사용 금지
- 스킬 폴더만 복사하면 다른 프로젝트에서 바로 사용 가능

---

## 📁 새 스킬 생성

### 1단계: 스킬 폴더 생성

```bash
mkdir -p .claude/skills/[skill-name]
cd .claude/skills/[skill-name]
```

**명명 규칙:**
- 소문자 사용
- 하이픈으로 단어 구분
- 짧고 명확하게
  - ✅ `pdf`, `image`, `data-viz`
  - ❌ `PDF`, `img_processing`

### 2단계: SKILL.md 작성 (필수)

```markdown
---
name: [skill-name]
description: "스킬 설명"
license: Proprietary
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---

# [Skill Name]

스킬 설명...

## Quick Start

사용 예제...
```

---

## ✅ 체크리스트

### 기본 구조
- [ ] `.claude/skills/[skill-name]/` 폴더 생성
- [ ] `SKILL.md` 작성 (Front Matter 포함)

### 자체 포함 (Self-Contained)
- [ ] 모든 필요한 코드가 스킬 폴더 내에 있음
- [ ] 심링크 사용 안 함

### 테스트
- [ ] Claude Code에서 스킬 인식 확인
- [ ] 주요 기능 테스트

---

## 🌟 모범 사례: PPTX 스킬

[`.claude/skills/pptx/`](.claude/skills/pptx/) 구조 참고:

```
.claude/skills/pptx/
├── SKILL.md              ← 메인 스킬 파일
├── package.json          ← Node.js 의존성
├── lib/                  ← 빌더 API 라이브러리
│   ├── index.js
│   ├── builder.js
│   └── themes/           ← 테마 시스템
│       ├── nxtcloud-v1/
│       └── nxtcloud-v2/
└── tools/                ← Python 편집 도구
    ├── ooxml.md
    ├── inventory.py
    └── ...
```

---

**마지막 업데이트**: 2026-01-26
