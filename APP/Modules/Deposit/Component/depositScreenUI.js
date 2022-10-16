import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {Divider, Icon} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Clipboard,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {ProgressBar} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import CONSTANTS from '../../../Constants';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import DepositController from '../Controller/depositController';
import styles from './Styles';
function DepositScreen({route}) {
  const [progress, setProgress] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const payeeDetils = DepositController.getPayeeDetails();
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: 'Home'}],
  });
  const [uid, setUid] = useState('');
  const {
    sdid,
    planType,
    planMoney,
    paymentType,
    userName,
    depositCoins,
    requestStatus,
  } = route.params;
  const navigation = useNavigation();
  const payee = payeeDetils.data.filter(
    data => data.paymenttype == paymentType,
  );
  useEffect(() => {
    getUID();
  }, []);

  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);
      setUid(UID);
    } catch (error) {}
  };
  const [filePath, setFilePath] = useState('');
  const setImageUpLoadProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total,
    );
    setUploadProgress(percentCompleted);
  };
  const submitPayment = () => {
    if (filePath.length <= 0) {
      return alert('please upload payment reference image');
    }
    setProgress(true);
    if (requestStatus === 'new') {
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
        navigation.dispatch(resetAction);
      });
    } else if (requestStatus === 'wallet') {
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
      ).then(data => {
        navigation.dispatch(resetAction);
      });
    }
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
      maxWidht: 150,
      maxHeight: 250,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
        alert(response.customButton);
      } else {
        let source = response;
        setFilePath(source);
        setIsImageLoading(true);
        setTimeout(() => {
          setIsImageLoading(false);
        }, 3000);
      }
    });
  };

  if (paymentType === 'Bank') {
    return (
      <View style={styles.containerMain}>
        {payee.map((data, index) => {
          return (
            <View style={styles.containerMain}>
              <View style={styles.depositTitle}>
                <Typography style={{color: Colors.appBlackColor}}>
                  Send Payment and Upload ScreenShot
                </Typography>
              </View>
              <View style={styles.offersContainer}>
                <View style={styles.depositDetailsCardForBank}>
                  <Typography style={styles.depositTitile}>
                    Send INR {planMoney} to FG Punt on {paymentType}
                  </Typography>
                  <Divider style={{backgroundColor: 'black', height: 5}} />
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      {paymentType} Account Number
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {' '}
                      {data.paymentkey}
                    </Typography>
                    <TouchableOpacity
                      style={{color: 'white', marginTop: 10}}
                      onPress={() => {
                        Clipboard.setString(data.paymentkey);
                      }}>
                      <Icon name="content-copy" color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      {paymentType} IFSC Code
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {data.IFSC}
                    </Typography>
                    <TouchableOpacity
                      style={{color: 'white', marginTop: 10}}
                      onPress={() => {
                        Clipboard.setString(data.paymentkey);
                      }}>
                      <Icon name="content-copy" color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      Amount To Deposit
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {planMoney}
                    </Typography>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      {paymentType} Display name
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {data.paymentname}
                    </Typography>
                    <TouchableOpacity
                      style={{color: 'white', marginTop: 10}}
                      onPress={() => {
                        Clipboard.setString(data.paymentkey);
                      }}>
                      <Icon name="content-copy" color="white" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      {paymentType} Account Type{' '}
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {data.accountType}
                    </Typography>
                  </View>
                </View>
                <View style={styles.depostScreenshotCard}>
                  {filePath.uri ? (
                    <Image
                      source={{uri: filePath.uri}}
                      style={styles.imageStyle}
                    />
                  ) : (
                    <Icon
                      name="add-to-photos"
                      color={Colors.appPrimaryColor}
                      size={48}
                      onPress={() => chooseFile()}
                    />
                  )}
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={() => chooseFile()}>
                    <Typography style={styles.textStyleButton} variant="H1">
                      Upload
                    </Typography>
                    <Typography style={styles.textStyle2}>
                      payment screenshot here
                    </Typography>
                  </TouchableOpacity>
                  {/*<Typography style={styles.textStyle}>{filePath.uri}</Typography>*/}
                </View>
                <TouchableOpacity
                  disabled={isImageLoading}
                  style={{
                    backgroundColor: Colors.appPrimaryColor,
                    paddingVertical: 10,
                    paddingHorizontal: 100,
                    borderRadius: 10,
                    marginTop: 50,
                  }}
                  onPress={() => {
                    submitPayment();
                  }}>
                  <Typography>
                    {isImageLoading ? 'Please wait....' : 'Submit Payment'}
                  </Typography>
                </TouchableOpacity>
                {uploadProgress > 0 && (
                  <ProgressBar
                    progress={uploadProgress}
                    color={Colors.appPrimaryColor}
                    width={200}
                    height={10}
                  />
                )}
                {progress ? (
                  <ActivityIndicator
                    animating={true}
                    size="large"
                    color="white"
                  />
                ) : (
                  <Typography>''</Typography>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <View style={styles.containerMain}>
        {payee.map((data, index) => {
          return (
            <View style={styles.offersContainer}>
              <View style={styles.depositTitle}>
                <Typography
                  variant="title"
                  style={{color: Colors.appWhiteColor, textAlign: 'center'}}>
                  Send Payment & Upload ScreenShot
                </Typography>
              </View>
              <View style={styles.depositDetailsCard}>
                <Typography style={styles.depositTitile}>
                  Send INR {planMoney} to FG Punt on {data.paymentkey}
                </Typography>
                <Divider
                  style={{
                    backgroundColor: Colors.appWhiteColor,
                    marginTop: 5,
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    {paymentType} Number
                  </Typography>
                  <Typography variant="H4" style={styles.phoneNumber}>
                    {data.paymentkey}
                  </Typography>
                  <TouchableOpacity
                    style={{color: 'white', marginTop: 10}}
                    onPress={() => {
                      Clipboard.setString(data.paymentkey);
                    }}>
                    <Icon name="content-copy" color="white" size={20} />
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    Amount To Deposit
                  </Typography>
                  <Typography variant="H4" style={styles.phoneNumber}>
                    {planMoney || depositCoins}
                  </Typography>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    {paymentType} Display name
                  </Typography>
                  <Typography variant="H4" style={styles.phoneNumber}>
                    {data.paymentname}
                  </Typography>
                </View>
              </View>
              <Typography variant="title" style={styles.depositTitile}>
                Attach Payment Screenshot
              </Typography>
              <View style={styles.depostScreenshotCard}>
                {filePath.uri ? (
                  <Image
                    source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                ) : (
                  <Icon
                    name="add-to-photos"
                    color={Colors.appPrimaryColor}
                    size={48}
                    onPress={() => chooseFile()}
                  />
                )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => chooseFile()}>
                  <Typography style={styles.textStyleButton} variant="H1">
                    Upload
                  </Typography>
                  <Typography style={styles.textStyle2}>
                    payment screenshot here
                  </Typography>
                </TouchableOpacity>
                {/*<Typography style={styles.textStyle}>{filePath.uri}</Typography>*/}
              </View>
              <TouchableOpacity
                disabled={isImageLoading}
                style={{
                  backgroundColor: Colors.appPrimaryColor,
                  paddingVertical: 10,
                  paddingHorizontal: 100,
                  borderRadius: 10,
                  marginTop: 50,
                }}
                onPress={() => {
                  submitPayment();
                }}>
                <Typography>
                  {isImageLoading ? 'Please wait....' : 'Submit Payment'}
                </Typography>
              </TouchableOpacity>
              {uploadProgress > 0 && (
                <ProgressBar
                  progress={uploadProgress}
                  color={Colors.appPrimaryColor}
                  width={200}
                  height={10}
                />
              )}
              {progress ? (
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color="white"
                />
              ) : (
                <Typography>''</Typography>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
export default DepositScreen;
