/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {List} from 'react-native-paper';

import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
const AccordianListNew = props => {
  let banks = [];
  const [expanded, setExpanded] = React.useState(true);

  useEffect(() => {
    props.bank.data.map(item => {
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
        <Image
          style={styles.image}
          source={{uri: `${env}${props.data.sd.siteimage}`}}
        />
        <View>
          <Text style={styles.url}>{props.data.sd.siteurl}</Text>
          <Text style={styles.siteName}>{props.data.sd.sitename}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sd.sdid,
              username: props.data.username,
              requestStatus: 'old',
            });
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 30,
              backgroundColor: Colors.appGreenColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
              marginVertical: 15,
            }}>
            <Text style={{color: Colors.appWhiteColor, fontSize: 15}}>D</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setWithDrawForm(true);
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 30,
              backgroundColor: Colors.appRedColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
              marginVertical: 15,
            }}>
            <Text style={{color: Colors.appWhiteColor, fontSize: 15}}>W</Text>
          </View>
        </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://' + props.data.sd.siteurl);
                }}>
                <Icon name="launch" color="white" size={20} />
              </TouchableOpacity>
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
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.username);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.credsCardPassword}>
            <Text style={styles.credTitle}>Password</Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.password}
            </Text>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.password);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.depositWithdraw}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flex: 1,
              paddingTop: 5,
              alignItems: 'center',
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('CreateID', {
                sdid: props.data.sd.sdid,
                username: props.data.username,
                requestStatus: 'old',
              });
            }}>
            <Icon
              name="arrowup"
              color="green"
              type="antdesign"
              size={15}
              style={{padding: 5}}
            />
            <Text style={{alignItems: 'center', color: 'white'}}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              paddingTop: 5,
              flexDirection: 'row',
            }}
            onPress={() => {
              navigation.navigate('Withdraw', {
                banks: banks,
                data: props.data,
              });
            }}>
            <Icon
              name="arrowdown"
              color="red"
              type="antdesign"
              size={15}
              style={{padding: 5}}
            />
            <Text style={{alignItems: 'center', color: 'white'}}>Withdraw</Text>
          </TouchableOpacity>
        </View>
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
  depositWithdraw: {flexDirection: 'row'},
});
export default AccordianListNew;
