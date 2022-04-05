import {Formik} from 'formik';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as yup from 'yup';
import Colors from '../../Theams/Colors';
import CommonTextInput from './CommonTextInput';
import {Typography} from './Text';
import {banksList} from './banks';

const bankValidationSchema = yup.object().shape({
  bank: yup.string().required('Bank is required'),
  accountNumber: yup.number().required('Account Number is required'),
  ifsc: yup.string().required('IFSC is required'),
  accountHolderName: yup.string().required('Account holder name is required'),
});

const EnterBankDetails = props => {
  const {onClose = () => {}, onSubmit = () => {}} = props;
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
        bank: '',
        accountNumber: '',
        ifsc: '',
        accountHolderName: '',
      }}
      onSubmit={onSubmit}>
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
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
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
          <DropDownPicker
            items={items}
            open={open}
            setOpen={setOpen}
            value={values.bank}
            setValue={state => {
              let newState = state;
              if (typeof state === 'function') {
                newState = state(values.bank);
              }
              setFieldValue('bank', newState);
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
            name={'bank'}
            theme="DARK"
            listMode="MODAL"
          />
          {errors.bank && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.bank}
            </Typography>
          )}
          <CommonTextInput
            label="Account Number *"
            name={'accountNumber'}
            value={values.accountNumber}
            onChangeText={handleChange('accountNumber')}
            keyboardType={'numeric'}
          />
          {errors.accountNumber && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.accountNumber}
            </Typography>
          )}
          <CommonTextInput
            label="IFSC *"
            name={'ifsc'}
            value={values.ifsc}
            onChangeText={handleChange('ifsc')}
          />
          {errors.ifsc && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.ifsc}
            </Typography>
          )}
          <CommonTextInput
            label="Account holder name *"
            value={values.accountHolderName}
            onChangeText={handleChange('accountHolderName')}
          />
          {errors.accountHolderName && (
            <Typography style={{color: 'red', fontSize: 12}}>
              {errors.accountHolderName}
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
              onPress={handleSubmit}>
              <Typography color={Colors.appBlackColor}>Submit</Typography>
            </Button>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default EnterBankDetails;
