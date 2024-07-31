/* eslint-disable no-alert */
import {CommonActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AppState,
  Text,
  Dimensions,
} from 'react-native';
import * as RNFS from 'react-native-fs';
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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
  const [currentTransactionId, setCurrentTransactionId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentGatewayForm, setPaymentGatewayForm] = useState(null);
  const [pgOrderId, setPgOrderId] = useState(null);
  const [showWebview, setShowWebview] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setAmount(depositCoins);
    getUID();

    // await getPGSettings();
  }, []);

  useEffect(() => {
    // async function checkStatus() {
    //   if (retryCount <= 10 && pgWaitingStatus) {
    //     await checkOrderStatus();
    //   }
    // }
    // checkStatus();
  }, [pgWaitingStatus, retryCount]);

  const getPGSettings = async () => {
    const {maxAmount} = await paymentGatewayApi.getPaymentGatewaySettings();

    const gatewayStatus = true;

    if (gatewayStatus) {
      setPaymentMaxAmount(maxAmount);
      setEnableGateway(gatewayStatus);
      reactotron.log('gatewayStatus', gatewayStatus, depositCoins);
      if (gatewayStatus) {
        setSelectedPaymentMode('automatic');
        setPgProgress(true);
        await initPaymentGatewayOrder(maxAmount, gatewayStatus);
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
    const body = {
      payerName: await Storage.getItemSync(StorageKeys.NAME),
      payerMobile:
        (await Storage.getItemSync(StorageKeys.MOBILE)) || '9999999999',
      amount: depositCoins,
    };
    const response = await paymentGatewayApi.getPaymentGatewayForm(body);
    console.log('response--->', response);
    const {PreparePOSTForm = '', PGOrderID = '', code = '500'} = response || {};
    if (code === '200') {
      reactotron.log('PreparePOSTForm', PreparePOSTForm);
      reactotron.log('PGOrderID', PGOrderID);
      setPaymentGatewayForm(PreparePOSTForm);
      setPgOrderId(PGOrderID);
      setCurrentTransactionId(PGOrderID);
    }
    setPgProgress(false);
  };

  const prepareUpiIntent = upilink => {
    const arr = upilink.split('&');
    const arr2 = arr.slice(0, arr.length - 2);
    return arr2.join('&') + '&ver=01&mode=4';
  };

  const checkOrderStatus = async () => {
    reactotron.log('checkOrderStatus', pgWaitingStatus);
    if (pgWaitingStatus) {
      const data = {
        OrderID: pgOrderId,
      };
      const response = await paymentGatewayApi.checkOrderStatus(data);
      reactotron.log('response--->', response);
      const {Status, paidAmount = 0} = response;
      if (retryCount >= 10) {
        setPgWaitingStatus(false);
        setRetryCount(0);
        setPaymentStatus(false);
        navigation.dispatch(resetAction);
      } else {
        if (
          Status === 'SUCCESS' &&
          parseFloat(paidAmount) >= parseFloat(depositCoins)
        ) {
          setPaymentStatus(true);
          setPgWaitingStatus(false);
          setRetryCount(0);
          handlePaymentGatewayResponse();
        } else {
          alert('Payment failed !!');
          // Payment failed
          setPgWaitingStatus(false);
          setRetryCount(0);
          setPaymentStatus(false);
          setPaymentGatewayForm(null);
          setCurrentTransactionId(null);
          setPgOrderId(null);
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

  const renderPaymentGatway = () => {
    if (!pgOrderId || !paymentGatewayForm) {
      return (
        <LoadingIndicator
          loadingText={
            pgProgress ? 'Please wait....' : 'Waiting for payment ....'
          }
        />
      );
    } else {
      // Define the file path

      // Load the local file in the WebView
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            border: 1,
          }}>
          <WebView
            startInLoadingState={true}
            scalesPageToFit={true}
            style={{
              width: screenWidth - 20,
              height: screenHeight - 200,
            }}
            originWhitelist={['*']}
            source={{html: paymentGatewayForm}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onNavigationStateChange={navState => {
              // if (navState.url.includes('SabPaisaCallbk')) {
              //   setPgWaitingStatus(true);
              //   setRetryCount(0);
              // }
            }}
            injectedJavaScript={`
  (function() {
    var attemptClick = setInterval(function() {
      var submitButton = document.getElementById('submitButton');
      if (submitButton) {
        submitButton.click();
        clearInterval(attemptClick);
      }
    }, 100);
  })();
`}
          />
        </View>
      );
    }
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
          {!enableGateway && (
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
          : renderPaymentGatway()}
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
