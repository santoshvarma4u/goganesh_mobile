import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import {setUserBanks} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import useHideBottomBar from '../../../Utils/useHideBottomBar';
import EnterBankDetails from '../../Common/BankDetails';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import PaymentDetailsController from '../Controller/paymentDetailsController';
import paymentDetailsController from '../Controller/paymentDetailsController';
import UPINumberPicker from './PickUpiNumbers';
import styles from './Styles';

function PaymentsScreen({navigation, reduxSetUserBanks}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [bankVales, setBankVales] = useState({});
  const [refresh, setRefresh] = useState(false);
  const mybanks = PaymentDetailsController.getBankData();
  const [enableWithdraw, setEnableWithdraw] = useState(false);
  const [editModelVisible, setEditModelVisible] = useState(false);
  useHideBottomBar();

  const [name, setName] = useState(false);
  const [phone, setPhone] = useState(false);

  const getName = async () => {
    try {
      let name1 = await Storage.getItemSync(StorageKeys.NAME);

      return name1;
    } catch (error) {}
  };
  const getPhone = async () => {
    try {
      let phone = await Storage.getItemSync(StorageKeys.PHONE);
      return phone;
    } catch (error) {}
  };

  useEffect(() => {
    getName().then(data => setName(data));
    getPhone().then(data => setPhone(data));
  }, []);

  const {
    data: withDrawData,
    error: withDrawVerifyError,
    loading: withDrawVerifyLoading,
    request,
  } = paymentDetailsController.getPendingWithdrawRequestsForUser();

  useEffect(() => {
    if (withDrawData && withDrawData?.length === 0 && !withDrawVerifyLoading) {
      setEnableWithdraw(true);
    }
  }, [withDrawData, withDrawVerifyError, withDrawVerifyLoading]);

  const onSubmit = values => {
    PaymentDetailsController.submitBankData(values).then(() => {
      setModalVisible(!modalVisible);
      mybanks.request();
    });
  };

  useEffect(() => {
    const rBanks = mybanks?.data.map(item => {
      return {
        value: item.bankName,
        key: item.bid,
      };
    });
    reduxSetUserBanks(rBanks);
  }, [mybanks.data]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <ScrollView style={styles.bankDetails}>
          <FlatList
            data={mybanks.data}
            onRefresh={() => {
              mybanks.request();
              setRefresh(false);
            }}
            ListHeaderComponent={() => (
              <View style={styles.bankCardDetails}>
                <Icon type="material-community" name="bank" color="white" />
                <Typography style={{color: 'white', padding: 5, left: 10}}>
                  Your Saved Bank
                </Typography>
                {mybanks && mybanks.data?.length === 0 && (
                  <TouchableOpacity
                    style={styles.addBankButton}
                    activeOpacity={0.5}
                    onPress={() => setModalVisible(true)}>
                    <Typography style={styles.textStyle}> Add New </Typography>
                    <View style={styles.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                          setModalVisible(!modalVisible);
                        }}>
                        <KeyboardAvoidingView
                          behavior={'padding'}
                          style={styles.modalView}>
                          <EnterBankDetails
                            onClose={() => {
                              setModalVisible(false);
                            }}
                            onSubmit={onSubmit}
                          />
                        </KeyboardAvoidingView>
                      </Modal>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
            refreshing={refresh}
            keyExtractor={item => item.bid}
            renderItem={({item, index}) => (
              <View style={styles.trasactionsCard}>
                <View style={styles.cardItem}>
                  <Typography
                    style={{...styles.cardTextStyle, alignItems: 'center'}}>
                    Bank Name
                  </Typography>
                  <Typography variant="H3" style={styles.cardTextStyle}>
                    {item.bankName}
                  </Typography>
                </View>
                <View
                  style={{
                    ...styles.cardItem,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.cardItem}>
                    <Typography style={styles.cardTextStyle}>
                      Account Number
                    </Typography>
                    <Typography variant="H3" style={styles.cardTextStyle}>
                      {item.accountNumber}
                    </Typography>
                  </View>
                  <View style={styles.cardItem}>
                    <Typography style={styles.cardTextStyle}>IFSC</Typography>
                    <Typography variant="H3" style={styles.cardTextStyle}>
                      {item.IFSC}
                    </Typography>
                  </View>
                </View>
                <View
                  style={{
                    ...styles.cardItem,
                    flexDirection: 'row',
                  }}>
                  <View style={styles.cardItem}>
                    <Typography style={styles.cardTextStyle}>
                      Account Holder Name
                    </Typography>
                    <Typography variant="H3" style={styles.cardTextStyle}>
                      {item.accountHolderName}
                    </Typography>
                  </View>
                  <View style={styles.cardItem}>
                    <Typography style={styles.cardTextStyle}>
                      Branch code
                    </Typography>
                    <Typography variant="H3" style={styles.cardTextStyle}>
                      {item.branchCode}
                    </Typography>
                  </View>
                </View>
                <TouchableOpacity
                  style={{position: 'absolute', right: 10, top: 10}}
                  onPress={() => {
                    if (enableWithdraw) {
                      setBankVales(item);
                      setEditModelVisible(true);
                    } else {
                      Alert.alert(
                        'Withdrawal Request',
                        'You have already requested for withdrawal, please wait for the admin to approve your request',
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                  }}>
                  <Icon name="edit" color={Colors.appPrimaryColor} size={24} />
                </TouchableOpacity>
              </View>
            )}
          />
          {/*
            UI for Upi numbers , for the PhonePay, Gpay, Paytm
          */}
          {/*<UPINumberPicker />*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={editModelVisible}
            onRequestClose={() => {
              setEditModelVisible(!editModelVisible);
            }}>
            <View
              style={{
                backgroundColor: '#252525E0',
                flex: 1,
              }}>
              <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.modalView}>
                <EnterBankDetails
                  onClose={() => {
                    setEditModelVisible(false);
                  }}
                  bankData={bankVales}
                  onSubmit={values => {
                    PaymentDetailsController.updateBankData(
                      values,
                      bankVales.bid,
                    ).then(result => {
                      if (result.ok) {
                        alert('Successfully Upadated');
                        setEditModelVisible(false);
                        mybanks.request();
                      }
                    });
                  }}
                />
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    reduxSetUserBanks: banks => dispatch(setUserBanks(banks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsScreen);
