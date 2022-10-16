import {CommonActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  View,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {Button, IconButton} from 'react-native-paper';
import {RNS3} from 'react-native-upload-aws-s3';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import CONSTANTS from '../../../Constants';
import useAPI from '../../../Hooks/useAPI';
import payeeApi from '../../../Network/payee/payeeApi';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import {setUserBanks as reduxSetUserBank} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import withPreventDoubleClick from '../../../Utils/withPreventDoubleClick';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import depositController from '../Controller/depositController';
import DepositController from '../Controller/depositController';

const DepositContainerV2 = props => {
  const [amount, setAmount] = useState(' ');
  const [progress, setProgress] = useState(false);
  const [uid, setUid] = useState('');
  const {
    sdid,
    planType,
    planMoney,
    userName,
    depositCoins,
    requestStatus,
  } = props.route.params;
  // gpay,phonepe,bank

  const [selectedMedium, setSelectedMedium] = useState('bank');
  const [filePath, setFilePath] = useState('');
  const [phonePe, setPhonePe] = useState('');
  const [googlePay, setGooglePay] = useState('');
  const [bank, setBank] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [paymentType, setPaymentType] = useState('Bank');
  const [walletBalance, setWalletBalance] = useState(props.wallet);
  const [isCreatingId, setIsCreatingID] = useState(false);

  const ButtonEx = withPreventDoubleClick(Button);

  const {data, request, loading, error} = depositController.getPayeeDetails();
  useEffect(() => {
    setAmount(depositCoins);
    getUID();
  }, []);

  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {}
  };
  const navigation = useNavigation();

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });

  const setImageUpLoadProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    setUploadProgress(percentCompleted);
  };

  useEffect(() => {
    if (data) {
      data.map(item => {
        if (item.paymenttype === 'Google Pay') {
          setGooglePay(item.paymentkey);
        } else if (item.paymenttype === 'Phone Pay') {
          setPhonePe(item.paymentkey);
        } else if (item.paymenttype === 'Bank') {
          setBank(item);
        }
      });
    }
  }, [data]);

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
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        let source = response;
        setFilePath(source);
      }
    });
  };

  const handlePayment = () => {
    // Handle Payment
    if (filePath.length <= 0) {
      return alert('please upload payment reference image');
    }
    setIsCreatingID(true);
    setProgress(true);
    if (requestStatus === 'wallet') {
      const paymentMethod = paymentType;
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

  return (
    <View style={styles.container}>
      {isCreatingId ? (
        <LoadingIndicator loadingText={'Please wait....'} />
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Typography variant="H2" style={styles.text}>
          Pay amount ₹ {amount}
        </Typography>
        <View style={styles.payRow}>
          <Typography style={styles.text}>Pay manually</Typography>
        </View>
        <View style={styles.underline} />
        <View style={styles.paymentItems}>
          <TouchableOpacity
            style={[
              styles.paymentItem,
              {
                backgroundColor:
                  selectedMedium === 'gpay'
                    ? Colors.appBlackColor
                    : Colors.appBlackColorLight,
              },
            ]}
            onPress={() => {
              setSelectedMedium('gpay');
              setPaymentType('Google Pay');
            }}>
            <GooglePaySvg />
            <Typography style={styles.textCenter}>Google Pay</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentItem,
              {
                backgroundColor:
                  selectedMedium === 'phonepe'
                    ? Colors.appBlackColor
                    : Colors.appBlackColorLight,
              },
            ]}
            onPress={() => {
              setSelectedMedium('phonepe');
              setPaymentType('Phone Pay');
            }}>
            <PhonePeSvg />
            <Typography style={styles.textCenter}>PhonePe</Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentItem,
              {
                backgroundColor:
                  selectedMedium === 'bank'
                    ? Colors.appBlackColor
                    : Colors.appBlackColorLight,
              },
            ]}
            onPress={() => {
              setSelectedMedium('bank');
              setPaymentType('Bank');
            }}>
            <Icon
              name="bank"
              size={48}
              type={'font-awesome'}
              color={Colors.buttonBackgroundColor}
            />
            <Typography style={styles.textCenter}>Bank </Typography>
          </TouchableOpacity>
        </View>
        {/*
            show details below depending on selected medium
        */}
        <View style={styles.mediumContainer}>
          {selectedMedium === 'bank' ? (
            <>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{bank.paymentname}</Typography>
                <Icon
                  name="content-copy"
                  color="white"
                  size={18}
                  onPress={() => {
                    Clipboard.setString(bank.paymentname || '');
                  }}
                />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account No:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{bank.paymentkey}</Typography>
                <Icon
                  name="content-copy"
                  color="white"
                  size={18}
                  onPress={() => {
                    Clipboard.setString(bank.paymentkey || '');
                  }}
                />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>IFSC Code:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{bank.IFSC}</Typography>
                <Icon
                  name="content-copy"
                  color="white"
                  size={18}
                  onPress={() => {
                    Clipboard.setString(bank.IFSC || '');
                  }}
                />
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Account Type:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{bank.accountType}</Typography>
              </View>
              <View style={styles.bankItems}>
                <Typography style={styles.text}>Bank:</Typography>
                <View style={styles.flex1} />
                <Typography style={styles.text}>{bank.branch}</Typography>
              </View>
            </>
          ) : (
            <>
              <Typography style={styles.text}>
                {selectedMedium === 'gpay' ? 'Google Pay' : 'PhonePe'}
              </Typography>
              <View style={{flexDirection: 'row'}}>
                <Typography style={styles.text} variant="H3">
                  {selectedMedium === 'gpay' ? googlePay : phonePe}
                </Typography>
                <Icon
                  name="content-copy"
                  color="white"
                  size={18}
                  onPress={() => {
                    Clipboard.setString(
                      selectedMedium === 'gpay' ? googlePay : phonePe,
                    );
                  }}
                />
              </View>
            </>
          )}
        </View>

        {/*
        upload component for proof of payment
      */}

        {filePath.uri ? (
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
              name="add-to-photos"
              color={Colors.appPrimaryColor}
              size={48}
            />
            <Typography style={styles.textCenter} variant="H4">
              Upload
            </Typography>
            <Typography style={styles.textCenter}>
              Payment Screenshot here
            </Typography>
            {/*<Typography style={styles.textStyle}>{filePath.uri}</Typography>*/}
          </TouchableOpacity>
        )}

        <View>
          <ButtonEx
            mode="contained"
            disabled={!filePath.uri || progress}
            onPress={handlePayment}>
            <Typography>Confirm</Typography>
          </ButtonEx>
        </View>
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
  flex1: {
    flex: 1,
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
    marginTop: 14,
  },
  bankItems: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 6,
  },
  underline: {
    borderBottomColor: Colors.appPrimaryColor,
    borderBottomWidth: 3,
    marginVertical: 10,
    width: 60,
  },
  paymentItems: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
  },
  paymentItem: {
    height: 80,
    width: '30%',
    borderColor: Colors.appWhiteColor + 50,
    borderWidth: 1,
    margin: 2,
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  mediumContainer: {
    marginVertical: 10,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    padding: 8,
  },
  depositScreenshotCard: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.appPrimaryColor,
  },
  imageStyle: {
    padding: 5,
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
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
