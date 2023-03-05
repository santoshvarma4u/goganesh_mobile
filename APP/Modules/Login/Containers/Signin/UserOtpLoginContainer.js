import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import authKey from '../../../../Modules/Common/JWT';
import Colors from '../../../../Theams/Colors';
import images from '../../../../Theams/Images';
import FGImage from '../../../Common/FGImage';
import Storage from '../../../Common/Storage';
import StorageKeys from '../../../Common/StorageKeys';
import UserOtpLogin from '../../Components/UserOtpLogin';
import LoginController from '../../Controllers/LoginController';

const getToken = async () => {
  let tok = await Storage.getItemSync(StorageKeys.JWT);
  return tok;
};
const UserOtpLoginContainer = props => {
  const [phone, setPhone] = React.useState(null);
  const [optSession, setOptSession] = React.useState(null);
  // props.route.params?.phoneNumber
  const onOtpRequest = async phoneNumber => {
    // Status:Success
    // Details:c65278a1-bb15-11ed-81b6-0200cd936042
    // const session = await LoginController.sendOTP(phoneNumber ?? phone);
    // setOptSession(session.Details);
  };

  const onVerifyOtpAndLogin = async otp => {
    const session = await LoginController.loginWithOtp(optSession, otp, phone);
    if (session.status === 'success') {
      if (authKey.usertype === 'user') {
        authKey.token = await getToken();
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
        props.navigation.dispatch(resetAction);
      }
    } else {
      alert(session.message);
    }
  };

  useEffect(() => {
    const phoneNumber = props.route.params?.phoneNumber;
    if (phoneNumber) {
      setPhone(phoneNumber);
      onOtpRequest(phoneNumber);
    } else {
      setPhone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route.params?.phoneNumber]);

  return (
    <View style={styles.container}>
      <FGImage
        source={images.otplogin}
        style={styles.imageStyle}
        label="Enter OTP"
        resizeMode="contain"
      />
      <UserOtpLogin
        session={phone}
        setSession={setPhone}
        onOtpRequest={onOtpRequest}
        onResendOtp={onOtpRequest}
        onVerifyOtp={onVerifyOtpAndLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBlackColor,
    paddingHorizontal: 20,
  },
  imageStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default UserOtpLoginContainer;
