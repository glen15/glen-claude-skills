/**
 * NXT Cloud Theme v1 - Configuration
 */

const path = require('path');

const theme = {
  name: 'nxtcloud-v1',
  version: '2.0.0',

  assets: {
    logo: path.join(__dirname, '../../assets/nxtcloud-logo.png'),
    logoRatio: 1.0
  },

  colors: {
    navy: '0f172a',
    navyLight: '1e3a5f',
    primary: '2563eb',
    primaryLight: '3b82f6',
    primaryDark: '1e40af',
    accent: '38bdf8',

    white: 'ffffff',
    slate100: 'f1f5f9',
    slate200: 'e2e8f0',
    slate300: 'cbd5e1',
    slate400: '94a3b8',
    slate500: '64748b',
    slate600: '475569',
    slate700: '334155',
    slate800: '1e293b',
    slate900: '0f172a',

    amber500: 'f59e0b',
    amber100: 'fef3c7',
    blue100: 'dbeafe',
    green500: '10b981',
    green100: 'd1fae5',
    purple500: '8b5cf6',
    purple100: 'ede9fe',
    red500: 'ef4444',
    red100: 'fee2e2',
    sky100: 'e0f2fe',
    sky700: '0369a1'
  },

  semantic: {
    bgDark: '0f172a',
    bgLight: 'ffffff',
    bgMuted: 'f1f5f9',
    bgAccent: '2563eb',
    bgCard: 'ffffff',
    bgCardDark: '1e3a5f',

    textPrimary: '1e293b',
    textSecondary: '64748b',
    textMuted: '94a3b8',
    textOnDark: 'ffffff',
    textOnAccent: 'ffffff',
    textAccent: '2563eb',

    success: '10b981',
    warning: 'f59e0b',
    error: 'ef4444',
    info: '2563eb'
  },

  typography: {
    display: { size: 54, weight: 'bold' },
    h1: { size: 48, weight: 'bold' },
    h2: { size: 36, weight: 'bold' },
    h3: { size: 28, weight: 'bold' },
    h4: { size: 22, weight: 'normal' },
    h5: { size: 20, weight: 'normal' },
    h6: { size: 16, weight: 'normal' },

    body: { size: 14, weight: 'normal' },
    bodyLarge: { size: 16, weight: 'normal' },
    bodySmall: { size: 12, weight: 'normal' },

    caption: { size: 11, weight: 'normal' },
    small: { size: 10, weight: 'normal' },
    tiny: { size: 9, weight: 'normal' },

    cardTitle: { size: 15, weight: 'bold' },
    cardBody: { size: 11, weight: 'normal' },
    label: { size: 12, weight: 'bold' },
    badge: { size: 12, weight: 'bold' }
  },

  layout: {
    width: 10,
    height: 5.625,

    margin: {
      x: 0.5,
      y: 0.4,
      content: 0.4
    },

    header: {
      titleY: 0.4,
      titleH: 0.6,
      subtitleY: 0.95,
      subtitleH: 0.35
    },

    footer: {
      y: 5.2,
      height: 0.3,
      rightX: 7.5,
      rightW: 2.3
    },

    content: {
      startY: 1.5,
      endY: 5.0,
      height: 3.5
    },

    title: {
      mainY: 2.5,
      subtitleY: 3.4,
      companyY: 4.4,
      teamY: 4.7,
      audienceY: 5.1
    },

    section: {
      numberY: 1.5,
      titleY: 2.3,
      descY: 3.2,
      lineY: 3.9
    },

    card: {
      minWidth: 2.0,
      minHeight: 2.0,
      padding: 0.15,
      accentBarHeight: 0.06,
      cornerRadius: 0.1
    },

    grid: {
      columns2: { width: 4.3, gap: 0.4 },
      columns3: { width: 2.8, gap: 0.35 },
      columns4: { width: 2.2, gap: 0.2 }
    }
  },

  components: {
    roundedRect: { cornerRadius: 0.1 },
    divider: { height: 0.04, color: '38bdf8' },
    accentBar: { height: 0.06, topBar: 0.08 }
  },

  palette: {
    sequence: ['amber500', 'primary', 'green500', 'purple500', 'red500'],
    backgrounds: ['amber100', 'blue100', 'green100', 'purple100', 'red100']
  }
};

function getColor(colorName) {
  return theme.colors[colorName] || theme.semantic[colorName] || colorName;
}

function getTypography(level) {
  return theme.typography[level] || theme.typography.body;
}

function getPaletteColor(index, type = 'sequence') {
  const palette = theme.palette[type];
  const colorName = palette[index % palette.length];
  return getColor(colorName);
}

module.exports = {
  theme,
  getColor,
  getTypography,
  getPaletteColor
};
