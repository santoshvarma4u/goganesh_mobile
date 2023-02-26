import {Icon} from '@rneui/themed';
import {PhoneNumberUtil} from 'google-libphonenumber';
import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CountryPicker, {
  getCallingCode,
  DARK_THEME,
  CountryModalProvider,
} from 'react-native-country-picker-modal';
import Colors from '../../Theams/Colors';
import CommonTextInput from './CommonTextInput';
import {Typography} from './Text';

const phoneUtil = PhoneNumberUtil.getInstance();

const DEFAULT_HEIGHT = 51;
const BORDER_WIDTH = 1;

export default class PhoneInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: props.defaultCode ? undefined : '91',
      number: props.value
        ? props.value
        : props.defaultValue
        ? props.defaultValue
        : '',
      modalVisible: false,
      countryCode: props.defaultCode ? props.defaultCode : 'IN',
      disabled: props.disabled || false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled !== prevState.disabled) {
      if (
        (nextProps.value || nextProps.value === '') &&
        nextProps.value !== prevState.number
      ) {
        return {disabled: nextProps.disabled, number: nextProps.value};
      }
      return {disabled: nextProps.disabled};
    }
    return null;
  }

  async componentDidMount() {
    const {defaultCode} = this.props;
    if (defaultCode) {
      const code = await getCallingCode(defaultCode);
      this.setState({code});
    }
  }

  getCountryCode = () => {
    return this.state.countryCode;
  };

  getCallingCode = () => {
    return this.state.code;
  };

  isValidNumber = number => {
    try {
      const {countryCode} = this.state;
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  };

  onSelect = country => {
    const {onChangeCountry} = this.props;
    this.setState(
      {
        countryCode: country.cca2,
        code: country.callingCode[0],
      },
      () => {
        const {onChangeFormattedText} = this.props;
        if (onChangeFormattedText) {
          if (country.callingCode[0]) {
            onChangeFormattedText(
              `+${country.callingCode[0]}${this.state.number}`,
            );
          } else {
            onChangeFormattedText(this.state.number);
          }
        }
      },
    );
    if (onChangeCountry) {
      onChangeCountry(country);
    }
  };

  onChangeText = text => {
    this.setState({number: text});
    const {onChangeText, onChangeFormattedText} = this.props;
    if (onChangeText) {
      onChangeText(text);
    }
    if (onChangeFormattedText) {
      const {code} = this.state;
      if (code) {
        onChangeFormattedText(text.length > 0 ? `+${code}${text}` : text);
      } else {
        onChangeFormattedText(text);
      }
    }
  };

  getNumberAfterPossiblyEliminatingZero() {
    let {number, code} = this.state;
    if (number.length > 0 && number.startsWith('0')) {
      number = number.substr(1);
      return {number, formattedNumber: code ? `+${code}${number}` : number};
    } else {
      return {number, formattedNumber: code ? `+${code}${number}` : number};
    }
  }

  renderDropdownImage = () => {
    return (
      <Icon
        name="chevron-down"
        type="material-community"
        size={20}
        color={Colors.appWhiteColor}
      />
    );
  };

  render() {
    const {
      textInputProps,
      autoFocus,
      disableArrowIcon,
      countryPickerProps = {},
      filterProps = {},
    } = this.props;
    const {modalVisible, code, countryCode, number, disabled} = this.state;
    return (
      <CountryModalProvider>
        <View style={styles.main}>
          <Typography color={Colors.appWhiteColor}>Phone Number</Typography>
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.flagButtonView}
              disabled={disabled}
              onPress={() => this.setState({modalVisible: true})}>
              <CountryPicker
                onSelect={this.onSelect}
                withEmoji
                withFilter
                withFlag
                filterProps={filterProps}
                countryCode={countryCode}
                withCallingCode
                disableNativeModal={disabled}
                visible={modalVisible}
                theme={DARK_THEME}
                onClose={() => this.setState({modalVisible: false})}
                {...countryPickerProps}
              />
              <Text style={styles.codeText}>{`+${code}`}</Text>
              {!disableArrowIcon && (
                <React.Fragment>{this.renderDropdownImage()}</React.Fragment>
              )}
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <CommonTextInput
                style={styles.numberText}
                onChangeText={this.onChangeText}
                value={number}
                editable={disabled ? false : true}
                keyboardType="number-pad"
                maxLength={10}
                autoFocus={autoFocus}
                {...textInputProps}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  borderBottomColor: 'transparent',
                  paddingBottom: 0,
                }}
              />
            </View>
          </View>
        </View>
      </CountryModalProvider>
    );
  }
}

export const isValidNumber = (number, countryCode) => {
  try {
    const parsedNumber = phoneUtil.parse(number, countryCode);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (err) {
    return false;
  }
};

const BORER_COLOR = Colors.appWhiteColor + 'aa';
const styles = StyleSheet.create({
  main: {
    marginLeft: 10,
  },
  container: {
    flexDirection: 'row',
    height: DEFAULT_HEIGHT,
    marginTop: 10,
    marginBottom: 30,
  },
  flagButtonView: {
    minWidth: 32,
    flexDirection: 'row',
    borderColor: BORER_COLOR,
    borderWidth: BORDER_WIDTH,
    height: DEFAULT_HEIGHT,
    alignItems: 'center',
    borderBottomStartRadius: 5,
    borderTopStartRadius: 5,
  },
  textContainer: {
    flex: 1,
    borderColor: BORER_COLOR,
    borderWidth: BORDER_WIDTH,
    padding: 0,
    borderBottomEndRadius: 5,
    borderTopEndRadius: 5,
  },
  codeText: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: '700',
    color: BORER_COLOR,
  },
  numberText: {
    color: BORER_COLOR,
    backgroundColor: 'black',
  },
});
