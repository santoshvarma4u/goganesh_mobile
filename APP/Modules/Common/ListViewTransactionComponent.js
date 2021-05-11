import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function ListViewTransactionComponent(item) {
  return (
    <View style={styles.container}>
      <Image style={styles.image}></Image>
      <View>
        <Text style={styles.url}>{item.url}</Text>
        <Text style={styles.siteName}>{item.sitename}</Text>
        <Text style={styles.balance}>{item.balance}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
  },
  url: {
    fontWeight: '500',
  },
  siteName: {},
  balance: {},
});

export default ListViewTransactionComponent;
