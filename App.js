import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IDs from './screens/IDs';
import {createStackNavigator} from '@react-navigation/stack';
import OffersScreen from './screens/offersScreen';
import HomeScreen from './screens/homeScree';
import PassbookScreen from './screens/passbookScreen';
import {Icon} from 'react-native-elements';

const Tab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => <Icon name="home" color="black" size={26} />,
            }}
          />
          <Tab.Screen
            name="Offers"
            component={OffersScreen}
            options={{
              tabBarLabel: 'Offers',
              tabBarIcon: () => (
                <Icon name="local-offer" color="black" size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Passbook"
            component={PassbookScreen}
            options={{
              tabBarLabel: 'Passbook',
              tabBarIcon: () => (
                <Icon name="local-offer" color="black" size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="ID's"
            component={IDs}
            options={{
              tabBarLabel: 'IDs',
              tabBarIcon: () => (
                <Icon name="local-offer" color="black" size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
