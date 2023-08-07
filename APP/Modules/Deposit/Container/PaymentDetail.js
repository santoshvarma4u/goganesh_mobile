import Clipboard from '@react-native-community/clipboard';
import {Icon} from '@rneui/themed';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PaymentIcon from './PaymentIcon';

export const ClipboardItem = ({text, needCopyText = true, isHome = false}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        Clipboard.setString(text || '');
      }}>
      <Typography style={styles.detailsText}>{text}</Typography>
      {needCopyText ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderRadius: 5,
            // backgroundColor: Colors.appPrimaryColor,
          }}>
          {/* <Typography
            variant="H5"
            style={{
              color: Colors.appWhiteColor,
              marginRight: 4,
            }}>
            Copy
          </Typography> */}
          <Icon name="content-copy" color="white" size={18} />
        </View>
      ) : (
        <Icon
          name="content-copy"
          color="white"
          size={18}
          style={isHome ? {marginLeft: 80} : ''}
        />
      )}
    </TouchableOpacity>
  );
};

const PaymentDetail = ({selectedMedium}) => {
  const {data, type} = selectedMedium || {};

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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Typography style={styles.text}>Mode</Typography>
                <View style={styles.displayName}>
                  <Typography style={styles.text}>Display Name</Typography>
                  <Typography style={styles.text}>Details</Typography>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: Colors.appWhiteColor,
                  marginVertical: 2,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  flex: 1,
                }}>
                <PaymentIcon paymenttype={item?.paymenttype} />
                <View style={styles.displayName}>
                  <Typography style={styles.text}>
                    {item.paymentname}
                  </Typography>
                  {item.paymentkey && (
                    <>
                      <ClipboardItem text={item.paymentkey} />
                      {/*<ClipboardItem text="asdfghjklwertyuiopasdfghjklasdfghjklwertyuiopasdfghjkl" />*/}
                    </>
                  )}
                </View>
              </View>
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
    fontSize: 12,
    marginRight: 4,
  },
  detailsText: {
    color: Colors.appWhiteColor,
    fontSize: 12,
    marginRight: 4,
    maxWidth: 120,
  },
  flex1: {
    flex: 1,
  },
  displayName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
    flex: 1,
  },
});

export default PaymentDetail;
