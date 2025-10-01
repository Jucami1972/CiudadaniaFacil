import { Platform } from 'react-native';

export const fontFamily = {
  base: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
  title: Platform.select({
    ios: 'SF Pro Display',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  xxxl: 32,
} as const;

export const lineHeight = {
  tight: 1.2,
  base: 1.4,
  relaxed: 1.6,
} as const;

export const textStyles = {
  heading1: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  heading2: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
  },
  heading3: {
    fontFamily: fontFamily.title,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
  },
  subtitle: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.base,
  },
  body: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.relaxed,
  },
  caption: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.base,
  },
  button: {
    fontFamily: fontFamily.base,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
  },
} as const;
