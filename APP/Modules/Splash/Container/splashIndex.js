import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashScreen from '../Component/splashScreenUI';
import {CommonActions} from '@react-navigation/native';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import PushNotification from 'react-native-push-notification';
import NotificationsApi from '../../../Network/notifications/notificationAPI';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: async function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
    let uid = await Storage.getItemSync(StorageKeys.ID);
    let noti = {
      uid: uid,
      notificationTitle: notification.title,
      notificationMessage: notification.message,
    };
    const result = await NotificationsApi.createNotification(noti);
    if (!result.ok) {
      console.log(result);
      return alert(result.problem);
    }
    console.log('notifaication saved sucessfully');
    PushNotification.localNotification(notification);
  },
  onRegister: async function (token) {
    console.log('TOKEN:', token);
    await Storage.setItemSync(StorageKeys.FCMTOKEN, token.token);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

PushNotification.createChannel(
  {
    channelId: 'fcm_fallback_notification_channel', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export default class Splash extends PureComponent {
  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    let JWT = await Storage.getItemSync(StorageKeys.JWT);
    let ID = await Storage.getItemSync(StorageKeys.ID);
    let FCMTOKEN = await Storage.getItemSync(StorageKeys.FCMTOKEN);
    authKey.token = JWT;
    if (JWT) {
      console.log('inside splash check');
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
