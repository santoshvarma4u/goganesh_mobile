import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ListViewComponent from './ListViewComponent';
import styles from './Styles';
function PassbookScreen({navigation}) {
  return (
    <View style={styles.containerMain}>
      <View></View>
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Transactions</Text>
        </View>
        <ListViewComponent />
      </View>
    </View>
  );
}

export default PassbookScreen;
