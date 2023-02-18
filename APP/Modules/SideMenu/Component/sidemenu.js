import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {updateIdState} from '../../../Store/Slices/idStateSlice';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';
const ICON_SIZE = 20;

const TOP_MENU_BAR_ITEMS = [
  {
    label: 'Profile',
    icon: 'person-outline',
    onPress: 'Profile',
    type: 'ionicon',
  },
  {
    label: 'Create ID',
    icon: 'person-add-outline',
    onPress: "ID's",
    type: 'ionicon',
  },
  {
    label: 'Withdraw Details',
    icon: 'cash-outline',
    onPress: 'Payments',
    type: 'ionicon',
  },
  {
    label: 'Terms',
    icon: 'information-outline',
    type: 'ionicon',
    onPress: 'Rules',
  },
  {
    label: 'How to Use',
    icon: 'help-circle-outline',
    onPress: 'HowItWorks',
    type: 'ionicon',
  },
  {
    label: 'Offers',
    icon: 'local-offer',
    onPress: 'Offers',
  },
];

const BOTTOM_MENU_BAR_ITEMS = [
  {
    label: 'Help',
    icon: 'help',
    onPress: 'Help',
  },
  {
    label: 'Logout',
    icon: 'logout',
    onPress: 'Auth',
  },
];

function CustomSidebarMenu({...props}) {
  const removeUserDetails = async () => {
    await Storage.removeItemSync(StorageKeys.JWT);
    await Storage.removeItemSync(StorageKeys.ID);
    await Storage.removeItemSync(StorageKeys.NAME);
    await Storage.removeItemSync(StorageKeys.FCMTOKEN);
  };
  const [phone, setPhone] = useState(false);

  const getPhone = async () => {
    try {
      return await Storage.getItemSync(StorageKeys.PHONE);
    } catch (error) {}
  };

  useEffect(() => {
    getPhone().then(data => setPhone(data));
  }, []);

  // from redux
  const walletBalance = useSelector(state => state.home.walletBalance);
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        paddingTop: 0,
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          height: 220,
          backgroundColor: Colors.appBlackColor,
          padding: 10,
        }}>
        <Image
          source={require('../../../Assets/Images/logo_only.png')}
          resizeMode={'contain'}
          width={5}
          height={5}
          style={{
            width: 100,
            height: 100,
          }}
        />
        <View
          style={{
            alignItems: 'flex-start',
            padding: 10,
          }}>
          <Typography variant="H4" style={{color: Colors.appWhiteColor}}>
            +91 {phone ?? ''}
          </Typography>
          <View
            style={{
              backgroundColor: Colors.appWhiteColor,
              marginVertical: 10,
              height: 0.5,
              width: '50%',
            }}
          />
          <Typography variant="H4" style={{color: Colors.appPrimaryColor}}>
            Wallet Balance : {walletBalance}
          </Typography>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        {TOP_MENU_BAR_ITEMS.map((item, index) => {
          return (
            <DrawerItem
              key={index}
              label={() => {
                return (
                  <Typography
                    variant="P2"
                    style={{color: Colors.appBlackColor}}>
                    {item.label}
                  </Typography>
                );
              }}
              onPress={() => {
                props.navigation.navigate(item.onPress);
                if (item.onPress === "ID's") {
                  dispatch(updateIdState({index: 1}));
                }
              }}
              icon={(color, size) => {
                return (
                  <Icon size={ICON_SIZE} name={item.icon} type={item.type} />
                );
              }}
            />
          );
        })}
      </View>
      <View
        style={{
          borderTopColor: Colors.appBlackColor + '30',
          borderTopWidth: 0.4,
        }}>
        {BOTTOM_MENU_BAR_ITEMS.map((item, index) => {
          return (
            <DrawerItem
              key={index}
              label={item.label}
              onPress={() => {
                if (item.onPress === 'Auth') {
                  removeUserDetails();
                }
                props.navigation.navigate(item.onPress);
              }}
              icon={(color, size) => {
                return <Icon size={ICON_SIZE} name={item.icon} />;
              }}
            />
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
