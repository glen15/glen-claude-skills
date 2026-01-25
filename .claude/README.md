# Claude Code 로컬 스킬 설정

이 폴더는 Glen's Claude Skills 프로젝트의 Claude Code 설정입니다.

---

## 🎯 스킬 시스템 (Claude Code 표준)

이 프로젝트는 **Claude Code 표준 로컬 스킬 시스템**을 사용합니다:

### 구조

```
.claude/skills/
└── pptx/                    ← 스킬 디렉토리
    ├── SKILL.md            ← 메인 파일 (필수)
    ├── reference.md        ← 상세 가이드
    └── examples.md         ← 실행 가능한 예제
```

### 특징

- **위치**: `.claude/skills/[skill-name]/`
- **메인 파일**: `SKILL.md` (필수, 500줄 이하)
- **지원 파일**: `reference.md`, `examples.md` (선택)
- **인식**: Claude Code가 자동으로 디렉토리 인식
- **호출**: `/[skill-name]` 명령어로 호출 가능

### 현재 등록된 스킬

```
✅ pptx/
   ├── SKILL.md          (스킬 개요)
   ├── reference.md      (상세 기술 문서)
   └── examples.md       (실행 가능한 예제)
```

---

## 📖 스킬 사용

### PPTX 스킬 사용

Claude Code에서:

```
/pptx
```

또는 스킬의 내용을 직접 참고하려면:

```
cat .claude/skills/pptx.md
```

### 스킬 추가

새로운 스킬 `[skill-name]`을 추가하려면:

```bash
# 1. 스킬 개발 (skills/[skill-name]/)

# 2. Claude Code에 등록
cd .claude/skills
ln -s ../../skills/[skill-name]/[main-file].md [skill-name].md

# 3. 확인
ls -la
```

---

## ⚙️ 설정 파일

### settings.json

```json
{
  "skills": {
    "directory": "skills",
    "enabled": true
  }
}
```

- `directory`: 스킬 폴더 경로 (상대 경로)
- `enabled`: 스킬 시스템 활성화

### 커스텀 권한 추가 필요시

`settings.local.json`을 수정:

```json
{
  "permissions": {
    "allow": [
      "Bash(git:*)",
      "Bash(npm:*)"
    ]
  }
}
```

---

## 📁 폴더 구조

```
glen-claude-skills/
│
├── .claude/                    ← Claude Code 설정 (이 폴더)
│   ├── settings.json          ← 스킬 시스템 설정
│   ├── settings.local.json    ← 로컬 권한 설정
│   ├── README.md              ← 이 파일
│   └── skills/                ← Claude Code가 인식하는 스킬
│       ├── pptx.md            ← PPTX 스킬 (심링크)
│       └── [skill2].md        ← (추후 추가)
│
├── skills/                    ← 스킬 개발 저장소
│   ├── pptx/                  ← 실제 PPTX 스킬 코드
│   │   ├── cowork-pptx.md     ← 메인 스킬 문서
│   │   ├── README-pptx.md
│   │   ├── INSTALL.md
│   │   └── ...
│   └── [skill2]/              ← (추후 추가)
│
└── docs/                      ← 공통 문서
    ├── getting-started.md
    ├── skill-template.md
    └── best-practices.md
```

---

## 🔄 워크플로우

### 기존 스킬 사용

```
1. Claude Code 열기 (glen-claude-skills 프로젝트)
   ↓
2. Claude Code가 .claude/skills/ 자동 인식
   ↓
3. /pptx 등으로 스킬 호출
   ↓
4. 스킬 문서 및 기능 사용
```

### 새 스킬 개발

```
1. skills/[skill-name]/ 폴더 생성
   ↓
2. 스킬 개발 (README.md, INSTALL.md 등)
   ↓
3. .claude/skills/에 심링크 생성
   ↓
4. Claude Code에서 테스트
   ↓
5. README.md, SKILLS.md 업데이트
```

---

## 💡 팁

### 심링크 확인

```bash
# 심링크 목록 보기
ls -la .claude/skills/

# 심링크 대상 확인
readlink .claude/skills/pptx.md
```

### 스킬 수정

스킬을 수정하면 자동으로 Claude Code에 반영됩니다:

```bash
# skills/pptx/cowork-pptx.md 수정
# ↓
# .claude/skills/pptx.md (심링크)가 자동으로 최신 버전 가리킴
# ↓
# Claude Code에서 수정 사항 즉시 확인 가능
```

### 스킬 버전 관리

각 스킬의 버전은 독립적으로 관리됩니다:

```
skills/pptx/package.json → version: "1.0.0"
skills/pdf/package.json  → version: "1.0.0"
```

---

## 🔗 관련 문서

- **[전체 프로젝트 README](../README.md)** - 프로젝트 개요
- **[새 스킬 추가 가이드](../CONTRIBUTING.md)** - 스킬 개발 방법
- **[스킬 목록](../SKILLS.md)** - 모든 스킬 정보
- **[스킬 템플릿](../docs/skill-template.md)** - 새 스킬 템플릿
- **[Best Practices](../docs/best-practices.md)** - 개발 가이드라인

---

## 📞 도움말

### Claude Code가 스킬을 인식하지 못함

1. **파일 확인**: `.claude/skills/*.md` 파일이 있는가?
2. **심링크 확인**: `ls -la .claude/skills/` 에서 심링크가 보이는가?
3. **설정 확인**: `settings.json`의 `skills.enabled`가 `true`인가?
4. **Claude Code 재시작**: Claude Code를 다시 열기

### 스킬 추가 후 인식 안 됨

```bash
# 심링크 확인
ls -la .claude/skills/

# 심링크 재생성
cd .claude/skills
rm [skill-name].md
ln -s ../../skills/[skill-name]/[main-file].md [skill-name].md
```

---

**마지막 업데이트**: 2026-01-25
