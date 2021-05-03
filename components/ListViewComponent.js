import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

function ListViewComponent(item) {
  return (
    <View style={styles.container}>
      <Image style={styles.image}></Image>
      <View>
        <Text style={styles.url}>{item.url}</Text>
        <Text style={styles.siteName}>{item.sitename}</Text>
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
    width: 75,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'black',
    marginRight: 10,
  },
  url: {
    fontWeight: '500',
  },
  siteName: {},
});

export default ListViewComponent;
