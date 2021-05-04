// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  ListItem,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerActions,
} from '@react-navigation/drawer';

function CustomSidebarMenu({...props}) {
  return (
    <DrawerContentScrollView>
      <DrawerItemList>
        <ListItem>
          <Text>asnblj</Text>
        </ListItem>
      </DrawerItemList>
    </DrawerContentScrollView>
  );
}
export default CustomSidebarMenu;
