import React, {useState} from 'react';
import {
  Modal,
  Pressable,
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import styles from './Styles';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import PaymentDetailsController from '../Controller/paymentDetailsController';
function PaymentsScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.containerMain}>
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={{padding: 10}}>Name</Text>
          <Text style={{padding: 10}}>+91 9959052330</Text>
        </View>
        <View style={styles.bankDetails}>
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
          </View>
        </View>
      </View>
    </View>
  );
}

export default PaymentsScreen;
