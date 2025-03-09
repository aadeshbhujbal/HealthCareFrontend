export * from './lib/design-system';
export * from './lib/provider';
// Export Tamagui components that you want to use across your apps
export { 
  Button as TamaguiButton, 
  Text, 
  View, 
  Stack, 
  XStack, 
  YStack 
} from 'tamagui';

// Export your custom components
export * from './lib/components/Button';
export * from './lib/components/Card';
export * from './lib/components/Input';
export * from './lib/components/AppCard';

// Export your tamagui config
export { default as tamaguiConfig } from './tamagui.config';
