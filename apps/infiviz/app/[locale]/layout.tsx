/** @format */

import './globals.css';

import { dir } from 'i18next';

// type imports
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// project dependencies
import type { Locale } from '@/config/i18n/settings';
import { settings } from '@/config/i18n/settings';

// relative imports
import RootStyleRegistry from './emotion';

export async function generateStaticParams() {
  return settings.locales.map(locale => ({ locale }));
}

type RootLayoutProps = {
  children: ReactNode;
  params: { locale: Locale };
};

export const metadata: Metadata = {
  title: 'Infiviz',
  description: 'Retail Visual Intelligence',
};

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body id="app">
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
