import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import styles from './Styles';
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

export default ProfileScreen;
