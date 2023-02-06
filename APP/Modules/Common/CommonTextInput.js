/* eslint-disable react-native/no-inline-styles */
import {Input} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Colors from '../../Theams/Colors';
import {Typography} from './Text';
import {APP_FONTS} from './Text/Text.styles';

const CommonTextInput = props => {
  const {
    helperText = '',
    error,
    helperTextColor = error ? Colors.appRedColor : Colors.appWhiteColor,
  } = props;

  return (
    <View>
      <Input
        mode="outlined"
        labelStyle={{
          color: Colors.appWhiteColor,
          fontFamily: APP_FONTS.REGULAR,
          fontWeight: 'normal',
        }}
        style={{backgroundColor: Colors.appBlackColor + 'aa'}}
        inputStyle={{
          color: Colors.appWhiteColor,
          fontFamily: APP_FONTS.REGULAR,
        }}
        errorMessage={helperText}
        errorStyle={{
          color: helperTextColor,
        }}
        {...props}
      />
    </View>
  );
};

CommonTextInput.propTypes = {
  ...TextInput.propTypes,
};

export default CommonTextInput;
