export const homeGradients = {
  study: ['#270483', '#8146cc'] as const,
  practice: ['#470a56', '#ce32b1'] as const,
  exam: ['#1B5E20', '#4CAF50'] as const,
} as const;

export const sectionGradients = {
  GobiernoAmericano: ['#9057e3', '#5e13b3'] as const,
  HistoriaAmericana: ['#a51890', '#6c1e74'] as const,
  EducacionCivica: ['#9057e3', '#5e13b3'] as const,
} as const;

export const colors = {
  primary: {
    main: '#5637A4',
    light: '#7247C4',
    dark: '#422980',
    gradient: ['#5637A4', '#9747FF'] as const,
  },
  secondary: {
    yellow: '#FFCB1F',
    white: '#FFFFFF',
    accent: '#2645ca',
  },
  text: {
    dark: '#1A1A1A',
    light: '#666666',
    primary: '#FFFFFF',
  },
  surface: {
    main: '#FFFFFF',
    light: '#F5F5F5',
    dark: '#E5E5EA',
  },
  neutral: {
    background: '#F5F5F5',
    card: '#FFFFFF',
    divider: '#E5E5E5',
  },
  ui: {
    success: '#4CAF50',
    error: '#FF3B30',
    warning: '#FFC107',
    info: '#2196F3',
    disabled: '#BDBDBD',
  },
  progress: {
    border: '#2C8BFF',
    background: '#FFFFFF',
  },
  error: {
    main: '#FF3B30',
    light: '#FF6B6B',
  },
  shadow: 'rgba(0, 0, 0, 0.15)',
} as const;
