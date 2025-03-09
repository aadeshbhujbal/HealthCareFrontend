'use client';

import { Button, Text, YStack } from 'tamagui';

export default function Home() {
  return (
    <YStack padding={20} space={10}>
      <Text fontSize={20} fontWeight="bold">
        Tamagui Test
      </Text>
      <Button>Test Button</Button>
    </YStack>
  );
}
