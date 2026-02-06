#!/bin/bash
# Glen's Claude Skills - 새 머신 셋업 스크립트
# 이 프로젝트에서 ~/.claude/ 로 전체 환경을 배포합니다.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CLAUDE_DIR="$HOME/.claude"

echo "=== Glen's Claude Skills 셋업 ==="
echo ""

# 1. 글로벌 설정 배포
mkdir -p "$CLAUDE_DIR"

# CLAUDE.md (항상 덮어씀 - 이 프로젝트가 원천)
cp "$SCRIPT_DIR/global/CLAUDE.md" "$CLAUDE_DIR/CLAUDE.md"
echo "[1/6] CLAUDE.md 배포 완료"

# settings.json (없으면 생성, 있으면 건너뜀)
if [ ! -f "$CLAUDE_DIR/settings.json" ]; then
  cp "$SCRIPT_DIR/global/settings.example.json" "$CLAUDE_DIR/settings.json"
  echo "[2/6] settings.json 생성 완료"
else
  echo "[2/6] settings.json 이미 존재 (건너뜀, 강제: setup.sh --force)"
fi

# mcp.json (없으면 생성)
if [ ! -f "$CLAUDE_DIR/mcp.json" ]; then
  cp "$SCRIPT_DIR/global/mcp.example.json" "$CLAUDE_DIR/mcp.json"
  echo "[3/6] mcp.json 생성 완료"
  echo "       -> GITHUB_TOKEN, FIRECRAWL_KEY 환경변수를 설정하세요"
else
  echo "[3/6] mcp.json 이미 존재 (건너뜀)"
fi

# --force 옵션
if [ "$1" = "--force" ]; then
  cp "$SCRIPT_DIR/global/settings.example.json" "$CLAUDE_DIR/settings.json"
  cp "$SCRIPT_DIR/global/mcp.example.json" "$CLAUDE_DIR/mcp.json"
  echo "       -> settings.json, mcp.json 강제 덮어씀"
fi

# 2. agents, commands, skills 배포
for dir in agents commands skills; do
  if [ -d "$CLAUDE_DIR/$dir" ]; then
    rm -rf "$CLAUDE_DIR/$dir"
  fi
  cp -R "$SCRIPT_DIR/.claude/$dir" "$CLAUDE_DIR/$dir"
  echo "[4/6] $dir/ 배포 완료"
done

# 3. 프로젝트 로컬 설정
if [ ! -f "$SCRIPT_DIR/.claude/settings.json" ]; then
  cp "$SCRIPT_DIR/.claude/settings.example.json" "$SCRIPT_DIR/.claude/settings.json"
  echo "[5/6] 프로젝트 settings.json 생성 완료"
else
  echo "[5/6] 프로젝트 settings.json 이미 존재 (건너뜀)"
fi

# 4. 의존성 설치
echo "[6/6] 의존성 설치..."
cd "$SCRIPT_DIR" && npm install --silent 2>/dev/null || true
cd "$SCRIPT_DIR/.claude/skills/pptx" && npm install --silent 2>/dev/null || true
echo "       의존성 설치 완료"

# 5. 플러그인 안내
echo ""
echo "=== 셋업 완료 ==="
echo ""
echo "플러그인 설치 (수동):"
echo "  claude plugin marketplace add https://github.com/anthropics/claude-plugins-official"
echo "  claude plugin marketplace add https://github.com/jarrodwatts/claude-hud"
echo "  claude plugin marketplace add https://github.com/makenotion/claude-code-notion-plugin"
echo "  claude plugin install claude-hud@claude-hud"
echo "  claude plugin install notion-workspace-plugin@notion-plugin-marketplace"
echo ""
echo "환경변수 (.zshrc 또는 .env):"
echo "  export GITHUB_TOKEN=ghp_..."
echo "  export FIRECRAWL_KEY=fc-..."
echo ""
echo "Claude Code를 재시작하면 적용됩니다."
