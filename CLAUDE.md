# Glen's Claude Skills - 프로젝트 규칙

> 글로벌 CLAUDE.md(~/.claude/CLAUDE.md)의 원칙이 적용됩니다.
> 이 파일은 프로젝트 특화 규칙만 포함합니다.

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
