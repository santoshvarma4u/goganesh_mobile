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
import {Formik} from 'formik';
import BankEntryComponent from '../components/bankEntryComponent';
import {Avatar, Chip, Icon, Overlay} from 'react-native-elements';
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
                        onSubmit={values => console.log(values)}>
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
                                'bankName',
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
                        onSubmit={values => console.log(values)}>
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
                                'bankName',
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
const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e39b11',
    flex: 1,
  },

  profileContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 5,
  },
  addBankButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    marginLeft: 'auto',
  },
  profileDetails: {
    flex: 0.15,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  profileIcon: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 100,
  },
  bankDetails: {
    flex: 0.75,
    padding: 15,
    marginTop: 20,
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
  },
  bankCardDetails: {
    marginTop: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  centeredView: {
    width: '100%',
    flex: 1,
    padding: 10,
    top: 200,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#696969',
    borderRadius: 20,
    padding: 25,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    marginTop: 15,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
  },

  modalText: {
    borderRadius: 10,
    backgroundColor: 'black',
    fontSize: 20,
    marginBottom: 15,
  },
});
export default PaymentsScreen;
