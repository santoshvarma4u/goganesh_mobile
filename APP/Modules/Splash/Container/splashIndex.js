import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashScreen from '../Component/splashScreenUI';
import {CommonActions} from '@react-navigation/native';

export default class Splash extends PureComponent {
  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    let JWT = await Storage.getItemSync(StorageKeys.JWT);
    let ID = await Storage.getItemSync(StorageKeys.ID);
    console.log(ID);
    setTimeout(() => {
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
