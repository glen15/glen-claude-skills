#!/usr/bin/env node

const pptxgen = require("pptxgenjs");
const { html2pptx } = require("./html2pptx");
const fs = require("fs");
const path = require("path");

async function main() {
  // 소스 폴더 결정 (인자 또는 현재 폴더)
  let sourceDir = process.argv[2] || ".";
  sourceDir = path.resolve(sourceDir);

  // 출력 폴더 결정
  let outputDir = process.argv[3] || sourceDir;
  outputDir = path.resolve(outputDir);

  // slides 폴더 찾기
  let slidesDir = path.join(sourceDir, "slides");
  if (!fs.existsSync(slidesDir)) {
    // slides 폴더가 없으면 sourceDir 자체가 슬라이드 폴더
    slidesDir = sourceDir;
  }

  console.log(`📁 소스: ${slidesDir}`);
  console.log(`📁 출력: ${outputDir}\n`);

  // HTML 파일 찾기
  const slideFiles = fs.readdirSync(slidesDir)
    .filter(f => /\.html$/.test(f))
    .sort((a, b) => {
      // 파일명에서 숫자 추출
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");
      return numA - numB;
    });

  if (slideFiles.length === 0) {
    console.error(`❌ HTML 파일을 찾을 수 없습니다: ${slidesDir}`);
    process.exit(1);
  }

  console.log(`📝 ${slideFiles.length}개의 슬라이드 처리 중...\n`);

  // PPT 생성
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.defineLayout({ name: "LAYOUT_16x9", width: 10, height: 5.625 });

  // styles.css 있으면 로드 (sourceDir에서 찾기)
  let globalCss = "";
  const stylesPath = path.join(sourceDir, "styles.css");
  if (fs.existsSync(stylesPath)) {
    globalCss = fs.readFileSync(stylesPath, "utf-8");
    console.log(`📄 styles.css 로드됨\n`);
  }

  // 각 슬라이드 처리
  for (let i = 0; i < slideFiles.length; i++) {
    const slideFile = slideFiles[i];
    const slidePath = path.join(slidesDir, slideFile);

    try {
      // HTML 읽기
      let htmlContent = fs.readFileSync(slidePath, "utf-8");

      // 전역 스타일 삽입
      if (globalCss) {
        htmlContent = htmlContent.replace(
          "</head>",
          `<style>${globalCss}</style></head>`
        );
      }

      // 임시 파일에 저장 (절대 경로로)
      const tempPath = path.join(slidesDir, `._temp_${i}.html`);
      fs.writeFileSync(tempPath, htmlContent);

      // HTML → PPTX 변환
      await html2pptx(tempPath, pptx);

      console.log(`  ✓ ${i + 1}/${slideFiles.length}: ${slideFile}`);

      // 임시 파일 삭제
      fs.unlinkSync(tempPath);
    } catch (err) {
      console.error(`  ❌ ${slideFile} 처리 실패:`, err.message);
      throw err;
    }
  }

  // 출력 폴더 생성
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // PPT 저장
  const outputPath = path.join(outputDir, "output.pptx");
  await pptx.writeFile({ fileName: outputPath });

  console.log(`\n✅ 완료!`);
  console.log(`📊 슬라이드: ${slideFiles.length}개`);
  console.log(`📁 경로: ${outputPath}`);
}

main().catch(err => {
  console.error("❌ 오류:", err.message);
  process.exit(1);
});
