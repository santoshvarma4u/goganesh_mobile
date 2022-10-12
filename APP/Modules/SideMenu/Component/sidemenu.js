import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from '@rneui/themed';
import React from 'react';
import {Image, Text, View} from 'react-native';
import SplashLogo from '../../../Assets/svgs/SplashLogo';
import FGPUNTLOGO from '../../../Assets/svgs/fgpuntlogo';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

function CustomSidebarMenu({...props}) {
  const removeUserDetails = async () => {
    await Storage.removeItemSync(StorageKeys.JWT);
    await Storage.removeItemSync(StorageKeys.ID);
    await Storage.removeItemSync(StorageKeys.NAME);
    await Storage.removeItemSync(StorageKeys.FCMTOKEN);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{paddingTop: 0}}>
      <View
        style={{
          height: 180,
          backgroundColor: Colors.appBlackColor,
          alignItems: 'center',
          borderTopRightRadius: 30,
          justifyContent: 'center',
        }}>
        <Image
          source={require('../../../Assets/Images/logo_only.png')}
          resizeMode={'contain'}
          width={60}
          height={60}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
        icon={(color, size) => {
          return <Icon size={32} name={'person'} />;
        }}
      />
      <DrawerItem
        label="Banks"
        onPress={() => props.navigation.navigate('Payments')}
        icon={(color, size) => {
          return <Icon size={32} name={'account-balance'} />;
        }}
      />
      {/*<DrawerItem*/}
      {/*  label="Help"*/}
      {/*  onPress={() => {*/}
      {/*    props.navigation.navigate('Help');*/}
      {/*  }}*/}
      {/*  icon={(color, size) => {*/}
      {/*    return <Icon size={32} name={'info'} />;*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<DrawerItem*/}
      {/*  label="Support"*/}
      {/*  onPress={() => {*/}
      {/*    props.navigation.navigate('Support');*/}
      {/*  }}*/}
      {/*  icon={(color, size) => {*/}
      {/*    return <Icon size={32} name={'help'} />;*/}
      {/*  }}*/}
      {/*/>*/}
      <DrawerItem
        label="Logout"
        onPress={() => {
          removeUserDetails();
          props.navigation.navigate('Auth');
        }}
        icon={(color, size) => {
          return <Icon size={32} name={'logout'} />;
        }}
      />
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
