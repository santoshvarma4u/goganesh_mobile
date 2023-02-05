import {Formik} from 'formik';
import React from 'react';
import {Dimensions, Text, TouchableHighlight, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import HowItWorks from '../../HowItWorks';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone Number is Required')
    .matches(phoneRegExp, 'Invalid Phone Number')
    .min(10, ' Enter phone Number Correctly')
    .max(10, ' Enter phone Number Correctly'),
});

const VerifyUser = ({onSubmit, howItWorksClick}) => {
  return (
    <View>
      <Typography
        color={Colors.appWhiteColor}
        variant={'title'}
        style={{
          textAlign: 'center',
        }}
      >
        Let's get started!
      </Typography>
      <Formik
        initialValues={{
          phoneNumber: '',
        }}
        validationSchema={userSchema}
        onSubmit={onSubmit}
      >
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
              marginTop: 20,
            }}
          >
            <View
              style={{
                width: screenWidth - 60,
              }}
            >
              <CommonTextInput
                label="Phone Number"
                placeholder={'Enter your phone number'}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                maxLength={10}
                keyboardType="numeric"
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
              style={{marginTop: 10, paddingHorizontal: 30}}
              uppercase={false}
              labelStyle={{
                color: Colors.appWhiteColor,
              }}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
      <TouchableHighlight
        onPress={() => {
          howItWorksClick();
        }}
      >
        <Typography
          style={{
            color: Colors.appWhiteColor,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          How to use ?
        </Typography>
      </TouchableHighlight>
    </View>
  );
};

export default VerifyUser;
