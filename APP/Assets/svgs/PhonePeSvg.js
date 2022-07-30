import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const PhonePeSvg = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} {...props}>
    <Path
      fill="#4527a0"
      d="M42 37a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V11a5 5 0 0 1 5-5h26a5 5 0 0 1 5 5v26z"
    />
    <Path
      fill="#fff"
      d="M32.267 20.171c0-.681-.584-1.264-1.264-1.264h-2.334l-5.35-6.25c-.486-.584-1.264-.778-2.043-.584l-1.848.584c-.292.097-.389.486-.195.681l5.836 5.666h-8.851c-.292 0-.486.195-.486.486v.973c0 .681.584 1.506 1.264 1.506h1.972v4.305c0 3.502 1.611 5.544 4.723 5.544.973 0 1.378-.097 2.35-.486v3.112c0 .875.681 1.556 1.556 1.556h.786c.292 0 .584-.292.584-.584V21.969h2.812c.292 0 .486-.195.486-.486v-1.312zm-6.224 8.242c-.584.292-1.362.389-1.945.389-1.556 0-2.097-.778-2.097-2.529v-4.305h4.043v6.445z"
    />
  </Svg>
);

export default PhonePeSvg;