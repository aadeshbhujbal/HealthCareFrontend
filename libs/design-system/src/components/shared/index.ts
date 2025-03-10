/**
 * Shared Components
 * 
 * This file exports components that are designed to work consistently
 * across both web and mobile platforms.
 * 
 * These components use Tamagui's theme tokens and styling system to ensure
 * a consistent look and feel regardless of platform.
 */

import {
  Button,
  Text,
  XStack,
  YStack,
  Stack,
  Card,
  Input,
  Form,
  Separator,
  ScrollView,
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
} from 'tamagui';

// Re-export Tamagui components
export {
  Button,
  Text,
  XStack,
  YStack,
  Stack,
  Card,
  Input,
  Form,
  Separator,
  ScrollView,
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
};

// Export custom component variants
export * from './Button';
export * from './Card';
export * from './Text';
export * from './Input'; 