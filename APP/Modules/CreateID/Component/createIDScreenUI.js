import React, {useState, useEffect} from 'react';
import {
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import styles from './Styles';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';

function CreateIDScreen({route}) {
  const {sdid, url, sitename, requestStatus} = route.params;

  const navigation = useNavigation();
  const [planDetails, setPlanDetails] = useState({
    planHeader: 'Bronze Plan',
    MinRefill: '1,000',
    MinWidthdrawl: '1,000',
    MinMaintainBalance: '1,000',
    MaxWithDrawl: '50,000 per day',
  });

  return (
    <ScrollView>
      <View style={styles.containerMain}>
        <View />
        <View style={styles.createIDContainer}>
          <View style={styles.topIcon}>
            <Image style={styles.imageIcon} source={images.logo} />
            <Text style={{alignItems: 'center', color: 'white', marginTop: 5}}>
              {sitename}
            </Text>
            <Text style={{alignItems: 'center', color: 'white', marginTop: 5}}>
              {url}
            </Text>
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
                <View
                  style={{
                    borderRadius: 20,
                    width: 45,
                    height: 45,
                    backgroundColor: '#CD7F32',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{alignContent: 'center'}}>Bronze</Text>
                </View>

                <Text style={{padding: 5, color: 'white'}}>Min ID</Text>
                <Text style={{color: 'white'}}>1000</Text>
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
                <View
                  style={{
                    borderRadius: 20,
                    width: 45,
                    height: 45,
                    backgroundColor: '#C0C0C0',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{alignContent: 'center'}}>Silver</Text>
                </View>
                <Text style={{padding: 5, color: 'white'}}>Min ID</Text>
                <Text style={{color: 'white'}}>1000</Text>
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
                <View
                  style={{
                    borderRadius: 20,
                    width: 45,
                    height: 45,
                    backgroundColor: '#FFD700',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{alignContent: 'center'}}>Gold</Text>
                </View>
                <Text style={{padding: 5, color: 'white'}}>Min ID</Text>
                <Text style={{color: 'white'}}>1000</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.planDeatils}>
            <Text
              style={{
                color: '#d5d1d1',
                marginLeft: 20,
                marginTop: 8,
                fontSize: 16,
              }}>
              {planDetails.planHeader}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={{color: '#d5d1d1', marginLeft: 20, marginTop: 10}}>
                Min Refill
              </Text>
              <Text style={[styles.planDetailsText, {marginTop: 6}]}>
                {planDetails.MinRefill}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#d5d1d1', marginLeft: 20, marginTop: 6}}>
                Min Withdrawal
              </Text>
              <Text style={[styles.planDetailsText, {marginTop: 4}]}>
                {planDetails.MinRefill}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#d5d1d1', marginLeft: 20, marginTop: 6}}>
                Min Maintaining Balance
              </Text>
              <Text style={[styles.planDetailsText, {marginTop: 4}]}>
                {planDetails.MinRefill}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#d5d1d1', marginLeft: 20, marginTop: 6}}>
                Max Withdrawal
              </Text>
              <Text style={[styles.planDetailsText, {marginTop: 4}]}>
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
              onSubmit={values => {
                console.log(values);
                navigation.navigate('PaymentOptions', {
                  sdid: sdid,
                  planMoney: planDetails.MinRefill,
                  planType: planDetails.planHeader,
                  userName: values.UserName,
                  depositCoins: values.DepositCoins,
                  requestStatus: requestStatus,
                });
              }}>
              {({handleChange, handleSubmit}) => (
                <>
                  <TextInput
                    style={styles.modalText}
                    placeholder="Username *"
                    placeholderTextColor="#d5d1d1"
                    onChangeText={handleChange('UserName')}
                  />

                  <TextInput
                    style={styles.modalText}
                    placeholder="Deposit Coins *"
                    placeholderTextColor="#d5d1d1"
                    onChangeText={handleChange('DepositCoins')}
                  />
                  <TouchableOpacity
                    style={{
                      padding: 8,
                      marginHorizontal: 100,
                      alignItems: 'center',
                      backgroundColor: Colors.appPrimaryColor,
                      justifyContent: 'center',
                      borderRadius: 5,
                    }}
                    onPress={handleSubmit}>
                    <Text style={{alignItems: 'center'}}>Continue to Pay</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default CreateIDScreen;
