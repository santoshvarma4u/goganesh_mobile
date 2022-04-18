import {useNavigation} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import * as Yup from 'yup';
import SmallLogo from '../../../Assets/svgs/SmallLogo';
import Storage from '../../../Modules/Common/Storage';
import StorageKeys from '../../../Modules/Common/StorageKeys';
import siteApi from '../../../Network/sites/sites';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import CommonTextInput from '../../Common/CommonTextInput';
import {Typography} from '../../Common/Text';
import DepositController from '../../Deposit/Controller/depositController';
import HomeController from '../../Home/Controller/homeController';
import styles from './Styles';
const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
};

const usernameAndDepositSchema = Yup.object().shape({
  UserName: Yup.string()
    .min(2, 'username is Too Short!')
    .max(9, 'username Too Long!, it should be 9 or less characters')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
    .required('Username is required'),
  DepositCoins: Yup.string()
    .min(1, 'DepositCoins Too Short!')
    .required('DepositCoins Required'),
});

const userNameValidation = Yup.object().shape({
  UserName: Yup.string().required('Username is required'),
  DepositCoins: Yup.string()
    .min(1, 'DepositCoins Too Short!')
    .required('DepositCoins Required'),
});

function CreateIDScreen({route}) {
  const navigation = useNavigation();
  const {sdid, url, sitename, requestStatus} = route.params;
  const [checked, setChecked] = React.useState(false);
  const wallet = HomeController.getWalletBalance();
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
    if (requestStatus === 'old') {
      // Create payment request and withdraw from wallet
      const paymentMethod = 'wallet';
      DepositController.submitDataForMyID(
        parseInt(uid),
        sdid,
        paymentMethod,
        values.DepositCoins,
        'CR',
        '',
      ).then(data => {
        reactotron.log(data);
        // DepositController.debitFromWallet(
        //   parseInt(uid),
        //   values.DepositCoins,
        //   'DR',
        //   'Wallet',
        // ).then(() => {
        //   navigation.dispatch(resetAction);
        //   alert('success');
        // });
      });
    } else {
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
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerMain}>
        <View />
        <View style={styles.createIDContainer}>
          <View style={styles.topIcon}>
            <SmallLogo
              style={{height: 100, width: 100, marginTop: 50}}
              fill={Colors.appPrimaryColor}
            />
            <Typography
              style={{alignItems: 'center', color: 'white', marginTop: 5}}>
              {sitename}
            </Typography>
            <Typography
              style={{alignItems: 'center', color: 'white', marginTop: 5}}>
              {url}
            </Typography>
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
                    backgroundColor: Colors.appPrimaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography style={{alignContent: 'center'}}>
                    Bronze
                  </Typography>
                </View>

                <Typography style={{padding: 5, color: 'white'}}>
                  Min ID
                </Typography>
                <Typography style={{color: 'white'}}>1000</Typography>
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
                  <Typography style={{alignContent: 'center'}}>
                    Silver
                  </Typography>
                </View>
                <Typography style={{padding: 5, color: 'white'}}>
                  Min ID
                </Typography>
                <Typography style={{color: 'white'}}>1000</Typography>
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
                    backgroundColor: Colors.appPrimaryColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Typography style={{alignContent: 'center'}}>Gold</Typography>
                </View>
                <Typography style={{padding: 5, color: 'white'}}>
                  Min ID
                </Typography>
                <Typography style={{color: 'white'}}>1000</Typography>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.planDeatils}>
            <Typography
              style={{
                color: Colors.appWhiteColor,
                marginLeft: 20,
                marginTop: 8,
                fontSize: 16,
              }}>
              {planDetails.planHeader}
            </Typography>
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
              <Typography
                style={{
                  color: Colors.appWhiteColor,
                  marginLeft: 20,
                  marginTop: 10,
                }}>
                Min Refill
              </Typography>
              <Typography style={[styles.planDetailsText, {marginTop: 6}]}>
                {planDetails.MinRefill}
              </Typography>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Typography
                style={{
                  color: Colors.appWhiteColor,
                  marginLeft: 20,
                  marginTop: 6,
                }}>
                Min Withdrawal
              </Typography>
              <Typography style={[styles.planDetailsText, {marginTop: 4}]}>
                {planDetails.MinRefill}
              </Typography>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Typography
                style={{
                  color: Colors.appWhiteColor,
                  marginLeft: 20,
                  marginTop: 6,
                }}>
                Min Maintaining Balance
              </Typography>
              <Typography style={[styles.planDetailsText, {marginTop: 4}]}>
                {planDetails.MinRefill}
              </Typography>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Typography
                style={{
                  color: Colors.appWhiteColor,
                  marginLeft: 20,
                  marginTop: 6,
                }}>
                Max Withdrawal
              </Typography>
              <Typography style={[styles.planDetailsText, {marginTop: 4}]}>
                {planDetails.MaxWithDrawl}
              </Typography>
            </View>
          </View>

          <View style={styles.planDeatils}>
            <Formik
              validationSchema={
                route.params.username
                  ? userNameValidation
                  : usernameAndDepositSchema
              }
              initialValues={{
                UserName: route.params.username,
                DepositCoins: '',
              }}
              onSubmit={values => {
                siteApi
                  .validateUsername(values.UserName, sdid)
                  .then(validateUsername => {
                    let {data} = validateUsername;
                    if (
                      data.details.data.length === 0 ||
                      route.params.username
                    ) {
                      if (checked) {
                        if (parseInt(wallet.data) < values.DepositCoins) {
                          return alert('Insufficient Funds In Wallet');
                        } else {
                          submitRequest(sdid, values);
                        }
                      } else {
                        navigation.navigate('PaymentOptions', {
                          sdid: sdid,
                          planMoney: planDetails.MinRefill,
                          planType: planDetails.planHeader,
                          userName: values.UserName,
                          depositCoins: values.DepositCoins,
                          requestStatus: requestStatus,
                        });
                      }
                    } else {
                      alert('Username already taken, please try different one');
                    }
                  });
              }}>
              {({handleChange, handleSubmit, errors, touched}) => (
                <>
                  {route.params.username && (
                    <CommonTextInput
                      style={styles.modalText}
                      placeholder="Username *"
                      placeholderTextColor="#d5d1d1"
                      defaultValue={route.params.username}
                      editable={false}
                      onChangeText={handleChange('UserName')}
                    />
                  )}

                  {!route.params.username && (
                    <CommonTextInput
                      style={styles.modalText}
                      placeholder="Username *"
                      placeholderTextColor="#d5d1d1"
                      defaultValue={route.params.username}
                      onChangeText={handleChange('UserName')}
                    />
                  )}
                  {errors.UserName && touched.UserName && (
                    <Typography color={Colors.appRedColor}>
                      {errors.UserName}
                    </Typography>
                  )}
                  <CommonTextInput
                    style={styles.modalText}
                    keyboardType="numeric"
                    placeholder="Deposit Coins *"
                    placeholderTextColor="#d5d1d1"
                    onChangeText={handleChange('DepositCoins')}
                  />
                  {errors.DepositCoins && touched.DepositCoins && (
                    <Typography color={Colors.appRedColor}>
                      {errors.DepositCoins}
                    </Typography>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      color={Colors.appPrimaryColor}
                      uncheckedColor="white"
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                    <Typography style={{color: 'white'}}>
                      Use Amount From Wallet
                    </Typography>
                  </View>
                  <Button
                    mode="contained"
                    color={Colors.appPrimaryColor}
                    onPress={handleSubmit}>
                    Continue to Pay
                  </Button>
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
