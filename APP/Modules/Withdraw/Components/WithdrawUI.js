/* eslint-disable react-native/no-inline-styles */
import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {ActivityIndicator, Button, RadioButton} from 'react-native-paper';
import {connect} from 'react-redux';
import CONSTANTS from '../../../Constants';
import {env} from '../../../Network/api/server';
import {setUserBanks} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import CommonTextInput from '../../Common/CommonTextInput';
import ErrorPage from '../../Common/ErrorPage';
import {Typography} from '../../Common/Text';
import depositController from '../../Deposit/Controller/depositController';
import IdController from '../../IDs/Controller/IdController';
import paymentDetailsController from '../../PaymentDetails/Controller/paymentDetailsController';

function ListTitle(props) {
  return (
    <View style={styles.ListTitle}>
      <Image
        style={styles.image}
        source={{uri: `${env}${props?.sd?.siteimage}`}}
      />
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography style={styles.url}>{props?.sd?.siteurl}</Typography>
          <View style={styles.credIcon}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://' + props?.sd?.siteurl);
              }}>
              <Icon name="launch" color="white" size={14} />
            </TouchableOpacity>
          </View>
        </View>
        <Typography style={styles.siteName}>{props?.sd?.sitename}</Typography>
      </View>
    </View>
  );
}

const WithdrawForm = props => {
  let banks = props.reduxBankDetails || [];
  let data = props?.route?.params?.data ? props.route.params.data : {};

  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const [amount, onAmountChange] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enableWithdraw, setEnableWithdraw] = useState(false);

  const {
    data: withDrawData,
    error: withDrawVerifyError,
    loading: withDrawVerifyLoading,
    request,
  } = paymentDetailsController.getPendingWithdrawRequestsForUser();

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: "ID's"}],
  });

  useEffect(() => {
    if (withDrawData && withDrawData?.length === 0 && !withDrawVerifyLoading) {
      setEnableWithdraw(true);
    }
  }, [withDrawData, withDrawVerifyError, withDrawVerifyLoading]);

  if (withDrawVerifyError) {
    return <ErrorPage onRetryPress={request} />;
  }

  return (
    <View style={styles.withDrawForm}>
      {ListTitle(data)}
      {enableWithdraw ? (
        <>
          <CommonTextInput
            onChangeText={onAmountChange}
            value={amount}
            label="Enter Amount to Withdraw"
            keyboardType="numeric"
          />
          <View
            style={{
              marginVertical: 20,
              width: '100%',
            }}>
            <RadioButton.Group
              onValueChange={value => setChecked(value)}
              value={checked}>
              <RadioButton.Item
                label="Wallet"
                value="wallet"
                position="leading"
                color={Colors.appWhiteColor}
                uncheckedColor={Colors.appWhiteColor}
                labelStyle={{
                  textAlign: 'left',
                  color: Colors.appWhiteColor,
                }}
              />
              <RadioButton.Item
                label={`Bank  (${banks[0].value})`}
                value="bank"
                position="leading"
                color={Colors.appWhiteColor}
                uncheckedColor={Colors.appWhiteColor}
                labelStyle={{
                  color: Colors.appWhiteColor,
                  textAlign: 'left',
                }}
              />
            </RadioButton.Group>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button
              mode="contained"
              disabled={isLoading}
              style={{
                width: '70%',
              }}
              onPress={() => {
                if (!amount || amount === '0') {
                  return alert('Enter amount to Withdraw');
                }
                setIsLoading(true);
                if (checked === 'wallet') {
                  depositController
                    .depositIntoWallet(
                      data.uid,
                      'Wallet',
                      amount,
                      'DR',
                      true,
                      null,
                      CONSTANTS.WITHDRAW_FROM_EXISTING_ID_TO_WALLET,
                      data.sd.sdid,
                    )
                    .then(res => {
                      navigation.dispatch(resetAction);
                      setIsLoading(false);
                      alert('WithDraw Request Sent Successfully ');
                    });
                } else {
                  IdController.sendWithDrawRequest(
                    data.sd.sdid,
                    banks[0].value,
                    amount,
                    'DR',
                    banks[0].key,
                    CONSTANTS.WITHDRAW_FROM_EXISTING_ID_TO_BANK,
                  ).then(() => {
                    setIsLoading(false);
                    navigation.dispatch(resetAction);
                    alert('WithDraw Request Sent Successfully ');
                  });
                }
              }}>
              <Typography
                variant="H3"
                color={Colors.appWhiteColor}
                style={{alignItems: 'center'}}>
                {isLoading ? 'Please wait ...' : 'Request Withdraw'}
              </Typography>
            </Button>
            {/* <Button
          mode="contained"
          onPress={() => {
            props.navigation.pop();
          }}>
          <Typography
            color={Colors.appWhiteColor}
            style={{alignItems: 'center'}}>
            Cancel
          </Typography>
        </Button> */}
          </View>
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
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  withDrawForm: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.appBlackColor,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    marginRight: 10,
    marginTop: 12,
  },
  url: {
    fontWeight: '500',
    marginLeft: 10,
    marginTop: 8,
    color: Colors.appWhiteColor,
  },
  siteName: {
    marginLeft: 10,
    marginTop: 10,
    color: Colors.appWhiteColor,
  },
  ListTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
});
// connect to redux
const mapStateToProps = state => {
  return {
    reduxBankDetails: state.userdetails.userBanks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reduxSetBankDetails: bankDetails => {
      dispatch(setUserBanks(bankDetails));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawForm);
