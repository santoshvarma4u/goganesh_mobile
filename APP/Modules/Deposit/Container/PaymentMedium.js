import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PaymentIcon from './PaymentIcon';

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
      <PaymentIcon paymenttype={paymenttype} />
      <Typography variant="caption" style={styles.textCenter}>
        {paymenttype}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paymentItem: {
    height: 70,
    width: 70,
    borderColor: Colors.appWhiteColor + 50,
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBlackColor,
    marginHorizontal: 5,
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.appWhiteColor,
    fontSize: 9,
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
