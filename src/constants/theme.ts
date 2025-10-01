import { colors, homeGradients, sectionGradients } from './colors';
import { spacing, radius, shadow } from './spacing';
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
} from './typography';

export const theme = {
  colors,
  homeGradients,
  sectionGradients,
  spacing,
  radius,
  shadow,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
} as const;

export type Theme = typeof theme;

export {
  colors,
  homeGradients,
  sectionGradients,
  spacing,
  radius,
  shadow,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  textStyles,
};
