import {Icon} from '@rneui/base';
import moment from 'moment';
import React from 'react';
import {View, StyleSheet, Image, Pressable, Linking} from 'react-native';
import Colors from '../../../Theams/Colors';
import {removeHttpOrWww} from '../../../Utils';
import {Typography} from '../../Common/Text';

const SiteDetails = ({siteDetails}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View>
        <Image
          source={{uri: siteDetails?.siteimage}}
          style={{width: 75, height: 75}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          justifyContent: 'space-between',
        }}>
        <Pressable
          style={styles.row}
          onPress={() => {
            Linking.openURL(siteDetails?.siteurl);
          }}>
          <Typography variant="H3" style={styles.text}>
            {removeHttpOrWww(siteDetails?.siteurl)}
          </Typography>
          <Icon name="launch" size={20} color={Colors.appWhiteColor} />
        </Pressable>
        <View style={styles.row}>
          <Icon
            name="web"
            size={20}
            type="material-community"
            color={Colors.appWhiteColor}
            style={{marginRight: 5}}
          />
          <Typography style={styles.text}>{siteDetails?.sitename}</Typography>
        </View>
        <View style={styles.row}>
          <Icon
            name="account-circle"
            type="material-community"
            size={20}
            color={Colors.appWhiteColor}
            style={{marginRight: 5}}
          />
          <Typography style={styles.text}>
            Username: {siteDetails?.demoid}
          </Typography>
        </View>
        <View style={styles.row}>
          <Icon
            name="lock"
            size={20}
            color={Colors.appWhiteColor}
            style={{marginRight: 5}}
          />
          <Typography style={styles.text}>
            Password: {siteDetails?.demopassword}
          </Typography>
        </View>
        <Typography
          style={[
            styles.text,
            {
              color: Colors.appPrimaryColor + 'dd',
              marginLeft: 20,
            },
          ]}
          variant="caption">
          ( password is case-sensitive )
        </Typography>
        <View style={styles.row}>
          <Icon
            name="calendar"
            type="material-community"
            size={20}
            color={Colors.appWhiteColor}
            style={{marginRight: 5}}
          />
          <Typography style={styles.text}>
            {moment(siteDetails?.creadtedtime).format('DD MMM YYYY  hh:mm A')}
          </Typography>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  text: {
    color: Colors.appWhiteColor,
    marginRight: 5,
  },
});

export default SiteDetails;
