'use client';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import { ReactNode, useEffect } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { NextThemeProvider } from '@tamagui/next-theme';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';

// Suppress all console warnings in development
const suppressAllWarnings = () => {
  if (process.env.NODE_ENV === 'development') {
    // Store the original console methods
    const originalConsoleWarn = console.warn;
    const originalConsoleError = console.error;

    // Override console.warn to filter out specific warnings
    console.warn = function filterWarnings(msg, ...args) {
      // Filter out all Tamagui-related warnings
      if (
        typeof msg === 'string' &&
        (msg.includes('No font size found') ||
          msg.includes('transform style array value is deprecated') ||
          msg.includes('keyboardType is deprecated') ||
          msg.includes('editable is deprecated') ||
          msg.includes('TextInput numberOfLines is deprecated'))
      ) {
        return;
      }
      originalConsoleWarn(msg, ...args);
    };

    // Override console.error to filter out specific errors
    console.error = function filterErrors(msg, ...args) {
      // Filter out specific errors if needed
      if (
        typeof msg === 'string' &&
        (msg.includes('Warning: ') || msg.includes('Tamagui'))
      ) {
        return;
      }
      originalConsoleError(msg, ...args);
    };

    // Return a cleanup function to restore the original console methods
    return () => {
      console.warn = originalConsoleWarn;
      console.error = originalConsoleError;
    };
  }
  return () => {};
};

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // Suppress warnings in client-side rendering
    return suppressAllWarnings();
  }, []);

  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: config.getNewCSS(),
        }}
      />
    );
  });

  return (
    <NextThemeProvider skipNextHead>
      <TamaguiProvider
        config={config}
        disableRootThemeClass
        defaultTheme="light"
      >
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
};
