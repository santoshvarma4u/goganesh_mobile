import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import Colors from '../../Theams/Colors';
import CommonTextInput from './CommonTextInput';
import Picker from './DropDownPicker';
import {Typography} from './Text';
import {banksList} from './banks';

const bankValidationSchema = yup.object().shape({
  bankName: yup.string().required('Bank is required'),
  AccountNumber: yup
    .number('Account Number should be number')
    .required('Account Number is required'),
  IFSC: yup.string().required('IFSC is required'),
  AccountHolderName: yup.string().required('Account holder name is required'),
});

const EnterBankDetails = props => {
  const {onClose = () => {}, onSubmit = () => {}, bankData} = props;
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    ...banksList.map(item => ({
      label: item,
      value: item,
    })),
  ]);

  return (
    <Formik
      validationSchema={bankValidationSchema}
      initialValues={{
        bankName: bankData ? bankData.bankName : '',
        AccountNumber: bankData ? bankData.accountNumber : '',
        IFSC: bankData ? bankData.IFSC : '',
        AccountHolderName: bankData ? bankData.accountHolderName : '',
      }}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        setFieldValue,
      }) => (
        <ScrollView
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            backgroundColor: Colors.appBlackColorLight,
            marginHorizontal: 20,
            borderRadius: 10,
            paddingVertical: 30,
            paddingHorizontal: 20,
            color: Colors.appWhiteColor,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View
              style={{
                flex: 1,
              }}
            />
            <MaterialCommunityIcons
              name={'close'}
              color={Colors.appWhiteColor}
              size={24}
              onPress={() => onClose()}
            />
          </View>
          <Typography color={Colors.appWhiteColor} variant={'title'}>
            Add your Bank Account
          </Typography>
          <Typography color={Colors.appWhiteColor}>
            Adding your bank account details is mandatory for processing your
            withdrawals.
          </Typography>
          <Picker
            items={items}
            open={open}
            setOpen={setOpen}
            value={values.bankName}
            setValue={state => {
              let newState = state;
              if (typeof state === 'function') {
                newState = state(values.bankName);
              }
              setFieldValue('bankName', newState);
            }}
            setItems={setItems}
            searchable={true}
            searchPlaceholder={'Search Bank'}
            placeholder={'Select Bank'}
            modalContentContainerStyle={{
              backgroundColor: Colors.appBlackColorLight,
            }}
            style={{
              backgroundColor: Colors.appBlackColorLight,
              marginTop: 20,
              borderColor: Colors.appWhiteColor,
              borderRadius: 5,
            }}
            name={'bankName'}
            theme="DARK"
            listMode="MODAL"
          />
          {errors.bankName && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.bankName}
            </Typography>
          )}
          <CommonTextInput
            label="Account Number *"
            name={'AccountNumber'}
            value={values.AccountNumber}
            onChangeText={handleChange('AccountNumber')}
            keyboardType={'numeric'}
          />
          {errors.AccountNumber && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.AccountNumber}
            </Typography>
          )}
          <CommonTextInput
            label="IFSC *"
            name={'IFSC'}
            value={values.IFSC}
            onChangeText={handleChange('IFSC')}
          />
          {errors.IFSC && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.IFSC}
            </Typography>
          )}
          <CommonTextInput
            label="Account holder name *"
            value={values.AccountHolderName}
            onChangeText={handleChange('AccountHolderName')}
          />
          {errors.AccountHolderName && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.AccountHolderName}
            </Typography>
          )}
          <View>
            <Button
              mode="contained"
              style={{
                marginHorizontal: 30,
                marginTop: 20,
                backgroundColor: Colors.appPrimaryColor,
                color: Colors.appBlackColor,
              }}
              onPress={handleSubmit}
            >
              <Typography color={Colors.appBlackColor}>Submit</Typography>
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

EnterBankDetails.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  bankData: PropTypes.object,
};

EnterBankDetails.defaultProps = {
  onClose: () => {},
  onSubmit: () => {},
  bankData: {},
};

export default EnterBankDetails;
