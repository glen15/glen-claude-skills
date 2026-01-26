# 시작하기

Glen's Claude Skills를 처음 사용하는 분들을 위한 가이드입니다.

---

## 🎯 이것은 무엇인가?

**Glen's Claude Skills**는 Claude Code를 확장하는 스킬들의 중앙 저장소입니다.

- 📚 **여러 스킬 관리**: PowerPoint 등 다양한 작업 자동화
- 🔧 **자체 포함**: 각 스킬은 독립적으로 사용 가능 (self-contained)
- ✨ **확장 가능**: 새로운 스킬을 쉽게 추가 가능

---

## 🚀 5분 안에 시작하기

### 1단계: 프로젝트 열기

```bash
cd /Users/glen/Desktop/work/glen-claude-skills
```

### 2단계: 스킬 설치

```bash
cd .claude/skills/pptx
npm install
```

### 3단계: 사용

Claude Code에서:
```
/pptx

새로운 프레젠테이션을 만들어주세요.
```

---

## 📂 폴더 구조

```
glen-claude-skills/
├── .claude/
│   └── skills/
│       └── pptx/           ← PPTX 스킬
│           ├── SKILL.md
│           ├── lib/        ← 빌더 API
│           └── tools/      ← 편집 도구
├── contents/               ← PPT 소스
└── docs/                   ← 공통 문서
```

---

## 🛠️ PPTX 스킬 예제

```javascript
const { PresentationBuilder } = require('./.claude/skills/pptx/lib');

const builder = new PresentationBuilder('nxtcloud-v1');
builder.addTitleSlide({ title: '제목', subtitle: '부제목' });
builder.addContentSlide({
  title: '콘텐츠',
  components: [{ type: 'cards', items: [...] }]
});
await builder.save('output.pptx');
```

---

## 🔗 다음 단계

- **PPTX 스킬 사용**: [SKILL.md](../.claude/skills/pptx/SKILL.md)
- **새 스킬 추가**: [CONTRIBUTING.md](../CONTRIBUTING.md)

---

**마지막 업데이트**: 2026-01-26
