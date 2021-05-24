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
import styles from './Styles';
import DepositController from '../Controller/depositController';
import * as ImagePicker from 'react-native-image-picker';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
function DepositScreen({route}) {
  const [progress, setProgress] = useState(false);

  const payeeDetils = DepositController.getPayeeDetails();
  console.log('here');

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
  console.log(payee);
  useEffect(() => {
    getUID();
  }, []);

  const getUID = async () => {
    try {
      let UID = await Storage.getItemSync(StorageKeys.ID);

      setUid(UID);
    } catch (error) {}
  };
  console.log(uid);

  const [filePath, setFilePath] = useState({});

  const submitPayment = () => {
    setProgress(true);
    if (requestStatus === 'new') {
      DepositController.submitData(
        parseInt(uid),
        sdid,
        planType,
        paymentType,
        false,
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
        ).then(data => {
          console.log('both initial deposit and site request done!');
        });
        setProgress(false);

        alert('success');
        navigation.dispatch(resetAction);
      });
    } else {
      console.log('finen dposit woeking');
      const paymentMethod = paymentType;
      DepositController.submitDataForMyID(
        parseInt(uid),
        sdid,
        paymentMethod,
        depositCoins,
        'CR',
        filePath,
      ).then(data => {
        console.log(data);
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
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
                <Text style={{color: 'white'}}>
                  Send Payment and Upload ScreenShot
                </Text>
              </View>

              <View style={styles.offersContainer}>
                <View style={styles.depositDetailsCardForBank}>
                  <Text style={styles.depositTitile}>
                    Send INR {planMoney} to GANESH on {paymentType}
                  </Text>
                  <Divider style={{backgroundColor: 'black', height: 5}} />
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.depositTitile}>
                      {paymentType} Account Number
                    </Text>
                    <Text style={styles.phoneNumber}> {data.paymentkey}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.depositTitile}>
                      {paymentType} IFSC Code
                    </Text>
                    <Text style={styles.phoneNumber}>{data.IFSC}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.depositTitile}>Amount To Deposit</Text>
                    <Text style={styles.phoneNumber}>{planMoney}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.depositTitile}>
                      {paymentType} Display name
                    </Text>
                    <Text style={styles.phoneNumber}>{data.paymentname}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.depositTitile}>
                      {paymentType} Account Type{' '}
                    </Text>
                    <Text style={styles.phoneNumber}>{data.accountType}</Text>
                  </View>
                </View>
                <View style={styles.depostScreenshotCard}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.buttonStyle}
                    onPress={() => chooseFile()}>
                    <Text style={styles.textStyle}>Choose Image</Text>
                  </TouchableOpacity>

                  <Image
                    source={{uri: filePath.uri}}
                    style={{padding: 5, width: 150, height: 200}}
                  />
                  <Text style={styles.textStyle}>{filePath.uri}</Text>
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
                <Text style={{color: 'white'}}>
                  Send Payment & Upload ScreenShot
                </Text>
              </View>

              <View style={styles.depositDetailsCard}>
                <Text style={styles.depositTitile}>
                  Send INR {planMoney} to Go Ganesh on {data.paymentkey}
                </Text>

                <Divider style={{backgroundColor: 'black', height: 5}} />
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.depositTitile}>{paymentType} Number</Text>
                  <Text style={styles.phoneNumber}>{data.paymentkey}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.depositTitile}>Amount To Deposit</Text>
                  <Text style={styles.phoneNumber}>{planMoney}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.depositTitile}>
                    {paymentType} Display name
                  </Text>
                  <Text style={styles.phoneNumber}>{data.paymentname}</Text>
                </View>
              </View>
              <Text style={styles.depositTitile}>
                Attach Payment Screenshot
              </Text>
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
                  <Text style={styles.textStyleButton}>Upload</Text>
                  <Text style={styles.textStyle2}>payment screenshot here</Text>
                </TouchableOpacity>
                {/*<Text style={styles.textStyle}>{filePath.uri}</Text>*/}
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
                <Text>Submit</Text>
              </TouchableOpacity>
              {progress ? (
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color="white"
                />
              ) : (
                <Text>''</Text>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
export default DepositScreen;
