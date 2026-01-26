# Glen's Claude Skills

Claude Code에서 사용할 수 있는 스킬들의 중앙 저장소입니다.

## 🎯 시스템 구조 (Claude Code 표준)

```
glen-claude-skills/
│
├── .claude/                   ← Claude Code 설정
│   └── skills/               ← Claude Code가 인식하는 스킬
│       └── pptx/             ← PPTX 스킬 (self-contained)
│           ├── SKILL.md      ← 메인 스킬 파일
│           ├── package.json
│           ├── lib/          ← 빌더 API 라이브러리
│           │   ├── index.js
│           │   ├── builder.js
│           │   └── themes/   ← 테마 (v1, v2)
│           └── tools/        ← 편집 도구 (Python)
│
└── contents/                 ← PPT 소스 콘텐츠
```

### 특징

- ✅ **Claude Code 표준** 준수
- ✅ **테마 기반** 디자인 시스템
- ✅ **빌더 API** 선언적 PPT 생성
- ✅ **자동 인식** (이 프로젝트를 열면 스킬 자동 표시)

---

## 📚 사용 가능한 스킬

| 스킬 | 설명 | 버전 | 문서 |
|------|------|------|------|
| **PPTX** | PowerPoint 프레젠테이션 생성 및 편집 | v2.0 | [SKILL.md](.claude/skills/pptx/SKILL.md) |

---

## 🚀 빠른 시작

### 의존성 설치

```bash
cd .claude/skills/pptx
npm install
```

### 프레젠테이션 생성

```javascript
// presentation.js
const { PresentationBuilder } = require('./.claude/skills/pptx/lib');

async function main() {
  const builder = new PresentationBuilder('nxtcloud-v1');  // 또는 'nxtcloud-v2'

  builder.addTitleSlide({
    title: '프레젠테이션 제목',
    subtitle: '부제목',
    company: 'Company Name'
  });

  builder.addSectionSlide({
    number: '01',
    title: '섹션 제목'
  });

  builder.addContentSlide({
    title: '콘텐츠',
    components: [{
      type: 'cards',
      items: [
        { icon: '📊', title: '항목 1', desc: '설명' },
        { icon: '📈', title: '항목 2', desc: '설명' }
      ]
    }]
  });

  await builder.save('output.pptx');
}

main();
```

```bash
node presentation.js
open output.pptx
```

📖 **자세한 사용법**: [SKILL.md](./.claude/skills/pptx/SKILL.md)

---

## 🎨 테마

| 테마 | 스타일 | 색상 |
|------|--------|------|
| `nxtcloud-v1` | 중앙 정렬, 상단 액센트 바 | 파란색 계열 |
| `nxtcloud-v2` | 좌측 정렬, 사이드 액센트 바 | 녹색 계열 |

---

## 📖 문서

| 문서 | 설명 |
|------|------|
| [SKILL.md](.claude/skills/pptx/SKILL.md) | 메인 스킬 설명서 |
| [tools/ooxml.md](.claude/skills/pptx/tools/ooxml.md) | OOXML 편집 레퍼런스 |

---

## ➕ 새 스킬 추가하기

Claude Code 표준에 따라:

```
.claude/skills/[skill-name]/
├── SKILL.md           ← 필수: 스킬 정의
└── ...                ← 추가 파일
```

---

**버전**: 2.0
**마지막 업데이트**: 2026-01-26
