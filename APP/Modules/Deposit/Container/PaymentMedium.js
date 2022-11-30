import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import UpiLogo from '../../../Assets/svgs/UpiLogo';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import reactotron from "reactotron-react-native";

export const keyMap = {
  'Google Pay': 'Google Pay',
  'Phone Pay': 'Phone Pay',
  UPI: 'UPI',
  Bank: 'Bank',
};

const PaymentMedium = ({
  data,
  isSelected,
  setSelectedMedium,
  setPaymentType,
}) => {
  const {paymenttype} = data || {};

  let svg = (
    <Icon
      name="bank"
      size={48}
      type={'font-awesome'}
      color={Colors.appPrimaryColor}
    />
  );
  if (paymenttype === keyMap['Google Pay']) {
    svg = <GooglePaySvg />;
  } else if (paymenttype === keyMap['Phone Pay']) {
    svg = <PhonePeSvg />;
  } else if (paymenttype === keyMap.UPI) {
    svg = <UpiLogo />;
  }
  return (
    <TouchableOpacity
      style={[
        styles.paymentItem,
        {...(isSelected ? styles.selected : styles.unselected)},
      ]}
      onPress={() => {
        setSelectedMedium({
          type: paymenttype,
          ...data,
        });
        setPaymentType(paymenttype);
      }}>
      {svg}
      <Typography variant="caption" style={styles.textCenter}>
        {paymenttype}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentItem: {
    height: 80,
    width: 80,
    borderColor: Colors.appWhiteColor + 50,
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.appWhiteColor,
    fontSize: 8,
  },
  selected: {
    borderColor: Colors.appPrimaryColor,
    borderWidth: 2,
  },
  unselected: {
    borderColor: Colors.appWhiteColor + 50,
    borderWidth: 1,
  },
});

export default PaymentMedium;
