import { Stack } from 'expo-router';
import {
  TamaguiProvider,
  Theme,
  tamaguiConfig,
} from '@health-care-frontend/design-system';

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </Theme>
    </TamaguiProvider>
  );
}
