/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Modal,
  Dimensions,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';

const screenWidth = Dimensions.get('window').width;

const HomeListMyIDs = props => {
  const [showWebView, setShowWebView] = useState(false);

  let banks = [];
  useEffect(() => {
    props.bank.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
  }, [props.bank.data, banks]);

  const onSiteUrlPress = () => {
    setShowWebView(true);
  };
  // const navigation = useNavigation();

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View>
          {/* <View
            style={{
              width: 40,
              height: 60,
              backgroundColor: 'black',
              position: 'absolute',
            }}
          /> */}
          {/*<Avatar.Image size={60} source={{uri: props.data.sd.siteimage}} />*/}
          <Image
            style={styles.image}
            source={{uri: props.data.sd.siteimage}}
            resizeMode="stretch"
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Typography style={styles.url}>{props.data.sd.siteurl}</Typography>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  onSiteUrlPress();
                }}>
                <Icon name="launch" color="white" size={14} />
              </TouchableOpacity>
            </View>
          </View>
          <Typography style={styles.siteName}>
            {props.data.sd.sitename}
          </Typography>
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
            <Typography style={styles.credTitle}>- Username </Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.username}
            </Typography>
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
            <Typography style={styles.credTitle}>- Password </Typography>
            <View style={{flex: 1}} />
            <Typography style={{color: 'white', marginLeft: 10}}>
              {props.data.password}
            </Typography>
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
            <Typography style={{alignItems: 'center', color: 'white'}}>
              Deposit
            </Typography>
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
            <Typography style={{alignItems: 'center', color: 'white'}}>
              Withdraw
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {ListTitle()}
      {ListCollapse()}
      <Modal
        visible={showWebView}
        animationType="slide"
        onRequestClose={() => {
          setShowWebView(false);
        }}
        contentContainerStyle={{
          padding: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="user"
              type={'antdesign'}
              color={Colors.appBlackColorLight}
              size={20}
            />
            <Typography color={Colors.appBlackColor} variant="H3">
              {props.data.username}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Icon
              name="wallet"
              type={'fontisto'}
              color={Colors.appBlackColorLight}
              size={20}
            />
            <Typography variant="H3">{props.walletBalance}</Typography>
          </View>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <Button
            color={Colors.appGreenColor}
            onPress={() => {
              setShowWebView(false);
              props.navigation.navigate('CreateID', {
                sdid: props.data.sd.sdid,
                username: props.data.username,
                requestStatus: 'old',
              });
            }}
            mode="contained">
            <Typography style={{alignItems: 'center', color: 'white'}}>
              Deposit
            </Typography>
          </Button>
          <Button
            onPress={() => {
              setShowWebView(false);
              props.navigation.navigate('Withdraw', {
                banks: banks,
                data: props.data,
              });
            }}
            color={Colors.appRedColor}
            mode="contained">
            <Typography style={{alignItems: 'center', color: 'white'}}>
              Withdraw
            </Typography>
          </Button>
        </View>
        <Divider />
        <WebView source={{uri: props.data.sd.siteurl}} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColor,
    borderRadius: 10,
    padding: 14,
    margin: 5,
    width: screenWidth - 30,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#232121',
    marginRight: 10,
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
  },

  containerCollapse: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.appBlackColor,
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

const mapStateToProps = state => {
  return {
    walletBalance: state.home.walletBalance,
  };
};

export default connect(mapStateToProps)(HomeListMyIDs);
