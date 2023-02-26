import {CommonActions, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {Formik} from 'formik';
import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import authKey from '../../../Modules/Common/JWT';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import ErrorPage from '../../Common/ErrorPage';
import PhoneInput from '../../Common/PhoneInput';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import LoginController from '../Controllers/LoginController';
import styles from './Styles';

const SignInSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(10, 'Enter a valid phone number')
    .required('Enter your phone number'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Enter your password'),
});

function SignIn(props) {
  const navigation = useNavigation();
  // const [number, onChangeNumber] = React.useState('');
  // const [password, onChangePassword] = React.useState('');
  // const [otp, setOtp] = React.useState('');
  // const [otpSession, setOtpSession] = React.useState('');
  // const [otpverifyStatus, setOtpVerifyStatus] = React.useState('');
  const [otpSentStatus, setOtpSentStatus] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const onSubmit = async values => {
    const {phoneNumber, password} = values;
    const checkUser = await LoginController.checkUser(phoneNumber, password);
    if (checkUser.data.message === 'wrong password') {
      alert('Wrong password');
    } else if (checkUser.data.message === 'user not found') {
      alert('no user found');
    } else {
      if (authKey.usertype === 'user') {
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

  const getToken = async () => {
    let tok = await Storage.getItemSync(StorageKeys.JWT);
    return tok;
  };

  return (
    <ScrollView
      style={styles.containerMain}
      contentContainerStyle={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {!isError ? (
        <>
          {/* <View
            style={{
              marginTop: '30%',
              marginHorizontal: 20,
            }}>
            {/* <FgPuntLogoName width={200} height={50} /> */}
          {/* <Typography color={Colors.appWhiteColor} variant="H2">
              Welcome back ,
            </Typography>
            <Typography color={Colors.appWhiteColor} variant="H3">
              Login in to start Punting
            </Typography> */}
          {/* </View> */}
          <Formik
            initialValues={{
              phoneNumber: props.route.params?.phoneNumber || '',
              password: '',
            }}
            validationSchema={SignInSchema}
            onSubmit={values => onSubmit(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.offersContainer}>
                <View style={styles.SignINCard}>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 100,
                    }}>
                    <PhoneInput
                      onChangeText={handleChange('phoneNumber')}
                      value={values.phoneNumber}
                      label="Phone Number"
                      onBlur={handleBlur('phoneNumber')}
                      keyboardType="numeric"
                      maxLength={10}
                      disabled
                      error={
                        touched.phoneNumber && errors.phoneNumber ? true : false
                      }
                      helperText={
                        touched.phoneNumber && errors.phoneNumber
                          ? errors.phoneNumber
                          : ''
                      }
                    />
                    <CommonTextInput
                      onChangeText={handleChange('password')}
                      value={values.password}
                      rightIcon={
                        secureTextEntry ? (
                          <Icon
                            name="eye"
                            type="font-awesome"
                            size={20}
                            color={Colors.appWhiteColor}
                            onPress={() => {
                              setSecureTextEntry(!secureTextEntry);
                            }}
                          />
                        ) : (
                          <Icon
                            name="eye-slash"
                            type="font-awesome"
                            size={20}
                            color={Colors.appWhiteColor}
                            onPress={() => {
                              setSecureTextEntry(!secureTextEntry);
                            }}
                          />
                        )
                      }
                      onRightIconPress={() => {
                        setSecureTextEntry(!secureTextEntry);
                      }}
                      secureTextEntry={secureTextEntry}
                      label="Password"
                      error={touched.password && errors.password ? true : false}
                      helperText={
                        touched.password && errors.password
                          ? errors.password
                          : ''
                      }
                    />
                  </View>
                </View>
                {otpSentStatus ? (
                  <Typography
                    style={{color: Colors.appWhiteColor, marginTop: 10}}>
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
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={{
                      minWidth: '40%',
                      backgroundColor: Colors.appWhiteColor,
                      marginVertical: 30,
                    }}>
                    Login
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
    </ScrollView>
  );
}

export default SignIn;
