import {Formik} from 'formik';
import React from 'react';
import {Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('phone Number is Required')
    .matches(phoneRegExp, 'Invalid Phone Number')
    .min(10, ' Enter phone Number Correctly')
    .max(10, ' Enter phone Number Correctly'),
});
const VerifyUser = ({onSubmit}) => {
  return (
    <View>
      <Typography
        color={Colors.appWhiteColor}
        variant={'header'}
        style={{
          textAlign: 'center',
        }}>
        Let's get started!
      </Typography>
      <Formik
        initialValues={{
          phoneNumber: '',
        }}
        validationSchema={userSchema}
        onSubmit={onSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View
            style={{
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}>
            <View
              style={{
                width: '100%',
              }}>
              <CommonTextInput
                label="Phone Number"
                placeholder={'Enter your phone number'}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                maxLength={10}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
                helperText={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ''
                }
              />
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{marginTop: 10}}
              labelStyle={{
                color: Colors.appWhiteColor,
              }}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default VerifyUser;
