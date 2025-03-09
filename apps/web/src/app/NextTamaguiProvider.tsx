'use client';

import '@tamagui/core/reset.css';
import '@tamagui/polyfill-dev';

import { ReactNode } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { NextThemeProvider } from '@tamagui/next-theme';
import { TamaguiProvider } from 'tamagui';
import config from '../../tamagui.config';

export const NextTamaguiProvider = ({ children }: { children: ReactNode }) => {
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
      <TamaguiProvider config={config} disableRootThemeClass>
        {children}
      </TamaguiProvider>
    </NextThemeProvider>
  );
};
