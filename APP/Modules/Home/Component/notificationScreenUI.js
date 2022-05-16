/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {Image, View, FlatList} from 'react-native';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import HomeController from '../Controller/homeController';
import styles from './Styles';
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
              item?.notificationTitle?.includes('rejected')
                ? images.reject
                : images.accept
            }
          />
        </View>
        <View style={{marginLeft: 14}}>
          <Typography style={{color: Colors.appWhiteColor, fontSize: 14}}>
            {item?.notificationTitle}
          </Typography>
          <Typography style={{color: Colors.appWhiteColor, fontSize: 10}}>
            {item?.notificationMessage}
          </Typography>
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
          <Typography
            style={{
              color: Colors.backgroundColor,
              fontSize: 10,
              padding: 4,
              paddingLeft: 5,
            }}>
            {date}
          </Typography>
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
