import React from 'react';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerActions,
} from '@react-navigation/drawer';
import Colors from '../../../Theams/Colors';
import {Image, Text, View} from 'react-native';
import images from '../../../Theams/Images';
import {Icon} from 'react-native-elements';

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
          style={{
            width: 180,
            height: 180,
          }}
          source={images.logo}
        />
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
        icon={(color, size) => {
          return <Icon size={23} name={'person'} />;
        }}
      />
      <DrawerItem
        label="Banks"
        onPress={() => props.navigation.navigate('Payments')}
        icon={(color, size) => {
          return <Icon size={23} name={'account-balance'} />;
        }}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          removeUserDetails();
          props.navigation.navigate('Auth');
        }}
        icon={(color, size) => {
          return <Icon size={23} name={'logout'} />;
        }}
      />
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
