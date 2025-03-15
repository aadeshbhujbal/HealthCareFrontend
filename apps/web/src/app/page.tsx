'use client';

import {
  DesignSystemProvider,
  Text,
  XStack,
  YStack,
  Card,
  Input,
  Button,
  AppCard,
  AppCardHeader,
} from '@healthcare/design-system';

export default function Home() {
  return (
    <DesignSystemProvider>
      <div
        className="container mx-auto p-4"
        style={{ backgroundColor: '#ffffff' }}
      >
        <YStack
          space="$md"
          padding="$md"
          maxWidth={800}
          marginHorizontal="auto"
        >
          <Text fontSize={24} fontWeight="bold" color="$danger600">
            Tamagui Components Demo
          </Text>

          {/* Basic Button Examples */}
          <YStack space="$sm">
            <Text fontSize={18} fontWeight="600" color="$primary600">
              Buttons
            </Text>
            <XStack space="$sm" flexWrap="wrap">
              <Button
                backgroundColor="#3366FF"
                color="white"
                hoverStyle={{
                  backgroundColor: '#254EDB',
                }}
                pressStyle={{
                  backgroundColor: '#1939B7',
                }}
              >
                <Text color="darkblue" hoverStyle={{ color: 'white' }}>
                  Primary
                </Text>
              </Button>
              <Button
                backgroundColor="transparent"
                color="#3366FF"
                borderWidth={1}
                borderColor="#3366FF"
                hoverStyle={{
                  backgroundColor: '#EBF5FF',
                }}
                pressStyle={{
                  backgroundColor: '#D6E8FF',
                }}
              >
                Secondary
              </Button>
              <Button
                backgroundColor="#FF0000"
                color="white"
                hoverStyle={{
                  backgroundColor: '#DB0000',
                }}
                pressStyle={{
                  backgroundColor: '#B70000',
                }}
              >
                Danger
              </Button>
            </XStack>
            <XStack space="$sm" flexWrap="wrap">
              <Button
                backgroundColor="#3366FF"
                color="white"
                paddingVertical="$xs"
                paddingHorizontal="$sm"
                fontSize="$sm"
                hoverStyle={{
                  backgroundColor: '#254EDB',
                }}
                pressStyle={{
                  backgroundColor: '#1939B7',
                }}
              >
                Small
              </Button>
              <Button
                backgroundColor="#3366FF"
                color="white"
                paddingVertical="$sm"
                paddingHorizontal="$md"
                fontSize="$md"
                hoverStyle={{
                  backgroundColor: '#254EDB',
                }}
                pressStyle={{
                  backgroundColor: '#1939B7',
                }}
              >
                Medium
              </Button>
              <Button
                backgroundColor="#3366FF"
                color="white"
                paddingVertical="$md"
                paddingHorizontal="$lg"
                fontSize="$lg"
                hoverStyle={{
                  backgroundColor: '#254EDB',
                }}
                pressStyle={{
                  backgroundColor: '#1939B7',
                }}
              >
                Large
              </Button>
            </XStack>
          </YStack>

          {/* Card Examples */}
          <YStack space="$sm">
            <Text fontSize={18} fontWeight="600" color="$primary600">
              Cards
            </Text>
            <Card backgroundColor="white" borderColor="$gray300">
              <Text padding="$md" color="$gray900">
                Default Card
              </Text>
            </Card>
            <Card backgroundColor="$gray100" borderColor="$gray300">
              <Text padding="$md">Hello</Text>
            </Card>
          </YStack>

          {/* Input Examples */}
          <YStack space="$sm">
            <Text fontSize={18} fontWeight="600" color="$primary600">
              Inputs
            </Text>
            <Input placeholder="Default Input" backgroundColor="white" />
            <Input
              placeholder="Error Input"
              borderColor="$danger"
              outlineColor="$danger"
              backgroundColor="white"
            />
            <Input
              placeholder="Success Input"
              borderColor="$success"
              outlineColor="$success"
              backgroundColor="white"
            />
          </YStack>

          {/* AppCard Example */}
          <YStack space="$sm">
            <Text fontSize={18} fontWeight="600" color="$primary600">
              App Card
            </Text>
            <AppCard backgroundColor="white" borderColor="$gray300">
              <AppCardHeader
                title="Card subtitle text here"
                rightElement={
                  <Button
                    backgroundColor="#3366FF"
                    color="white"
                    hoverStyle={{
                      backgroundColor: '#254EDB',
                    }}
                    pressStyle={{
                      backgroundColor: '#1939B7',
                    }}
                  >
                    Action
                  </Button>
                }
              />
              <Text padding="$sm" color="$gray900">
                This is the card content. You can put any components here.
              </Text>
              <XStack space="$sm" padding="$sm">
                <Button
                  backgroundColor="#3366FF"
                  color="white"
                  hoverStyle={{
                    backgroundColor: '#254EDB',
                  }}
                  pressStyle={{
                    backgroundColor: '#1939B7',
                  }}
                >
                  Button 1
                </Button>
                <Button
                  backgroundColor="#3366FF"
                  color="white"
                  hoverStyle={{
                    backgroundColor: '#254EDB',
                  }}
                  pressStyle={{
                    backgroundColor: '#1939B7',
                  }}
                >
                  Button 2
                </Button>
              </XStack>
            </AppCard>
            <AppCard
              backgroundColor="white"
              borderColor="$gray300"
              hoverStyle={{
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              pressStyle={{
                backgroundColor: '#eeeeee',
                transform: 'translateY(0px)',
              }}
              animation="bouncy"
            >
              <Text padding="$sm" color="$gray900">
                This card has hover and press effects.
              </Text>
            </AppCard>
          </YStack>
        </YStack>
      </div>
    </DesignSystemProvider>
  );
}
