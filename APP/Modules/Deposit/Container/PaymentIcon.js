import React from 'react';
import BhimSvg from '../../../Assets/svgs/BhimSvg';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PaytmSvg from '../../../Assets/svgs/PaytmSvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import UpiLogo from '../../../Assets/svgs/UpiLogo';
import images from '../../../Theams/Images';
import FGImage from '../../Common/FGImage';
export const keyMap = {
  'Google Pay': 'Google Pay',
  'Phone Pay': 'Phone Pay',
  UPI: 'UPI',
  Bank: 'Bank',
  Paytm: 'Paytm',
  Bhim: 'Bhim',
};

const imageStyle = {
  width: 32,
  height: 32,
  marginTop: 5,
};

const PaymentIcon = ({paymenttype, width = 36, height = 36}) => {
  let svg = <FGImage source={images.banktransfer1} style={imageStyle} />;
  if (paymenttype === keyMap['Google Pay']) {
    svg = <GooglePaySvg width={width} height={height} />;
  } else if (paymenttype === keyMap['Phone Pay']) {
    svg = <PhonePeSvg width={width} height={height} />;
  } else if (paymenttype === keyMap.UPI) {
    svg = <UpiLogo style={imageStyle} />;
  } else if (paymenttype === keyMap.Paytm) {
    svg = <PaytmSvg width={width} height={height} />;
  } else if (paymenttype === keyMap.Bhim) {
    svg = <BhimSvg width={width} height={height} />;
  }
  return svg;
};

export default PaymentIcon;
