import React from 'react';
import {Text, View, Left, Button, StyleSheet} from 'react-native';
import HeaderComponent from '../components/headerComponent';
import {Icon, Header} from 'react-native-elements';
import {FlatListSlider} from 'react-native-flatlist-slider';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
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

function HomeScreen({navigation}) {
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

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },
  centreCard: {
    backgroundColor: 'black',
    width: '35%',
    height: '70%',
    position: 'absolute',
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  createAnnouncement: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  createText: {
    marginTop: 20,
    flex: 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  promotionCard: {
    flex: 0.3,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    color: 'white',
  },
  centralCardView: {
    flex: 1,
    backgroundColor: 'black',
    width: '50%',
    height: '50%',
    flexDirection: 'row',
    marginHorizontal: 45,
    borderRadius: 20,
  },
  depositCard: {
    flex: 0.3,
    flexDirection: 'column',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  blankCard: {
    flex: 0.4,

    backgroundColor: 'white',
  },
  withdrawCard: {
    flex: 0.3,
    flexDirection: 'column',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  upperContainer: {
    backgroundColor: '#e39b11',
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  lowerContainer: {
    backgroundColor: 'black',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 0.7,
    alignItems: 'center',
  },
  lowerBox1: {
    flex: 0.3,
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
  carouselCards: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'green',
  },
});

export default HomeScreen;
