import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {Provider} from 'react-redux';
import {AppContainer} from './APP/Navigation/navigation';
import {store} from './APP/Store/Index';
import GlobalFont from './GlobalFont';
if (__DEV__) {
  import('./APP/Modules/Common/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

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
    ...DefaultTheme.colors,
  },
  fonts: configureFonts(fontConfig),
};
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
export default class App extends Component {
  render() {
    // Setting a global font here for more refer https://github.com/nguyenhuynghia/react-native-global-font
    GlobalFont.applyGlobal('Lato-Regular');
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
