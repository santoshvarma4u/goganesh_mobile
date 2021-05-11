import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import IDsApi from '../../../Network/IDs/IDs';
function DepositScreen({route}) {
  const {sdid, planType, planMoney, paymentType} = route.params;

  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});
  const submitData = async () => {
    const result = await IDsApi.createID(
      1,
      sdid,
      planType,
      paymentType,
      false,
      'xxxxxxxxx',
    );
    if (!result.ok) return alert('failed');
    alert('success');
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
        <View style={styles.offersContainer}>
          <View style={styles.depositTitle}>
            <Text>Send Payment and Upload ScreenShot</Text>
          </View>
          <View style={styles.depositDetailsCardForBank}>
            <Text style={styles.depositTitile}>
              Send INR {planMoney} to GANESH on {paymentType}
            </Text>
            <Divider style={{backgroundColor: 'black', height: 5}} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>
                {paymentType} Account Number
              </Text>
              <Text style={styles.phoneNumber}>XXXXXXXX</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>{paymentType} IFSC Code </Text>
              <Text style={styles.phoneNumber}>XXXXXXXX</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>Amount To Deposit</Text>
              <Text style={styles.phoneNumber}>{planMoney}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>
                {paymentType} Display name
              </Text>
              <Text style={styles.phoneNumber}>Ganesh traders</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>{paymentType} Bank Name </Text>
              <Text style={styles.phoneNumber}>ICICI Current Account</Text>
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
            <Button title="submit" onPress={() => submitData()} />
          </View>
        </View>
      </View>
    );
  } else {
    console.log('222');
    return (
      <View style={styles.containerMain}>
        <View style={styles.offersContainer}>
          <View style={styles.depositTitle}>
            <Text>Send Payment and Upload ScreenShot</Text>
          </View>
          <View style={styles.depositDetailsCard}>
            <Text style={styles.depositTitile}>
              Send INR {planMoney} to GANESH on {paymentType}
            </Text>
            <Divider style={{backgroundColor: 'black', height: 5}} />
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>{paymentType} Number</Text>
              <Text style={styles.phoneNumber}>XXXXXXXX</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>Amount To Deposit</Text>
              <Text style={styles.phoneNumber}>{planMoney}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.depositTitile}>
                {paymentType} Display name
              </Text>
              <Text style={styles.phoneNumber}>anslknalsnl</Text>
            </View>
          </View>
          <View style={styles.depostScreenshotCard}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => chooseFile()}>
              <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>

            <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
            <Text style={styles.textStyle}>{filePath.uri}</Text>
            <Button title="submit" onPress={() => submitData()} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },
  depositTitile: {
    marginTop: 10,
    marginLeft: 10,
  },
  phoneNumber: {
    marginLeft: 'auto',
    marginTop: 10,
  },
  offersContainer: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  depositDetailsCard: {
    flex: 0.25,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  depositDetailsCardForBank: {
    flex: 0.3,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  depostScreenshotCard: {
    flex: 0.65,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },

  depositTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  textStyle: {
    padding: 10,
    color: 'black',
  },
  buttonStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'orange',
  },
  imageStyle: {
    padding: 5,
    width: 150,
    height: 300,
    marginBottom: -15,
  },
});
export default DepositScreen;
