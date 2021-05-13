import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashScreen from '../Component/splashScreenUI';

export default class Splash extends PureComponent {
  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    let JWT = await Storage.getItemSync(StorageKeys.NAME);
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
      <View style={styles.splashContainer}>
        <SplashScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 108,
  },
  splashContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
