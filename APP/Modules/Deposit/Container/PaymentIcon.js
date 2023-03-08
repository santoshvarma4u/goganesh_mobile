import React from 'react';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import UpiLogo from '../../../Assets/svgs/UpiLogo';
import images from '../../../Theams/Images';
import FGImage from '../../Common/FGImage';
export const keyMap = {
  'Google Pay': 'Google Pay',
  'Phone Pay': 'Phone Pay',
  UPI: 'UPI',
  Bank: 'Bank',
};

const imageStyle = {
  width: 32,
  height: 32,
  marginTop: 5,
};

const PaymentIcon = ({paymenttype}) => {
  let svg = <FGImage source={images.banktransfer1} style={imageStyle} />;
  if (paymenttype === keyMap['Google Pay']) {
    svg = <GooglePaySvg width={36} height={36} />;
  } else if (paymenttype === keyMap['Phone Pay']) {
    svg = <PhonePeSvg width={36} height={36} />;
  } else if (paymenttype === keyMap.UPI) {
    svg = <UpiLogo style={imageStyle} />;
  }
  return svg;
};

export default PaymentIcon;
