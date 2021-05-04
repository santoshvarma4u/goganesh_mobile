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
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HeaderComponent} from './components/headerComponent';
import {
  HomeStackNavigator,
  OffersStackNavigator,
  PassbookStackNavigator,
  IDsStackNavigator,
  BottomTabNavigator,
} from './navigation/navigation';

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    );
  }
}
