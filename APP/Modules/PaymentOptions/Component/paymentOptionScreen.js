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
function PaymentOptionScreen({route}) {
  const {sdid, planMoney, planType} = route.params;
  console.log(planType);
  const navigation = useNavigation();

  return (
    <View style={styles.containerMain}>
      <View></View>

      <View style={styles.paymentOptionsContainer}>
        <View style={styles.PaymentTitle}>
          <Text>Choose Payment Option</Text>
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
              <Image style={styles.paymentIcon}></Image>
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
              <Image style={styles.paymentIcon}></Image>
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
              <Image style={styles.paymentIcon}></Image>
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
              <Image style={styles.paymentIcon}></Image>
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
              <Image style={styles.paymentIcon}></Image>
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
              <Image style={styles.paymentIcon}></Image>
              <Text style={styles.paymentTypeTitle}>UPI Manual Transfer</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },

  paymentOptionsContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  paymentOptions: {
    flex: 0.9,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
  },
  PaymentTitle: {
    backgroundColor: 'white',
    padding: 10,
  },
  paymentMethod: {
    backgroundColor: 'black',
    width: '90%',
    flex: 0.15,

    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 10,
  },
  paymentTypeTitle: {
    color: 'white',
    padding: 10,
  },
  paymentIcon: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    marginTop: 10,
    marginLeft: 10,
  },
});
export default PaymentOptionScreen;
