/** @format */

'use client';

import { ReactNode } from 'react';

import { useServerInsertedHTML } from 'next/navigation';

import { CacheProvider } from '@emotion/react';
import { MantineProvider } from '@mantine/core';

import { emotionCache } from '@/utilities/cache';

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootStyleRegistry({ children }: RootLayoutProps) {
  const cache = emotionCache('mantine-inz');

  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider emotionCache={cache} withCSSVariables withGlobalStyles>
        {children}
      </MantineProvider>
    </CacheProvider>
  );
}
