import Clipboard from '@react-native-community/clipboard';
import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';

export const ClipboardItem = ({text, needCopyText = true}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
      }}
      onPress={() => {
        Clipboard.setString(text || '');
      }}>
      <Typography style={styles.text}>{text}</Typography>
      {needCopyText ? (
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
      ) : (
        <Icon name="content-copy" color="white" size={18} />
      )}
    </TouchableOpacity>
  );
};

const PaymentDetail = ({selectedMedium}) => {
  const {data, type} = selectedMedium || {};
  console.log(
    '🚀 ~ file: PaymentDetail.js ~ line 43 ~ PaymentDetail ~ data',
    data,
  );
  return (
    data &&
    data?.map(item => {
      return (
        <View style={styles.mediumContainer}>
          {type === 'Bank' ? (
            <>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account:</Typography>
                <View style={styles.flex1} />
                <ClipboardItem text={item.paymentname} />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account No:</Typography>
                <View style={styles.flex1} />
                <ClipboardItem text={item?.paymentkey} />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>IFSC Code:</Typography>
                <View style={styles.flex1} />
                <ClipboardItem text={item.IFSC} />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account Type:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{item.accountType}</Typography>
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Bank:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{item.branch}</Typography>
              </View>
            </>
          ) : (
            <>
              <Typography style={styles.text}>
                {type || 'Select payment type'}
              </Typography>
              {item.paymentkey && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <ClipboardItem text={item.paymentkey} />
                </View>
              )}
            </>
          )}
        </View>
      );
    })
  );
};

const styles = StyleSheet.create({
  mediumContainer: {
    margin: 1,
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
