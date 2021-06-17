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
import * as Yup from 'yup';
import {Checkbox} from 'react-native-paper';
import HomeController from '../../Home/Controller/homeController';
import StorageKeys from '../../../Modules/Common/StorageKeys';
import Storage from '../../../Modules/Common/Storage';
import {CommonActions} from '@react-navigation/native';
import DepositController from '../../Deposit/Controller/depositController';
const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {
    console.log(error);
  }
};

const usernameAndDepositSchema = Yup.object().shape({
  UserName: Yup.string()
    .min(2, 'username is Too Short!')
    .max(20, 'username Too Long!'),
  DepositCoins: Yup.string()
    .min(1, 'DepositCoins Too Short!')
    .required('DepositCoins Required'),
});

function CreateIDScreen({route}) {
  const navigation = useNavigation();
  const {sdid, url, sitename, requestStatus} = route.params;
  const [checked, setChecked] = React.useState(false);
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: "ID's"}],
  });
  const [planDetails, setPlanDetails] = useState({
    planHeader: 'Go Plan',
    MinRefill: '1,000',
    MinWidthdrawl: '1,000',
    MinMaintainBalance: '1,000',
    MaxWithDrawl: '50,000 per day',
  });

  const submitRequest = async (sdid, values) => {
    let uid = await getUID();
    DepositController.submitData(
      parseInt(uid),
      sdid,
      'Go Plan',
      'Wallet',
      'Pending',
      null,
      values.UserName,
      values.DepositCoins,
    ).then(data => {
      DepositController.submitIntialDeposit(
        parseInt(uid),
        sdid,
        'Wallet',
        values.DepositCoins,
        'CR',
        null,
      ).then(data => {
        DepositController.debitFromWallet(
          parseInt(uid),
          values.DepositCoins,
          'DR',
          'Wallet',
        ).then(() => {
          navigation.dispatch(resetAction);
          alert('success');
        });
      });
    });
  };

  const wallet = HomeController.getWalletBalance();
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
            <View
              style={{
                borderBottomColor: Colors.appPrimaryColor,
                borderBottomWidth: 3,
                marginTop: 5,
                width: 40,
                marginLeft: 20,
              }}
            />
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
              validationSchema={usernameAndDepositSchema}
              initialValues={{
                UserName: '',
                DepositCoins: '',
              }}
              onSubmit={values => {
                console.log(values);
                if (checked) {
                  if (parseInt(wallet.data) < values.DepositCoins) {
                    return alert('Insufficient Funds In Wallet');
                  } else {
                    submitRequest(sdid, values);
                  }
                } else {
                  console.log('els epaertansdlnall');
                  navigation.navigate('PaymentOptions', {
                    sdid: sdid,
                    planMoney: planDetails.MinRefill,
                    planType: planDetails.planHeader,
                    userName: values.UserName,
                    depositCoins: values.DepositCoins,
                    requestStatus: requestStatus,
                  });
                }
              }}>
              {({handleChange, handleSubmit, errors, touched}) => (
                <>
                  {route.params.username && (
                    <TextInput
                      style={styles.modalText}
                      placeholder="Username *"
                      placeholderTextColor="#d5d1d1"
                      defaultValue={route.params.username}
                      editable={false}
                      onChangeText={handleChange('UserName')}
                    />
                  )}

                  {!route.params.username && (
                    <TextInput
                      style={styles.modalText}
                      placeholder="Username *"
                      placeholderTextColor="#d5d1d1"
                      defaultValue={route.params.username}
                      onChangeText={handleChange('UserName')}
                    />
                  )}

                  <TextInput
                    style={styles.modalText}
                    keyboardType="numeric"
                    placeholder="Deposit Coins *"
                    placeholderTextColor="#d5d1d1"
                    onChangeText={handleChange('DepositCoins')}
                  />
                  <View style={{flexDirection: 'row'}}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      color={Colors.appPrimaryColor}
                      uncheckedColor="white"
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                    <Text style={{color: 'white'}}>Use Amount From Wallet</Text>
                  </View>
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
                  {errors.UserName && touched.UserName && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.UserName}
                    </Text>
                  )}

                  {errors.DepositCoins && touched.DepositCoins && (
                    <Text style={{backgroundColor: 'white'}}>
                      {errors.DepositCoins}
                    </Text>
                  )}
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
