/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React from 'react';
import {Image, View, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
import CONSTANTS, {userFriendlyPaymentMessage} from '../../../Constants';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import HomeController from '../Controller/homeController';
import styles from './Styles';
function NotificationScreen({navigation}) {
  const notifications = HomeController.getNotifications();

  const renderStatusIcons = paymentStatus => {
    if (paymentStatus?.includes('Rejected')) {
      return images.reject;
    } else if (paymentStatus?.includes('Pending')) {
      return images.expired;
    } else if (paymentStatus?.includes('Accepted')) {
      return images.accept;
    }
  };
  const renderNotificationItem = item => {
    let date = moment(item.updatedtime).format('Do MMMM YYYY, h:mm:ss a');

    return (
      <View style={styles.listContainer}>
        <View>
          <Image
            style={{height: 18, width: 18}}
            source={renderStatusIcons(item.paymentStatus)}
          />
        </View>
        <View style={{marginLeft: 14, marginTop: 20}}>
          <Typography style={{color: Colors.appWhiteColor, fontSize: 14}}>
            {userFriendlyPaymentMessage(item?.remarks, item?.paymentStatus)}
          </Typography>
          <Typography
            style={{color: Colors.appWhiteColor, fontSize: 12, marginTop: 10}}>
            💸 Amount : ₹ {item?.paymentAmount}
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
