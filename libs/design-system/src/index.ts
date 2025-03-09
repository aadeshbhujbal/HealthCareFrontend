export * from './design-system';
export * from './provider';
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
export * from './components/Button';
export * from './components/Card';
export * from './components/Input';
export * from './components/AppCard';

// Export your tamagui config
export { default as tamaguiConfig } from '../tamagui.config';
