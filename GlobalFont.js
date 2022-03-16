import wrap from 'lodash.wrap';
import React from 'react';
import {Text, TextInput} from 'react-native';

let _applyed = false;
export default class GlobalFont {
  static applyGlobal(fontFamily) {
    if (_applyed) {
      return;
    }
    Text.render = wrap(Text.render, function (func, ...args) {
      let originText = func.apply(this, args);
      return React.cloneElement(originText, {
        style: [{fontFamily: fontFamily, fontSize: 13}, originText.props.style],
      });
    });
    TextInput.render = wrap(TextInput.render, function (func, ...args) {
      let originTextInput = func.apply(this, args);
      return React.cloneElement(originTextInput, {
        style: [
          {fontFamily: fontFamily, fontSize: 13},
          originTextInput.props.style,
        ],
      });
    });
    _applyed = true;
  }
}
