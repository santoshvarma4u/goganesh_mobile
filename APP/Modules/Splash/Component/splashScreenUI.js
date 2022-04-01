import React from 'react';
import {View, Image, Text} from 'react-native';
import SplashLogo from '../../../Assets/svgs/SplashLogo';
import styles from './Styles';

const SplashView = props => {
  return (
    <View style={styles.splashContainer}>
      <View style={{flex: 1}}>
        <SplashLogo />
      </View>
    </View>
  );
};

export default SplashView;
