import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import animations from '../../Theams/Animations';
import Colors from '../../Theams/Colors';
import {Typography} from './Text';

const ErrorPage = props => {
  const {
    message = 'Something went wrong. Try again ',
    color = Colors.primary,
    onRetryPress = () => {},
  } = props;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        autoPlay
        loop
        style={{
          height: 250,
          width: '100%',
        }}
        source={animations.error_animation}
      />
      <View>
        <Typography variant="H3">{message}</Typography>
        <Button mode="contained" onPress={onRetryPress}>
          Retry
        </Button>
      </View>
    </View>
  );
};

ErrorPage.propTypes = {
  color: PropTypes.string,
  message: PropTypes.string,
  onRetryPress: PropTypes.func,
};

ErrorPage.defaultProps = {
  // red but shade clor
  color: '#28213b',
  message: 'Something went wrong. Try again ',
  onRetryPress: () => {},
};

export default ErrorPage;
