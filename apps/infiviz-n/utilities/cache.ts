/** @format */

import { createEmotionCache, EmotionCache } from '@mantine/core';

let cache: EmotionCache | undefined;

export const emotionCache = (key = 'mantine') => {
  if (!cache) {
    cache = createEmotionCache({
      key,
      prepend: false,
    });
  }

  return cache;
};
