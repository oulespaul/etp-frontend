import React, { Suspense } from 'react';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';
import Routes from 'main/routes';
import * as loadingData from './loading.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const CustomLoadingComponent = () => (
  <FadeIn>
    <Lottie options={defaultOptions} height={200} width={200} />
  </FadeIn>
);

function App() {
  return (
    <Suspense fallback={CustomLoadingComponent}>
      <Routes />
    </Suspense>
  );
}

export default App;
