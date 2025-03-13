# HealthCare Mobile App

This is the mobile application for the HealthCare platform built with React Native and Expo.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (available on [App Store](https://apps.apple.com/app/apple-store/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent))

## Getting Started

1. Install dependencies:
```bash
cd HealthCareFrontend
npm install

# Install additional required dependencies
npm install @react-native-masked-view/masked-view
```

2. Start the mobile app:
```bash
# Navigate to the mobile app directory
cd apps/mobile

# Start the Expo development server
npx expo start
```

## Available Commands

- `npx expo start` - Starts the development server
- `npx expo start --android` - Starts the development server and opens Android emulator
- `npx expo start --ios` - Starts the development server and opens iOS simulator
- `npx expo start --web` - Starts the development server in web mode

## Development Options

When you run `npx expo start`, you'll see a QR code and several options:

- Scan the QR code with your mobile device's camera to open the app in Expo Go
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator
- Press `w` to open in web browser
- Press `r` to reload the app
- Press `m` to toggle the menu
- Press `?` to show all commands

## Common Issues and Solutions

1. **Missing @react-native-masked-view/masked-view**
   ```bash
   npm install @react-native-masked-view/masked-view
   ```

2. **Tamagui transform style warnings**
   If you see warnings about deprecated transform arrays, update your component styles to use space-separated strings:
   ```typescript
   // Instead of:
   transform: [{ scale: 2 }, { rotateX: '15deg' }]
   
   // Use:
   transform: 'scale(2) rotateX(15deg)'
   ```

3. **Tamagui skipped loading modules**
   This warning is informational and doesn't affect functionality. If you want to address it:
   - Check the Tamagui documentation: https://tamagui.dev/docs/intro/errors#warning-001
   - Make sure all Tamagui dependencies are at the same version
   - Run `npm install @tamagui/core @tamagui/config` to ensure latest versions

## Troubleshooting

If you encounter any issues:

1. Clear the Metro bundler cache:
```bash
npx expo start --clear
```

2. Reset Expo cache:
```bash
npx expo start -c
```

3. Make sure all dependencies are installed:
```bash
npm install
```

4. If you see module resolution errors:
```bash
# Clean the project
npm run clean

# Reinstall dependencies
npm install

# Start fresh
npx expo start -c
```

## Project Structure

```
apps/mobile/
├── src/              # Source code
│   ├── app/         # App screens and navigation
│   ├── components/  # Reusable components
│   └── assets/     # Images, fonts, etc.
├── android/         # Android specific files
├── ios/            # iOS specific files
└── assets/         # Static assets
``` 