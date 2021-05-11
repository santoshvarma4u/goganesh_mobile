import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styles from './Styles';
function OffersScreen({navigation}) {
  return (
    <View style={styles.containerMain}>
      <View></View>
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Offers</Text>
        </View>
        <View style={styles.offersCard}></View>
        <View style={styles.offersCard}></View>
        <View style={styles.offersCard}></View>
      </View>
    </View>
  );
}

export default OffersScreen;
