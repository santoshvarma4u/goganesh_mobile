import {Icon} from '@rneui/themed';
import {useFormik} from 'formik';
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {Button} from 'react-native-paper';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PaytmSvg from '../../../Assets/svgs/PaytmSvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import paymentDetails from '../../../Network/paymentDetails/paymentDetails';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import paymentDetailsController from '../Controller/paymentDetailsController';
import styles from './Styles';

const UPINumberPicker = () => {
  const formik = useFormik({
    initialValues: {
      phone_pay: '',
      google_pay: '',
      paytm: '',
    },
  });

  const {data, loading, error, request} =
    paymentDetailsController.fetchUpiDetails();

  const reloadUpiDetails = () => {
    request();
  };

  useEffect(() => {
    if (data) {
      data.map(item => {
        if (item.upiName === 'phone_pay') {
          formik.setFieldValue('phone_pay', item.upiNumber);
        } else if (item.upiName === 'google_pay') {
          formik.setFieldValue('google_pay', item.upiNumber);
        } else if (item.upiName === 'paytm') {
          formik.setFieldValue('paytm', item.upiNumber);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const {phone_pay, google_pay, paytm} = formik.values;

  const handleChange = name => value => {
    formik.setFieldValue(name, value);
  };

  const onSave = (name, item = {}) => {
    // validate if a valid phone number is entered, if not show error
    // write regex to validate phone number
    // if valid, save the number
    // if not valid, show error

    if (!formik.values[name]) {
      alert('Please enter a valid phone number');
      formik.setFieldError(name, 'Please enter a valid phone number');
    }

    ///regex to validate phone number
    // Regular expression to check if string is a Indian mobile number
    const regexExp = /^[6-9]\d{9}$/gi;

    if (regexExp.test(formik.values[name])) {
      // call api to save the number
      // if success, show success message
      // if failure, show error message

      const payload = {
        ...item,
        upiName: name,
        upiNumber: formik.values[name],
      };
      paymentDetails.updateUserUpiDetails(payload).then(res => {
        if (res.status === 200) {
          alert('UPI details saved successfully');
        } else {
          alert('Something went wrong');
        }
      });
    } else {
      alert('Please enter a valid phone number');
      formik.setFieldError(name, 'Please enter a valid phone number');
    }
  };

  if (loading) {
    return (
      <View>
        <Typography>Loading...</Typography>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Typography>Error</Typography>
        <Button onPress={reloadUpiDetails}>Reload</Button>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.bankCardDetails}>
        <Icon type="material-community" name="bank" color="white" />
        <Typography style={{color: 'white', padding: 5, left: 10}}>
          UPI Numbers
        </Typography>
      </View>
      {/*
        UI for Upi numbers , for the PhonePay, G pay, Paytm
    */}
      <View style={{padding: 10}}>
        <View style={styles.itemContainer}>
          <GooglePaySvg />
          <CommonTextInput
            label={'Phone Pay'}
            value={phone_pay}
            onChangeText={handleChange('phone_pay')}
            keyboardType="numeric"
            maxLength={10}
            error={formik.errors.phone_pay}
            style={{minWidth: 240}}
          />
          <Button
            mode={'contained'}
            onPress={() => onSave('phone_pay')}
            style={styles.saveButton}>
            Save
          </Button>
        </View>
        <View style={styles.itemContainer}>
          <PhonePeSvg />
          <CommonTextInput
            label={'Google Pay'}
            value={google_pay}
            onChangeText={handleChange('google_pay')}
            keyboardType="numeric"
            maxLength={10}
            style={{minWidth: 240}}
            error={formik.errors.google_pay}
          />
          <Button
            mode={'contained'}
            onPress={() => onSave('google_pay')}
            style={styles.saveButton}>
            Save
          </Button>
        </View>
        <View style={styles.itemContainer}>
          <PaytmSvg
            width={40}
            style={{
              marginRight: 8,
            }}
          />
          <CommonTextInput
            label={'Paytm'}
            value={paytm}
            onChangeText={handleChange('paytm')}
            keyboardType="numeric"
            maxLength={10}
            style={{minWidth: 240}}
            error={formik.errors.paytm}
          />
          <Button
            mode={'contained'}
            onPress={() => onSave('paytm')}
            style={styles.saveButton}>
            Save
          </Button>
        </View>
      </View>
    </View>
  );
};

export default UPINumberPicker;
