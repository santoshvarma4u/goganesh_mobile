import React from 'react';
import {Text, View, Left, Button, StyleSheet} from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import styles from './Styles';
const images = [
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
          </View>
          <View style={styles.blankCard}></View>
          <View style={styles.withdrawCard}>
            <Text style={styles.text}>WITHDRAW</Text>
          </View>
        </View>
        <View style={styles.centreCard}>
          <Text style={styles.text}>WALET BALANCE</Text>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.lowerBox1}>
          <FlatListSlider
            data={images}
            timer={4000}
            onPress={item => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position: 'absolute', bottom: 10}}
            indicatorActiveColor={'#e39b11'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
        </View>
        <View style={styles.createText}>
          <Text>create</Text>
        </View>
        <View style={styles.promotionCard}></View>
        <View style={styles.createAnnouncement}>
          <Text>create</Text>
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
