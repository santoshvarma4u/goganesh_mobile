/* eslint-disable no-alert */
import {Input} from '@rneui/themed';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import authKey from '../../Common/JWT';
import {Typography} from '../../Common/Text';
import sendOTP from '../Controllers/LoginController';
import LoginController from '../Controllers/LoginController';

const ForgotPassWordUI = props => {
  const {phone: routePhone, type = ''} = props?.route?.params || {};
  let [otp, setOtp] = useState('');
  let [otpRequest, setOtpRequest] = useState(false);
  let [phone, setPhone] = useState(routePhone || '');
  const [otpSession, setOtpSession] = React.useState('');
  const [resetPassword, setResetPassword] = useState(false);

  // otp
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState();

  const sendOtpAndRedirect = async number => {
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
      if (type === 'profile') {
        props.navigation.navigate('Profile');
        alert('Password updated successfully');
      } else {
        props.navigation.pop();
        alert('Password updated successfully, please login again');
      }
    } else {
      alert('Password Update failed');
    }
  };

  return resetPassword ? (
    <View style={styles.container}>
      <Typography style={styles.mainText}>Reset Your Password</Typography>
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
          <Typography style={{color: 'black', fontSize: 16}}>
            Update Password
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {!otpRequest && (
        <>
          <Typography style={styles.mainText}>
            Please enter your Phone Number
          </Typography>
          <Input
            style={styles.textInput}
            label={'Phone Number'}
            value={phone}
            onChangeText={value => {
              setPhone(value);
            }}
            keyboardType={'numeric'}
            inputContainerStyle={styles.containerStyle}
            labelStyle={styles.labelStyle}
          />
        </>
      )}
      {otpRequest && (
        <>
          <Typography style={styles.mainText}>Please enter OTP</Typography>
          <OTPInputView
            style={styles.otpInputView}
            pinCount={4}
            codeInputFieldStyle={styles.codeInputField}
            onCodeChanged={code => {
              setOtp(code);
            }}
          />
        </>
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
          <Typography style={{color: 'black', fontSize: 16}}>
            {!otpRequest ? 'Request OTP' : 'Submit OTP'}
          </Typography>
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
