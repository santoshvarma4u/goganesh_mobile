import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import IDsApi from '../api/IDs';
import {useNavigation} from '@react-navigation/native';
function CreateIDScreen({route}) {
  const {sdid} = route.params;
  const navigation = useNavigation();
  const [planDetails, setPlanDetails] = useState({
    planHeader: 'Bronze Plan',
    MinRefill: '1,000',
    MinWidthdrawl: '1,000',
    MinMaintainBalance: '1,000',
    MaxWithDrawl: '50,000 per day',
  });

  const submitID = async () => {
    const result = await IDsApi.createID(14, sdid, 'gold', false, 'xxxxxxxxx');
    if (!result.ok) return alert('failed');
    alert('success');
  };
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
          <TouchableWithoutFeedback
            onPress={() =>
              setPlanDetails({
                planHeader: 'Bronze Plan',
                MinRefill: '1,000',
                MinWidthdrawl: '1,000',
                MinMaintainBalance: '1,000',
                MaxWithDrawl: '50,000 per day',
              })
            }>
            <View style={styles.bronzeCard}>
              <Image
                style={{
                  borderRadius: 20,
                  width: 45,
                  height: 45,
                  backgroundColor: 'white',
                }}></Image>
              <Text style={{padding: 5}}>Min ID</Text>
              <Text>1000</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              setPlanDetails({
                planHeader: 'Silver Plan',
                MinRefill: '10,000',
                MinWidthdrawl: '10,000',
                MinMaintainBalance: '10.000',
                MaxWithDrawl: '2,00,000 per day',
              })
            }>
            <View style={styles.silverCard}>
              <Image
                style={{
                  borderRadius: 20,
                  width: 45,
                  height: 45,
                  backgroundColor: 'white',
                }}></Image>
              <Text style={{padding: 5}}>Min ID</Text>
              <Text>1000</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() =>
              setPlanDetails({
                planHeader: 'Gold Plan',
                MinRefill: '1,00,000',
                MinWidthdrawl: '1,00,000',
                MinMaintainBalance: '100000',
                MaxWithDrawl: '5,00,000 per day',
              })
            }>
            <View style={styles.goldCard}>
              <Image
                style={{
                  borderRadius: 20,
                  width: 45,
                  height: 45,
                  backgroundColor: 'white',
                }}></Image>
              <Text style={{padding: 5}}>Min ID</Text>
              <Text>1000</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.planDeatils}>
          <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>
            {planDetails.planHeader}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>
              Min Refill
            </Text>
            <Text style={styles.planDetailsText}>{planDetails.MinRefill}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>
              Min Withdrawl
            </Text>
            <Text style={styles.planDetailsText}>{planDetails.MinRefill}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>
              Min Maintaining Balnce
            </Text>
            <Text style={styles.planDetailsText}>{planDetails.MinRefill}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', marginLeft: 20, marginTop: 10}}>
              Max Withdrawl
            </Text>
            <Text style={styles.planDetailsText}>
              {planDetails.MaxWithDrawl}
            </Text>
          </View>
        </View>
        <View style={styles.planDeatils}>
          <Formik
            initialValues={{
              UserName: '',
              DepositCoins: '',
            }}
            onSubmit={() => {
              navigation.navigate('PaymentOptions', {
                sdid: sdid,
                planMoney: planDetails.MinRefill,
              });
            }}>
            {({handleChange, handleSubmit}) => (
              <>
                <TextInput
                  style={styles.modalText}
                  placeholder="User Name"
                  onChangeText={handleChange('UserName')}></TextInput>

                <TextInput
                  style={styles.modalText}
                  placeholder="Deposit Coins"
                  onChangeText={handleChange('DepositCoins')}></TextInput>
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
    alignItems: 'center',
    width: 20,
  },
  goldCard: {
    flex: 0.33,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: '100%',
    width: 20,
  },
  silverCard: {
    flex: 0.33,
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    height: '100%',
    width: 20,
  },
  modalText: {
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 20,
    marginBottom: 15,
  },
  planDetailsText: {
    color: 'black',
    marginLeft: 'auto',
    marginTop: 10,
    padding: 5,
  },
});
export default CreateIDScreen;
