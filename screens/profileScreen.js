import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {Avatar, Chip, Icon, withBadge} from 'react-native-elements';
function ProfileScreen({navigation}) {
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Icon name="person"></Icon>
        </View>
        <View style={styles.profileDetails}>
          <Text style={{padding: 10}}>Name</Text>
          <Text style={{padding: 10}}>+91 9959052330</Text>
          <Chip title="Change Password" />
          <Text style={{padding: 10}}>Member Since :</Text>
        </View>
        <View style={styles.profileDetails}></View>
        <View style={styles.profileDetails}></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },

  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
  },
  profileDetails: {
    flex: 0.25,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
});
export default ProfileScreen;
