import React from 'react';
import {
  View,
  Image,
  Dimensions,
  ScrollView,
  useColorScheme,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
  SlideInLeft,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgUri } from 'react-native-svg';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

type Feature = {
  title: string;
  description: string;
  icon: string;
  colors: readonly [string, string];
  iconBg: string;
};

const features: Feature[] = [
  {
    title: 'Smart Scheduling',
    description: 'AI-powered appointment booking',
    icon: '🤖',
    colors: ['#6366F1', '#4F46E5'] as const,
    iconBg: '#EEF2FF',
  },
  {
    title: 'Health Records',
    description: 'Secure medical history access',
    icon: '🏥',
    colors: ['#10B981', '#059669'] as const,
    iconBg: '#ECFDF5',
  },
  {
    title: 'Video Consults',
    description: '24/7 doctor consultations',
    icon: '📱',
    colors: ['#F43F5E', '#E11D48'] as const,
    iconBg: '#FFF1F2',
  },
  {
    title: 'Lab Results',
    description: 'Real-time test updates',
    icon: '🔬',
    colors: ['#8B5CF6', '#7C3AED'] as const,
    iconBg: '#F3F0FF',
  },
  {
    title: 'Prescriptions',
    description: 'Digital medicine tracking',
    icon: '💊',
    colors: ['#F59E0B', '#D97706'] as const,
    iconBg: '#FFFBEB',
  },
  {
    title: 'Health Tips',
    description: 'AI health recommendations',
    icon: '💡',
    colors: ['#EC4899', '#DB2777'] as const,
    iconBg: '#FDF2F8',
  },
];

const stats = [
  { value: '10M+', label: 'Users', icon: '👥' },
  { value: '50k+', label: 'Doctors', icon: '👨‍⚕️' },
  { value: '24/7', label: 'Support', icon: '🌟' },
  { value: '4.9★', label: 'Rating', icon: '⭐' },
] as const;

const testimonials = [
  {
    quote:
      "Revolutionary healthcare experience! The app's AI scheduling made finding the right doctor effortless.",
    author: 'Sarah Johnson',
    role: 'Patient',
    image: require('~/assets/images/icon.png'),
  },
  {
    quote:
      'This platform transformed my practice. Patient care has never been more streamlined and efficient.',
    author: 'Dr. Michael Chen',
    role: 'Cardiologist',
    image: require('~/assets/images/icon.png'),
  },
  {
    quote:
      'The telemedicine features are fantastic. I can consult with doctors from the comfort of my home.',
    author: 'Emily Rodriguez',
    role: 'Patient',
    image: require('~/assets/images/icon.png'),
  },
] as const;

const specialties = [
  'Cardiology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
  'Dermatology',
  'Dentistry',
  'Psychology',
  'Oncology',
] as const;

