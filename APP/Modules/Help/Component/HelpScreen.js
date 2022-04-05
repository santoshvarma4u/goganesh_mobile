import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
} from 'react-native';
import {Divider, Icon} from 'react-native-elements';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import styles from '../../Splash/Component/Styles';
function HelpScreen({route}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.appBlackColor,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={images.concern}
          style={{height: 200, width: 200, marginTop: 100}}
          resizeMode={'contain'}
        />
        <Typography
          style={{
            color: Colors.appPrimaryColor,
            fontSize: 20,
            marginVertical: 10,
          }}>
          Raise your concern
        </Typography>
        <Typography
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 5,
          }}>
          {' '}
          How can we help you{' '}
        </Typography>
        <TouchableOpacity
          onPress={() => {
            let url =
              'whatsapp://send?text= Please raise your concern here' +
              '&phone=919398322333';
            Linking.openURL(url);
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: 120,
              height: 50,
              marginTop: 100,
              backgroundColor: Colors.appPrimaryColor,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image style={{height: 20, width: 20}} source={images.whatsapp} />
            <Typography> Whatsapp </Typography>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HelpScreen;
