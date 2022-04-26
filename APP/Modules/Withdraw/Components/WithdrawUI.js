/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import FlatListPicker from 'react-native-flatlist-picker';
import {Checkbox} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import reactotron from 'reactotron-react-native';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import depositController from '../../Deposit/Controller/depositController';
import IdController from '../../IDs/Controller/IdController';

function ListTitle(props) {
  return (
    <View style={styles.ListTitle}>
      <Image
        style={styles.image}
        source={{uri: `${env}${props?.sd?.siteimage}`}}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography style={styles.url}>{props?.sd?.siteurl}</Typography>
          <View style={styles.credIcon}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://' + props?.sd?.siteurl);
              }}>
              <Icon name="launch" color="white" size={14} />
            </TouchableOpacity>
          </View>
        </View>
        <Typography style={styles.siteName}>{props?.sd?.sitename}</Typography>
      </View>
    </View>
  );
}

const WithdrawForm = props => {
  let banks = props?.route?.params?.banks ? props.route.params.banks : [];
  let data = props?.route?.params?.data ? props.route.params.data : {};
  reactotron.log('this is the log', data);

  const [amount, onAmountChange] = useState(null);
  const [checked, setChecked] = useState(false);
  const [check, setCheckedDemo] = useState(0);
  const [selectedBank, setSelectedBank] = useState('Select Bank');
  const [selectedBankID, setSelectedBankID] = useState('');
  const [open, setOpen] = useState(false);

  reactotron.log('this is the data', banks);
  return (
    <View style={styles.withDrawForm}>
      {ListTitle(data)}
      <CommonTextInput
        onChangeText={onAmountChange}
        value={amount}
        label="Enter Amount to Withdraw"
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
        <Typography style={{color: 'white'}}>Deposit Into Wallet</Typography>
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
          <Typography style={{alignItems: 'center'}}>Cancel</Typography>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (checked) {
              depositController.depositIntoWallet(
                data.uid,
                'Wallet',
                amount,
                'DR',
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
          <Typography style={{alignItems: 'center'}}>
            Request Withdraw
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  withDrawForm: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.appBlackColor,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
    marginTop: 12,
  },
  url: {
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 8,
    color: Colors.appWhiteColor,
  },
  siteName: {
    marginLeft: 10,
    marginTop: 10,
    color: Colors.appWhiteColor,
  },
  ListTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});

export default WithdrawForm;