export default function LandingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderFeatureCard = (feature: Feature, index: number) => {
    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [0, 200],
        [0, -index * 10],
        'clamp'
      );
      return {
        transform: [{ translateY }],
      };
    });

    return (
      <Animated.View
        key={feature.title}
        entering={FadeInUp.delay(600 + index * 100).springify()}
        style={[{ width: CARD_WIDTH }, animatedStyle]}
        className="mb-4"
      >
        <LinearGradient
          colors={feature.colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="p-6 rounded-[28px]"
          style={{
            elevation: 8,
            shadowColor: feature.colors[0],
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
          }}
        >
          <View
            className="w-16 h-16 rounded-2xl items-center justify-center mb-4"
            style={{ backgroundColor: feature.iconBg }}
          >
            <Text className="text-4xl">{feature.icon}</Text>
          </View>
          <Text className="font-bold text-white text-xl mb-2">
            {feature.title}
          </Text>
          <Text className="text-white/90 text-base">{feature.description}</Text>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <Animated.ScrollView
      className="flex-1 bg-background"
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <LinearGradient
        colors={
          isDark
            ? ['#0F172A', '#1E293B', '#334155']
            : ['#4F46E5', '#6366F1', '#818CF8']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 pt-20 pb-16"
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="items-center"
        >
          <View
            className="bg-white/10 backdrop-blur-lg p-8 rounded-[36px] mb-8 border border-white/20"
            style={{
              shadowColor: isDark ? '#000' : '#4F46E5',
              shadowOffset: { width: 0, height: 20 },
              shadowOpacity: 0.25,
              shadowRadius: 24,
              elevation: 12,
            }}
          >
            <View className="w-32 h-32 bg-white/20 rounded-[28px] items-center justify-center">
              <Text className="text-6xl">👨‍⚕️</Text>
            </View>
          </View>

          <Text className="text-5xl font-bold text-center text-white mb-4">
            HealthCare Pro
          </Text>
          <Text className="text-xl text-center text-white/90 font-medium mb-3">
            Your Health Journey Starts Here
          </Text>
          <Text className="text-base text-center text-white/80 leading-6 max-w-[300px]">
            Experience the future of healthcare with AI-powered features and
            seamless consultations
          </Text>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          className="mt-12 p-6 bg-white/10 backdrop-blur-lg rounded-[32px] border border-white/20"
          style={{
            shadowColor: isDark ? '#000' : '#4F46E5',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <View className="flex-row flex-wrap justify-between">
            {stats.map((stat, index) => (
              <Animated.View
                key={stat.label}
                entering={SlideInRight.delay(600 + index * 100)}
                className="w-[45%] mb-6 items-center"
              >
                <View className="bg-white/20 w-14 h-14 rounded-2xl items-center justify-center mb-3">
                  <Text className="text-3xl">{stat.icon}</Text>
                </View>
                <Text className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </Text>
                <Text className="text-sm text-white/80 font-medium">
                  {stat.label}
                </Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Features Grid */}
      <View className="px-6 py-12">
        <Animated.View
          entering={FadeInDown.delay(800).springify()}
          className="mb-8"
        >
          <Text className="text-3xl font-bold text-foreground mb-2">
            Smart Features
          </Text>
          <Text className="text-lg text-muted-foreground">
            Experience the future of healthcare
          </Text>
        </Animated.View>

        <View className="flex-row flex-wrap justify-between">
          {features.map((feature, index) => renderFeatureCard(feature, index))}
        </View>
      </View>

      {/* Specialties Section */}
      <View className={`px-6 py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className="text-2xl font-bold mb-8 text-foreground">
          Medical Specialties
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {specialties.map((specialty, index) => (
            <Animated.View
              key={specialty}
              entering={SlideInLeft.delay(1000 + index * 50)}
              className={`bg-card w-[48%] mb-4 p-5 rounded-[20px] border ${
                isDark ? 'border-gray-800' : 'border-gray-100'
              }`}
              style={{
                shadowColor: isDark ? '#000' : '#4F46E5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className="font-medium text-foreground">{specialty}</Text>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Enhanced Testimonials */}
      <View className={`px-6 py-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Text className="text-2xl font-bold mb-8 text-foreground">
          Success Stories
        </Text>
        {testimonials.map((testimonial, index) => (
          <Animated.View
            key={testimonial.author}
            entering={FadeInUp.delay(1400 + index * 100)}
            className={`bg-card p-6 rounded-[20px] mb-6 border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } shadow-lg`}
          >
            <View className="flex-row items-center mb-4">
              <Image
                source={testimonial.image}
                style={{ width: 56, height: 56 }}
                className="rounded-full mr-4"
              />
              <View>
                <Text className="font-semibold text-foreground text-base">
                  {testimonial.author}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {testimonial.role}
                </Text>
              </View>
            </View>
            <Text className="text-base italic text-foreground leading-6">
              "{testimonial.quote}"
            </Text>
          </Animated.View>
        ))}
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={isDark ? ['#0F172A', '#1E293B'] : ['#4F46E5', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-6 py-12"
      >
        <Text className="text-3xl font-bold text-white mb-4 text-center">
          Ready to Transform{'\n'}Your Healthcare?
        </Text>
        <Text className="text-base text-white/80 text-center mb-8 leading-6">
          Join millions of users who have revolutionized their healthcare
          experience
        </Text>

        <Animated.View
          entering={FadeInUp.delay(1200).springify()}
          className="space-y-4"
        >
          <Link href="/auth/register" asChild>
            <Button
              className="w-full h-14 bg-white shadow-xl rounded-[20px]"
              size="lg"
            >
              <Text className="text-primary text-lg font-bold">
                Get Started Now
              </Text>
            </Button>
          </Link>

          <Link href="/auth/login" asChild>
            <Button
              variant="outline"
              className="w-full h-14 border-2 border-white rounded-[20px]"
              size="lg"
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </Button>
          </Link>

          <Text className="text-sm text-center text-white/80 mt-4">
            By continuing, you agree to our Terms of Service
          </Text>
        </Animated.View>
      </LinearGradient>
    </Animated.ScrollView>
  );
}
