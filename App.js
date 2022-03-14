import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import {AppContainer} from './APP/Navigation/navigation';
import {store} from './APP/Store/Index';
import GlobalFont from './GlobalFont';

if (__DEV__) {
  import('./APP/Modules/Common/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}
// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
export default class App extends Component {
  render() {
    // Setting a global font here for more refer https://github.com/nguyenhuynghia/react-native-global-font
    GlobalFont.applyGlobal('Lato-Regular');
    //Provider from redux

    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppContainer />
        </NavigationContainer>
      </Provider>
    );
  }
}
