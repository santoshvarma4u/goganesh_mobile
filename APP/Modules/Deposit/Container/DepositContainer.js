/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Modal, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import PaymentCard from '../Component/PaymentCard';

const DepositContainer = props => {
  const {navigation} = props;
  const [amount, setAmount] = React.useState('');
  const [error, setError] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState('gateway');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.appPrimaryColor,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.appBlackColor,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          marginTop: 60,
        }}>
        {/* header */}
        <View
          style={{
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.appBlackColorLight,
            marginHorizontal: 30,
            marginTop: -60,
            borderRadius: 20,
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons
            name={'wallet'}
            color={Colors.appWhiteColor}
            size={50}
          />
          <View
            style={{
              marginLeft: 20,
            }}>
            <Typography variant="paragraph" color={Colors.appPrimaryColor}>
              WALLET BALANCE
            </Typography>
            <Typography variant="H3" color={Colors.appWhiteColor}>
              $0.00
            </Typography>
          </View>
        </View>
        {/* body */}
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <CommonTextInput
            label="Deposit Coins *"
            mode="outlined"
            style={{
              marginTop: 20,
            }}
            value={amount}
            onChangeText={value => {
              setAmount(value);
              setError(false);
            }}
            keyboardType="numeric"
          />
          <Typography
            variant="paragraph"
            color={error ? Colors.appRedColor : Colors.appWhiteColor}>
            {error
              ? 'Enter valid amount, Minimum amount is 100 coins'
              : '*Minimum Deposit Amount is 100 Coins'}
          </Typography>
        </View>
        <Button
          mode="contained"
          style={{
            marginHorizontal: 30,
            marginTop: 20,
            backgroundColor: Colors.appPrimaryColor,
            color: Colors.appBlackColor,
          }}
          onPress={() => {
            if (amount >= 100) {
              setError(false);
              setModalVisible(true);
              // navigation.navigate('PaymentOptions', {
              //   depositCoins: amount,
              //   requestStatus: 'wallet',
              // });
            } else {
              setError(true);
            }
          }}>
          <Typography variant="H4" color={Colors.appBlackColor}>
            DEPOSIT COINS
          </Typography>
        </Button>
      </View>
      <Modal visible={modalVisible}>
        <ScrollView
          style={{
            backgroundColor: Colors.appBlackColorLight,
            borderTopRightRadius: 20,
          }}>
          <Typography
            variant="header"
            color={Colors.appWhiteColor}
            style={{
              textAlign: 'center',
            }}>
            {'Select a payment system.\n'}
            <Typography color={Colors.appWhiteColor}>
              You are about to deposit {amount} coins to your wallet.
            </Typography>
          </Typography>
          <PaymentCard
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
          <Button
            mode="contained"
            style={{
              marginHorizontal: 30,
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              setModalVisible(false);
              if (paymentMethod === 'gateway') {
                // navigation.navigate('PaymentOptions', {
                //   depositCoins: amount,
                //   requestStatus: 'wallet',
                // });
                alert('gateway');
              } else {
                navigation.navigate('PaymentOptions', {
                  depositCoins: amount,
                  requestStatus: 'wallet',
                });
              }
            }}>
            <Typography variant="H4" color={Colors.appBlackColor}>
              PROCEED
            </Typography>
          </Button>
          <Button
            style={{
              marginHorizontal: 30,
              marginVertical: 10,
            }}
            color={Colors.appWhiteColor}
            mode="text"
            onPress={() => {
              setModalVisible(false);
            }}>
            CANCEL
          </Button>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default DepositContainer;
