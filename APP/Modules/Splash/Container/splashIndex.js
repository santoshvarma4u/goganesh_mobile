import {CommonActions} from '@react-navigation/native';
import React, {PureComponent} from 'react';
import {StyleSheet, Linking, Image, Dimensions} from 'react-native';
import {getVersion} from 'react-native-device-info';
import PushNotification from 'react-native-push-notification';
import NotificationsApi from '../../../Network/notifications/notificationAPI';
import Colors from '../../../Theams/Colors';
import ErrorPage from '../../Common/ErrorPage';
import LinearGradient from '../../Common/LinearGradient';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashApi from '../../Splash/Controller/SplashApi';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

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
  constructor(props) {
    super(props);
    this.state = {
      forceUpdate: false,
      forceUpdateMessage: '',
      forceUpdateVersion: '',
      forceUpdateUrl: '',
    };
  }

  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    // get current app version of the app
    let version = getVersion();

    const {data} = await SplashApi.CheckAppUpdate(version);

    if (data?.status === 'update') {
      this.setState({
        forceUpdate: true,
        forceUpdateMessage: data.message,
        forceUpdateVersion: data?.data?.currentVersion,
        forceUpdateUrl: data?.data?.url,
      });
      return;
    }

    let JWT = await Storage.getItemSync(StorageKeys.JWT);

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

  onUpdate = () => {
    Linking.openURL(this.state.forceUpdateUrl);
  };

  render() {
    const {forceUpdate, forceUpdateMessage} = this.state;

    if (forceUpdate) {
      return (
        <ErrorPage
          message={forceUpdateMessage}
          onRetryPress={this.onUpdate}
          retryMessage="Update Now"
        />
      );
    }

    return (
      <LinearGradient
        colors={[
          Colors.appBlackColor,
          Colors.appBlackColor,
          Colors.appBlackColor,
        ]}
        style={styles.splashContainer}>
        <Image
          source={require('../../../Assets/Images/goganeshlogo.png')}
          resizeMode={'contain'}
          width={screenWidth / 2}
          height={screenHeight / 2}
          style={{width: screenWidth / 2, height: screenHeight / 2}}
        />

        {/*<LottieView*/}
        {/*  style={{height: 250, width: '100%'}}*/}
        {/*  source={Animations.splashLoading}*/}
        {/*  autoPlay*/}
        {/*  speed={1}*/}
        {/*/>*/}
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
