import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  // TextInput,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Input as TextInput} from 'react-native-elements';
import Colors from '../../../Theams/Colors';
import EnterBankDetails from '../../Common/BankDetails';
import {Typography} from '../../Common/Text';
import PaymentDetailsController from '../Controller/paymentDetailsController';
import styles from './Styles';

function PaymentsScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [bankVales, setBankVales] = useState({});
  const [refresh, setRefresh] = useState(false);
  const mybanks = PaymentDetailsController.getBankData();

  const [editModelVisible, setEditModelVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSubmit = values => {
    PaymentDetailsController.submitBankData(values).then(() => {
      setModalVisible(!modalVisible);
    });
  };
  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <View style={styles.bankCardDetails}>
            <Icon type="antdesign" name="bank" color="white" />
            <Typography style={{color: 'white', padding: 5, left: 10}}>
              Bank Details
            </Typography>
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
                  <EnterBankDetails
                    onClose={() => {
                      setModalVisible(false);
                    }}
                    onSubmit={onSubmit}
                  />
                </Modal>
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={editModelVisible}
              onRequestClose={() => {
                // Alert.alert('Edit Modal has been closed.');
                setEditModelVisible(!editModelVisible);
              }}>
              <View
                style={{
                  backgroundColor: '#252525E0',
                  flex: 1,
                  // height: '100%',
                }}>
                <KeyboardAvoidingView
                  behavior={'padding'}
                  style={styles.modalView}>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => setEditModelVisible(false)}>
                    <Icon
                      name="cancel"
                      color={Colors.appPrimaryColor}
                      size={32}
                    />
                  </Pressable>
                  <Formik
                    enableReinitialize
                    initialValues={{
                      bankName: bankVales.bankName,
                      AccountNumber: bankVales.accountNumber,
                      IFSC: bankVales.IFSC,
                      AccountHolderName: bankVales.accountHolderName,
                      branchCode: bankVales.branchCode,
                    }}
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
                    }}>
                    {({handleChange, handleSubmit}) => (
                      <ScrollView style={{flex: 1}}>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Bank Name"
                          labelStyle={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                          }}
                          label="Bank Name"
                          defaultValue={bankVales.bankName}
                          onChangeText={handleChange('bankName')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Number"
                          labelStyle={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                          }}
                          label="Account Number"
                          defaultValue={bankVales.accountNumber.toString()}
                          keyboardType="numeric"
                          onChangeText={handleChange('AccountNumber')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="IFSC code"
                          labelStyle={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                          }}
                          label="IFSC code"
                          defaultValue={bankVales.IFSC}
                          onChangeText={handleChange('IFSC')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Holder Name"
                          labelStyle={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                          }}
                          label="Account Holder Name"
                          defaultValue={bankVales.accountHolderName}
                          onChangeText={handleChange('AccountHolderName')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Branch Code"
                          labelStyle={{
                            fontFamily: 'Lato-Regular',
                            fontSize: 12,
                          }}
                          label="Branch Code"
                          defaultValue={bankVales.branchCode}
                          onChangeText={handleChange('branchCode')}
                        />
                        <Button title="Update" onPress={handleSubmit} />
                      </ScrollView>
                    )}
                  </Formik>
                </KeyboardAvoidingView>
              </View>
            </Modal>
          </View>
        </View>

        <View style={styles.bankDetails}>
          <FlatList
            data={mybanks.data}
            onRefresh={() => {
              mybanks.request();
              setRefresh(false);
            }}
            refreshing={refresh}
            keyExtractor={item => item.bid}
            renderItem={({item, index}) => (
              <View style={styles.bankDetailsView}>
                <View style={styles.trasactionsCard}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        paddingVertical: 10,
                      }}>
                      Bank Name: {item.bankName}
                    </Text>
                    <TouchableOpacity
                      style={{marginLeft: 'auto'}}
                      onPress={() => {
                        setBankVales(item);
                        setEditModelVisible(true);
                      }}>
                      <Icon
                        name="edit"
                        color={Colors.appPrimaryColor}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={{color: 'white', fontSize: 16, paddingVertical: 10}}>
                    Account Number : {item.accountNumber}
                  </Text>
                  <Text
                    style={{color: 'white', fontSize: 16, paddingVertical: 10}}>
                    IFSC :{item.IFSC}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default PaymentsScreen;
