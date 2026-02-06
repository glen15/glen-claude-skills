# Glen's Claude Skills

Claude Code 개인 스킬 저장소

## 구조

```
glen-claude-skills/
├── CLAUDE.md                    # 프로젝트 규칙 (Immutability, 보안 등)
├── package.json                 # 의존성 + npm 스크립트
├── tsconfig.json                # TypeScript 설정
├── vitest.config.ts             # Vitest 테스트 설정
├── playwright.config.ts         # Playwright E2E 설정
├── tests/                       # 단위 테스트
├── e2e/                         # E2E 테스트
├── mcp-configs/                 # MCP 서버 설정 템플릿
├── plugins/                     # 플러그인 가이드
└── .claude/
    ├── settings.json            # 설정 + hooks
    ├── settings.local.json      # MCP 서버 (gitignore)
    ├── agents/                  # 에이전트 프롬프트
    ├── commands/                # 슬래시 커맨드
    └── skills/                  # 스킬
```

---

## 사전 요구사항

이 스킬셋을 사용하기 위해 필요한 도구들입니다.

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

### 설치 확인

```bash
# 필수 도구 확인
jq --version
tmux -V
git --version
node --version

# 권장 도구 확인
prettier --version
python3 --version
```

### 한 번에 설치 (macOS)

```bash
brew install jq tmux node python
npm install -g prettier
```

---

## 개발 환경

### 설치

```bash
npm install
npx playwright install  # E2E 브라우저 설치
```

### npm 스크립트

