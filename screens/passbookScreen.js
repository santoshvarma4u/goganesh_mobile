import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HeaderComponent from '../components/headerComponent';
import ListViewComponent from '../components/ListViewComponent';
function PassbookScreen(props) {
  return (
    <View style={styles.containerMain}>
      <View>
        <HeaderComponent />
      </View>
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Transactions</Text>
        </View>
        <ListViewComponent />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },

  offersContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 10,
  },
  offersCard: {
    flex: 0.25,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  topOffers: {
    backgroundColor: 'white',
    padding: 10,
  },
});
export default PassbookScreen;
