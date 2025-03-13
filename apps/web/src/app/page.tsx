'use client';

import React from 'react';
import {
  YStack,
  XStack,
  Card,
  Text,
  Button,
} from '@health-care-frontend/design-system';

export default function Home() {
  return (
    <YStack padding="$4" space="$4">
      <Text fontSize="$8" fontWeight="bold" color="$primary600">
        Welcome to HealthCare App
      </Text>

      <XStack space="$4" flexWrap="wrap">
        <Card
          backgroundColor="white"
          padding="$4"
          elevation={4}
          width={300}
          space="$3"
        >
          <Text fontSize="$6" fontWeight="bold" color="$primary600">
            Find Doctors
          </Text>
          <Text color="$gray600">
            Search and connect with the best doctors in your area
          </Text>
          <Button
            backgroundColor="$primary600"
            color="white"
            onPress={() => {}}
          >
            Search Now
          </Button>
        </Card>

        <Card
          backgroundColor="white"
          padding="$4"
          elevation={4}
          width={300}
          space="$3"
        >
          <Text fontSize="$6" fontWeight="bold" color="$primary600">
            Book Appointments
          </Text>
          <Text color="$gray600">
            Schedule appointments with your preferred healthcare providers
          </Text>
          <Button
            backgroundColor="$primary600"
            color="white"
            onPress={() => {}}
          >
            Book Now
          </Button>
        </Card>

        <Card
          backgroundColor="white"
          padding="$4"
          elevation={4}
          width={300}
          space="$3"
        >
          <Text fontSize="$6" fontWeight="bold" color="$primary600">
            Health Records
          </Text>
          <Text color="$gray600">
            Access and manage your medical records securely
          </Text>
          <Button
            backgroundColor="$primary600"
            // color="white"
            onPress={() => {}}
            hoverStyle={{ backgroundColor: 'gray' }}
          >
            View Records
          </Button>
        </Card>
      </XStack>
    </YStack>
  );
}
