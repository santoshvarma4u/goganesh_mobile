import {CommonActions} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PushNotification from 'react-native-push-notification';
import SplashLogo from '../../../Assets/svgs/SplashLogo';
import FGLogo from '../../../Assets/svgs/fglogo1';
import FGLOGO2 from '../../../Assets/svgs/fglogo2';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import NotificationsApi from '../../../Network/notifications/notificationAPI';
import Animations from '../../../Theams/Animations';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: async function (notification) {
    let uid = await Storage.getItemSync(StorageKeys.ID);
    let noti = {
      uid: uid,
      notificationTitle: notification.title,
      notificationMessage: notification.message,
    };
    const result = await NotificationsApi.createNotification(noti);
    if (!result.ok) {
      return alert(result.problem);
    }

    PushNotification.localNotification(notification);
  },
  onRegister: async function (token) {
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
  created => {}, // (optional) callback returns whether the channel was created, false means it already existed.
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
      NetworkAPI.apiClient.setHeader('authorization', authKey.token);
      await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
    }
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
  };

  render() {
    return (
      <LinearGradient
        colors={[
          Colors.appBlackColorLight,
          Colors.appBlackColor,
          Colors.backgroundColor,
        ]}
        style={styles.splashContainer}>
        <FGLOGO2 height={250} width={250} fill={Colors.appPrimaryColor} />
        <LottieView
          style={{height: 250, width: '100%'}}
          source={Animations.splashLoading}
          autoPlay
          speed={1}
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBlackColorLight,
  },
});
