/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button, Divider} from 'react-native-paper';
import WebView from 'react-native-webview';

import {connect} from 'react-redux';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
const AccordianListNew = props => {
  const [showWebView, setShowWebView] = useState(false);

  let banks = [];
  // const [expanded, setExpanded] = React.useState(true);

  useEffect(() => {
    props.bank.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
  }, [props.bank.data, banks]);

  const navigation = useNavigation();

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View style={styles.image}>
          <Image
            style={styles.image}
            source={{uri: props.data.sd.siteimage}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity
            onPress={() => {
              setShowWebView(true);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <Typography style={styles.url}>{props.data.sd.siteurl}</Typography>
            <Icon name="launch" color="white" size={16} />
          </TouchableOpacity>
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
          <View style={styles.credsCardHeader}>
            <Typography variant={'H4'} style={styles.credTitle}>
              Credentials
            </Typography>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  setShowWebView(true);
                }}>
                <Icon name="launch" color="white" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.buttonBackgroundColor,
              marginVertical: 5,
            }}
          />
          <View style={styles.credsCardID}>
            <Typography style={styles.credTitle}>Username </Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.username}
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.username);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.credsCardPassword}>
            <Typography style={styles.credTitle}>Password</Typography>
            <Typography style={{color: 'white', marginLeft: 'auto'}}>
              {props.data.password}
            </Typography>
            <TouchableOpacity
              style={{color: 'white', marginLeft: 15}}
              onPress={() => {
                Clipboard.setString(props.data.password);
              }}>
              <Icon name="content-copy" color="white" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 10,
          flex: 1,
        }}>
        <ListTitle />
        <ListCollapse />
      </View>
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
            <Typography variant="H3">{props.wallet}</Typography>
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
              navigation.navigate('CreateID', {
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
              navigation.navigate('Withdraw', {
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
      <View
        style={{
          height: 1,
          backgroundColor: Colors.buttonBackgroundColor,
        }}
      />
      <View style={styles.depositWithdraw}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => {
            navigation.navigate('CreateID', {
              sdid: props.data.sd.sdid,
              username: props.data.username,
              requestStatus: 'old',
            });
          }}>
          <Typography style={{alignItems: 'center', color: 'white'}}>
            Deposit
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.bottomButton,
            {
              borderLeftColor: Colors.buttonBackgroundColor,
              borderLeftWidth: 0.5,
            },
          ]}
          onPress={() => {
            navigation.navigate('Withdraw', {
              banks: banks,
              data: props.data,
            });
          }}>
          <Typography style={{alignItems: 'center', color: 'white'}}>
            Withdraw
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 30,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  url: {
    fontWeight: '500',
    marginHorizontal: 10,
    marginTop: 8,
    color: Colors.appWhiteColor,
  },
  siteName: {
    marginLeft: 10,
    marginTop: 5,
    color: Colors.appWhiteColor,
  },
  ListTitle: {
    flexDirection: 'row',
    flex: 1,
  },
  containerCollapse: {
    padding: 6,
    width: '100%',
    alignItems: 'center',
  },
  credsCardHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  credsCard: {
    marginTop: 5,
    padding: 10,
    backgroundColor: Colors.appBlackColor,
    width: '100%',
    borderRadius: 30,
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
  bottomButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 5,
  },
});

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWallet: wallet => dispatch(setWalletBalance(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccordianListNew);
