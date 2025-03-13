import React from 'react';
import { YStack, Text } from 'tamagui';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  platform: 'web' | 'mobile';
}

export const AuthLayout = ({
  children,
  title,
  subtitle,
  platform,
}: AuthLayoutProps) => {
  if (platform === 'mobile') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <YStack space="$md" alignItems="center" marginBottom="$4">
            <Text fontSize="$2xl" fontWeight="bold" color="$primary600">
              {title}
            </Text>
            {subtitle && (
              <Text fontSize="$md" color="$gray600">
                {subtitle}
              </Text>
            )}
          </YStack>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
        {children}
      </div>
    </main>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
  },
});
