/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import {Caption, TextInput} from 'react-native-paper';
import Colors from '../../Theams/Colors';

const CommonTextInput = props => {
  const {
    helperText = '',
    error,
    helperTextColor = error ? Colors.appRedColor : Colors.appWhiteColor,
  } = props;

  return (
    <View>
      <TextInput
        mode="outlined"
        theme={{
          colors: {
            primary: Colors.appPrimaryColor,
            background: Colors.appBlackColorLight,
            placeholder: Colors.appWhiteColor,
            text: Colors.appWhiteColor,
          },
        }}
        {...props}
      />
      <Caption style={{color: helperTextColor}}>{helperText}</Caption>
    </View>
  );
};

CommonTextInput.propTypes = {
  ...TextInput.propTypes,
};

export default CommonTextInput;
