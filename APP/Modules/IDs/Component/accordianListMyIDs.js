import React, {useState, useEffect} from 'react';
import {List} from 'react-native-paper';

import {
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlatListPicker from 'react-native-flatlist-picker';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import {Formik} from 'formik';
import IdController from '../Controller/IdController';
import DepositController from '../../Deposit/Controller/depositController';
import reactotron from 'reactotron-react-native';

const AccordianListNew = props => {
  let banks = [];
  const [checked, setChecked] = React.useState(false);
  const [check, setCheckedDemo] = React.useState(0);
  const [expanded, setExpanded] = React.useState(true);
  const [amount, onAmountChange] = React.useState(null);
  const [selectedBank, setSelectedBank] = React.useState('Select Bank');
  const [selectedBankID, setSelectedBankID] = React.useState('');

  useEffect(() => {
    console.log('use effect called ');
    props.bank.data.map(item => {
      console.log('t', item);
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
  }, [props.bank.data, banks]);

  const [withDrawForm, setWithDrawForm] = useState(false);
  const navigation = useNavigation();
  const handlePress = () => setExpanded(!expanded);

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <Image style={styles.image} source={images.logo} />
        <View>
          <Text style={styles.url}>{props.data.sd.siteurl}</Text>
          <Text style={styles.siteName}>{props.data.sd.sitename}</Text>
        </View>
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.credsCard}>
          <View style={styles.credsCardHeader}>
            <Text style={styles.credTitle}>Credentials</Text>
            <View style={styles.credIcon}>
              <Icon name="launch" color="white" size={20} />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#424040',
              marginVertical: 5,
            }}
          />
          <View style={styles.credsCardID}>
            <Text style={styles.credTitle}>Username </Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.username}
            </Text>
          </View>
          <View style={styles.credsCardPassword}>
            <Text style={styles.credTitle}>Password</Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.password}
            </Text>
          </View>
        </View>
        <View style={styles.depositWithdraw}>
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
              navigation.navigate('CreateID', {
                sdid: props.data.sd.sdid,
                username: props.data.username,
                requestStatus: 'old',
              });
            }}>
            <Text style={{alignItems: 'center'}}>Deposit</Text>
          </TouchableOpacity>
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
              setWithDrawForm(true);
            }}>
            <Text style={{alignItems: 'center'}}>Withdraw</Text>
          </TouchableOpacity>
        </View>
        {withDrawForm && (
          <>
            <View style={styles.withDrawForm}>
              <TextInput
                style={styles.modalText}
                onChangeText={onAmountChange}
                value={amount}
                placeholder="Enter Amount to Withdraw"
                keyboardType="numeric"
              />
              <View style={{flexDirection: 'row'}}>
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
                    setWithDrawForm(false);
                  }}>
                  <Text style={{alignItems: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      'selected bank ',
                      selectedBank + selectedBankID,
                    );
                    if (checked) {
                      DepositController.depositIntoWallet(
                        props.data.uid,
                        'Wallet',
                        amount,
                        'CR',
                        true,
                        null,
                      );
                    } else {
                      console.log('jjjjjjjjjj', selectedBank + selectedBankID);
                      console.log('llllllllll', amount + amount);
                      if (selectedBankID.length == 0 || amount == 0)
                        return alert(
                          'Please select a bank or Enter amount to Withdraw',
                        );
                      IdController.sendWithDrawRequest(
                        props.data.sd.sdid,
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
          </>
        )}
      </View>
    );
  }

  return (
    <List.Section title="Accordions">
      <View style={styles.container}>
        <List.Accordion
          title={<ListTitle />}
          expanded={!expanded}
          onPress={handlePress}
          style={{backgroundColor: '#171616', borderRadius: 10}}>
          <ListCollapse />
        </List.Accordion>
      </View>
    </List.Section>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171616',
    borderRadius: 10,
  },
  withDrawForm: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
  },
  url: {
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 8,
    color: '#cdbebe',
  },
  siteName: {
    marginLeft: 10,
    marginTop: 10,
    color: '#cdbebe',
  },
  ListTitle: {
    flexDirection: 'row',
  },

  containerCollapse: {
    padding: 10,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#171616',
    alignItems: 'center',
  },
  modalText: {
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 20,
    height: 40,
    marginBottom: 15,
  },
  icons: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  credsCardHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  credsCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 5,
  },
  credIcon: {
    marginLeft: 'auto',
  },
  credTitle: {
    color: 'white',
  },
  credsCardID: {
    padding: 5,
    flexDirection: 'row',
  },
  credsCardPassword: {
    padding: 5,
    flexDirection: 'row',
  },
  moneyCard: {
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'black',
    width: '100%',
  },
  moneyCardText: {
    color: 'white',
    flexDirection: 'row-reverse',
  },
  moneyCardPrice: {
    color: 'white',
    marginLeft: 'auto',
    right: 0,
  },
  moneyCardIcon: {
    color: 'white',
    marginRight: 10,
  },
  moneyRow1: {
    flexDirection: 'row',
    padding: 5,
  },
  moneyRow2: {
    flexDirection: 'row',
    padding: 5,
  },
  moneyRow3: {
    flexDirection: 'row',
    padding: 5,
  },

  moneyCardContentGrid: {
    padding: 5,
  },
  centeredView: {
    width: '100%',

    padding: 10,
    top: 200,
  },
  modalView: {
    backgroundColor: '#696969',
    borderRadius: 20,
    padding: 25,
  },
  depositWithdraw: {flexDirection: 'row'},
});
export default AccordianListNew;
