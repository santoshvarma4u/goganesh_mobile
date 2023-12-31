import PushNotification from 'react-native-push-notification';
import Storage from './Storage';
import NotificationAPI from './../../Network/notifications/notificationAPI';
import StorageKeys from './StorageKeys';

export const regToken = () => {
  PushNotification.configure({
    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
      
    },
    onRegister: async function (token) {
      
      await Storage.setItemSync(StorageKeys.FCMTOKEN, token.token);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  PushNotification.createChannel(
    {
      channelId: 'channel-id-1', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => 
  );
};

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: 'Welcome To GoGanesh.',
    subText: '',
    title: 'Local Notification Title',
    message: 'Welcome To GoGanesh',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
    channelId: 'channel-id-1',
  });
};
