import React from 'react';
import {Icon} from 'react-native-elements';
import OffersScreen from '../screens/offersScreen';
import IDs from '../screens/IDs';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScree';
import PassbookScreen from '../screens/passbookScreen';
import CustomSidebarMenu from '../screens/sidemenu';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
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
        options={{headerShown: false}}
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
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const IDsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IDs" component={IDs} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        drawerContent={props => <CustomSidebarMenu {...props} />}
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
};
