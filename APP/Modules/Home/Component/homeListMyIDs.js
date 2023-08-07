/* eslint-disable react-native/no-inline-styles */
import {Divider, Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import {Button} from 'react-native-paper';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import Colors from '../../../Theams/Colors';
import metrics from '../../../Theams/Metrics';
// import CommonTextInput from '../../Common/CommonTextInput';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';
import {ClipboardItem} from '../../Deposit/Container/PaymentDetail';
// import homeController from '../Controller/homeController';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
        <View
          style={{
            width: 40,
            height: 60,
            backgroundColor: Colors.appBlackColor,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            left: 10,
            top: 0,
          }}
        />
        <View
          style={{
            width: 90,
            height: 90,
            backgroundColor: '#E0BFA0' + '30',
            borderRadius: 60,
            right: 0,
            top: -50,
            overflow: 'hidden',
            position: 'absolute',
          }}
        />
        <View
          style={{
            width: 80,
            height: 80,
            backgroundColor: Colors.buttonBackgroundColor,
            borderRadius: 50,
            opacity: 0.2,
            right: -30,
            top: -10,
            overflow: 'hidden',
            position: 'absolute',
          }}
        />
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: Colors.appBlackColor,
            overflow: 'hidden',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}>
          <FGImage
            style={styles.image}
            source={{uri: props.data.sd.siteimage}}
            resizeMode="stretch"
          />
        </View>
        <View>
          <View
            style={{
              marginLeft: 10,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                Linking.openURL(props.data.sd.siteurl);
              }}>
              <Typography variant={'subheader'} style={styles.url}>
                {props.data.sd.siteurl.substring(
                  8,
                  props.data.sd.siteurl.length,
                )}
              </Typography>
              <Icon name="launch" color="white" size={14} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.buttonBackgroundColor,
                  borderRadius: 5,
                  padding: 3,
                  marginRight: 5,
                }}>
                <Icon name="person" type={'ionicon'} color="white" size={12} />
                <Typography style={styles.credTitle}> ID </Typography>
              </View>

              <ClipboardItem
                style={{flexDirection: 'row', alignItems: 'center', right: 0}}
                text={props.data.username}
                isHome={true}
                needCopyText={false}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.depositWithdraw}>
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingTop: 5,
            alignItems: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('CreateID', {
              sdid: props.data.sd.sdid,
              username: props.data.username,
              usdid: props.data.usdid,
              requestStatus: 'old',
            });
          }}>
          <Typography
            variant="H5"
            style={{
              alignItems: 'center',
              color: 'white',
              marginLeft: 4,
              fontSize: 10,
              paddingBottom: 10,
            }}>
            Deposit
          </Typography>
          <View
            style={{
              backgroundColor: Colors.appGreenColor,
              height: 3,
              width: 80,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            backgroundColor: Colors.appBlackColor,
            height: 20,
            marginTop: 5,
          }}
        />
        <TouchableOpacity
          style={{
            justifyContent: 'space-between',
            flex: 1,
            paddingTop: 5,
            alignItems: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('Withdraw', {
              banks: banks,
              data: props.data,
            });
          }}>
          <Typography
            variant="H5"
            style={{
              alignItems: 'center',
              color: 'white',
              marginLeft: 4,
              fontSize: 10,
              paddingBottom: 10,
            }}>
            Withdraw
          </Typography>
          <View
            style={{
              backgroundColor: Colors.appRedColor,
              borderRadius: 5,
              height: 3,
              width: 80,
            }}
          />
        </TouchableOpacity>
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
          backgroundColor: 'white',
          height: screenHeight,
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
    backgroundColor: Colors.appBlackColorLight + 'bf',
    borderRadius: metrics.borderRadius,
    width: screenWidth,
    borderWidth: 10,
    borderColor: Colors.appBlackColor,
    height: 150,
    overflow: 'hidden',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  url: {
    color: Colors.appWhiteColor,
    fontSize: 13,
  },
  ListTitle: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1,
    overflow: 'hidden',
  },
  credTitle: {
    color: 'white',
    fontSize: 12,
  },
  depositWithdraw: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.appBlackColorLight,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderColor: Colors.appBlackColorLight,
    paddingTop: 4,
  },
});

const mapStateToProps = state => {
  return {
    walletBalance: state.home.walletBalance,
  };
};

export default connect(mapStateToProps)(HomeListMyIDs);
