/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {Icon} from 'react-native-elements';
import FlatListPicker from 'react-native-flatlist-picker';
import {SliderBox} from 'react-native-image-slider-box';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import SmallLogo from '../../../Assets/svgs/SmallLogo';
import {env} from '../../../Network/api/server';
import NetworkAPI from '../../../Network/api/server';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import IDController from '../../IDs/Controller/IdController';
import IdController from '../../IDs/Controller/IdController';
import HomeListMyIDs from '../Component/homeListMyIDs';
import HomeController from '../Controller/homeController';
import styles from './Styles';
function HomeScreen(props) {
  let banks = [];
  const navigation = useNavigation();
  const [sliderImgs, setSliderImgs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedBank, setSelectedBank] = React.useState('');
  const [selectedBankID, setSelectedBankID] = React.useState('');
  const [userBanks, setUserBanks] = React.useState([]);
  const {data, success} = HomeController.useGetPromoImages();
  const wallet = HomeController.getWalletBalance();

  const getUserBanks = IDController.getBankData();
  const pushFcmToken = async () => {
    let ID = await Storage.getItemSync(StorageKeys.ID);
    let FCMTOKEN = await Storage.getItemSync(StorageKeys.FCMTOKEN);

    await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
  };
  const getMyIDs = IdController.getUserSpecificIDs();

  useEffect(() => {
    props.setWallet({walletBalance: wallet.data});
  }, [wallet.data]);

  useEffect(() => {
    pushFcmToken();
    if (success) {
      let slides = [];
      slides.push('https://i.ibb.co/VTXdFWZ/Screenshot-20220401-231028-2.png');
      slides.push('https://i.ibb.co/gTDnHkq/Screenshot-20220401-231019-2.png');
      data.map(i => {
        slides.push(`http://139.59.11.217:3000/${i.promoImage}`);
      });
      setSliderImgs(slides);
    }
    reactotron.log(data);
    getUserBanks.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
    setUserBanks(banks);
  }, [data, success, getUserBanks.data]);

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      <View style={styles.upperContainer}>
        {/* <View style={styles.centralCardView}> */}
        <View style={styles.depositCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DepositForm', {})}>
            <Text style={styles.text}>DEPOSIT</Text>
            <Icon
              name="double-arrow"
              color="white"
              size={34}
              style={{transform: [{rotate: '-90deg'}]}}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => wallet.request()}
          style={styles.centreCard}>
          <SmallLogo
            style={{height: 80, width: 80}}
            fill={Colors.appPrimaryColor}
          />
          <Text style={{color: 'white', alignItems: 'center'}}>
            Wallet Balance
          </Text>
          <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
            {props.wallet} INR
          </Text>
        </TouchableOpacity>
        <View style={styles.withdrawCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WithdrawContainer', {})}>
            <Text style={styles.text}>WITHDRAW</Text>
            <Icon
              name="double-arrow"
              color="white"
              size={34}
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lowerContainer}>
        <View style={styles.lowerBox1}>
          <SliderBox
            images={sliderImgs}
            dotColor={Colors.appPrimaryColor}
            inactiveDotColor={Colors.appPrimaryColor}
            paginationBoxVerticalPadding={20}
            ImageComponentStyle={{overflow: 'hidden'}}
            resizeMode={'contain'}
            autoplay
            circleLoop
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#d5d1d1',
                fontSize: 16,
              }}>
              My IDs
            </Text>
            <View
              style={{
                borderBottomColor: Colors.appPrimaryColor,
                borderBottomWidth: 2,
                marginTop: 5,
                width: 40,
              }}
            />
          </View>
          <View style={{flex: 1}} />
          <TouchableOpacity
            style={{
              // margin: 20,
              height: 40,
              padding: 5,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.appBlackColor,
            }}
            onPress={() => navigation.navigate("ID's")}>
            <Icon type="antdesign" name="pluscircle" color="white" size={18} />
            <Text style={styles.createTextOnly}>Create </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.promotionCard}>
          <FlatList
            horizontal
            // pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={getMyIDs.data}
            renderItem={({item}) => (
              <HomeListMyIDs
                data={item}
                bank={getUserBanks}
                navigation={props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={{height: '100%'}}
          />
        </View>
        {/*<!-------------------------->\*/}

        {/*<----------->  */}

        {/*<View style={styles.createAnnouncement}>*/}
        {/*  <Text style={styles.tipsText}>Tips & Announcements</Text>*/}
        {/*  <Text style={styles.tipsSubText}>No Data Available</Text>*/}
        {/*</View>*/}
      </View>

      {/*<Modal*/}
      {/*  animationType="slide"*/}
      {/*  transparent={true}*/}
      {/*  visible={modalVisible}*/}
      {/*  onRequestClose={() => {*/}
      {/*    Alert.alert('Edit Modal has been closed.');*/}
      {/*    setModalVisible(!modalVisible);*/}
      {/*  }}>*/}
      {/*  <View style={styles.centeredView}>*/}
      {/*    <View style={styles.modalView}>*/}
      {/*      <Formik*/}
      {/*        initialValues={{*/}
      {/*          withdrawAmount: '',*/}
      {/*        }}*/}
      {/*        onSubmit={values => {*/}
      {/*          if (parseInt(wallet.data) < parseInt(values.withdrawAmount)) {*/}
      {/*            return alert('Enter Valid amount');*/}
      {/*          }*/}
      {/*          IDController.sendWalletWithDrawRequest(*/}
      {/*            'Wallet',*/}
      {/*            values.withdrawAmount,*/}
      {/*            'DR',*/}
      {/*            selectedBankID,*/}
      {/*          ).then(() => {*/}
      {/*            setModalVisible(!modalVisible);*/}
      {/*            alert('Withdraw Request Sent Successfully');*/}
      {/*          });*/}
      {/*        }}>*/}
      {/*        {({handleChange, handleSubmit}) => (*/}
      {/*          <>*/}
      {/*            <View style={{flexDirection: 'row'}}>*/}
      {/*              <Text style={styles.modalText}>*/}
      {/*                Enter Amount to Withdraw*/}
      {/*              </Text>*/}
      {/*              <Pressable*/}
      {/*                style={[styles.button, styles.buttonClose]}*/}
      {/*                onPress={() => setModalVisible(false)}>*/}
      {/*                <Icon*/}
      {/*                  name="cancel"*/}
      {/*                  color={Colors.appPrimaryColor}*/}
      {/*                  size={32}*/}
      {/*                />*/}
      {/*              </Pressable>*/}
      {/*            </View>*/}
      {/*            <Text style={styles.notetext}>*/}
      {/*              Note: Please make sure, withdraw amount must be less or*/}
      {/*              equal to wallet balance!!*/}
      {/*            </Text>*/}
      {/*            <TextInput*/}
      {/*              style={[styles.modalText, {borderBottomWidth: 0.5}]}*/}
      {/*              placeholder="Ex : 200"*/}
      {/*              keyboardType="numeric"*/}
      {/*              onChangeText={handleChange('withdrawAmount')}*/}
      {/*            />*/}

      {/*            <FlatListPicker*/}
      {/*              data={userBanks}*/}
      {/*              containerStyle={styles.dropdownStyle}*/}
      {/*              dropdownStyle={{*/}
      {/*                marginHorizontal: 10,*/}
      {/*                width: 250,*/}
      {/*                marginTop: 10,*/}
      {/*              }}*/}
      {/*              dropdownTextStyle={{fontSize: 15}}*/}
      {/*              pickedTextStyle={{color: 'black', fontWeight: 'bold'}}*/}
      {/*              defaultValue="Select Bank"*/}
      {/*              renderDropdownIcon={() => (*/}
      {/*                <Icon*/}
      {/*                  name="arrow-drop-down"*/}
      {/*                  color={Colors.appBlackColor}*/}
      {/*                  size={32}*/}
      {/*                />*/}
      {/*              )}*/}
      {/*              onValueChange={(value, index) => {*/}
      {/*                setSelectedBank(value);*/}
      {/*                let bankid = userBanks.find(o => o.value == value);*/}
      {/*                setSelectedBankID(bankid.key);*/}
      {/*              }}*/}
      {/*            />*/}

      {/*            <Button*/}
      {/*              style={styles.modalText}*/}
      {/*              title="Send Withdraw Request"*/}
      {/*              onPress={handleSubmit}*/}
      {/*            />*/}
      {/*          </>*/}
      {/*        )}*/}
      {/*      </Formik>*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</Modal>*/}

      {/*<DialogInput*/}
      {/*  isDialogVisible={dialogVisible}*/}
      {/*  title={'Enter Amount To Deposit In Wallet'}*/}
      {/*  message={'Amount'}*/}
      {/*  hintInput={'Ex: 1000'}*/}
      {/*  initValueTextInput=""*/}
      {/*  textInputProps={{keyboardType: 'numeric'}}*/}
      {/*  submitInput={inputText => {*/}
      {/*    if (inputText.length <= 0) {*/}
      {/*      return alert('Please enter a valid amount');*/}
      {/*    }*/}
      {/*    setDialogVisible(false);*/}
      {/*    navigation.navigate('PaymentOptions', {*/}
      {/*      depositCoins: inputText,*/}
      {/*      requestStatus: 'wallet',*/}
      {/*    });*/}
      {/*  }}*/}
      {/*  closeDialog={() => setDialogVisible(false)}*/}
      {/*/>*/}
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWallet: wallet => dispatch(setWalletBalance(wallet)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
