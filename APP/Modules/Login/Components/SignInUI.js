import React from 'react';
import {Text, View, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import styles from './Styles';
import LoginController from '../Controllers/LoginController';
function SignIn() {
  const navigation = useNavigation();
  const [number, onChangeNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpSession, setOtpSession] = React.useState('');
  const [otpverifyStatus, setOtpVerifyStatus] = React.useState('');

  // otp
  const verifyOtp = async () => {
    console.log(otpSession, otp);
    const verifyOtpSession = await LoginController.verifyOtp(otpSession, otp);
    setOtpVerifyStatus(verifyOtpSession.Status);
    if (otpverifyStatus === 'Success') {
      const checkUser = await LoginController.checkUser(number);
      if (checkUser.data.message === 'user not found') {
        navigation.navigate('SignUp', {phoneNumber: number});
      } else navigation.navigate('App');
    }
  };
  const sendOtpAndRedirect = async () => {
    console.log('ok sendOtpAndRedirect');
    if (number.length == 10) {
      const optSession = await LoginController.sendOTP(number);
      setOtpSession(optSession.Details);
    } else {
      alert('enter 10 digits');
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.offersContainer}>
        <View style={styles.SignInTitle}>
          <Text>SingIn</Text>
        </View>
        <View style={styles.SignINCard}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Enter Phone Number"
            keyboardType="numeric"
          />
        </View>

        <OTPInputView
          style={{width: '80%', height: 100}}
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
        />
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
          }}>
          <View style={{margin: 10}}>
            <Button title="Send Otp" onPress={sendOtpAndRedirect}></Button>
          </View>
          <View style={{margin: 10}}>
            <Button title="verify and proceed" onPress={verifyOtp}></Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SignIn;
