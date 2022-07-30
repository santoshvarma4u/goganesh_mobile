import {Icon} from '@rneui/themed';
import {useFormik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import styles from './Styles';

const UPINumberPicker = ({params}) => {
  const formik = useFormik({
    initialValues: {
      phone_pay: '',
      google_pay: '',
      paytm: '',
    },
  });

  return (
    <View style={{padding: 4}}>
      <View style={styles.bankCardDetails}>
        <Icon type="material-community" name="bank" color="white" />
        <Typography style={{color: 'white', padding: 5, left: 10}}>
          UPI Numbers
        </Typography>
      </View>
      {/*
            UI for Upi numbers , for the PhonePay, Gpay, Paytm
          */}
      <View style={{padding: 20}}>
        <CommonTextInput label={'Phone Pay'} value={formik.values.phone_pay} />
        <CommonTextInput
          label={'Google Pay'}
          value={formik.values.google_pay}
        />
        <CommonTextInput label={'Paytm'} value={formik.values.paytm} />
      </View>
    </View>
  );
};

export default UPINumberPicker;
