import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import Colors from '../../../Theams/Colors';
import sendOTP from '../Controllers/LoginController'
import LoginController from "../Controllers/LoginController";
import authKey from "../../Common/JWT";
import {CommonActions} from "@react-navigation/native";

const ForgotPassWordUI = props => {
  let [otp, setOtp] = useState('');
  let [otpRequest, setOtpRequest] = useState(false);
  let [phone,setPhone] =useState('');
  const [otpSession, setOtpSession] = React.useState('');

  const sendOtpAndRedirect = async (number) => {
    if (number.length == 10) {
      const optSession = await LoginController.sendOTP(number);
      setOtpSession(optSession.Details);
    } else {
      alert('Enter 10 digit phone number');
    }
  };

  const verifyOtp = async (otp) => {
    const verifyOtpSession = await LoginController.verifyOtp(otpSession, otp);
    if (verifyOtpSession.Status === 'Success') {
       //updatePassword
      //const passwordChange = await LoginController.updatePassword(phone, password);
    }else{
      alert('Invalid OTP');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Please enter your Phone Number</Text>
      {!otpRequest && (
        <Input
          style={styles.textInput}
          label={'Phone Number'}
          onChange={(value) => {
            setPhone(value);
          }}
          keyboardType={'numeric'}
          inputContainerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
        />
      )}
      {otpRequest && (
        <OTPInputView
          style={styles.otpInputView}
          pinCount={4}
          codeInputFieldStyle={styles.codeInputField}
          onCodeChanged={code => {
            setOtp(code);
          }}
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
            if(!otpRequest){

              sendOtpAndRedirect(phone).then(r => setOtpRequest(true));
            }else{
              verifyOtp(otp)
            }
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
