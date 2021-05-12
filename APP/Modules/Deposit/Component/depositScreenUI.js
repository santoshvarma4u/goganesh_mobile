import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import styles from './Styles';
import DepositController from '../Controller/depositController';
import * as ImagePicker from 'react-native-image-picker';
import Colors from '../../../Theams/Colors';
function DepositScreen({route}) {
  const {sdid, planType, planMoney, paymentType} = route.params;

  const [filePath, setFilePath] = useState({});

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
            <Button
              title="submit"
              onPress={() =>
                DepositController.submitData(
                  1,
                  sdid,
                  planType,
                  paymentType,
                  false,
                  filePath,
                )
              }
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.containerMain}>
        <View style={styles.offersContainer}>
          <View style={styles.depositTitle}>
            <Text style={{color: 'white'}}>
              Send Payment & Upload ScreenShot
            </Text>
          </View>
          <View style={styles.depositDetailsCard}>
            <Text style={styles.depositTitile}>
              Send INR {planMoney} to Go Ganesh on {paymentType}
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
              <Text style={styles.phoneNumber}>Go Ganesh</Text>
            </View>
          </View>
          <Text style={styles.depositTitile}>Attach Payment Screenshot</Text>
          <View style={styles.depostScreenshotCard}>
            <View style={{margin: 20}}>
              <Icon
                name="perm-media"
                color={Colors.appPrimaryColor}
                size={34}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={() => chooseFile()}>
              <Text style={styles.textStyle}>Upload</Text>
              <Text style={styles.textStyle2}>payment screenshot here</Text>
            </TouchableOpacity>
            <Image source={{uri: filePath.uri}} style={styles.imageStyle} />
            <Text style={styles.textStyle}>{filePath.uri}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.appPrimaryColor,
              paddingVertical: 10,
              paddingHorizontal: 100,
              borderRadius: 10,
              marginTop: 50,
            }}
            onPress={() =>
              DepositController.submitData(
                1,
                sdid,
                planType,
                paymentType,
                false,
                filePath,
              )
            }>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default DepositScreen;
