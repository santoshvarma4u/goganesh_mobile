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
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const EnterBankDetails = props => {
  const {onClose = () => {}} = props;
  const [bankDetails, setBankDetails] = React.useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    ...banksList.map(item => ({
      label: item,
      value: item,
    })),
  ]);

  return (
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
        value={bankDetails}
        setValue={setBankDetails}
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
        theme="DARK"
        listMode="MODAL"
      />
      <CommonTextInput label="Account Number *" />
      <CommonTextInput label="IFSC *" />
      <CommonTextInput label="Account holder name *" />
      <View>
        <Button
          mode="contained"
          style={{
            marginHorizontal: 30,
            marginTop: 20,
            backgroundColor: Colors.appPrimaryColor,
            color: Colors.appBlackColor,
          }}>
          <Typography color={Colors.appBlackColor}>Submit</Typography>
        </Button>
      </View>
    </ScrollView>
  );
};

export default EnterBankDetails;
