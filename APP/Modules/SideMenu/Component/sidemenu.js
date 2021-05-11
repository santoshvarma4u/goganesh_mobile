import React from 'react';

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
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
