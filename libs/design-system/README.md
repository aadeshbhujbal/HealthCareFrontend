# Healthcare Design System

A cross-platform design system built with Tamagui for web and mobile applications. This design system ensures consistent styling and component behavior across all platforms.

## Features

- 🎨 Consistent theming with light mode support
- 📱 Cross-platform components (Web & Mobile)
- 🔧 Fully customizable components
- 🎯 Accessibility-first approach
- 🚀 Performance optimized

## Component Library

### Basic Components

1. **Button**
   - Variants: Primary, Secondary, Danger
   - Sizes: Small, Medium, Large
   - Interactive states: Hover, Press
   - Customizable colors and styles

2. **Input**
   - States: Default, Error, Success
   - Customizable borders and outlines
   - Platform-specific keyboard handling

3. **Card**
   - Basic Card
   - App Card with header and actions
   - Hover and press effects

4. **Typography**
   - Text component with various styles
   - Consistent font sizing
   - Color variants

### Theme System

- Color tokens for consistent branding
- Spacing system for consistent layouts
- Typography scale
- Interactive state definitions

## Usage

### Installation

```bash
npm install @healthcare/design-system
```

### Basic Setup

```tsx
import { DesignSystemProvider } from '@healthcare/design-system';

function App({ children }) {
  return (
    <DesignSystemProvider>
      {children}
    </DesignSystemProvider>
  );
}
```

### Component Usage

```tsx
import { Button, Card, Input } from '@healthcare/design-system';

function MyComponent() {
  return (
    <Card>
      <Input placeholder="Enter text" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Directory Structure

```
libs/design-system/
├── src/
│   ├── components/     # Reusable UI components
│   ├── theme/         # Theme configurations
│   ├── tokens/        # Design tokens (colors, spacing, etc.)
│   ├── utils/         # Utility functions
│   ├── provider.tsx   # Design system provider
│   └── index.ts       # Public exports
```

## Best Practices

1. **Component Usage**
   - Always wrap your app with `DesignSystemProvider`
   - Use provided components instead of native elements
   - Maintain consistent spacing using the provided tokens

2. **Theming**
   - Use theme tokens instead of hard-coded values
   - Follow the color system for consistency
   - Use responsive units for layouts

3. **Accessibility**
   - Ensure proper contrast ratios
   - Include proper ARIA labels
   - Support keyboard navigation

## Contributing

1. Follow the component structure in `components/`
2. Ensure cross-platform compatibility
3. Add proper documentation
4. Include usage examples
5. Test on both web and mobile platforms

## License

MIT License
