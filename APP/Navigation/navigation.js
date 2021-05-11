import React from 'react';
import {Icon} from 'react-native-elements';
import OffersScreen from '../Modules/Offers/Component/offersScreen';
import IDs from '../Modules/IDs/Component/IDs';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Modules/Home/Component/homeScree';
import ProfileScreen from '../Modules/Profile/Component/profileScreen';
import PaymentsScreen from '../Modules/PaymentDetails/Component/paymentDetailsScreen';
import PaymentOptionsScreen from '../Modules/PaymentOptions/Component/paymentOptionScreen';
import DepositScreen from '../Modules/Deposit/Component/depositScreen';
import CreateIDScreen from '../Modules/CreateID/Component/createIDScreen';

import PassbookScreen from '../Modules/Passbook/Component/passbookScreen';
import CustomSidebarMenu from '../Modules/SideMenu/Component/sidemenu';
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
          headerTitle: 'Create ID',
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
      <Stack.Screen
        name="PaymentOptions"
        component={PaymentOptionsScreen}
        options={({navigation}) => ({
          headerTitle: 'Payment Options',
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('CreateID');
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Deposit"
        component={DepositScreen}
        options={({navigation}) => ({
          headerTitle: 'Deposit',
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitleAlign: 'center',
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('PaymentOptions');
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
