import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import CodePush from 'react-native-code-push';
import OneSignal from 'react-native-onesignal';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import CONSTANTS from './APP/Constants';
import {AppContainer, _navigationRef} from './APP/Navigation/navigation';
import {store} from './APP/Store/Index';
import Colors from './APP/Theams/Colors';
// eslint-disable-next-line import/order
import Bugsnag from '@bugsnag/react-native';
// import GlobalFont from './GlobalFont';
if (__DEV__) {
  import('./APP/Modules/Common/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
/**
 * One Signal Setup
 */

Bugsnag.start();

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const ErrorView = () => (
  <View>
    <Text>Something went wrong.</Text>
  </View>
);

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
    let notification = notificationReceivedEvent.getNotification();
    const data = notification.additionalData;
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
      fontFamily: 'Montserrat-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Montserrat-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Montserrat-Light',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'Montserrat-Bold',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.appPrimaryColor,
    ...Colors,
  },
  fonts: configureFonts(fontConfig),
};
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
class App extends Component {
  render() {
    // Setting a global font here for more refer https://github.com/nguyenhuynghia/react-native-global-font
    //Provider from redux

    return (
      <ErrorBoundary FallbackComponent={ErrorView}>
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <NavigationContainer ref={_navigationRef}>
              <AppContainer />
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      </ErrorBoundary>
    );
  }
}

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
