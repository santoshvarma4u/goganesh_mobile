import React from 'react';
import {View, Image, Text} from 'react-native';
import images from '../../../Themes/Images';

import styles from './Styles';
import {Metrics} from '../../../Themes';

export const SplashView = props => {
  return (
    <View style={styles.splashContainer}>
      <View style={{flex: 1}}>
        <Image source={images.splashlogo} resizeMode={'contain'} />
      </View>
    </View>
  );
};
