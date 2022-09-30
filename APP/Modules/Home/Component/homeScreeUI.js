/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  RefreshControl,
  ImageBackground,
  Dimensions,
} from 'react-native';
// import {SliderBox} from 'react-native-image-slider-box';
import {SliderBox} from 'react-native-image-slider-box';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import FgPuntLogoName from '../../../Assets/svgs/fgpuntlogoname';
// import NetworkAPI from '../../../Network/api/server';
import {env} from '../../../Network/api/server';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import {setUserBanks as reduxSetUserBank} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
// import Storage from '../../Common/Storage';
// import StorageKeys from '../../Common/StorageKeys';
import Images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import IDController from '../../IDs/Controller/IdController';
import IdController from '../../IDs/Controller/IdController';
import HomeListMyIDs from '../Component/homeListMyIDs';
import HomeController from '../Controller/homeController';
import styles from './Styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function HomeScreen(props) {
  let banks = [];
  const navigation = useNavigation();
  const [sliderImgs, setSliderImgs] = useState([]);

  const [userBanks, setUserBanks] = React.useState([]);
  // const {data, success} = HomeController.useGetPromoImages();
  const wallet = HomeController.getWalletBalance();

  const getUserBanks = IDController.getBankData();

  const promoImages = HomeController.useGetPromoImages();

  // const pushFcmToken = async () => {
  //   let ID = await Storage.getItemSync(StorageKeys.ID);
  //   let FCMTOKEN = await Storage.getItemSync(StorageKeys.FCMTOKEN);

  //   await NetworkAPI.apiClient.patch(`/users/${ID}`, {fcm_id: FCMTOKEN});
  // };
  const getMyIDs = IdController.getUserSpecificIDs();

  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    props.setWallet({walletBalance: wallet.data});
  }, [wallet.data]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      wallet.request();
      return () => {
        // alert('Screen was unfocused');
        // Useful for cleanup functions
      };
    }, []),
  );

  useEffect(() => {
    getUserBanks.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
    setUserBanks(banks);
    props.reduxSetUserBanks(banks);
  }, [getUserBanks.data]);

  useEffect(() => {
    // pushFcmToken();
    let slides = [];
    promoImages.data.map(i => {
      slides.push(`${env}${i.promoImage}`);
    });
    setSliderImgs(slides);
  }, [promoImages.data]);

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      {
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => {
        //       setRefreshing(true);
        //       getUserBanks.request();
        //       getMyIDs.request();
        //       wallet.request();
        //       setRefreshing(false);
        //     }}
        //   />
        // }>
      }
      {/* <View style={{flex: 1, width: screenWidth}}> */}
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.appPrimaryColor,
        }}>
        <View style={styles.upperContainer}>
          {/* <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Typography color={Colors.appThemeTextColor} variant={'title'}>
              Wallet Balance
            </Typography>
            <Button
              loading={wallet.loading}
              uppercase={false}
              icon={'reload'}
              color={Colors.appThemeTextColor}
              onPress={() => {
                wallet.request();
              }}
            />
          </View> */}
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="rupee"
              color={Colors.appThemeTextColor}
              size={16}
              type={'font-awesome'}
            />
            <Typography
              color={Colors.appThemeTextColor}
              variant={'H1'}
              style={{
                marginLeft: 6,
                marginTop: 6,
              }}>
              {props.wallet}
            </Typography>
          </View> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: '10%',
            }}>
            <TouchableOpacity
              style={[
                styles.depositCard,
                {
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}
              onPress={() => navigation.navigate('DepositForm', {})}>
              <Typography color={Colors.appWhiteColor} variant="H4">
                Deposit
              </Typography>
              <Icon
                name="chevron-double-down"
                color={Colors.appGreenColor}
                size={30}
                type={'material-community'}
              />
            </TouchableOpacity>
            <View style={styles.centerCard}>
              <FgPuntLogoName width={50} height={50} color={Colors.app} />
              <Typography color={Colors.appWhiteColor} variant="P3">
                WALLET BALANCE
              </Typography>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="rupee"
                  color={Colors.appWhiteColor}
                  size={16}
                  type={'font-awesome'}
                />
                <Typography color={Colors.appWhiteColor} variant={'H3'}>
                  {props.wallet}
                </Typography>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.depositCard,
                {
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}
              onPress={() => navigation.navigate('WithdrawContainer', {})}>
              <Typography color={Colors.appWhiteColor} variant="H4">
                Withdraw
              </Typography>
              <Icon
                name="chevron-double-up"
                color={Colors.appRedColor}
                size={30}
                type={'material-community'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={styles.lowerContainer}>
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
              autoplayInterval={30000}
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
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.buttonBackgroundColor,
              }}
              onPress={() => navigation.navigate("ID's")}>
              <Icon
                type="antdesign"
                name="pluscircle"
                color="white"
                size={18}
              />
              <Typography style={styles.createTextOnly}>Create </Typography>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
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
              marginHorizontal: 10,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              style={[styles.marginVertical, {width: '80%'}]}
              mode={'contained'}
              icon={'whatsapp'}
              color={Colors.appGreenColor}
              onPress={() => {
                let url =
                  'whatsapp://send?text= Please raise your concern here' +
                  '&phone=919777087770';
                Linking.openURL(url);
              }}>
              WhatsApp Support
            </Button>
            <Typography
              color={Colors.appWhiteColor}
              style={styles.marginVertical}
              variant="caption">
              Get your Queries,new updates and latest offers via WhatsApp
              support
            </Typography>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
    userBanks: state.userdetails.userBanks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWallet: wallet => dispatch(setWalletBalance(wallet)),
    reduxSetUserBanks: banks => dispatch(reduxSetUserBank(banks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
