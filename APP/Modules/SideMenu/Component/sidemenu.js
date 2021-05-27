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
  const removeUserDetails = async () => {
    await Storage.removeItemSync(StorageKeys.JWT);
    await Storage.removeItemSync(StorageKeys.ID);
    await Storage.removeItemSync(StorageKeys.NAME);
    await Storage.removeItemSync(StorageKeys.FCMTOKEN);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate('Profile')}
      />
      <DrawerItem
        label="Banks"
        onPress={() => props.navigation.navigate('Payments')}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          removeUserDetails();
          props.navigation.navigate('Auth');
        }}
      />
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
