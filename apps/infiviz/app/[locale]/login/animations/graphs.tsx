/** @format */
'use client';

// external dependencies
import { useLottie } from 'lottie-react';

// project dependencies
import graphsAnimation from './graphs_animation.json';

export default function GraphsAnimation() {
  const options = {
    animationData: graphsAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}
