'use client';

import {
  DesignSystemProvider,
  Text,
  XStack,
  YStack,
  Button,
  Card,
  Input,
  AppCard,
  AppCardHeader,
} from '@healthcare/design-system';

export default function Home() {
  return (
    <DesignSystemProvider>
      <div className="container mx-auto p-4">
        <YStack space={20} padding={16} maxWidth={800} marginHorizontal="auto">
          <Text fontSize={24} fontWeight="bold">
            Tamagui Components Demo
          </Text>

          {/* Basic Button Examples */}
          <YStack space={10}>
            <Text fontSize={18} fontWeight="600">
              Buttons
            </Text>
            <XStack space={10} flexWrap="wrap">
              <Button>Default Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
            </XStack>
            <XStack space={10} flexWrap="wrap">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </XStack>
          </YStack>

          {/* Card Examples */}
          <YStack space={10}>
            <Text fontSize={18} fontWeight="600">
              Cards
            </Text>
            <Card>
              <Text>Default Card</Text>
            </Card>
            <Card type="outlined">
              <Text>Outlined Card</Text>
            </Card>
            <Card type="flat">
              <Text>Flat Card</Text>
            </Card>
          </YStack>

          {/* Input Examples */}
          <YStack space={10}>
            <Text fontSize={18} fontWeight="600">
              Inputs
            </Text>
            <Input placeholder="Default Input" />
            <Input state="error" placeholder="Error Input" />
            <Input state="success" placeholder="Success Input" />
          </YStack>

          {/* Complex Component Example */}
          <YStack space={10}>
            <Text fontSize={18} fontWeight="600">
              App Card Component
            </Text>
            <AppCard>
              <AppCardHeader
                title="Card Title"
                subtitle="Card subtitle text here"
                rightElement={<Button size="small">Action</Button>}
              />
              <Text>
                This is the card content. You can put any components here.
              </Text>
              <XStack space={8} marginTop={10}>
                <Button size="small">Button 1</Button>
                <Button size="small" variant="secondary">
                  Button 2
                </Button>
              </XStack>
            </AppCard>

            <AppCard interactive>
              <AppCardHeader
                title="Interactive Card"
                subtitle="This card has hover and press effects"
              />
              <Text>Try pressing this card to see the effect.</Text>
            </AppCard>
          </YStack>
        </YStack>
      </div>
    </DesignSystemProvider>
  );
}
