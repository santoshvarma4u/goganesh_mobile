import React from 'react';
import {Image, TextInput, Button, View, Text, StyleSheet} from 'react-native';
import {Formik} from 'formik';
function CreateIDScreen({navigation}) {
  return (
    <View style={styles.containerMain}>
      <View></View>
      <View style={styles.createIDContainer}>
        <View style={styles.topIcon}>
          <Image style={styles.imageIcon}></Image>
          <Text style={{alignItems: 'center'}}>sitename</Text>
          <Text style={{alignItems: 'center'}}>url</Text>
        </View>
        <View style={styles.planCards}>
          <View style={styles.bronzeCard}></View>
          <View style={styles.silverCard}></View>
          <View style={styles.goldCard}></View>
        </View>
        <View style={styles.planDeatils}></View>
        <View style={styles.planDeatils}>
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
                  placeholder="User Name"
                  onChangeText={handleChange('bankName')}></TextInput>

                <TextInput
                  style={styles.modalText}
                  placeholder="Deposit Coins"
                  onChangeText={handleChange('bankName')}></TextInput>

                <Button title="submit" onPress={handleSubmit}></Button>
              </>
            )}
          </Formik>
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
  createIDContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  planCards: {
    flex: 0.2,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'white',
    width: '90%',
    flexDirection: 'row',
    borderRadius: 10,
  },
  planDeatils: {
    flex: 0.35,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'white',
    width: '90%',

    borderRadius: 10,
  },
  topIcon: {
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    backgroundColor: 'orange',
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  bronzeCard: {
    flex: 0.33,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    height: '100%',
    width: 20,
  },
  goldCard: {
    flex: 0.33,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,

    height: '100%',
    width: 20,
  },
  silverCard: {
    flex: 0.33,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    height: '100%',
    width: 20,
  },
  modalText: {
    borderRadius: 10,
    backgroundColor: 'black',
    fontSize: 20,
    marginBottom: 15,
  },
});
export default CreateIDScreen;
