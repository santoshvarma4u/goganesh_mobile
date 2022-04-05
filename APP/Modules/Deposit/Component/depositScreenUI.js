import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import DepositController from '../Controller/depositController';
import styles from './Styles';
function DepositScreen({route}) {
  const [progress, setProgress] = useState(false);

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

  const submitPayment = () => {
    if (filePath.length <= 0) {
      return alert('please upload payment reference image');
    }
    setProgress(true);
    if (requestStatus === 'new') {
      DepositController.submitData(
        parseInt(uid),
        sdid,
        planType,
        paymentType,
        'Pending',
        filePath,
        userName,
        depositCoins,
      ).then(data => {
        DepositController.submitIntialDeposit(
          parseInt(uid),
          sdid,
          paymentType,
          depositCoins,
          'CR',
          filePath,
        ).then(data => {});
        setProgress(false);

        alert(data.status);
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
      ).then(data => {
        '';

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
                    Send INR {planMoney} to GANESH on {paymentType}
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
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Typography style={styles.depositTitile}>
                      {paymentType} IFSC Code
                    </Typography>
                    <Typography style={styles.phoneNumber}>
                      {data.IFSC}
                    </Typography>
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
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={() => chooseFile()}>
                    <Typography style={styles.textStyle}>
                      Choose Image
                    </Typography>
                  </TouchableOpacity>

                  <Image
                    source={{uri: filePath.uri}}
                    style={{padding: 5, width: 150, height: 200}}
                  />
                  <Typography style={styles.textStyle}>
                    {filePath.uri}
                  </Typography>
                  <Button
                    title="submit"
                    onPress={() => {
                      submitPayment();
                    }}
                  />
                </View>
                <ActivityIndicator
                  animating={progress}
                  size="large"
                  color="white"
                />
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
                <Typography style={{color: Colors.appBlackColor}}>
                  Send Payment & Upload ScreenShot
                </Typography>
              </View>

              <View style={styles.depositDetailsCard}>
                <Typography style={styles.depositTitile}>
                  Send INR {planMoney} to Go Ganesh on {data.paymentkey}
                </Typography>

                <Divider style={{backgroundColor: 'black', height: 5}} />
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    {paymentType} Number
                  </Typography>
                  <Typography style={styles.phoneNumber}>
                    {data.paymentkey}
                  </Typography>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    Amount To Deposit
                  </Typography>
                  <Typography style={styles.phoneNumber}>
                    {planMoney || depositCoins}
                  </Typography>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Typography style={styles.depositTitile}>
                    {paymentType} Display name
                  </Typography>
                  <Typography style={styles.phoneNumber}>
                    {data.paymentname}
                  </Typography>
                </View>
              </View>
              <Typography style={styles.depositTitile}>
                Attach Payment Screenshot
              </Typography>
              <View style={styles.depostScreenshotCard}>
                <View style={{margin: 20}}>
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
                    />
                  )}
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.buttonStyle}
                  onPress={() => chooseFile()}>
                  <Typography style={styles.textStyleButton}>Upload</Typography>
                  <Typography style={styles.textStyle2}>
                    payment screenshot here
                  </Typography>
                </TouchableOpacity>
                {/*<Typography style={styles.textStyle}>{filePath.uri}</Typography>*/}
              </View>
              <TouchableOpacity
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
                <Typography>Submit</Typography>
              </TouchableOpacity>
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
