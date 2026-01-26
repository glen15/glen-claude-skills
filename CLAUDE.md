# Glen's Claude Skills - 프로젝트 규칙

> 글로벌 CLAUDE.md의 원칙(Tidy First, Make it Work→Right→Fast)을 기반으로 합니다.

---

## Immutability (CRITICAL)

객체를 절대 직접 수정하지 마세요:

```javascript
// ❌ Wrong
function updateConfig(config, key, value) {
  config[key] = value;
  return config;
}

// ✅ Correct
function updateConfig(config, key, value) {
  return { ...config, [key]: value };
}
```

배열도 동일하게 적용:

```javascript
// ❌ Wrong
items.push(newItem);

// ✅ Correct
const newItems = [...items, newItem];
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

### Secret Management

```javascript
// ❌ Wrong
const API_KEY = "sk-1234567890";

// ✅ Correct
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is required");
}
```

---

## 모델 선택 가이드

| 모델 | 용도 | 비용 |
|------|------|------|
| **Haiku** | 간단한 작업, 빈번한 호출, 형식 변환 | 저렴 |
| **Sonnet** | 일반 개발 작업 (기본 선택) | 중간 |
| **Opus** | 복잡한 아키텍처 결정, 깊은 분석 | 높음 |

### 선택 기준

- 반복 작업, 단순 변환 → Haiku
- 코드 작성, 버그 수정 → Sonnet
- 설계 결정, 복잡한 리팩토링 → Opus

---

## 테스트 커버리지

- **목표**: 80% 이상
- **필수**: Unit, Integration 테스트
- **권장**: E2E 테스트 (핵심 플로우)

### 테스트 우선순위

1. 핵심 비즈니스 로직
2. 외부 API 통합 지점
3. 에러 핸들링 경로

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
  // validated는 타입 안전
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
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

// 사용 예시
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

### Custom Hooks Pattern (React)

```typescript
function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[]) {
  const [state, setState] = useState<{
    loading: boolean;
    error: Error | null;
    data: T | null;
  }>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    asyncFn()
      .then(data => setState({ loading: false, error: null, data }))
      .catch(error => setState({ loading: false, error, data: null }));
  }, deps);

  return state;
}
```

---

## 프로젝트 특화

### PPTX 스킬

- 빌더 API 사용 권장
- 테마 독립 구조 유지
- `tools/` 폴더는 Python 3.x 필요
- `pptx-skill-tools/`의 CLI 도구 활용

### 스킬 구조

```
.claude/skills/<skill-name>/
├── prompt.md          # 메인 프롬프트
├── lib/               # 라이브러리 코드
├── tools/             # CLI 도구
└── examples/          # 사용 예시
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

Last Updated: 2026-01-26
