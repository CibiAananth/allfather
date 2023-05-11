/** @format */
import ArrowAnimation from './arrow';
import CloudAnimation from './cloud';
import GraphsAnimation from './graphs';

export default function LottieAnimations() {
  return (
    <div className="animationWrapper">
      <CloudAnimation />
      <ArrowAnimation
        styles={{
          width: '100%',
          height: '100%',
        }}
      />
      <GraphsAnimation />
    </div>
  );
}
