import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ListViewComponent from './ListViewComponent';
import PassBoookController from '../Controller/passBookController';

import styles from './Styles';
function PassbookScreen({navigation}) {
  const {data, success} = PassBoookController.useGetUserTransasctions();
  useEffect(() => {
    if (success) {
      console.log(data);
    } else {
      console.log('failed');
    }
  }, []);
  return (
    <View style={styles.containerMain}>
      <View></View>
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Transactions</Text>
        </View>
        <ListViewComponent data={data} />
      </View>
    </View>
  );
}

export default PassbookScreen;
