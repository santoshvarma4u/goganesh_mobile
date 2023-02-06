import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import Colors from '../../../Theams/Colors';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import {Typography} from '../../Common/Text';

const ICON_SIZE = 20;

const TOP_MENU_BAR_ITEMS = [
  {
    label: 'Profile',
    icon: 'person',
    onPress: 'Profile',
  },
  {
    label: 'Banks',
    icon: 'account-balance',
    onPress: 'Payments',
  },
  {
    label: 'Terms',
    icon: 'info',
    onPress: 'Rules',
  },
  {
    label: 'How to Use',
    icon: 'help',
    onPress: 'HowItWorks',
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
          height: 200,
          backgroundColor: Colors.appBlackColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../Assets/Images/logo_only.png')}
          resizeMode={'contain'}
          width={20}
          height={20}
        />
        <View>
          <Typography style={{color: Colors.appWhiteColor}}>
            {phone ?? ''}
          </Typography>
          <Typography style={{color: Colors.appPrimaryColor}}>
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
              label={item.label}
              onPress={() => {
                props.navigation.navigate(item.onPress);
              }}
              icon={(color, size) => {
                return <Icon size={ICON_SIZE} name={item.icon} />;
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