| 스크립트 | 설명 |
|---------|------|
| `npm run test` | Vitest 테스트 실행 |
| `npm run test:coverage` | 커버리지 포함 테스트 |
| `npm run e2e` | Playwright E2E 테스트 |
| `npm run e2e:ui` | Playwright UI 모드 |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run lint:dead` | knip 죽은 코드 분석 |
| `npm run lint:deps` | depcheck 의존성 분석 |

---

## 에이전트 (9개)

에이전트는 특정 작업에 특화된 전문가 역할을 수행합니다.

### planner
**구현 계획 전문가**

복잡한 기능 구현 전 단계별 계획을 수립합니다.
- 파일 구조 분석
- 의존성 파악
- 구현 순서 제안

```
사용자: "사용자 인증 기능을 추가하고 싶어"
→ planner가 JWT, 세션, OAuth 등 옵션 분석 후 단계별 계획 제시
```

### tdd-guide
**TDD 워크플로우 가이드**

Test-Driven Development 방식으로 코드 작성을 안내합니다.
- Red → Green → Refactor 사이클
- 테스트 케이스 우선 작성
- 점진적 구현

```
사용자: "calculateTotal 함수를 TDD로 만들어줘"
→ 1. 실패하는 테스트 작성
→ 2. 최소한의 구현
→ 3. 리팩토링
```

### architect
**시스템 아키텍처 설계**

대규모 시스템 구조와 기술 선택을 도와줍니다.
- 컴포넌트 분리 전략
- 데이터 흐름 설계
- 기술 스택 선정

```
사용자: "마이크로서비스로 전환하려면?"
→ 도메인 분리, API Gateway, 서비스 간 통신 방식 제안
```

### code-reviewer
**코드 품질/보안 리뷰**

작성된 코드의 품질과 보안을 검토합니다.
- 코드 스타일 검사
- 보안 취약점 탐지
- 성능 이슈 발견

```
사용자: "방금 작성한 코드 리뷰해줘"
→ git diff 분석 후 심각도별 이슈 리포트
```

### build-error-resolver
**빌드 에러 해결**

TypeScript, ESLint 등 빌드 에러를 분석하고 해결합니다.
- 에러 메시지 해석
- 근본 원인 파악
- 수정 방안 제시

```
사용자: "타입 에러가 50개나 나와"
→ 에러 패턴 분석 후 우선순위별 해결책 제시
```

### doc-updater
**문서/코드맵 업데이트**

코드 변경에 따른 문서를 자동 업데이트합니다.
- README 동기화
- API 문서 갱신
- 코드맵 업데이트

```
사용자: "API 변경했는데 문서도 업데이트해줘"
→ 변경된 엔드포인트 감지 후 문서 자동 수정
```

### e2e-runner
**Playwright E2E 테스트**

End-to-End 테스트를 생성하고 실행합니다.
- 사용자 여정 테스트 작성
- Page Object Model 패턴
- 불안정 테스트 관리

```
사용자: "로그인 플로우 E2E 테스트 만들어줘"
→ Playwright 테스트 코드 생성 + 실행
```

### refactor-cleaner
**죽은 코드 정리**

사용하지 않는 코드를 찾아 제거합니다.
- 미사용 import 제거
- 죽은 함수/변수 탐지
- 안전한 삭제 확인

```
사용자: "이 파일에서 안 쓰는 코드 정리해줘"
→ 사용처 분석 후 안전하게 제거
```

### security-reviewer
**보안 취약점 탐지**

OWASP Top 10 기반 보안 검토를 수행합니다.
- 하드코딩된 시크릿 탐지
- SQL/XSS 인젝션 검사
- 인증/인가 취약점

```
사용자: "이 API 엔드포인트 보안 검토해줘"
→ 취약점 분석 + 수정 코드 예시 제공
```

---

## 커맨드 (14개)

슬래시 커맨드로 빠르게 특정 작업을 실행합니다.

### 단일 세션 vs Swarm

| 상황 | 단일 세션 | Swarm |
|------|----------|-------|
| 코드 리뷰 | `/code-review` (3개 미만 파일) | `/swarm-review` (3개 이상 파일) |
| 기능 구현 | `/tdd` (단일 레이어) | `/swarm-feature` (크로스레이어) |
| 리팩토링 | `/refactor-clean` (단일 모듈) | `/swarm-refactor` (다수 모듈) |
| 버그 수정 | `/build-fix` (빌드 에러) | `/swarm-debug` (원인 불명 버그) |
| 리서치 | 직접 질문 | `/swarm-research` (다관점 비교) |

### /plan
**구현 계획 생성**

```bash
/plan 사용자 대시보드 기능 추가
/plan OAuth 2.0 인증 구현
```

### /tdd
**TDD 워크플로우 적용**

```bash
/tdd calculateDiscount 함수
/tdd UserService 클래스
```

### /code-review
**코드 품질/보안 리뷰**

```bash
/code-review              # 최근 변경사항 리뷰
/code-review src/api/     # 특정 폴더 리뷰
```

### /e2e
**E2E 테스트 생성/실행**

```bash
/e2e 로그인 플로우 테스트
/e2e 결제 프로세스 테스트
```

### /build-fix
**빌드/타입 에러 해결**

```bash
/build-fix                # 현재 빌드 에러 해결
/build-fix --strict       # 엄격 모드로 해결
```

### /refactor-clean
**죽은 코드 정리**

```bash
/refactor-clean src/utils/
/refactor-clean --dry-run  # 미리보기만
```

### /test-coverage
**테스트 커버리지 분석**

```bash
/test-coverage
/test-coverage src/services/
```

### /update-codemaps
**코드맵 업데이트**

```bash
/update-codemaps          # 전체 코드맵 갱신
```

### /update-docs
**문서 동기화**

```bash
/update-docs              # README 등 문서 업데이트
/update-docs --api        # API 문서만
```

### /swarm-review
**병렬 멀티렌즈 코드 리뷰** (Agent Teams)

3명의 리뷰어(보안/성능/품질)가 동시에 코드를 검토합니다.
기존 `security-reviewer`, `code-reviewer` 에이전트를 활용합니다.

```bash
/swarm-review             # 변경사항 3렌즈 병렬 리뷰
```

### /swarm-debug
**경쟁 가설 디버깅** (Agent Teams)

3-5명이 서로 다른 가설을 검증하고 반박하여 근본 원인을 찾습니다.

```bash
/swarm-debug              # 원인 불명 버그 분석
```

### /swarm-feature
**크로스레이어 기능 개발** (Agent Teams)

Frontend/Backend/Test 에이전트가 병렬로 기능을 구현합니다.
각 팀원이 `frontend-patterns`, `backend-patterns`, `tdd-workflow` 스킬을 참조합니다.

```bash
/swarm-feature            # 풀스택 기능 병렬 개발
```

### /swarm-research
**병렬 기술 리서치** (Agent Teams)

여러 에이전트가 서로 다른 소스/관점에서 동시에 조사합니다.

```bash
/swarm-research           # 기술 비교/의사결정 리서치
```

### /swarm-refactor
**모듈별 병렬 리팩토링** (Agent Teams)

각 팀원에게 독립 모듈을 할당하여 병렬로 리팩토링합니다.

```bash
/swarm-refactor           # 대규모 병렬 리팩토링
```

---

## 스킬 (5개)

스킬은 특정 도메인의 지식과 패턴을 제공합니다.

### pptx
**PowerPoint 생성/편집**

Node.js 기반 프레젠테이션 자동 생성 도구입니다.

```javascript
// 빌더 API 사용
const pres = createPresentation('nxtcloud-v2')
  .addTitleSlide({ title: '제목', subtitle: '부제' })
  .addContentSlide({ title: '내용', bullets: ['항목1', '항목2'] })
  .save('output.pptx');
