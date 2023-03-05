import React from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../../Theams/Colors';

const phoneRegExp = /^((\\+91-?)|0)?[0-9]{10}$/;

import CommonTextInput from '../../Common/CommonTextInput';
import PhoneInput from '../../Common/PhoneInput';
import {Typography} from '../../Common/Text';

const validatePhone = value => {
  if (!value) {
    return 'Phone number is required *';
  } else if (value.length < 10) {
    return 'Invalid phone number';
  } else if (!phoneRegExp.test(value)) {
    return 'Invalid phone number';
  }
  return false;
};

const UserOtpLogin = ({session, onOtpRequest, onResendOtp, onVerifyOtp}) => {
  const [phone, setPhone] = React.useState('');
  const [phoneError, setPhoneError] = React.useState(false);
  const [otp, setOtp] = React.useState('');

  return (
    <View style={styles.container}>
      {!session ? (
        <>
          <PhoneInput
            placeholder="Phone number"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
            textInputProps={{
              error: !!phoneError,
              helperText: validatePhone(phone) ?? '',
            }}
          />
          <Button
            mode="contained"
            color={Colors.appBlackColorLight}
            style={{width: '50%', alignSelf: 'center', marginTop: 20}}
            uppercase={false}
            onPress={() => {
              setPhoneError(validatePhone(phone));
              if (!validatePhone(phone)) {
                onOtpRequest();
              }
            }}>
            Request OTP
          </Button>
        </>
      ) : null}
      {session ? (
        <>
          <Typography
            color={Colors.appPrimaryColor}
            variant="H3"
            style={{marginVertical: 20}}>
            Enter OTP
          </Typography>
          <CommonTextInput
            label={`We have sent an OTP to +91${session}`}
            placeholder="****"
            keyboardType="numeric"
            value={otp}
            onChangeText={setOtp}
            maxLength={4}
            error={otp.length < 4 ? 'Invalid OTP' : undefined}
          />
          <Pressable
            style={{width: '50%', alignSelf: 'flex-end'}}
            onPress={() => {
              onResendOtp();
            }}>
            <Typography
              color={Colors.appWhiteColor}
              style={{textAlign: 'center'}}>
              Resend OTP ?
            </Typography>
          </Pressable>
          <Button
            mode="contained"
            color={Colors.appBlackColorLight}
            style={{width: '50%', alignSelf: 'center', marginTop: 20}}
            uppercase={false}
            onPress={() => {
              if (otp.length < 4) {
                Alert.alert('Invalid OTP');
                return;
              }
              onVerifyOtp(otp);
            }}>
            Verify OTP
          </Button>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserOtpLogin;
