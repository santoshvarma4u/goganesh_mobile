import React from 'react';
import {Modal, View} from 'react-native';
import LottieView from '../Modules/Common/Lottie';
import {Typography} from '../Modules/Common/Text';
// Modal to loading indicator

const LoadingIndicator = ({
  isLoading,
  color,
  loadingText = 'Loading...',
  ...props
}) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000AF',
        }}>
        <LottieView
          autoPlay
          loop
          style={{
            height: 250,
            width: '100%',
          }}
          source={require('../Assets/Animations/loadingball.json')}
        />
        <Typography variant="body1" color={color || '#fff'}>
          {loadingText}
        </Typography>
      </View>
    </Modal>
  );
};

export default LoadingIndicator;
