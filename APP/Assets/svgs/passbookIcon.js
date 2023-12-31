import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const PassbookIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="20"
    viewBox="0 0 40 20"
    {...props}>
    <G id="Group_1" data-name="Group 1" transform="translate(-0 -182.8)">
      <Path
        id="Path_1"
        fill={props.color || '#fff'}
        data-name="Path 1"
        d="m1.3,182.8v16.8c0,2,1.6,3.6,3.6,3.6h22.8c2,0,3.6-1.6,3.6-3.6v-16.8H1.3Zm3.7,4.5h9.2c.4,0,.8.3.8.8,0,.4-.3.8-.8.8H5c-.4,0-.8-.3-.8-.8.1-.5.4-.8.8-.8Zm12.7,10.4H5c-.4,0-.8-.3-.8-.8,0-.4.3-.8.8-.8h12.7c.4,0,.8.3.8.8s-.3.8-.8.8Zm0-4.4H5c-.4,0-.8-.3-.8-.8s.3-.8.8-.8h12.7c.4,0,.8.3.8.8s-.3.8-.8.8Zm10.2-6.9c0,.2-.2.4-.4.4h-.7l.1.4c.1.4.2.7.2,1.1v.3h.3c.2,0,.4.2.4.4s-.2.4-.4.4h-.3v.3c-.2,1.8-1.1,2.6-2.8,2.6h-.6l3.1,4.6c.1.1.1.3,0,.4-.1.1-.2.2-.4.2h-.6c-.1,0-.3-.1-.3-.2l-2.7-4.1c-.3-.5-.5-1.1-.5-1.7,0-.2.2-.4.4-.4h1.3c.5,0,.9-.1,1.2-.4.2-.2.4-.6.5-1.1v-.3h-3c-.2,0-.4-.2-.4-.4s.2-.4.4-.4h3v-.3c-.1-.5-.2-.9-.4-1.1-.3-.2-.7-.4-1.2-.4h-1.3c-.2,0-.4-.2-.4-.4v-.3c0-.2.2-.4.4-.4h4.8c.2,0,.4.2.4.4-.1.1-.1.4-.1.4Z"
      />
    </G>
  </Svg>
);

export default PassbookIcon;
