const pptxgen = require("pptxgenjs");

async function createPresentation() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "NXT Cloud";
  pptx.title = "AWS IAM 정책 관리 방법";
  pptx.subject = "IAM Policy Management";

  // Colors (PPT-Design-Guide.md 기반)
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
    green500: "22c55e",
    green100: "d1fae5",
    purple500: "8b5cf6",
    purple100: "ede9fe",
    red500: "ef4444",
    red100: "fee2e2"
  };

  // Helper: 워터마크 추가
  function addWatermark(slide) {
    slide.addText("AWS IAM Policy Management", {
      x: 7.2, y: 5.2, w: 2.6, h: 0.3,
      align: "right", fontSize: 9, color: colors.slate400
    });
  }

  // Helper: 콘텐츠 슬라이드 제목
  function addContentTitle(slide, title, subtitle = null) {
    slide.addText(title, {
      x: 0.5, y: 0.35, w: 9, h: 0.55,
      fontSize: 32, color: colors.slate900, bold: true
    });
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.5, y: 0.88, w: 9, h: 0.32,
        fontSize: 14, color: colors.slate500
      });
    }
  }

  // Helper: 섹션 슬라이드
  function addSectionSlide(num, title, subtitle, bgColor, subtitleColor) {
    let slide = pptx.addSlide();
    slide.background = { color: bgColor };
    slide.addText(num, {
      x: 0.5, y: 1.8, w: 9, h: 1.0,
      align: "center", fontSize: 72, color: colors.white, bold: true
    });
    slide.addText(title, {
      x: 0.5, y: 2.8, w: 9, h: 0.7,
      align: "center", fontSize: 40, color: colors.white, bold: true
    });
    slide.addText(subtitle, {
      x: 0.5, y: 3.5, w: 9, h: 0.4,
      align: "center", fontSize: 18, color: subtitleColor
    });
    return slide;
  }

  // =========== SLIDE 1: Title ===========
  let slide1 = pptx.addSlide();
  slide1.background = { color: colors.navy };

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.08,
    fill: { type: "solid", color: colors.primary }
  });

  slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: 1.6, w: 2.6, h: 0.5,
    fill: { type: "solid", color: colors.navy },
    line: { color: colors.accent, width: 1 }
  });
  slide1.addText("IAM DEEP DIVE", {
    x: 3.7, y: 1.6, w: 2.6, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 12, color: colors.accent, bold: true
  });

  slide1.addText("AWS IAM 정책 관리 방법", {
    x: 0.5, y: 2.3, w: 9, h: 0.9,
    align: "center", valign: "middle",
    fontSize: 48, color: colors.white, bold: true
  });

  slide1.addText("교육/해커톤/MSP 환경을 위한 IAM 커스텀 정책 가이드", {
    x: 1, y: 3.2, w: 8, h: 0.5,
    align: "center", valign: "middle",
    fontSize: 18, color: colors.slate400
  });

  slide1.addShape(pptx.shapes.RECTANGLE, {
    x: 4.2, y: 3.9, w: 1.6, h: 0.04,
    fill: { type: "solid", color: colors.accent }
  });

  slide1.addText("NXT Cloud", {
    x: 0.5, y: 4.2, w: 9, h: 0.35,
    align: "center", fontSize: 16, color: colors.white
  });
  slide1.addText("Technical Training Team", {
    x: 0.5, y: 4.5, w: 9, h: 0.3,
    align: "center", fontSize: 14, color: colors.slate500
  });

  slide1.addNotes(`안녕하세요, NXT Cloud Technical Training Team입니다.

오늘은 AWS IAM 정책 관리 방법에 대해 깊이 있게 알아보겠습니다.

이 세션은 교육, 해커톤, MSP 환경에서 고객들에게 제한된 권한을 안전하게 부여하기 위한 IAM 커스텀 정책 작성 방법을 다룹니다.

IAM은 AWS 보안의 핵심입니다. 잘못된 정책 하나가 전체 인프라를 위험에 빠뜨릴 수 있습니다.

오늘 배울 내용을 통해 안전하고 효율적인 권한 관리가 가능해질 것입니다.`);

  // =========== SLIDE 2: Section - IAM 기본 개념 ===========
  let slide2 = addSectionSlide("01", "IAM 기본 개념", "User, Group, Role, Policy의 역할", colors.primary, colors.blue100);
  slide2.addNotes(`첫 번째 섹션에서는 IAM의 기본 개념을 살펴보겠습니다.

IAM은 Identity and Access Management의 약자로, AWS 리소스에 대한 접근을 안전하게 제어하는 서비스입니다.

User, Group, Role, Policy - 이 네 가지 핵심 구성 요소를 이해하는 것이 IAM 마스터의 첫걸음입니다.`);

  // =========== SLIDE 3: IAM 핵심 구성 요소 ===========
  let slide3 = pptx.addSlide();
  slide3.background = { color: colors.white };
  addContentTitle(slide3, "IAM 핵심 구성 요소", "Identity and Access Management: AWS 리소스 접근을 안전하게 제어");

  const components = [
    { icon: "👤", title: "User", desc: "AWS에 접근하는\n개별 사용자", color: colors.blue100, textColor: colors.primary },
    { icon: "👥", title: "Group", desc: "동일한 권한을 가진\nUser들의 집합", color: colors.green100, textColor: colors.green500 },
    { icon: "🎭", title: "Role", desc: "서비스/외부 사용자가\n임시로 사용하는 권한", color: colors.purple100, textColor: colors.purple500 },
    { icon: "📋", title: "Policy", desc: "권한을 정의하는\nJSON 문서", color: colors.amber100, textColor: colors.amber500 }
  ];

  components.forEach((comp, idx) => {
    const x = 0.4 + idx * 2.4;
    slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.4, w: 2.2, h: 2.3,
      fill: { type: "solid", color: comp.color }
    });
    slide3.addText(comp.icon, {
      x: x, y: 1.55, w: 2.2, h: 0.5,
      align: "center", fontSize: 28
    });
    slide3.addText(comp.title, {
      x: x, y: 2.05, w: 2.2, h: 0.4,
      align: "center", fontSize: 18, color: comp.textColor, bold: true
    });
    slide3.addText(comp.desc, {
      x: x + 0.1, y: 2.5, w: 2.0, h: 1.0,
      align: "center", fontSize: 11, color: colors.slate700
    });
  });

  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 3.9, w: 9.2, h: 0.9,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide3.addText("💡 핵심 질문: \"누가(Who)\", \"무엇을(What)\", \"어떤 조건에서(Conditions)\" 할 수 있는가?", {
    x: 0.6, y: 4.05, w: 8.8, h: 0.6,
    fontSize: 15, color: colors.slate900, bold: true
  });

  addWatermark(slide3);

  slide3.addNotes(`IAM의 네 가지 핵심 구성 요소를 살펴보겠습니다.

첫째, User는 AWS에 접근하는 개별 사용자입니다. 콘솔 로그인이나 CLI 접근에 사용됩니다.

둘째, Group은 동일한 권한을 가진 User들의 집합입니다. 권한 관리를 효율적으로 할 수 있죠.

셋째, Role은 서비스나 외부 사용자가 임시로 사용하는 권한입니다. 이 부분이 오늘 가장 중요한 내용입니다.

넷째, Policy는 권한을 정의하는 JSON 문서입니다.

IAM의 핵심 질문은 항상 이것입니다: "누가, 무엇을, 어떤 조건에서 할 수 있는가?"`);

  // =========== SLIDE 4: User vs Service ===========
  let slide4 = pptx.addSlide();
  slide4.background = { color: colors.white };
  addContentTitle(slide4, "권한의 주체: User vs Service");

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 2.4,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide4.addText("👤 User (사용자)", {
    x: 0.7, y: 1.5, w: 3.9, h: 0.45,
    fontSize: 18, color: colors.primary, bold: true
  });
  slide4.addText("• Policy 직접 연결\n• Role Assume 가능\n• AWS 콘솔/CLI 접근", {
    x: 0.7, y: 2.0, w: 3.9, h: 1.5,
    fontSize: 14, color: colors.slate700
  });

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 2.4,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide4.addText("🔧 Service (AWS 서비스)", {
    x: 5.4, y: 1.5, w: 3.9, h: 0.45,
    fontSize: 18, color: "92400e", bold: true
  });
  slide4.addText("• Lambda, EC2, ECS 등\n• 자체 권한 없음\n• Role Assume으로만 접근", {
    x: 5.4, y: 2.0, w: 3.9, h: 1.5,
    fontSize: 14, color: colors.slate700
  });

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.0, w: 9, h: 0.85,
    fill: { type: "solid", color: colors.navy }
  });
  slide4.addText("⚠️ 서비스는 자체 권한이 없으므로 Role을 통해 권한을 위임받아야 함", {
    x: 0.7, y: 4.15, w: 8.6, h: 0.55,
    fontSize: 14, color: colors.white, bold: true
  });

  addWatermark(slide4);

  slide4.addNotes(`권한이 필요한 주체는 크게 두 가지로 나뉩니다.

왼쪽의 User, 즉 사람은 Policy를 직접 연결받거나 Role을 Assume해서 권한을 얻습니다.

오른쪽의 Service, 즉 Lambda나 EC2 같은 AWS 서비스는 자체적으로 아무 권한이 없습니다.
서비스가 다른 AWS 리소스에 접근하려면 반드시 Role을 통해 권한을 위임받아야 합니다.

이 차이를 이해하는 것이 매우 중요합니다. User의 권한만 제어하고 Role을 방치하면 보안 구멍이 생깁니다.`);

  // =========== SLIDE 5: 왜 서비스에 Role이 필요한가 ===========
  let slide5 = pptx.addSlide();
  slide5.background = { color: colors.white };
  addContentTitle(slide5, "왜 서비스에 Role이 필요한가?", "Lambda 함수가 S3 버킷에서 파일을 읽어야 한다면?");

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: 1.6, w: 2.2, h: 1.2,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide5.addText("🔧 Lambda\nFunction", {
    x: 0.8, y: 1.75, w: 2.2, h: 1.0,
    align: "center", fontSize: 14, color: "92400e", bold: true
  });

  slide5.addText("→", {
    x: 3.0, y: 1.9, w: 0.6, h: 0.6,
    align: "center", fontSize: 24, color: colors.slate400
  });
  slide5.addText("연결", {
    x: 2.95, y: 2.45, w: 0.7, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate500
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 3.7, y: 1.6, w: 2.6, h: 1.2,
    fill: { type: "solid", color: colors.purple100 },
    line: { color: colors.purple500, width: 1, dashType: "dash" }
  });
  slide5.addText("🎭 Lambda\nExecutionRole", {
    x: 3.7, y: 1.75, w: 2.6, h: 1.0,
    align: "center", fontSize: 14, color: colors.purple500, bold: true
  });

  slide5.addText("→", {
    x: 6.35, y: 1.9, w: 0.6, h: 0.6,
    align: "center", fontSize: 24, color: colors.slate400
  });
  slide5.addText("포함", {
    x: 6.3, y: 2.45, w: 0.7, h: 0.3,
    align: "center", fontSize: 10, color: colors.slate500
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 7.0, y: 1.6, w: 2.2, h: 1.2,
    fill: { type: "solid", color: colors.purple100 },
    line: { color: colors.purple500, width: 1, dashType: "dash" }
  });
  slide5.addText("📋 S3Read\nOnlyAccess", {
    x: 7.0, y: 1.75, w: 2.2, h: 1.0,
    align: "center", fontSize: 14, color: colors.purple500, bold: true
  });

  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.1, w: 9, h: 1.7,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide5.addText("🖥️ EC2의 특이점: Instance Profile", {
    x: 0.7, y: 3.25, w: 8.6, h: 0.4,
    fontSize: 15, color: colors.slate900, bold: true
  });
  slide5.addText("• EC2는 Role을 직접 연결할 수 없음 (레거시 설계)\n• Instance Profile이라는 래퍼(wrapper)를 통해 Role 연결\n• Lambda, ECS 등 최신 서비스는 Role 직접 연결 가능", {
    x: 0.7, y: 3.7, w: 8.6, h: 1.0,
    fontSize: 13, color: colors.slate700
  });

  addWatermark(slide5);

  slide5.addNotes(`구체적인 예시를 보겠습니다.

Lambda 함수가 S3 버킷에서 파일을 읽어야 한다고 가정해봅시다.
Lambda 자체는 아무 권한이 없습니다.

이때 Lambda에 Execution Role을 연결하고, 그 Role에 S3ReadOnlyAccess 정책을 포함시킵니다.
이렇게 하면 Lambda가 해당 Role의 권한으로 S3에 접근할 수 있게 됩니다.

EC2는 조금 특이합니다. 레거시 설계 때문에 Role을 직접 연결할 수 없고,
Instance Profile이라는 래퍼를 통해서만 Role을 연결할 수 있습니다.

Lambda, ECS 같은 최신 서비스들은 Role을 직접 연결할 수 있습니다.`);

  // =========== SLIDE 6: 권한 상승 공격 ===========
  let slide6 = pptx.addSlide();
  slide6.background = { color: colors.white };
  addContentTitle(slide6, "권한 상승 (Privilege Escalation) 위험", "User의 권한만 제한하고 Role을 제어하지 않으면?");

  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 3.4,
    fill: { type: "solid", color: colors.red100 }
  });
  slide6.addText("⚠️ 공격 시나리오", {
    x: 0.7, y: 1.5, w: 8.6, h: 0.4,
    fontSize: 16, color: colors.red500, bold: true
  });

  const steps = [
    { num: "1", text: "공격자(User)가 ec2:RunInstances + iam:PassRole(*) 권한 보유" },
    { num: "2", text: "AdministratorAccess Role이 연결된 EC2 인스턴스 생성" },
    { num: "3", text: "EC2에 SSH 접속 후 AWS CLI 사용 (EC2의 Role 권한으로 실행)" },
    { num: "4", text: "S3, RDS, IAM 등 모든 리소스 접근 가능 - User 권한 우회!" }
  ];

  steps.forEach((step, idx) => {
    slide6.addShape(pptx.shapes.OVAL, {
      x: 0.8, y: 2.0 + idx * 0.6, w: 0.35, h: 0.35,
      fill: { type: "solid", color: colors.red500 }
    });
    slide6.addText(step.num, {
      x: 0.8, y: 2.0 + idx * 0.6, w: 0.35, h: 0.35,
      align: "center", valign: "middle", fontSize: 11, color: colors.white, bold: true
    });
    slide6.addText(step.text, {
      x: 1.3, y: 2.0 + idx * 0.6, w: 8.0, h: 0.35,
      fontSize: 13, color: colors.slate900
    });
  });

  addWatermark(slide6);

  slide6.addNotes(`이제 가장 중요한 내용입니다. 권한 상승, 영어로 Privilege Escalation 공격입니다.

User의 권한만 제한하고 Role을 제어하지 않으면 어떤 일이 벌어질까요?

시나리오를 보겠습니다.
1단계: 공격자가 ec2:RunInstances와 iam:PassRole(*) 권한을 가지고 있습니다.
직접 권한은 제한적이지만, PassRole에 와일드카드가 있습니다.

2단계: 공격자가 AdministratorAccess Role이 연결된 EC2 인스턴스를 생성합니다.

3단계: 그 EC2에 SSH로 접속해서 AWS CLI를 사용합니다.
이때 CLI 명령은 EC2에 연결된 Role의 권한으로 실행됩니다.

4단계: 결과적으로 S3, RDS, IAM 등 모든 리소스에 접근 가능해집니다.
User 본인의 권한은 제한적이었지만, Role을 통해 우회한 것입니다.

이것이 바로 Role 제어가 필수인 이유입니다.`);

  // =========== SLIDE 7: 방어 전략 ===========
  let slide7 = pptx.addSlide();
  slide7.background = { color: colors.white };
  addContentTitle(slide7, "방어 전략", "User의 직접 권한과 사용 가능한 Role 모두 제어");

  const defenses = [
    { title: "IAM Write 제한", desc: "iam:Create*, iam:Delete* 차단(Deny)", icon: "🚫" },
    { title: "Role 사전 생성", desc: "SafeRole-{username} 형태로 미리 생성", icon: "🔐" },
    { title: "PassRole 제한", desc: "특정 Role만 전달 가능하도록 제한", icon: "🎯" },
    { title: "Instance Profile 제한", desc: "ec2:NewInstanceProfile 조건 활용", icon: "🖥️" }
  ];

  defenses.forEach((def, idx) => {
    const y = 1.35 + idx * 0.95;
    slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.85,
      fill: { type: "solid", color: colors.green100 }
    });
    slide7.addText(def.icon + " " + def.title, {
      x: 0.7, y: y + 0.1, w: 3.5, h: 0.35,
      fontSize: 15, color: colors.green500, bold: true
    });
    slide7.addText(def.desc, {
      x: 0.7, y: y + 0.45, w: 8.6, h: 0.35,
      fontSize: 13, color: colors.slate700
    });
  });

  addWatermark(slide7);

  slide7.addNotes(`그렇다면 어떻게 방어해야 할까요? 네 가지 핵심 전략이 있습니다.

첫째, IAM Write 권한을 제한합니다. iam:Create*, iam:Delete* 같은 작업을 Deny로 차단합니다.
사용자가 임의로 Role을 만들지 못하게 하는 것이죠.

둘째, Role을 사전에 생성해둡니다. SafeRole-{username} 형태로 각 사용자별로 안전한 Role을 미리 만들어둡니다.

셋째, PassRole을 제한합니다. 특정 Role만 전달 가능하도록 조건을 겁니다.
이것이 앞서 본 공격을 막는 핵심입니다.

넷째, Instance Profile도 제한합니다. ec2:NewInstanceProfile 조건을 활용합니다.

User의 직접 권한과 사용 가능한 Role, 두 가지를 모두 제어해야 합니다.`);

  // =========== SLIDE 8: Section - PassRole ===========
  let slide8 = addSectionSlide("02", "iam:PassRole 심층 이해", "서비스에 Role을 전달하는 핵심 권한", colors.purple500, colors.purple100);
  slide8.addNotes(`두 번째 섹션에서는 iam:PassRole에 대해 깊이 있게 알아보겠습니다.

PassRole은 서비스에 Role을 전달하는 권한입니다.
이 권한을 제대로 이해하고 제어하지 않으면 앞서 본 권한 상승 공격에 노출됩니다.

iam:AttachPolicy 같은 권한과 혼동하기 쉬우니 주의해서 들어주세요.`);

  // =========== SLIDE 9: PassRole 설명 ===========
  let slide9 = pptx.addSlide();
  slide9.background = { color: colors.white };
  addContentTitle(slide9, "iam:PassRole이란?", "IAM Role을 AWS 서비스에 전달하는 권한");

  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 1.1,
    fill: { type: "solid", color: colors.navy }
  });
  slide9.addText("💡 핵심: User가 직접 Role을 '사용'하는 것이 아님!\n    User가 서비스에게 Role을 '전달'하여 서비스가 그 Role로 동작하게 함", {
    x: 0.7, y: 1.5, w: 8.6, h: 0.85,
    fontSize: 14, color: colors.white
  });

  slide9.addText("PassRole이 필요한 상황", {
    x: 0.5, y: 2.65, w: 9, h: 0.4,
    fontSize: 16, color: colors.slate900, bold: true
  });

  const passRoleCases = [
    { service: "EC2", action: "aws ec2 run-instances --iam-instance-profile" },
    { service: "Lambda", action: "aws lambda create-function --role" },
    { service: "ECS", action: "Task Role, Execution Role 지정" },
    { service: "Step Functions", action: "State Machine에 실행 Role 지정" }
  ];

  passRoleCases.forEach((item, idx) => {
    const y = 3.1 + idx * 0.5;
    slide9.addText("•", {
      x: 0.5, y: y, w: 0.3, h: 0.4, fontSize: 13, color: colors.slate700
    });
    slide9.addText(item.service, {
      x: 0.8, y: y, w: 1.5, h: 0.4, fontSize: 13, color: colors.primary, bold: true
    });
    slide9.addText(item.action, {
      x: 2.3, y: y, w: 7.2, h: 0.4, fontSize: 12, color: colors.slate700
    });
  });

  addWatermark(slide9);

  slide9.addNotes(`iam:PassRole의 핵심 개념을 설명드리겠습니다.

가장 중요한 점: User가 직접 Role을 '사용'하는 것이 아닙니다.
User가 서비스에게 Role을 '전달'하는 것입니다.
그러면 서비스가 그 Role의 권한으로 동작하게 됩니다.

어떤 상황에서 PassRole이 필요할까요?

EC2 인스턴스를 생성할 때 IAM Instance Profile을 지정하면 PassRole이 필요합니다.
Lambda 함수를 생성할 때 실행 Role을 지정하면 PassRole이 필요합니다.
ECS Task Definition에서 Task Role이나 Execution Role을 지정할 때도 필요합니다.
Step Functions에서 State Machine에 실행 Role을 지정할 때도 필요합니다.

즉, AWS 서비스에 권한을 주고 싶을 때는 항상 PassRole이 필요합니다.`);

  // =========== SLIDE 10: PassRole vs AssumeRole ===========
  let slide10 = pptx.addSlide();
  slide10.background = { color: colors.white };
  addContentTitle(slide10, "PassRole vs AssumeRole");

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.4, w: 4.3, h: 0.5,
    fill: { type: "solid", color: colors.primary }
  });
  slide10.addText("iam:PassRole", {
    x: 0.5, y: 1.4, w: 4.3, h: 0.5,
    align: "center", valign: "middle", fontSize: 16, color: colors.white, bold: true
  });

  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: 5.2, y: 1.4, w: 4.3, h: 0.5,
    fill: { type: "solid", color: colors.purple500 }
  });
  slide10.addText("sts:AssumeRole", {
    x: 5.2, y: 1.4, w: 4.3, h: 0.5,
    align: "center", valign: "middle", fontSize: 16, color: colors.white, bold: true
  });

  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.95, w: 4.3, h: 2.7,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide10.addText("주체\nUser가 서비스에 Role 전달\n\n결과\n서비스가 Role 권한 획득\n\n예시\nLambda 생성 시 실행 Role 지정", {
    x: 0.7, y: 2.1, w: 3.9, h: 2.4,
    fontSize: 13, color: colors.slate700
  });

  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.95, w: 4.3, h: 2.7,
    fill: { type: "solid", color: colors.purple100 }
  });
  slide10.addText("주체\nUser/서비스가 직접 Role로 전환\n\n결과\n요청자가 임시 자격증명 획득\n\n예시\nCross-account 접근, Role switching", {
    x: 5.4, y: 2.1, w: 3.9, h: 2.4,
    fontSize: 13, color: colors.slate700
  });

  addWatermark(slide10);

  slide10.addNotes(`PassRole과 AssumeRole은 자주 혼동되는 개념입니다. 비교해보겠습니다.

PassRole은 User가 서비스에 Role을 전달하는 것입니다.
결과적으로 서비스가 Role 권한을 획득합니다.
예를 들어 Lambda 함수를 생성할 때 실행 Role을 지정하는 것이 PassRole입니다.

반면 AssumeRole은 User나 서비스가 직접 Role로 전환하는 것입니다.
결과적으로 요청자 본인이 임시 자격증명을 획득합니다.
Cross-account 접근이나 Role switching이 대표적인 예시입니다.

요약하면:
- PassRole: "이 Role을 저 서비스에 줘"
- AssumeRole: "내가 직접 저 Role이 될래"`);

  // =========== SLIDE 11: Section - 정책 구조 ===========
  let slide11 = addSectionSlide("03", "IAM 정책의 구조", "Principal, Action, Resource, Effect, Condition", colors.green500, colors.green100);
  slide11.addNotes(`세 번째 섹션에서는 IAM 정책의 구조를 살펴보겠습니다.

정책은 JSON 형식으로 작성되며, Principal, Action, Resource, Effect, Condition이라는 다섯 가지 핵심 요소로 구성됩니다.

각 요소의 역할과 작성법을 자세히 알아보겠습니다.`);

  // =========== SLIDE 12: Identity-based vs Resource-based ===========
  let slide12 = pptx.addSlide();
  slide12.background = { color: colors.white };
  addContentTitle(slide12, "Identity-based vs Resource-based Policy");

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 0.5,
    fill: { type: "solid", color: colors.primary }
  });
  slide12.addText("Identity-based Policy", {
    x: 0.5, y: 1.35, w: 4.3, h: 0.5,
    align: "center", valign: "middle", fontSize: 14, color: colors.white, bold: true
  });

  slide12.addShape(pptx.shapes.RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 0.5,
    fill: { type: "solid", color: colors.amber500 }
  });
  slide12.addText("Resource-based Policy", {
    x: 5.2, y: 1.35, w: 4.3, h: 0.5,
    align: "center", valign: "middle", fontSize: 14, color: colors.white, bold: true
  });

  slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.9, w: 4.3, h: 2.2,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide12.addText("연결 대상\nUser, Group, Role\n\nPrincipal\n생략 (연결된 대상이 주체)\n\n예시\n이 문서의 대부분 정책", {
    x: 0.7, y: 2.0, w: 3.9, h: 2.0,
    fontSize: 12, color: colors.slate700
  });

  slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.9, w: 4.3, h: 2.2,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide12.addText("연결 대상\nS3, SQS, Lambda 등 리소스\n\nPrincipal\n명시 필수\n\n예시\nS3 버킷 정책, SQS 정책", {
    x: 5.4, y: 2.0, w: 3.9, h: 2.0,
    fontSize: 12, color: colors.slate700
  });

  slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.25, w: 9, h: 0.65,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide12.addText("💡 우리가 주로 다루는 정책: Identity-based Policy (User/Group에 연결하는 정책)", {
    x: 0.7, y: 4.35, w: 8.6, h: 0.45,
    fontSize: 13, color: colors.slate900, bold: true
  });

  addWatermark(slide12);

  slide12.addNotes(`정책에는 두 가지 종류가 있습니다.

Identity-based Policy는 User, Group, Role에 연결하는 정책입니다.
이 정책에서는 Principal을 생략합니다. 연결된 대상이 곧 주체이기 때문입니다.
오늘 다루는 대부분의 정책이 이 유형입니다.

Resource-based Policy는 S3, SQS, Lambda 같은 리소스에 직접 연결하는 정책입니다.
이 정책에서는 Principal을 반드시 명시해야 합니다.
S3 버킷 정책, SQS 정책 등이 대표적인 예시입니다.

우리가 주로 다루는 것은 Identity-based Policy입니다.
User나 Group에 연결해서 권한을 제어하는 정책이죠.`);

  // =========== SLIDE 13: 정책 기본 구조 ===========
  let slide13 = pptx.addSlide();
  slide13.background = { color: colors.white };
  addContentTitle(slide13, "정책 기본 구조", "Principal이 Resource에 Action을 Effect(Allow/Deny)하는 Condition");

  slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 5.5, h: 3.7,
    fill: { type: "solid", color: colors.slate100 }
  });

  const jsonCode = `{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "식별자",
    "Principal": "주체 (누가)",
    "Action": "작업 (무엇을)",
    "Resource": "대상 (어디에)",
    "Effect": "Allow | Deny",
    "Condition": {
      "조건연산자": {
        "조건키": "값"
      }
    }
  }]
}`;

  slide13.addText(jsonCode, {
    x: 0.7, y: 1.5, w: 5.1, h: 3.4,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  const policyParts = [
    { name: "Principal", desc: "User, Role, Service", color: colors.blue100, textColor: colors.primary },
    { name: "Action", desc: "s3:GetObject, ec2:*", color: colors.green100, textColor: colors.green500 },
    { name: "Resource", desc: "ARN 또는 *", color: colors.purple100, textColor: colors.purple500 },
    { name: "Effect", desc: "Allow / Deny", color: colors.amber100, textColor: colors.amber500 },
    { name: "Condition", desc: "추가 조건", color: colors.red100, textColor: colors.red500 }
  ];

  policyParts.forEach((part, idx) => {
    const y = 1.35 + idx * 0.72;
    slide13.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 6.2, y: y, w: 3.3, h: 0.65,
      fill: { type: "solid", color: part.color }
    });
    slide13.addText(part.name, {
      x: 6.35, y: y + 0.08, w: 3.0, h: 0.3,
      fontSize: 13, color: part.textColor, bold: true
    });
    slide13.addText(part.desc, {
      x: 6.35, y: y + 0.35, w: 3.0, h: 0.25,
      fontSize: 11, color: colors.slate500
    });
  });

  addWatermark(slide13);

  slide13.addNotes(`정책의 기본 JSON 구조를 보겠습니다.

Version은 항상 "2012-10-17"입니다. 이것이 최신 버전이고, 다른 값은 쓰지 않습니다.

Statement는 권한 규칙의 배열입니다. 하나의 정책에 여러 Statement를 넣을 수 있습니다.

각 Statement에는:
- Sid: 식별자입니다. 필수는 아니지만 가독성을 위해 권장합니다.
- Principal: 주체입니다. Identity-based Policy에서는 생략합니다.
- Action: 허용하거나 거부할 AWS 작업입니다.
- Resource: 대상 리소스입니다. ARN이나 와일드카드를 씁니다.
- Effect: Allow 또는 Deny입니다.
- Condition: 추가 조건입니다. 이 부분이 오늘의 핵심입니다.

오른쪽에 각 요소를 색상별로 정리했습니다.`);

  // =========== SLIDE 14: Action 작성법 ===========
  let slide14 = pptx.addSlide();
  slide14.background = { color: colors.white };
  addContentTitle(slide14, "Action 작성법");

  slide14.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 3.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  const actionCode = `// 단일 Action
"Action": "s3:GetObject"

// 복수 Action (배열)
"Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject"]

// 와일드카드 사용
"Action": "s3:*"           // S3의 모든 작업
"Action": "ec2:Describe*"  // Describe로 시작하는 모든 작업
"Action": "*"              // 모든 AWS 작업

// NotAction (지정한 Action 제외한 나머지)
"NotAction": "iam:*"       // IAM을 제외한 모든 작업`;

  slide14.addText(actionCode, {
    x: 0.7, y: 1.45, w: 8.6, h: 3.3,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  addWatermark(slide14);

  slide14.addNotes(`Action 작성법을 보겠습니다.

단일 Action은 문자열로 지정합니다. 예: "s3:GetObject"

여러 Action은 배열로 지정합니다. 대괄호 안에 쉼표로 구분해서 나열합니다.

와일드카드를 사용할 수 있습니다.
- s3:* 는 S3의 모든 작업을 의미합니다.
- ec2:Describe* 는 Describe로 시작하는 모든 EC2 작업을 의미합니다.
- * 는 모든 AWS 작업을 의미합니다.

Read 작업에는 와일드카드 사용을 권장합니다. Get*, List* 같이요.

NotAction은 지정한 Action을 제외한 나머지를 의미합니다.
"NotAction": "iam:*"은 IAM을 제외한 모든 작업입니다.
단, NotAction을 Allow와 함께 쓸 때는 주의가 필요합니다. 나중에 자세히 설명드리겠습니다.`);

  // =========== SLIDE 15: Resource 작성법 ===========
  let slide15 = pptx.addSlide();
  slide15.background = { color: colors.white };
  addContentTitle(slide15, "Resource 작성법");

  slide15.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 3.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  const resourceCode = `// 모든 리소스
"Resource": "*"

// 특정 S3 버킷과 객체
"Resource": ["arn:aws:s3:::my-bucket", "arn:aws:s3:::my-bucket/*"]

// 정책 변수 사용 (사용자별 리소스)
"Resource": "arn:aws:s3:::\${aws:username}*"

// NotResource (지정한 Resource 제외한 나머지)
"NotResource": "arn:aws:s3:::admin-bucket/*"`;

  slide15.addText(resourceCode, {
    x: 0.7, y: 1.45, w: 8.6, h: 3.3,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  addWatermark(slide15);

  slide15.addNotes(`Resource 작성법을 보겠습니다.

가장 간단한 형태는 별표 와일드카드입니다. 모든 리소스를 의미합니다.

S3 버킷을 지정할 때는 버킷 자체와 버킷 내 객체를 모두 지정해야 하는 경우가 많습니다.
- arn:aws:s3:::my-bucket 은 버킷 자체
- arn:aws:s3:::my-bucket/* 는 버킷 내 모든 객체

정책 변수를 사용하면 사용자별로 다른 리소스를 지정할 수 있습니다.
\${aws:username}은 실행 시점의 사용자 이름으로 치환됩니다.

NotResource는 지정한 Resource를 제외한 나머지를 의미합니다.
관리자 버킷을 제외하고 나머지 버킷에 대한 접근을 허용할 때 유용합니다.`);

  // =========== SLIDE 16: ARN 형식 ===========
  let slide16 = pptx.addSlide();
  slide16.background = { color: colors.white };
  addContentTitle(slide16, "ARN (Amazon Resource Name) 형식");

  slide16.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.3, w: 9, h: 1.0,
    fill: { type: "solid", color: colors.navy }
  });
  slide16.addText("arn:aws:서비스:리전:계정ID:리소스타입/리소스이름", {
    x: 0.7, y: 1.45, w: 8.6, h: 0.7,
    fontFace: "Courier New", fontSize: 14, color: colors.accent
  });

  slide16.addText("예시", {
    x: 0.5, y: 2.5, w: 9, h: 0.35,
    fontSize: 14, color: colors.slate900, bold: true
  });

  const arnExamples = [
    { arn: "arn:aws:s3:::my-bucket", desc: "S3 버킷 (리전 없음)" },
    { arn: "arn:aws:ec2:ap-northeast-2:123456789012:instance/i-1234", desc: "EC2 인스턴스" },
    { arn: "arn:aws:iam::123456789012:user/student01", desc: "IAM User (리전 없음)" },
    { arn: "arn:aws:lambda:ap-northeast-2:123456789012:function:my-func", desc: "Lambda 함수" }
  ];

  arnExamples.forEach((item, idx) => {
    const y = 2.95 + idx * 0.55;
    slide16.addText(item.arn, {
      x: 0.5, y: y, w: 6.5, h: 0.45,
      fontFace: "Courier New", fontSize: 10, color: colors.primary
    });
    slide16.addText(item.desc, {
      x: 7.0, y: y, w: 2.5, h: 0.45,
      fontSize: 11, color: colors.slate500
    });
  });

  addWatermark(slide16);

  slide16.addNotes(`ARN, Amazon Resource Name의 형식을 알아두면 좋습니다.

기본 형식은: arn:aws:서비스:리전:계정ID:리소스타입/리소스이름

예시를 보시면:
- S3 버킷은 리전이 없습니다. 글로벌 서비스이기 때문입니다.
- EC2 인스턴스는 리전과 계정ID가 모두 들어갑니다.
- IAM도 리전이 없습니다. 역시 글로벌 서비스입니다.
- Lambda 함수는 리전과 계정ID가 모두 들어갑니다.

리전이 없는 글로벌 서비스들을 기억해두세요. IAM, S3, CloudFront, Route53 등이 있습니다.`);

  // =========== SLIDE 17: Section - Condition ===========
  let slide17 = addSectionSlide("04", "Condition 작성법", "정책의 핵심 - 조건 연산자와 조건키", colors.amber500, colors.amber100);
  slide17.addNotes(`네 번째 섹션, Condition 작성법입니다.

Condition은 IAM 정책의 핵심입니다.
단순히 Allow/Deny만 하는 것이 아니라, 언제, 어떤 조건에서 허용할지를 세밀하게 제어할 수 있습니다.

조건 연산자와 조건키를 조합해서 다양한 시나리오에 대응할 수 있습니다.

이 섹션이 오늘 발표에서 가장 실무적으로 중요한 부분입니다.`);

  // =========== SLIDE 18: 주요 조건 연산자 ===========
  let slide18 = pptx.addSlide();
  slide18.background = { color: colors.white };
  addContentTitle(slide18, "주요 조건 연산자");

  const operators = [
    { op: "StringEquals", desc: "문자열 정확히 일치", ex: "리전, 태그값" },
    { op: "StringLike", desc: "와일드카드(*,?) 패턴", ex: "인스턴스 타입" },
    { op: "StringNotEquals", desc: "문자열 불일치", ex: "특정 값 제외" },
    { op: "Bool", desc: "Boolean 값 비교", ex: "MFA 사용 여부" },
    { op: "Null", desc: "키 존재 여부", ex: "태그 존재 확인" },
    { op: "ForAnyValue", desc: "배열 중 하나 일치", ex: "여러 태그 키" },
    { op: "ForAllValues", desc: "배열 모두 일치", ex: "모든 조건 만족" }
  ];

  slide18.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.3, w: 3.0, h: 0.4, fill: { type: "solid", color: colors.primary } });
  slide18.addText("연산자", { x: 0.5, y: 1.3, w: 3.0, h: 0.4, align: "center", valign: "middle", fontSize: 12, color: colors.white, bold: true });
  slide18.addShape(pptx.shapes.RECTANGLE, { x: 3.5, y: 1.3, w: 3.5, h: 0.4, fill: { type: "solid", color: colors.primary } });
  slide18.addText("설명", { x: 3.5, y: 1.3, w: 3.5, h: 0.4, align: "center", valign: "middle", fontSize: 12, color: colors.white, bold: true });
  slide18.addShape(pptx.shapes.RECTANGLE, { x: 7.0, y: 1.3, w: 2.5, h: 0.4, fill: { type: "solid", color: colors.primary } });
  slide18.addText("사용 예", { x: 7.0, y: 1.3, w: 2.5, h: 0.4, align: "center", valign: "middle", fontSize: 12, color: colors.white, bold: true });

  operators.forEach((item, idx) => {
    const y = 1.75 + idx * 0.5;
    const bgColor = idx % 2 === 0 ? colors.slate100 : colors.white;
    slide18.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: y, w: 3.0, h: 0.5, fill: { type: "solid", color: bgColor } });
    slide18.addShape(pptx.shapes.RECTANGLE, { x: 3.5, y: y, w: 3.5, h: 0.5, fill: { type: "solid", color: bgColor } });
    slide18.addShape(pptx.shapes.RECTANGLE, { x: 7.0, y: y, w: 2.5, h: 0.5, fill: { type: "solid", color: bgColor } });
    slide18.addText(item.op, { x: 0.6, y: y, w: 2.8, h: 0.5, valign: "middle", fontSize: 11, color: colors.primary, bold: true, fontFace: "Courier New" });
    slide18.addText(item.desc, { x: 3.6, y: y, w: 3.3, h: 0.5, valign: "middle", fontSize: 11, color: colors.slate700 });
    slide18.addText(item.ex, { x: 7.1, y: y, w: 2.3, h: 0.5, valign: "middle", fontSize: 11, color: colors.slate500 });
  });

  addWatermark(slide18);

  slide18.addNotes(`주요 조건 연산자를 표로 정리했습니다.

StringEquals는 문자열이 정확히 일치해야 합니다. 리전이나 태그값을 비교할 때 씁니다.

StringLike는 와일드카드 패턴을 지원합니다. 별표는 0개 이상, 물음표는 1개 문자를 매칭합니다.

StringNotEquals는 불일치를 검사합니다. 특정 값을 제외할 때 씁니다.

Bool은 true/false 값을 비교합니다. MFA 사용 여부 확인에 많이 씁니다.

Null은 키의 존재 여부를 확인합니다. 태그가 있는지 없는지 확인할 때 중요합니다.

ForAnyValue는 배열 중 하나라도 일치하면 true입니다.
ForAllValues는 배열 모두 일치해야 true입니다.

이 연산자들을 조합해서 다양한 조건을 만들 수 있습니다.`);

  // =========== SLIDE 19: StringEquals vs StringLike ===========
  let slide19 = pptx.addSlide();
  slide19.background = { color: colors.white };
  addContentTitle(slide19, "StringEquals vs StringLike");

  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 1.8,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide19.addText("StringEquals", {
    x: 0.7, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 16, color: colors.primary, bold: true
  });
  slide19.addText("정확히 일치해야 함\n와일드카드 미지원\n\n\"t3.micro\" → t3.micro만 매칭", {
    x: 0.7, y: 1.95, w: 3.9, h: 1.1,
    fontSize: 12, color: colors.slate700
  });

  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 1.8,
    fill: { type: "solid", color: colors.green100 }
  });
  slide19.addText("StringLike", {
    x: 5.4, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 16, color: colors.green500, bold: true
  });
  slide19.addText("패턴 매칭 지원\n* (0개 이상), ? (1개)\n\n\"t3.*\" → t3.micro, t3.small 등", {
    x: 5.4, y: 1.95, w: 3.9, h: 1.1,
    fontSize: 12, color: colors.slate700
  });

  slide19.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.3, w: 9, h: 1.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  const eqLikeCode = `// StringEquals - 정확히 "t3.micro"만 매칭
"StringEquals": { "ec2:InstanceType": "t3.micro" }

// StringLike - t3로 시작하는 모든 타입 매칭
"StringLike": { "ec2:InstanceType": "t3.*" }`;

  slide19.addText(eqLikeCode, {
    x: 0.7, y: 3.45, w: 8.6, h: 1.3,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  addWatermark(slide19);

  slide19.addNotes(`StringEquals와 StringLike의 차이를 명확히 해두겠습니다.

StringEquals는 정확히 일치해야 합니다.
"t3.micro"라고 쓰면 딱 t3.micro만 매칭됩니다.
와일드카드를 쓸 수 없습니다.

StringLike는 패턴 매칭을 지원합니다.
별표는 0개 이상의 문자를 의미합니다.
물음표는 정확히 1개 문자를 의미합니다.

"t3.*"이라고 쓰면 t3.micro, t3.small, t3.medium 등 t3로 시작하는 모든 타입이 매칭됩니다.

실무에서 인스턴스 타입을 제한할 때 StringLike를 많이 씁니다.
패밀리 전체를 허용하거나 제한할 때 편리하기 때문입니다.`);

  // =========== SLIDE 20: 조건키 종류 ===========
  let slide20 = pptx.addSlide();
  slide20.background = { color: colors.white };
  addContentTitle(slide20, "조건키의 종류", "Global vs Service-specific Condition Keys");

  slide20.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 3.3,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide20.addText("🌐 Global Condition Keys", {
    x: 0.7, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 14, color: colors.primary, bold: true
  });
  slide20.addText("모든 AWS 서비스에서 사용 가능\naws: 접두사", {
    x: 0.7, y: 1.9, w: 3.9, h: 0.5,
    fontSize: 11, color: colors.slate500
  });
  slide20.addText("• aws:username\n• aws:RequestedRegion\n• aws:MultiFactorAuthPresent\n• aws:ResourceTag/태그키\n• aws:RequestTag/태그키\n• aws:SourceIp", {
    x: 0.7, y: 2.5, w: 3.9, h: 2.0,
    fontSize: 12, color: colors.slate700
  });

  slide20.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 3.3,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide20.addText("⚙️ Service-specific Keys", {
    x: 5.4, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 14, color: "92400e", bold: true
  });
  slide20.addText("특정 서비스에서만 사용 가능\nAction마다 지원 여부 다름!", {
    x: 5.4, y: 1.9, w: 3.9, h: 0.5,
    fontSize: 11, color: colors.slate500
  });
  slide20.addText("• ec2:InstanceType\n• rds:DatabaseEngine\n• rds:DatabaseClass\n• iam:PassedToService\n• s3:prefix\n• lambda:FunctionArn", {
    x: 5.4, y: 2.5, w: 3.9, h: 2.0,
    fontSize: 12, color: colors.slate700
  });

  slide20.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.75, w: 9, h: 0.55,
    fill: { type: "solid", color: colors.red100 }
  });
  slide20.addText("⚠️ 서비스별 조건키는 AWS 공식 문서에서 Action별 지원 여부 반드시 확인!", {
    x: 0.7, y: 4.85, w: 8.6, h: 0.35,
    fontSize: 12, color: colors.red500, bold: true
  });

  addWatermark(slide20);

  slide20.addNotes(`조건키는 크게 두 종류로 나뉩니다.

Global Condition Keys는 aws: 접두사로 시작하며, 모든 AWS 서비스에서 사용할 수 있습니다.
aws:username은 현재 사용자 이름입니다.
aws:RequestedRegion은 요청한 리전입니다.
aws:MultiFactorAuthPresent는 MFA 인증 여부입니다.
aws:ResourceTag와 aws:RequestTag는 태그 관련 조건키입니다.

Service-specific Keys는 서비스 접두사로 시작하며, 특정 서비스에서만 사용할 수 있습니다.
ec2:InstanceType, rds:DatabaseEngine 같은 것들입니다.

여기서 매우 중요한 점이 있습니다.
서비스별 조건키는 Action마다 지원 여부가 다릅니다!
예를 들어 ec2:InstanceType은 RunInstances에서는 지원되지만, DescribeInstances에서는 지원되지 않습니다.

반드시 AWS 공식 문서에서 확인해야 합니다.`);

  // =========== SLIDE 21: 리소스 속성 vs 요청 속성 조건키 (중요!) ===========
  let slide21 = pptx.addSlide();
  slide21.background = { color: colors.white };
  addContentTitle(slide21, "리소스 속성 vs 요청 속성 조건키", "\"현재 상태\"를 제어할지, \"변경하려는 값\"을 제어할지 구분 필수!");

  slide21.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 1.5,
    fill: { type: "solid", color: colors.blue100 }
  });
  slide21.addText("📊 리소스 속성 조건키", {
    x: 0.7, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 14, color: colors.primary, bold: true
  });
  slide21.addText("ec2:InstanceType\n\n인스턴스의 현재 타입 평가\nRunInstances, StartInstances 등", {
    x: 0.7, y: 1.9, w: 3.9, h: 0.9,
    fontSize: 11, color: colors.slate700
  });

  slide21.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 1.5,
    fill: { type: "solid", color: colors.amber100 }
  });
  slide21.addText("📝 요청 속성 조건키", {
    x: 5.4, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 14, color: "92400e", bold: true
  });
  slide21.addText("ec2:Attribute/InstanceType\n\n변경하려는 타입 값 평가\nModifyInstanceAttribute", {
    x: 5.4, y: 1.9, w: 3.9, h: 0.9,
    fontSize: 11, color: colors.slate700
  });

  // 잘못된 예시
  slide21.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.0, w: 9, h: 2.0,
    fill: { type: "solid", color: colors.red100 }
  });
  slide21.addText("❌ 잘못된 정책 예시", {
    x: 0.7, y: 3.1, w: 8.6, h: 0.35,
    fontSize: 13, color: colors.red500, bold: true
  });

  const wrongCode = `// ModifyInstanceAttribute에서 ec2:InstanceType 사용
// → 현재 타입만 체크, 변경하려는 타입은 체크 안 함!
"Condition": { "StringEquals": { "ec2:InstanceType": ["t3.micro"] } }

// 올바른 방법: ec2:Attribute/InstanceType 사용
"Condition": { "StringNotEquals": { "ec2:Attribute/InstanceType": [...] } }`;

  slide21.addText(wrongCode, {
    x: 0.7, y: 3.5, w: 8.6, h: 1.4,
    fontFace: "Courier New", fontSize: 10, color: colors.slate700
  });

  addWatermark(slide21);

  slide21.addNotes(`이 슬라이드는 매우 중요합니다. 실무에서 가장 많이 실수하는 부분입니다.

조건키에는 두 가지 유형이 있습니다:
- 리소스 속성 조건키: 현재 리소스의 상태를 평가
- 요청 속성 조건키: 변경하려는 값을 평가

예를 들어 ec2:InstanceType은 인스턴스의 현재 타입을 평가합니다.
ec2:Attribute/InstanceType은 변경하려는 타입 값을 평가합니다.

잘못된 예시를 보겠습니다.
ModifyInstanceAttribute에서 ec2:InstanceType을 조건으로 썼습니다.
이 정책은 "현재 t3.micro인 인스턴스"의 속성 변경만 허용합니다.
하지만 어떤 타입으로 변경하려는지는 체크하지 않습니다!

올바르게 하려면 ec2:Attribute/InstanceType을 사용해야 합니다.
이렇게 해야 변경하려는 타입을 제한할 수 있습니다.

핵심: "현재 상태"를 제어할지, "변경하려는 값"을 제어할지 명확히 구분하세요.`);

  // =========== SLIDE 22: 실전 패턴 - 리전 제한 ===========
  let slide22 = pptx.addSlide();
  slide22.background = { color: colors.white };
  addContentTitle(slide22, "실전 패턴 1: 리전 제한", "서울 리전에서만 작업 허용 (글로벌 서비스 제외)");

  slide22.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.8,
    fill: { type: "solid", color: colors.slate100 }
  });

  const regionCode = `{
  "Sid": "DenyAlmostOutsideSeoul",
  "Effect": "Deny",
  "NotAction": [
    "iam:*", "cloudfront:*", "route53:*", "s3:ListAllMyBuckets"
  ],
  "Resource": "*",
  "Condition": {
    "StringNotEquals": {
      "aws:RequestedRegion": "ap-northeast-2"
    }
  }
}`;

  slide22.addText(regionCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 2.5,
    fontFace: "Courier New", fontSize: 12, color: colors.slate700
  });

  slide22.addText("💡 해설: NotAction으로 글로벌 서비스 예외, StringNotEquals로 서울 외 Deny", {
    x: 0.5, y: 4.3, w: 9, h: 0.5,
    fontSize: 12, color: colors.slate700
  });

  addWatermark(slide22);

  slide22.addNotes(`첫 번째 실전 패턴, 리전 제한입니다.

서울 리전에서만 작업을 허용하고 싶습니다.
단, IAM, CloudFront, Route53 같은 글로벌 서비스는 예외로 해야 합니다.

이 정책의 구조를 보겠습니다.
Effect는 Deny입니다. 조건에 맞으면 거부합니다.
NotAction으로 글로벌 서비스들을 예외 처리했습니다. IAM, CloudFront, Route53, S3 버킷 목록 조회 등.
Condition에서 StringNotEquals를 씁니다.
aws:RequestedRegion이 ap-northeast-2(서울)가 아니면 Deny합니다.

결과적으로:
- 서울 리전 작업 → 허용 (다른 Allow 정책 필요)
- 다른 리전 작업 → Deny
- 글로벌 서비스 → NotAction이므로 이 정책 적용 안 됨`);

  // =========== SLIDE 23: 실전 패턴 - 인스턴스 타입 ===========
  let slide23 = pptx.addSlide();
  slide23.background = { color: colors.white };
  addContentTitle(slide23, "실전 패턴 2: 인스턴스 타입 제한", "비싼 EC2 인스턴스 생성 차단");

  slide23.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  const instanceCode = `{
  "Sid": "DenyEc2Expensive",
  "Effect": "Deny",
  "Action": "ec2:RunInstances",
  "Resource": "arn:aws:ec2:*:*:instance/*",
  "Condition": {
    "StringNotLike": {
      "ec2:InstanceType": ["t3.nano", "t3.micro", "t3.small", "t3.medium"]
    }
  }
}`;

  slide23.addText(instanceCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 2.3,
    fontFace: "Courier New", fontSize: 12, color: colors.slate700
  });

  slide23.addText("💡 해설: t3.nano ~ t3.medium만 허용, StringNotLike + Deny로 화이트리스트 구현", {
    x: 0.5, y: 4.1, w: 9, h: 0.5,
    fontSize: 12, color: colors.slate700
  });

  addWatermark(slide23);

  slide23.addNotes(`두 번째 패턴, 비싼 EC2 인스턴스 생성을 차단합니다.

교육이나 해커톤 환경에서 비용 폭탄을 막으려면 필수적인 정책입니다.

Action은 ec2:RunInstances입니다. 인스턴스 생성 작업이죠.
Resource는 instance/* 입니다. 인스턴스 리소스에 대해서만 적용합니다.

Condition을 보시면 StringNotLike를 썼습니다.
ec2:InstanceType이 리스트에 없으면 Deny합니다.
t3.nano, t3.micro, t3.small, t3.medium만 허용됩니다.

이 방식은 화이트리스트 방식입니다.
명시적으로 허용한 타입만 쓸 수 있고, 나머지는 전부 차단됩니다.
p4d.24xlarge 같은 GPU 인스턴스를 실수로 띄우는 걸 막을 수 있습니다.`);

  // =========== SLIDE 24: 실전 패턴 - MFA 필수 ===========
  let slide24 = pptx.addSlide();
  slide24.background = { color: colors.white };
  addContentTitle(slide24, "실전 패턴 3: MFA 필수", "MFA 없이 로그인하면 대부분의 작업 차단");

  slide24.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.8,
    fill: { type: "solid", color: colors.slate100 }
  });

  const mfaCode = `{
  "Sid": "BlockMostAccessUnlessSignedInWithMFA",
  "Effect": "Deny",
  "NotAction": [
    "iam:CreateVirtualMFADevice",
    "iam:EnableMFADevice",
    "iam:ChangePassword"
  ],
  "Resource": "*",
  "Condition": {
    "Bool": {
      "aws:MultiFactorAuthPresent": "false",
      "aws:ViaAWSService": "false"
    }
  }
}`;

  slide24.addText(mfaCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 2.5,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  slide24.addText("💡 해설: ViaAWSService:false → 사용자 직접 요청만 차단, MFA 등록 Action은 예외", {
    x: 0.5, y: 4.3, w: 9, h: 0.5,
    fontSize: 12, color: colors.slate700
  });

  addWatermark(slide24);

  slide24.addNotes(`세 번째 패턴, MFA 필수입니다.

MFA 없이 로그인한 사용자는 대부분의 작업을 할 수 없게 만듭니다.

NotAction으로 MFA 등록에 필요한 작업들은 예외 처리했습니다.
CreateVirtualMFADevice, EnableMFADevice, ChangePassword는 MFA 없이도 할 수 있어야 합니다.
그래야 MFA를 등록할 수 있으니까요.

Condition을 보시면 두 가지 조건이 있습니다.
aws:MultiFactorAuthPresent가 false이면, 즉 MFA 인증을 안 했으면 Deny합니다.

그리고 aws:ViaAWSService도 false여야 합니다.
이 조건이 왜 필요할까요?
어떤 AWS 서비스가 다른 서비스를 호출할 때는 MFA 정보가 없습니다.
이런 서비스 간 호출까지 차단하면 정상적인 동작이 안 될 수 있습니다.
그래서 사용자의 직접 요청만 차단하도록 한 것입니다.`);

  // =========== SLIDE 25: 실전 패턴 - 자기 리소스만 ===========
  let slide25 = pptx.addSlide();
  slide25.background = { color: colors.white };
  addContentTitle(slide25, "실전 패턴 4: 자기 리소스만 제어", "태그 기반 접근 제어 (ABAC)");

  slide25.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.1,
    fill: { type: "solid", color: colors.slate100 }
  });

  const tagCode = `{
  "Sid": "ControlOnlyMine",
  "Effect": "Allow",
  "Action": ["ec2:TerminateInstances", "ec2:StopInstances"],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "aws:ResourceTag/username": "\${aws:username}"
    }
  }
}`;

  slide25.addText(tagCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 1.8,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  slide25.addText("💡 해설", {
    x: 0.5, y: 3.6, w: 9, h: 0.35,
    fontSize: 13, color: colors.slate900, bold: true
  });
  slide25.addText("• ${aws:username}: 정책 변수, 실행 시점 사용자 이름으로 치환\n• aws:ResourceTag/username: 리소스의 태그 값 확인\n• 주의: 태그 없는 리소스는 별도 정책 필요 (Null 조건 활용)", {
    x: 0.5, y: 3.95, w: 9, h: 1.0,
    fontSize: 11, color: colors.slate700
  });

  addWatermark(slide25);

  slide25.addNotes(`네 번째 패턴, 자기 리소스만 제어하기입니다. ABAC라고도 불립니다.

해커톤 환경에서 다른 참가자의 리소스를 건드리지 못하게 할 때 유용합니다.

정책을 보시면 ec2:TerminateInstances와 StopInstances를 Allow합니다.
단, 조건이 있습니다.
aws:ResourceTag/username이 \${aws:username}과 같아야 합니다.

\${aws:username}은 정책 변수입니다.
정책이 평가될 때 실제 사용자 이름으로 치환됩니다.
student01 사용자가 요청하면 student01로 바뀌는 것이죠.

aws:ResourceTag/username은 리소스에 붙은 username 태그의 값입니다.

결과적으로 자기 이름이 태그된 리소스만 종료하거나 중지할 수 있습니다.

주의할 점: 태그가 없는 리소스는 이 정책의 적용을 받지 않습니다.
별도로 Null 조건을 사용한 정책이 필요합니다.`);

  // =========== SLIDE 26: 실전 패턴 - 태그 변조 방지 ===========
  let slide26 = pptx.addSlide();
  slide26.background = { color: colors.white };
  addContentTitle(slide26, "실전 패턴 5: 태그 변조 방지", "비용 추적용 태그 수정 차단");

  slide26.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.6,
    fill: { type: "solid", color: colors.slate100 }
  });

  const tagProtectCode = `{
  "Sid": "DenyCostAllocationTagManagement",
  "Effect": "Deny",
  "Action": [
    "ec2:CreateTags", "ec2:DeleteTags",
    "lambda:TagResource", "lambda:UntagResource"
  ],
  "Resource": "*",
  "Condition": {
    "ForAnyValue:StringEquals": {
      "aws:TagKeys": ["username", "group"]
    }
  }
}`;

  slide26.addText(tagProtectCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 2.3,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  slide26.addText("💡 해설: username, group 태그는 관리자만 수정 가능. ForAnyValue로 태그 키 배열 검사", {
    x: 0.5, y: 4.1, w: 9, h: 0.5,
    fontSize: 12, color: colors.slate700
  });

  addWatermark(slide26);

  slide26.addNotes(`다섯 번째 패턴, 태그 변조 방지입니다.

앞서 본 ABAC 패턴이 동작하려면 태그가 변조되지 않아야 합니다.
사용자가 자기 리소스의 username 태그를 다른 사람 이름으로 바꾸면 안 되겠죠.

이 정책은 특정 태그의 수정을 차단합니다.
ec2:CreateTags, ec2:DeleteTags 같은 태그 관련 작업을 Deny합니다.

Condition을 보시면 ForAnyValue:StringEquals를 썼습니다.
aws:TagKeys에 username이나 group이 포함되어 있으면 Deny합니다.

ForAnyValue는 배열 중 하나라도 일치하면 true입니다.
태그 생성/삭제 요청에 여러 태그 키가 포함될 수 있는데,
그 중 하나라도 username이나 group이면 차단합니다.

결과적으로 username, group 태그는 관리자만 수정할 수 있습니다.`);

  // =========== SLIDE 27: Null 조건 사용법 ===========
  let slide27 = pptx.addSlide();
  slide27.background = { color: colors.white };
  addContentTitle(slide27, "Null 조건 사용법", "태그나 속성의 존재 여부 확인");

  slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 4.3, h: 2.0,
    fill: { type: "solid", color: colors.green100 }
  });
  slide27.addText("태그가 있는 리소스에만 적용", {
    x: 0.7, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 13, color: colors.green500, bold: true
  });
  slide27.addText(`"Condition": {
  "Null": {
    "aws:ResourceTag/username": "false"
  }
}`, {
    x: 0.7, y: 1.95, w: 3.9, h: 1.3,
    fontFace: "Courier New", fontSize: 10, color: colors.slate700
  });

  slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.35, w: 4.3, h: 2.0,
    fill: { type: "solid", color: colors.red100 }
  });
  slide27.addText("태그가 없는 리소스에만 적용", {
    x: 5.4, y: 1.5, w: 3.9, h: 0.4,
    fontSize: 13, color: colors.red500, bold: true
  });
  slide27.addText(`"Condition": {
  "Null": {
    "aws:ResourceTag/username": "true"
  }
}`, {
    x: 5.4, y: 1.95, w: 3.9, h: 1.3,
    fontFace: "Courier New", fontSize: 10, color: colors.slate700
  });

  slide27.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.5, w: 9, h: 1.4,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide27.addText("💡 실무 팁: 태그 기반 Deny 정책에서 태그 없는 리소스도 차단하려면", {
    x: 0.7, y: 3.6, w: 8.6, h: 0.35,
    fontSize: 12, color: colors.slate900, bold: true
  });
  slide27.addText(`// 태그 없는 리소스 별도 차단
{ "Sid": "DenyUntagged", "Effect": "Deny", ...,
  "Condition": { "Null": { "aws:ResourceTag/username": "true" } } }`, {
    x: 0.7, y: 4.0, w: 8.6, h: 0.8,
    fontFace: "Courier New", fontSize: 10, color: colors.slate700
  });

  addWatermark(slide27);

  slide27.addNotes(`Null 조건 사용법입니다. 태그나 속성의 존재 여부를 확인할 때 씁니다.

왼쪽을 보시면 "태그가 있는 리소스에만 적용"하는 조건입니다.
aws:ResourceTag/username이 null이 false다, 즉 null이 아니다, 즉 존재한다는 의미입니다.

오른쪽은 "태그가 없는 리소스에만 적용"하는 조건입니다.
aws:ResourceTag/username이 null이 true다, 즉 존재하지 않는다는 의미입니다.

이게 왜 중요할까요?

앞서 본 ABAC 패턴에서 태그 없는 리소스는 조건 평가가 안 됩니다.
조건을 평가할 수 없으면 그 Statement는 무시됩니다.
즉, 태그 없는 리소스는 제어가 안 됩니다.

그래서 별도의 Statement로 태그 없는 리소스도 차단해야 합니다.
Null 조건으로 태그가 없는 리소스를 찾아서 Deny하는 것이죠.`);

  // =========== SLIDE 28: 여러 Condition의 AND/OR ===========
  let slide28 = pptx.addSlide();
  slide28.background = { color: colors.white };
  addContentTitle(slide28, "여러 Condition의 AND/OR 평가");

  const conditionRules = [
    { rule: "같은 블록 내 다른 조건키", eval: "AND" },
    { rule: "같은 조건키 내 여러 값", eval: "OR (배열)" },
    { rule: "ForAnyValue", eval: "배열 중 하나라도 일치 (OR)" },
    { rule: "ForAllValues", eval: "배열 모두 일치 (AND)" },
    { rule: "다른 조건 연산자 블록 간", eval: "AND" }
  ];

  conditionRules.forEach((item, idx) => {
    const y = 1.35 + idx * 0.55;
    slide28.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.5,
      fill: { type: "solid", color: idx % 2 === 0 ? colors.slate100 : colors.white }
    });
    slide28.addText(item.rule, {
      x: 0.7, y: y, w: 5.5, h: 0.5,
      valign: "middle", fontSize: 12, color: colors.slate700
    });
    slide28.addText(item.eval, {
      x: 6.2, y: y, w: 3.1, h: 0.5,
      valign: "middle", fontSize: 12, color: colors.primary, bold: true
    });
  });

  slide28.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.15, w: 9, h: 1.15,
    fill: { type: "solid", color: colors.slate100 }
  });

  const andOrCode = `"Condition": {
  "StringEquals": { "aws:RequestedRegion": "ap-northeast-2",
                    "ec2:InstanceType": ["t3.micro", "t3.small"] }
}  // 리전 AND (micro OR small)`;

  slide28.addText(andOrCode, {
    x: 0.7, y: 4.25, w: 8.6, h: 0.95,
    fontFace: "Courier New", fontSize: 10, color: colors.slate700
  });

  addWatermark(slide28);

  slide28.addNotes(`여러 Condition을 쓸 때 AND인지 OR인지 헷갈리기 쉽습니다. 정리해드리겠습니다.

같은 블록 내 다른 조건키는 AND입니다.
RequestedRegion과 InstanceType을 같이 쓰면 둘 다 만족해야 합니다.

같은 조건키 내 여러 값은 OR입니다.
InstanceType에 t3.micro와 t3.small을 배열로 쓰면 둘 중 하나만 맞으면 됩니다.

ForAnyValue는 배열 중 하나라도 일치하면 true입니다. OR 같은 거죠.
ForAllValues는 배열 모두 일치해야 true입니다. AND 같은 거죠.

다른 조건 연산자 블록 간에도 AND입니다.
StringEquals 블록과 IpAddress 블록을 같이 쓰면 둘 다 만족해야 합니다.

예시를 보시면:
리전이 서울이고, 인스턴스 타입이 micro 또는 small이어야 합니다.
(리전 조건) AND (micro OR small)`);

  // =========== SLIDE 29: 조건 평가 불가 시 동작 ===========
  let slide29 = pptx.addSlide();
  slide29.background = { color: colors.white };
  addContentTitle(slide29, "조건을 평가할 수 없으면?", "조건 불일치(mismatch)로 처리 → Statement 무시");

  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 1.3,
    fill: { type: "solid", color: colors.red100 }
  });
  slide29.addText("⚠️ 조건 평가 불가 상황", {
    x: 0.7, y: 1.45, w: 8.6, h: 0.35,
    fontSize: 14, color: colors.red500, bold: true
  });
  slide29.addText("• Action이 해당 조건키를 지원하지 않음 (예: DescribeInstances에서 ec2:InstanceType)\n• 조건키는 지원하지만 값이 존재하지 않음 (예: 태그 없는 리소스에서 ResourceTag 사용)", {
    x: 0.7, y: 1.85, w: 8.6, h: 0.7,
    fontSize: 11, color: colors.slate700
  });

  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 2.8, w: 9, h: 1.5,
    fill: { type: "solid", color: colors.slate100 }
  });
  slide29.addText("🎯 비유: \"이 사람의 이름이 Jack이 아닌가?\" (StringNotEquals)", {
    x: 0.7, y: 2.9, w: 8.6, h: 0.35,
    fontSize: 12, color: colors.slate900, bold: true
  });
  slide29.addText("• 이름 = \"Tom\" → \"네, Jack이 아닙니다\" → true (조건 충족)\n• 이름 = \"Jack\" → \"아니요, Jack입니다\" → false (조건 불충족)\n• 이름표 없음 → \"판단 불가\" → mismatch (Statement 무시!)", {
    x: 0.7, y: 3.3, w: 8.6, h: 0.9,
    fontSize: 11, color: colors.slate700
  });

  slide29.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.45, w: 9, h: 0.65,
    fill: { type: "solid", color: colors.navy }
  });
  slide29.addText("💡 실무: 태그 기반 Deny에서 태그 없는 리소스도 차단하려면 Null 조건 Statement 별도 필요!", {
    x: 0.7, y: 4.55, w: 8.6, h: 0.45,
    fontSize: 11, color: colors.white, bold: true
  });

  addWatermark(slide29);

  slide29.addNotes(`조건을 평가할 수 없으면 어떻게 될까요?

많은 분들이 공허하게 참이 된다고 생각하시는데, 아닙니다.
조건을 평가할 수 없으면 mismatch로 처리되어 해당 Statement가 무시됩니다.

조건 평가가 불가능한 상황은 두 가지입니다.
첫째, Action이 해당 조건키를 지원하지 않는 경우입니다.
예를 들어 DescribeInstances에서 ec2:InstanceType을 쓰면 평가가 안 됩니다.

둘째, 조건키는 지원하지만 값이 존재하지 않는 경우입니다.
태그 없는 리소스에서 ResourceTag를 쓰면 평가가 안 됩니다.

비유를 들어보겠습니다.
"이 사람의 이름이 Jack이 아닌가?"라는 질문에:
- 이름이 Tom이면 → "네, Jack이 아닙니다" → 조건 충족
- 이름이 Jack이면 → "아니요, Jack입니다" → 조건 불충족
- 이름표가 없으면 → "판단 불가" → Statement 무시!

실무적으로 태그 기반 Deny 정책에서 태그 없는 리소스도 차단하려면
Null 조건을 쓴 별도 Statement가 필요합니다.`);

  // =========== SLIDE 30: ec2:RunInstances Resource ===========
  let slide30 = pptx.addSlide();
  slide30.background = { color: colors.white };
  addContentTitle(slide30, "ec2:RunInstances의 여러 Resource ARN", "EC2 인스턴스 생성 시 여러 리소스가 동시에 관여");

  slide30.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.35, w: 9, h: 2.8,
    fill: { type: "solid", color: colors.slate100 }
  });

  const runInstancesCode = `{
  "Effect": "Allow",
  "Action": "ec2:RunInstances",
  "Resource": [
    "arn:aws:ec2:*:*:instance/*",          // 생성될 인스턴스
    "arn:aws:ec2:*::image/ami-*",          // 사용할 AMI
    "arn:aws:ec2:*:*:key-pair/*",          // SSH 키페어
    "arn:aws:ec2:*:*:network-interface/*", // 네트워크 인터페이스
    "arn:aws:ec2:*:*:security-group/*",    // 보안 그룹
    "arn:aws:ec2:*:*:subnet/*",            // 서브넷
    "arn:aws:ec2:*:*:volume/*"             // EBS 볼륨
  ]
}`;

  slide30.addText(runInstancesCode, {
    x: 0.7, y: 1.5, w: 8.6, h: 2.5,
    fontFace: "Courier New", fontSize: 11, color: colors.slate700
  });

  slide30.addText("💡 위 모든 리소스에 대한 권한이 있어야 인스턴스 생성 성공 (AWS 공식문서 Dependent actions 참고)", {
    x: 0.5, y: 4.3, w: 9, h: 0.5,
    fontSize: 11, color: colors.slate700
  });

  addWatermark(slide30);

  slide30.addNotes(`ec2:RunInstances에 여러 Resource ARN이 필요한 이유를 설명드리겠습니다.

EC2 인스턴스를 생성할 때는 여러 리소스가 동시에 관여합니다.
인스턴스 자체뿐만 아니라 AMI, 키페어, 네트워크 인터페이스, 보안 그룹, 서브넷, EBS 볼륨 등이요.

그래서 RunInstances 정책을 쓸 때는 이 모든 리소스에 대한 ARN을 지정해야 합니다.

만약 instance/*만 지정하면 어떻게 될까요?
AMI나 보안 그룹에 대한 권한이 없어서 인스턴스 생성이 실패합니다.

AWS 공식 문서의 Dependent actions 섹션을 확인하면
각 Action에 필요한 Resource 목록을 볼 수 있습니다.

특히 EC2는 리소스 유형이 많아서 이런 문제가 자주 발생합니다.
정책이 안 될 때 Resource를 다시 확인해보세요.`);

  // =========== SLIDE 31: 정책 평가 순서 ===========
  let slide31 = pptx.addSlide();
  slide31.background = { color: colors.white };
  addContentTitle(slide31, "정책 평가 순서");

  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.0, y: 1.4, w: 2.0, h: 0.7,
    fill: { type: "solid", color: colors.slate200 }
  });
  slide31.addText("요청 발생", {
    x: 4.0, y: 1.4, w: 2.0, h: 0.7,
    align: "center", valign: "middle", fontSize: 13, color: colors.slate700
  });

  slide31.addText("↓", { x: 4.75, y: 2.1, w: 0.5, h: 0.3, align: "center", fontSize: 16, color: colors.slate400 });

  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 2.5, w: 5.0, h: 0.75,
    fill: { type: "solid", color: colors.red100 }
  });
  slide31.addText("1️⃣ 명시적 Deny 있음? → 무조건 거부 (최우선)", {
    x: 2.5, y: 2.5, w: 5.0, h: 0.75,
    align: "center", valign: "middle", fontSize: 13, color: colors.red500, bold: true
  });

  slide31.addText("↓ No", { x: 4.75, y: 3.25, w: 0.5, h: 0.3, align: "center", fontSize: 12, color: colors.slate400 });

  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 3.55, w: 5.0, h: 0.75,
    fill: { type: "solid", color: colors.green100 }
  });
  slide31.addText("2️⃣ 명시적 Allow 있음? → 허용", {
    x: 2.5, y: 3.55, w: 5.0, h: 0.75,
    align: "center", valign: "middle", fontSize: 13, color: colors.green500, bold: true
  });

  slide31.addText("↓ No", { x: 4.75, y: 4.3, w: 0.5, h: 0.3, align: "center", fontSize: 12, color: colors.slate400 });

  slide31.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 2.5, y: 4.6, w: 5.0, h: 0.75,
    fill: { type: "solid", color: colors.slate200 },
    line: { color: colors.red500, width: 1, dashType: "dash" }
  });
  slide31.addText("3️⃣ 암묵적 Deny (기본값) → 거부", {
    x: 2.5, y: 4.6, w: 5.0, h: 0.75,
    align: "center", valign: "middle", fontSize: 13, color: colors.red500, bold: true
  });

  addWatermark(slide31);

  slide31.addNotes(`정책 평가 순서입니다. 이 순서를 이해하면 복잡한 정책도 예측할 수 있습니다.

요청이 발생하면 AWS는 다음 순서로 평가합니다.

1단계: 명시적 Deny가 있는지 확인합니다.
하나라도 Deny가 있으면 무조건 거부됩니다. 최우선입니다.

2단계: 명시적 Allow가 있는지 확인합니다.
Allow가 있으면 허용됩니다.

3단계: 위 두 경우가 아니면 암묵적 Deny입니다.
아무 정책도 없으면 기본적으로 거부입니다.

핵심 원칙: Allow와 Deny가 충돌하면 Deny가 항상 이깁니다.

예를 들어 Policy A에서 s3:*를 Allow하고,
Policy B에서 s3:DeleteObject를 Deny하면,
s3:DeleteObject는 거부됩니다.

이 때문에 Deny 정책을 신중하게 써야 합니다.
한번 Deny하면 다른 정책에서 Allow해도 소용없습니다.`);

  // =========== SLIDE 32: 흔한 실수 ===========
  let slide32 = pptx.addSlide();
  slide32.background = { color: colors.white };
  addContentTitle(slide32, "흔한 실수와 해결책");

  const mistakes = [
    { mistake: "Resource에 * 누락", solution: "서비스별 필수 Resource 확인" },
    { mistake: "NotAction 오용", solution: "Allow+NotAction 조합 주의" },
    { mistake: "조건키 오타", solution: "AWS 문서에서 정확한 키 확인" },
    { mistake: "정책 크기 초과", solution: "6,144자 제한, 정책 분리 필요" },
    { mistake: "지원 안 되는 조건키", solution: "조건이 무시되어 의도치 않은 허용!" }
  ];

  mistakes.forEach((item, idx) => {
    const y = 1.35 + idx * 0.78;
    const isLast = idx === mistakes.length - 1;

    slide32.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.7,
      fill: { type: "solid", color: isLast ? colors.red100 : colors.slate100 }
    });
    slide32.addText("❌ " + item.mistake, {
      x: 0.7, y: y + 0.1, w: 3.8, h: 0.5,
      fontSize: 13, color: isLast ? colors.red500 : colors.slate900, bold: true
    });
    slide32.addText("→ " + item.solution, {
      x: 4.5, y: y + 0.1, w: 4.8, h: 0.5,
      fontSize: 13, color: colors.slate700
    });
  });

  addWatermark(slide32);

  slide32.addNotes(`흔한 실수와 해결책을 정리했습니다.

첫째, Resource에 별표 와일드카드 누락입니다.
일부 Action은 특정 Resource를 필수로 지정해야 합니다.
정책이 안 될 때 서비스별 필수 Resource를 확인하세요.

둘째, NotAction 오용입니다.
Allow와 NotAction을 같이 쓰면 의도치 않은 허용이 발생할 수 있습니다.
다음 슬라이드에서 자세히 설명드리겠습니다.

셋째, 조건키 오타입니다.
조건키를 잘못 쓰면 조건이 무시되어 의도대로 동작하지 않습니다.
AWS 문서에서 정확한 키를 복사해서 쓰세요.

넷째, 정책 크기 초과입니다.
IAM 정책은 6,144자 제한이 있습니다. 넘으면 정책 분리가 필요합니다.

다섯째, 지원 안 되는 조건키 사용입니다.
이게 가장 위험합니다. 조건이 무시되어 의도치 않은 허용이 발생합니다!`);

  // =========== SLIDE 33: Section - FAQ ===========
  let slide33 = addSectionSlide("05", "자주 묻는 질문 (FAQ)", "실무에서 자주 발생하는 의문점 해결", colors.navy, colors.slate400);
  slide33.addNotes(`다섯 번째 섹션, FAQ입니다.

실무에서 자주 발생하는 의문점들을 정리했습니다.
특히 Allow+NotAction vs Deny+Action 비교는 반드시 알아두셔야 합니다.`);

  // =========== SLIDE 34: FAQ - Allow+NotAction vs Deny+Action ===========
  let slide34 = pptx.addSlide();
  slide34.background = { color: colors.white };
  addContentTitle(slide34, "Q: Allow+NotAction vs Deny+Action?", "Deny + Action이 항상 더 안전합니다");

  slide34.addShape(pptx.shapes.RECTANGLE, { x: 0.5, y: 1.35, w: 4.3, h: 0.45, fill: { type: "solid", color: colors.amber500 } });
  slide34.addText("Allow + NotAction", { x: 0.5, y: 1.35, w: 4.3, h: 0.45, align: "center", valign: "middle", fontSize: 13, color: colors.white, bold: true });

  slide34.addShape(pptx.shapes.RECTANGLE, { x: 5.2, y: 1.35, w: 4.3, h: 0.45, fill: { type: "solid", color: colors.green500 } });
  slide34.addText("Deny + Action ✓", { x: 5.2, y: 1.35, w: 4.3, h: 0.45, align: "center", valign: "middle", fontSize: 13, color: colors.white, bold: true });

  slide34.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.85, w: 4.3, h: 1.5, fill: { type: "solid", color: colors.amber100 } });
  slide34.addText("지정한 Action 외 모두 허용\n\n신규 서비스 추가 시\n→ 자동 허용 ⚠️", {
    x: 0.7, y: 2.0, w: 3.9, h: 1.3, fontSize: 12, color: colors.slate700
  });

  slide34.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 5.2, y: 1.85, w: 4.3, h: 1.5, fill: { type: "solid", color: colors.green100 } });
  slide34.addText("지정한 Action만 거부\n\n신규 서비스 추가 시\n→ 영향 없음 ✅", {
    x: 5.4, y: 2.0, w: 3.9, h: 1.3, fontSize: 12, color: colors.slate700
  });

  slide34.addShape(pptx.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 3.5, w: 9, h: 1.4, fill: { type: "solid", color: colors.slate100 } });

  const allowNotCode = `// ⚠️ 신규 서비스 자동 허용
{ "Effect": "Allow", "NotAction": ["iam:*"], "Resource": "*" }

// ✅ 명시적 거부만
{ "Effect": "Deny", "Action": ["iam:*"], "Resource": "*" }`;

  slide34.addText(allowNotCode, { x: 0.7, y: 3.6, w: 8.6, h: 1.2, fontFace: "Courier New", fontSize: 10, color: colors.slate700 });

  addWatermark(slide34);

  slide34.addNotes(`FAQ: Allow+NotAction vs Deny+Action, 어떤 게 더 안전할까요?

결론부터 말씀드리면, Deny+Action이 항상 더 안전합니다.

Allow+NotAction을 보겠습니다.
"Effect": "Allow", "NotAction": ["iam:*"]
이건 IAM을 제외한 모든 작업을 허용한다는 뜻입니다.

문제는 신규 서비스가 추가될 때입니다.
AWS가 새 서비스를 출시하면, 그 서비스도 자동으로 허용됩니다.
의도치 않은 권한이 부여되는 것이죠.

반면 Deny+Action을 보겠습니다.
"Effect": "Deny", "Action": ["iam:*"]
이건 IAM만 명시적으로 거부한다는 뜻입니다.

신규 서비스가 추가되어도 영향이 없습니다.
다른 정책에서 Allow해야만 사용할 수 있습니다.

결론:
- Allow+NotAction: 편하지만 위험, 신규 서비스 자동 허용
- Deny+Action: 안전, 신규 서비스 영향 없음

실무에서는 Deny+Action을 권장합니다.`);

  // =========== SLIDE 35: 체크리스트 ===========
  let slide35 = pptx.addSlide();
  slide35.background = { color: colors.navy };

  slide35.addText("🛡️ 정책 작성 전 체크리스트", {
    x: 0.5, y: 0.5, w: 9, h: 0.6,
    fontSize: 26, color: colors.accent, bold: true
  });

  const checklist = [
    "조건키가 해당 Action에서 지원되는지 공식 문서에서 확인했는가?",
    "Allow + NotAction 대신 Deny + Action을 사용할 수 있는지 검토했는가?",
    "리소스의 \"현재 상태\" vs \"변경하려는 값\" 제어가 명확한가?",
    "ForAnyValue/ForAllValues가 필요한 다중 값 조건키인지 확인했는가?",
    "PassRole이 필요한 작업인지 확인했는가?",
    "태그 기반 정책에서 Null 조건을 추가해야 하는지 검토했는가?"
  ];

  checklist.forEach((item, idx) => {
    slide35.addText("☐", {
      x: 0.5, y: 1.25 + idx * 0.65, w: 0.4, h: 0.5,
      fontSize: 16, color: colors.accent
    });
    slide35.addText(item, {
      x: 1.0, y: 1.25 + idx * 0.65, w: 8.5, h: 0.5,
      fontSize: 14, color: colors.white
    });
  });

  slide35.addText("AWS IAM Policy Management", {
    x: 7.2, y: 5.2, w: 2.6, h: 0.3,
    align: "right", fontSize: 9, color: colors.slate500
  });

  slide35.addNotes(`정책 작성 전 체크리스트입니다. 새 정책을 만들 때마다 확인하세요.

1. 조건키가 해당 Action에서 지원되는지 공식 문서에서 확인했는가?
지원 안 되는 조건키를 쓰면 조건이 무시됩니다.

2. Allow+NotAction 대신 Deny+Action을 사용할 수 있는지 검토했는가?
신규 서비스 추가 시 의도치 않은 허용을 방지합니다.

3. 리소스의 "현재 상태" vs "변경하려는 값" 제어가 명확한가?
ec2:InstanceType vs ec2:Attribute/InstanceType 같은 구분이 필요합니다.

4. ForAnyValue/ForAllValues가 필요한 다중 값 조건키인지 확인했는가?
단일 값이면 필요 없습니다.

5. PassRole이 필요한 작업인지 확인했는가?
서비스에 Role을 전달하는 작업은 PassRole 권한이 필요합니다.

6. 태그 기반 정책에서 Null 조건을 추가해야 하는지 검토했는가?
태그 없는 리소스도 제어해야 할 수 있습니다.`);

  // =========== SLIDE 36: 참고 자료 ===========
  let slide36 = pptx.addSlide();
  slide36.background = { color: colors.white };
  addContentTitle(slide36, "참고 자료");

  const resources = [
    { title: "IAM 글로벌 조건키 전체 목록", url: "AWS IAM User Guide - Condition Keys" },
    { title: "서비스별 Actions, Resources, Condition Keys", url: "Service Authorization Reference" },
    { title: "IAM Policy Simulator", url: "policysim.aws.amazon.com" },
    { title: "AWS Access Analyzer", url: "정책 검증 도구" }
  ];

  resources.forEach((res, idx) => {
    const y = 1.4 + idx * 0.85;
    slide36.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.75,
      fill: { type: "solid", color: colors.blue100 }
    });
    slide36.addText("📚 " + res.title, {
      x: 0.7, y: y + 0.1, w: 8.6, h: 0.35,
      fontSize: 14, color: colors.primary, bold: true
    });
    slide36.addText(res.url, {
      x: 0.7, y: y + 0.42, w: 8.6, h: 0.3,
      fontSize: 12, color: colors.slate500
    });
  });

  slide36.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 4.85, w: 9, h: 0.5,
    fill: { type: "solid", color: colors.navy }
  });
  slide36.addText("새 정책 작성 시 반드시 공식 문서에서 해당 Action이 지원하는 조건키를 확인하세요!", {
    x: 0.7, y: 4.95, w: 8.6, h: 0.3,
    fontSize: 12, color: colors.white, bold: true
  });

  addWatermark(slide36);

  slide36.addNotes(`마지막으로 참고 자료를 안내드립니다.

IAM 글로벌 조건키 전체 목록은 AWS IAM User Guide에서 확인할 수 있습니다.
aws:로 시작하는 모든 조건키와 사용법이 나와 있습니다.

서비스별 Actions, Resources, Condition Keys는 Service Authorization Reference에서 확인하세요.
각 서비스의 모든 Action과 지원하는 조건키가 정리되어 있습니다.
새 정책을 작성할 때 가장 많이 참고하게 될 문서입니다.

IAM Policy Simulator는 policysim.aws.amazon.com에서 사용할 수 있습니다.
정책을 적용하기 전에 테스트해볼 수 있습니다.

AWS Access Analyzer는 정책 검증 도구입니다.
정책의 잠재적 문제점을 자동으로 찾아줍니다.

마지막으로 강조드립니다.
새 정책을 작성할 때는 반드시 공식 문서에서 해당 Action이 지원하는 조건키를 확인하세요!

감사합니다. 질문 있으시면 말씀해주세요.`);

  // Save the presentation
  await pptx.writeFile({ fileName: "AWS-IAM-Policy-Management.pptx" });
  console.log("프레젠테이션이 생성되었습니다: AWS-IAM-Policy-Management.pptx (36슬라이드)");
}

createPresentation().catch(console.error);
