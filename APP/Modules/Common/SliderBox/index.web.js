import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import {Carousel} from 'react-responsive-carousel';

const FGSliderBox = props => {
  const {images, ...rest} = props;
  return (
    <Carousel axis="horizontal" autoPlay infiniteLoop {...rest}>
      {images.map((i, index) => (
        <div key={index}>
          <img
            src={i}
            style={{width: '100%', height: '80%', objectFit: 'fill'}}
            alt={'img'}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default FGSliderBox;
