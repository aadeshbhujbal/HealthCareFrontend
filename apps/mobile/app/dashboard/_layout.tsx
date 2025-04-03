import { Stack } from 'expo-router';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/providers/AuthProvider';

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Dashboard',
          headerRight: () => (
            <Text className="text-sm text-muted-foreground">
              {user?.firstName} {user?.lastName}
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="(doctor)"
        options={{
          title: 'Doctor Dashboard',
          headerRight: () => (
            <Text className="text-sm text-muted-foreground">
              {user?.firstName} {user?.lastName}
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="(patient)"
        options={{
          title: 'Patient Dashboard',
          headerRight: () => (
            <Text className="text-sm text-muted-foreground">
              {user?.firstName} {user?.lastName}
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="(super-admin)"
        options={{
          title: 'Super Admin Dashboard',
          headerRight: () => (
            <Text className="text-sm text-muted-foreground">
              {user?.firstName} {user?.lastName}
            </Text>
          ),
        }}
      />
    </Stack>
  );
}
