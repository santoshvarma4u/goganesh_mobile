import React from 'react';
import {Text, View, Left, Button, StyleSheet, Image} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import styles from './Styles';
import {Icon} from "react-native-elements";

import images from '../../../Theams/Images';
import Colors from "../../../Theams/Colors";
const sliderImages = [
  {
    image:
      'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    desc: 'Silent Waters in the mountains in midst of Himilayas',
  },
  {
    image:
      'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
    desc:
      'Red fort in India New Delhi is a magnificient masterpeiece of humans',
  },
];

function HomeScreen() {
  return (
    <View style={styles.containerMain}>
      <View style={styles.upperContainer}>
        <View style={styles.centralCardView}>
          <View style={styles.depositCard}>
            <Text style={styles.text}>DEPOSIT</Text>
            <Icon name="file-upload" color="white" size={34} />
          </View>
          <View style={styles.blankCard} />
          <View style={styles.withdrawCard}>
            <Text style={styles.text}>WITHDRAW</Text>
            <Icon name="file-download" color="white" size={34} />
          </View>
        </View>
        <View style={styles.centreCard}>
          <Image style={styles.image} source={images.logo}></Image>
          <Text style={styles.text}>Wallet Balance</Text>
          <Text style={styles.text}>0 INR</Text>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.lowerBox1}>
          <FlatListSlider
            data={sliderImages}
            timer={4000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position: 'absolute', bottom: 10}}
            indicatorActiveColor={Colors.appPrimaryColor}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
        </View>
        <View style={styles.createText}>
          <Icon name="add" color="white" size={20} />
          <Text style={styles.createTextOnly}>Create</Text>
        </View>
        {/*<View style={styles.promotionCard} />*/}
        <View style={styles.createAnnouncement}>
          <Text style={styles.tipsText}>Tips & Announcements</Text>
          <Text style={styles.tipsSubText}>No Data Available</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
