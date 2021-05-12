import React, {PureComponent} from 'react';
import {View} from 'react-native';

import styles from './Styles';
import {SplashScreen} from '../Component/splashScreenUI';

export default class Splash extends PureComponent {
  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    let JWT = await Storage.getItemSync(StorageKeys.JWT);
    setTimeout(() => {
      if (JWT) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    }, 1000);
  };
  render() {
    return (
      <View style={[styles.container]}>
        <SplashScreen />
      </View>
    );
  }
}
