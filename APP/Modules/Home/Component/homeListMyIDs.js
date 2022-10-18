/* eslint-disable react-native/no-inline-styles */
import {BottomSheet, Divider, Icon, ListItem} from '@rneui/themed';
import moment from 'moment';
import React, {useEffect, useState} from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import {Button, Modal as PaperModal, Portal, Card} from 'react-native-paper';
import WebView from 'react-native-webview';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';
import homeController from '../Controller/homeController';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeListMyIDs = props => {
  const [showWebView, setShowWebView] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      <View
        style={[
          styles.ListTitle,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: Colors.appBlackColor,
            overflow: 'hidden',
            borderRadius: 30,
            justifyContent: 'center',
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
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                // onSiteUrlPress();
                Linking.openURL(props.data.sd.siteurl);
              }}>
              <Typography variant={'subheader'} style={styles.url}>
                {props.data.sd.siteurl.substring(
                  8,
                  props.data.sd.siteurl.length,
                )}
              </Typography>
            </TouchableOpacity>
            <View style={styles.credIcon}>
              <TouchableOpacity
                onPress={() => {
                  // onSiteUrlPress();
                  Linking.openURL(props.data.sd.siteurl);
                }}>
                <Icon name="launch" color="white" size={14} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <Icon
          name="dots-vertical"
          type="material-community"
          color={Colors.appWhiteColor}
          size={20}
          onPress={() => {
            setIsVisible(true);
          }}
        />
      </View>
    );
  }

  function ListCollapse() {
    return (
      <View style={styles.containerCollapse}>
        <View style={styles.credsCard}>
          <View style={styles.credsCardID}>
            {/* <Icon name="user" type={'antdesign'} color="white" size={12} /> */}
            <Typography style={styles.credTitle}> Username </Typography>
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
          {moment().diff(
            moment(props.data.creadtedtime).utc(),
            'hours',
            false,
          ) <= 2 && (
            <View style={styles.credsCardPassword}>
              <Typography style={styles.credTitle}> Password </Typography>
              <View style={{flex: 1}} />
              <Typography style={{color: 'white', marginLeft: 10}}>
                {props.data.password}
              </Typography>
              <TouchableOpacity
                style={{color: 'white', marginLeft: 15}}
                onPress={() => {
                  Clipboard.setString(props.data.password);
                }}>
                <Icon name="content-copy" color="white" size={15} />
              </TouchableOpacity>
            </View>
          )}
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
              borderColor: Colors.appBlackColorLight,
              borderLeftWidth: 1,
            }}
            onPress={() => {
              props.navigation.navigate('Withdraw', {
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
  }

  const list = [
    {
      title: 'Deposit',
      onPress: () => {
        setIsVisible(false);
        props.navigation.navigate('CreateID', {
          sdid: props.data.sd.sdid,
          username: props.data.username,
          requestStatus: 'old',
        });
      },
    },
    {
      title: 'Withdraw',
      onPress: () => {
        setIsVisible(false);
        props.navigation.navigate('Withdraw', {
          banks: banks,
          data: props.data,
        });
      },
    },
    {
      title: 'Change Password',
      onPress: () => {
        setIsVisible(false);
        setShowPasswordModal(true);
      },
    },
    {
      title: 'Cancel',
      containerStyle: {backgroundColor: Colors.appRedColor},
      titleStyle: {color: Colors.appWhiteColor},
      onPress: () => {
        setIsVisible(false);
      },
    },
  ];

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
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.7)'}}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
      <Portal>
        <PaperModal
          visible={showPasswordModal}
          contentContainerStyle={{
            backgroundColor: Colors.appBlackColorLight,
            margin: 10,
          }}
          onDismiss={() => {
            setShowPasswordModal(false);
          }}>
          <Card style={styles.modalContainer}>
            <Card.Title
              title={'Change Password'}
              subtitle={`Site: ${props.data.sd.sitename} , username: ${props.data.username}`}
            />
            <Card.Content>
              <CommonTextInput
                mode="flat"
                placeholder="Enter new password"
                label="New Password"
                value={password}
                onChangeText={text => {
                  setNewPassword(text);
                }}
              />
              <CommonTextInput
                mode="flat"
                placeholder="Confirm new password"
                label="Confirm new password"
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
              />
            </Card.Content>
            <Card.Actions>
              <View
                style={{
                  flex: 1,
                  margin: 30,
                }}
              />
              <Button
                mode="contained"
                uppercase={false}
                onPress={() => {
                  if (password === confirmPassword) {
                    //change password
                    if (password.length >= 8) {
                      // logic to change password
                      setIsLoading(true);
                      homeController
                        .resetUserSitePassword({
                          newPassword: password,
                          id: props.data.sd.sdid,
                          usdid: props.data.usdid,
                        })
                        .then(() => {
                          setShowPasswordModal(false);
                          setIsLoading(false);
                        })
                        .catch(() => {
                          setShowPasswordModal(false);
                          setIsLoading(false);
                        });
                    } else {
                      alert('Password must be at least 8 characters long');
                    }
                  } else {
                    alert('Password does not match');
                  }
                }}>
                Change password
              </Button>
              <Button
                uppercase={false}
                mode="contained"
                style={{
                  marginLeft: 10,
                }}
                onPress={() => {
                  setShowPasswordModal(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}>
                Cancel
              </Button>
            </Card.Actions>
          </Card>
        </PaperModal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 30,
    padding: 16,
    width: screenWidth,
    borderWidth: 10,
    borderColor: Colors.appBlackColor,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  url: {
    color: Colors.appWhiteColor,
    fontSize: 13,
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
    alignItems: 'center',
    backgroundColor: Colors.appBlackColor,
    padding: 10,
    borderRadius: 10,
  },
  credsCard: {
    marginTop: 10,
    padding: 8,
    backgroundColor: Colors.appBlackColor,
    width: '100%',
  },
  credIcon: {
    marginLeft: 10,
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
    backgroundColor: Colors.appBlackColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopWidth: 1,
    borderColor: Colors.appBlackColorLight,
    padding: 4,
  },
});

const mapStateToProps = state => {
  return {
    walletBalance: state.home.walletBalance,
  };
};

export default connect(mapStateToProps)(HomeListMyIDs);
