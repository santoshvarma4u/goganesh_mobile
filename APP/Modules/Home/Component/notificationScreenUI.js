import React, {useState, useEffect} from 'react';
import {Text, Image, View, FlatList, StyleSheet} from 'react-native';
import styles from './Styles';
import {SliderBox} from 'react-native-image-slider-box';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import HomeController from '../Controller/homeController';
function NotificationScreen({navigation}) {
  const notifications = HomeController.getNotifications();

  const renderNotificationItem = item => {
    return (
      <View style={styles.containerMain}>
        <Text>title {item.notificationTitle}</Text>
        <Text>message {item.notificationMessage}</Text>
      </View>
    );
  };
  return (
    <View style={styles.containerMain}>
      <View />
      <View style={styles.offersContainer}>
        <View style={styles.offersCard}>
          <FlatList
            onRefresh={() => {
              notifications.request();
            }}
            inverted={false}
            refreshing={false}
            data={notifications.data}
            renderItem={({item}) => renderNotificationItem(item)}
          />
        </View>
      </View>
    </View>
  );
}

export default NotificationScreen;
