/* eslint-disable react-native/no-inline-styles */
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Modal, ActivityIndicator} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import CONSTANTS from '../../../Constants';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import useHideBottomBar from '../../../Utils/useHideBottomBar';
import CommonTextInput from '../../Common/CommonTextInput';
import ErrorPage from '../../Common/ErrorPage';
import LottieView from '../../Common/Lottie';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import {uuid} from '../../Common/uuidGenerator';
import paymentDetailsController from '../../PaymentDetails/Controller/paymentDetailsController';
import PaymentOptionController from '../../PaymentOptions/Controller/paymentController';
import PaymentCard from '../Component/PaymentCard';
import DepositController from '../Controller/depositController';

const DepositContainer = props => {
  const {navigation, walletBalance = 0} = props;
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [isPaymentLoading, setIsPaymentLoading] = React.useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = React.useState(false);
  const [uid, setUid] = useState('');
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });
  useHideBottomBar();
  const {
    data,
    error: depositVerifyError,
    loading: depositVerifyLoading,
    request: checkDepositRequest,
  } = paymentDetailsController.getPendingDepositRequestsForUser();
  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {}
  };
  useEffect(() => {
    getUID();
  }, []);

  const initiatePayment = async amount => {
    setIsPaymentLoading(true);
    const paymentId = uuid(5, 16);
    let response = {};
    try {
      response = await PaymentOptionController.generateCFToken({
        orderId: paymentId,
        orderAmount: amount,
        orderCurrency: 'INR',
      });
    } catch (e) {
      //Error
    }

    let name1 = await Storage.getItemSync(StorageKeys.NAME);
    const env = 'PROD';
    const map = {
      orderId: paymentId,
      orderAmount: amount,
      appId: CONSTANTS.CASHFREE_APPID,
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

  const depositAmountIntoWallet = (amount, referenceId) => {
    setIsPaymentLoading(true);
    DepositController.depositIntoWallet(
      parseInt(uid),
      'Payment Gateway',
      amount,
      'CR',
      true,
      null,
      CONSTANTS.DEPOSIT_INTO_WALLET_PAYMENT_GATEWAY,
      null,
      null,
      referenceId,
      data?.usdid,
    ).then(data => {
      setIsPaymentLoading(false);
      navigation.dispatch(resetAction);
    });
  };

  if (depositVerifyLoading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (depositVerifyError) {
    return <ErrorPage onRetryPress={checkDepositRequest} />;
  }

  if (data?.creadtedtime) {
    // check if current time is greater than created time + 2 mins
    const createdTime = new Date(data.creadtedtime);
    const currentTime = new Date();
    const diff = currentTime.getTime() - createdTime.getTime();
    const diffMinutes = Math.round(diff / 60000);
    if (diffMinutes < 2) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.appBlackColor,
            paddingHorizontal: 20,
          }}>
          <LottieView
            source={animations.timer}
            autoPlay
            loop
            style={{
              width: 200,
              height: 200,
            }}
          />
          <Typography
            color={Colors.appWhiteColor}
            variant="H4"
            style={{
              textAlign: 'center',
            }}>
            Sorry, you have already made a deposit request in the last 2
            minutes. Please try again after 2 minutes.
          </Typography>
        </View>
      );
    }
  }

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
          <FontAwesome5 name={'coins'} color={Colors.appWhiteColor} size={50} />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Typography variant="paragraph" color={Colors.appPrimaryColor}>
              WALLET BALANCE
            </Typography>
            <Typography variant="H3" color={Colors.appWhiteColor}>
              {walletBalance}
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
            value={`${amount}`}
            onChangeText={value => {
              setAmount(value);
              setError(false);
            }}
            keyboardType="numeric"
            style={{
              backgroundColor: Colors.appBlackColorLight,
              borderRadius: 10,
              padding: 10,
              marginTop: 10,
            }}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            error={error}
            helperText={
              error
                ? 'Enter valid amount, Minimum amount is 1000 coins'
                : '*Minimum Deposit Amount is 1000 Coins'
            }
          />
          <View
            style={{
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Typography variant="P2" color={Colors.appWhiteColor}>
              Choose From Your Recent Transactions
            </Typography>
            <View
              style={{
                flexDirection: 'row',
                height: 5,
                width: 50,
                borderRadius: 2,
                backgroundColor: Colors.appPrimaryColor,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Button
              mode="contained"
              color={Colors.appBlackColorLight}
              style={{
                width: 100,
              }}
              uppercase={false}
              onPress={() => {
                setAmount(1000);
              }}>
              1000
            </Button>
            <Button
              mode="contained"
              color={Colors.appBlackColorLight}
              style={{
                width: 100,
              }}
              uppercase={false}
              onPress={() => {
                setAmount(2000);
              }}>
              2000
            </Button>
            <Button
              mode="contained"
              color={Colors.appBlackColorLight}
              style={{
                width: 100,
              }}
              uppercase={false}
              onPress={() => {
                setAmount(5000);
              }}>
              5000
            </Button>
          </View>

          <View />
        </View>
        {isPaymentLoading ? (
          <ActivityIndicator animating={true} color={Colors.appPrimaryColor} />
        ) : (
          <Button
            mode="contained"
            disabled={isPaymentLoading}
            style={{
              marginHorizontal: 90,
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              if (Number(amount) >= 1000) {
                setError(false);
                navigation.navigate('DepositV2', {
                  depositCoins: amount,
                  requestStatus: 'wallet',
                  paymentType: 'wallet',
                });
                //setModalVisible(true);
                // navigation.navigate('PaymentOptions', {
                //   depositCoins: amount,
                //   requestStatus: 'wallet',
                // });
              } else {
                setError(true);
              }
            }}>
            <Typography variant="button" color={Colors.appBlackColor}>
              Deposit Coins
            </Typography>
          </Button>
        )}
      </View>
      <Modal visible={modalVisible} style={{color: Colors.appBlackColor}}>
        <ScrollView
          style={{
            backgroundColor: Colors.appBlackColorLight,
            borderRadius: 20,
            paddingTop: 20,
            margin: 10,
          }}>
          <Typography
            variant="H2"
            color={Colors.appWhiteColor}
            style={{
              textAlign: 'center',
            }}>
            {'Select a payment system.\n'}
          </Typography>
          <Typography
            variant="H4"
            color={Colors.appWhiteColor}
            style={{
              textAlign: 'center',
            }}>
            You are about to deposit {amount} coins to your wallet.
          </Typography>
          <PaymentCard
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            amount={amount}
          />
          <Button
            mode="contained"
            style={{
              marginHorizontal: 30,
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            disabled={isPaymentLoading}
            onPress={() => {
              setModalVisible(false);
              if (paymentMethod === 'gateway') {
                initiatePayment(amount);
                //intiateThroughUPI(amount);
              } else {
                navigation.navigate('DepositV2', {
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
