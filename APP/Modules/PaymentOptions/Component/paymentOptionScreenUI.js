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
  const {sdid, planMoney, planType} = route.params;
  console.log(planType);
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
                paymentType: 'Paytm Wallet',
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
