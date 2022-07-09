import {CommonActions, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {
  Pressable,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import Animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import LoginController from '../Controllers/LoginController';
import SignupController from '../Controllers/SignupController';
import styles from './Styles';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'name is Too Short!')
    .max(50, 'name Too Long!')
    .required('name is Required'),
  phone: Yup.string()
    .required('phone Number is Required')
    .matches(phoneRegExp, 'Invalid Phone Number')
    .min(10, ' Enter phone Number Correctly')
    .max(10, ' Enter phone Number Correctly'),
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
  otp: Yup.string(),
});

function SingUp({route}) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSession, setOtpSession] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const submitUser = async values => {
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
    <KeyboardAvoidingView
      style={styles.containerMain}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={10}>
      <ScrollView>
        <View style={styles.bankDetails}>
          <View>
            <Typography color={Colors.appWhiteColor} variant="title">
              Register
            </Typography>
            <Formik
              validationSchema={SignupSchema}
              initialValues={{
                name: '',
                phone: route.params?.phoneNumber || '',
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
                    keyboardType="numeric"
                    label="Phone Number"
                    maxLength={10}
                    placeholder={'Enter Your Phone Number'}
                    onChangeText={handleChange('phone')}
                    disabled
                    value={values.phone}
                    error={touched.phone && errors.phone ? errors.phone : false}
                    helperText={
                      touched.phone && errors.phone ? errors.phone : ' '
                    }
                  />
                  <CommonTextInput
                    label="Name"
                    placeholder={'Enter Your name'}
                    onChangeText={handleChange('name')}
                    value={values.name}
                    error={touched.name && errors.name ? errors.name : false}
                    helperText={touched.name && errors.name ? errors.name : ' '}
                  />
                  <CommonTextInput
                    label={'Password'}
                    placeholder={'Enter Your Password'}
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    value={values.password}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : false
                    }
                    helperText={
                      touched.password && errors.password
                        ? errors.password
                        : ' '
                    }
                  />
                  <CommonTextInput
                    label="Confirm Password"
                    placeholder={'Confirm Your Password'}
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                    error={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : false
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ' '
                    }
                  />
                  <CommonTextInput
                    label="Enter Referral Code(Optional)"
                    placeholder={'Enter Referral Code'}
                    onChangeText={handleChange('client')}
                  />
                  {showOTP && (
                    <CommonTextInput
                      keyboardType="numeric"
                      label="Enter OTP "
                      onChangeText={handleChange('otp')}
                    />
                  )}
                  <Pressable
                    style={{
                      backgroundColor: Colors.appPrimaryColor,
                      paddingHorizontal: 60,
                      paddingVertical: 10,
                      marginTop: 20,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
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
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
          {isLoading && (
            <LottieView source={Animations.loading_ball} autoPlay loop />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SingUp;
