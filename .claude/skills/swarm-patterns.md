# Agent Teams (Swarm) 활용 패턴

Agent Teams를 효과적으로 활용하기 위한 가이드.

---

## Agent Teams vs Sub-Agents vs Single Session

### Agent Teams (Swarm)
- 토론/협업이 필요한 복잡한 작업
- 멀티파일 리팩토링, 병렬 리뷰, 경쟁 디버깅
- 서로 다른 관점에서 동시에 작업
- 팀원 간 결과 공유 및 반박 가능

### Sub-Agents (Task 도구)
- 결과만 필요한 집중 작업
- 코드 탐색, 파일 검색, 단일 파일 분석
- 독립적인 조사/리서치
- 메인 컨텍스트 보호

### Single Session
- 순차적 작업, 같은 파일 편집
- 간단한 수정, 단일 파일 변경
- 빠른 피드백이 필요한 작업

---

## 팀 구성 템플릿

### 1. 코드 리뷰 팀 (`/swarm-review`, 3명)

| 역할 | 에이전트 | 초점 |
|------|----------|------|
| Security Reviewer | `security-reviewer` | OWASP Top 10, 인증/인가, 입력 검증 |
| Performance Reviewer | `code-reviewer` + 성능 역할 | N+1 쿼리, 메모리 누수, 시간 복잡도 |
| Quality Reviewer | `code-reviewer` + 품질 역할 | 테스트 커버리지, 가독성, 유지보수성 |

### 2. 기능 개발 팀 (`/swarm-feature`, 3-4명)

| 역할 | 에이전트 | 참조 스킬 |
|------|----------|-----------|
| Frontend 역할 | `code-reviewer` + 프론트엔드 지시 | `frontend-patterns.md` |
| Backend 역할 | `code-reviewer` + 백엔드 지시 | `backend-patterns.md` |
| Test 역할 | `tdd-guide` | `tdd-workflow/SKILL.md` |
| (선택) 설계 역할 | `architect` | 복잡한 인터페이스 설계 시 |

### 3. 디버깅 팀 (`/swarm-debug`, 3-5명)

| 에러 유형 | 에이전트 | 가설 초점 |
|-----------|----------|-----------|
| 빌드/타입 에러 | `build-error-resolver` | TypeScript, 번들러 문제 |
| 로직/런타임 에러 | `code-reviewer` | 코드 흐름, 상태 관리 |
| 아키텍처 문제 | `architect` | 구조적 원인, 의존성 |
| 보안 취약점 | `security-reviewer` | 인증/인가, 입력 검증 |
| (선택) 종합 조율 | `planner` | 가설 정리, 증거 종합 |

버그 성격에 맞는 3-5명을 선택. 과학적 토론 방식으로 증거 기반 합의 도출.

### 4. 리팩토링 팀 (`/swarm-refactor`)

| 역할 | 에이전트 | 초점 |
|------|----------|------|
| 구조 분석 | `architect` | 범위 설계, 인터페이스 정의 |
| 모듈 리팩토링 | `refactor-cleaner` | 독립 모듈별 정리 |
| 검증 | `code-reviewer` | 결과 품질 검토 |

### 5. 리서치 팀 (`/swarm-research`, 3-4명)

| 역할 | 에이전트 | 초점 |
|------|----------|------|
| 공식 문서 조사 | `general-purpose` | 최신 문서, API 레퍼런스 |
| 커뮤니티 사례 | `general-purpose` | 실제 사용 사례, 장단점 |
| 대안 비교 | `general-purpose` | 경쟁 기술 비교 분석 |
| (선택) 아키텍처 평가 | `architect` | 시스템 설계 영향 분석 |

---

## 태스크 분해 가이드라인

### 적절한 태스크 크기
- 명확한 산출물이 있는 독립 단위
- 팀원당 5-6개 태스크가 이상적
- 한 태스크가 1-2개 파일을 다루도록 분리

### 파일 소유권
- 두 팀원이 같은 파일을 편집하면 안 됨
- 인터페이스/계약을 먼저 합의 후 병렬 작업
- 공유 타입 정의는 리드가 먼저 생성

### Delegate Mode 활용
- `Shift+Tab`으로 리드가 코드 작성하지 않도록 제한
- 리드는 조율/검토에만 집중
- 팀원에게 명확한 지시와 컨텍스트 전달

### Plan Approval 활용
- 큰 작업은 각 팀원이 구현 전 계획 제출
- 리드가 검토 후 승인/반려
- 인터페이스 호환성을 사전에 검증

---

## 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| `Shift+Up/Down` | 팀원 선택 |
| `Shift+Tab` | Delegate 모드 토글 |
| `Ctrl+T` | 태스크 리스트 토글 |
| `Enter` | 팀원 세션 보기 |
| `Escape` | 팀원 현재 턴 중단 |

---

## Hooks 자동 적용

기존 hooks 설정이 각 팀원의 작업에도 자동 적용됨:
- **Edit hook**: Prettier 포맷팅 + TypeScript 타입 체크 + console.log 감지
- **Bash hook**: git push 차단, dev 서버 tmux 강제
- **Stop hook**: 세션 종료 전 console.log 최종 감사

별도 품질 관리 설정 없이 팀원별 코드 품질이 자동 보장됨.

---

## 기존 커맨드와의 관계

| 단일 세션 | Swarm | 분기 기준 |
|----------|-------|----------|
| `/code-review` | `/swarm-review` | 변경 파일 3개 이상 |
| `/tdd` | `/swarm-feature` | 2개 이상 레이어 |
| `/refactor-clean` | `/swarm-refactor` | 2개 이상 모듈 |
| `/build-fix` | `/swarm-debug` | 원인 불명/복합 버그 |

---

## 안티패턴

- 단순 작업에 팀을 구성하지 말 것 (오버헤드 > 이득)
- 같은 파일을 여러 팀원이 편집하지 말 것 (충돌)
- 팀원에게 모호한 지시를 내리지 말 것
- 결과 종합 없이 팀을 해산하지 말 것
