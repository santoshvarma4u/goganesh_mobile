import React from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './Styles';
import {white} from 'react-native-paper/lib/typescript/styles/colors';
import images from '../../../Theams/Images';

function PaymentOptionScreen({route}) {
  const {
    sdid,
    planMoney,
    planType,
    userName,
    depositCoins,
    requestStatus,
  } = route.params;
  console.log('on paymentss options  id screen' + requestStatus);
  const navigation = useNavigation();

  return (
    <View style={styles.containerMain}>
      <View />

      <View style={styles.paymentOptionsContainer}>
        <View style={styles.PaymentTitle}>
          <Text style={{color: 'white'}}>Choose Your Payment Method</Text>
        </View>
        <View style={styles.paymentOptions}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                paymentType: 'Paytm UPI',
                planType: planType,
                userName: userName,
                depositCoins: depositCoins,
                requestStatus: requestStatus,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.paytmupi} />
              <Text style={styles.paymentTypeTitle}>Paytm UPI</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                planType: planType,
                paymentType: 'Paytm Wallet',
                userName: userName,
                depositCoins: depositCoins,
                requestStatus: requestStatus,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.paytm} />
              <Text style={styles.paymentTypeTitle}>Paytm Wallet</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                paymentType: 'Google Pay',
                requestStatus: requestStatus,
                planType: planType,
                userName: userName,
                depositCoins: depositCoins,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.gpay} />
              <Text style={styles.paymentTypeTitle}>Google Pay</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                paymentType: 'Phone Pay',
                userName: userName,
                planType: planType,
                depositCoins: depositCoins,
                requestStatus: requestStatus,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.phonepe} />
              <Text style={styles.paymentTypeTitle}>Phone Pay</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                paymentType: 'Bank',
                userName: userName,
                planType: planType,
                depositCoins: depositCoins,
                requestStatus: requestStatus,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.banktransfer} />
              <Text style={styles.paymentTypeTitle}>Bank Manual Transfer </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Deposit', {
                sdid: sdid,
                planMoney: planMoney,
                paymentType: 'UPI Manual Transfer',
                planType: planType,
                userName: userName,
                depositCoins: depositCoins,
                requestStatus: requestStatus,
              });
            }}>
            <View style={styles.paymentMethod}>
              <Image style={styles.paymentIcon} source={images.allupi} />
              <Text style={styles.paymentTypeTitle}>UPI Manual Transfer</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

export default PaymentOptionScreen;
 