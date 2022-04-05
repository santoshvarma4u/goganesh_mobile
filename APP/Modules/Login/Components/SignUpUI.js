import {CommonActions, useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
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
import * as Yup from 'yup';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
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
});

function SingUp({route}) {
  const navigation = useNavigation();
  const {phoneNumber} = route.params;
  ('');
  const submitUser = async values => {
    const userResponse = await SignupController.doRegisterUser(values);
    if (userResponse.ok) {
      alert('Registered Successfully');
    } else {
      return alert('User already Exists with same phone number');
    }

    let name = await Storage.getItemSync(StorageKeys.NAME);
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: 'App'}],
    });
    navigation.dispatch(resetAction);
  };
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.bankDetails}>
          <View style={styles.bankCardDetails}>
            <Text
              style={{
                color: '#d5d1d1',
                marginVertical: 20,
                fontSize: 22,
              }}>
              Register
            </Text>
            <Formik
              validationSchema={SignupSchema}
              initialValues={{
                name: '',
                phone: '',
                password: '',
                confirmPassword: '',
              }}
              onSubmit={values => submitUser(values)}>
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
                    label="Confirm Password"
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('confirmPassword')}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.appPrimaryColor,
                      paddingHorizontal: 60,
                      paddingVertical: 10,
                      marginTop: 40,
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                    onPress={handleSubmit}
                    underlayColor="transparent">
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        alignItems: 'center',
                      }}>
                      Submit
                    </Text>
                  </TouchableOpacity>

                  {errors.name && touched.name && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.name}
                    </Text>
                  )}

                  {errors.phone && touched.phone && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.phone}
                    </Text>
                  )}

                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                  {errors.password && touched.password && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.password}
                    </Text>
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
