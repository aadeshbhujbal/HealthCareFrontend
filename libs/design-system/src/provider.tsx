'use client';

import React, { PropsWithChildren } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../tamagui.config';

export interface DesignSystemProviderProps extends PropsWithChildren {}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      <Theme name="light" forceClassName>
        {children}
      </Theme>
    </TamaguiProvider>
  );
}
