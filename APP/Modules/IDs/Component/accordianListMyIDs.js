/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {BottomSheet, Icon, Card as ElementsCard} from '@rneui/themed';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Modal,
  FlatList,
  Linking,
} from 'react-native';

import {Button, Card, Modal as PaperModal, Portal} from 'react-native-paper';
import Popover from 'react-native-popover-view';
import WebView from 'react-native-webview';

import {connect} from 'react-redux';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import metrics from '../../../Theams/Metrics';
import {removeHttpOrWww} from '../../../Utils';
import CommonTextInput from '../../Common/CommonTextInput';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';
import TypographyStyles from '../../Common/Text/Text.styles';
import homeController from '../../Home/Controller/homeController';
import IdController from '../Controller/IdController';
const AccordianListNew = props => {
  const [showWebView, setShowWebView] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [showPopover, setShowPopover] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showCloseIDAlert, setShowCloseIDAlert] = useState(false);

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

  const closeID = usdid => {
    setIsLoading(true);
    IdController.closeID(usdid)
      .then(res => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
        props?.doRefresh();
      })
      .done();
  };

  const list = [
    {
      title: 'Deposit',
      onPress: () => {
        navigation.navigate('CreateID', {
          sdid: props.data.sd.sdid,
          username: props.data.username,
          requestStatus: 'old',
          usdid: props.data?.usdid,
        });
      },
    },
    {
      title: 'Withdraw',
      onPress: () => {
        navigation.navigate('Withdraw', {
          banks: banks,
          data: props.data,
        });
      },
    },
    {
      title: 'View Transactions',
      onPress: () => {
        navigation.navigate('IDDetails', {
          sdid: props.data.sd.sdid,
        });
      },
    },
    {
      title: 'Change Password',
      onPress: () => {
        setShowPasswordModal(true);
      },
    },
  ];

  function ListTitle() {
    return (
      <View style={styles.ListTitle}>
        <View style={styles.image}>
          <FGImage
            style={styles.image}
            source={{uri: props.data.sd.siteimage}}
            resizeMode="contain"
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              // setShowWebView(true);
              Linking.openURL(props.data.sd.siteurl);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 10,
            }}>
            <Typography variant="caption" style={styles.url}>
              {removeHttpOrWww(props.data.sd.siteurl)}
            </Typography>
          </TouchableOpacity>
          {/* <View style={{flexDirection: 'row'}}>
            <Typography style={styles.siteName} variant={'h4'}>
              {' '}
              {props.data.sd.sitename}
            </Typography>
          </View> */}
          <View style={{flexDirection: 'row'}}>
            <Typography variant="H5" style={styles.siteName}>
              {props?.data?.username}
            </Typography>
          </View>
        </View>
        <View
          style={{
            flex: 1,
          }}
        />
        <View
          style={[
            styles.credIcon,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 5,
            },
          ]}>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#0E8735',
              borderRadius: 20,
              marginHorizontal: 14,
            }}
            onPress={() => {
              props.navigation.navigate('CreateID', {
                sdid: props.data.sd.sdid,
                username: props.data.username,
                requestStatus: 'old',
                usdid: props.data?.usdid,
              });
            }}>
            <Typography variant={'H5'} style={styles.credTitle}>
              D
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 24,
              width: 24,
              justifyContent: 'center',
              alignItems: 'center',
              // medium red
              backgroundColor: '#DE4C45',
              borderRadius: 20,
            }}
            onPress={() => {
              props.navigation.navigate('Withdraw', {
                banks: banks,
                data: props.data,
              });
            }}>
            <Typography variant={'H5'} style={styles.credTitle}>
              W
            </Typography>
          </TouchableOpacity>
        </View>
        <Popover
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={
            <TouchableOpacity onPress={() => setShowPopover(true)}>
              <Icon
                name="dots-vertical"
                type="material-community"
                color={Colors.appPrimaryColor + '90'}
                size={25}
                style={{
                  backgroundColor: Colors.buttonBackgroundColor,
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          }>
          <View
            style={{
              backgroundColor: Colors.appWhiteColor,
              borderRadius: metrics.borderRadius,
              width: 150,
            }}>
            <FlatList
              data={list}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={() => (
                <View style={styles.menuItemDivider} />
              )}
              renderItem={({item}) => {
                return (
                  <View style={{}}>
                    <Typography
                      onPress={() => {
                        setShowPopover(false);
                        item.onPress();
                      }}
                      style={styles.menuItemText}
                      mode="contained">
                      <Typography>{item.title}</Typography>
                    </Typography>
                  </View>
                );
              }}
            />
            <View style={styles.menuItemDivider} />
            <Typography
              style={styles.menuItemText}
              onPress={() => {
                setIsVisible(false);
                setShowCloseIDAlert(true);
              }}>
              <Typography>Close ID</Typography>
            </Typography>
          </View>
        </Popover>
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
          {moment().diff(
            moment(props.data.creadtedtime).utc(),
            'hours',
            false,
          ) < 2 && (
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
          )}
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
        <WebView source={{uri: props.data.sd.siteurl}} />
      </Modal>
      <Portal>
        <PaperModal
          visible={showCloseIDAlert}
          contentContainerStyle={{
            backgroundColor: Colors.appBlackColorLight,
            margin: 10,
          }}
          onDismiss={() => {
            setShowCloseIDAlert(false);
          }}>
          <Card style={styles.modalContainer}>
            <Card.Title
              title={'Close ID'}
              subtitle={`Site: ${props.data.sd.sitename} , username: ${props.data.username}`}
            />
            <Card.Content>
              <Typography variant="H6">
                Make sure withdraw all balance from site before close.
              </Typography>
              <Typography variant="H6">
                Are you sure you want to close this ID?
              </Typography>
              <Card.Actions>
                <Button
                  style={{marginLeft: 10, width: 100}}
                  onPress={() => {
                    setShowCloseIDAlert(false);
                    closeID(props.data.usdid); // close ID
                  }}
                  color={Colors.appGreenColor}
                  mode="contained">
                  <Typography style={{alignItems: 'center', color: 'white'}}>
                    Yes
                  </Typography>
                </Button>
                <Button
                  style={{marginLeft: 10, width: 100}}
                  onPress={() => {
                    setShowCloseIDAlert(false);
                  }}
                  color={Colors.appRedColor}
                  mode="contained">
                  <Typography style={{alignItems: 'center', color: 'white'}}>
                    No
                  </Typography>
                </Button>
              </Card.Actions>
            </Card.Content>
          </Card>
        </PaperModal>
      </Portal>
      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.8)'}}>
        <View
          style={{
            backgroundColor: Colors.appBlackColor,
          }}>
          <ElementsCard.Title>{props.data.sd.sitename}</ElementsCard.Title>
          <ListCollapse />
          <Button
            color={Colors.appRedColor}
            onPress={() => {
              setIsVisible(false);
            }}>
            cancel
          </Button>
        </View>
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
    borderRadius: 6,
    padding: 8,
  },
  image: {
    width: 50,
    height: 50,
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
    alignItems: 'center',
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
    borderRadius: 30,
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
  menuItemText: {
    marginVertical: 8,
    marginHorizontal: 10,
    color: Colors.appBlackColor,
    ...TypographyStyles.H5,
  },
  menuItemDivider: {
    height: 1,
    backgroundColor: Colors.disabled + '50',
    marginVertical: 2,
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
