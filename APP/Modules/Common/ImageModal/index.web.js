import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const FGImageModal = ({source, ...props}) => {
  return (
    <Zoom>
      <img src={source.uri} {...props} />
    </Zoom>
  );
};

export default FGImageModal;
