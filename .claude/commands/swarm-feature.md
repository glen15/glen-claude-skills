# Swarm 기능 개발

크로스레이어 기능의 병렬 개발을 수행합니다.

## 절차

1. **기능 요구사항 분석 및 분해**:
   - 기능을 레이어별 독립 태스크로 분리
   - 공유 인터페이스/타입을 먼저 정의

2. **레이어별 팀 구성** (기존 에이전트 + 스킬 역할 부여):
   - **Frontend 역할** (`subagent_type: code-reviewer`): UI 컴포넌트, 상태 관리. `frontend-patterns.md` 스킬을 참고하여 프론트엔드 관점으로 작업하도록 지시
   - **Backend 역할** (`subagent_type: code-reviewer`): API/비즈니스 로직. `backend-patterns.md` 스킬을 참고하여 백엔드 관점으로 작업하도록 지시
   - **Test 역할** (`subagent_type: tdd-guide`): 단위/통합/E2E 테스트. `tdd-workflow/SKILL.md` 참고
   - **(선택) 설계 역할** (`subagent_type: architect`): 복잡한 인터페이스 설계가 필요할 때

3. **Plan Approval 필수**:
   - 각 팀원이 구현 전 계획 제출
   - 리드가 인터페이스 호환성 검토 후 승인/반려
   - 공유 타입/계약은 리드가 먼저 생성

4. **파일 소유권 명확히 분리**:
   - 두 팀원이 같은 파일을 편집하지 않도록
   - 경계 지점(API 계약)을 먼저 합의

5. **전체 통합 테스트로 마무리**

## 출력 형식

```
## 기능 개발 결과

### 구현 완료
- Frontend: (변경 파일 목록)
- Backend: (변경 파일 목록)
- Tests: (테스트 파일 목록)

### 통합 테스트 결과
(통과/실패 여부)

### 후속 작업
- (있다면)
```

## 참고
- 단일 레이어 변경은 `/tdd` (단일 세션)가 더 효율적
- Delegate 모드로 리드가 코드 작성하지 않도록 제한
- Tidy First: 기존 코드 정리 후 기능 추가
- Hooks(Prettier, TypeScript 체크)가 각 팀원의 편집에 자동 적용됨
