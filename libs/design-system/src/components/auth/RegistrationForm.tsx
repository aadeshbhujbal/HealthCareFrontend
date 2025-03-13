import React, { useState, useCallback } from 'react';
import { YStack, Text, Input, Button, Card, XStack, Spinner } from 'tamagui';

export type RegistrationFormProps = {
  onSubmit: (data: {
    email: string;
    name: string;
    age: number;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  onLogin?: () => void;
  isLoading?: boolean;
  error?: string;
};

export const RegistrationForm = ({
  onSubmit,
  onLogin,
  isLoading = false,
  error,
}: RegistrationFormProps) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleSubmit = useCallback(async () => {
    try {
      setValidationError('');

      // Validate required fields
      if (
        !name.trim() ||
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password ||
        !confirmPassword ||
        !phone.trim() ||
        !age.trim()
      ) {
        setValidationError('Please fill in all fields');
        return;
      }

      // Validate email
      if (!validateEmail(email)) {
        setValidationError('Please enter a valid email address');
        return;
      }

      // Validate password
      const passwordError = validatePassword(password);
      if (passwordError) {
        setValidationError(passwordError);
        return;
      }

      // Validate password match
      if (password !== confirmPassword) {
        setValidationError('Passwords do not match');
        return;
      }

      // Validate age
      const ageNumber = parseInt(age, 10);
      if (isNaN(ageNumber) || ageNumber <= 0) {
        setValidationError('Please enter a valid age');
        return;
      }

      // Format data for submission
      const formData = {
        email: email.trim(),
        name: name.trim(),
        age: ageNumber,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        password,
        confirmPassword,
      };

      await onSubmit(formData);
    } catch (err: unknown) {
      console.error('Registration error:', err);
      setValidationError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    }
  }, [
    name,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
    age,
    onSubmit,
  ]);

  return (
    <Card
      backgroundColor="white"
      padding="$lg"
      borderRadius="$lg"
      elevation={4}
      width="100%"
      maxWidth={400}
      alignSelf="center"
    >
      <YStack space="$md">
        <YStack space="$sm" alignItems="center">
          <Text fontSize="$6" fontWeight="bold" color="$primary600">
            Create Account
          </Text>
          <Text fontSize="$4" color="$gray600">
            Sign up to get started
          </Text>
        </YStack>

        {(error || validationError) && (
          <Text color="$red500" fontSize="$4" textAlign="center">
            {error || validationError}
          </Text>
        )}

        <YStack space="$md">
          <Input
            placeholder="Full Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setValidationError('');
            }}
            autoCapitalize="words"
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />

          <XStack space="$2">
            <Input
              flex={1}
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                setValidationError('');
              }}
              autoCapitalize="words"
              size="$lg"
              readOnly={isLoading}
              borderColor="$gray300"
              focusStyle={{ borderColor: '$primary600' }}
            />
            <Input
              flex={1}
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                setValidationError('');
              }}
              autoCapitalize="words"
              size="$lg"
              readOnly={isLoading}
              borderColor="$gray300"
              focusStyle={{ borderColor: '$primary600' }}
            />
          </XStack>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setValidationError('');
            }}
            inputMode="email"
            autoCapitalize="none"
            autoComplete="email"
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />

          <XStack space="$2">
            <Input
              flex={1}
              placeholder="Phone"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                setValidationError('');
              }}
              inputMode="tel"
              size="$lg"
              readOnly={isLoading}
              borderColor="$gray300"
              focusStyle={{ borderColor: '$primary600' }}
            />
            <Input
              flex={1}
              placeholder="Age"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setValidationError('');
              }}
              inputMode="numeric"
              size="$lg"
              readOnly={isLoading}
              borderColor="$gray300"
              focusStyle={{ borderColor: '$primary600' }}
            />
          </XStack>

          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setValidationError('');
            }}
            secureTextEntry
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />

          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setValidationError('');
            }}
            secureTextEntry
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />
        </YStack>

        <YStack>
          <Button
            backgroundColor="$primary600"
            size="$lg"
            onPress={handleSubmit}
            disabled={isLoading}
            pressStyle={{ opacity: 0.9 }}
            marginTop="$2"
          >
            {isLoading ? (
              <Spinner
                color="white"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={1}
              />
            ) : (
              <Text color="white" fontFamily="$body">
                Sign Up
              </Text>
            )}
          </Button>

          {onLogin && (
            <XStack justifyContent="center" space="$2" marginTop="$2">
              <Text color="$gray600" fontFamily="$body">
                Already have an account?
              </Text>
              <Button
                chromeless
                onPress={onLogin}
                color="$primary600"
                disabled={isLoading}
              >
                <Text color="$primary600" fontFamily="$body">
                  Sign In
                </Text>
              </Button>
            </XStack>
          )}
        </YStack>
      </YStack>
    </Card>
  );
};
