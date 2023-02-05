import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {AppContainer, _navigationRef} from './APP/Navigation/navigation';
import {store} from './APP/Store/Index';
import Colors from './APP/Theams/Colors';

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
export default class App extends Component {
  render() {
    // Setting a global font here for more refer https://github.com/nguyenhuynghia/react-native-global-font
    //Provider from redux

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer ref={_navigationRef}>
            <AppContainer />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
}
