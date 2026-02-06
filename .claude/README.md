# Claude Code 로컬 스킬 설정

이 폴더는 Glen's Claude Skills 프로젝트의 Claude Code 설정입니다.

---

## 스킬 시스템 (Claude Code 표준)

이 프로젝트는 **Claude Code 표준 로컬 스킬 시스템**을 사용합니다.

### 구조

```
.claude/skills/
└── pptx/                    ← 스킬 디렉토리 (self-contained)
    ├── SKILL.md             ← 메인 파일 (필수)
    ├── package.json         ← Node.js 의존성
    ├── lib/                 ← html2pptx 라이브러리
    └── tools/               ← Python 편집 도구
```

### 특징

- **위치**: `.claude/skills/[skill-name]/`
- **메인 파일**: `SKILL.md` (필수)
- **자체 포함**: 심링크 없이 모든 코드가 스킬 폴더 내에 포함
- **인식**: Claude Code가 자동으로 디렉토리 인식
- **호출**: `/[skill-name]` 명령어로 호출 가능

### 현재 등록된 스킬

```
✅ pptx/                       (PPTX 생성/편집)
   ├── SKILL.md
   ├── lib/html2pptx.js
   ├── themes/
   └── tools/

✅ security-review/             (보안 리뷰 워크플로우)
   └── SKILL.md

✅ tdd-workflow/                (TDD 실천 가이드)
   └── SKILL.md

✅ swarm-patterns.md            (Agent Teams 활용 패턴)
✅ backend-patterns.md          (백엔드 아키텍처 패턴)
✅ frontend-patterns.md         (프론트엔드 개발 패턴)
```

---

## 스킬 사용

### PPTX 스킬 사용

Claude Code에서:

```
/pptx
```

### 프로그래밍 방식 (html2pptx)

```javascript
const { html2pptx } = require('./.claude/skills/pptx/lib/html2pptx');

const html = `
<section class="slide title-slide">
  <h1>제목</h1>
  <p class="subtitle">부제목</p>
</section>
`;

await html2pptx(html, 'output.pptx', { theme: 'nxtcloud-v1' });
```

---

## 스킬 추가

새로운 스킬 `[skill-name]`을 추가하려면:

```bash
# 1. 스킬 폴더 생성
mkdir -p .claude/skills/[skill-name]

# 2. SKILL.md 작성 (필수)
cat > .claude/skills/[skill-name]/SKILL.md << 'EOF'
---
name: skill-name
description: "스킬 설명"
license: Proprietary
disable-model-invocation: false
user-invocable: true
allowed-tools: Bash, Read, Write, Glob, Grep
---

# Skill Name

스킬 내용...
EOF

# 3. 의존성 추가 (필요시)
cd .claude/skills/[skill-name]
npm init -y  # Node.js
# 또는
touch requirements.txt  # Python
```

---

## 폴더 구조

```
glen-claude-skills/
│
├── .claude/                    ← Claude Code 설정 (이 폴더)
│   ├── README.md               ← 이 파일
│   ├── agents/                 ← 에이전트 정의 (9개)
│   ├── commands/               ← 슬래시 명령어 (14개)
│   ├── docs/                   ← 가이드 문서
│   │   └── plugins.md
│   ├── skills/                 ← Claude Code가 인식하는 스킬
│   │   ├── pptx/               ← PPTX 스킬 (self-contained)
│   │   │   ├── SKILL.md
│   │   │   ├── package.json
│   │   │   ├── lib/
│   │   │   └── tools/
│   │   ├── security-review/    ← 보안 리뷰 워크플로우
│   │   ├── tdd-workflow/       ← TDD 실천 가이드
│   │   ├── swarm-patterns.md   ← Agent Teams 활용 패턴
│   │   ├── backend-patterns.md ← 백엔드 아키텍처 패턴
│   │   └── frontend-patterns.md← 프론트엔드 개발 패턴
│   └── settings.json
│
├── contents/                   ← PPT 소스 콘텐츠
│
└── .mcp.json.example           ← MCP 서버 설정 예시
```

---

## 워크플로우

### 기존 스킬 사용

```
1. Claude Code 열기 (glen-claude-skills 프로젝트)
   ↓
2. Claude Code가 .claude/skills/ 자동 인식
   ↓
3. /pptx 등으로 스킬 호출
   ↓
4. 스킬 기능 사용
```

### 새 스킬 개발

```
1. .claude/skills/[skill-name]/ 폴더 생성
   ↓
2. SKILL.md 작성 (필수)
   ↓
3. 의존성 추가 (package.json 또는 requirements.txt)
   ↓
4. 라이브러리 코드 작성 (lib/)
   ↓
5. Claude Code에서 테스트
```

---

## 핵심 원칙

### Self-Contained (자체 포함)

- **심링크 사용 금지**: 모든 코드가 스킬 폴더 내에 포함
- **이식성**: 폴더만 복사하면 다른 프로젝트에서 바로 사용 가능
- **독립성**: 각 스킬은 독립적으로 의존성 관리

### 구조 규칙

```
✅ Good
.claude/skills/pdf/
├── SKILL.md
├── package.json
└── lib/

❌ Bad
.claude/skills/pdf.md  (심링크)
skills/pdf/            (외부 폴더)
```

---

## 도움말

### Claude Code가 스킬을 인식하지 못함

1. **폴더 확인**: `.claude/skills/[skill-name]/` 폴더가 있는가?
2. **SKILL.md 확인**: `SKILL.md` 파일이 있는가?
3. **Front Matter 확인**: SKILL.md에 올바른 Front Matter가 있는가?
4. **Claude Code 재시작**: Claude Code를 다시 열기

### 의존성 설치

```bash
# Node.js
cd .claude/skills/pptx
npm install

# Python
cd .claude/skills/pptx/tools
pip install -r requirements.txt
```

---

**마지막 업데이트**: 2026-02-06
