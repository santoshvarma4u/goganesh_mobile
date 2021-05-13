import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {AppContainer} from './APP/Navigation/navigation';

// open "rndebugger://set-debugger-loc?host=localhost&port=8081"
export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <AppContainer />
      </NavigationContainer>
    );
  }
}
