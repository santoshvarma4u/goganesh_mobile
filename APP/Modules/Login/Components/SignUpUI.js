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
import styles from './Styles';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SignupController from '../Controllers/SignupController';
import Colors from '../../../Theams/Colors';
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

  const submitUser = async values => {
    if (values.phone != phoneNumber) {
      return alert('phone number not matched');
    }
    const userResponse = await SignupController.doRegisterUser(values);
    if (userResponse.ok) {
      alert('Registered Successfully');
    } else {
      alert('User already Exists with same phone number');
    }

    let name = await Storage.getItemSync(StorageKeys.NAME);
    console.log(name);
    navigation.navigate('App');
  };
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.bankDetails}>
          <View style={styles.bankCardDetails}>
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
                  <TextInput
                    style={styles.modalText}
                    placeholder="Enter Your name"
                    onChangeText={handleChange('name')}
                  />
                  <TextInput
                    style={styles.modalText}
                    placeholder="Enter Your phone Number"
                    keyboardType="numeric"
                    placeholder={phoneNumber}
                    onChangeText={handleChange('phone')}
                  />
                  <TextInput
                    style={styles.modalText}
                    placeholder={'Password'}
                    type="password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                  />
                  <TextInput
                    style={styles.modalText}
                    placeholder="Confirm Password"
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
