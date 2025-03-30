import * as React from 'react';
import { View } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from 'react-native-reanimated';
import { Info } from '~/lib/icons/Info';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Progress } from '~/components/ui/progress';
import { Text } from '~/components/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { useRouter } from 'expo-router';

const GITHUB_AVATAR_URI =
  'https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg';

export default function Screen() {
  const router = useRouter();
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }
  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">
            Welcome to HealthCare
          </Text>
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Your trusted healthcare companion
          </Text>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full"
            onPress={() => router.push('/auth/register')}
          >
            <Text className="text-primary-foreground">Get Started</Text>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onPress={() => router.push('/auth/login')}
          >
            <Text>Sign In</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
}
