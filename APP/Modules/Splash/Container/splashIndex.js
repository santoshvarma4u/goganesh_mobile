import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashScreen from '../Component/splashScreenUI';
import {CommonActions} from '@react-navigation/native';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import {regToken} from '../../Common/pushNotifications';
export default class Splash extends PureComponent {
  componentDidMount = () => {
    regToken();
    this.learnMorePress();
  };

  learnMorePress = async () => {
    let JWT = await Storage.getItemSync(StorageKeys.JWT);
    let ID = await Storage.getItemSync(StorageKeys.ID);
    let FCMTOKEN = await Storage.getItemSync(StorageKeys.FCMTOKEN);
    authKey.token = JWT;
    if (JWT) {
      NetworkAPI.apiClient.setHeader('authorization', authKey.token);
      console.log(FCMTOKEN);
      await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
    }
    console.log('authkey from splasl', authKey.token);
    //  reactotron.log(JWT);
    setTimeout(() => {
      if (JWT) {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'App'}],
        });
        this.props.navigation.dispatch(resetAction);
      } else {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{name: 'Auth'}],
        });
        this.props.navigation.dispatch(resetAction);
      }
    }, 1000);
  };

  render() {
    return (
      <View style={styles.splashContainer}>
        <SplashScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 108,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
