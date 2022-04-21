/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {SliderBox} from 'react-native-image-slider-box';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import reactotron from 'reactotron-react-native';
import SmallLogo from '../../../Assets/svgs/SmallLogo';
import WalletLogo from '../../../Assets/svgs/walletlogo';
import NetworkAPI from '../../../Network/api/server';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
import IDController from '../../IDs/Controller/IdController';
import IdController from '../../IDs/Controller/IdController';
import HomeListMyIDs from '../Component/homeListMyIDs';
import HomeController from '../Controller/homeController';
import styles from './Styles';
function HomeScreen(props) {
  let banks = [];
  const navigation = useNavigation();
  const [sliderImgs, setSliderImgs] = useState([]);

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
    <View style={styles.containerMain}>
      <View style={styles.upperContainer}>
        {/* <View style={styles.centralCardView}> */}
        <View style={styles.depositCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DepositForm', {})}>
            <Typography style={styles.text}>DEPOSIT</Typography>
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
          <WalletLogo height={80} width={80} fill={Colors.appPrimaryColor} />
          <Typography style={{color: 'white', alignItems: 'center'}}>
            Wallet Balance
          </Typography>
          <Typography
            style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
            {props.wallet} INR
          </Typography>
        </TouchableOpacity>
        <View style={styles.withdrawCard}>
          <TouchableOpacity
            onPress={() => navigation.navigate('WithdrawContainer', {})}>
            <Typography style={styles.text}>WITHDRAW</Typography>
            <Icon
              name="double-arrow"
              color="white"
              size={34}
              style={{transform: [{rotate: '90deg'}]}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.lowerContainer}>
        {/* <View style={styles.lowerBox1}>
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
        </View> */}
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
              marginTop: 20,
            }}>
            <Typography
              variant="H3"
              style={{
                color: '#d5d1d1',
                fontSize: 16,
              }}>
              My IDs
            </Typography>
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
              padding: 10,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.appBlackColor,
            }}
            onPress={() => navigation.navigate("ID's")}>
            <Icon type="antdesign" name="pluscircle" color="white" size={18} />
            <Typography style={styles.createTextOnly}>Create </Typography>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              marginVertical: 20,
              width: '100%',
              marginLeft: 10,
            }}
            data={getMyIDs.data}
            renderItem={({item}) => (
              <HomeListMyIDs
                data={item}
                bank={getUserBanks}
                navigation={props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Typography
              variant="H3"
              style={{
                color: '#d5d1d1',
              }}>
              Explore More
            </Typography>
            <View
              style={{
                borderBottomColor: Colors.appPrimaryColor,
                borderBottomWidth: 2,
                marginTop: 5,
                width: 40,
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}>
          <Typography color={Colors.appWhiteColor}>WhatsApp Support</Typography>
          <Typography
            color={Colors.appWhiteColor}
            style={styles.marginVertical}>
            Get your Queries,new updates and latest offers via WhatsApp support
          </Typography>
          <Button
            style={styles.marginVertical}
            mode={'contained'}
            icon={'whatsapp'}
            color={Colors.appGreenColor}
            onPress={() => {
              let url =
                'whatsapp://send?text= Please raise your concern here' +
                '&phone=919398322333';
              Linking.openURL(url);
            }}>
            Click Here for Support
          </Button>
        </View>
      </ScrollView>
    </View>
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
