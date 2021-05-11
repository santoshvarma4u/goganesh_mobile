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
import styles from './Styles';
import {Formik} from 'formik';
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
                planType: planDetails.planHeader,
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

export default CreateIDScreen;
