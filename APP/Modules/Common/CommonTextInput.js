/* eslint-disable react-native/no-inline-styles */
import {Input} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import Colors from '../../Theams/Colors';
import {APP_FONTS} from './Text/Text.styles';

const CommonTextInput = props => {
  const {
    helperText = '',
    error,
    helperTextColor = error ? Colors.appRedColor : Colors.appWhiteColor,
  } = props;

  return (
    <View style={props.style}>
      <Input
        labelStyle={{
          color: Colors.appWhiteColor,
          fontFamily: APP_FONTS.REGULAR,
          fontWeight: 'normal',
          fontSize: 14,
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
  ...Input.propTypes,
};

export default CommonTextInput;
