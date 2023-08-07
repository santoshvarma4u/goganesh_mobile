/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import {setIn} from 'formik';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Linking,
  RefreshControl,
  Pressable,
} from 'react-native';
import {Button} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {env} from '../../../Network/api/server';
import {setWalletBalance} from '../../../Store/Slices/homeSlice';
import {updateIdState} from '../../../Store/Slices/idStateSlice';
import {setUserBanks as reduxSetUserBank} from '../../../Store/Slices/userDetailsSlice';
import Colors from '../../../Theams/Colors';
import Images from '../../../Theams/Images';
import metrics from '../../../Theams/Metrics';
import {getWhatsappMessageUrl} from '../../../Utils';
import ChatScreen from '../../Chat/ChatScreen';
import FGImage from '../../Common/FGImage';
import FGSliderBox from '../../Common/SliderBox';
import {Typography} from '../../Common/Text';
import IDController from '../../IDs/Controller/IdController';
import IdController from '../../IDs/Controller/IdController';
import HomeListMyIDs from '../Component/homeListMyIDs';
import HomeController from '../Controller/homeController';
import styles from './Styles';

const BORDER_RADIUS = metrics.borderRadius;

function HomeScreen(props) {
  let banks = [];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [sliderImgs, setSliderImgs] = useState([]);
  const wallet = HomeController.getWalletBalance();
  const getUserBanks = IDController.getBankData();
  const promoImages = HomeController.useGetPromoImages();
  const getMyIDs = IdController.getUserSpecificIDs();
  const [refreshing, setRefreshing] = React.useState(false);

  // useEffect(() => {
  //   setInterval(() => {
  //     wallet.request();
  //   }, 5000);
  // }, []);

  useEffect(() => {
    props.setWallet({walletBalance: wallet.data});
  }, [wallet.data]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      wallet.request();
      getMyIDs.request();
      return () => {
        // Screen was unfocused
        // Useful for cleanup functions
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useEffect(() => {
    getUserBanks.data.map(item => {
      banks.push({
        value: item.bankName,
        key: item.bid,
      });
    });
    props.reduxSetUserBanks(banks);
  }, [getUserBanks.data]);

  useEffect(() => {
    if (promoImages.data) {
      let {data} = promoImages || {
        data: [],
      };
      const images = data?.map(i => {
        return `${env}${i.promoImage}`;
      });
      setSliderImgs(images);
    }
  }, [promoImages.data]);

  return (
    <ScrollView
      contentContainerStyle={styles.containerMain}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            getUserBanks.request();
            getMyIDs.request();
            wallet.request();
            setRefreshing(false);
          }}
        />
      }>
      <View>
        <View style={styles.upperContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Pressable
              style={[
                styles.depositCard,
                {
                  borderTopLeftRadius: BORDER_RADIUS,
                  borderBottomLeftRadius: BORDER_RADIUS,
                },
              ]}
              onPress={() => navigation.navigate('DepositForm', {})}>
              <Typography color={Colors.appWhiteColor} variant="P3">
                DEPOSIT
              </Typography>
              <Icon
                name="double-arrow"
                color={Colors.appWhiteColor}
                size={64}
                type={'material-icons'}
                style={{
                  transform: [{rotate: '-90deg'}],
                }}
              />
            </Pressable>
            <View style={styles.centerCard}>
              <FGImage
                style={{width: 100, height: 100}}
                source={Images.newLogoOnly}
                resizeMode={'contain'}
              />
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Typography color={Colors.appWhiteColor} variant="P3">
                  WALLET BALANCE
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <Icon
                    name="coins"
                    color={Colors.appWhiteColor}
                    size={14}
                    style={{marginRight: 3}}
                    type={'font-awesome-5'}
                  />
                  <Typography color={Colors.appWhiteColor} variant={'H4'}>
                    {Number(props.wallet)?.toFixed(2)}
                  </Typography>
                </View>
              </View>
            </View>
            <Pressable
              style={[
                styles.depositCard,
                {
                  borderTopRightRadius: BORDER_RADIUS,
                  borderBottomRightRadius: BORDER_RADIUS,
                },
              ]}
              onPress={() => navigation.navigate('WithdrawContainer', {})}>
              <Typography color={Colors.appWhiteColor} variant="P3">
                WITHDRAW
              </Typography>
              <Icon
                name="double-arrow"
                color={Colors.appWhiteColor}
                size={64}
                type={'material-icons'}
                style={{
                  transform: [{rotate: '90deg'}],
                }}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerBox1}>
            <FGSliderBox data={sliderImgs} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 20,
            }}>
            <View>
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
              style={styles.createButton}
              onPress={() => {
                navigation.navigate("ID's");
                dispatch(updateIdState({index: 1}));
              }}>
              <Icon
                type="antdesign"
                name="pluscircle"
                color="white"
                size={16}
              />
              <Typography style={styles.createTextOnly}>Create </Typography>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                navigation.navigate("ID's");
                dispatch(updateIdState({index: 0}));
              }}>
              <Typography style={styles.createTextOnly}>View All</Typography>
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
            <View>
              <Typography
                variant="H3"
                style={{
                  color: '#d5d1d1',
                }}>
                Support
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
            <ChatScreen />
            <Button
              style={[styles.marginVertical, {width: '80%'}]}
              mode={'contained'}
              icon={'whatsapp'}
              color={Colors.appGreenColor}
              onPress={() => {
                let url = getWhatsappMessageUrl();
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
        </View>
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
