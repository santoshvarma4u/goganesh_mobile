import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Modal,
  Image,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import styles from './Styles';
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
function HomeScreen(props) {
  const navigation = useNavigation();
  const [sliderImgs, setSliderImgs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const {data, success} = HomeController.useGetPromoImages();
  const wallet = HomeController.getWalletBalance();

  const pushFcmToken = async () => {
    let ID = await Storage.getItemSync(StorageKeys.ID);
    let FCMTOKEN = await Storage.getItemSync(StorageKeys.FCMTOKEN);
    console.log('user token sent');
    await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
  };

  useEffect(() => {
    console.log('jwt from home screen', authKey.token);
    pushFcmToken();

    if (success) {
      data.map(i => {
        reactotron.log(`${env}${i.promoImage}`);
      });
      setSliderImgs(
        data.map(i => {
          `${env}${i.promoImage}`;
        }),
      );
    }
  }, [data, success]);

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
        {/*<View style={styles.promotionCard} />*/}
        <View style={styles.createAnnouncement}>
          <Text style={styles.tipsText}>Tips & Announcements</Text>
          <Text style={styles.tipsSubText}>No Data Available</Text>
        </View>
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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
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
