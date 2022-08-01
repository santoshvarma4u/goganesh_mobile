/* eslint-disable react-native/no-inline-styles */
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Divider,
  Modal,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import GooglePaySvg from '../../../Assets/svgs/GooglePaySvg';
import PaytmSvg from '../../../Assets/svgs/PaytmSvg';
import PhonePeSvg from '../../../Assets/svgs/PhonePeSvg';
import CONSTANTS from '../../../Constants';
import {setUserBanks} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import EnterBankDetails from '../../Common/BankDetails';
import CommonTextInput from '../../Common/CommonTextInput';
import ErrorPage from '../../Common/ErrorPage';
import {Typography} from '../../Common/Text';
import IdController from '../../IDs/Controller/IdController';
import paymentDetailsController from '../../PaymentDetails/Controller/paymentDetailsController';

const upiMap = {
  phone_pay: 'Phone Pay',
  google_pay: 'Google Pay',
  paytm: 'Paytm',
};

const upiSvg = {
  phone_pay: <PhonePeSvg />,
  google_pay: <GooglePaySvg />,
  paytm: <PaytmSvg />,
};

const WithDrawContainer = props => {
  const {navigation, reduxBankDetails, reduxWallet} = props;
  const [enableWithdraw, setEnableWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);

  const [value, setValue] = React.useState('');

  const {
    data,
    error: withDrawVerifyError,
    loading: withDrawVerifyLoading,
    request,
  } = paymentDetailsController.getPendingWithdrawRequestsForUser();

  const {data: upiData} = paymentDetailsController.fetchUpiDetails();

  const onSubmit = async values => {
    let {data: bankData} = await paymentDetailsController.submitBankData(
      values,
    );
    if (bankData.status === 'success') {
      setModalVisible(false);
      props.reduxSetBankDetails([...reduxBankDetails, bankData.data]);
    }
  };

  useEffect(() => {
    // Check if the bank details are set, if open a modal to set the bank
    if (!reduxBankDetails || reduxBankDetails.length === 0) {
      setModalVisible(true);
    }
  }, [reduxBankDetails]);

  useEffect(() => {
    if (withDrawVerifyError) {
      setError(withDrawVerifyError);
    }
    if (data && data?.length === 0 && !withDrawVerifyLoading) {
      setEnableWithdraw(true);
    }
  }, [data, withDrawVerifyError, withDrawVerifyLoading]);

  if (withDrawVerifyError) {
    return <ErrorPage onRetryPress={request} />;
  }

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
        {enableWithdraw ? (
          <>
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
                  ? 'Enter valid amount, Minimum amount is 1000 coins'
                  : '*Minimum withdraw Amount is 1000'}
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
                if (amount >= 1000 && amount <= reduxWallet) {
                  setError(false);
                  setWithdrawModalVisible(true);
                } else {
                  setError(true);
                }
              }}>
              WITHDRAW COINS
            </Button>
          </>
        ) : (
          <View style={{}}>
            {withDrawVerifyLoading ? (
              <ActivityIndicator />
            ) : (
              <Typography
                variant="subheader"
                color={Colors.appWhiteColor}
                style={{
                  marginHorizontal: 30,
                  marginTop: 20,
                  textAlign: 'center',
                }}>
                You have pending withdraw requests , you can withdraw after the
                previous requests are approved
              </Typography>
            )}
          </View>
        )}
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
          }}>
          <Typography variant="P2" color={Colors.appWhiteColor}>
            Confirm a bank to withdraw
          </Typography>
          <Typography
            variant="title"
            color={Colors.appWhiteColor}
            style={{
              marginTop: 20,
              textAlign: 'center',
            }}>
            {reduxBankDetails && reduxBankDetails[0]?.value}
          </Typography>
          <Button
            mode="contained"
            style={{
              marginTop: 20,
              backgroundColor: Colors.appPrimaryColor,
              color: Colors.appBlackColor,
            }}
            onPress={() => {
              IdController.sendWalletWithDrawRequest(
                'BANK',
                amount,
                'DR',
                reduxBankDetails[0].key,
                CONSTANTS.WITHDRAW_FROM_WALLET_TO_BANK,
              )
                .then(() => {
                  alert('WithDraw Request Sent Successfully ');
                  navigation.pop();
                })
                .catch(() => {
                  alert('Error in Withdrawing coins, Please try again later');
                });
              setWithdrawModalVisible(false);
              setWithdrawModalVisible(false);
              setWithdrawModalVisible(false);
            }}>
            <Typography variant="H4" color={Colors.appWhiteColor}>
              Bank Withdraw
            </Typography>
          </Button>
          <Divider
            style={{
              marginTop: 20,
              marginBottom: 20,
              borderBottomColor: Colors.appWhiteColor,
              borderBottomWidth: 2,
              width: '80%',
            }}
          />
          <Typography color={Colors.appWhiteColor}>
            Or, you can withdraw to your upi
          </Typography>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            {upiData.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton value={item.upiName} />
                  <TouchableRipple
                    onPress={() => {
                      setValue(item.upiName);
                    }}>
                    <View
                      style={{
                        padding: 10,
                        flexDirection: 'row',
                        height: 80,
                        alignItems: 'center',
                      }}>
                      {upiSvg[item.upiName]}
                      <View
                        style={{
                          marginLeft: 10,
                        }}>
                        <Typography color={Colors.appWhiteColor}>
                          {upiMap[item.upiName]}
                        </Typography>
                        <Typography color={Colors.appWhiteColor}>
                          {item.upiNumber}
                        </Typography>
                      </View>
                    </View>
                  </TouchableRipple>
                </View>
              );
            })}
          </RadioButton.Group>
          <Button
            mode="contained"
            style={{
              marginTop: 20,
            }}
            onPress={() => {
              if (!value) {
                alert('Please select a UPI');
                return;
              }

              IdController.sendWalletWithDrawRequest(
                'UPI',
                amount,
                'DR',
                upiData.find(item => item.upiName === value).upiId,
                CONSTANTS.WITHDRAW_FROM_WALLET_TO_UPI,
              )
                .then(() => {
                  alert('WithDraw Request Sent Successfully ');
                  navigation.pop();
                })
                .catch(() => {
                  alert('Error in Withdrawing coins, Please try again later');
                });
              setWithdrawModalVisible(false);
            }}>
            <Typography variant="H4" color={Colors.appWhiteColor}>
              UPI WithDraw
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
