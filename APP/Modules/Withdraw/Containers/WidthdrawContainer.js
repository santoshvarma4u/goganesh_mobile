/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Icon} from 'react-native-elements';
import {Button, Modal} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {setUserBanks} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import EnterBankDetails from '../../Common/BankDetails';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import paymentDetailsController from '../../PaymentDetails/Controller/paymentDetailsController';

const WithDrawContainer = props => {
  const {navigation, reduxBankDetails, reduxWallet} = props;
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  //   const [paymentMethod, setPaymentMethod] = useState('gateway');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const onSubmit = async values => {
    let {data} = await paymentDetailsController.submitBankData(values);
    if (data.status === 'success') {
      setModalVisible(false);
      props.reduxSetBankDetails([...reduxBankDetails, data.data]);
    }
  };

  useEffect(() => {
    // Check if the bank details are set, if open a modal to set the bank details
    if (!reduxBankDetails || reduxBankDetails.length === 0) {
      setModalVisible(true);
    }
    setItems(
      reduxBankDetails.map(item => ({
        label: item.value,
        value: item.key,
        key: item.key,
      })),
    );
  }, [reduxBankDetails]);

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
          marginTop: 80,
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
            <Typography variant="paragraph" color={Colors.appWhiteColor}>
              WALLET BALANCE
            </Typography>
            <Typography
              variant="H3"
              style={{
                marginTop: 10,
              }}
              color={Colors.appWhiteColor}>
              <Icon
                name="rupee"
                color={Colors.appWhiteColor}
                size={16}
                type={'font-awesome'}
              />
              {`  ${reduxWallet}`}
            </Typography>
          </View>
        </View>
        {/* body */}
        <View
          style={{
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          {/* <Typography variant="paragraph" color={Colors.appWhiteColor}>
            Withdrawable balance : 0
          </Typography> */}
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
              setWithdrawModalVisible(true);
            } else {
              setError(true);
            }
          }}>
          WITHDRAW COINS
        </Button>
      </View>
      <Modal visible={modalVisible}>
        <EnterBankDetails
          onClose={() => {
            // TODO: Check if the bank details are set, if open a modal to set the bank details Warning
            setModalVisible(false);
            setConfirmModalVisible(true);
          }}
          onSubmit={onSubmit}
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
      <Modal
        visible={withdrawModalVisible}
        onDismiss={() => {
          setWithdrawModalVisible(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.appBlackColorLight,
            borderRadius: 10,
            marginHorizontal: 20,
            minHeight: 300,
            padding: 20,
            alignItems: 'center',
            // justifyContent: 'center',
          }}>
          <Typography variant="H4" color={Colors.appWhiteColor}>
            Select a bank to withdraw
          </Typography>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              backgroundColor: Colors.appBlackColorLight,
              marginTop: 20,
              borderColor: Colors.appWhiteColor,
              borderRadius: 5,
            }}
            name={'bankName'}
            theme="DARK"
          />
          <Button
            mode="contained"
            style={{
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              setWithdrawModalVisible(false);
              setWithdrawModalVisible(false);
              setWithdrawModalVisible(false);
            }}>
            <Typography variant="H4" color={Colors.appWhiteColor}>
              Withdraw
            </Typography>
          </Button>
        </View>
      </Modal>
    </View>
  );
};

// connect to redux
const mapStateToProps = state => {
  return {
    reduxBankDetails: state.userdetails.userBanks,
    reduxWallet: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxSetBankDetails: bankDetails => {
      dispatch(setUserBanks(bankDetails));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithDrawContainer);
