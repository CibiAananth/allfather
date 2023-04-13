/** @format */

import './globals.css';

// react imports
import { ReactNode } from 'react';

// next imports
import type { Metadata } from 'next';

// local imports
import RootStyleRegistry from './emotion';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Infiviz',
  description: 'Retail Visual Intelligence',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body id="app">
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
