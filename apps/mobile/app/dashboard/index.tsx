import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { useAuth } from '~/providers/AuthProvider';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect based on user role
    if (user) {
      switch (user.role) {
        case 'DOCTOR':
          router.replace('doctor' as any);
          break;
        case 'PATIENT':
          router.replace('patient' as any);
          break;
        case 'SUPER_ADMIN':
          router.replace('super-admin' as any);
          break;
        default:
          break;
      }
    }
  }, [user]);

  return (
    <View className="flex-1 p-6 bg-background">
      <Card className="w-full">
        <CardHeader>
          <Text className="text-2xl font-bold">
            Welcome, {user?.firstName}!
          </Text>
          <Text className="text-sm text-muted-foreground">
            You are logged in as {user?.role.toLowerCase()}
          </Text>
        </CardHeader>

        <CardContent>
          <View className="space-y-4">
            <Text className="text-base">
              Redirecting you to your dashboard...
            </Text>

            <Button onPress={signOut} variant="destructive">
              <Text className="text-primary-foreground">Sign Out</Text>
            </Button>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
