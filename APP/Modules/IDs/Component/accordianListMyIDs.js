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
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import {Formik} from 'formik';
import IdController from '../Controller/IdController';
import reactotron from 'reactotron-react-native';

const AccordianListNew = props => {
  let banks = [];

  const [expanded, setExpanded] = React.useState(true);
  const [amount, onAmountChange] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.banks.map(item => {
      banks.push({
        label: item.bankName,
        value: item.bid,
      });
    });
    console.log(banks);
    setItems(banks);
  }, []);

  const getIndex = value => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].value == value) {
        return i;
      }
    }
  };
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
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
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
                    let i = getIndex(value);
                    IdController.sendWithDrawRequest(
                      props.data.sd.sdid,
                      items[i].label,
                      amount,
                      'DR',
                      items[i].value,
                    ).then(data => {
                      alert('success');
                    });
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
                  <Text style={{alignItems: 'center'}}>Request Wirhdraw</Text>
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
