/* eslint-disable no-alert */
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements/dist/input/Input';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import authKey from '../../Common/JWT';
import sendOTP from '../Controllers/LoginController';
import LoginController from '../Controllers/LoginController';

const ForgotPassWordUI = props => {
  let [otp, setOtp] = useState('');
  let [otpRequest, setOtpRequest] = useState(false);
  let [phone, setPhone] = useState('');
  const [otpSession, setOtpSession] = React.useState('');
  const [resetPassword, setResetPassword] = useState(false);

  // otp
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState();

  const sendOtpAndRedirect = async number => {
    reactotron.log('sendOtpAndRedirect', number);
    return new Promise(async (resolve, reject) => {
      if (number.length === 10) {
        const optSession = await LoginController.sendOTP(number);
        setOtpSession(optSession.Details);
        resolve();
      } else {
        reject();
        alert('Enter 10 digit phone number');
      }
    });
  };

  const verifyOtp = async otpInput => {
    const verifyOtpSession = await LoginController.verifyOtp(
      otpSession,
      otpInput,
    );
    if (verifyOtpSession.Status === 'Success') {
      setResetPassword(true);
    } else {
      alert('Invalid OTP');
    }
  };

  const updatePassword = async pass => {
    const updatePass = await LoginController.updatePassword(phone, pass);
    if (updatePass.message === 'USER was updated successfully.') {
      setResetPassword(true);
      props.navigation.pop();
    } else {
      alert('Password Update failed');
    }
  };

  return resetPassword ? (
    <View style={styles.container}>
      <Text style={styles.mainText}>Reset Your Password</Text>
      <Input
        style={styles.textInput}
        label={'New Password'}
        onChangeText={value => {
          setPassword(value);
        }}
        secureTextEntry
        inputContainerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
      />
      <Input
        style={styles.textInput}
        label={'Confirm Password'}
        onChangeText={value => {
          setNewPassword(value);
        }}
        secureTextEntry
        inputContainerStyle={styles.containerStyle}
        labelStyle={styles.labelStyle}
      />
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
        }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            if (password === newPassword) {
              updatePassword(password);
            } else {
              Alert.alert('Password mismatch');
            }
          }}
          underlayColor="transparent">
          <Text style={{color: 'black', fontSize: 16}}>Update Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.mainText}>Please enter your Phone Number</Text>
      {!otpRequest && (
        <Input
          style={styles.textInput}
          label={'Phone Number'}
          onChangeText={value => {
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
          style={styles.buttonStyle}
          onPress={() => {
            if (!otpRequest) {
              sendOtpAndRedirect(phone).then(r => setOtpRequest(true));
            } else {
              verifyOtp(otp);
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
    textAlign: 'left',
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
  buttonStyle: {
    backgroundColor: Colors.appPrimaryColor,
    paddingHorizontal: 60,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default ForgotPassWordUI;
