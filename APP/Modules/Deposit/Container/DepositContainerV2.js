/* eslint-disable no-alert */
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, IconButton} from 'react-native-paper';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import CONSTANTS from '../../../Constants';
import paymentGatewayApi from '../../../Network/PaymentGatway/paymentGatway';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import metrics from '../../../Theams/Metrics';
import {generateTransactionId} from '../../../Utils';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import withPreventDoubleClick from '../../../Utils/withPreventDoubleClick';
import ErrorPage from '../../Common/ErrorPage';
import FGImagePicker from '../../Common/ImagePicker';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import depositController from '../Controller/depositController';
import DepositController from '../Controller/depositController';
import PaymentDetail from './PaymentDetail';
import PaymentIcon from './PaymentIcon';
import PaymentMedium from './PaymentMedium';

const DepositContainerV2 = props => {
  const [amount, setAmount] = useState(' ');
  const [progress, setProgress] = useState(false);
  const [uid, setUid] = useState('');
  const {
    sdid,
    planType,
    userName,
    depositCoins,
    requestStatus,
    usdid = null,
  } = props.route.params;

  const paymentButtonSize = 64;

  const screenHeight = Dimensions.get('window').height;

  const [selectedMedium, setSelectedMedium] = useState({
    type: '',
    data: [],
  });

  const [filePath, setFilePath] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [isCreatingId, setIsCreatingID] = useState(false);
  const [paymentMasters, setPaymentMasters] = useState([]);
  const [enableGateway, setEnableGateway] = useState(false);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('manual');
  const [paymentApiKey, setPaymentApiKey] = useState('');
  const [paymentMaxAmount, setPaymentMaxAmount] = useState(null);
  const [pgProgress, setPgProgress] = useState(false);
  const [pgWaitingStatus, setPgWaitingStatus] = useState(false);
  const [pgGpaylink, setPgGpaylink] = useState(null);
  const [pgPhonePaylink, setPgPhonePaylink] = useState(null);
  const [pgPaytmLink, setPgPaytmLink] = useState(null);
  const [pgBhimLink, setPgBhimLink] = useState(null);
  const [universalPaymentUrl, setUniversalPaymentUrl] = useState(null);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [retryCount, setRetryCount] = useState(0);

  const ButtonEx = withPreventDoubleClick(Button);

  const {data, request, loading, error} = depositController.getPayeeDetails();

  useEffect(() => {
    if (data) {
      const masters = [];
      data.map(item => {
        const index = masters.findIndex(
          master => master.paymenttype === item.paymenttype,
        );
        if (index > -1) {
          masters[index].data.push(item);
        } else {
          masters.push({
            paymenttype: item.paymenttype,
            data: [item],
          });
        }
      });
      setPaymentMasters(masters);
    }
  }, [data]);

  useEffect(() => {
    if (paymentStatus === true) {
      handlePaymentGatewayResponse();
    } else if (paymentStatus === false) {
      alert('Payment Failed! ');
      setPaymentStatus(null);
    }
  }, [paymentStatus]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setAmount(depositCoins);
    getUID();

    await getPGSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function checkStatus() {
      await checkOrderStatus();
    }
    checkStatus();
  }, [pgWaitingStatus, retryCount]);

  const getPGSettings = async () => {
    const {apiKey, maxAmount, gatewayStatus} =
      await paymentGatewayApi.getPaymentGatewaySettings();
    if (apiKey && gatewayStatus) {
      setPaymentApiKey(apiKey);
      setPaymentMaxAmount(maxAmount);
      setEnableGateway(gatewayStatus);
      reactotron.log('gatewayStatus', gatewayStatus, depositCoins);
      if (gatewayStatus && parseInt(depositCoins) <= maxAmount) {
        setSelectedPaymentMode('automatic');
        setPgProgress(true);
        await initPaymentGatewayOrder(apiKey, maxAmount, gatewayStatus);
      } else {
        setSelectedPaymentMode('manual');
      }
    } else {
      setEnableGateway(false);
      selectedPaymentMode('manual');
    }
  };

  const initPaymentGatewayOrder = async (apiKey, maxAmount, gatewayStatus) => {
    // CreateOrder Payment Gateway
    const data = {
      key: apiKey,
      client_txn_id: generateTransactionId(10),
      amount: depositCoins.toString(),
      p_info: 'GoGanesh',
      customer_name: 'Goganesh' + generateTransactionId(1),
      customer_email: 'go@goganesh.com',
      customer_mobile: '9876543210',
      redirect_url: 'https://api.goganesh.com/paymentStatus',
      udf1: 'user defined field 1',
      udf2: 'user defined field 2',
      udf3: 'user defined field 3',
    };
    reactotron.log('data', data);
    setCurrentTransactionId(data.client_txn_id);
    setPgProgress(true);
    const response = await paymentGatewayApi.createOrder(data);
    reactotron.log('response', response);
    if (response.data.status === true) {
      const {upi_intent = {}, payment_url = null} = response.data.data;
      const {bhim_link, gpay_link, phonepe_link, paytm_link} = upi_intent;
      setPgGpaylink(gpay_link);
      setPgPhonePaylink(phonepe_link);
      setPgPaytmLink(paytm_link);
      setPgBhimLink(bhim_link);
      setUniversalPaymentUrl(payment_url);
    }
    setPgProgress(false);
    reactotron.log(response);
  };

  const checkOrderStatus = async () => {
    reactotron.log('checkOrderStatus', pgWaitingStatus);
    if (pgWaitingStatus) {
      const data = {
        key: paymentApiKey,
        client_txn_id: currentTransactionId,
        txn_date: moment().format('DD-MM-YYYY'),
      };
      const response = await paymentGatewayApi.checkOrderStatus(data);
      reactotron.log('response--->', response);
      const {status = {}} = response;
      if (retryCount >= 5) {
        setPgWaitingStatus(false);
        setRetryCount(0);
        setPaymentStatus(false);
        navigation.dispatch(resetAction);
      } else {
        if (status) {
          // payment success
          if (response.data?.data?.status === 'success') {
            // payment success
            setPaymentStatus(true);
            setPgWaitingStatus(false);
            setRetryCount(0);
          } else if (response?.data?.data?.status === 'failure') {
            // payment failed
            setPgWaitingStatus(false);
            setPaymentStatus(false);
            setRetryCount(0);
          }
        } else {
          // payment failed
          setPgWaitingStatus(false);
          setRetryCount(0);
          setPaymentStatus(false);
          navigation.dispatch(resetAction);
        }
      }
    }
  };

  const saveTransaction = async () => {
    // Save Transaction
    const data = {
      trx_id: currentTransactionId,
      client_id: uid,
      trx_date: moment().format('DD-MM-YYYY'),
      trx_amount: depositCoins,
      api_key: paymentApiKey,
    };
    const response = await paymentGatewayApi.savePaymentTransaction(data);
    reactotron.log('savePaymentTransaction', response);
  };

  const openRelevantUpiApp = async type => {
    setRetryCount(1);
    setPgWaitingStatus(true);
    await saveTransaction();
    switch (type) {
      case 'gpay':
        Linking.openURL(pgGpaylink);
        break;
      case 'phonepay':
        Linking.openURL(pgPhonePaylink);
        break;
      case 'paytm':
        Linking.openURL(pgPaytmLink);
        break;
      case 'bhim':
        Linking.openURL(pgBhimLink);
        break;
    }
  };

  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {
      reactotron.log('error', error);
    }
  };
  const navigation = useNavigation();

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });

  const setImageUpLoadProgress = progressEvent => {
    const {loaded, total} = progressEvent;
    let percent = Math.floor((loaded * 100) / total);
    setUploadProgress(percent);
  };

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    FGImagePicker.launchImageLibrary(options, response => {
      /**
       * response {
       *  didCancel: boolean,
       *  error: string,
       *  errorMessage: string,
       *  assets: array of selected media
       * }
       */

      if (response.didCancel) {
        alert('Please select image to upload');
      } else if (response.error) {
        alert(response.error);
      } else {
        if (response.assets.length > 0) {
          setFilePath(response.assets[0]);
        } else {
          alert('Please select image to upload');
        }
      }
    });
  };

  const handlePaymentGatewayResponse = () => {
    // Handle Payment Gateway Response
    if (paymentStatus) {
      setIsCreatingID(true);
      setProgress(true);
      const paymentMethod = 'Payment Gateway';

      if (requestStatus === 'wallet') {
        try {
          DepositController.depositIntoWallet(
            parseInt(uid),
            paymentMethod,
            depositCoins,
            'CR',
            true,
            filePath,
            CONSTANTS.DEPOSIT_INTO_WALLET_PAYMENT_GATEWAY,
            null,
            setImageUpLoadProgress,
            currentTransactionId,
            usdid,
          )
            .then(data => {
              setProgress(false);
              setIsCreatingID(false);
              setPaymentStatus(null);
              navigation.dispatch(resetAction);
            })
            .catch(error => {
              reactotron.log('error', error);
              setProgress(false);
              setPaymentStatus(null);
              setIsCreatingID(false);
            });
        } catch (e) {
          reactotron.log('error<<<', e);
        }
      } else if (requestStatus === 'new') {
        DepositController.submitIntialDeposit(
          parseInt(uid),
          sdid,
          paymentType,
          depositCoins,
          'CR',
          filePath,
          CONSTANTS.DEPOSIT_INTO_SITE_CREATE_ID_PAYMENT_GATEWAY,
          setImageUpLoadProgress,
          currentTransactionId,
        ).then(({data}) => {
          DepositController.submitData(
            parseInt(uid),
            sdid,
            planType,
            paymentType,
            'Pending',
            filePath,
            userName,
            depositCoins,
            data.data.paymentID,
            setImageUpLoadProgress,
          ).then(data => {});
          setProgress(false);
          setIsCreatingID(false);
          setPaymentStatus(null);
          navigation.dispatch(resetAction);
        });
      } else {
        DepositController.submitDataForMyID(
          parseInt(uid),
          sdid,
          paymentMethod,
          depositCoins,
          'CR',
          filePath,
          CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_PAYMENT_GATEWAY,
          null,
          currentTransactionId,
          usdid,
        )
          .then(data => {
            setProgress(false);
            setIsCreatingID(false);
            setPaymentStatus(null);
            navigation.dispatch(resetAction);
          })
          .catch(error => {
            setProgress(false);
            setPaymentStatus(null);
            setIsCreatingID(false);
          });
      }
    }
  };

  const handlePayment = () => {
    // Handle Payment
    if (!filePath) {
      return alert('please upload payment reference image');
    }
    if (!paymentType) {
      return alert('please select payment type');
    }
    setIsCreatingID(true);
    setProgress(true);
    if (requestStatus === 'wallet') {
      const paymentMethod = paymentType;

      reactotron.log(
        'requestStatus',
        requestStatus,
        parseInt(uid),
        paymentMethod,
        depositCoins,
        'CR',
        true,
        filePath,
        CONSTANTS.DEPOSIT_INTO_WALLET_UPI,
        null,
        setImageUpLoadProgress,
        null,
        usdid,
      );
      DepositController.depositIntoWallet(
        parseInt(uid),
        paymentMethod,
        depositCoins,
        'CR',
        true,
        filePath,
        CONSTANTS.DEPOSIT_INTO_WALLET_UPI,
        null,
        setImageUpLoadProgress,
        null,
        usdid,
      ).then(data => {
        setProgress(false);
        setIsCreatingID(false);
        navigation.dispatch(resetAction);
      });
    } else if (requestStatus === 'new') {
      DepositController.submitIntialDeposit(
        parseInt(uid),
        sdid,
        paymentType,
        depositCoins,
        'CR',
        filePath,
        CONSTANTS.DEPOSIT_INTO_SITE_UPI_CREATE_ID,
        setImageUpLoadProgress,
      ).then(({data}) => {
        DepositController.submitData(
          parseInt(uid),
          sdid,
          planType,
          paymentType,
          'Pending',
          filePath,
          userName,
          depositCoins,
          data.data.paymentID,
          setImageUpLoadProgress,
        ).then(data => {});
        setProgress(false);
        setIsCreatingID(false);
        navigation.dispatch(resetAction);
      });
    } else {
      const paymentMethod = paymentType;
      DepositController.submitDataForMyID(
        parseInt(uid),
        sdid,
        paymentMethod,
        depositCoins,
        'CR',
        filePath,
        CONSTANTS.DEPOSIT_INTO_EXISTING_ID_FROM_UPI,
        null,
        null,
        usdid,
      )
        .then(data => {
          setProgress(false);
          setIsCreatingID(false);
          navigation.dispatch(resetAction);
        })
        .catch(error => {
          setProgress(false);
          setIsCreatingID(false);
        });
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorPage
        onRetryPress={() => {
          request();
        }}>
        {error}
      </ErrorPage>
    );
  }

  const renderPaymentGatewayV2 = () => {
    return universalPaymentUrl && !pgWaitingStatus ? (
      <View
        style={{
          flex: 1,
        }}>
        <WebView
          style={{
            height: (screenHeight * 3) / 4 + 10,
          }}
          source={{uri: universalPaymentUrl}}
          onNavigationStateChange={navState => {
            reactotron.log('navState', navState);
            if (
              navState.url.includes('client_txn_id') &&
              navState.url.includes('txn_id')
            ) {
              setPgWaitingStatus(true);
              setRetryCount(1);
            }
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
    ) : (
      <View>
        <Typography
          variant="H3"
          style={{
            textAlign: 'center',
            color: Colors.appWhiteColor,
            width: '100%',
            marginBottom: 10,
          }}>
          Please wait, we are verifying payment link for you
        </Typography>
      </View>
    );
  };

  const renderManualPayment = () => {
    return (
      <>
        <View
          style={{
            marginVertical: 10,
            backgroundColor: Colors.appBlackColorLight,
            padding: 10,
            borderRadius: metrics.borderRadius / 2,
          }}>
          <FlatList
            data={paymentMasters}
            horizontal
            renderItem={({item}) => {
              return (
                <PaymentMedium
                  data={item}
                  selectedMedium={selectedMedium}
                  setSelectedMedium={setSelectedMedium}
                  setPaymentType={setPaymentType}
                  isSelected={selectedMedium.type === item.paymenttype}
                />
              );
            }}
            keyExtractor={item => item.id}
          />
        </View>
        {/*
            show details below depending on selected medium
        */}
        <PaymentDetail selectedMedium={selectedMedium} />
        {/*
        upload component for proof of payment
      */}
        {filePath?.uri ? (
          <View
            style={[
              styles.depositScreenshotCard,
              {
                alignItems: 'flex-end',
              },
            ]}>
            <IconButton
              icon="delete"
              mode="contained"
              color={Colors.appRedColor}
              onPress={() => setFilePath('')}>
              Upload
            </IconButton>
            <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.depositScreenshotCard}
            onPress={() => chooseFile()}>
            <Icon
              name="plus-circle"
              color={Colors.appWhiteColor}
              size={36}
              type="material-community"
            />
            <Typography style={styles.textCenter}>
              Click here to upload payment screenshot
            </Typography>
          </TouchableOpacity>
        )}
        <View>
          <ButtonEx
            mode="contained"
            disabled={!filePath?.uri || progress}
            onPress={handlePayment}>
            <Typography>Submit</Typography>
          </ButtonEx>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isCreatingId ? (
        <LoadingIndicator loadingText={'Please wait....' + uploadProgress} />
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Typography
          variant="H2"
          style={[
            styles.text,
            {
              textAlign: 'center',
            },
          ]}>
          Pay ₹{amount}/-
        </Typography>
        <View style={styles.payRow}>
          {enableGateway && (
            <TouchableOpacity
              style={
                selectedPaymentMode === 'automatic'
                  ? styles.selectedStyle
                  : styles.unSelectedStyle
              }
              onPress={async () => {
                setSelectedPaymentMode('automatic');
                await getPGSettings();
              }}>
              <Typography style={styles.text} variant="H3">
                Pay Automatically
              </Typography>
              {selectedPaymentMode === 'automatic' && (
                <View style={styles.underline} />
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={
              selectedPaymentMode === 'manual'
                ? styles.selectedStyle
                : styles.unSelectedStyle
            }
            onPress={() => {
              setSelectedPaymentMode('manual');
            }}>
            <Typography style={styles.text} variant="H3">
              Pay Manually
            </Typography>
            {selectedPaymentMode === 'manual' && (
              <View style={styles.underline} />
            )}
          </TouchableOpacity>
        </View>
        {selectedPaymentMode === 'manual'
          ? renderManualPayment()
          : renderPaymentGatewayV2()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.appBlackColor,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  text: {
    color: Colors.appWhiteColor,
    marginRight: 4,
  },
  textCenter: {
    textAlign: 'center',
    color: Colors.appWhiteColor,
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  underline: {
    borderBottomColor: Colors.appPrimaryColor,
    borderBottomWidth: 2,
    marginVertical: 5,
    width: 60,
  },
  underlineWithoutColor: {
    borderBottomWidth: 2,
    marginVertical: 5,
    width: 60,
  },
  depositScreenshotCard: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.appPrimaryColor,
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    padding: 5,
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  selectedStyle: {
    borderWidth: 1,
    borderColor: Colors.appWhiteColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: Colors.appBlackColorLight,
  },
  unSelectedStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.appBlackColorLight,
  },
  paymentButtonStyle: {
    width: '40%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.appWhiteColor + '50',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    margin: 10,
  },
});

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWallet: wallet => dispatch(setWalletBalance(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepositContainerV2);
