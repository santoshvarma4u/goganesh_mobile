import {CommonActions, useNavigation} from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import reactotron from 'reactotron-react-native';
import * as Yup from 'yup';
import Animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import LoginController from '../Controllers/LoginController';
import SignupController from '../Controllers/SignupController';
import styles from './Styles';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'name is Too Short!')
    .max(50, 'name Too Long!')
    .required('name is Required'),
  password: Yup.string()
    .min(2, 'Password Too Short!')
    .max(50, ' Password Too Long!')
    .required('Password Required'),
  confirmPassword: Yup.string()
    .required('Confirm Password required')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
  phone: Yup.string()
    .min(10, ' Enter phone Number Correctly')
    .max(10, ' Enter phone Number Correctly')
    .required('phone Number is Required'),
  otp: Yup.string(),
});

function SingUp({route}) {
  const navigation = useNavigation();
  const {phoneNumber} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [otpSession, setOtpSession] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const submitUser = async values => {
    reactotron.log(values);
    //Validate OTP
    if (!showOTP) {
      setIsLoading(true);
      const optSession = await LoginController.sendOTP(values.phone);
      setOtpSession(optSession.Details);
      setIsLoading(false);
      setShowOTP(true);
    } else {
      //Verify OTP
      setIsLoading(true);
      if (await verifyOtp(values.otp)) {
        const userResponse = await SignupController.doRegisterUser(values);
        if (userResponse.ok) {
          alert('Registered Successfully');
        } else {
          return alert('User already Exists with same phone number');
        }
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
        navigation.dispatch(resetAction);
      }
      setIsLoading(false);
    }
  };

  const verifyOtp = async otpInput => {
    const verifyOtpSession = await LoginController.verifyOtp(
      otpSession,
      otpInput,
    );
    if (verifyOtpSession.Status === 'Success') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.bankDetails}>
          {isLoading && (
            <LottieView source={Animations.loading_ball} autoPlay loop />
          )}
          <View style={styles.bankCardDetails}>
            <Typography
              style={{
                color: '#d5d1d1',
                marginVertical: 20,
                fontSize: 22,
              }}>
              Register
            </Typography>
            <Formik
              validationSchema={SignupSchema}
              initialValues={{
                name: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={values => {
                submitUser(values);
              }}>
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <CommonTextInput
                    label="Enter Your name"
                    onChangeText={handleChange('name')}
                  />
                  <CommonTextInput
                    keyboardType="numeric"
                    label="Enter Phone Number"
                    onChangeText={handleChange('phone')}
                  />
                  <CommonTextInput
                    label={'Enter Password'}
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                  />
                  <CommonTextInput
                    label={'Enter Client Code'}
                    type="referral" //Referral
                  />
                  <CommonTextInput
                    label="Confirm Password"
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                  />
                  {showOTP && (
                    <CommonTextInput
                      keyboardType="numeric"
                      label="Enter OTP "
                      onChangeText={handleChange('otp')}
                    />
                  )}
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.appPrimaryColor,
                      paddingHorizontal: 60,
                      paddingVertical: 10,
                      marginTop: 40,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                    disabled={isLoading}
                    onPress={handleSubmit}
                    underlayColor="transparent">
                    <Typography
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        alignItems: 'center',
                      }}>
                      {isLoading
                        ? 'Please wait'
                        : showOTP
                        ? 'Register'
                        : 'Send OTP'}
                    </Typography>
                  </TouchableOpacity>

                  {errors.name && touched.name && (
                    <Typography style={{backgroundColor: 'white'}}>
                      {errors.name}
                    </Typography>
                  )}

                  {errors.phone && touched.phone && (
                    <Typography style={{backgroundColor: 'white'}}>
                      {errors.phone}
                    </Typography>
                  )}

                  {errors.confirmPassword && touched.confirmPassword && (
                    <Typography style={{backgroundColor: 'white'}}>
                      {errors.confirmPassword}
                    </Typography>
                  )}
                  {errors.password && touched.password && (
                    <Typography style={{backgroundColor: 'white'}}>
                      {errors.password}
                    </Typography>
                  )}
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </View>
  );
}

export default SingUp;
