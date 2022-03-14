/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput} from 'react-native-paper';
import Colors from '../../Theams/Colors';

const CommonTextInput = props => {
  return (
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
      style={{
        marginTop: 10,
      }}
      {...props}
    />
  );
};

CommonTextInput.propTypes = {
  ...TextInput.propTypes,
};

export default CommonTextInput;
