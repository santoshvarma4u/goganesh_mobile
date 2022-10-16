import {Divider, Icon} from '@rneui/themed';
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
} from 'react-native';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import styles from '../../Splash/Component/Styles';
function RulesScreen({route}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.appBlackColor,
      }}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Typography
          variant={'title'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          🙏🏻 READ RULES CAREFULLY 🙏🏻 👇🏻{'\n'}
        </Typography>
        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 1 MIN Deposit - 1,000 1,000 MIN Withdraw - 1,000
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 2 Deposit Processing Time 5 to 10 Minutes Withdraw
          Processing Time 30 min Hour
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 3 Circket Winning Limit Per Day - 25 Lakhs Casino Winning
          Limit Per Day - 10Lakhs
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 4 Per Day Withdraw Limit-25 Lakhs Per Day Deposit Limit -
          25 Lakhs
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 5 We Make Bank Account and Paytm Transfers Only... Must
          and Should Everyone Register Your Permanent Bank Account Details Only
          With Us. Before Asking withdraws
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 6 We are Not Responsible with Payments & Withdraws Through
          using Phone pe & Google pay When its Goes to Pending... U have to Face
          it
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 7 Dont Ask for Any Credits & Bouns Because We are Not
          Providing This
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:-8 Screenshot is vaild for 30 mins only from the Time U send
          the Payment
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:-9 There is Any problem with Server Issue about Late Settel
          of Bet or Wrong Result U have to wait for 72hrs
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 10 We are Only Responsible with Ur Correct Statement
          Without Correct Statement We are not responsible for Ur Complaints and
          Issue's Statement Is final to Everyone
        </Typography>

        <Typography
          variant={'subheader'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          * Rule No:- 11 Company Result is Final to Everyone Everyone Must and
          Should Have to Follow this Rules Seriously to Support Us for Better
          Service... (Working Hours - 7 a.m to 1am)
        </Typography>
        <Typography
          variant={'H3'}
          style={{
            color: Colors.appWhiteColor,
            fontSize: 16,
            marginVertical: 10,
          }}>
          FGPUNT TEAM
        </Typography>
      </ScrollView>
    </View>
  );
}

export default RulesScreen;
