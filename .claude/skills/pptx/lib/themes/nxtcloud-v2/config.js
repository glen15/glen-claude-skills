/**
 * NXT Cloud Theme v2 Configuration
 * 좌측 정렬, 모던한 스타일, 밝은 톤
 */

const theme = {
  name: 'nxtcloud-v2',
  version: '2.0.0',

  colors: {
    // Primary
    primary: '10b981',      // emerald-500
    primaryDark: '059669',  // emerald-600
    primaryLight: '34d399', // emerald-400

    // Secondary
    secondary: '6366f1',    // indigo-500
    secondaryDark: '4f46e5',
    secondaryLight: '818cf8',

    // Accent
    accent: 'f59e0b',       // amber-500
    accentDark: 'd97706',
    accentLight: 'fbbf24',

    // Backgrounds
    navy: '1e293b',         // slate-800
    darkBg: '0f172a',       // slate-900
    lightBg: 'f8fafc',      // slate-50

    // Neutrals (gray scale)
    white: 'FFFFFF',
    black: '000000',
    gray50: 'f9fafb',
    gray100: 'f3f4f6',
    gray200: 'e5e7eb',
    gray300: 'd1d5db',
    gray400: '9ca3af',
    gray500: '6b7280',
    gray600: '4b5563',
    gray700: '374151',
    gray800: '1f2937',
    gray900: '111827',

    // Slate aliases (v1 호환)
    slate50: 'f8fafc',
    slate100: 'f1f5f9',
    slate200: 'e2e8f0',
    slate300: 'cbd5e1',
    slate400: '94a3b8',
    slate500: '64748b',
    slate600: '475569',
    slate700: '334155',
    slate800: '1e293b',
    slate900: '0f172a',

    // Semantic
    success: '22c55e',
    warning: 'f59e0b',
    error: 'ef4444',
    info: '3b82f6',

    // Palette (카드, 타임라인용)
    palette: ['10b981', '6366f1', 'f59e0b', 'ec4899', '8b5cf6', '06b6d4']
  },

  typography: {
    display: { size: 44, bold: true },
    h1: { size: 36, bold: true },
    h2: { size: 28, bold: true },
    h3: { size: 24, bold: true },
    h4: { size: 20, bold: true },
    h5: { size: 16, bold: true },
    body: { size: 14, bold: false },
    caption: { size: 12, bold: false },
    small: { size: 10, bold: false }
  },

  layout: {
    width: 10,
    height: 5.625,
    margin: { x: 0.6, y: 0.4 },

    // V2: 좌측 정렬 타이틀
    title: {
      mainY: 2.0,
      subtitleY: 2.8,
      companyY: 4.2,
      teamY: 4.6
    },

    // V2: 좌측 정렬 섹션
    section: {
      numberY: 1.8,
      titleY: 2.4,
      descY: 3.5,
      accentBarX: 0.6,
      accentBarW: 0.15,
      accentBarH: 1.8
    },

    // V2: 헤더 (라벨 포함)
    header: {
      labelY: 0.35,
      titleY: 0.55,
      subtitleY: 1.15,
      lineY: 1.45
    },

    content: {
      startY: 1.6,
      maxY: 5.0
    },

    footer: {
      y: 5.25
    }
  },

  components: {
    accentBar: {
      topBar: 0.08,
      sideBar: 0.15
    },
    card: {
      borderRadius: 8,
      padding: 0.15,
      iconSize: 0.5
    }
  },

  assets: {
    logo: null,
    logoRatio: 1.0
  }
};

// 색상 가져오기
function getColor(colorName) {
  if (!colorName) return theme.colors.white;

  // 이미 hex 값인 경우
  if (/^[0-9A-Fa-f]{6}$/.test(colorName)) {
    return colorName;
  }

  return theme.colors[colorName] || theme.colors.white;
}

// 타이포그래피 가져오기
function getTypography(level) {
  return theme.typography[level] || theme.typography.body;
}

// 팔레트 색상 가져오기 (인덱스 기반 순환)
function getPaletteColor(index) {
  const palette = theme.colors.palette;
  return palette[index % palette.length];
}

module.exports = {
  theme,
  getColor,
  getTypography,
  getPaletteColor
};
