import Clipboard from '@react-native-community/clipboard';
import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';

export const ClipboardItem = ({text}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
      }}
      onPress={() => {
        Clipboard.setString(text || '');
      }}>
      <Typography style={styles.text}>{text}</Typography>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2,
          paddingHorizontal: 4,
          borderRadius: 5,
          backgroundColor: Colors.appPrimaryColor,
        }}>
        <Typography
          variant="H5"
          style={{
            color: Colors.appWhiteColor,
            marginRight: 4,
          }}>
          Copy
        </Typography>
        <Icon name="content-copy" color="white" size={18} />
      </View>
    </TouchableOpacity>
  );
};

const PaymentDetail = ({selectedMedium}) => {
  return (
    <View style={styles.mediumContainer}>
      {selectedMedium.type === 'Bank' ? (
        <>
          <View style={styles.bankItems}>
            <Typography style={styles.text}>Account:</Typography>
            <View style={styles.flex1} />
            <ClipboardItem text={selectedMedium?.data?.paymentname} />
          </View>
          <View style={styles.bankItems}>
            <Typography style={styles.text}>Account No:</Typography>
            <View style={styles.flex1} />
            <ClipboardItem text={selectedMedium?.data?.paymentkey} />
          </View>
          <View style={styles.bankItems}>
            <Typography style={styles.text}>IFSC Code:</Typography>
            <View style={styles.flex1} />
            <ClipboardItem text={selectedMedium?.data?.IFSC} />
          </View>
          <View style={styles.bankItems}>
            <Typography style={styles.text}>Account Type:</Typography>
            <View style={styles.flex1} />
            <Typography style={styles.text}>
              {selectedMedium?.data?.accountType}
            </Typography>
          </View>
          <View style={styles.bankItems}>
            <Typography style={styles.text}>Bank:</Typography>
            <View style={styles.flex1} />
            <Typography style={styles.text}>
              {selectedMedium?.data?.branch}
            </Typography>
          </View>
        </>
      ) : (
        <>
          <Typography style={styles.text}>
            {selectedMedium.type || 'Select payment type'}
          </Typography>
          {selectedMedium?.data.paymentkey && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ClipboardItem text={selectedMedium?.data.paymentkey} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mediumContainer: {
    marginVertical: 10,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    padding: 8,
  },
  bankItems: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  text: {
    color: Colors.appWhiteColor,
    marginRight: 4,
  },
  flex1: {
    flex: 1,
  },
});

export default PaymentDetail;
