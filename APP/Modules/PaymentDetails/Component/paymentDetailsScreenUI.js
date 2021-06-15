import React, {useState, useEffect} from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Button,
  RefreshControl,
} from 'react-native';
import styles from './Styles';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import PaymentDetailsController from '../Controller/paymentDetailsController';
import Colors from '../../../Theams/Colors';

function PaymentsScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [bankVales, setBankVales] = useState({});
  const [refresh, setRefresh] = useState(false);
  const mybanks = PaymentDetailsController.getBankData();

  console.log(mybanks.data);

  const [editModelVisible, setEditModelVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <View style={styles.bankCardDetails}>
            <Icon name="money" color="white" />
            <Text style={{color: 'white', padding: 5, left: 10}}>
              Bank Details
            </Text>
            <TouchableOpacity
              style={styles.addBankButton}
              activeOpacity={0.5}
              onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}> Add New </Text>
              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Icon
                          name="cancel"
                          color={Colors.appPrimaryColor}
                          size={32}
                        />
                      </Pressable>
                      <Formik
                        initialValues={{
                          bankName: '',
                          AccountNumber: '',
                          IFSC: '',
                          AccountHolderName: '',
                          branchCode: '',
                        }}
                        onSubmit={values => {
                          PaymentDetailsController.submitBankData(values).then(
                            () => {
                              setModalVisible(!modalVisible);
                            },
                          );
                        }}>
                        {({handleChange, handleSubmit}) => (
                          <>
                            <TextInput
                              style={styles.modalText}
                              placeholder="Bank Name"
                              onChangeText={handleChange('bankName')}
                            />
                            <TextInput
                              style={styles.modalText}
                              placeholder="Account Number"
                              onChangeText={handleChange('AccountNumber')}
                            />
                            <TextInput
                              style={styles.modalText}
                              placeholder="IFSC code"
                              onChangeText={handleChange('IFSC')}
                            />
                            <TextInput
                              style={styles.modalText}
                              placeholder="Account Holder Name"
                              onChangeText={handleChange('AccountHolderName')}
                            />
                            <TextInput
                              style={styles.modalText}
                              placeholder="Branch Code"
                              onChangeText={handleChange('branchCode')}
                            />
                            <Button
                              style={styles.modalText}
                              title="submit"
                              onPress={handleSubmit}
                            />
                          </>
                        )}
                      </Formik>
                    </View>
                  </View>
                </Modal>
              </View>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={editModelVisible}
              onRequestClose={() => {
                Alert.alert('Edit Modal has been closed.');
                setModalVisible(!editModelVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setEditModelVisible(false)}>
                    <Text style={styles.textStyle}>Hide Modal</Text>
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
                      console.log('vlues', values);
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
                      <>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Bank Name"
                          defaultValue={bankVales.bankName}
                          onChangeText={handleChange('bankName')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Number"
                          defaultValue={bankVales.accountNumber.toString()}
                          keyboardType="numeric"
                          onChangeText={handleChange('AccountNumber')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="IFSC code"
                          defaultValue={bankVales.IFSC}
                          onChangeText={handleChange('IFSC')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Holder Name"
                          defaultValue={bankVales.accountHolderName}
                          onChangeText={handleChange('AccountHolderName')}
                        />
                        <TextInput
                          style={styles.modalText}
                          placeholder="Branch Code"
                          defaultValue={bankVales.branchCode}
                          onChangeText={handleChange('branchCode')}
                        />
                        <Button title="Update" onPress={handleSubmit} />
                      </>
                    )}
                  </Formik>
                </View>
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
