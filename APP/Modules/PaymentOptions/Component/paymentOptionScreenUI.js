import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import CONSTANTS, {APPID} from '../../../Constants';
import images from '../../../Theams/Images';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import {uuid} from '../../Common/uuidGenerator';
import DepositController from '../../Deposit/Controller/depositController';
import PaymentOptionController from '../Controller/paymentController';

import styles from './Styles';

function PaymentOptionScreen({route}) {
  const options = [];
  const {
    sdid,
    planMoney,
    planType,
    userName,
    depositCoins,
    requestStatus,
  } = route.params;

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  const [uid, setUid] = useState('');
  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {}
  };
  useEffect(() => {
    getUID();
  }, []);

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });

  // Launch payment gatway
  const initiatePayment = async amount => {
    setIsPaymentLoading(true);
    const paymentId = uuid(5, 16);
    const response = await PaymentOptionController.generateCFToken({
      orderId: paymentId,
      orderAmount: amount,
      orderCurrency: 'INR',
    });
    let name1 = await Storage.getItemSync(StorageKeys.NAME);
    const env = 'PROD';
    const map = {
      orderId: paymentId,
      orderAmount: amount,
      appId: '2028452d9b12aac9cd7c1e39b2548202',
      tokenData: response.data.data.cftoken,
      orderCurrency: 'INR',
      orderNote: 'To Laxmi Trading Company',
      notifyUrl: 'https://test.gocashfree.com/notify',
      customerName: name1 || 'Laxmi Trader',
      verifyExpiry: '100',
      customerPhone: '9999999999',
      customerEmail: 'cashfree@cashfree.com',
    };
  };

  // Deposit amount
  const depositAmount = referenceId => {
    if (requestStatus === 'new') {
      DepositController.submitIntialDeposit(
        parseInt(uid),
        sdid,
        'Payment Gateway',
        depositCoins,
        'CR',
        null,
        CONSTANTS.DEPOSIT_INTO_SITE_CREATE_ID_PAYMENT_GATEWAY,
        null,
        referenceId,
      ).then(({data}) => {
        DepositController.submitData(
          parseInt(uid),
          sdid,
          planType,
          'Payment Gateway',
          'Pending',
          null,
          userName,
          depositCoins,
          data.data.paymentID,
          null,
        ).then(data => {});

        navigation.dispatch(resetAction);
      });
    } else {
      const paymentMethod = 'Payment Gateway';
      DepositController.submitDataForMyID(
        parseInt(uid),
        sdid,
        paymentMethod,
        depositCoins,
        'CR',
        null,
        CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_PAYMENT_GATEWAY,
        null,
        referenceId,
        usdid,
      ).then(data => {
        navigation.dispatch(resetAction);
      });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    paymentOptions.request();
    paymentOptions.data.forEach(payOps => {
      options.push(payOps.paymenttype);
    });
    setRefreshing(false);
  }, []);

  const paymentOptions = PaymentOptionController.getPayeeDetails();
  paymentOptions.data.forEach(payOps => {
    options.push(payOps.paymenttype);
  });
  const checkIfPaymentOptionAvailable = paymentType => {
    if (options.includes(paymentType)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.containerMain}>
      <ScrollView
        contentContainerStyle={styles.paymentOptionsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.PaymentTitle}>
          <Typography variant="title" style={{color: 'white'}}>
            Choose Your Payment Method
          </Typography>
          <Typography style={{color: 'white'}}>Pull to Refresh</Typography>
        </View>
        <View style={styles.paymentOptions}>
          <TouchableWithoutFeedback
            disabled={isPaymentLoading}
            onPress={() => {
              if (
                checkIfPaymentOptionAvailable('Payment Gateway') &&
                depositCoins <= 10000
              ) {
                // Navigate to payment gatway
                initiatePayment(depositCoins);
              } else {
                alert(
                  depositCoins > 10000
                    ? 'Maximum allowed from payment gateway is 10000'
                    : 'Payment gateway currently disabled',
                );
              }
            }}
          >
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.gateway} />
              <Typography style={styles.paymentTypeTitle}>
                Payment Gateway
              </Typography>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            disabled={isPaymentLoading}
            onPress={() => {
              if (checkIfPaymentOptionAvailable('Google Pay')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  paymentType: 'Google Pay',
                  requestStatus: requestStatus,
                  planType: planType,
                  userName: userName,
                  depositCoins: depositCoins,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}
          >
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.gpay} />
              <Typography style={styles.paymentTypeTitle}>
                Google Pay
              </Typography>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            disabled={isPaymentLoading}
            onPress={() => {
              if (checkIfPaymentOptionAvailable('Phone Pay')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  paymentType: 'Phone Pay',
                  userName: userName,
                  planType: planType,
                  depositCoins: depositCoins,
                  requestStatus: requestStatus,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}
          >
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.phonepe} />
              <Typography style={styles.paymentTypeTitle}>Phone Pay</Typography>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            disabled={isPaymentLoading}
            onPress={() => {
              if (checkIfPaymentOptionAvailable('Bank')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  paymentType: 'Bank',
                  userName: userName,
                  planType: planType,
                  depositCoins: depositCoins,
                  requestStatus: requestStatus,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}
          >
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.banktransfer} />
              <Typography style={styles.paymentTypeTitle}>
                Bank Manual Transfer{' '}
              </Typography>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

export default PaymentOptionScreen;
