import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'tamagui';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('userRole');
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <Text fontSize={24} fontWeight="bold">
        Welcome to HealthCare
      </Text>
      <Text onPress={handleLogout} color="$blue10" marginTop={16}>
        Logout
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});
