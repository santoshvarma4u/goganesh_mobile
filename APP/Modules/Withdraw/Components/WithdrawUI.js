/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FlatListPicker from 'react-native-flatlist-picker';
import {Checkbox} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import depositController from '../../Deposit/Controller/depositController';
import IdController from '../../IDs/Controller/IdController';

const WithdrawForm = props => {
  let banks = props?.route?.params?.banks ? props.route.params.banks : [];
  let data = props?.route?.params?.data ? props.route.params.data : {};
  const [amount, onAmountChange] = useState(null);
  const [checked, setChecked] = useState(false);
  const [check, setCheckedDemo] = useState(0);
  const [selectedBank, setSelectedBank] = useState('Select Bank');
  const [selectedBankID, setSelectedBankID] = useState('');

  return (
    <View style={styles.withDrawForm}>
      <TextInput
        style={styles.modalText}
        onChangeText={onAmountChange}
        value={amount}
        placeholder="Enter Amount to Withdraw"
        keyboardType="numeric"
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color={Colors.appPrimaryColor}
          uncheckedColor="white"
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={{color: 'white'}}>Deposit Into Wallet</Text>
      </View>
      {!checked && (
        <FlatListPicker
          data={banks}
          containerStyle={styles.container}
          dropdownStyle={{width: 180}}
          dropdownTextStyle={{fontSize: 15}}
          pickedTextStyle={{color: 'white', fontWeight: 'bold'}}
          defaultValue={selectedBank}
          renderDropdownIcon={() => (
            <AntDesign
              name="caretdown"
              color="white"
              size={15}
              style={{padding: 15}}
            />
          )}
          onValueChange={(value, index) => {
            setSelectedBank(value);
            setCheckedDemo(1);
            let bankid = banks.find(o => o.value == value);
            setSelectedBankID(bankid.key);
          }}
        />
      )}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{
            width: 100,
            margin: 20,
            padding: 8,
            alignItems: 'center',
            backgroundColor: Colors.appPrimaryColor,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            props.navigation.pop();
          }}>
          <Text style={{alignItems: 'center'}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (checked) {
              depositController.depositIntoWallet(
                data.uid,
                'Wallet',
                amount,
                'CR',
                true,
                null,
              );
            } else {
              if (selectedBankID.length == 0 || amount == 0) {
                return alert(
                  'Please select a bank or Enter amount to Withdraw',
                );
              }
              IdController.sendWithDrawRequest(
                data.sd.sdid,
                selectedBank,
                amount,
                'DR',
                selectedBankID,
              ).then(() => {
                alert('WithDraw Request Sent Successfully ');
              });
            }
          }}
          style={{
            width: 100,
            margin: 20,
            padding: 8,
            alignItems: 'center',
            backgroundColor: Colors.appPrimaryColor,
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{alignItems: 'center'}}>Request Withdraw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#171616',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  withDrawForm: {
    padding: 20,
    flex: 1,
    backgroundColor: '#171616',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  modalText: {
    width: '80%',
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
    height: 40,
    marginBottom: 15,
    padding: 5,
  },
});

export default WithdrawForm;
