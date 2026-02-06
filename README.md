# Glen's Claude Skills

Claude Code 전체 환경을 저장하는 마스터 저장소.
새 머신에서 `./setup.sh` 한 줄로 글로벌 설정 + 스킬셋 전체를 복원합니다.

## 구조

```
glen-claude-skills/
├── setup.sh                     # 새 머신 셋업 스크립트
├── CLAUDE.md                    # 코딩 원칙 (→ ~/.claude/CLAUDE.md 배포)
├── settings.example.json        # 글로벌 설정 템플릿 (→ ~/.claude/settings.json)
├── mcp.example.json             # MCP 서버 템플릿 (→ ~/.claude/mcp.json)
│
└── .claude/                     # 스킬셋 본체 (→ ~/.claude/ 에 배포)
    ├── settings.example.json    # 프로젝트 설정 템플릿
    ├── agents/                  # 에이전트 (9개)
    ├── commands/                # 슬래시 커맨드 (14개)
    └── skills/                  # 스킬 (6개)
```

---

## 새 머신 셋업

```bash
git clone <repo-url> && cd glen-claude-skills
./setup.sh
```

`setup.sh`가 수행하는 작업:
1. `CLAUDE.md` → `~/.claude/CLAUDE.md`
2. `settings.example.json` → `~/.claude/settings.json` (없을 때만)
3. `mcp.example.json` → `~/.claude/mcp.json` (없을 때만)
4. `.claude/agents/`, `commands/`, `skills/` → `~/.claude/` 에 복사
5. 프로젝트 `settings.json` 생성 + npm 의존성 설치

> 설정 강제 덮어쓰기: `./setup.sh --force`

---

## 사전 요구사항

### 필수

| 도구 | 용도 | 설치 (macOS) |
|------|------|--------------|
| **jq** | 훅에서 JSON 파싱 | `brew install jq` |
| **tmux** | dev 서버 백그라운드 실행 | `brew install tmux` |
| **git** | 버전 관리, 훅 | 기본 설치됨 |
| **Node.js** | JS 스킬 실행 | `brew install node` |

### 권장

| 도구 | 용도 | 설치 (macOS) |
|------|------|--------------|
| **prettier** | JS/TS 자동 포맷 (훅) | `npm install -g prettier` |
| **Python 3** | pptx tools | `brew install python` |

### 한 번에 설치 (macOS)

```bash
brew install jq tmux node python
npm install -g prettier
```

---

## npm 스크립트

```bash
npm run typecheck    # TypeScript 타입 검사
npm run lint:dead    # knip 죽은 코드 분석
npm run lint:deps    # depcheck 의존성 분석
```

---

## 에이전트 (9개)

| 에이전트 | 역할 |
|---------|------|
| `planner` | 복잡한 기능 구현 전 단계별 계획 수립 |
| `tdd-guide` | TDD Red→Green→Refactor 사이클 안내 |
| `architect` | 시스템 아키텍처 설계, 기술 선택 |
| `code-reviewer` | 코드 품질/보안 리뷰 |
| `build-error-resolver` | TypeScript/빌드 에러 분석 및 해결 |
| `doc-updater` | 코드 변경에 따른 문서 자동 업데이트 |
| `e2e-runner` | Playwright E2E 테스트 생성/실행 |
| `refactor-cleaner` | 죽은 코드 탐지 및 안전한 제거 |
| `security-reviewer` | OWASP Top 10 기반 보안 검토 |

---

## 커맨드 (14개)

### 단일 세션 vs Swarm

| 상황 | 단일 세션 | Swarm |
|------|----------|-------|
| 코드 리뷰 | `/code-review` (3개 미만 파일) | `/swarm-review` (3개 이상 파일) |
| 기능 구현 | `/tdd` (단일 레이어) | `/swarm-feature` (크로스레이어) |
| 리팩토링 | `/refactor-clean` (단일 모듈) | `/swarm-refactor` (다수 모듈) |
| 버그 수정 | `/build-fix` (빌드 에러) | `/swarm-debug` (원인 불명 버그) |
| 리서치 | 직접 질문 | `/swarm-research` (다관점 비교) |

### 기본 커맨드

| 커맨드 | 설명 |
|--------|------|
| `/plan` | 구현 계획 생성 |
| `/tdd` | TDD 워크플로우 적용 |
| `/code-review` | 코드 품질/보안 리뷰 |
| `/e2e` | E2E 테스트 생성/실행 |
| `/build-fix` | 빌드/타입 에러 해결 |
| `/refactor-clean` | 죽은 코드 정리 |
| `/test-coverage` | 테스트 커버리지 분석 |
| `/update-codemaps` | 코드맵 업데이트 |
| `/update-docs` | 문서 동기화 |

### Swarm 커맨드 (Agent Teams)

| 커맨드 | 설명 |
|--------|------|
| `/swarm-review` | 병렬 멀티렌즈 코드 리뷰 (보안/성능/품질) |
| `/swarm-debug` | 경쟁 가설 디버깅 |
| `/swarm-feature` | 크로스레이어 기능 병렬 개발 |
| `/swarm-research` | 다관점 병렬 기술 리서치 |
| `/swarm-refactor` | 모듈별 병렬 리팩토링 |

---

## 스킬 (6개)

| 스킬 | 설명 |
|------|------|
| `pptx/` | PowerPoint 생성/편집 (Node.js 빌더 API) |
| `swarm-patterns.md` | Agent Teams 활용 패턴/템플릿 |
| `backend-patterns.md` | 백엔드 아키텍처 패턴 (Repository, Service Layer) |
| `frontend-patterns.md` | React/Next.js 패턴 (Custom Hooks, 컴포넌트 구조) |
| `security-review/` | OWASP Top 10 보안 리뷰 워크플로우 |
| `tdd-workflow/` | TDD Red-Green-Refactor 실천 가이드 |

---

## Hooks

`settings.example.json`에 정의된 자동화 훅:

| 훅 | 트리거 | 동작 |
|----|--------|------|
| PreToolUse/Bash | git push | 사용자 확인 프롬프트 |
| PreToolUse/Write | .md 파일 생성 | 불필요한 문서 차단 |
| PostToolUse/Bash | gh pr create | PR URL 및 리뷰 명령어 출력 |
| PostToolUse/Edit | JS/TS 파일 수정 | Prettier 포맷 + 타입 체크 + console.log 경고 |
| Stop | 세션 종료 | console.log 최종 감사 |

---

## MCP 서버

`mcp.example.json` 템플릿:

| MCP | 용도 |
|-----|------|
| github | GitHub PR, 이슈, 레포 관리 |
| firecrawl | 웹 스크래핑/크롤링 |
| supabase | Supabase DB 작업 |
| memory | 세션 간 메모리 유지 |
| sequential-thinking | 추론 체인 |
| context7 | 실시간 문서 조회 |
| magic | Magic UI 컴포넌트 |
| filesystem | 파일시스템 접근 |

---

## 플러그인

```bash
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude plugin marketplace add https://github.com/jarrodwatts/claude-hud
claude plugin marketplace add https://github.com/makenotion/claude-code-notion-plugin
claude plugin install claude-hud@claude-hud
claude plugin install notion-workspace-plugin@notion-plugin-marketplace
```

---

**마지막 업데이트**: 2026-02-06
