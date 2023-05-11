/** @format */
'use client';

// external dependencies
import { useLottie } from 'lottie-react';

// project dependencies
import cloudAnimation from './cloud_animation.json';

export default function CloudAnimation() {
  const options = {
    animationData: cloudAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View } = useLottie(options);

  return <>{View}</>;
}
