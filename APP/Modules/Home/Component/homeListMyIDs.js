/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';

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
const HomeListMyIDs = props => {
  let banks = [];
  useEffect(() => {
    props.bank.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
  }, [props.bank.data, banks]);

  // const navigation = useNavigation();

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View>
          <View
            style={{
              width: 40,
              height: 60,
              backgroundColor: 'black',
              position: 'absolute',
              top: -20,
            }}
          />
          <Image
            style={styles.image}
            source={{uri: `${env}${props.data.sd.siteimage}`}}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={styles.url}>{props.data.sd.siteurl}</Text>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://' + props.data.sd.siteurl);
                }}>
                <Icon name="launch" color="white" size={14} />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.siteName}>{props.data.sd.sitename}</Text>
        </View>
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.credsCard}>
          {/* <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#424040',
              marginVertical: 5,
            }}
          /> */}
          <View style={styles.credsCardID}>
            <Icon name="user" type={'antdesign'} color="white" size={12} />
            <Text style={styles.credTitle}>- Username </Text>
            <Text style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.username}
            </Text>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.username);
              }}>
              <Icon name="content-copy" color="white" size={15} />
            </TouchableOpacity>
          </View>
          <View style={styles.credsCardPassword}>
            <Icon
              name="user-secret"
              type={'fontisto'}
              color="white"
              size={12}
            />
            <Text style={styles.credTitle}>- Password </Text>
            <Text style={{color: 'white', marginLeft: 10}}>
              {props.data.password}
            </Text>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 5}}
              onPress={() => {
                Clipboard.setString(props.data.password);
              }}>
              <Icon name="content-copy" color="white" size={15} />
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
              props.navigation.navigate('CreateID', {
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
              props.navigation.navigate('Withdraw', {
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
    <View style={styles.container}>
      {ListTitle()}
      {ListCollapse()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171616',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
    marginTop: 12,
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
    // padding: 5,
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#171616',
    alignItems: 'center',
  },
  credsCard: {
    marginTop: 10,
    padding: 8,
    backgroundColor: 'black',
    width: '100%',
    borderRadius: 5,
  },
  credIcon: {
    marginLeft: 10,
    marginTop: 8,
  },
  credTitle: {
    color: 'white',
    fontSize: 12,
  },
  credsCardID: {
    flexDirection: 'row',
  },
  credsCardPassword: {
    paddingTop: 10,
    flexDirection: 'row',
  },
  depositWithdraw: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000090',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 0.1,
    borderColor: Colors.appPrimaryColor,
  },
});
export default HomeListMyIDs;
