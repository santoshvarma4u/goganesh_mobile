/* eslint-disable react-native/no-inline-styles */
import AllInOneSDKManager from 'paytm_allinone_react-native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, TextInput, Modal} from 'react-native-paper';
import RazorpayCheckout from 'react-native-razorpay';
import * as RNUpiPayment from 'react-native-upi-payment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import {uuid} from '../../Common/uuidGenerator';
import PaymentOptionController from '../../PaymentOptions/Controller/paymentController';
import PaymentCard from '../Component/PaymentCard';
import DepositController from '../Controller/depositController';

const intiateThroughUPI = async amount => {
  RNUpiPayment.initializePayment(
    {
      vpa: '9398322333-1@idfcfirst', // or can be john@ybl or mobileNo@upi
      payeeName: 'Vinayaka Aqua Farms',
      amount: amount,
      transactionRef: 'aasd-234-dsfa-fn',
    },
    success => {
      reactotron.log('Payment Success', success);
    },
    error => {
      reactotron.log('Payment Failed', error);
    },
  );
};

const initiatePaymentGatewayTransaction = async amount => {
  const ORDER_ID = uuid(10, 16);
  const MID = 'QpTFhC62406352970762';
  const CUST_ID = 'CUST_' + uuid(10);
  const INDUSTRY_TYPE_ID = 'Retail';
  const CHANNEL_ID = 'WAP';
  const WEBSITE = 'WEBSTAGING';
  const CALLBACK_URL =
    'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + ORDER_ID;
  const RETURN_URL =
    'https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=' + ORDER_ID;
  const TXN_AMOUNT = amount;

  //generate Checksum
  const checkSumResponse = await PaymentOptionController.generatePaytmChecksum({
    ORDER_ID,
    MID,
    CUST_ID,
    INDUSTRY_TYPE_ID,
    CHANNEL_ID,
    WEBSITE,
    TXN_AMOUNT,
    CALLBACK_URL,
  });
  //call Paytm Payment Gateway
  AllInOneSDKManager.startTransaction(
    ORDER_ID,
    MID,
    checkSumResponse.data.data.checksum,
    amount,
    CALLBACK_URL,
    true,
    true,
    'goganesh://',
  )
    .then(response => {
      reactotron.log('Payment Gateway Response', response);
    })
    .catch(error => {
      reactotron.log('Payment Gateway Error', error);
    });
};

const initiateRazorPay = async amount => {
  const data = {
    amount: amount * 100,
    currency: 'INR',
  };
  const order = await PaymentOptionController.razorPayCreateOrder(data);

  var options = {
    name: 'Laxmi Trading Company',
    description: 'Please pay here',
    order_id: order.id,
    key: 'rzp_live_ACt7o8qHr1kFb7',
    prefill: {
      email: 'useremail@example.com',
      contact: '9191919191',
      name: 'John Doe',
    },
    theme: {color: Colors.appPrimaryColor},
  };
  RazorpayCheckout.open(options)
    .then(() => {
      DepositController.depositIntoWallet(
        2,
        'Payment Gateway',
        amount,
        'CR',
        true,
        '',
      ).then(data => {});
    })
    .catch(reactotron.log);
};
const DepositContainer = props => {
  const {navigation, walletBalance = 0} = props;
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.appPrimaryColor,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.appBlackColor,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 80,
        }}>
        {/* header */}
        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.appBlackColorLight,
            marginHorizontal: 30,
            marginTop: -60,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons
            name={'wallet'}
            color={Colors.appWhiteColor}
            size={50}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Typography variant="paragraph" color={Colors.appWhiteColor}>
              WALLET BALANCE
            </Typography>
            <Typography variant="H3" color={Colors.appWhiteColor}>
              ₹ {walletBalance}
            </Typography>
          </View>
        </View>
        {/* body */}
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <CommonTextInput
            label="Deposit Coins *"
            mode="outlined"
            style={{
              marginTop: 20,
            }}
            value={amount}
            onChangeText={value => {
              setAmount(value);
              setError(false);
            }}
            keyboardType="numeric"
          />
          <Typography
            variant="paragraph"
            color={error ? Colors.appRedColor : Colors.appWhiteColor}>
            {error
              ? 'Enter valid amount, Minimum amount is 100 coins'
              : '*Minimum Deposit Amount is 100 Coins'}
          </Typography>
        </View>
        <Button
          mode="contained"
          style={{
            marginHorizontal: 30,
            marginTop: 20,
            backgroundColor: Colors.appPrimaryColor,
            color: Colors.appBlackColor,
          }}
          onPress={() => {
            if (amount >= 100) {
              setError(false);
              setModalVisible(true);
              // navigation.navigate('PaymentOptions', {
              //   depositCoins: amount,
              //   requestStatus: 'wallet',
              // });
            } else {
              setError(true);
            }
          }}>
          DEPOSIT COINS
        </Button>
      </View>
      <Modal visible={modalVisible} style={{color: Colors.appBlackColor}}>
        <ScrollView
          style={{
            backgroundColor: Colors.appBlackColorLight,
            borderTopRightRadius: 20,
          }}>
          <Typography
            variant="header"
            color={Colors.appWhiteColor}
            style={{
              textAlign: 'center',
            }}>
            {'Select a payment system.\n'}
            <Typography color={Colors.appWhiteColor}>
              You are about to deposit {amount} coins to your wallet.
            </Typography>
          </Typography>
          <PaymentCard
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Button
            mode="contained"
            style={{
              marginHorizontal: 30,
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              setModalVisible(false);
              if (paymentMethod === 'gateway') {
                // initiatePaymentGatewayTransaction(amount);
                //intiateThroughUPI(amount);
                initiateRazorPay(amount);
              } else {
                navigation.navigate('PaymentOptions', {
                  depositCoins: amount,
                  requestStatus: 'wallet',
                });
              }
            }}>
            <Typography variant="H4" color={Colors.appBlackColor}>
              PROCEED
            </Typography>
          </Button>
          <Button
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            color={Colors.appWhiteColor}
            mode="text"
            onPress={() => {
              setModalVisible(false);
            }}>
            CANCEL
          </Button>
        </ScrollView>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    walletBalance: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWalletBalance: walletBalance => {
      dispatch(setWalletBalance(walletBalance));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DepositContainer);
