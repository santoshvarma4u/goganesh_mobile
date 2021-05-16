import React from 'react';
import {View, Image, Text} from 'react-native';
import images from '../../../Theams/Images';
import Storage from '../../Common/Storage';
import styles from './Styles';

const SplashView = props => {
  return (
    <View style={styles.splashContainer}>
      <View style={{flex: 1}}>
        <Image source={images.splashlogo} resizeMode={'contain'} />
      </View>
    </View>
  );
};

export default SplashView;
