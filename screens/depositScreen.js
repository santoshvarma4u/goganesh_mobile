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
function DepositScreen({route}) {
  const {sdid, planMoney, paymentType} = route.params;

  const navigation = useNavigation();
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

  return (
    <View style={styles.containerMain}>
      <View></View>
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
            <Text style={styles.depositTitile}>{paymentType} Display name</Text>
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
          <Button title="submit" />
        </View>
      </View>
    </View>
  );
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
    flexDirection: 'column',
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
  depostScreenshotCard: {
    flex: 0.7,
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
    margin: 5,
  },
});
export default DepositScreen;
