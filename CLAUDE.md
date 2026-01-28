# Glen's Claude Skills - 프로젝트 규칙

> 이 파일은 모든 프로젝트에 적용되는 Glen의 개인 코딩 원칙입니다.

---

## 핵심 개발 철학

### 1. Tidy First (Kent Beck)

**"정리를 먼저, 그 다음 기능"**

```
작업 순서:
1. Tidy (정리)    - 코드를 이해하기 쉽게 만들기
2. Feature (기능)  - 새로운 기능 추가
3. Tidy (정리)    - 추가한 코드 정리
```

**절대 규칙**:
- 정리와 기능을 절대 섞지 말 것
- 한 커밋에 여러 목적을 담지 말 것
- 작게 정리하라 (5-15분 단위)
- 코드가 이해하기 어려우면 먼저 정리

**Boy Scout Rule**:
파일을 열었다면 최소 한 가지는 개선하고 나갈 것

---

### 2. Make it Work → Make it Right → Make it Fast

**이 순서를 반드시 지키며, 절대 건너뛰지 않습니다.**

```
1. Make it work (동작하게)
   - 일단 기능이 동작하도록 만들기
   - 테스트 통과가 최우선
   - 완벽하지 않아도 OK

2. Make it right (올바르게)
   - 코드를 이해하기 쉽게 정리
   - Tidy First 원칙 적용
   - 리팩토링 및 구조 개선

3. Make it fast (빠르게)
   - 성능 측정 먼저! (추측하지 말 것)
   - 병목 지점 파악
   - 필요한 곳만 최적화
```

---

## 커밋 원칙

### 커밋 메시지는 반드시 한글로 작성

```bash
# Good
git commit -m "tidy: 복잡한 조건문을 가드 절로 변경"
git commit -m "feat: 사용자 알림 기능 추가"
git commit -m "fix: null 포인터 예외 수정"

# Bad
git commit -m "feat: add user notification"  # 영어 사용
git commit -m "refactoring and add feature"  # 정리와 기능 섞음
```

### 커밋 타입

```bash
tidy:  # 코드 정리 (기능 변경 없음, Tidy First)
feat:  # 새 기능 추가 (Make it work)
fix:   # 버그 수정
test:  # 테스트 추가/수정
perf:  # 성능 최적화 (Make it fast)
docs:  # 문서 업데이트
style: # 코드 포맷팅 (의미 변경 없음)
chore: # 빌드/설정 변경
```

---

## 코드 작성 원칙

### 함수 가이드라인
- 함수는 **20줄 이하**로 유지
- **한 가지 일만** 수행
- **Guard clauses** 사용하여 중첩 최소화 (최대 3단계)
- **의미있는 이름** (동사 + 명사)
- 주석보다는 **자명한 코드**

### Guard Clauses (조기 리턴)

```typescript
// Good: Guard clauses
function createUser(data: UserInput) {
  if (!data.email) throw new Error('Email required');
  if (!isValidEmail(data.email)) throw new Error('Invalid email');
  if (data.age < 18) throw new Error('Must be 18+');

  return saveUser(data);
}
```

---

## Immutability (CRITICAL)

객체를 절대 직접 수정하지 마세요:

```javascript
// Wrong
function updateConfig(config, key, value) {
  config[key] = value;
  return config;
}

// Correct
function updateConfig(config, key, value) {
  return { ...config, [key]: value };
}
```

---

## 파일 크기 제한

| 기준 | 줄 수 |
|------|-------|
| **권장** | 200-400줄 |
| **허용** | 400-600줄 |
| **최대** | 800줄 |

초과 시 → 파일 분리 필수

---

## 보안 체크리스트 (커밋 전 필수)

```
□ 하드코딩된 시크릿 없음 (API 키, 비밀번호)
□ 사용자 입력 검증됨
□ 에러 메시지에 민감 정보 노출 없음
□ .env 파일이 .gitignore에 포함됨
□ 민감한 데이터 로깅하지 않음
```

---

## 모델 선택 가이드

| 모델 | 용도 | 비용 |
|------|------|------|
| **Haiku** | 간단한 작업, 빈번한 호출, 형식 변환 | 저렴 |
| **Sonnet** | 일반 개발 작업 (기본 선택) | 중간 |
| **Opus** | 복잡한 아키텍처 결정, 깊은 분석 | 높음 |

---

## 테스트 커버리지

- **목표**: 80% 이상
- **필수**: Unit, Integration 테스트
- **권장**: E2E 테스트 (핵심 플로우)

---

## Input Validation

Zod 또는 유사 라이브러리 사용 권장:

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(0).max(150),
  name: z.string().min(1).max(100),
});

function createUser(input: unknown) {
  const validated = UserSchema.parse(input);
  return saveUser(validated);
}
```

---

## 공통 패턴

### API Response Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function success<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

function failure(error: string): ApiResponse<never> {
  return { success: false, error };
}
```

### Repository Pattern

```typescript
interface Repository<T> {
  findAll(filters?: Filters): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: CreateDto): Promise<T>;
  update(id: string, data: UpdateDto): Promise<T>;
  delete(id: string): Promise<void>;
}
```

---

## Code Quality Checklist

커밋 전 자가 점검:

```
□ Immutability 원칙 준수
□ 파일 크기 800줄 미만
□ 함수 크기 20줄 미만
□ 보안 체크리스트 통과
□ 테스트 작성 완료
□ 타입 안전성 확보 (TypeScript)
```

---

## 프로젝트 특화

### PPTX 스킬

- 빌더 API 사용 권장
- 테마 독립 구조 유지
- `tools/` 폴더는 Python 3.x 필요

### 스킬 구조

```
.claude/skills/<skill-name>/
├── SKILL.md           # 메인 프롬프트
├── lib/               # 라이브러리 코드
├── tools/             # CLI 도구
└── examples/          # 사용 예시
```

---

Last Updated: 2026-01-29
