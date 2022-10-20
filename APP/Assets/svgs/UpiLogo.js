import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const UpiLogo = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={48}
    fillRule="evenodd"
    {...props}>
    <Path d="M55.05 32.542 38.715 0l-18.15 64z" fill="#097939" />
    <Path d="M43.433 32.542 27.1 0 8.95 64z" fill="#ed752e" />
  </Svg>
);

export default UpiLogo;
