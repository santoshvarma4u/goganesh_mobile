import {Formik} from 'formik';
import React from 'react';
import {Dimensions, Linking, TouchableHighlight, View} from 'react-native';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';
import Colors from '../../../Theams/Colors';
import {getWhatsappMessageUrl} from '../../../Utils';
import PhoneInput from '../../Common/PhoneInput';
import {Typography} from '../../Common/Text';
const screenWidth = Dimensions.get('window').width;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const userSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .required('Phone Number is Required')
    .matches(phoneRegExp, 'Invalid Phone Number')
    .min(10, ' Enter Valid phone Number ')
    .max(10, ' Enter Valid phone Number '),
});

const VerifyUser = ({onSubmit, howItWorksClick}) => {
  return (
    <View>
      <Typography
        color={Colors.appWhiteColor}
        variant={'title'}
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
              marginTop: 20,
            }}>
            <View
              style={{
                width: screenWidth - 60,
              }}>
              <PhoneInput
                value={values.phoneNumber}
                defaultCode="IN"
                layout="second"
                onChangeText={handleChange('phoneNumber')}
                autoFocus
                withDarkTheme
                textInputProps={{
                  error:
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : '',
                  helperText:
                    touched.phoneNumber && errors.phoneNumber
                      ? errors.phoneNumber
                      : '',
                }}
              />
            </View>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={{
                paddingHorizontal: 30,
                backgroundColor: Colors.appWhiteColor,
              }}
              uppercase={false}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableHighlight
          onPress={() => {
            howItWorksClick();
          }}>
          <Typography
            style={{
              color: Colors.appWhiteColor,
              textAlign: 'center',
              marginTop: 20,
            }}>
            How to use ?
          </Typography>
        </TouchableHighlight>
        <Button
          style={{
            borderRadius: 20,
            marginTop: 10,
          }}
          mode={'contained'}
          icon={'whatsapp'}
          uppercase={false}
          color={Colors.appBlackColorLight}
          onPress={() => {
            let url = getWhatsappMessageUrl();
            Linking.openURL(url);
          }}>
          Whatsapp Support
        </Button>
      </View>
    </View>
  );
};

export default VerifyUser;
