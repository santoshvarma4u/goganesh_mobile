import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import Colors from '../../../Theams/Colors';

const ForgotPassWordUI = props => {
  let [otp, setOtp] = useState('');
  let [otpRequest, setOtpRequest] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Please enter your Phone Number</Text>
      {!otpRequest && (
        <Input
          style={styles.textInput}
          label={'Phone Number'}
          onChange={() => {}}
          keyboardType={'numeric'}
          inputContainerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
        />
      )}
      {otpRequest && (
        <OTPInputView
          style={styles.otpInputView}
          codeInputFieldStyle={styles.codeInputField}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.appPrimaryColor,
            paddingHorizontal: 60,
            paddingVertical: 10,
            marginHorizontal: 10,
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={() => {
            setOtpRequest(true);
          }}
          underlayColor="transparent">
          <Text style={{color: 'black', fontSize: 16}}>
            {!otpRequest ? 'Request OTP' : 'Submit OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    padding: 20,
    backgroundColor: Colors.backgroundColor,
  },
  textInput: {
    width: '80%',
    color: Colors.appBlackColor,
  },
  containerStyle: {
    backgroundColor: Colors.appWhiteColor,
    borderRadius: 5,
  },
  mainText: {
    fontSize: 18,
    color: Colors.appWhiteColor,
    marginBottom: 20,
  },
  labelStyle: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: Colors.appWhiteColor,
  },
  otpInputView: {
    width: '80%',
    color: Colors.appWhiteColor,
    height: 80,
  },
  codeInputField: {
    color: Colors.appWhiteColor,
    fontSize: 16,
  },
});

export default ForgotPassWordUI;
