import React from 'react';
import {Icon} from 'react-native-elements';
import OffersScreen from '../screens/offersScreen';
import IDs from '../screens/IDs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScree';
import ProfileScreen from '../screens/profileScreen';
import PaymentsScreen from '../screens/paymentDetailsScreen';
import CreateIDScreen from '../screens/createIDScreen';

import PassbookScreen from '../screens/passbookScreen';
import CustomSidebarMenu from '../screens/sidemenu';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerActions} from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitle: 'Home',
          headerTitleAlign: 'center',
          headerLeft: () => (
            {marginLeft: 'auto'},
            (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            )
          ),
          headerRight: () => (
            <Icon
              name="notifications"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({navigation}) => ({
          headerTitle: 'Profile',
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Payments"
        component={PaymentsScreen}
        options={({navigation}) => ({
          headerTitle: 'Payments',
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('Home');
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const OffersStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Offers"
        component={OffersScreen}
        options={() => ({
          headerStyle: {backgroundColor: '#e39b11'},
        })}
      />
    </Stack.Navigator>
  );
};
const PassbookStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Passbook"
        component={PassbookScreen}
        options={() => ({
          headerStyle: {backgroundColor: '#e39b11'},
        })}
      />
    </Stack.Navigator>
  );
};
const IDsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IDs"
        component={IDs}
        options={() => ({
          headerStyle: {backgroundColor: '#e39b11'},
        })}
      />
      <Stack.Screen
        name="CreateID"
        component={CreateIDScreen}
        options={({navigation}) => ({
          headerTitle: 'Payments',
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('IDs');
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Icon name="home" color="black" size={26} />,
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersStackNavigator}
        options={{
          tabBarLabel: 'Offers',
          tabBarIcon: () => <Icon name="local-offer" color="black" size={26} />,
        }}
      />
      <Tab.Screen
        name="Passbook"
        component={PassbookStackNavigator}
        options={{
          tabBarLabel: 'Passbook',
          tabBarIcon: () => <Icon name="local-offer" color="black" size={26} />,
        }}
      />
      <Tab.Screen
        name="ID's"
        component={IDsStackNavigator}
        options={{
          tabBarLabel: 'IDs',
          tabBarIcon: () => <Icon name="local-offer" color="black" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};

export {
  HomeStackNavigator,
  OffersStackNavigator,
  PassbookStackNavigator,
  IDsStackNavigator,
  BottomTabNavigator,
  MyDrawer,
};
