/** @format */

import { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';
import type { Metadata } from 'next';

import { emotionCache } from '@/utilities/cache';

import './page';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Infiviz',
  description: 'Retail Visual Intelligence',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionCache={emotionCache()}
    >
      <html lang="en">
        <body>{children}</body>
      </html>
    </MantineProvider>
  );
}
