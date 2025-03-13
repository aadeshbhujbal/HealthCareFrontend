import { Stack } from 'expo-router';
import { AuthLayout as AuthLayoutComponent } from '@health-care-frontend/design-system';

export default function AuthLayoutScreen() {
  return (
    <AuthLayoutComponent title="Authentication" platform="mobile">
      <Stack screenOptions={{ headerShown: false }} />
    </AuthLayoutComponent>
  );
}
