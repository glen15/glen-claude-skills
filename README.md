# Glen's Claude Skills

Claude Code 개인 스킬 저장소

## 구조

```
glen-claude-skills/
├── CLAUDE.md                    # 프로젝트 규칙 (Immutability, 보안 등)
└── .claude/
    ├── settings.json            # 설정 + hooks
    ├── agents/                  # 에이전트 프롬프트
    ├── commands/                # 슬래시 커맨드
    └── skills/                  # 스킬
```

## 에이전트 (9개)

| 에이전트 | 용도 |
|----------|------|
| planner | 구현 계획 전문가 |
| tdd-guide | TDD 워크플로우 |
| architect | 시스템 아키텍처 |
| code-reviewer | 코드 품질/보안 리뷰 |
| build-error-resolver | 빌드 에러 해결 |
| doc-updater | 문서/코드맵 업데이트 |
| e2e-runner | Playwright E2E 테스트 |
| refactor-cleaner | 죽은 코드 정리 |
| security-reviewer | 보안 취약점 탐지 |

## 커맨드 (9개)

| 커맨드 | 용도 |
|--------|------|
| /plan | 구현 계획 생성 |
| /tdd | TDD 워크플로우 적용 |
| /code-review | 코드 품질/보안 리뷰 |
| /e2e | E2E 테스트 생성/실행 |
| /build-fix | 빌드/타입 에러 해결 |
| /refactor-clean | 죽은 코드 정리 |
| /test-coverage | 테스트 커버리지 분석 |
| /update-codemaps | 코드맵 업데이트 |
| /update-docs | 문서 동기화 |

## 스킬 (8개)

| 스킬 | 용도 |
|------|------|
| pptx | PowerPoint 생성/편집 |
| coding-standards | TypeScript/React 코딩 표준 |
| backend-patterns | 백엔드 아키텍처 패턴 |
| frontend-patterns | React/Next.js 패턴 |
| clickhouse-io | ClickHouse 데이터베이스 |
| security-review/ | 보안 리뷰 워크플로우 |
| tdd-workflow/ | TDD 워크플로우 |
| project-guidelines-example | 프로젝트 가이드라인 예시 |

## Hooks

settings.json에 정의된 자동화 훅:

- **PreToolUse**: dev 서버 tmux 강제, git push 리뷰, .md 생성 차단
- **PostToolUse**: Prettier 자동 포맷, TypeScript 체크, console.log 경고
- **Stop**: 세션 종료 전 console.log 감사

## 사용법

```bash
cd ~/Desktop/work/glen-claude-skills
claude
```

커맨드 사용:
```
/plan 새 기능 구현 계획
/tdd 함수 테스트 작성
/code-review
```

---

**마지막 업데이트**: 2026-01-26
