// Export design system core
export * from './provider';

// Export shared components
export * from './components/shared/Button';
export * from './components/shared/Card';
export * from './components/shared/Text';
export * from './components/shared/Input';

// Export the AppCard component
export * from './components/AppCard';

// Export layout components from Tamagui
export { Stack, XStack, YStack } from 'tamagui';

// Export color utilities and types
export {
  getColor,
  generateColorPalette,
  type ColorName,
  type ColorShade,
} from './theme/customColors';

// Export Tamagui provider and configuration
export { default as tamaguiConfig } from '../tamagui.config';
export { tokens } from '../tamagui.config';

// Re-export commonly used Tamagui utilities
export {
  useTheme,
  useMedia,
  createTheme,
  createTokens,
  styled,
  withStaticProperties,
  createStyledContext,
} from 'tamagui';

// Re-export basic Tamagui components that we haven't customized
export {
  View,
  Form,
  Image,
  Paragraph,
  H1, H2, H3, H4, H5, H6,
  Label,
  Switch,
  Checkbox,
  RadioGroup,
  Select,
  Spinner,
  Progress,
  Tooltip,
  Sheet,
  Dialog,
  AlertDialog,
  Popover,
  Avatar,
  Tabs,
  Spacer,
} from 'tamagui';
