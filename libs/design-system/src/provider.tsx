'use client';

import React from 'react';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';

export interface DesignSystemProviderProps {
  children: React.ReactNode;
}

export function DesignSystemProvider({ children }: DesignSystemProviderProps) {
  return <TamaguiProvider config={config}>{children}</TamaguiProvider>;
}
