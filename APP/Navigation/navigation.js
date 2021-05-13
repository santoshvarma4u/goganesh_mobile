import React from 'react';
import {Icon} from 'react-native-elements';
import OffersScreen from '../Modules/Offers/Container/offersIndex';
import IDsScreenPage from '../Modules/IDs/Container/IDsIndex';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Modules/Home/Container/homeIndex';
import ProfileScreen from '../Modules/Profile/Container/profileIndex';
import PaymentsScreen from '../Modules/PaymentDetails/Container/paymentDetailsIndex';
import PaymentOptionsScreen from '../Modules/PaymentOptions/Container/paymentOptionsIndex';
import DepositScreen from '../Modules/Deposit/Container/depositIndex';
import CreateIDScreen from '../Modules/CreateID/Container/createIDIndex';
import SignInContainer from '../Modules/Login/Containers/Signin/SignInindex';
import SignUpContainer from '../Modules/Login/Containers/Signin/SignUpContainer';
import PassbookScreen from '../Modules/Passbook/Container/passbookIndex';
import CustomSidebarMenu from '../Modules/SideMenu/Component/sidemenu';
import Splash from '../Modules/Splash/Container/splashIndex';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {DrawerActions} from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInContainer}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitle: 'SignIn',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpContainer}
        options={({navigation}) => ({
          headerStyle: {backgroundColor: '#e39b11'},
          headerTitle: 'SignUp',
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
}

function AppContainer() {
  return (
    <Stack.Navigator initialRouteName="Splash" headerMode="none">
      <Stack.Screen name="Spalsh" component={Splash} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={MyDrawer} />
    </Stack.Navigator>
  );
}

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
        component={IDsScreenPage}
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

export {AppContainer};
