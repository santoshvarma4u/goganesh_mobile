import React from 'react';
import {StyleSheet, View} from 'react-native';
import Colors from '../../../Theams/Colors';

export const Indicator = ({
  data = [],
  currentIndex = 0,
  activeIndicatorStyle = {},
  inActiveIndicatorStyle = {},
  indicatorContainerStyle = {},
}) => {
  return (
    <View style={[styles.main, indicatorContainerStyle]}>
      {data.map((value, index) => {
        if (index === currentIndex) {
          return (
            <View
              key={index}
              style={[styles.activeIndicatorStyle, activeIndicatorStyle]}
            />
          );
        } else {
          return (
            <View
              key={index}
              style={[styles.inActiveIndicatorStyle, inActiveIndicatorStyle]}
            />
          );
        }
      })}
    </View>
  );
};

const DOT_HEIGHT = 6;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
  },
  activeIndicatorStyle: {
    height: DOT_HEIGHT,
    width: 20,
    borderRadius: 100,
    backgroundColor: Colors.appPrimaryColor,
    margin: 5,
  },
  inActiveIndicatorStyle: {
    height: DOT_HEIGHT,
    width: DOT_HEIGHT,
    borderRadius: 100,
    backgroundColor: Colors.appPrimaryColor + '99',
    margin: 5,
  },
});