```

**구성:**
- `lib/` - 핵심 라이브러리
- `themes/` - nxtcloud-v1, nxtcloud-v2 테마
- `tools/` - Python 유틸리티 (슬라이드 조작)

### swarm-patterns
**Agent Teams 활용 가이드**

Swarm 모드 활용 패턴을 정의합니다.
- Agent Teams vs Sub-Agents vs Single Session 판단 기준
- 팀 구성 템플릿 (리뷰/개발/디버깅)
- 태스크 분해/파일 소유권 가이드라인
- 기존 커맨드와의 분기 기준
- Hooks 자동 적용 안내

### backend-patterns
**백엔드 아키텍처 패턴**

서버 사이드 개발 패턴을 제공합니다.
- Repository 패턴
- Service Layer
- Error Handling

```typescript
// Repository 패턴 예시
interface Repository<T> {
  findAll(): Promise<T[]>
  findById(id: string): Promise<T | null>
  create(data: CreateDto): Promise<T>
  update(id: string, data: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}
```

### frontend-patterns
**React/Next.js 패턴**

프론트엔드 개발 패턴을 제공합니다.
- 컴포넌트 구조
- 상태 관리
- Custom Hooks

```typescript
// Custom Hook 패턴 예시
function useAsync<T>(asyncFn: () => Promise<T>) {
  const [state, setState] = useState<{
    data: T | null
    loading: boolean
    error: Error | null
  }>({ data: null, loading: true, error: null })
  // ...
}
```

### security-review/
**보안 리뷰 워크플로우**

체계적인 보안 검토 프로세스를 정의합니다.
- OWASP Top 10 체크리스트
- 코드 리뷰 가이드
- 취약점 리포팅 형식

### tdd-workflow/
**TDD 워크플로우**

Test-Driven Development 실천 가이드입니다.
- Red-Green-Refactor 사이클
- 테스트 작성 패턴
- Mock/Stub 사용법

---

## Agent Teams (Swarm)

Opus 4.6과 함께 도입된 멀티에이전트 협업 기능입니다.

**활성화**: `settings.json`의 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

**키보드 단축키:**

| 단축키 | 기능 |
|--------|------|
| `Shift+Up/Down` | 팀원 선택 |
| `Shift+Tab` | Delegate 모드 토글 |
| `Ctrl+T` | 태스크 리스트 토글 |
| `Enter` | 팀원 세션 보기 |
| `Escape` | 팀원 현재 턴 중단 |

자세한 활용 패턴은 `swarm-patterns` 스킬 참고.

---

## Hooks

`settings.json`에 정의된 자동화 훅:

### PreToolUse
- dev 서버는 tmux에서만 실행
- git push 전 확인 프롬프트
- 불필요한 .md 파일 생성 차단 (`.skip-md-hook` 파일로 해제 가능)

### PostToolUse
- JS/TS 파일 자동 Prettier 포맷
- TypeScript 타입 체크
- console.log 경고

### Stop
- 세션 종료 전 console.log 감사

---

## MCP 서버 설정

`mcp-configs/mcp-servers.example.json` 템플릿 제공:

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

**설정 방법:**
```bash
cp mcp-configs/mcp-servers.example.json mcp-configs/mcp-servers.json
# 키 입력 후 .claude/settings.local.json에 병합
```

---

## 플러그인

`plugins/README.md` 참고:

```bash
# 마켓플레이스 추가
claude plugin marketplace add https://github.com/anthropics/claude-plugins-official

# 플러그인 설치
claude plugin install typescript-lsp@claude-plugins-official
```

> **참고**: 이 저장소의 에이전트들은 플러그인 없이 Claude Code 내장 도구만으로 작동합니다.

---

## 사용법

```bash
cd ~/Desktop/work/glen-claude-skills
claude
```

**커맨드 예시:**
```bash
/plan 새 기능 구현 계획
/tdd calculateTotal 함수 테스트
/code-review
/e2e 로그인 플로우
```

---

**마지막 업데이트**: 2026-02-06
