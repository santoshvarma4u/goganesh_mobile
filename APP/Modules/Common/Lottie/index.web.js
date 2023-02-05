import Lottie from 'lottie-react-web';
import React from 'react';

const LottieView = props => {
  const {source, ...rest} = props;
  return (
    <Lottie
      options={{
        animationData: source,
      }}
      {...rest}
    />
  );
};

export default LottieView;
