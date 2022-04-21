import {CommonActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import SplashLogo from '../../../Assets/svgs/SplashLogo';
import FGLOGO2 from '../../../Assets/svgs/fglogo2';
import authKey from '../../../Modules/Common/JWT';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import CommonTextInput from '../../Common/CommonTextInput';
import ErrorPage from '../../Common/ErrorPage';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import LoginController from '../Controllers/LoginController';
import styles from './Styles';
function SignIn() {
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpSession, setOtpSession] = React.useState('');
  const [otpverifyStatus, setOtpVerifyStatus] = React.useState('');
  const [otpSentStatus, setOtpSentStatus] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  // otp
  const getToken = async () => {
    let tok = await Storage.getItemSync(StorageKeys.JWT);

    return tok;
  };

  const verifyPassword = async () => {
    if (number.length < 10 || password.length < 1) {
      setIsError(true);
      return;
    }
    const checkUser = await LoginController.checkUser(number, password);

    if (checkUser.data.message === 'wrong password') {
      alert('Wrong password');
      // navigation.navigate('SignUp', {phoneNumber: number});
    } else if (checkUser.data.message === 'user not found') {
      alert('no user found');
    } else {
      if (authKey.usertype == 'user') {
        authKey.token = await getToken();
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
        navigation.dispatch(resetAction);
      } else {
        alert('access denied');
      }
    }
  };

  const verifyOtp = async () => {
    const verifyOtpSession = await LoginController.verifyOtp(otpSession, otp);
    setOtpVerifyStatus(verifyOtpSession.Status);
    if (verifyOtpSession.Status === 'Success') {
      const checkUser = await LoginController.checkUser(number);
      if (checkUser.data.message === 'user not found') {
        navigation.navigate('SignUp', {phoneNumber: number});
      } else {
        if (authKey.usertype == 'user') {
          authKey.token = await getToken();
          const resetAction = CommonActions.reset({
            index: 0,
            routes: [{name: 'App'}],
          });
          navigation.dispatch(resetAction);
        } else {
          alert('access denied');
        }
      }
    }
  };
  const sendOtpAndRedirect = async () => {
    if (number.length == 10) {
      setOtpSentStatus(true);
      const optSession = await LoginController.sendOTP(number);
      setOtpSession(optSession.Details);
    } else {
      alert('enter 10 digits');
    }
  };

  return (
    <View style={styles.containerMain}>
      {/*<ScrollView>*/}
      {!isError ? (
        <>
          <View
            style={{
              width: '100%',
              flex: 0.5,
              paddingTop: 50,
              alignItems: 'center',
              backgroundColor: '#000',
            }}>
            <FGLOGO2 width={200} height={200} />
          </View>
          <View style={styles.offersContainer}>
            <View style={styles.SignINCard}>
              <View style={{flex: 1}}>
                <CommonTextInput
                  onChangeText={onChangeNumber}
                  value={number}
                  label="Enter Phone Number"
                  keyboardType="numeric"
                  maxLength={10}
                />
                <CommonTextInput
                  onChangeText={onChangePassword}
                  value={password}
                  secureTextEntry={true}
                  label="Enter password"
                  maxLength={10}
                />
              </View>
              {/* <TouchableOpacity
            style={styles.sendOtpButton}
            onPress={sendOtpAndRedirect}
            underlayColor="transparent">
            <Typography style={{color: '#fff'}}>
              {' '}
              {otpSentStatus ? 'Resend OTP' : 'Send OTP'}{' '}
            </Typography>
          </TouchableOpacity> */}
            </View>
            {otpSentStatus ? (
              <Typography style={{color: Colors.appWhiteColor, marginTop: 10}}>
                OTP Sent Successfully, Please enter OTP below
              </Typography>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 40,
              }}>
              <View style={{flex: 1}} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPassword');
                }}
                underlayColor="transparent">
                <Typography
                  style={{
                    color: Colors.appWhiteColor,
                    fontSize: 14,
                    marginVertical: 10,
                  }}>
                  Forgot password ?
                </Typography>
              </TouchableOpacity>
            </View>
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
                onPress={verifyPassword}
                underlayColor="transparent">
                <Typography style={{color: 'white', fontSize: 16}}>
                  Sign In
                </Typography>
              </TouchableOpacity>
            </View>

            <View>
              <Typography
                style={{
                  fontSize: 15,
                  color: Colors.appWhiteColor,
                  marginVertical: 30,
                }}>
                --- OR ---
              </Typography>
            </View>

            <TouchableOpacity
              style={{
                paddingHorizontal: 60,
                paddingVertical: 10,
                marginHorizontal: 10,
                marginTop: 20,
              }}
              onPress={() => {
                navigation.navigate('SignUp', {phoneNumber: number});
              }}
              underlayColor="transparent">
              <Typography style={{color: Colors.appWhiteColor, fontSize: 16}}>
                Are you a New User ?
              </Typography>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ErrorPage
          message={'Invalid Username/Password'}
          color={Colors.appPrimaryColor}
          onRetryPress={() => {
            setIsError(false);
          }}
        />
      )}
    </View>
  );
}

export default SignIn;
