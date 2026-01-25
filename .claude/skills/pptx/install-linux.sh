#!/bin/bash
# cowork-pptx 의존성 설치 스크립트 (Linux)

set -e

echo "🚀 cowork-pptx 의존성 설치 시작 (Linux)"
echo "================================================"

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Root 권한 확인
if [[ $EUID -ne 0 ]]; then
   echo -e "${YELLOW}⚠️  이 스크립트는 관리자 권한이 필요합니다.${NC}"
   echo "    다시 실행하세요: sudo bash install-linux.sh"
   exit 1
fi

# 1️⃣ Python 패키지 설치
echo -e "${BLUE}1️⃣  Python 패키지 설치 중...${NC}"
pip install -r requirements.txt
echo -e "${GREEN}✓ Python 패키지 설치 완료${NC}\n"

# 2️⃣ Node.js 전역 패키지 설치
echo -e "${BLUE}2️⃣  Node.js 전역 패키지 설치 중...${NC}"
npm install -g pptxgenjs playwright
npm install -g react react-dom react-icons
echo -e "${GREEN}✓ Node.js 패키지 설치 완료${NC}\n"

# 3️⃣ LibreOffice 설치 확인
echo -e "${BLUE}3️⃣  LibreOffice 설치 확인 중...${NC}"
if ! command -v soffice &> /dev/null; then
    echo -e "${YELLOW}⚠️  LibreOffice를 찾을 수 없습니다.${NC}"
    echo "    설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        apt-get update
        apt-get install -y libreoffice
        echo -e "${GREEN}✓ LibreOffice 설치 완료${NC}"
    else
        echo -e "${YELLOW}⏭️  LibreOffice 설치 건너뜀${NC}"
    fi
else
    echo -e "${GREEN}✓ LibreOffice 설치됨${NC}"
fi
echo

# 4️⃣ Poppler (PDF → 이미지) 설치 확인
echo -e "${BLUE}4️⃣  Poppler 설치 확인 중...${NC}"
if ! command -v pdftoppm &> /dev/null; then
    echo -e "${YELLOW}⚠️  Poppler를 찾을 수 없습니다.${NC}"
    echo "    설치하시겠습니까? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        apt-get update
        apt-get install -y poppler-utils
        echo -e "${GREEN}✓ Poppler 설치 완료${NC}"
    else
        echo -e "${YELLOW}⏭️  Poppler 설치 건너뜀${NC}"
    fi
else
    echo -e "${GREEN}✓ Poppler 설치됨${NC}"
fi
echo

# 5️⃣ html2pptx 라이브러리 추출
echo -e "${BLUE}5️⃣  html2pptx 라이브러리 추출 중...${NC}"
if [ ! -d "html2pptx" ] || [ -z "$(ls -A html2pptx)" ]; then
    mkdir -p html2pptx
    tar -xzf pptx-skill-tools/html2pptx.tgz -C html2pptx
    echo -e "${GREEN}✓ html2pptx 추출 완료${NC}"
else
    echo -e "${GREEN}✓ html2pptx 이미 추출됨${NC}"
fi
echo

# 최종 확인
echo -e "${BLUE}최종 확인${NC}"
echo "================================================"

echo -n "Python markitdown: "
python -c "import markitdown; print(markitdown.__version__)" 2>/dev/null && echo -e "${GREEN}✓${NC}" || echo -e "❌"

echo -n "pptxgenjs: "
npm list -g pptxgenjs 2>/dev/null | grep pptxgenjs > /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "❌"

echo -n "playwright: "
npm list -g playwright 2>/dev/null | grep playwright > /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "❌"

echo -n "LibreOffice: "
command -v soffice &> /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "${YELLOW}선택 사항${NC}"

echo -n "Poppler: "
command -v pdftoppm &> /dev/null && echo -e "${GREEN}✓${NC}" || echo -e "${YELLOW}선택 사항${NC}"

echo
echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}✨ 설치 완료!${NC}"
echo -e "${GREEN}================================================${NC}"
echo
echo "다음 단계:"
echo "1. 프레젠테이션 작성: presentations/my-presentation/"
echo "2. 빌드: cd presentations/my-presentation && NODE_PATH=\"\$(npm root -g)\" node build.js"
echo
echo "자세한 사용법은 README.md를 참고하세요."
