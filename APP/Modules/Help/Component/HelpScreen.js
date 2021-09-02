import React, {useState, useEffect} from 'react';
import {
    Text,
    View,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    Modal, Linking,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import styles from '../../Splash/Component/Styles';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
function HelpScreen({route}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={images.concern}
          style={{height: 200, width: 200, marginTop: 100}}
          resizeMode={'contain'}
        />
        <Text
          style={{
            color: Colors.appPrimaryColor,
            fontSize: 20,
            marginVertical: 10,
          }}>
          Raise your concern
        </Text>
        <Text
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 5,
          }}>
          {' '}
          How can we help you{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('tel:${+919398322333}');
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              height: 50,
              marginTop: 100,
              backgroundColor: Colors.appPrimaryColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="call" size={20} />
            <Text> Call Us </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HelpScreen;
