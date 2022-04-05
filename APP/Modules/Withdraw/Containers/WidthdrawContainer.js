/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Theams/Colors';
import EnterBankDetails from '../../Common/BankDetails';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';

const WithDrawContainer = props => {
  const {navigation} = props;
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  //   const [paymentMethod, setPaymentMethod] = useState('gateway');

  useEffect(() => {
    //Check if the bank details are set, if open a modal to set the bank details
    // if (!bankDetails) {
    //     setModalVisible(true);
    // }
  }, []);

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
              0.00
            </Typography>
          </View>
        </View>
        {/* body */}
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          <Typography variant="paragraph" color={Colors.appWhiteColor}>
            Withdrawable balance : 0
          </Typography>
          <CommonTextInput
            label="Withdraw coins"
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
              : '*Minimum withdraw Amount is 100'}
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
            } else {
              setError(true);
            }
          }}>
          <Typography variant="H4" color={Colors.appBlackColor}>
            WITHDRAW COINS
          </Typography>
        </Button>
      </View>
      <Modal visible={modalVisible}>
        <EnterBankDetails
          onClose={() => {
            // TODO: Check if the bank details are set, if open a modal to set the bank details Warning
            setModalVisible(false);
            setConfirmModalVisible(true);
          }}
        />
      </Modal>
      <Modal
        visible={confirmModalVisible}
        onDismiss={() => {
          setConfirmModalVisible(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.appBlackColor,
            borderRadius: 10,
            marginHorizontal: 20,
            padding: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name={'alert'}
              color={Colors.appPrimaryColor}
              size={50}
            />
          </View>

          <Typography
            variant="H2"
            color={Colors.appWhiteColor}
            style={{marginVertical: 20, textAlign: 'center'}}>
            Alert
          </Typography>
          <Typography variant="paragraph" color={Colors.appWhiteColor}>
            Please set your bank details to withdraw coins
          </Typography>
          <Button
            mode="contained"
            style={{
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              setConfirmModalVisible(false);
              setModalVisible(true);
            }}>
            <Typography variant="H4" color={Colors.appBlackColor}>
              Okay
            </Typography>
          </Button>
          <Button
            mode="outlined"
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              navigation.pop();
            }}>
            <Typography variant="H4" color={Colors.appWhiteColor}>
              Cancel
            </Typography>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

export default WithDrawContainer;
