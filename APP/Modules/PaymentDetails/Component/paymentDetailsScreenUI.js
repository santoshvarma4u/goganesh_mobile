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

function PaymentsScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
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
            <Text style={{backgroundColor: 'white', padding: 5, left: 10}}>
              Bank Deatils
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
                              onChangeText={handleChange(
                                'bankName',
                              )}></TextInput>
                            <TextInput
                              style={styles.modalText}
                              placeholder="Account Number"
                              onChangeText={handleChange(
                                'AccountNumber',
                              )}></TextInput>
                            <TextInput
                              style={styles.modalText}
                              placeholder="IFSC code"
                              onChangeText={handleChange('IFSC')}></TextInput>
                            <TextInput
                              style={styles.modalText}
                              placeholder="Account Holder Name"
                              onChangeText={handleChange(
                                'AccountHolderName',
                              )}></TextInput>
                            <TextInput
                              style={styles.modalText}
                              placeholder="Branch Code"
                              onChangeText={handleChange(
                                'branchCode',
                              )}></TextInput>
                            <Button
                              title="submit"
                              onPress={handleSubmit}></Button>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => setModalVisible(!modalVisible)}>
                              <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
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
                  <Formik
                    enableReinitialize
                    initialValues={{
                      bankName: '',
                      AccountNumber: '',
                      IFSC: '',
                      AccountHolderName: '',
                      branchCode: '',
                    }}
                    onSubmit={values => {
                      console.log('vlues', values);
                      PaymentDetailsController.updateBankData(
                        values,
                        currentIndex + 1,
                      ).then(() => {
                        setModalVisible(!editModelVisible);
                      });
                    }}>
                    {({handleChange, handleSubmit}) => (
                      <>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Bank Name"
                          defaultValue={mybanks.data[currentIndex].bankName}
                          onChangeText={handleChange('bankName')}></TextInput>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Number"
                          defaultValue={mybanks.data[
                            currentIndex
                          ].accountNumber.toString()}
                          onChangeText={handleChange(
                            'AccountNumber',
                          )}></TextInput>
                        <TextInput
                          style={styles.modalText}
                          placeholder="IFSC code"
                          defaultValue={mybanks.data[currentIndex].IFSC}
                          onChangeText={handleChange('IFSC')}></TextInput>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Account Holder Name"
                          defaultValue={
                            mybanks.data[currentIndex].accountHolderName
                          }
                          onChangeText={handleChange(
                            'AccountHolderName',
                          )}></TextInput>
                        <TextInput
                          style={styles.modalText}
                          placeholder="Branch Code"
                          defaultValue={mybanks.data[currentIndex].branchCode}
                          onChangeText={handleChange('branchCode')}></TextInput>
                        <Button title="Update" onPress={handleSubmit}></Button>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() =>
                            setEditModelVisible(!editModelVisible)
                          }>
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
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
                  <Text style={{color: 'black'}}>
                    Bank Name: {item.bankName}
                  </Text>
                  <Text style={{color: 'black'}}>
                    Account Number : {item.accountNumber}
                  </Text>
                  <Text style={{color: 'black'}}>IFSC :{item.IFSC}</Text>
                  <Button
                    style={{color: 'black'}}
                    title="edit"
                    onPress={() => {
                      setCurrentIndex(index);
                      setEditModelVisible(true);
                    }}></Button>
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
