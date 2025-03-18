import { theme } from '../theme';

export type Theme = typeof theme;
export type Colors = typeof theme.colors;
export type BorderRadius = typeof theme.borderRadius;
export type Spacing = typeof theme.spacing;
export type Typography = typeof theme.typography;
export type Breakpoints = typeof theme.breakpoints;

export type ColorToken = keyof Colors;
export type SpacingToken = keyof Spacing;
export type BorderRadiusToken = keyof BorderRadius;
export type TypographyToken = keyof Typography;
export type BreakpointToken = keyof Breakpoints;

// Common component props that can be shared between web and mobile
export interface BaseComponentProps {
  className?: string;
  style?: Record<string, any>;
  testID?: string;
}

// Platform-specific component props
export interface WebComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export interface MobileComponentProps extends BaseComponentProps {
  onPress?: () => void;
  onLongPress?: () => void;
} 