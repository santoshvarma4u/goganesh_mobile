/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, Image, View, FlatList} from 'react-native';
import styles from './Styles';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import HomeController from '../Controller/homeController';
import moment from 'moment';
function NotificationScreen({navigation}) {
  const notifications = HomeController.getNotifications();

  const renderNotificationItem = item => {
    let date = moment(item.updatedtime).format('DD MMMM YYYY HH:MM a');

    return (
      <View style={styles.listContainer}>
        <View>
          {/* for the rejected case add the source as source={true === accept ?  images.accept} */}

          <Image
            style={{height: 18, width: 18}}
            source={
              item.notificationTitle.includes('rejected')
                ? images.reject
                : images.accept
            }
          />
        </View>
        <View style={{marginLeft: 14}}>
          <Text style={{color: Colors.appWhiteColor, fontSize: 14}}>
            {item.notificationTitle}
          </Text>
          <Text style={{color: Colors.appWhiteColor, fontSize: 10}}>
            {item.notificationMessage}
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            paddingTop: 2,
            backgroundColor: Colors.appPrimaryColor,
            borderTopWidth: 0.5,
            borderRightWidth: 0.5,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 5,
          }}>
          <Text
            style={{
              color: Colors.backgroundColor,
              fontSize: 10,
              padding: 4,
              paddingLeft: 5,
            }}>
            {date}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.containerNotification}>
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
