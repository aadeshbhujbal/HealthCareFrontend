/**
 * Shared color tokens for use in both Tamagui and Tailwind
 * 
 * This file exports the color palette that is used in both styling systems,
 * ensuring consistency across platforms and frameworks.
 */

export const colors = {
  // Primary colors
  primary100: '#EBF5FF',
  primary200: '#D6E8FF',
  primary300: '#ADC8FF',
  primary400: '#84A9FF',
  primary500: '#6690FF',
  primary600: '#3366FF', // Primary base color
  primary700: '#254EDB',
  primary800: '#1939B7',
  primary900: '#102693',

  // Secondary colors
  secondary100: '#F5F7FA',
  secondary200: '#E4E7EB',
  secondary300: '#CBD2D9',
  secondary400: '#9AA5B1',
  secondary500: '#7B8794',
  secondary600: '#616E7C', // Secondary base color
  secondary700: '#52606D',
  secondary800: '#3E4C59',
  secondary900: '#323F4B',

  // Success colors
  success100: '#E3F9E5',
  success200: '#C1F2C7',
  success300: '#91E697',
  success400: '#51CA58',
  success500: '#31B237',
  success600: '#18981D', // Success base color
  success700: '#0F8613',
  success800: '#0B6E0B',
  success900: '#035D14',

  // Warning colors
  warning100: '#FFF8E6',
  warning200: '#FFEFC2',
  warning300: '#FFE799',
  warning400: '#FFD466',
  warning500: '#FFC933',
  warning600: '#FFBB00', // Warning base color
  warning700: '#DB9A00',
  warning800: '#B77B00',
  warning900: '#935E00',

  // Danger colors
  danger100: '#FFE6E6',
  danger200: '#FFCCCC',
  danger300: '#FFAAAA',
  danger400: '#FF8080',
  danger500: '#FF5555',
  danger600: '#FF0000', // Danger base color
  danger700: '#DB0000',
  danger800: '#B70000',
  danger900: '#930000',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',

  // Transparent
  transparent: 'transparent',
};

// Semantic color mapping
export const semanticColors = {
  // Base colors
  primary: colors.primary600,
  primaryLight: colors.primary400,
  primaryDark: colors.primary800,
  
  secondary: colors.secondary600,
  secondaryLight: colors.secondary400,
  secondaryDark: colors.secondary800,
  
  success: colors.success600,
  successLight: colors.success400,
  successDark: colors.success800,
  
  warning: colors.warning600,
  warningLight: colors.warning400,
  warningDark: colors.warning800,
  
  danger: colors.danger600,
  dangerLight: colors.danger400,
  dangerDark: colors.danger800,
  
  // UI colors
  background: colors.white,
  backgroundHover: colors.gray100,
  backgroundPress: colors.gray200,
  backgroundDark: colors.gray900,
  
  text: colors.gray900,
  textLight: colors.gray700,
  textMuted: colors.gray500,
  textDark: colors.white,
  
  border: colors.gray300,
  borderHover: colors.gray400,
  borderDark: colors.gray700,
};

export default {
  ...colors,
  ...semanticColors,
}; 