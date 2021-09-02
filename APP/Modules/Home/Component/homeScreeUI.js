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
  ScrollView,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import styles from './Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import {Icon} from 'react-native-elements';
import HomeController from '../Controller/homeController';
import images from '../../../Theams/Images';
import Colors from '../../../Theams/Colors';
import {SliderBox} from 'react-native-image-slider-box';
import {useNavigation} from '@react-navigation/native';
import {env} from '../../../Network/api/server';
import reactotron from 'reactotron-react-native';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import IDController from '../../IDs/Controller/IdController';
import FlatListPicker from 'react-native-flatlist-picker';
import IdController from '../../IDs/Controller/IdController';
import homeListMyIDs from '../Component/homeListMyIDs';
import HomeListMyIDs from '../Component/homeListMyIDs';
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
    console.log(banks);
    await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
  };
  const getMyIDs = IdController.getUserSpecificIDs();

  useEffect(() => {
    pushFcmToken();
    if (success) {
      data.map(i => {
        console.log(`${env}${i.promoImage}`);
      });
      setSliderImgs(
        data.map(i => {
          `${env}${i.promoImage}`;
        }),
      );
    }
    getUserBanks.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
    setUserBanks(banks);
  }, [data, success, getUserBanks.data]);

  return (
    <View style={styles.containerMain}>
      <View style={styles.upperContainer}>
        <View style={styles.centralCardView}>
          <View style={styles.depositCard}>
            <TouchableOpacity onPress={() => setDialogVisible(true)}>
              <Text style={styles.text}>DEPOSIT</Text>
              <Icon name="file-upload" color="white" size={34} />
            </TouchableOpacity>
          </View>
          <View style={styles.blankCard} />
          <View style={styles.withdrawCard}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.text}>WITHDRAW</Text>
              <Icon name="file-download" color="white" size={34} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.centreCard}>
          <TouchableOpacity
            onPress={() => wallet.request()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Image style={styles.image} source={images.logo} />
            <Text style={{color: 'white', alignItems: 'center'}}>
              Wallet Balance
            </Text>
            <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
              {wallet.data} INR
            </Text>
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
        <TouchableOpacity
          style={{
            width: '80%',
            margin: 20,
            height: 40,
            padding: 8,
            alignItems: 'center',
            backgroundColor: Colors.appPrimaryColor,
            justifyContent: 'center',
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("ID's")}>
          <Text style={styles.createTextOnly}>Create ID</Text>
        </TouchableOpacity>
        <View style={{marginRight: 'auto'}}>
          <Text
            style={{
              color: '#d5d1d1',
              marginLeft: 10,
              fontSize: 16,
            }}>
            My IDs
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
        </View>
        <View style={styles.promotionCard}>
          <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={getMyIDs.data}
            renderItem={({item}) => (
              <HomeListMyIDs data={item} bank={getUserBanks} />
            )}
            keyExtractor={(item, index) => index.toString()}
            style={{width: '90%', height: '100%'}}
          />
        </View>
        {/*<!-------------------------->\*/}

        {/*<----------->  */}

        {/*<View style={styles.createAnnouncement}>*/}
        {/*  <Text style={styles.tipsText}>Tips & Announcements</Text>*/}
        {/*  <Text style={styles.tipsSubText}>No Data Available</Text>*/}
        {/*</View>*/}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Edit Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Formik
              initialValues={{
                withdrawAmount: '',
              }}
              onSubmit={values => {
                if (parseInt(wallet.data) < parseInt(values.withdrawAmount)) {
                  return alert('Enter Valid amount');
                }
                IDController.sendWalletWithDrawRequest(
                  'Wallet',
                  values.withdrawAmount,
                  'DR',
                  selectedBankID,
                ).then(() => {
                  setModalVisible(!modalVisible);
                  alert('Withdraw Request Sent Successfully');
                });
              }}>
              {({handleChange, handleSubmit}) => (
                <>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.modalText}>
                      Enter Amount to Withdraw
                    </Text>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(false)}>
                      <Icon
                        name="cancel"
                        color={Colors.appPrimaryColor}
                        size={32}
                      />
                    </Pressable>
                  </View>
                  <Text style={styles.notetext}>
                    Note: Please make sure, withdraw amount must be less or
                    equal to wallet balance!!
                  </Text>
                  <TextInput
                    style={[styles.modalText, {borderBottomWidth: 0.5}]}
                    placeholder="Ex : 200"
                    keyboardType="numeric"
                    onChangeText={handleChange('withdrawAmount')}
                  />

                  <FlatListPicker
                    data={userBanks}
                    containerStyle={styles.dropdownStyle}
                    dropdownStyle={{
                      marginHorizontal: 10,
                      width: 250,
                      marginTop: 10,
                    }}
                    dropdownTextStyle={{fontSize: 15}}
                    pickedTextStyle={{color: 'black', fontWeight: 'bold'}}
                    defaultValue="Select Bank"
                    renderDropdownIcon={() => (
                      <Icon
                        name="arrow-drop-down"
                        color={Colors.appBlackColor}
                        size={32}
                      />
                    )}
                    onValueChange={(value, index) => {
                      setSelectedBank(value);
                      let bankid = userBanks.find(o => o.value == value);
                      setSelectedBankID(bankid.key);
                    }}
                  />

                  <Button
                    style={styles.modalText}
                    title="Send Withdraw Request"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
      </Modal>

      <DialogInput
        isDialogVisible={dialogVisible}
        title={'Enter Amount To Deposit In Wallet'}
        message={'Amount'}
        hintInput={'Ex: 1000'}
        initValueTextInput=""
        textInputProps={{keyboardType: 'numeric'}}
        submitInput={inputText => {
          if (inputText.length <= 0) {
            return alert('Please enter a valid amount');
          }
          setDialogVisible(false);
          navigation.navigate('PaymentOptions', {
            depositCoins: inputText,
            requestStatus: 'wallet',
          });
        }}
        closeDialog={() => setDialogVisible(false)}
      />
    </View>
  );
}

export default HomeScreen;
