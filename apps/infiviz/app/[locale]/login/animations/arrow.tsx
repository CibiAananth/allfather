/** @format */
'use client';

// external dependencies
import type { LottieOptions } from 'lottie-react';
import { useLottie } from 'lottie-react';
import type { CSSProperties, FC, ReactElement } from 'react';

// project dependencies
import arrowAnimation from './arrow_animation.json';

// type definitions
type Props = {
  styles?: CSSProperties;
};

const ArrowAnimation: FC<Props> = ({ styles }) => {
  const options: LottieOptions<'svg'> = {
    animationData: arrowAnimation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View }: { View: ReactElement } = useLottie<'svg'>(options, styles);

  return View;
};

export default ArrowAnimation;
