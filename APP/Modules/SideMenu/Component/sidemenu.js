import React from 'react';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerActions,
} from '@react-navigation/drawer';

function CustomSidebarMenu({...props}) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Payments"
        onPress={() => props.navigation.navigate('Payments')}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          Storage.removeItemSync(StorageKeys.JWT);
          Storage.removeItemSync(StorageKeys.ID);
          Storage.removeItemSync(StorageKeys.NAME);
          Storage.removeItemSync(StorageKeys.FCMTOKEN);

          props.navigation.navigate('Auth');
        }}
      />
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
