/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import '../../global.css';
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

export const App = () => {
  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);

  return (
    <DesignSystemProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <YStack space={20} padding={16}>
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
                <Button
                  variant="secondary"
                  color="white"
                  backgroundColor="blue"
                >
                  Secondary
                </Button>
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
        </ScrollView>
      </SafeAreaView>
    </DesignSystemProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },

  connectToCloudButton: {
    backgroundColor: 'rgba(20, 48, 85, 1)',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '50%',
  },

  connectToCloudButtonText: {
    color: '#ffffff',
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});

export default App;
