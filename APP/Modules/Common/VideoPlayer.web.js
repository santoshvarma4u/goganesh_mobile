import './VideoWeb.css'; // import css
import React from 'react';
import {Player} from 'video-react';

const FGVideoPlayer = props => {
  const {video} = props;
  return <Player playsInline src={video.uri} />;
};

export default FGVideoPlayer;
