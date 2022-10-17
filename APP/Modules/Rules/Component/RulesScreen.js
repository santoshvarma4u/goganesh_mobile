import {Divider, Icon} from '@rneui/themed';
import {FlashList} from '@shopify/flash-list';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import styles from '../../Splash/Component/Styles';

const RULES = [
  'MIN Deposit - 1,000 1,000 MIN Withdraw - 1,000',
  'Deposit Processing Time 5 to 10 Minutes Withdraw Processing Time 30 min Hour',
  'Circket Winning Limit Per Day - 25 Lakhs Casino Winning Limit Per Day - 10Lakhs',
  'Per Day Withdraw Limit-25 Lakhs Per Day Deposit Limit - 25 Lakhs',
  'We Make Bank Account and Paytm Transfers Only... Must and Should Everyone Register Your Permanent Bank Account Details Only With Us. Before Asking withdraws',
  'We are Not Responsible with Payments & Withdraws Through using Phone pe & Google pay When its Goes to Pending... U have to Face it',
  'Dont Ask for Any Credits & Bouns Because We are Not Providing This',
  'Screenshot is vaild for 30 mins only from the Time U send the Payment',
  'There is Any problem with Server Issue about Late Settel of Bet or Wrong Result U have to wait for 72hrs',
  "We are Only Responsible with Ur Correct Statement Without Correct Statement We are not responsible for Ur Complaints and Issue's Statement Is final to Everyone",
  'Company Result is Final to Everyone Everyone Must and Should Have to Follow this Rules Seriously to Support Us for Better Service... (Working Hours - 7 a.m to 1am)',
];
function RulesScreen({route}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.appBlackColor,
        paddingHorizontal: 24,
      }}>
      <Typography
        variant={'title'}
        style={{
          color: Colors.appWhiteColor,
          fontSize: 16,
          marginVertical: 10,
          textAlign: 'center',
        }}>
        🙏🏻 READ RULES CAREFULLY 🙏🏻 👇🏻{'\n'}
      </Typography>
      <FlashList
        data={RULES}
        renderItem={({item, index}) => (
          <View
            style={{
              padding: 5,
              borderRadius: 10,
              borderBottomWidth: 1,
              borderColor: Colors.appWhiteColor + '50',
            }}>
            <Typography
              variant={'subheader'}
              style={{
                color: Colors.appPrimaryColor,
              }}>
              Rule No - {index + 1} :
            </Typography>
            <Typography
              variant={'paragraph'}
              style={{color: Colors.appWhiteColor}}>
              {item}
            </Typography>
          </View>
        )}
      />
    </View>
  );
}

export default RulesScreen;
