# Glen's Claude Skills - 프로젝트 가이드

이 프로젝트는 Claude Code 스킬/에이전트/커맨드를 저장하는 개인 스킬 저장소입니다.

> 코딩 원칙(Tidy First, Immutability, Guard Clauses 등)은 `~/.claude/CLAUDE.md`에 정의되어 있습니다.
> 이 파일은 **프로젝트 고유 설정**만 포함합니다.

---

## 프로젝트 구조

```
외부 공개 (git 추적)           개인 설정 (gitignore)
──────────────────           ──────────────────
.claude/agents/               .claude/settings.json
.claude/commands/             .claude/settings.local.json
.claude/skills/               .mcp.json
.claude/settings.example.json
CLAUDE.md, README.md
```

### 초기 설정

```bash
# 클론 후 settings 복사
cp .claude/settings.example.json .claude/settings.json

# 의존성 설치
cd .claude/skills/pptx && npm install
```

---

## 스킬 구조 규칙

```
.claude/skills/<skill-name>/
├── SKILL.md           # 필수: 메인 프롬프트
├── lib/               # 선택: 라이브러리 코드
├── tools/             # 선택: CLI 도구
└── examples/          # 선택: 사용 예시
```

- **Self-contained**: 심링크 없이 모든 코드가 스킬 폴더 내에 포함
- **이식성**: 폴더만 복사하면 다른 프로젝트에서 사용 가능
- 단일 파일 스킬(*.md)도 허용 (참조용 패턴/가이드)

---

## 모델 선택 가이드

| 모델 | 용도 | 비용 |
|------|------|------|
| **Haiku 4.5** | 간단한 작업, 빈번한 호출, 형식 변환 | 저렴 |
| **Sonnet 4.5** | 일반 개발 작업 (기본 선택) | 중간 |
| **Opus 4.6** | 복잡한 아키텍처, 대규모 코드베이스, Agent Teams | 높음 |

### Opus 4.6 특성
- 1M 토큰 컨텍스트 (베타): 대규모 코드베이스에서 컨텍스트 유지
- 향상된 에이전틱 코딩: 더 긴 세션, 자가 수정 능력
- Agent Teams 지원: 멀티에이전트 협업

---

## Effort Tuning

`/model` + 좌/우 화살표로 모델의 사고 깊이를 조절:

| 수준 | 용도 | 토큰 비용 |
|------|------|----------|
| **Low** | 간단한 수정, 포맷팅, 오타 | 최소 |
| **Medium** | 일반적인 코드 작성 | 보통 |
| **High** (기본) | 복잡한 로직, 리팩토링 | 높음 |
| **Max** | 아키텍처 결정, 어려운 디버깅 | 최대 |

### 선택 가이드
- tidy 커밋 → Low/Medium
- feat/fix → High
- 아키텍처/디버깅 → Max

---

Last Updated: 2026-02-06
