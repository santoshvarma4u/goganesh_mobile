import {useNavigation} from '@react-navigation/native';
import AllInOneSDKManager from 'paytm_allinone_react-native';
import React from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  RefreshControl,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import reactotron from 'reactotron-react-native';
import images from '../../../Theams/Images';
import {nanoUuid, uuid} from '../../Common/uuidGenerator';
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

  const initiatePaymentGatewayTransaction = async () => {
    const ORDER_ID = uuid(10, 16);
    const MID = 'QpTFhC62406352970762';
    const CUST_ID = 'CUST_' + uuid(10);
    const INDUSTRY_TYPE_ID = 'Retail';
    const CHANNEL_ID = 'WAP';
    const WEBSITE = 'WEBSTAGING';
    const CALLBACK_URL =
      'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' +
      ORDER_ID;
    const RETURN_URL =
      'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' +
      ORDER_ID;
    const TXN_AMOUNT = planMoney || depositCoins;

    //generate Checksum
    const checkSumResponse = await PaymentOptionController.generatePaytmChecksum(
      {
        ORDER_ID,
        MID,
        CUST_ID,
        INDUSTRY_TYPE_ID,
        CHANNEL_ID,
        WEBSITE,
        TXN_AMOUNT,
        CALLBACK_URL,
      },
    );
    //call Paytm Payment Gateway
    AllInOneSDKManager.startTransaction(
      ORDER_ID,
      MID,
      checkSumResponse.data.data.checksum,
      TXN_AMOUNT,
      CALLBACK_URL,
      true,
      false,
      'goganesh://',
    )
      .then(response => {
        reactotron.log('Payment Gateway Response', response);
      })
      .catch(error => {
        reactotron.log('Payment Gateway Error', error);
      });
  };

  return (
    <View style={styles.containerMain}>
      <ScrollView
        contentContainerStyle={styles.paymentOptionsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.PaymentTitle}>
          <Text style={{color: 'white'}}>Choose Your Payment Method</Text>
          <Text style={{color: 'white'}}>Pull to Refresh</Text>
        </View>
        <View style={styles.paymentOptions}>
          <TouchableWithoutFeedback
            onPress={() => {
              if (checkIfPaymentOptionAvailable('Paytm UPI')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  paymentType: 'Paytm UPI',
                  planType: planType,
                  userName: userName,
                  depositCoins: depositCoins,
                  requestStatus: requestStatus,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.paytmupi} />
              <Text style={styles.paymentTypeTitle}>Paytm UPI</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (checkIfPaymentOptionAvailable('Paytm Wallet')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  planType: planType,
                  paymentType: 'Paytm Wallet',
                  userName: userName,
                  depositCoins: depositCoins,
                  requestStatus: requestStatus,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.paytm} />
              <Text style={styles.paymentTypeTitle}>Paytm Wallet</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
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
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.gpay} />
              <Text style={styles.paymentTypeTitle}>Google Pay</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
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
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.phonepe} />
              <Text style={styles.paymentTypeTitle}>Phone Pay</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
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
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.banktransfer} />
              <Text style={styles.paymentTypeTitle}>Bank Manual Transfer </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              if (checkIfPaymentOptionAvailable('UPI Manual Transfer')) {
                navigation.navigate('Deposit', {
                  sdid: sdid,
                  planMoney: planMoney,
                  paymentType: 'UPI Manual Transfer',
                  planType: planType,
                  userName: userName,
                  depositCoins: depositCoins,
                  requestStatus: requestStatus,
                });
              } else {
                alert('Payment Option Not Available');
              }
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.allupi} />
              <Text style={styles.paymentTypeTitle}>UPI Manual Transfer</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={initiatePaymentGatewayTransaction}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.paytm} />
              <Text style={styles.paymentTypeTitle}>Paytm Payment Gateway</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
}

export default PaymentOptionScreen;
