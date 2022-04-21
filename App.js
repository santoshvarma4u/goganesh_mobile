import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import OneSignal from 'react-native-onesignal';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import CONSTANTS from './APP/Constants';
import {AppContainer} from './APP/Navigation/navigation';
import {store} from './APP/Store/Index';
import Colors from './APP/Theams/Colors';
// import GlobalFont from './GlobalFont';

if (__DEV__) {
  import('./APP/Modules/Common/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
/**
 * One Signal Setup
 */

//OneSignal Init Code
OneSignal.setLogLevel(6, 0);
OneSignal.setAppId(CONSTANTS.ONE_SIGNAL_APP_ID);
//END OneSignal Init Code

//Prompt for push on iOS
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log('Prompt response:', response);
});

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(
  notificationReceivedEvent => {
    console.log(
      'OneSignal: notification will show in foreground:',
      notificationReceivedEvent,
    );
    let notification = notificationReceivedEvent.getNotification();
    console.log('notification: ', notification);
    const data = notification.additionalData;
    console.log('additionalData: ', data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  },
);

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log('OneSignal: notification opened:', notification);
});

// One Signal Setup End

const fontConfig = {
  ios: {
    regular: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'Lato-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Lato-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Lato-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Lato-Bold',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    primary: Colors.appPrimaryColor,
    ...DefaultTheme.colors,
  },
  fonts: configureFonts(fontConfig),
};
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
export default class App extends Component {
  render() {
    // Setting a global font here for more refer https://github.com/nguyenhuynghia/react-native-global-font
    // GlobalFont.applyGlobal('Lato-Regular');
    //Provider from redux

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppContainer />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
