/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
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
  return (
    <DesignSystemProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <YStack padding="$md" space="$lg">
            {/* Header Section */}
            <YStack space="$sm">
              <Text fontSize="$2xl" fontWeight="bold" color="$primary600">
                Welcome Back
              </Text>
              <Text fontSize="$lg" color="$gray600">
                Find and book your next appointment
              </Text>
            </YStack>

            {/* Search Section */}
            <Card
              backgroundColor="white"
              padding="$md"
              borderRadius="$lg"
              elevation={4}
            >
              <YStack space="$md">
                <Input
                  placeholder="Search doctors, specialties..."
                  size="$lg"
                  backgroundColor="$gray100"
                />
                <Button
                  size="$lg"
                  backgroundColor="$primary600"
                  color="white"
                  pressStyle={{ opacity: 0.9 }}
                >
                  Search
                </Button>
              </YStack>
            </Card>

            {/* Quick Actions */}
            <YStack space="$md">
              <Text fontSize="$xl" fontWeight="600" color="$gray800">
                Quick Actions
              </Text>
              <XStack flexWrap="wrap" space="$sm">
                <AppCard
                  backgroundColor="white"
                  padding="$md"
                  width={160}
                  pressStyle={{ scale: 0.98 }}
                  animation="quick"
                >
                  <YStack space="$sm" alignItems="center">
                    <Text fontSize="$xl" color="$primary600">
                      👨‍⚕️
                    </Text>
                    <Text fontSize="$md" textAlign="center">
                      Find Doctor
                    </Text>
                  </YStack>
                </AppCard>

                <AppCard
                  backgroundColor="white"
                  padding="$md"
                  width={160}
                  pressStyle={{ scale: 0.98 }}
                  animation="quick"
                >
                  <YStack space="$sm" alignItems="center">
                    <Text fontSize="$xl" color="$primary600">
                      📅
                    </Text>
                    <Text fontSize="$md" textAlign="center">
                      Appointments
                    </Text>
                  </YStack>
                </AppCard>

                <AppCard
                  backgroundColor="white"
                  padding="$md"
                  width={160}
                  pressStyle={{ scale: 0.98 }}
                  animation="quick"
                >
                  <YStack space="$sm" alignItems="center">
                    <Text fontSize="$xl" color="$primary600">
                      💊
                    </Text>
                    <Text fontSize="$md" textAlign="center">
                      Medications
                    </Text>
                  </YStack>
                </AppCard>

                <AppCard
                  backgroundColor="white"
                  padding="$md"
                  width={160}
                  pressStyle={{ scale: 0.98 }}
                  animation="quick"
                >
                  <YStack space="$sm" alignItems="center">
                    <Text fontSize="$xl" color="$primary600">
                      📋
                    </Text>
                    <Text fontSize="$md" textAlign="center">
                      Health Records
                    </Text>
                  </YStack>
                </AppCard>
              </XStack>
            </YStack>

            {/* Upcoming Appointments */}
            <YStack space="$md">
              <Text fontSize="$xl" fontWeight="600" color="$gray800">
                Upcoming Appointments
              </Text>
              <AppCard
                backgroundColor="white"
                padding="$md"
                pressStyle={{ scale: 0.98 }}
                animation="quick"
              >
                <AppCardHeader
                  title="Dr. Sarah Wilson"
                  subtitle="Cardiologist • Tomorrow at 10:00 AM"
                  rightElement={
                    <Button size="$sm" variant="outlined">
                      Reschedule
                    </Button>
                  }
                />
                <Text color="$gray600" paddingTop="$sm">
                  Memorial Hospital, Room 302
                </Text>
              </AppCard>
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </DesignSystemProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
});

export default App;
