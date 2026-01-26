const pptxgen = require("pptxgenjs");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "NXT Cloud";
  pptx.title = "모던 IT 트렌드 2026 - Section 1 Enhanced";
  pptx.subject = "Opening";

  // Colors
  const colors = {
    navy: "0f172a",
    navyLight: "1e3a5f",
    primary: "2563eb",
    primaryLight: "3b82f6",
    primaryDark: "1e40af",
    accent: "38bdf8",
    white: "ffffff",
    slate100: "f1f5f9",
    slate200: "e2e8f0",
    slate400: "94a3b8",
    slate500: "64748b",
    slate700: "334155",
    slate900: "1e293b",
    amber500: "f59e0b",
    amber100: "fef3c7",
    blue100: "dbeafe",
    green500: "10b981",
    green100: "d1fae5",
    purple500: "8b5cf6",
    purple100: "ede9fe",
    red500: "ef4444",
    red100: "fee2e2"
  };

  // =========== SLIDE 1: Title ===========
  let slide1 = pptx.addSlide();
  slide1.background = { color: colors.navy };

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { type: "solid", color: colors.primary }
  });

  slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: 1.8, w: 2.6, h: 0.5,
    fill: { type: "solid", color: colors.navy },
    line: { color: colors.accent, width: 1 }
  });
  slide1.addText("2026 EDITION", {
    x: 3.7, y: 1.8, w: 2.6, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 12, color: colors.accent, bold: true
  });

  slide1.addText("모던 IT 트렌드", {
    x: 0.5, y: 2.5, w: 9, h: 0.9,
    align: "center", valign: "middle",
    fontSize: 54, color: colors.white, bold: true
  });

  slide1.addText("클라우드와 AI가 바꾸는 우리의 미래", {
    x: 1, y: 3.4, w: 8, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 22, color: colors.slate400
  });

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 4.2, y: 4.1, w: 1.6, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  slide1.addText("NXT Cloud", {
    x: 0.5, y: 4.4, w: 9, h: 0.35,
    align: "center", fontSize: 16, color: colors.white
  });
  slide1.addText("Technical Training Team", {
    x: 0.5, y: 4.7, w: 9, h: 0.3,
    align: "center", fontSize: 14, color: colors.slate500
  });

  slide1.addText("대학생  •  교수  •  교직원  •  공공기관", {
    x: 0.5, y: 5.1, w: 9, h: 0.3,
    align: "center", fontSize: 12, color: colors.slate500
  });

  // =========== SLIDE 2: IT 역사 타임라인 ===========
  let slide2 = pptx.addSlide();
  slide2.background = { color: colors.white };

  slide2.addText("IT 인프라의 진화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide2.addText("PC 시대부터 AI 시대까지, 40년의 여정", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Timeline base line
  slide2.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 2.8, w: 9, h: 0.06,
    fill: { type: "solid", color: colors.slate200 }
  });

  // Era 1: PC 시대 (1980s)
  slide2.addShape(pptx.shapes.OVAL, {
    x: 0.9, y: 2.65, w: 0.35, h: 0.35,
    fill: { type: "solid", color: colors.slate500 }
  });
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.4, w: 2.0, h: 1.1,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide2.addText("🖥️ PC 시대", {
    x: 0.5, y: 1.5, w: 1.8, h: 0.35,
    fontSize: 12, color: colors.slate700, bold: true
  });
  slide2.addText("1980s~", {
    x: 0.5, y: 1.85, w: 1.8, h: 0.25,
    fontSize: 10, color: colors.slate500
  });
  slide2.addText("개인용 컴퓨터 보급\n데스크탑 중심", {
    x: 0.5, y: 2.1, w: 1.8, h: 0.4,
    fontSize: 9, color: colors.slate500
  });

  // Era 2: 온프레미스 (1990s-2000s)
  slide2.addShape(pptx.shapes.OVAL, {
    x: 3.0, y: 2.65, w: 0.35, h: 0.35,
    fill: { type: "solid", color: colors.amber500 }
  });
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 1.4, w: 2.2, h: 1.1,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide2.addText("🏢 온프레미스", {
    x: 2.6, y: 1.5, w: 2.0, h: 0.35,
    fontSize: 12, color: "92400e", bold: true
  });
  slide2.addText("1990s-2000s", {
    x: 2.6, y: 1.85, w: 2.0, h: 0.25,
    fontSize: 10, color: colors.slate500
  });
  slide2.addText("자체 서버실 운영\n높은 초기 비용", {
    x: 2.6, y: 2.1, w: 2.0, h: 0.4,
    fontSize: 9, color: colors.slate500
  });

  // Era 3: 클라우드 (2006~)
  slide2.addShape(pptx.shapes.OVAL, {
    x: 5.1, y: 2.65, w: 0.35, h: 0.35,
    fill: { type: "solid", color: colors.primary }
  });
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.6, y: 1.4, w: 2.2, h: 1.1,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide2.addText("☁️ 클라우드", {
    x: 4.7, y: 1.5, w: 2.0, h: 0.35,
    fontSize: 12, color: colors.primary, bold: true
  });
  slide2.addText("2006~ AWS 시작", {
    x: 4.7, y: 1.85, w: 2.0, h: 0.25,
    fontSize: 10, color: colors.slate500
  });
  slide2.addText("필요한 만큼 빌려 씀\n스케일 업/다운 자유", {
    x: 4.7, y: 2.1, w: 2.0, h: 0.4,
    fontSize: 9, color: colors.slate500
  });

  // Era 4: AI 시대 (2020s~)
  slide2.addShape(pptx.shapes.OVAL, {
    x: 7.2, y: 2.65, w: 0.35, h: 0.35,
    fill: { type: "solid", color: colors.accent }
  });
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.7, y: 1.4, w: 2.4, h: 1.1,
    fill: { type: "solid", color: "e0f2fe" }
  });
  slide2.addText("🤖 AI + 클라우드", {
    x: 6.8, y: 1.5, w: 2.2, h: 0.35,
    fontSize: 12, color: "0369a1", bold: true
  });
  slide2.addText("2020s~ 현재", {
    x: 6.8, y: 1.85, w: 2.2, h: 0.25,
    fontSize: 10, color: colors.slate500
  });
  slide2.addText("AI 서비스 기본 탑재\n에이전트 시대 개막", {
    x: 6.8, y: 2.1, w: 2.2, h: 0.4,
    fontSize: 9, color: colors.slate500
  });

  // Year markers
  slide2.addText("1980", { x: 0.7, y: 3.0, w: 0.8, h: 0.25, fontSize: 9, color: colors.slate400, align: "center" });
  slide2.addText("2000", { x: 2.8, y: 3.0, w: 0.8, h: 0.25, fontSize: 9, color: colors.slate400, align: "center" });
  slide2.addText("2006", { x: 4.9, y: 3.0, w: 0.8, h: 0.25, fontSize: 9, color: colors.slate400, align: "center" });
  slide2.addText("2026", { x: 7.0, y: 3.0, w: 0.8, h: 0.25, fontSize: 9, color: colors.slate400, align: "center" });

  // Bottom comparison boxes
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.5, w: 4.4, h: 1.5,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide2.addText("🔙 과거: 온프레미스 시대", {
    x: 0.6, y: 3.6, w: 4, h: 0.35,
    fontSize: 13, color: colors.slate700, bold: true
  });
  slide2.addText("• 서버 구매에 수억원 투자\n• 설치까지 3~6개월 소요\n• 예측 불가한 트래픽 대응 불가\n• IT팀 = 하드웨어 관리자", {
    x: 0.6, y: 4.0, w: 4, h: 0.95,
    fontSize: 10, color: colors.slate500
  });

  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 3.5, w: 4.4, h: 1.5,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide2.addText("✨ 현재: 클라우드 + AI 시대", {
    x: 5.4, y: 3.6, w: 4, h: 0.35,
    fontSize: 13, color: colors.primary, bold: true
  });
  slide2.addText("• 클릭 몇 번으로 서버 생성\n• 5분 만에 글로벌 배포 가능\n• 자동 확장/축소 (Auto-scaling)\n• IT팀 = AI 서비스 아키텍트", {
    x: 5.4, y: 4.0, w: 4, h: 0.95,
    fontSize: 10, color: colors.slate600
  });

  slide2.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 3: AI vs Human 타이틀 ===========
  let slide3 = pptx.addSlide();
  slide3.background = { color: colors.navy };

  slide3.addText("AI vs Human", {
    x: 0.5, y: 1.8, w: 9, h: 1,
    align: "center", fontSize: 60, color: colors.white, bold: true
  });

  slide3.addText("우리가 기억하는 인간과 AI의 대결", {
    x: 0.5, y: 2.9, w: 9, h: 0.5,
    align: "center", fontSize: 22, color: colors.slate400
  });

  // Timeline preview
  const battles = [
    { year: "1997", event: "체스", color: colors.slate500 },
    { year: "2011", event: "퀴즈쇼", color: colors.slate400 },
    { year: "2016", event: "바둑", color: colors.primaryLight },
    { year: "2024", event: "코딩", color: colors.primary },
    { year: "2025", event: "???", color: colors.accent }
  ];

  battles.forEach((b, idx) => {
    const xPos = 1 + idx * 1.7;
    slide3.addShape(pptx.shapes.OVAL, {
      x: xPos, y: 3.8, w: 0.2, h: 0.2,
      fill: { type: "solid", color: b.color }
    });
    slide3.addText(b.year, {
      x: xPos - 0.4, y: 4.1, w: 1, h: 0.3,
      align: "center", fontSize: 11, color: colors.slate400
    });
    slide3.addText(b.event, {
      x: xPos - 0.4, y: 4.35, w: 1, h: 0.3,
      align: "center", fontSize: 10, color: colors.slate500
    });
    if (idx < battles.length - 1) {
      slide3.addShape(pptx.shapes.RECTANGLE, {
        x: xPos + 0.25, y: 3.88, w: 1.4, h: 0.04,
        fill: { type: "solid", color: colors.slate700 }
      });
    }
  });

  slide3.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =========== SLIDE 4: 체스 - Deep Blue ===========
  let slide4 = pptx.addSlide();
  slide4.background = { color: colors.white };

  slide4.addText("1997: 체스의 종말", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide4.addText("IBM Deep Blue vs 세계 챔피언 카스파로프", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Left: Story
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 5.5, h: 3.0,
    fill: { type: "solid", color: colors.slate100 }
  });

  slide4.addText("대결 결과", {
    x: 0.6, y: 1.65, w: 5, h: 0.35,
    fontSize: 14, color: colors.slate900, bold: true
  });

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.6, y: 2.1, w: 2.4, h: 0.8,
    fill: { type: "solid", color: colors.green100 }
  });
  slide4.addText("1996년", {
    x: 0.6, y: 2.15, w: 2.4, h: 0.3,
    align: "center", fontSize: 12, color: colors.green500, bold: true
  });
  slide4.addText("4:2 인간 승리", {
    x: 0.6, y: 2.5, w: 2.4, h: 0.35,
    align: "center", fontSize: 14, color: colors.slate900, bold: true
  });

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.2, y: 2.1, w: 2.4, h: 0.8,
    fill: { type: "solid", color: colors.red100 }
  });
  slide4.addText("1997년", {
    x: 3.2, y: 2.15, w: 2.4, h: 0.3,
    align: "center", fontSize: 12, color: colors.red500, bold: true
  });
  slide4.addText("3.5:2.5 AI 승리", {
    x: 3.2, y: 2.5, w: 2.4, h: 0.35,
    align: "center", fontSize: 14, color: colors.slate900, bold: true
  });

  slide4.addText("그 이후...", {
    x: 0.6, y: 3.1, w: 5, h: 0.3,
    fontSize: 13, color: colors.slate700, bold: true
  });
  slide4.addText("인간이 거의 경쟁하지 않음\nAI가 너무 강해짐", {
    x: 0.6, y: 3.4, w: 5, h: 0.8,
    fontSize: 12, color: colors.slate500
  });

  // Right: Insight box
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.2, y: 1.5, w: 3.4, h: 3.0,
    fill: { type: "solid", color: colors.primaryDark }
  });

  slide4.addText("💡 의미", {
    x: 6.4, y: 1.7, w: 3, h: 0.35,
    fontSize: 14, color: colors.accent, bold: true
  });

  slide4.addText("컴퓨터가 인간을\n이길 수 있다는 것을\n최초로 증명", {
    x: 6.4, y: 2.2, w: 3, h: 1.2,
    fontSize: 16, color: colors.white, bold: true
  });

  slide4.addShape(pptx.shapes.RECTANGLE, {
    x: 6.8, y: 3.5, w: 2.2, h: 0.03,
    fill: { type: "solid", color: colors.accent }
  });

  slide4.addText("\"계산\" 영역의 정복", {
    x: 6.4, y: 3.7, w: 3, h: 0.5,
    fontSize: 13, color: "93c5fd"
  });

  slide4.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 5: 퀴즈쇼 - Watson ===========
  let slide5 = pptx.addSlide();
  slide5.background = { color: colors.white };

  slide5.addText("2011: 퀴즈쇼의 충격", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide5.addText("IBM Watson vs Jeopardy! 역대 최강자들", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Participants
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 3.0, h: 2.2,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide5.addText("🤖 Watson", {
    x: 0.6, y: 1.65, w: 2.6, h: 0.4,
    fontSize: 16, color: colors.primary, bold: true
  });
  slide5.addText("IBM 개발\nAI 슈퍼컴퓨터", {
    x: 0.6, y: 2.1, w: 2.6, h: 0.8,
    fontSize: 12, color: colors.slate700
  });
  slide5.addText("$77,147", {
    x: 0.6, y: 2.9, w: 2.6, h: 0.5,
    fontSize: 20, color: colors.primary, bold: true
  });

  slide5.addText("VS", {
    x: 3.5, y: 2.2, w: 0.6, h: 0.5,
    align: "center", fontSize: 18, color: colors.slate400, bold: true
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.2, y: 1.5, w: 2.5, h: 2.2,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide5.addText("👤 Ken Jennings", {
    x: 4.4, y: 1.65, w: 2.1, h: 0.4,
    fontSize: 13, color: colors.amber500, bold: true
  });
  slide5.addText("74연승 기록\n역대 최다 우승", {
    x: 4.4, y: 2.1, w: 2.1, h: 0.8,
    fontSize: 11, color: colors.slate700
  });
  slide5.addText("$24,000", {
    x: 4.4, y: 2.9, w: 2.1, h: 0.5,
    fontSize: 16, color: colors.amber500, bold: true
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.9, y: 1.5, w: 2.5, h: 2.2,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide5.addText("👤 Brad Rutter", {
    x: 7.1, y: 1.65, w: 2.1, h: 0.4,
    fontSize: 13, color: colors.amber500, bold: true
  });
  slide5.addText("최고 상금 기록\n역대 상금왕", {
    x: 7.1, y: 2.1, w: 2.1, h: 0.8,
    fontSize: 11, color: colors.slate700
  });
  slide5.addText("$21,600", {
    x: 7.1, y: 2.9, w: 2.1, h: 0.5,
    fontSize: 16, color: colors.amber500, bold: true
  });

  // Bottom insight
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.9, w: 9.2, h: 1.1,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide5.addText("결과: 승부가 안 됨", {
    x: 0.6, y: 4.0, w: 4, h: 0.4,
    fontSize: 14, color: colors.accent, bold: true
  });
  slide5.addText("\"개빠름, 너무 많은 걸 알고 있음\"\n인간에게 하는 질문과 같은 형식을 이해하고 답변 → 이게 2011년 상황", {
    x: 0.6, y: 4.35, w: 8.8, h: 0.6,
    fontSize: 11, color: colors.slate400
  });

  slide5.addText("\"지식 검색 + 추론\" 영역 정복", {
    x: 6.5, y: 4.0, w: 3, h: 0.4,
    align: "right", fontSize: 12, color: colors.white, bold: true
  });

  slide5.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 6: 바둑 - AlphaGo ===========
  let slide6 = pptx.addSlide();
  slide6.background = { color: colors.white };

  slide6.addText("2016: 바둑, 신의 영역", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide6.addText("AlphaGo vs 이세돌 9단 - 세기의 대국", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // AlphaGo's Move 37
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.6, h: 3.0,
    fill: { type: "solid", color: colors.blue100 }
  });

  slide6.addText("알파고의 37수 (Move 37)", {
    x: 0.6, y: 1.65, w: 4.2, h: 0.35,
    fontSize: 14, color: colors.primary, bold: true
  });

  slide6.addText("김성룡 9단:", {
    x: 0.6, y: 2.1, w: 4.2, h: 0.25,
    fontSize: 11, color: colors.slate700, bold: true
  });
  slide6.addText("\"지금 어디에 뒀죠?\"", {
    x: 0.6, y: 2.35, w: 4.2, h: 0.25,
    fontSize: 11, color: colors.slate500, italic: true
  });

  slide6.addText("이희성 9단:", {
    x: 0.6, y: 2.7, w: 4.2, h: 0.25,
    fontSize: 11, color: colors.slate700, bold: true
  });
  slide6.addText("\"충격적인 자리에 뒀어요.\n이 수는 조금 이상하다고 해야 되는 것 아닌가요?\"", {
    x: 0.6, y: 2.95, w: 4.2, h: 0.5,
    fontSize: 10, color: colors.slate500, italic: true
  });

  slide6.addText("최유진 아나운서:", {
    x: 0.6, y: 3.55, w: 4.2, h: 0.25,
    fontSize: 11, color: colors.slate700, bold: true
  });
  slide6.addText("\"없는 수예요. 프로의 감각에서는\n생각하기조차도 힘든 수가 나왔습니다.\"", {
    x: 0.6, y: 3.8, w: 4.2, h: 0.5,
    fontSize: 10, color: colors.slate500, italic: true
  });

  // Lee Sedol's Move 78
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.4, h: 3.0,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide6.addText("이세돌의 78수 - 신의 한 수", {
    x: 5.4, y: 1.65, w: 4, h: 0.35,
    fontSize: 14, color: colors.amber500, bold: true
  });

  slide6.addText("이세돌 피셜:", {
    x: 5.4, y: 2.1, w: 4, h: 0.25,
    fontSize: 11, color: colors.slate700, bold: true
  });
  slide6.addText("\"1,2,3국 안 되더라.\n뒤에 가면 할 수 있는 게 없고,\n앞에는 경우의 수가 너무 많다.\n\n따라서 50~100수 사이를 노린다.\n이 사이에서 오로지 저 녀석을\n혼란시킬 수를 둔다.\n\n되네, 성공했네.\n근데 이미 3:1...\"", {
    x: 5.4, y: 2.35, w: 4, h: 2.0,
    fontSize: 10, color: colors.slate600
  });

  // Result
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 4.6, w: 3, h: 0.5,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide6.addText("최종 결과: 4:1 AI 승리", {
    x: 3.5, y: 4.6, w: 3, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 13, color: colors.white, bold: true
  });

  slide6.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 7: 코딩 대결 ===========
  let slide7 = pptx.addSlide();
  slide7.background = { color: colors.white };

  slide7.addText("2024-2025: 코딩의 시대", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide7.addText("AI가 프로그래머를 위협하다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // 2024 December - o3
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.purple100 }
  });

  slide7.addText("2024년 12월: OpenAI o3 모델", {
    x: 0.6, y: 1.65, w: 4.1, h: 0.35,
    fontSize: 14, color: colors.purple500, bold: true
  });

  slide7.addText("Codeforces 전세계 175위", {
    x: 0.6, y: 2.1, w: 4.1, h: 0.35,
    fontSize: 16, color: colors.slate900, bold: true
  });

  slide7.addText("상위 0.2% 그랜드마스터 급\n99.8 퍼센타일\n(99.9%의 사용자를 능가)", {
    x: 0.6, y: 2.5, w: 4.1, h: 0.9,
    fontSize: 12, color: colors.slate600
  });

  // 2025 July - AtCoder
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.blue100 }
  });

  slide7.addText("2025년 7월: AtCoder World Tour", {
    x: 5.3, y: 1.65, w: 4.1, h: 0.35,
    fontSize: 14, color: colors.primary, bold: true
  });

  slide7.addText("🥇 1등: Psyho (슬로베니아)\n🥈 2등: OpenAI AHC AI", {
    x: 5.3, y: 2.15, w: 4.1, h: 0.7,
    fontSize: 14, color: colors.slate900
  });

  slide7.addText("인간이 아직 이겼다!\n...단 한 명.", {
    x: 5.3, y: 2.9, w: 4.1, h: 0.5,
    fontSize: 12, color: colors.slate600
  });

  // Quote box
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.7, w: 9.2, h: 1.3,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide7.addText("🏆 우승자 Psyho의 메시지", {
    x: 0.6, y: 3.85, w: 4, h: 0.3,
    fontSize: 12, color: colors.accent, bold: true
  });

  slide7.addText("\"인류가 승리했습니다 (현재로서는).\n나는 죽을 것 같지만요.\n인간이 이기려면 3일 동안 거의 잠도 못 자고 사투를 벌여야 하는 상황이 온 거예요.\"", {
    x: 0.6, y: 4.2, w: 8.8, h: 0.75,
    fontSize: 11, color: colors.white
  });

  slide7.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 8: 변화의 확산 ===========
  let slide8 = pptx.addSlide();
  slide8.background = { color: colors.navy };

  slide8.addText("체스, 퀴즈, 바둑, 코딩에서", {
    x: 0.5, y: 1.2, w: 9, h: 0.6,
    align: "center", fontSize: 24, color: colors.slate400
  });

  slide8.addText("시작된 변화가", {
    x: 0.5, y: 1.7, w: 9, h: 0.6,
    align: "center", fontSize: 24, color: colors.slate400
  });

  slide8.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 2.4, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  slide8.addText("이제 모든 곳으로 퍼집니다", {
    x: 0.5, y: 2.6, w: 9, h: 0.8,
    align: "center", fontSize: 40, color: colors.white, bold: true
  });

  // Spreading areas
  const spreadAreas = [
    { icon: "📝", label: "글쓰기" },
    { icon: "🎨", label: "디자인" },
    { icon: "📊", label: "분석" },
    { icon: "🔬", label: "연구" },
    { icon: "💼", label: "비즈니스" },
    { icon: "🏥", label: "의료" },
    { icon: "⚖️", label: "법률" },
    { icon: "🎓", label: "교육" }
  ];

  spreadAreas.forEach((area, idx) => {
    const xPos = 0.6 + (idx % 8) * 1.15;
    slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.6, w: 1.0, h: 0.7,
      fill: { type: "solid", color: colors.navyLight }
    });
    slide8.addText(area.icon, {
      x: xPos, y: 3.6, w: 1.0, h: 0.4,
      align: "center", fontSize: 18
    });
    slide8.addText(area.label, {
      x: xPos, y: 3.95, w: 1.0, h: 0.3,
      align: "center", fontSize: 10, color: colors.slate400
    });
  });

  slide8.addText("AI는 특정 분야의 이야기가 아닙니다. 모든 분야의 이야기입니다.", {
    x: 0.5, y: 4.5, w: 9, h: 0.5,
    align: "center", fontSize: 16, color: colors.accent
  });

  slide8.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =========== SLIDE 9: 인간 vs AI → 인간 + AI ===========
  let slide9 = pptx.addSlide();
  slide9.background = { color: colors.white };

  slide9.addText("AI 시대의 인간의 역할", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide9.addText("질문을 바꿔야 할 때입니다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Left - VS (crossed out)
  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 4.3, h: 2.8,
    fill: { type: "solid", color: colors.red100 },
    line: { color: colors.red500, width: 2, dashType: "solid" }
  });

  slide9.addText("인간 vs AI", {
    x: 0.7, y: 1.7, w: 3.9, h: 0.5,
    fontSize: 22, color: colors.red500, bold: true
  });

  slide9.addText("경쟁과 대립", {
    x: 0.7, y: 2.25, w: 3.9, h: 0.35,
    fontSize: 14, color: colors.slate700, bold: true
  });

  slide9.addText("\"AI를 어떻게 이길 것인가?\"", {
    x: 0.7, y: 2.65, w: 3.9, h: 0.35,
    fontSize: 13, color: colors.slate600, italic: true
  });

  slide9.addText("계속 AI와 경쟁해야 할까요?\n밤잠을 설쳐가며 AI를 이기려고\n노력해야 할까요?", {
    x: 0.7, y: 3.1, w: 3.9, h: 0.9,
    fontSize: 11, color: colors.slate500
  });

  // X mark
  slide9.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 1.8, w: 3.7, h: 0.06,
    fill: { type: "solid", color: colors.red500 },
    rotate: 15
  });

  // Right - Plus
  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.3, h: 2.8,
    fill: { type: "solid", color: colors.green100 },
    line: { color: colors.green500, width: 3, dashType: "solid" }
  });

  slide9.addText("인간 + AI", {
    x: 5.4, y: 1.7, w: 3.9, h: 0.5,
    fontSize: 22, color: colors.green500, bold: true
  });

  slide9.addText("협력과 상생", {
    x: 5.4, y: 2.25, w: 3.9, h: 0.35,
    fontSize: 14, color: colors.slate700, bold: true
  });

  slide9.addText("\"AI를 어떻게 활용할 것인가?\"", {
    x: 5.4, y: 2.65, w: 3.9, h: 0.35,
    fontSize: 13, color: colors.slate600, italic: true
  });

  slide9.addText("AI와 함께 일하며\n더 큰 가치를 만들어내는\n새로운 시대", {
    x: 5.4, y: 3.1, w: 3.9, h: 0.9,
    fontSize: 11, color: colors.slate500
  });

  // Check mark
  slide9.addText("✓", {
    x: 8.5, y: 1.5, w: 0.8, h: 0.8,
    fontSize: 36, color: colors.green500, bold: true
  });

  // Bottom message
  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 4.5, w: 7, h: 0.6,
    fill: { type: "solid", color: colors.primary }
  });
  slide9.addText("더 이상 '인간 vs AI'가 아니라 '인간 + AI'의 시대입니다", {
    x: 1.5, y: 4.5, w: 7, h: 0.6,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  slide9.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 10: 왜 여러분에게 중요한가 ===========
  let slide10 = pptx.addSlide();
  slide10.background = { color: colors.slate100 };

  slide10.addText("왜 여러분에게 중요한가", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide10.addText("모든 분야에서 AI와 클라우드 활용 능력이 필수가 됩니다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const cards = [
    { emoji: "🎓", title: "대학생", desc: "AI를 활용하는 인재가 취업 시장에서 경쟁력을 갖습니다.", color: colors.amber500 },
    { emoji: "🔬", title: "교수/연구자", desc: "연구 가설 검증, 데이터 분석, 논문 작성까지 AI가 혁신합니다.", color: colors.primary },
    { emoji: "💼", title: "교직원", desc: "반복적인 행정 업무를 자동화하고, 가치 있는 업무에 집중합니다.", color: colors.green500 },
    { emoji: "🏛️", title: "공공기관", desc: "정책 시뮬레이션, 민원 처리 자동화, 데이터 기반 의사결정.", color: colors.purple500 }
  ];

  cards.forEach((card, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 2.9,
      fill: { type: "solid", color: colors.white },
      shadow: { type: "outer", blur: 8, offset: 2, angle: 45, opacity: 0.1 }
    });

    slide10.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 0.06,
      fill: { type: "solid", color: card.color }
    });

    slide10.addText(card.emoji, {
      x: xPos, y: 1.7, w: 2.2, h: 0.6,
      align: "center", fontSize: 28
    });

    slide10.addText(card.title, {
      x: xPos + 0.15, y: 2.3, w: 1.9, h: 0.4,
      fontSize: 15, color: colors.slate900, bold: true
    });

    slide10.addText(card.desc, {
      x: xPos + 0.15, y: 2.7, w: 1.9, h: 1.5,
      fontSize: 11, color: colors.slate500
    });
  });

  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 4.65, w: 7, h: 0.5,
    fill: { type: "solid", color: colors.primary }
  });
  slide10.addText("공통점: AI를 도구로 활용하는 능력이 핵심 역량이 됩니다", {
    x: 1.5, y: 4.65, w: 7, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  slide10.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 11: 핵심 메시지 - 우리가 해야 할 일 ===========
  let slide11 = pptx.addSlide();
  slide11.background = { color: colors.navy };

  slide11.addText("그래서, 우리는 무엇을 해야 하는가?", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 28, color: colors.white, bold: true
  });

  // Cloud + AI
  slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.1, w: 4.5, h: 1.4,
    fill: { type: "solid", color: colors.navyLight }
  });
  slide11.addText("☁️ 클라우드", {
    x: 0.6, y: 1.2, w: 4.1, h: 0.35,
    fontSize: 14, color: colors.accent, bold: true
  });
  slide11.addText("빠르게 시작하고, 실패 시 데미지를 줄이고,\n인터넷이 연결된 모든 곳을 시장으로 삼게 해줌", {
    x: 0.6, y: 1.6, w: 4.1, h: 0.8,
    fontSize: 12, color: colors.slate400
  });

  slide11.addText("+", {
    x: 4.6, y: 1.5, w: 0.8, h: 0.8,
    align: "center", valign: "middle",
    fontSize: 32, color: colors.accent, bold: true
  });

  slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.5, h: 1.4,
    fill: { type: "solid", color: colors.navyLight }
  });
  slide11.addText("🤖 AI", {
    x: 5.3, y: 1.2, w: 4.1, h: 0.35,
    fontSize: 14, color: colors.accent, bold: true
  });
  slide11.addText("단순 '개발'을 넘어\n무엇인가를 '구현'하는 것을 가능하게 해줌", {
    x: 5.3, y: 1.6, w: 4.1, h: 0.8,
    fontSize: 12, color: colors.slate400
  });

  // Key insight
  slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 2.65, w: 7, h: 0.5,
    fill: { type: "solid", color: colors.primary }
  });
  slide11.addText("이 둘을 합쳐서 사용해야 성과를 낼 수 있습니다", {
    x: 1.5, y: 2.65, w: 7, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  // Three pillars
  const pillars = [
    {
      num: "1",
      title: "전문 도메인 확보",
      desc: "무엇을 만들지 정하기 위해\n관심사와 전문 영역을 개발",
      icon: "🎯",
      color: colors.amber500
    },
    {
      num: "2",
      title: "AI 팀 리더가 되기",
      desc: "AI를 활용하고 관리하며\n결과물을 만들어내는 매니저",
      icon: "👨‍💼",
      color: colors.primary
    },
    {
      num: "3",
      title: "서비스 운영 경험",
      desc: "클라우드 배포와 유지보수로\n실제 사용자가 있는 서비스 운영",
      icon: "🚀",
      color: colors.green500
    }
  ];

  pillars.forEach((pillar, idx) => {
    const xPos = 0.5 + idx * 3.15;

    slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.35, w: 2.95, h: 1.7,
      fill: { type: "solid", color: colors.navyLight }
    });

    slide11.addShape(pptx.shapes.OVAL, {
      x: xPos + 0.15, y: 3.45, w: 0.45, h: 0.45,
      fill: { type: "solid", color: pillar.color }
    });
    slide11.addText(pillar.num, {
      x: xPos + 0.15, y: 3.45, w: 0.45, h: 0.45,
      align: "center", valign: "middle",
      fontSize: 14, color: colors.white, bold: true
    });

    slide11.addText(pillar.icon, {
      x: xPos + 2.3, y: 3.4, w: 0.5, h: 0.5,
      align: "right", fontSize: 20
    });

    slide11.addText(pillar.title, {
      x: xPos + 0.15, y: 3.95, w: 2.65, h: 0.35,
      fontSize: 14, color: colors.white, bold: true
    });

    slide11.addText(pillar.desc, {
      x: xPos + 0.15, y: 4.35, w: 2.65, h: 0.65,
      fontSize: 11, color: colors.slate400
    });
  });

  slide11.addText("💡 내 컴퓨터 안에서 단순 구현만으로는 성과를 내기 어렵습니다", {
    x: 0.5, y: 5.15, w: 9, h: 0.35,
    align: "center", fontSize: 13, color: colors.accent
  });

  slide11.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.5, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =====================================================
  // SECTION 2: 클라우드의 진화 (20분) - Slides 12-20
  // =====================================================

  // =========== SLIDE 12: 섹션 2 타이틀 ===========
  let slide12 = pptx.addSlide();
  slide12.background = { color: colors.primary };

  slide12.addText("01", {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    align: "center", fontSize: 48, color: "93c5fd", bold: true
  });

  slide12.addText("클라우드의 진화", {
    x: 0.5, y: 2.3, w: 9, h: 0.9,
    align: "center", fontSize: 48, color: colors.white, bold: true
  });

  slide12.addText("인프라 혁명의 역사와 현재", {
    x: 0.5, y: 3.2, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: "93c5fd"
  });

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 3.9, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.white }
  });

  slide12.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: "93c5fd"
  });

  // =========== SLIDE 13: 클라우드 이전 시대 ===========
  let slide13 = pptx.addSlide();
  slide13.background = { color: colors.white };

  slide13.addText("클라우드 이전: 온프레미스 시대", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide13.addText("직접 서버를 사고, 설치하고, 관리하던 시절", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Pain points
  const painPoints = [
    { icon: "💰", title: "막대한 초기 비용", desc: "서버 1대에 수천만원\n데이터센터 구축에 수십억원", color: colors.red500 },
    { icon: "⏰", title: "긴 준비 시간", desc: "서버 주문부터 설치까지\n3~6개월 소요", color: colors.amber500 },
    { icon: "📈", title: "확장의 어려움", desc: "트래픽 급증 시 대응 불가\n사전 예측 필수", color: colors.purple500 },
    { icon: "🔧", title: "유지보수 부담", desc: "24/7 관리 인력 필요\nIT팀 = 하드웨어 관리자", color: colors.slate500 }
  ];

  painPoints.forEach((point, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 2.8,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide13.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 0.06,
      fill: { type: "solid", color: point.color }
    });

    slide13.addText(point.icon, {
      x: xPos, y: 1.7, w: 2.2, h: 0.6,
      align: "center", fontSize: 32
    });

    slide13.addText(point.title, {
      x: xPos + 0.15, y: 2.3, w: 1.9, h: 0.4,
      fontSize: 14, color: colors.slate900, bold: true
    });

    slide13.addText(point.desc, {
      x: xPos + 0.15, y: 2.75, w: 1.9, h: 1.3,
      fontSize: 11, color: colors.slate500
    });
  });

  slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 4.5, w: 7, h: 0.6,
    fill: { type: "solid", color: colors.red100 }
  });
  slide13.addText("\"서버가 터졌어요!\" → 긴급 하드웨어 구매 → 3개월 후 도착 → 이미 늦음", {
    x: 1.5, y: 4.5, w: 7, h: 0.6,
    align: "center", valign: "middle",
    fontSize: 13, color: colors.red500
  });

  slide13.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 14: AWS의 탄생 ===========
  let slide14 = pptx.addSlide();
  slide14.background = { color: colors.white };

  slide14.addText("2006년: AWS의 탄생", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide14.addText("\"필요한 만큼만 빌려 쓴다\" - 클라우드 혁명의 시작", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Timeline
  slide14.addShape(pptx.shapes.RECTANGLE, {
    x: 1, y: 2.0, w: 8, h: 0.06,
    fill: { type: "solid", color: colors.slate200 }
  });

  const awsTimeline = [
    { year: "2006.03", event: "S3 출시", desc: "무제한 스토리지", color: colors.amber500 },
    { year: "2006.08", event: "EC2 출시", desc: "가상 서버", color: colors.primary },
    { year: "2009", event: "RDS 출시", desc: "관리형 DB", color: colors.green500 },
    { year: "2014", event: "Lambda 출시", desc: "서버리스", color: colors.purple500 }
  ];

  awsTimeline.forEach((item, idx) => {
    const xPos = 1.2 + idx * 2.1;

    slide14.addShape(pptx.shapes.OVAL, {
      x: xPos + 0.3, y: 1.9, w: 0.25, h: 0.25,
      fill: { type: "solid", color: item.color }
    });

    slide14.addText(item.year, {
      x: xPos, y: 2.2, w: 1.5, h: 0.3,
      align: "center", fontSize: 11, color: colors.slate500, bold: true
    });

    slide14.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos - 0.1, y: 2.55, w: 1.7, h: 0.9,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide14.addText(item.event, {
      x: xPos - 0.1, y: 2.6, w: 1.7, h: 0.35,
      align: "center", fontSize: 12, color: colors.slate900, bold: true
    });
    slide14.addText(item.desc, {
      x: xPos - 0.1, y: 2.95, w: 1.7, h: 0.4,
      align: "center", fontSize: 10, color: colors.slate500
    });
  });

  // Key message
  slide14.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.3,
    fill: { type: "solid", color: colors.blue100 }
  });

  slide14.addText("💡 핵심 변화", {
    x: 0.7, y: 3.85, w: 8.6, h: 0.35,
    fontSize: 14, color: colors.primary, bold: true
  });

  slide14.addText("• 서버 구매 → 클릭 몇 번으로 생성\n• 3개월 대기 → 5분 만에 전 세계 배포\n• 고정 비용 → 사용한 만큼만 지불 (Pay-as-you-go)", {
    x: 0.7, y: 4.25, w: 8.6, h: 0.7,
    fontSize: 12, color: colors.slate700
  });

  slide14.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 15: Netflix 사례 ===========
  let slide15 = pptx.addSlide();
  slide15.background = { color: colors.white };

  slide15.addText("사례 1: Netflix", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide15.addText("DVD 대여점에서 글로벌 스트리밍 제국으로", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Before/After
  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.4, h: 2.3,
    fill: { type: "solid", color: colors.red100 }
  });
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: 0.08, h: 2.3,
    fill: { type: "solid", color: colors.red500 }
  });

  slide15.addText("❌ 2008년: 데이터센터 장애", {
    x: 0.6, y: 1.65, w: 4, h: 0.4,
    fontSize: 14, color: colors.red500, bold: true
  });
  slide15.addText("• 3일간 DVD 배송 중단\n• 수백만 달러 손실\n• 고객 신뢰도 하락\n• \"다시는 이런 일 없도록\"", {
    x: 0.6, y: 2.1, w: 4, h: 1.5,
    fontSize: 12, color: colors.slate600
  });

  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.4, h: 2.3,
    fill: { type: "solid", color: colors.green100 }
  });
  slide15.addShape(pptx.shapes.RECTANGLE, {
    x: 5.2, y: 1.5, w: 0.08, h: 2.3,
    fill: { type: "solid", color: colors.green500 }
  });

  slide15.addText("✅ 2016년: 100% AWS 전환", {
    x: 5.4, y: 1.65, w: 4, h: 0.4,
    fontSize: 14, color: colors.green500, bold: true
  });
  slide15.addText("• 전 세계 2억+ 구독자 서비스\n• 190개국 동시 스트리밍\n• 99.99% 가동률\n• 트래픽 폭증에도 자동 대응", {
    x: 5.4, y: 2.1, w: 4, h: 1.5,
    fontSize: 12, color: colors.slate600
  });

  // Stats
  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.0, w: 3.0, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide15.addText("2억+", {
    x: 0.4, y: 4.05, w: 3.0, h: 0.5,
    align: "center", fontSize: 24, color: colors.white, bold: true
  });
  slide15.addText("글로벌 구독자", {
    x: 0.4, y: 4.55, w: 3.0, h: 0.35,
    align: "center", fontSize: 11, color: colors.slate400
  });

  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 4.0, w: 3.0, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide15.addText("190개국", {
    x: 3.5, y: 4.05, w: 3.0, h: 0.5,
    align: "center", fontSize: 24, color: colors.white, bold: true
  });
  slide15.addText("서비스 지역", {
    x: 3.5, y: 4.55, w: 3.0, h: 0.35,
    align: "center", fontSize: 11, color: colors.slate400
  });

  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 4.0, w: 3.0, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide15.addText("15%", {
    x: 6.6, y: 4.05, w: 3.0, h: 0.5,
    align: "center", fontSize: 24, color: colors.white, bold: true
  });
  slide15.addText("전세계 인터넷 트래픽", {
    x: 6.6, y: 4.55, w: 3.0, h: 0.35,
    align: "center", fontSize: 11, color: colors.slate400
  });

  slide15.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 16: Spotify 사례 ===========
  let slide16 = pptx.addSlide();
  slide16.background = { color: colors.white };

  slide16.addText("사례 2: Spotify", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide16.addText("5억 사용자의 개인화된 음악 경험", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Key features
  const spotifyFeatures = [
    { icon: "🎵", title: "1억+ 곡", desc: "실시간 스트리밍", color: colors.green500 },
    { icon: "🎧", title: "5억+ 사용자", desc: "전 세계 동시 접속", color: colors.primary },
    { icon: "🤖", title: "AI 추천", desc: "개인 맞춤 플레이리스트", color: colors.purple500 },
    { icon: "⚡", title: "30ms 응답", desc: "즉각적인 재생", color: colors.amber500 }
  ];

  spotifyFeatures.forEach((feat, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide16.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 1.8,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide16.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.5, w: 2.2, h: 0.06,
      fill: { type: "solid", color: feat.color }
    });

    slide16.addText(feat.icon, {
      x: xPos, y: 1.65, w: 2.2, h: 0.5,
      align: "center", fontSize: 28
    });

    slide16.addText(feat.title, {
      x: xPos + 0.15, y: 2.2, w: 1.9, h: 0.4,
      fontSize: 16, color: colors.slate900, bold: true, align: "center"
    });

    slide16.addText(feat.desc, {
      x: xPos + 0.15, y: 2.6, w: 1.9, h: 0.5,
      fontSize: 11, color: colors.slate500, align: "center"
    });
  });

  // Cloud benefit
  slide16.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.5, w: 9.2, h: 1.5,
    fill: { type: "solid", color: "1db954" }
  });

  slide16.addText("☁️ GCP (Google Cloud Platform) 활용", {
    x: 0.6, y: 3.65, w: 8.8, h: 0.4,
    fontSize: 14, color: colors.white, bold: true
  });

  slide16.addText("• BigQuery: 페타바이트급 데이터 분석으로 \"Discover Weekly\" 추천 생성\n• Dataflow: 실시간 스트리밍 데이터 처리 (사용자 행동 분석)\n• GKE: 마이크로서비스 800개 이상 운영, 초당 수백만 요청 처리", {
    x: 0.6, y: 4.1, w: 8.8, h: 0.85,
    fontSize: 11, color: "d3f9d8"
  });

  slide16.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 17: 클라우드의 3대 이점 ===========
  let slide17 = pptx.addSlide();
  slide17.background = { color: colors.white };

  slide17.addText("클라우드의 3대 이점", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide17.addText("왜 모든 기업이 클라우드로 이동하는가", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const benefits = [
    {
      num: "01",
      title: "비용 효율성",
      icon: "💵",
      points: ["초기 투자 없음 (CAPEX → OPEX)", "사용한 만큼만 지불", "유휴 자원 비용 제거"],
      color: colors.green500,
      bgColor: colors.green100
    },
    {
      num: "02",
      title: "확장성",
      icon: "📈",
      points: ["트래픽 폭증 시 자동 확장", "글로벌 배포 수 분 내 완료", "수요 감소 시 자동 축소"],
      color: colors.primary,
      bgColor: colors.blue100
    },
    {
      num: "03",
      title: "속도",
      icon: "⚡",
      points: ["인프라 구축 수 분 완료", "새 기능 빠른 출시", "실험과 혁신 가속화"],
      color: colors.purple500,
      bgColor: colors.purple100
    }
  ];

  benefits.forEach((benefit, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide17.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.5, w: 3.0, h: 3.4,
      fill: { type: "solid", color: benefit.bgColor }
    });

    slide17.addText(benefit.num, {
      x: xPos + 0.15, y: 1.6, w: 0.6, h: 0.4,
      fontSize: 14, color: benefit.color, bold: true
    });

    slide17.addText(benefit.icon, {
      x: xPos + 2.2, y: 1.55, w: 0.6, h: 0.5,
      align: "right", fontSize: 24
    });

    slide17.addText(benefit.title, {
      x: xPos + 0.15, y: 2.1, w: 2.7, h: 0.45,
      fontSize: 18, color: colors.slate900, bold: true
    });

    benefit.points.forEach((point, pIdx) => {
      slide17.addText("• " + point, {
        x: xPos + 0.15, y: 2.65 + pIdx * 0.55, w: 2.7, h: 0.5,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  slide17.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 18: 클라우드 서비스 모델 ===========
  let slide18 = pptx.addSlide();
  slide18.background = { color: colors.white };

  slide18.addText("클라우드 서비스 모델의 진화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide18.addText("관리 범위에 따른 서비스 분류", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Service models
  const serviceModels = [
    {
      name: "IaaS",
      full: "Infrastructure\nas a Service",
      example: "AWS EC2, Azure VM",
      desc: "가상 서버 제공\n사용자가 OS부터 관리",
      color: colors.slate500
    },
    {
      name: "PaaS",
      full: "Platform\nas a Service",
      example: "Heroku, AWS Elastic Beanstalk",
      desc: "개발 플랫폼 제공\n코드만 배포하면 됨",
      color: colors.primary
    },
    {
      name: "SaaS",
      full: "Software\nas a Service",
      example: "Gmail, Salesforce, Slack",
      desc: "완성된 서비스 제공\n그냥 사용만 하면 됨",
      color: colors.green500
    },
    {
      name: "AIaaS",
      full: "AI\nas a Service",
      example: "ChatGPT API, AWS Bedrock",
      desc: "AI 기능 API 제공\nAI 전문가 없이도 AI 구현",
      color: colors.purple500
    }
  ];

  // Arrow
  slide18.addShape(pptx.shapes.RECTANGLE, {
    x: 0.8, y: 2.3, w: 8.4, h: 0.08,
    fill: { type: "solid", color: colors.slate200 }
  });
  slide18.addText("관리 부담 감소 →", {
    x: 6, y: 1.9, w: 3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  serviceModels.forEach((model, idx) => {
    const xPos = 0.5 + idx * 2.4;

    slide18.addShape(pptx.shapes.OVAL, {
      x: xPos + 0.85, y: 2.15, w: 0.35, h: 0.35,
      fill: { type: "solid", color: model.color }
    });

    slide18.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.7, w: 2.2, h: 2.3,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide18.addText(model.name, {
      x: xPos, y: 2.8, w: 2.2, h: 0.4,
      align: "center", fontSize: 18, color: model.color, bold: true
    });

    slide18.addText(model.full, {
      x: xPos, y: 3.2, w: 2.2, h: 0.5,
      align: "center", fontSize: 9, color: colors.slate500
    });

    slide18.addShape(pptx.shapes.RECTANGLE, {
      x: xPos + 0.3, y: 3.7, w: 1.6, h: 0.03,
      fill: { type: "solid", color: model.color }
    });

    slide18.addText(model.example, {
      x: xPos + 0.1, y: 3.8, w: 2.0, h: 0.4,
      align: "center", fontSize: 8, color: colors.slate400
    });

    slide18.addText(model.desc, {
      x: xPos + 0.1, y: 4.2, w: 2.0, h: 0.7,
      align: "center", fontSize: 9, color: colors.slate600
    });
  });

  slide18.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 19: 한국의 클라우드 현황 ===========
  let slide19 = pptx.addSlide();
  slide19.background = { color: colors.white };

  slide19.addText("한국의 클라우드 현황", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide19.addText("정부와 기업의 클라우드 전환 가속화", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Government
  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.blue100 }
  });

  slide19.addText("🏛️ 정부/공공기관", {
    x: 0.6, y: 1.65, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.primary, bold: true
  });

  slide19.addText("• 공공기관 클라우드 전환 의무화\n• 행정안전부 G-클라우드 추진\n• 교육부 에듀테크 클라우드 확대\n• 마이데이터 사업 본격화", {
    x: 0.6, y: 2.1, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // Enterprise
  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.green100 }
  });

  slide19.addText("🏢 기업", {
    x: 5.3, y: 1.65, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.green500, bold: true
  });

  slide19.addText("• 네이버 클라우드, 카카오 클라우드 성장\n• 삼성 SDS, LG CNS 클라우드 사업 확대\n• 금융권 클라우드 규제 완화\n• 스타트업 90%+ 클라우드 네이티브", {
    x: 5.3, y: 2.1, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // Market stats
  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.7, w: 9.2, h: 1.3,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide19.addText("🇰🇷 국내 클라우드 시장 규모", {
    x: 0.6, y: 3.85, w: 4, h: 0.35,
    fontSize: 13, color: colors.white, bold: true
  });

  slide19.addText("2024년", {
    x: 5.5, y: 3.85, w: 1.5, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate400
  });
  slide19.addText("10조원", {
    x: 5.5, y: 4.15, w: 1.5, h: 0.4,
    align: "center", fontSize: 18, color: colors.accent, bold: true
  });

  slide19.addText("→", {
    x: 7.0, y: 4.1, w: 0.5, h: 0.5,
    align: "center", fontSize: 20, color: colors.slate400
  });

  slide19.addText("2028년 (예상)", {
    x: 7.5, y: 3.85, w: 2, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate400
  });
  slide19.addText("20조원+", {
    x: 7.5, y: 4.15, w: 2, h: 0.4,
    align: "center", fontSize: 18, color: colors.green500, bold: true
  });

  slide19.addText("연평균 성장률 20%+ | 금융, 헬스케어, 제조 분야 급성장", {
    x: 0.6, y: 4.6, w: 8.8, h: 0.3,
    fontSize: 11, color: colors.slate400
  });

  slide19.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 20: 섹션 2 정리 ===========
  let slide20 = pptx.addSlide();
  slide20.background = { color: colors.navy };

  slide20.addText("Section 1 핵심 정리", {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 14, color: colors.accent
  });

  slide20.addText("클라우드 = 모든 혁신의 기반", {
    x: 0.5, y: 1.2, w: 9, h: 0.8,
    align: "center", fontSize: 36, color: colors.white, bold: true
  });

  slide20.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 2.1, w: 3, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  const summaryPoints = [
    { icon: "🔄", text: "온프레미스 → 클라우드: 소유에서 구독으로" },
    { icon: "🚀", text: "Netflix, Spotify: 클라우드 없이는 불가능했던 서비스" },
    { icon: "💡", text: "IaaS → PaaS → SaaS → AIaaS: 점점 쉬워지는 기술 활용" },
    { icon: "🇰🇷", text: "한국: 정부/기업 모두 클라우드 전환 가속화" }
  ];

  summaryPoints.forEach((point, idx) => {
    slide20.addText(point.icon + "  " + point.text, {
      x: 1, y: 2.5 + idx * 0.55, w: 8, h: 0.5,
      fontSize: 16, color: colors.white
    });
  });

  slide20.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =====================================================
  // SECTION 3: AI의 도전장 - 심화 (30분) - Slides 21-32
  // =====================================================

  // =========== SLIDE 21: 섹션 3 타이틀 ===========
  let slide21 = pptx.addSlide();
  slide21.background = { color: colors.purple500 };

  slide21.addText("02", {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    align: "center", fontSize: 48, color: "c4b5fd", bold: true
  });

  slide21.addText("AI의 도전장", {
    x: 0.5, y: 2.3, w: 9, h: 0.9,
    align: "center", fontSize: 48, color: colors.white, bold: true
  });

  slide21.addText("게임에서 업무로, 경쟁에서 협력으로", {
    x: 0.5, y: 3.2, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: "c4b5fd"
  });

  slide21.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 3.9, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.white }
  });

  slide21.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: "c4b5fd"
  });

  // =========== SLIDE 22: AI 발전 타임라인 ===========
  let slide22 = pptx.addSlide();
  slide22.background = { color: colors.white };

  slide22.addText("AI 발전의 역사", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide22.addText("70년간의 여정, 그리고 폭발적 성장", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Timeline
  slide22.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 2.2, w: 9, h: 0.06,
    fill: { type: "solid", color: colors.slate200 }
  });

  const aiTimeline = [
    { year: "1956", event: "AI 탄생", desc: "다트머스 회의", color: colors.slate500 },
    { year: "1997", event: "딥블루", desc: "체스 챔피언 격파", color: colors.primary },
    { year: "2011", event: "왓슨", desc: "제퍼디 우승", color: colors.green500 },
    { year: "2016", event: "알파고", desc: "바둑 정복", color: colors.amber500 },
    { year: "2022", event: "ChatGPT", desc: "대중화 시작", color: colors.purple500 }
  ];

  aiTimeline.forEach((item, idx) => {
    const xPos = 0.6 + idx * 1.85;

    slide22.addShape(pptx.shapes.OVAL, {
      x: xPos + 0.5, y: 2.07, w: 0.3, h: 0.3,
      fill: { type: "solid", color: item.color }
    });

    slide22.addText(item.year, {
      x: xPos, y: 1.65, w: 1.5, h: 0.35,
      align: "center", fontSize: 12, color: item.color, bold: true
    });

    slide22.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.5, w: 1.5, h: 1.1,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide22.addText(item.event, {
      x: xPos, y: 2.6, w: 1.5, h: 0.4,
      align: "center", fontSize: 13, color: colors.slate900, bold: true
    });

    slide22.addText(item.desc, {
      x: xPos, y: 3.05, w: 1.5, h: 0.4,
      align: "center", fontSize: 10, color: colors.slate500
    });
  });

  // Key insight
  slide22.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.9, w: 9, h: 1.1,
    fill: { type: "solid", color: colors.purple100 }
  });

  slide22.addText("💡 핵심 인사이트", {
    x: 0.7, y: 4.0, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.purple500, bold: true
  });

  slide22.addText("60년간 '게임'에서 AI를 테스트 → 2022년부터 '실제 업무'로 전환\n이제 AI는 실험실이 아닌 우리 책상 위에 있습니다", {
    x: 0.7, y: 4.4, w: 8.6, h: 0.55,
    fontSize: 12, color: colors.slate600
  });

  slide22.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 23: ChatGPT의 등장 ===========
  let slide23 = pptx.addSlide();
  slide23.background = { color: colors.white };

  slide23.addText("2022년 11월: ChatGPT의 등장", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide23.addText("역사상 가장 빠르게 성장한 서비스", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Growth comparison
  const growthData = [
    { name: "Netflix", users: "1억 명", time: "10년", color: colors.red500, width: 2.5 },
    { name: "Facebook", users: "1억 명", time: "4.5년", color: colors.primary, width: 1.8 },
    { name: "Instagram", users: "1억 명", time: "2.5년", color: colors.purple500, width: 1.2 },
    { name: "ChatGPT", users: "1억 명", time: "2개월", color: colors.green500, width: 0.3 }
  ];

  growthData.forEach((item, idx) => {
    const yPos = 1.5 + idx * 0.85;

    slide23.addText(item.name, {
      x: 0.5, y: yPos + 0.1, w: 1.8, h: 0.4,
      fontSize: 14, color: colors.slate700, bold: true
    });

    slide23.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 2.5, y: yPos, w: item.width * 2.5, h: 0.6,
      fill: { type: "solid", color: item.color }
    });

    slide23.addText(item.time, {
      x: 2.5, y: yPos, w: item.width * 2.5, h: 0.6,
      align: "center", valign: "middle",
      fontSize: 12, color: colors.white, bold: true
    });

    slide23.addText(item.users + " 달성", {
      x: 2.5 + item.width * 2.5 + 0.2, y: yPos + 0.1, w: 2, h: 0.4,
      fontSize: 11, color: colors.slate500
    });
  });

  // Impact stats
  slide23.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.1, w: 2.9, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide23.addText("1.8억+", {
    x: 0.5, y: 4.15, w: 2.9, h: 0.5,
    align: "center", fontSize: 22, color: colors.white, bold: true
  });
  slide23.addText("주간 활성 사용자", {
    x: 0.5, y: 4.6, w: 2.9, h: 0.35,
    align: "center", fontSize: 10, color: colors.slate400
  });

  slide23.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.55, y: 4.1, w: 2.9, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide23.addText("$100B+", {
    x: 3.55, y: 4.15, w: 2.9, h: 0.5,
    align: "center", fontSize: 22, color: colors.white, bold: true
  });
  slide23.addText("OpenAI 기업가치", {
    x: 3.55, y: 4.6, w: 2.9, h: 0.35,
    align: "center", fontSize: 10, color: colors.slate400
  });

  slide23.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 6.6, y: 4.1, w: 2.9, h: 1.0,
    fill: { type: "solid", color: colors.slate900 }
  });
  slide23.addText("92%", {
    x: 6.6, y: 4.15, w: 2.9, h: 0.5,
    align: "center", fontSize: 22, color: colors.white, bold: true
  });
  slide23.addText("Fortune 500 도입률", {
    x: 6.6, y: 4.6, w: 2.9, h: 0.35,
    align: "center", fontSize: 10, color: colors.slate400
  });

  slide23.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 24: LLM의 원리 ===========
  let slide24 = pptx.addSlide();
  slide24.background = { color: colors.white };

  slide24.addText("LLM은 어떻게 작동하는가?", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide24.addText("복잡한 기술, 단순한 원리", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Core concepts
  const llmConcepts = [
    {
      title: "토큰화 (Tokenization)",
      desc: "문장을 작은 조각으로 분해\n\"안녕하세요\" → [안녕, 하세요]",
      icon: "🧩",
      color: colors.primary
    },
    {
      title: "컨텍스트 윈도우",
      desc: "한 번에 처리할 수 있는 텍스트 양\nGPT-4: 128K 토큰 (책 1권 분량)",
      icon: "📚",
      color: colors.green500
    },
    {
      title: "확률 기반 예측",
      desc: "다음에 올 단어를 확률로 예측\n\"오늘 날씨가\" → \"좋다\" (78%)",
      icon: "🎯",
      color: colors.purple500
    }
  ];

  llmConcepts.forEach((concept, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide24.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 2.2,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide24.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 0.08,
      fill: { type: "solid", color: concept.color }
    });

    slide24.addText(concept.icon, {
      x: xPos, y: 1.55, w: 3.0, h: 0.5,
      align: "center", fontSize: 28
    });

    slide24.addText(concept.title, {
      x: xPos + 0.15, y: 2.1, w: 2.7, h: 0.4,
      fontSize: 13, color: colors.slate900, bold: true, align: "center"
    });

    slide24.addText(concept.desc, {
      x: xPos + 0.15, y: 2.55, w: 2.7, h: 0.9,
      fontSize: 10, color: colors.slate600, align: "center"
    });
  });

  // Simple explanation
  slide24.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.85, w: 9, h: 1.15,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide24.addText("🤔 쉽게 말하면?", {
    x: 0.7, y: 3.95, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide24.addText("LLM = \"엄청나게 많은 책을 읽고, 문맥을 이해하며, 다음에 올 말을 예측하는 시스템\"\n→ 단순한 예측이지만, 규모가 커지면 '이해'처럼 보이는 능력이 생깁니다", {
    x: 0.7, y: 4.35, w: 8.6, h: 0.6,
    fontSize: 11, color: colors.slate600
  });

  slide24.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 25: AI 활용 단계 ===========
  let slide25 = pptx.addSlide();
  slide25.background = { color: colors.white };

  slide25.addText("AI 활용의 3단계", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide25.addText("여러분은 어느 단계에 있나요?", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const aiStages = [
    {
      level: "Lv.1",
      title: "도구로 사용",
      desc: "ChatGPT에게 질문하기\n번역, 요약, 아이디어 요청",
      example: "\"이 이메일 영어로 번역해줘\"",
      color: colors.green500,
      bgColor: colors.green100
    },
    {
      level: "Lv.2",
      title: "원리 이해",
      desc: "프롬프트 엔지니어링 학습\n효과적인 지시 방법 습득",
      example: "\"역할-맥락-형식을 구조화\"",
      color: colors.primary,
      bgColor: colors.blue100
    },
    {
      level: "Lv.3",
      title: "직접 구축",
      desc: "AI 에이전트 설계 및 구현\nAPI 연동, 자동화 워크플로우",
      example: "\"AI 기반 업무 자동화 시스템\"",
      color: colors.purple500,
      bgColor: colors.purple100
    }
  ];

  // Arrow
  slide25.addShape(pptx.shapes.RECTANGLE, {
    x: 1.0, y: 2.9, w: 8, h: 0.06,
    fill: { type: "solid", color: colors.slate300 }
  });
  slide25.addText("성장 방향 →", {
    x: 6.5, y: 2.5, w: 2.5, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  aiStages.forEach((stage, idx) => {
    const xPos = 0.5 + idx * 3.15;

    slide25.addShape(pptx.shapes.OVAL, {
      x: xPos + 1.25, y: 2.7, w: 0.5, h: 0.5,
      fill: { type: "solid", color: stage.color }
    });
    slide25.addText(stage.level, {
      x: xPos + 1.25, y: 2.7, w: 0.5, h: 0.5,
      align: "center", valign: "middle",
      fontSize: 10, color: colors.white, bold: true
    });

    slide25.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.3, w: 3.0, h: 1.85,
      fill: { type: "solid", color: stage.bgColor }
    });

    slide25.addText(stage.title, {
      x: xPos, y: 3.4, w: 3.0, h: 0.4,
      align: "center", fontSize: 16, color: stage.color, bold: true
    });

    slide25.addText(stage.desc, {
      x: xPos + 0.15, y: 3.8, w: 2.7, h: 0.7,
      fontSize: 11, color: colors.slate600, align: "center"
    });

    slide25.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.2, y: 4.55, w: 2.6, h: 0.5,
      fill: { type: "solid", color: colors.white }
    });
    slide25.addText(stage.example, {
      x: xPos + 0.2, y: 4.55, w: 2.6, h: 0.5,
      align: "center", valign: "middle",
      fontSize: 9, color: colors.slate500
    });
  });

  slide25.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 26: 기업의 AI 활용 ===========
  let slide26 = pptx.addSlide();
  slide26.background = { color: colors.white };

  slide26.addText("기업은 AI를 어떻게 활용하는가", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide26.addText("실제 비즈니스 적용 영역", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const bizAreas = [
    { icon: "🎯", title: "고객 경험", items: ["AI 챗봇/상담", "개인화 추천", "음성 비서"], color: colors.primary },
    { icon: "⚡", title: "생산성 향상", items: ["문서 자동 작성", "코드 생성", "데이터 분석"], color: colors.green500 },
    { icon: "🧠", title: "의사결정 지원", items: ["시장 분석", "위험 예측", "전략 제안"], color: colors.purple500 },
    { icon: "🔧", title: "운영 최적화", items: ["품질 검사", "재고 관리", "일정 최적화"], color: colors.amber500 }
  ];

  bizAreas.forEach((area, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide26.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 2.5,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide26.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 0.06,
      fill: { type: "solid", color: area.color }
    });

    slide26.addText(area.icon, {
      x: xPos, y: 1.55, w: 2.25, h: 0.5,
      align: "center", fontSize: 26
    });

    slide26.addText(area.title, {
      x: xPos, y: 2.05, w: 2.25, h: 0.4,
      align: "center", fontSize: 14, color: colors.slate900, bold: true
    });

    area.items.forEach((item, iIdx) => {
      slide26.addText("• " + item, {
        x: xPos + 0.15, y: 2.5 + iIdx * 0.4, w: 2.0, h: 0.35,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  // Stats
  slide26.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.15, w: 9, h: 0.9,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide26.addText("📊 McKinsey 2024: AI 도입 기업의 생산성", {
    x: 0.7, y: 4.25, w: 4, h: 0.35,
    fontSize: 12, color: colors.white, bold: true
  });

  slide26.addText("평균 40% 향상", {
    x: 5, y: 4.25, w: 2, h: 0.35,
    fontSize: 14, color: colors.green500, bold: true
  });

  slide26.addText(" | 도입률 72%", {
    x: 7, y: 4.25, w: 2.3, h: 0.35,
    fontSize: 12, color: colors.slate400
  });

  slide26.addText("\"AI를 도입하지 않는 것이 더 큰 리스크가 되는 시대\"", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.3,
    fontSize: 11, color: colors.slate400
  });

  slide26.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 27: 실제 사례 - 두산 ===========
  let slide27 = pptx.addSlide();
  slide27.background = { color: colors.white };

  slide27.addText("사례: 두산의 생성형 AI 혁신", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide27.addText("제조업에서의 AI 활용 사례", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Company info
  slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.4, w: 4.5, h: 1.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  slide27.addText("🏭 두산그룹", {
    x: 0.6, y: 1.5, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.slate900, bold: true
  });

  slide27.addText("• 에너지, 인프라, 로봇 등 사업 영역\n• 전통 제조업 → AI 기반 디지털 전환\n• 2024년 그룹 전체 AI 도입 선언", {
    x: 0.6, y: 1.95, w: 4.1, h: 1.0,
    fontSize: 12, color: colors.slate600
  });

  // AI Applications
  slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.4, w: 4.5, h: 1.6,
    fill: { type: "solid", color: colors.primary }
  });

  slide27.addText("🤖 AI 적용 분야", {
    x: 5.3, y: 1.5, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.white, bold: true
  });

  slide27.addText("• 기술 문서 자동 번역/생성\n• 설계 도면 분석 및 오류 검출\n• 고객 문의 자동 응대 시스템", {
    x: 5.3, y: 1.95, w: 4.1, h: 1.0,
    fontSize: 12, color: "bfdbfe"
  });

  // Results
  slide27.addText("💡 도입 효과", {
    x: 0.5, y: 3.2, w: 9, h: 0.4,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const doosanResults = [
    { metric: "문서 작업 시간", before: "8시간", after: "30분", improvement: "93% ↓", color: colors.green500 },
    { metric: "번역 비용", before: "건당 10만원", after: "건당 1천원", improvement: "99% ↓", color: colors.primary },
    { metric: "고객 응대 속도", before: "평균 2일", after: "실시간", improvement: "즉시 대응", color: colors.purple500 }
  ];

  doosanResults.forEach((result, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.6, w: 3.0, h: 1.4,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide27.addText(result.metric, {
      x: xPos, y: 3.7, w: 3.0, h: 0.35,
      align: "center", fontSize: 12, color: colors.slate700, bold: true
    });

    slide27.addText(result.before + " → " + result.after, {
      x: xPos, y: 4.05, w: 3.0, h: 0.35,
      align: "center", fontSize: 11, color: colors.slate500
    });

    slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.5, y: 4.45, w: 2.0, h: 0.4,
      fill: { type: "solid", color: result.color }
    });
    slide27.addText(result.improvement, {
      x: xPos + 0.5, y: 4.45, w: 2.0, h: 0.4,
      align: "center", valign: "middle",
      fontSize: 12, color: colors.white, bold: true
    });
  });

  slide27.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 28: AI 에이전트란? ===========
  let slide28 = pptx.addSlide();
  slide28.background = { color: colors.white };

  slide28.addText("AI 에이전트란?", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide28.addText("단순 챗봇을 넘어, 자율적으로 작업하는 AI", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Comparison
  slide28.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide28.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.slate400 }
  });

  slide28.addText("💬 일반 AI (ChatGPT)", {
    x: 0.6, y: 1.6, w: 4.1, h: 0.4,
    fontSize: 13, color: colors.slate700, bold: true
  });

  slide28.addText("• 질문하면 답변\n• 한 번에 하나의 작업\n• 사용자가 모든 것을 지시\n• 결과물 직접 확인/수정 필요", {
    x: 0.6, y: 2.05, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate500
  });

  slide28.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.purple100 }
  });
  slide28.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 1.5, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.purple500 }
  });

  slide28.addText("🤖 AI 에이전트", {
    x: 5.3, y: 1.6, w: 4.1, h: 0.4,
    fontSize: 13, color: colors.purple500, bold: true
  });

  slide28.addText("• 목표를 주면 스스로 계획\n• 여러 작업을 순차적/병렬 실행\n• 도구(Tool) 활용 가능\n• 스스로 검증하고 수정", {
    x: 5.3, y: 2.05, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // Example
  slide28.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.7, w: 9.2, h: 1.35,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide28.addText("📋 예시: \"다음 주 회의 준비해줘\"", {
    x: 0.6, y: 3.8, w: 8.8, h: 0.35,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide28.addText("일반 AI: \"회의 준비 체크리스트를 알려드릴게요...\" (텍스트만 제공)\nAI 에이전트: 캘린더 확인 → 참석자에게 메일 발송 → 회의실 예약 → 아젠다 문서 생성 → 슬랙 알림 (실제 실행)", {
    x: 0.6, y: 4.2, w: 8.8, h: 0.75,
    fontSize: 11, color: colors.slate600
  });

  slide28.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 29: MCP (Model Context Protocol) ===========
  let slide29 = pptx.addSlide();
  slide29.background = { color: colors.white };

  slide29.addText("MCP: AI와 세상을 연결하는 표준", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide29.addText("Model Context Protocol - AI 에이전트의 핵심 기술", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // MCP Diagram
  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 2.0, h: 1.2,
    fill: { type: "solid", color: colors.primary }
  });
  slide29.addText("🧠\nAI 모델", {
    x: 0.5, y: 1.5, w: 2.0, h: 1.2,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  slide29.addText("←→", {
    x: 2.6, y: 1.85, w: 0.8, h: 0.5,
    align: "center", fontSize: 20, color: colors.slate400
  });

  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.5, y: 1.5, w: 2.5, h: 1.2,
    fill: { type: "solid", color: colors.purple500 }
  });
  slide29.addText("🔌\nMCP 서버", {
    x: 3.5, y: 1.5, w: 2.5, h: 1.2,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  slide29.addText("←→", {
    x: 6.1, y: 1.85, w: 0.8, h: 0.5,
    align: "center", fontSize: 20, color: colors.slate400
  });

  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7, y: 1.5, w: 2.5, h: 1.2,
    fill: { type: "solid", color: colors.green500 }
  });
  slide29.addText("🛠️\n외부 도구", {
    x: 7, y: 1.5, w: 2.5, h: 1.2,
    align: "center", valign: "middle",
    fontSize: 14, color: colors.white, bold: true
  });

  // Tools examples
  const mcpTools = [
    { name: "파일 시스템", icon: "📁" },
    { name: "웹 브라우저", icon: "🌐" },
    { name: "데이터베이스", icon: "🗄️" },
    { name: "API 호출", icon: "🔗" },
    { name: "슬랙/이메일", icon: "💬" }
  ];

  mcpTools.forEach((tool, idx) => {
    slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5 + idx * 1.85, y: 3.0, w: 1.7, h: 0.7,
      fill: { type: "solid", color: colors.slate100 }
    });
    slide29.addText(tool.icon + " " + tool.name, {
      x: 0.5 + idx * 1.85, y: 3.0, w: 1.7, h: 0.7,
      align: "center", valign: "middle",
      fontSize: 10, color: colors.slate600
    });
  });

  // Key point
  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.95, w: 9, h: 1.1,
    fill: { type: "solid", color: colors.purple100 }
  });

  slide29.addText("🎯 핵심 포인트", {
    x: 0.7, y: 4.05, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.purple500, bold: true
  });

  slide29.addText("MCP = AI가 '손'과 '눈'을 가지게 해주는 표준 프로토콜\n→ AI가 실제 세상과 상호작용할 수 있게 됨 (파일 읽기/쓰기, 웹 검색, API 호출 등)", {
    x: 0.7, y: 4.45, w: 8.6, h: 0.55,
    fontSize: 11, color: colors.slate600
  });

  slide29.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 30: 에이전트 워크플로우 (Human-in-the-Loop) ===========
  let slide30 = pptx.addSlide();
  slide30.background = { color: colors.white };

  slide30.addText("AI 에이전트 워크플로우", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide30.addText("Human-in-the-Loop: 사람이 방향을 잡고, AI가 실행한다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Main workflow with feedback loop
  // Top flow: User -> Prompt -> Agent -> Tools -> Output
  const workflowSteps = [
    { title: "사용자", desc: "목표 제시", icon: "👤", color: colors.primary },
    { title: "프롬프트", desc: "명확한 지시", icon: "📝", color: colors.slate500 },
    { title: "에이전트", desc: "계획 & 실행", icon: "🤖", color: colors.purple500 },
    { title: "도구 활용", desc: "MCP 연동", icon: "🔧", color: colors.amber500 },
    { title: "결과물", desc: "중간 산출물", icon: "📄", color: colors.green500 }
  ];

  workflowSteps.forEach((item, idx) => {
    const xPos = 0.4 + idx * 1.9;

    if (idx > 0) {
      slide30.addText("→", {
        x: xPos - 0.35, y: 1.75, w: 0.4, h: 0.5,
        align: "center", fontSize: 18, color: colors.slate300
      });
    }

    slide30.addShape(pptx.shapes.OVAL, {
      x: xPos + 0.5, y: 1.35, w: 0.7, h: 0.7,
      fill: { type: "solid", color: item.color }
    });
    slide30.addText(item.icon, {
      x: xPos + 0.5, y: 1.35, w: 0.7, h: 0.7,
      align: "center", valign: "middle", fontSize: 20
    });

    slide30.addText(item.title, {
      x: xPos, y: 2.1, w: 1.7, h: 0.3,
      align: "center", fontSize: 12, color: colors.slate900, bold: true
    });

    slide30.addText(item.desc, {
      x: xPos, y: 2.4, w: 1.7, h: 0.25,
      align: "center", fontSize: 9, color: colors.slate500
    });
  });

  // Feedback loop arrow (curved back to user)
  slide30.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.5, y: 2.75, w: 7, h: 0.5,
    fill: { type: "solid", color: colors.red100 }
  });
  slide30.addText("🔄 피드백 루프: 검토 → 방향 수정 → 재지시 (반복)", {
    x: 1.5, y: 2.75, w: 7, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 11, color: colors.red500, bold: true
  });

  // Human-in-the-Loop explanation
  slide30.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.4, w: 4.5, h: 1.7,
    fill: { type: "solid", color: colors.primary }
  });

  slide30.addText("🧑‍💼 Human-in-the-Loop", {
    x: 0.6, y: 3.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.white, bold: true
  });

  slide30.addText("• AI가 자율 실행해도 사람이 '감독'\n• 매 단계마다 방향성 확인 필수\n• 잘못된 방향 → 즉시 수정 지시\n• 최종 책임은 항상 사람에게", {
    x: 0.6, y: 3.9, w: 4.1, h: 1.1,
    fontSize: 11, color: "bfdbfe"
  });

  // Why it matters
  slide30.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 3.4, w: 4.5, h: 1.7,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide30.addText("⚠️ 왜 중요한가?", {
    x: 5.3, y: 3.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide30.addText("• AI는 '확신 있게' 틀릴 수 있음\n• 방치하면 엉뚱한 방향으로 폭주\n• 중간 점검 없으면 시간/비용 낭비\n• 결국 사람의 판단력이 품질 결정", {
    x: 5.3, y: 3.9, w: 4.1, h: 1.1,
    fontSize: 11, color: colors.slate600
  });

  slide30.addText("💡 AI는 비서이고, 여러분은 팀장입니다. 팀장은 비서에게 일을 맡기되, 방향을 계속 체크합니다.", {
    x: 0.5, y: 5.2, w: 7, h: 0.3,
    fontSize: 10, color: colors.slate500
  });

  slide30.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 31: AI를 잘 활용하는 사람의 조건 ===========
  let slide31 = pptx.addSlide();
  slide31.background = { color: colors.white };

  slide31.addText("AI를 잘 활용하는 사람의 조건", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide31.addText("도구가 아무리 좋아도, 목적지를 모르면 소용없다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Core formula
  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.45, w: 9, h: 1.1,
    fill: { type: "solid", color: colors.navy }
  });

  slide31.addText("🎯 완성된 결과를 그릴 줄 아는 사람  +  🗺️ 거기까지의 과정을 설계할 줄 아는 사람", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.45,
    align: "center", fontSize: 15, color: colors.white, bold: true
  });

  slide31.addText("= AI로 각 단계를 가속화하여 10배의 생산성을 얻는 사람", {
    x: 0.7, y: 2.05, w: 8.6, h: 0.4,
    align: "center", fontSize: 14, color: colors.accent
  });

  // Two types comparison
  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 2.75, w: 4.5, h: 1.65,
    fill: { type: "solid", color: colors.green100 }
  });
  slide31.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 2.75, w: 0.08, h: 1.65,
    fill: { type: "solid", color: colors.green500 }
  });

  slide31.addText("✅ AI를 잘 쓰는 사람", {
    x: 0.6, y: 2.85, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.green500, bold: true
  });

  slide31.addText("• 만들고 싶은 것이 명확함\n• 완성까지의 단계를 알고 있음\n• 어디서 AI를 쓸지 판단 가능\n• 결과물의 품질을 평가할 수 있음", {
    x: 0.6, y: 3.2, w: 4.1, h: 1.1,
    fontSize: 11, color: colors.slate600
  });

  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 2.75, w: 4.5, h: 1.65,
    fill: { type: "solid", color: colors.red100 }
  });
  slide31.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 2.75, w: 0.08, h: 1.65,
    fill: { type: "solid", color: colors.red500 }
  });

  slide31.addText("❌ AI를 못 쓰는 사람", {
    x: 5.3, y: 2.85, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide31.addText("• 뭘 만들지 자체가 불명확함\n• 과정을 모르니 지시도 못함\n• AI 결과물 좋은지 나쁜지 판단 불가\n• \"AI가 알아서 해주겠지\" 기대만", {
    x: 5.3, y: 3.2, w: 4.1, h: 1.1,
    fontSize: 11, color: colors.slate600
  });

  // Key message: Domain knowledge
  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.55, w: 9, h: 0.8,
    fill: { type: "solid", color: colors.purple500 }
  });

  slide31.addText("💡 그래서 도메인 지식이 중요합니다", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.35,
    fontSize: 14, color: colors.white, bold: true
  });

  slide31.addText("내가 뭘 하고 싶은지, 그걸 위해 뭐가 필요한지 모르면 → AI는 그냥 비싼 장난감일 뿐", {
    x: 0.7, y: 4.95, w: 8.6, h: 0.3,
    fontSize: 11, color: "e9d5ff"
  });

  slide31.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.45, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 32: 코딩의 변화 ===========
  let slide32 = pptx.addSlide();
  slide32.background = { color: colors.white };

  slide32.addText("코딩의 패러다임 변화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide32.addText("\"0에서 1\"에서 \"Plan-Generate-Modify-Repeat\"으로", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Before vs After
  slide32.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.red100 }
  });
  slide32.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.red500 }
  });

  slide32.addText("❌ 과거: 0에서 1 코딩", {
    x: 0.6, y: 1.6, w: 4.1, h: 0.4,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide32.addText("• 빈 파일에서 시작\n• 모든 코드를 직접 작성\n• 문법, 로직, 디버깅 모두 사람이\n• 시간 대부분을 '타이핑'에 소비", {
    x: 0.6, y: 2.05, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate500
  });

  slide32.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.5, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.green100 }
  });
  slide32.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 1.5, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.green500 }
  });

  slide32.addText("✅ 현재: PGMR 사이클", {
    x: 5.3, y: 1.6, w: 4.1, h: 0.4,
    fontSize: 13, color: colors.green500, bold: true
  });

  slide32.addText("• Plan: 무엇을 만들지 설계\n• Generate: AI가 코드 생성\n• Modify: 인간이 검토/수정\n• Repeat: 반복하여 완성", {
    x: 5.3, y: 2.05, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // PGMR Cycle visualization
  slide32.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.35,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide32.addText("🔄 PGMR 사이클", {
    x: 0.7, y: 3.8, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.white, bold: true
  });

  const pgmrSteps = [
    { label: "Plan", color: colors.primary },
    { label: "Generate", color: colors.purple500 },
    { label: "Modify", color: colors.amber500 },
    { label: "Repeat", color: colors.green500 }
  ];

  pgmrSteps.forEach((step, idx) => {
    const xPos = 0.9 + idx * 2.2;

    if (idx > 0) {
      slide32.addText("→", {
        x: xPos - 0.5, y: 4.3, w: 0.5, h: 0.4,
        align: "center", fontSize: 16, color: colors.slate500
      });
    }

    slide32.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 4.2, w: 1.7, h: 0.55,
      fill: { type: "solid", color: step.color }
    });
    slide32.addText(step.label, {
      x: xPos, y: 4.2, w: 1.7, h: 0.55,
      align: "center", valign: "middle",
      fontSize: 13, color: colors.white, bold: true
    });
  });

  slide32.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 33: 섹션 3 정리 ===========
  let slide33 = pptx.addSlide();
  slide33.background = { color: colors.navy };

  slide33.addText("Section 2 핵심 정리", {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 14, color: colors.accent
  });

  slide33.addText("AI는 도구가 아니라 동료입니다", {
    x: 0.5, y: 1.2, w: 9, h: 0.8,
    align: "center", fontSize: 36, color: colors.white, bold: true
  });

  slide33.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 2.1, w: 3, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  const section3Summary = [
    { icon: "🚀", text: "ChatGPT: 역사상 가장 빠른 성장, AI 대중화의 시작" },
    { icon: "🏭", text: "기업들의 AI 도입: 생산성 40% 향상, 필수 경쟁력으로 부상" },
    { icon: "🤖", text: "AI 에이전트: 단순 답변 → 자율적 작업 수행으로 진화" },
    { icon: "🔌", text: "MCP: AI가 실제 세상과 상호작용하는 표준 등장" },
    { icon: "💻", text: "코딩의 변화: 0→1 작성에서 Plan-Generate-Modify-Repeat으로" }
  ];

  section3Summary.forEach((point, idx) => {
    slide33.addText(point.icon + "  " + point.text, {
      x: 0.7, y: 2.4 + idx * 0.5, w: 8.6, h: 0.45,
      fontSize: 14, color: colors.white
    });
  });

  slide33.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.5, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =====================================================
  // SECTION 4: 지금 우리가 서 있는 곳 (20분) - Slides 34-43
  // =====================================================

  // =========== SLIDE 34: 섹션 4 타이틀 ===========
  let slide34 = pptx.addSlide();
  slide34.background = { color: colors.green500 };

  slide34.addText("03", {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    align: "center", fontSize: 48, color: "bbf7d0", bold: true
  });

  slide34.addText("지금 우리가 서 있는 곳", {
    x: 0.5, y: 2.3, w: 9, h: 0.9,
    align: "center", fontSize: 48, color: colors.white, bold: true
  });

  slide34.addText("2026년, AI 에이전트 시대의 개막", {
    x: 0.5, y: 3.2, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: "bbf7d0"
  });

  slide34.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 3.9, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.white }
  });

  slide34.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: "bbf7d0"
  });

  // =========== SLIDE 35: 2026년 AI 현황 ===========
  let slide35 = pptx.addSlide();
  slide35.background = { color: colors.white };

  slide35.addText("2026년 AI 현황", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide35.addText("AI는 더 이상 미래가 아닌, 현재입니다", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Market stats
  const aiMarketStats = [
    { label: "글로벌 AI 시장", value: "$500B+", sub: "2026년 예상", color: colors.primary },
    { label: "AI 도입 기업", value: "85%", sub: "Fortune 500 기준", color: colors.green500 },
    { label: "AI 일자리 영향", value: "40%", sub: "업무 자동화 가능", color: colors.amber500 },
    { label: "생성형 AI 사용자", value: "10억+", sub: "전 세계 월간 사용자", color: colors.purple500 }
  ];

  aiMarketStats.forEach((stat, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide35.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 1.5,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide35.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 0.06,
      fill: { type: "solid", color: stat.color }
    });

    slide35.addText(stat.value, {
      x: xPos, y: 1.55, w: 2.25, h: 0.6,
      align: "center", fontSize: 26, color: stat.color, bold: true
    });

    slide35.addText(stat.label, {
      x: xPos, y: 2.15, w: 2.25, h: 0.35,
      align: "center", fontSize: 11, color: colors.slate700, bold: true
    });

    slide35.addText(stat.sub, {
      x: xPos, y: 2.5, w: 2.25, h: 0.3,
      align: "center", fontSize: 9, color: colors.slate500
    });
  });

  // Key players
  slide35.addText("🏢 주요 플레이어", {
    x: 0.5, y: 3.1, w: 9, h: 0.4,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const aiPlayers = [
    { name: "OpenAI", product: "GPT-5.2, Sora", valuation: "$150B+" },
    { name: "Anthropic", product: "Claude 4.5 Opus/Sonnet", valuation: "$60B+" },
    { name: "Google", product: "Gemini 3 Pro/Flash", valuation: "빅테크" },
    { name: "Meta", product: "Llama 4 Maverick", valuation: "오픈소스 리더" },
    { name: "xAI", product: "Grok 4 Heavy", valuation: "$50B+" }
  ];

  aiPlayers.forEach((player, idx) => {
    const xPos = 0.4 + idx * 1.9;

    slide35.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.5, w: 1.75, h: 1.05,
      fill: { type: "solid", color: colors.slate900 }
    });

    slide35.addText(player.name, {
      x: xPos, y: 3.55, w: 1.75, h: 0.35,
      align: "center", fontSize: 12, color: colors.white, bold: true
    });

    slide35.addText(player.product, {
      x: xPos, y: 3.9, w: 1.75, h: 0.3,
      align: "center", fontSize: 9, color: colors.accent
    });

    slide35.addText(player.valuation, {
      x: xPos, y: 4.2, w: 1.75, h: 0.25,
      align: "center", fontSize: 8, color: colors.slate400
    });
  });

  slide35.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 36: AI 도구 생태계 ===========
  let slide36 = pptx.addSlide();
  slide36.background = { color: colors.white };

  slide36.addText("AI 도구 생태계", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide36.addText("용도별로 최적화된 AI 서비스들", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const aiTools = [
    {
      category: "범용 AI 어시스턴트",
      tools: ["ChatGPT", "Claude", "Gemini", "Copilot"],
      icon: "💬",
      color: colors.primary
    },
    {
      category: "코딩 AI",
      tools: ["GitHub Copilot", "Cursor", "Claude Code", "Windsurf"],
      icon: "💻",
      color: colors.purple500
    },
    {
      category: "이미지 생성",
      tools: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Ideogram"],
      icon: "🎨",
      color: colors.amber500
    },
    {
      category: "영상/음성",
      tools: ["Sora", "Runway", "ElevenLabs", "Suno"],
      icon: "🎬",
      color: colors.green500
    }
  ];

  aiTools.forEach((cat, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide36.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 2.8,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide36.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 0.06,
      fill: { type: "solid", color: cat.color }
    });

    slide36.addText(cat.icon, {
      x: xPos, y: 1.5, w: 2.25, h: 0.5,
      align: "center", fontSize: 24
    });

    slide36.addText(cat.category, {
      x: xPos, y: 2.0, w: 2.25, h: 0.4,
      align: "center", fontSize: 11, color: colors.slate900, bold: true
    });

    cat.tools.forEach((tool, tIdx) => {
      slide36.addText("• " + tool, {
        x: xPos + 0.15, y: 2.45 + tIdx * 0.4, w: 2.0, h: 0.35,
        fontSize: 10, color: colors.slate600
      });
    });
  });

  // Key message
  slide36.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.45, w: 9, h: 0.65,
    fill: { type: "solid", color: colors.primary }
  });

  slide36.addText("💡 각 도구의 강점을 파악하고, 목적에 맞게 선택하는 것이 중요합니다", {
    x: 0.7, y: 4.55, w: 8.6, h: 0.45,
    align: "center", valign: "middle",
    fontSize: 13, color: colors.white
  });

  slide36.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 37: 코딩 AI 시장 ===========
  let slide37 = pptx.addSlide();
  slide37.background = { color: colors.white };

  slide37.addText("코딩 AI 시장의 격전", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide37.addText("개발자 생산성을 10배로 만드는 도구들", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const codingAIs = [
    {
      name: "GitHub Copilot",
      company: "Microsoft/GitHub",
      feature: "가장 넓은 사용자층\nVS Code 통합",
      users: "1.8M+ 유료",
      color: colors.slate700
    },
    {
      name: "Cursor",
      company: "Cursor Inc.",
      feature: "AI-네이티브 IDE\n코드베이스 이해",
      users: "급성장 중",
      color: colors.purple500
    },
    {
      name: "Claude Code",
      company: "Anthropic",
      feature: "에이전틱 코딩\n터미널 기반",
      users: "2024 출시",
      color: colors.amber500
    },
    {
      name: "Windsurf",
      company: "Codeium",
      feature: "무료 대안\n빠른 응답 속도",
      users: "성장 중",
      color: colors.green500
    }
  ];

  codingAIs.forEach((ai, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide37.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 2.4,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide37.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 0.08,
      fill: { type: "solid", color: ai.color }
    });

    slide37.addText(ai.name, {
      x: xPos, y: 1.55, w: 2.25, h: 0.4,
      align: "center", fontSize: 13, color: colors.slate900, bold: true
    });

    slide37.addText(ai.company, {
      x: xPos, y: 1.95, w: 2.25, h: 0.3,
      align: "center", fontSize: 9, color: colors.slate500
    });

    slide37.addShape(pptx.shapes.RECTANGLE, {
      x: xPos + 0.3, y: 2.3, w: 1.65, h: 0.02,
      fill: { type: "solid", color: colors.slate300 }
    });

    slide37.addText(ai.feature, {
      x: xPos, y: 2.4, w: 2.25, h: 0.8,
      align: "center", fontSize: 10, color: colors.slate600
    });

    slide37.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.25, y: 3.3, w: 1.75, h: 0.4,
      fill: { type: "solid", color: ai.color }
    });
    slide37.addText(ai.users, {
      x: xPos + 0.25, y: 3.3, w: 1.75, h: 0.4,
      align: "center", valign: "middle",
      fontSize: 9, color: colors.white
    });
  });

  // Impact stats
  slide37.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.05, w: 9, h: 1.05,
    fill: { type: "solid", color: colors.slate900 }
  });

  slide37.addText("📊 코딩 AI 도입 효과 (GitHub 2024 연구)", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.35,
    fontSize: 12, color: colors.white, bold: true
  });

  slide37.addText("코드 작성 속도 55% ↑  |  작업 완료율 26% ↑  |  개발자 만족도 75%+  |  \"비개발자도 개발 가능\"의 시대", {
    x: 0.7, y: 4.55, w: 8.6, h: 0.4,
    fontSize: 11, color: colors.slate400
  });

  slide37.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 38: AI의 일상화 ===========
  let slide38 = pptx.addSlide();
  slide38.background = { color: colors.white };

  slide38.addText("AI의 일상화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide38.addText("이미 우리 삶에 깊이 들어온 AI", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const dailyAI = [
    { area: "검색", before: "키워드 입력 → 링크 클릭", after: "질문 → 답변 직접 제공", icon: "🔍" },
    { area: "글쓰기", before: "빈 문서에서 시작", after: "초안 생성 → 수정/보완", icon: "✍️" },
    { area: "이미지", before: "디자이너에게 의뢰", after: "텍스트 → 이미지 생성", icon: "🖼️" },
    { area: "번역", before: "단어 단위 번역", after: "맥락 이해한 자연스러운 번역", icon: "🌐" },
    { area: "학습", before: "책/강의 수동 탐색", after: "맞춤형 튜터링", icon: "📚" },
    { area: "코딩", before: "구글링 → 복붙", after: "자연어로 설명 → 코드 생성", icon: "💻" }
  ];

  dailyAI.forEach((item, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const xPos = 0.4 + col * 3.15;
    const yPos = 1.4 + row * 1.75;

    slide38.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: yPos, w: 3.0, h: 1.55,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide38.addText(item.icon + " " + item.area, {
      x: xPos, y: yPos + 0.1, w: 3.0, h: 0.35,
      align: "center", fontSize: 13, color: colors.slate900, bold: true
    });

    slide38.addText("과거: " + item.before, {
      x: xPos + 0.1, y: yPos + 0.5, w: 2.8, h: 0.4,
      fontSize: 9, color: colors.slate500
    });

    slide38.addText("현재: " + item.after, {
      x: xPos + 0.1, y: yPos + 0.95, w: 2.8, h: 0.5,
      fontSize: 10, color: colors.primary, bold: true
    });
  });

  slide38.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 39: 교육계의 변화 ===========
  let slide39 = pptx.addSlide();
  slide39.background = { color: colors.white };

  slide39.addText("교육계의 변화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide39.addText("AI와 함께하는 새로운 교육 패러다임", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Student perspective
  slide39.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.45, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.blue100 }
  });

  slide39.addText("🎓 학생의 변화", {
    x: 0.6, y: 1.55, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.primary, bold: true
  });

  slide39.addText("• AI 튜터로 24시간 학습 지원\n• 과제/리포트에 AI 활용 보편화\n• \"AI 활용 능력\"이 새로운 역량으로\n• 암기보다 활용/응용 능력 중시", {
    x: 0.6, y: 2.0, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // Educator perspective
  slide39.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.45, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.green100 }
  });

  slide39.addText("👨‍🏫 교수/교사의 변화", {
    x: 5.3, y: 1.55, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.green500, bold: true
  });

  slide39.addText("• AI 보조 강의 자료 제작\n• 평가 방식 재설계 필요\n• \"AI와 협업한 결과물\" 평가 기준\n• 비판적 사고/검증 능력 교육 강화", {
    x: 5.3, y: 2.0, w: 4.1, h: 1.3,
    fontSize: 12, color: colors.slate600
  });

  // Key challenge
  slide39.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.65, w: 9, h: 1.45,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide39.addText("⚠️ 핵심 과제: AI 시대의 평가란?", {
    x: 0.7, y: 3.75, w: 8.6, h: 0.4,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide39.addText("• \"AI가 대신 해줄 수 있는 것\"을 시험 보는 것이 의미가 있는가?\n• 새로운 평가 기준: 문제 정의 능력, AI 활용 능력, 결과물 검증 능력, 창의적 응용\n• 과정 중심 평가, 포트폴리오 평가의 중요성 증가", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.85,
    fontSize: 11, color: colors.slate600
  });

  slide39.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 40: 스탠포드 사례 ===========
  let slide40 = pptx.addSlide();
  slide40.background = { color: colors.white };

  slide40.addText("사례: 스탠포드 CS146S", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide40.addText("\"The Modern Software Developer\" - AI 시대 개발자 교육의 새 표준", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Course info box
  slide40.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.4, w: 9.2, h: 1.3,
    fill: { type: "solid", color: colors.red100 }
  });

  slide40.addText("🎓 Stanford University | Fall 2025 | Mihail Eric (前 Amazon Alexa Tech Lead)", {
    x: 0.6, y: 1.5, w: 8.8, h: 0.35,
    fontSize: 12, color: colors.red500, bold: true
  });

  slide40.addText("\"최초의 종합 대학 과정: 코딩 LLM이 소프트웨어 개발 생명주기 전체를 어떻게 변화시키는지 다룬다\"\n→ AI 코딩 도구 활용이 이제 정규 대학 커리큘럼으로 편입", {
    x: 0.6, y: 1.9, w: 8.8, h: 0.7,
    fontSize: 11, color: colors.slate600
  });

  // Key principles
  slide40.addText("💡 핵심 철학", {
    x: 0.5, y: 2.85, w: 9, h: 0.35,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const stanfordPrinciples = [
    { title: "Human-Agent Engineering", desc: "\"바이브 코딩\"이 아닌 체계적인 AI 협업", color: colors.primary },
    { title: "개발자 = AI 팀 매니저", desc: "열정적인 AI 인턴들을 관리하는 매니저가 되어라", color: colors.purple500 },
    { title: "명확한 컨텍스트 제공", desc: "AI 결과물 품질은 입력의 명확성에 비례", color: colors.green500 }
  ];

  stanfordPrinciples.forEach((prin, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide40.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 3.25, w: 3.0, h: 1.15,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide40.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 3.25, w: 3.0, h: 0.06,
      fill: { type: "solid", color: prin.color }
    });

    slide40.addText(prin.title, {
      x: xPos + 0.1, y: 3.35, w: 2.8, h: 0.4,
      fontSize: 12, color: colors.slate900, bold: true
    });

    slide40.addText(prin.desc, {
      x: xPos + 0.1, y: 3.75, w: 2.8, h: 0.55,
      fontSize: 10, color: colors.slate600
    });
  });

  // Implication
  slide40.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.55, w: 9, h: 0.6,
    fill: { type: "solid", color: colors.navy }
  });

  slide40.addText("📌 시사점: 세계 최고 대학이 \"AI와 함께 코딩하는 법\"을 정규 과목으로 가르치기 시작했다", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 12, color: colors.white
  });

  slide40.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 41: 공공기관의 변화 ===========
  let slide41 = pptx.addSlide();
  slide41.background = { color: colors.white };

  slide41.addText("공공기관의 변화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide41.addText("디지털 정부와 AI 행정의 시대", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const govChanges = [
    { area: "민원 처리", desc: "AI 챗봇 상담\n24시간 민원 접수", icon: "📋", color: colors.primary },
    { area: "정책 분석", desc: "빅데이터 + AI\n정책 시뮬레이션", icon: "📊", color: colors.green500 },
    { area: "문서 작업", desc: "보고서 초안 생성\n회의록 자동 작성", icon: "📝", color: colors.purple500 },
    { area: "번역/통역", desc: "다국어 민원 지원\n실시간 통역", icon: "🌐", color: colors.amber500 }
  ];

  govChanges.forEach((item, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide41.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 1.8,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide41.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 2.25, h: 0.06,
      fill: { type: "solid", color: item.color }
    });

    slide41.addText(item.icon, {
      x: xPos, y: 1.5, w: 2.25, h: 0.45,
      align: "center", fontSize: 22
    });

    slide41.addText(item.area, {
      x: xPos, y: 1.95, w: 2.25, h: 0.35,
      align: "center", fontSize: 13, color: colors.slate900, bold: true
    });

    slide41.addText(item.desc, {
      x: xPos, y: 2.35, w: 2.25, h: 0.75,
      align: "center", fontSize: 10, color: colors.slate600
    });
  });

  // Korea specific
  slide41.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.45, w: 9, h: 1.65,
    fill: { type: "solid", color: colors.primary }
  });

  slide41.addText("🇰🇷 한국 정부의 AI 추진 현황", {
    x: 0.7, y: 3.55, w: 8.6, h: 0.4,
    fontSize: 13, color: colors.white, bold: true
  });

  slide41.addText("• 디지털플랫폼정부 추진 - 공공 AI 서비스 확대\n• 행정안전부: AI 기반 행정 효율화 프로젝트\n• 교육부: AI 디지털교과서 도입 (2025~)\n• 각 부처별 생성형 AI 활용 가이드라인 수립", {
    x: 0.7, y: 4.0, w: 8.6, h: 1.0,
    fontSize: 11, color: "bfdbfe"
  });

  slide41.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 42: 기업의 변화 ===========
  let slide42 = pptx.addSlide();
  slide42.background = { color: colors.white };

  slide42.addText("기업의 변화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide42.addText("AI-First 전략이 생존의 조건", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Before vs After
  slide42.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.4, w: 4.5, h: 1.6,
    fill: { type: "solid", color: colors.red100 }
  });
  slide42.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 1.4, w: 0.08, h: 1.6,
    fill: { type: "solid", color: colors.red500 }
  });

  slide42.addText("❌ AI 도입 전", {
    x: 0.6, y: 1.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide42.addText("• 수작업 데이터 분석 (며칠 소요)\n• 고객 응대 인력 부족\n• 의사결정에 주관적 판단 의존\n• 반복 업무에 인력 낭비", {
    x: 0.6, y: 1.9, w: 4.1, h: 1.0,
    fontSize: 11, color: colors.slate600
  });

  slide42.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.4, w: 4.5, h: 1.6,
    fill: { type: "solid", color: colors.green100 }
  });
  slide42.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 1.4, w: 0.08, h: 1.6,
    fill: { type: "solid", color: colors.green500 }
  });

  slide42.addText("✅ AI 도입 후", {
    x: 5.3, y: 1.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.green500, bold: true
  });

  slide42.addText("• 실시간 데이터 분석 및 인사이트\n• 24/7 AI 고객 응대\n• 데이터 기반 의사결정\n• 창의적 업무에 인력 집중", {
    x: 5.3, y: 1.9, w: 4.1, h: 1.0,
    fontSize: 11, color: colors.slate600
  });

  // Adoption stats
  slide42.addText("📊 산업별 AI 도입률 (2025-2026)", {
    x: 0.5, y: 3.15, w: 9, h: 0.35,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const industries = [
    { name: "IT/테크", rate: 95, color: colors.primary },
    { name: "금융", rate: 85, color: colors.green500 },
    { name: "유통", rate: 75, color: colors.purple500 },
    { name: "제조", rate: 70, color: colors.amber500 },
    { name: "의료", rate: 60, color: colors.red500 }
  ];

  industries.forEach((ind, idx) => {
    const yPos = 3.55 + idx * 0.3;

    slide42.addText(ind.name, {
      x: 0.5, y: yPos, w: 1.2, h: 0.26,
      fontSize: 10, color: colors.slate600
    });

    slide42.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 1.8, y: yPos + 0.02, w: ind.rate * 0.065, h: 0.2,
      fill: { type: "solid", color: ind.color }
    });

    slide42.addText(ind.rate + "%", {
      x: 1.8 + ind.rate * 0.065 + 0.1, y: yPos, w: 0.6, h: 0.26,
      fontSize: 9, color: colors.slate500
    });
  });

  // Source citation
  slide42.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 5.0, w: 9, h: 0.35,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide42.addText("📑 출처: McKinsey \"The State of AI 2025\" | Gartner \"AI Adoption Report 2025\" | 78% 기업이 AI 도입, 23% 에이전트 AI 스케일링 중", {
    x: 0.6, y: 5.02, w: 8.8, h: 0.3,
    fontSize: 8, color: colors.slate500
  });

  slide42.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.4, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 43: 우리의 위치 ===========
  let slide43 = pptx.addSlide();
  slide43.background = { color: colors.white };

  slide43.addText("우리의 위치", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide43.addText("기회의 창이 열려있는 지금, 어디에 서 있는가", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Timeline visualization
  slide43.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 2.0, w: 9, h: 0.08,
    fill: { type: "solid", color: colors.slate300 }
  });

  // Past
  slide43.addShape(pptx.shapes.OVAL, {
    x: 1.0, y: 1.85, w: 0.4, h: 0.4,
    fill: { type: "solid", color: colors.slate400 }
  });
  slide43.addText("2022", {
    x: 0.5, y: 2.3, w: 1.5, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate500
  });
  slide43.addText("ChatGPT 등장\n\"신기하네\"", {
    x: 0.3, y: 2.6, w: 1.8, h: 0.5,
    align: "center", fontSize: 9, color: colors.slate500
  });

  // Present - YOU ARE HERE
  slide43.addShape(pptx.shapes.OVAL, {
    x: 4.3, y: 1.7, w: 0.7, h: 0.7,
    fill: { type: "solid", color: colors.primary }
  });
  slide43.addText("📍", {
    x: 4.3, y: 1.7, w: 0.7, h: 0.7,
    align: "center", valign: "middle", fontSize: 20
  });
  slide43.addText("2026 (NOW)", {
    x: 3.8, y: 2.45, w: 1.8, h: 0.3,
    align: "center", fontSize: 11, color: colors.primary, bold: true
  });
  slide43.addText("AI 에이전트 시대\n\"활용해야 생존\"", {
    x: 3.6, y: 2.75, w: 2.2, h: 0.5,
    align: "center", fontSize: 9, color: colors.primary
  });

  // Future
  slide43.addShape(pptx.shapes.OVAL, {
    x: 7.8, y: 1.85, w: 0.4, h: 0.4,
    fill: { type: "solid", color: colors.slate400 }
  });
  slide43.addText("2030", {
    x: 7.3, y: 2.3, w: 1.5, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate500
  });
  slide43.addText("AI 완전 통합\n\"기본 소양\"", {
    x: 7.1, y: 2.6, w: 1.8, h: 0.5,
    align: "center", fontSize: 9, color: colors.slate500
  });

  // Two paths
  slide43.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.4, w: 4.5, h: 1.55,
    fill: { type: "solid", color: colors.green100 }
  });
  slide43.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 3.4, w: 0.08, h: 1.55,
    fill: { type: "solid", color: colors.green500 }
  });

  slide43.addText("🚀 지금 시작하면", {
    x: 0.6, y: 3.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.green500, bold: true
  });

  slide43.addText("• 얼리 어답터로서 경쟁 우위 확보\n• AI 활용 역량이 차별화 요소\n• 새로운 기회와 가능성 발견\n• 변화를 주도하는 위치", {
    x: 0.6, y: 3.9, w: 4.1, h: 0.95,
    fontSize: 11, color: colors.slate600
  });

  slide43.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 3.4, w: 4.5, h: 1.55,
    fill: { type: "solid", color: colors.red100 }
  });
  slide43.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 3.4, w: 0.08, h: 1.55,
    fill: { type: "solid", color: colors.red500 }
  });

  slide43.addText("⚠️ 미루면", {
    x: 5.3, y: 3.5, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide43.addText("• AI 활용자 vs 비활용자 격차 심화\n• \"AI 문맹\"이 새로운 문맹이 됨\n• 취업/업무에서 경쟁력 하락\n• 따라잡기 점점 어려워짐", {
    x: 5.3, y: 3.9, w: 4.1, h: 0.95,
    fontSize: 11, color: colors.slate600
  });

  slide43.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 44: 섹션 4 정리 ===========
  let slide44 = pptx.addSlide();
  slide44.background = { color: colors.navy };

  slide44.addText("Section 3 핵심 정리", {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 14, color: colors.accent
  });

  slide44.addText("지금이 가장 빠른 시작점입니다", {
    x: 0.5, y: 1.2, w: 9, h: 0.8,
    align: "center", fontSize: 36, color: colors.white, bold: true
  });

  slide44.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 2.1, w: 3, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  const section4Summary = [
    { icon: "📈", text: "AI 시장 $500B+ - 모든 산업에서 필수 기술로 자리매김" },
    { icon: "🛠️", text: "다양한 AI 도구 생태계 - 목적에 맞는 선택이 중요" },
    { icon: "💻", text: "코딩 AI 혁명 - 비개발자도 개발 가능한 시대" },
    { icon: "🏛️", text: "교육/공공/기업 - 모든 영역에서 AI 도입 가속화" },
    { icon: "📍", text: "2026년 지금 - 기회의 창이 열려있는 최적의 시작점" }
  ];

  section4Summary.forEach((point, idx) => {
    slide44.addText(point.icon + "  " + point.text, {
      x: 0.7, y: 2.4 + idx * 0.5, w: 8.6, h: 0.45,
      fontSize: 14, color: colors.white
    });
  });

  slide44.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.5, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =====================================================
  // SECTION 5: 새로운 역할의 정의 (30분) - Slides 45-55
  // =====================================================

  // =========== SLIDE 45: 섹션 5 타이틀 ===========
  let slide45 = pptx.addSlide();
  slide45.background = { color: colors.amber500 };

  slide45.addText("04", {
    x: 0.5, y: 1.5, w: 9, h: 0.8,
    align: "center", fontSize: 48, color: "fef3c7", bold: true
  });

  slide45.addText("새로운 역할의 정의", {
    x: 0.5, y: 2.3, w: 9, h: 0.9,
    align: "center", fontSize: 48, color: colors.white, bold: true
  });

  slide45.addText("AI를 이기는 사람이 아니라, AI를 이끄는 사람", {
    x: 0.5, y: 3.2, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: "fef3c7"
  });

  slide45.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 3.9, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.white }
  });

  slide45.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: "fef3c7"
  });

  // =========== SLIDE 46: 역할의 전환 ===========
  let slide46 = pptx.addSlide();
  slide46.background = { color: colors.white };

  slide46.addText("역할의 전환", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide46.addText("소비자에서 생산자로, 사용자에서 제작자로", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Before -> After transformation
  slide46.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.5, w: 3.8, h: 2.2,
    fill: { type: "solid", color: colors.slate100 }
  });

  slide46.addText("👤 과거의 역할", {
    x: 0.6, y: 1.6, w: 3.4, h: 0.4,
    fontSize: 14, color: colors.slate500, bold: true
  });

  slide46.addText("• 소프트웨어 사용자\n• 서비스 소비자\n• 정보 검색자\n• 도구에 적응하는 사람", {
    x: 0.6, y: 2.1, w: 3.4, h: 1.4,
    fontSize: 12, color: colors.slate600
  });

  // Arrow
  slide46.addText("→", {
    x: 4.3, y: 2.3, w: 0.6, h: 0.6,
    align: "center", fontSize: 32, color: colors.amber500
  });

  slide46.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.0, y: 1.5, w: 4.5, h: 2.2,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide46.addText("🚀 AI 시대의 역할", {
    x: 5.2, y: 1.6, w: 4.1, h: 0.4,
    fontSize: 14, color: colors.amber500, bold: true
  });

  slide46.addText("• 서비스 제작자/제공자\n• 솔루션 설계자\n• AI 팀의 매니저\n• 도구를 만들고 조합하는 사람", {
    x: 5.2, y: 2.1, w: 4.1, h: 1.4,
    fontSize: 12, color: colors.slate600
  });

  // Key message
  slide46.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.9, w: 9, h: 1.15,
    fill: { type: "solid", color: colors.navy }
  });

  slide46.addText("💡 핵심 전환", {
    x: 0.7, y: 4.0, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.white, bold: true
  });

  slide46.addText("\"이 앱 어떻게 쓰지?\" → \"이런 앱을 만들어볼까?\"\n\"이 문제 누가 해결해주지?\" → \"내가 AI와 함께 해결해볼까?\"", {
    x: 0.7, y: 4.4, w: 8.6, h: 0.6,
    fontSize: 12, color: colors.white
  });

  slide46.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 47: 개발자의 변화 ===========
  let slide47 = pptx.addSlide();
  slide47.background = { color: colors.white };

  slide47.addText("개발자의 역할 변화", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide47.addText("코더에서 아키텍트이자 감독관으로", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Role comparison
  const devRoles = [
    {
      era: "과거",
      title: "코더 (Coder)",
      tasks: ["코드 한 줄 한 줄 직접 작성", "문법 오류 수동 디버깅", "스택오버플로우 복붙", "라이브러리 문서 정독"],
      icon: "⌨️",
      color: colors.slate500,
      bgColor: colors.slate100
    },
    {
      era: "현재",
      title: "아키텍트 + 감독관",
      tasks: ["전체 시스템 설계", "AI에게 명확한 지시", "결과물 검증 및 수정", "품질 기준 관리"],
      icon: "🎬",
      color: colors.primary,
      bgColor: colors.blue100
    }
  ];

  devRoles.forEach((role, idx) => {
    const xPos = 0.4 + idx * 4.7;

    slide47.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 4.5, h: 2.6,
      fill: { type: "solid", color: role.bgColor }
    });

    slide47.addText(role.icon + " " + role.era, {
      x: xPos + 0.2, y: 1.5, w: 4.1, h: 0.35,
      fontSize: 12, color: role.color
    });

    slide47.addText(role.title, {
      x: xPos + 0.2, y: 1.85, w: 4.1, h: 0.45,
      fontSize: 18, color: colors.slate900, bold: true
    });

    role.tasks.forEach((task, tIdx) => {
      slide47.addText("• " + task, {
        x: xPos + 0.2, y: 2.4 + tIdx * 0.4, w: 4.1, h: 0.35,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  // Key insight
  slide47.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.2, w: 9, h: 0.9,
    fill: { type: "solid", color: colors.purple500 }
  });

  slide47.addText("🎯 영화 감독처럼: 직접 연기하지 않지만, 무엇을 어떻게 찍을지 결정하고, 결과물의 품질을 책임진다", {
    x: 0.7, y: 4.35, w: 8.6, h: 0.6,
    align: "center", valign: "middle",
    fontSize: 13, color: colors.white
  });

  slide47.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 48: 10x 생산성 ===========
  let slide48 = pptx.addSlide();
  slide48.background = { color: colors.white };

  slide48.addText("10x 생산성의 시대", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide48.addText("AI 활용으로 10배의 효율을 달성하는 방법", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // 10x formula
  slide48.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.45, w: 9, h: 1.0,
    fill: { type: "solid", color: colors.green500 }
  });

  slide48.addText("10x = 명확한 목표 × AI 가속화 × 빠른 반복", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.4,
    align: "center", fontSize: 20, color: colors.white, bold: true
  });

  slide48.addText("목표가 불명확하면 AI도 소용없고, AI 없이는 속도가 안 나고, 반복 없이는 품질이 안 나온다", {
    x: 0.7, y: 2.0, w: 8.6, h: 0.35,
    align: "center", fontSize: 11, color: "bbf7d0"
  });

  // Examples
  const productivityExamples = [
    {
      task: "웹사이트 제작",
      before: "2-3개월",
      after: "1-2주",
      multiplier: "10x",
      color: colors.primary
    },
    {
      task: "데이터 분석 보고서",
      before: "1주일",
      after: "반나절",
      multiplier: "10x",
      color: colors.purple500
    },
    {
      task: "마케팅 콘텐츠 10개",
      before: "5일",
      after: "반나절",
      multiplier: "10x",
      color: colors.amber500
    },
    {
      task: "앱 프로토타입",
      before: "1개월",
      after: "3일",
      multiplier: "10x",
      color: colors.green500
    }
  ];

  productivityExamples.forEach((ex, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide48.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.65, w: 2.25, h: 1.9,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide48.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 2.65, w: 2.25, h: 0.06,
      fill: { type: "solid", color: ex.color }
    });

    slide48.addText(ex.task, {
      x: xPos, y: 2.75, w: 2.25, h: 0.4,
      align: "center", fontSize: 11, color: colors.slate900, bold: true
    });

    slide48.addText("Before: " + ex.before, {
      x: xPos, y: 3.2, w: 2.25, h: 0.3,
      align: "center", fontSize: 10, color: colors.slate500
    });

    slide48.addText("After: " + ex.after, {
      x: xPos, y: 3.5, w: 2.25, h: 0.3,
      align: "center", fontSize: 10, color: colors.green500
    });

    slide48.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos + 0.5, y: 3.95, w: 1.25, h: 0.45,
      fill: { type: "solid", color: ex.color }
    });
    slide48.addText(ex.multiplier, {
      x: xPos + 0.5, y: 3.95, w: 1.25, h: 0.45,
      align: "center", valign: "middle",
      fontSize: 14, color: colors.white, bold: true
    });
  });

  slide48.addText("⚠️ 단, AI가 모든 것을 해주는 게 아니라 '가속화'해주는 것 - 방향은 여전히 사람이 잡아야 함", {
    x: 0.5, y: 4.7, w: 9, h: 0.4,
    align: "center", fontSize: 10, color: colors.slate500
  });

  slide48.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 49: 필수 역량 - 프롬프트 엔지니어링 ===========
  let slide49 = pptx.addSlide();
  slide49.background = { color: colors.white };

  slide49.addText("필수 역량 ①: 프롬프트 엔지니어링", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide49.addText("효과적인 지시의 기술 - AI에게 원하는 것을 정확히 전달하기", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Bad vs Good prompt
  slide49.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.45, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.red100 }
  });
  slide49.addShape(pptx.shapes.RECTANGLE, {
    x: 0.4, y: 1.45, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.red500 }
  });

  slide49.addText("❌ 나쁜 프롬프트", {
    x: 0.6, y: 1.55, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide49.addText("\"마케팅 글 써줘\"\n\n→ 결과: 두루뭉술한 일반적인 글\n→ 원하는 것과 거리가 먼 결과물\n→ 재작업 필요, 시간 낭비", {
    x: 0.6, y: 1.95, w: 4.1, h: 1.4,
    fontSize: 11, color: colors.slate600
  });

  slide49.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.45, w: 4.5, h: 2.0,
    fill: { type: "solid", color: colors.green100 }
  });
  slide49.addShape(pptx.shapes.RECTANGLE, {
    x: 5.1, y: 1.45, w: 0.08, h: 2.0,
    fill: { type: "solid", color: colors.green500 }
  });

  slide49.addText("✅ 좋은 프롬프트", {
    x: 5.3, y: 1.55, w: 4.1, h: 0.35,
    fontSize: 13, color: colors.green500, bold: true
  });

  slide49.addText("\"20대 대학생 대상, 인스타그램용,\nAI 강의 홍보 글, 200자 이내,\n친근한 말투, CTA 포함\"\n→ 결과: 바로 사용 가능한 맞춤 글", {
    x: 5.3, y: 1.95, w: 4.1, h: 1.4,
    fontSize: 11, color: colors.slate600
  });

  // Framework
  slide49.addText("🔧 프롬프트 프레임워크: CRISPE", {
    x: 0.5, y: 3.6, w: 9, h: 0.4,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const crispe = [
    { letter: "C", word: "Context", desc: "배경/상황" },
    { letter: "R", word: "Role", desc: "AI의 역할" },
    { letter: "I", word: "Input", desc: "제공할 정보" },
    { letter: "S", word: "Steps", desc: "수행 단계" },
    { letter: "P", word: "Parameters", desc: "형식/길이" },
    { letter: "E", word: "Example", desc: "예시 제공" }
  ];

  crispe.forEach((item, idx) => {
    const xPos = 0.4 + idx * 1.55;

    slide49.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 4.0, w: 1.45, h: 1.0,
      fill: { type: "solid", color: colors.primary }
    });

    slide49.addText(item.letter, {
      x: xPos, y: 4.05, w: 1.45, h: 0.4,
      align: "center", fontSize: 18, color: colors.white, bold: true
    });

    slide49.addText(item.word, {
      x: xPos, y: 4.45, w: 1.45, h: 0.25,
      align: "center", fontSize: 9, color: "bfdbfe"
    });

    slide49.addText(item.desc, {
      x: xPos, y: 4.7, w: 1.45, h: 0.25,
      align: "center", fontSize: 8, color: "93c5fd"
    });
  });

  slide49.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 50: 필수 역량 - 컨텍스트 관리 ===========
  let slide50 = pptx.addSlide();
  slide50.background = { color: colors.white };

  slide50.addText("필수 역량 ②: 컨텍스트 관리", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide50.addText("AI에게 올바른 맥락을 제공하는 기술", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Context importance
  slide50.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.45, w: 9, h: 1.1,
    fill: { type: "solid", color: colors.purple100 }
  });

  slide50.addText("🧠 AI는 '읽은 것'만 안다", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.35,
    fontSize: 14, color: colors.purple500, bold: true
  });

  slide50.addText("컨텍스트 윈도우 안에 있는 정보만 활용 가능 → 필요한 정보를 명시적으로 제공해야 함\n\"내 프로젝트 알지?\" (X) vs \"이 프로젝트는 React로 만든 쇼핑몰이고...\" (O)", {
    x: 0.7, y: 1.95, w: 8.6, h: 0.55,
    fontSize: 11, color: colors.slate600
  });

  // Context types
  const contextTypes = [
    { type: "프로젝트 컨텍스트", items: ["기술 스택", "폴더 구조", "코딩 컨벤션"], icon: "📁", color: colors.primary },
    { type: "도메인 컨텍스트", items: ["비즈니스 규칙", "용어 정의", "제약 조건"], icon: "🏢", color: colors.green500 },
    { type: "대화 컨텍스트", items: ["이전 대화 내용", "결정된 사항", "피드백 이력"], icon: "💬", color: colors.amber500 }
  ];

  contextTypes.forEach((ctx, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide50.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.75, w: 3.0, h: 1.7,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide50.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 2.75, w: 3.0, h: 0.06,
      fill: { type: "solid", color: ctx.color }
    });

    slide50.addText(ctx.icon + " " + ctx.type, {
      x: xPos + 0.1, y: 2.85, w: 2.8, h: 0.4,
      fontSize: 12, color: colors.slate900, bold: true
    });

    ctx.items.forEach((item, iIdx) => {
      slide50.addText("• " + item, {
        x: xPos + 0.1, y: 3.3 + iIdx * 0.35, w: 2.8, h: 0.3,
        fontSize: 10, color: colors.slate600
      });
    });
  });

  // Tips
  slide50.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.6, w: 9, h: 0.55,
    fill: { type: "solid", color: colors.navy }
  });

  slide50.addText("💡 팁: README, 스타일 가이드, 예시 코드를 AI에게 먼저 읽혀라 → 결과물 품질이 확 달라진다", {
    x: 0.7, y: 4.65, w: 8.6, h: 0.45,
    align: "center", valign: "middle",
    fontSize: 11, color: colors.white
  });

  slide50.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 51: 필수 역량 - 검증과 판단 ===========
  let slide51 = pptx.addSlide();
  slide51.background = { color: colors.white };

  slide51.addText("필수 역량 ③: 검증과 판단", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide51.addText("AI 결과물의 품질을 관리하는 기술", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  // Warning
  slide51.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.45, w: 9, h: 0.85,
    fill: { type: "solid", color: colors.red100 }
  });

  slide51.addText("⚠️ AI는 자신감 있게 틀릴 수 있다 (Hallucination)", {
    x: 0.7, y: 1.55, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide51.addText("존재하지 않는 함수를 만들어내거나, 틀린 정보를 사실처럼 말하거나, 논리적 오류가 있는 코드를 생성할 수 있음", {
    x: 0.7, y: 1.95, w: 8.6, h: 0.3,
    fontSize: 11, color: colors.slate600
  });

  // Verification methods
  const verifyMethods = [
    { method: "사실 확인", desc: "외부 소스로 정보 검증\n공식 문서 대조", icon: "🔍", color: colors.primary },
    { method: "로직 검토", desc: "코드/논리의 흐름 확인\n엣지 케이스 테스트", icon: "🧪", color: colors.green500 },
    { method: "결과 테스트", desc: "실제 실행해서 확인\n예상 결과와 비교", icon: "✅", color: colors.purple500 },
    { method: "동료 검토", desc: "다른 AI에게 검증 요청\n또는 동료에게 리뷰", icon: "👥", color: colors.amber500 }
  ];

  verifyMethods.forEach((method, idx) => {
    const xPos = 0.4 + idx * 2.4;

    slide51.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 2.5, w: 2.25, h: 1.7,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide51.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 2.5, w: 2.25, h: 0.06,
      fill: { type: "solid", color: method.color }
    });

    slide51.addText(method.icon, {
      x: xPos, y: 2.6, w: 2.25, h: 0.4,
      align: "center", fontSize: 20
    });

    slide51.addText(method.method, {
      x: xPos, y: 3.0, w: 2.25, h: 0.35,
      align: "center", fontSize: 12, color: colors.slate900, bold: true
    });

    slide51.addText(method.desc, {
      x: xPos + 0.1, y: 3.4, w: 2.05, h: 0.7,
      align: "center", fontSize: 9, color: colors.slate600
    });
  });

  // Key message
  slide51.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.4, w: 9, h: 0.7,
    fill: { type: "solid", color: colors.navy }
  });

  slide51.addText("🎯 최종 품질의 책임은 AI가 아닌 '나'에게 있다", {
    x: 0.7, y: 4.5, w: 8.6, h: 0.25,
    align: "center", fontSize: 13, color: colors.white, bold: true
  });

  slide51.addText("AI는 초안을 만들어주는 것이고, 최종 결정과 책임은 항상 사람의 몫", {
    x: 0.7, y: 4.8, w: 8.6, h: 0.25,
    align: "center", fontSize: 10, color: colors.slate400
  });

  slide51.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 52: 대상별 실천 - 대학생 ===========
  let slide52 = pptx.addSlide();
  slide52.background = { color: colors.white };

  slide52.addText("대학생을 위한 AI 활용 가이드", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide52.addText("취업, 프로젝트, 학습에 AI를 활용하는 방법", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const studentGuide = [
    {
      area: "🎓 학습",
      items: ["AI 튜터로 개념 이해", "코딩 과제 디버깅 도움", "논문/자료 요약", "외국어 학습 파트너"],
      color: colors.primary
    },
    {
      area: "💼 취업 준비",
      items: ["이력서 첨삭 및 최적화", "자기소개서 피드백", "면접 예상 질문 연습", "포트폴리오 프로젝트"],
      color: colors.green500
    },
    {
      area: "🚀 프로젝트",
      items: ["아이디어 브레인스토밍", "MVP 빠르게 제작", "기술 스택 선택 조언", "버그 해결 및 최적화"],
      color: colors.purple500
    }
  ];

  studentGuide.forEach((guide, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide52.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 2.5,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide52.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 0.06,
      fill: { type: "solid", color: guide.color }
    });

    slide52.addText(guide.area, {
      x: xPos + 0.15, y: 1.5, w: 2.7, h: 0.45,
      fontSize: 14, color: colors.slate900, bold: true
    });

    guide.items.forEach((item, iIdx) => {
      slide52.addText("• " + item, {
        x: xPos + 0.15, y: 2.0 + iIdx * 0.45, w: 2.7, h: 0.4,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  // Action
  slide52.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.1, w: 9, h: 1.0,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide52.addText("💡 오늘부터 시작하기", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide52.addText("1. 관심 분야의 사이드 프로젝트 하나 시작하기  2. AI와 함께 문제 해결하는 습관 들이기  3. 결과물을 GitHub/포트폴리오에 정리하기", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.45,
    fontSize: 11, color: colors.slate600
  });

  slide52.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 53: 대상별 실천 - 교수/연구자 ===========
  let slide53 = pptx.addSlide();
  slide53.background = { color: colors.white };

  slide53.addText("교수/연구자를 위한 AI 활용 가이드", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide53.addText("연구, 논문, 강의에 AI를 활용하는 방법", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const professorGuide = [
    {
      area: "📚 연구",
      items: ["문헌 리뷰 및 요약", "연구 가설 정제", "데이터 분석 코드 생성", "실험 설계 검토"],
      color: colors.primary
    },
    {
      area: "📝 논문 작성",
      items: ["초안 구조화 지원", "문장 다듬기/영문 교정", "참고문헌 정리", "리뷰어 코멘트 대응"],
      color: colors.green500
    },
    {
      area: "🎓 강의",
      items: ["강의 자료 제작", "퀴즈/과제 생성", "학생 질문 대응", "새로운 평가 방식 설계"],
      color: colors.purple500
    }
  ];

  professorGuide.forEach((guide, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide53.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 2.5,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide53.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 0.06,
      fill: { type: "solid", color: guide.color }
    });

    slide53.addText(guide.area, {
      x: xPos + 0.15, y: 1.5, w: 2.7, h: 0.45,
      fontSize: 14, color: colors.slate900, bold: true
    });

    guide.items.forEach((item, iIdx) => {
      slide53.addText("• " + item, {
        x: xPos + 0.15, y: 2.0 + iIdx * 0.45, w: 2.7, h: 0.4,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  // Consideration
  slide53.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.1, w: 9, h: 1.0,
    fill: { type: "solid", color: colors.red100 }
  });

  slide53.addText("⚠️ 주의사항", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  slide53.addText("AI 생성 콘텐츠의 표절/윤리 문제 인식 | AI 활용 범위의 학술적 기준 확인 | 학생들의 AI 활용 가이드라인 수립 필요", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.45,
    fontSize: 11, color: colors.slate600
  });

  slide53.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 54: 대상별 실천 - 교직원/공공기관 ===========
  let slide54 = pptx.addSlide();
  slide54.background = { color: colors.white };

  slide54.addText("교직원/공공기관을 위한 AI 활용 가이드", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide54.addText("업무 자동화와 의사결정 지원에 AI 활용하기", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const staffGuide = [
    {
      area: "📋 문서 작업",
      items: ["보고서 초안 작성", "회의록 요약/정리", "공문서 검토/교정", "데이터 정리/분석"],
      color: colors.primary
    },
    {
      area: "🤝 민원/소통",
      items: ["FAQ 자동 응답 구축", "민원 분류/우선순위", "다국어 번역 지원", "맞춤형 안내문 생성"],
      color: colors.green500
    },
    {
      area: "📊 의사결정",
      items: ["정책 영향 분석", "예산 시뮬레이션", "리스크 평가", "벤치마킹 자료 조사"],
      color: colors.purple500
    }
  ];

  staffGuide.forEach((guide, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide54.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 2.5,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide54.addShape(pptx.shapes.RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 0.06,
      fill: { type: "solid", color: guide.color }
    });

    slide54.addText(guide.area, {
      x: xPos + 0.15, y: 1.5, w: 2.7, h: 0.45,
      fontSize: 14, color: colors.slate900, bold: true
    });

    guide.items.forEach((item, iIdx) => {
      slide54.addText("• " + item, {
        x: xPos + 0.15, y: 2.0 + iIdx * 0.45, w: 2.7, h: 0.4,
        fontSize: 11, color: colors.slate600
      });
    });
  });

  // Security note
  slide54.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.1, w: 9, h: 1.0,
    fill: { type: "solid", color: colors.amber100 }
  });

  slide54.addText("🔒 보안 및 규정 준수", {
    x: 0.7, y: 4.2, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.amber500, bold: true
  });

  slide54.addText("개인정보/민감정보 입력 금지 | 기관 승인된 AI 도구만 사용 | 결과물의 정확성 반드시 검증 | 내부 AI 활용 가이드라인 숙지", {
    x: 0.7, y: 4.6, w: 8.6, h: 0.45,
    fontSize: 11, color: colors.slate600
  });

  slide54.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 55: 섹션 5 정리 ===========
  let slide55 = pptx.addSlide();
  slide55.background = { color: colors.navy };

  slide55.addText("Section 4 핵심 정리", {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 14, color: colors.accent
  });

  slide55.addText("AI 팀장이 되어라", {
    x: 0.5, y: 1.2, w: 9, h: 0.8,
    align: "center", fontSize: 40, color: colors.white, bold: true
  });

  slide55.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 2.1, w: 3, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  const section5Summary = [
    { icon: "🔄", text: "역할 전환: 소비자 → 생산자, 사용자 → 제작자" },
    { icon: "🎬", text: "개발자 = 아키텍트 + 감독관 (직접 코딩 < 설계와 검증)" },
    { icon: "⚡", text: "10x 생산성: 명확한 목표 × AI 가속화 × 빠른 반복" },
    { icon: "🛠️", text: "필수 역량: 프롬프트 엔지니어링, 컨텍스트 관리, 검증" },
    { icon: "🎯", text: "핵심: 도메인 지식 + AI 활용 능력 = 경쟁력" }
  ];

  section5Summary.forEach((point, idx) => {
    slide55.addText(point.icon + "  " + point.text, {
      x: 0.7, y: 2.4 + idx * 0.5, w: 8.6, h: 0.45,
      fontSize: 14, color: colors.white
    });
  });

  slide55.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.5, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =====================================================
  // SECTION 6: Closing & Q&A (10분) - Slides 56-59
  // =====================================================

  // =========== SLIDE 56: 핵심 정리 ===========
  let slide56 = pptx.addSlide();
  slide56.background = { color: colors.slate900 };

  slide56.addText("오늘 배운 5가지 핵심 메시지", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 32, color: colors.white, bold: true
  });

  const keyMessages = [
    { num: "1", msg: "클라우드가 모든 혁신의 기반이다", sub: "인프라 걱정 없이 아이디어에 집중" },
    { num: "2", msg: "AI는 도구가 아니라 동료다", sub: "협업하고, 감독하고, 관리하는 대상" },
    { num: "3", msg: "도메인 지식이 AI 활용의 핵심이다", sub: "뭘 만들지 모르면 AI도 소용없다" },
    { num: "4", msg: "지금이 가장 빠른 시작점이다", sub: "기회의 창이 열려있는 최적의 시점" },
    { num: "5", msg: "AI 팀장이 되어라", sub: "이기는 게 아니라 이끄는 사람" }
  ];

  keyMessages.forEach((msg, idx) => {
    const yPos = 1.1 + idx * 0.8;

    slide56.addShape(pptx.shapes.OVAL, {
      x: 0.5, y: yPos, w: 0.5, h: 0.5,
      fill: { type: "solid", color: colors.accent }
    });
    slide56.addText(msg.num, {
      x: 0.5, y: yPos, w: 0.5, h: 0.5,
      align: "center", valign: "middle",
      fontSize: 16, color: colors.navy, bold: true
    });

    slide56.addText(msg.msg, {
      x: 1.2, y: yPos, w: 8, h: 0.35,
      fontSize: 16, color: colors.white, bold: true
    });

    slide56.addText(msg.sub, {
      x: 1.2, y: yPos + 0.35, w: 8, h: 0.3,
      fontSize: 11, color: colors.slate400
    });
  });

  slide56.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate500
  });

  // =========== SLIDE 57: 내일부터 시작하기 ===========
  let slide57 = pptx.addSlide();
  slide57.background = { color: colors.white };

  slide57.addText("내일부터 시작할 3가지", {
    x: 0.5, y: 0.4, w: 9, h: 0.6,
    fontSize: 36, color: colors.slate900, bold: true
  });
  slide57.addText("오늘 배운 것을 실천으로 옮기기", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 16, color: colors.slate500
  });

  const actionItems = [
    {
      num: "1",
      title: "AI 도구 하나 제대로 써보기",
      desc: "ChatGPT, Claude, Gemini 중 하나를 선택해서\n실제 업무/학습에 매일 활용해보기",
      icon: "🤖",
      color: colors.primary
    },
    {
      num: "2",
      title: "작은 프로젝트 하나 시작하기",
      desc: "관심 분야에서 AI와 함께 만들 수 있는\n간단한 프로젝트 시작 (웹페이지, 분석, 콘텐츠 등)",
      icon: "🚀",
      color: colors.green500
    },
    {
      num: "3",
      title: "결과물 공유하고 피드백 받기",
      desc: "GitHub, 블로그, SNS에 과정 기록하고\n피드백 받으며 개선해나가기",
      icon: "📢",
      color: colors.purple500
    }
  ];

  actionItems.forEach((item, idx) => {
    const xPos = 0.4 + idx * 3.15;

    slide57.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: xPos, y: 1.4, w: 3.0, h: 2.8,
      fill: { type: "solid", color: colors.slate100 }
    });

    slide57.addShape(pptx.shapes.OVAL, {
      x: xPos + 1.15, y: 1.55, w: 0.7, h: 0.7,
      fill: { type: "solid", color: item.color }
    });
    slide57.addText(item.icon, {
      x: xPos + 1.15, y: 1.55, w: 0.7, h: 0.7,
      align: "center", valign: "middle", fontSize: 24
    });

    slide57.addText(item.title, {
      x: xPos + 0.15, y: 2.4, w: 2.7, h: 0.5,
      align: "center", fontSize: 14, color: colors.slate900, bold: true
    });

    slide57.addText(item.desc, {
      x: xPos + 0.15, y: 2.95, w: 2.7, h: 1.1,
      align: "center", fontSize: 11, color: colors.slate600
    });
  });

  // Motivation
  slide57.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.4, w: 9, h: 0.7,
    fill: { type: "solid", color: colors.navy }
  });

  slide57.addText("\"1년 후의 나는 오늘 시작한 나에게 감사할 것이다\"", {
    x: 0.7, y: 4.5, w: 8.6, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 16, color: colors.white, bold: true
  });

  slide57.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: colors.slate400
  });

  // =========== SLIDE 58: Q&A ===========
  let slide58 = pptx.addSlide();
  slide58.background = { color: colors.primary };

  slide58.addText("Q&A", {
    x: 0.5, y: 1.8, w: 9, h: 1.0,
    align: "center", fontSize: 72, color: colors.white, bold: true
  });

  slide58.addText("궁금한 점을 자유롭게 질문해주세요", {
    x: 0.5, y: 2.9, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: "bfdbfe"
  });

  slide58.addShape(pptx.shapes.RECTANGLE, {
    x: 4, y: 3.6, w: 2, h: 0.04,
    fill: { type: "solid", color: colors.white }
  });

  slide58.addText("💬 AI, 클라우드, 커리어, 학습 방법 등\n무엇이든 질문해주세요", {
    x: 0.5, y: 3.9, w: 9, h: 0.8,
    align: "center", fontSize: 14, color: "93c5fd"
  });

  slide58.addText("Modern IT Trend 2026", {
    x: 7.5, y: 5.2, w: 2.3, h: 0.3,
    align: "right", fontSize: 10, color: "93c5fd"
  });

  // =========== SLIDE 59: 감사 & 마무리 ===========
  let slide59 = pptx.addSlide();
  slide59.background = { color: colors.navy };

  slide59.addText("감사합니다", {
    x: 0.5, y: 1.5, w: 9, h: 1.0,
    align: "center", fontSize: 56, color: colors.white, bold: true
  });

  slide59.addText("오늘이 여러분의 AI 여정의 시작입니다", {
    x: 0.5, y: 2.6, w: 9, h: 0.5,
    align: "center", fontSize: 20, color: colors.accent
  });

  slide59.addShape(pptx.shapes.RECTANGLE, {
    x: 3.5, y: 3.2, w: 3, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  // Contact info
  slide59.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.5, w: 5, h: 1.3,
    fill: { type: "solid", color: "1e3a5f" }
  });

  slide59.addText("📧 강의 자료 및 후속 과정 문의", {
    x: 2.7, y: 3.6, w: 4.6, h: 0.35,
    align: "center", fontSize: 12, color: colors.white
  });

  slide59.addText("NxtCloud 테크니컬 트레이닝팀", {
    x: 2.7, y: 4.0, w: 4.6, h: 0.35,
    align: "center", fontSize: 14, color: colors.accent, bold: true
  });

  slide59.addText("glen.lee@nxtcloud.kr", {
    x: 2.7, y: 4.4, w: 4.6, h: 0.3,
    align: "center", fontSize: 11, color: colors.slate400
  });

  slide59.addText("Modern IT Trend 2026 | NxtCloud", {
    x: 0.5, y: 5.2, w: 9, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate500
  });

  // Save
  await pptx.writeFile({ fileName: "Modern-IT-Trend-2026-v2.pptx" });
  console.log("Presentation created successfully! (59 slides: Complete)");
}

createPresentation().catch(console.error);
