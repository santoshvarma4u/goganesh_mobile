import React from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './Styles';
import LoginController from '../Controllers/LoginController';
import Colors from '../../../Theams/Colors';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../../Theams/Images';
import authKey from '../../../Modules/Common/JWT';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
function SignIn() {
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpSession, setOtpSession] = React.useState('');
  const [otpverifyStatus, setOtpVerifyStatus] = React.useState('');
  const [otpSentStatus, setOtpSentStatus] = React.useState(false);

  // otp
  const getToken = async () => {
    let tok = await Storage.getItemSync(StorageKeys.JWT);
    console.log('ppiuytrtiopoiuytyui', tok);
    return tok;
  };

  const verifyPassword = async () => {
    const checkUser = await LoginController.checkUser(number, password);
    console.log('checkuser', checkUser);
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
    console.log('ok sendOtpAndRedirect');
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
      <View style={styles.offersContainer}>
        <View style={styles.SignINCard}>
          <View style={{flex: 1}}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Enter Phone Number"
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={password}
              secureTextEntry={true}
              placeholder="Enter password"
              maxLength={10}
            />
          </View>
          {/* <TouchableOpacity
            style={styles.sendOtpButton}
            onPress={sendOtpAndRedirect}
            underlayColor="transparent">
            <Text style={{color: '#fff'}}>
              {' '}
              {otpSentStatus ? 'Resend OTP' : 'Send OTP'}{' '}
            </Text>
          </TouchableOpacity> */}
        </View>
        {otpSentStatus ? (
          <Text style={{color: '#fff', marginTop: 10}}>
            OTP Sent Successfully, Please enter OTP below
          </Text>
        ) : null}
        {/* <OTPInputView
          style={{width: '80%', height: 120}}
          pinCount={4}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setOtp(code);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(code);
          }}
        /> */}
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
              borderRadius: 10,
            }}
            onPress={verifyPassword}
            underlayColor="transparent">
            <Text style={{color: 'black', fontSize: 16}}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.appPrimaryColor,
              paddingHorizontal: 60,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('SignUp', {phoneNumber: number});
            }}
            underlayColor="transparent">
            <Text style={{color: 'black', fontSize: 16}}>New User</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LinearGradient
        colors={['#000', Colors.appPrimaryColor]}
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          borderRadius: 15,
        }}>
        <Image
          source={images.bottombg}
          style={{
            width: '100%',
            flex: 1,
          }}
          resizeMode={'stretch'}
        />
      </LinearGradient>
      {/*</ScrollView>*/}
    </View>
  );
}

export default SignIn;
