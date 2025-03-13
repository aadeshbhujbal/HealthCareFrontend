import React from 'react';
import {
  View,
  Text,
  Button,
  Input,
  Form,
  YStack,
  XStack,
  Spinner,
} from 'tamagui';
import { GestureResponderEvent } from 'react-native';

interface RegisterScreenProps {
  onRegister: (data: {
    email: string;
    password: string;
    name: string;
    age: number;
    firstName: string;
    lastName: string;
    phone: string;
    confirmPassword: string;
  }) => Promise<void>;
  onLogin: () => void;
  isLoading?: boolean;
  error?: string;
  success?: string;
  platform: 'web' | 'mobile';
}

export function RegisterScreen({
  onRegister,
  onLogin,
  isLoading = false,
  error,
  success,
  platform,
}: RegisterScreenProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    age: '',
    firstName: '',
    lastName: '',
    phone: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e?: GestureResponderEvent | React.FormEvent) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    try {
      // Validate required fields
      const trimmedData = {
        email: formData.email.trim(),
        name: formData.name.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        age: formData.age.trim(),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      // Check for empty required fields
      if (!trimmedData.email) throw new Error('Email is required');
      if (!trimmedData.name) throw new Error('Name is required');
      if (!trimmedData.firstName) throw new Error('First name is required');
      if (!trimmedData.lastName) throw new Error('Last name is required');
      if (!trimmedData.phone) throw new Error('Phone is required');
      if (!trimmedData.age) throw new Error('Age is required');
      if (!trimmedData.password) throw new Error('Password is required');

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Validate password
      if (trimmedData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Validate password match
      if (trimmedData.password !== trimmedData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Convert age to number and validate
      const age = parseInt(trimmedData.age, 10);
      if (isNaN(age) || age < 0) {
        throw new Error('Please enter a valid age');
      }

      // Submit the form with trimmed data
      await onRegister({
        ...trimmedData,
        age,
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return (
    <YStack space="$4" padding="$4" maxWidth={400} margin="auto">
      <YStack space="$2" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          Create an Account
        </Text>
        <Text fontSize="$4" color="$gray10">
          Fill in your details to get started
        </Text>
      </YStack>

      {success && (
        <YStack
          backgroundColor="$green2"
          padding="$3"
          borderRadius="$sm"
          borderColor="$green7"
          borderWidth={1}
        >
          <Text color="$green11" textAlign="center">
            {success}
          </Text>
        </YStack>
      )}

      {error && (
        <YStack
          backgroundColor="$red2"
          padding="$3"
          borderRadius="$sm"
          borderColor="$red7"
          borderWidth={1}
        >
          <Text color="$red11" textAlign="center">
            {error}
          </Text>
        </YStack>
      )}

      <Form onSubmit={handleSubmit}>
        <YStack space="$4">
          <Input
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, email: text }))
            }
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Input
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, name: text }))
            }
          />

          <XStack space="$sm">
            <Input
              flex={1}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, firstName: text }))
              }
            />
            <Input
              flex={1}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, lastName: text }))
              }
            />
          </XStack>

          <XStack space="$sm">
            <Input
              flex={1}
              placeholder="Age"
              value={formData.age}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, age: text }))
              }
              keyboardType="numeric"
            />
            <Input
              flex={2}
              placeholder="Phone"
              value={formData.phone}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, phone: text }))
              }
              keyboardType="phone-pad"
            />
          </XStack>

          <Input
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
            secureTextEntry
          />

          <Input
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, confirmPassword: text }))
            }
            secureTextEntry
          />

          <Button
            themeInverse
            onPress={handleSubmit}
            disabled={isLoading}
            backgroundColor={isLoading ? '$gray8' : '$blue10'}
            pressStyle={{ opacity: 0.8 }}
          >
            <YStack alignItems="center" justifyContent="center">
              {isLoading ? (
                <Spinner size="small" color="$white" />
              ) : (
                <Text color="$white">Sign Up</Text>
              )}
            </YStack>
          </Button>

          <XStack justifyContent="center" alignItems="center" space="$sm">
            <Text color="$gray11">Already have an account?</Text>
            <Button chromeless onPress={onLogin} disabled={isLoading}>
              <Text color="$blue10" fontWeight="bold">
                Log in
              </Text>
            </Button>
          </XStack>
        </YStack>
      </Form>
    </YStack>
  );
}
