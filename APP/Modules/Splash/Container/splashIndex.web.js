import {CommonActions} from '@react-navigation/native';
import React, {PureComponent} from 'react';
import {StyleSheet, Linking, Image, Dimensions} from 'react-native';
import {getVersion} from 'react-native-device-info';
import Colors from '../../../Theams/Colors';
import ErrorPage from '../../Common/ErrorPage';
import LinearGradient from '../../Common/LinearGradient';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import SplashApi from '../../Splash/Controller/SplashApi';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class Splash extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      forceUpdate: false,
      forceUpdateMessage: '',
      forceUpdateVersion: '',
      forceUpdateUrl: '',
    };
  }

  componentDidMount = () => {
    this.learnMorePress();
  };

  learnMorePress = async () => {
    // get current app version of the app
    let version = getVersion();
    const {data} = await SplashApi.CheckAppUpdate(version);

    if (data?.status === 'update') {
      this.setState({
        forceUpdate: true,
        forceUpdateMessage: data.message,
        forceUpdateVersion: data?.data?.currentVersion,
        forceUpdateUrl: data?.data?.url,
      });
      return;
    }

    let JWT = await Storage.getItemSync(StorageKeys.JWT);

    if (JWT) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'App'}],
      });
      this.props.navigation.dispatch(resetAction);
    } else {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{name: 'Auth'}],
      });
      this.props.navigation.dispatch(resetAction);
    }
  };

  onUpdate = () => {
    Linking.openURL(this.state.forceUpdateUrl);
  };

  render() {
    const {forceUpdate, forceUpdateMessage} = this.state;

    if (forceUpdate) {
      return (
        <ErrorPage
          message={forceUpdateMessage}
          onRetryPress={this.onUpdate}
          retryMessage="Update Now"
        />
      );
    }

    return (
      <LinearGradient
        colors={[
          Colors.appBlackColor,
          Colors.appBlackColor,
          Colors.appBlackColor,
        ]}
        style={styles.splashContainer}>
        <Image
          source={require('../../../Assets/Images/goganeshlogo.png')}
          resizeMode={'contain'}
          style={{
            width: screenWidth * 0.5,
            height: screenHeight * 0.5,
          }}
        />

        {/*<LottieView*/}
        {/*  style={{height: 250, width: '100%'}}*/}
        {/*  source={Animations.splashLoading}*/}
        {/*  autoPlay*/}
        {/*  speed={1}*/}
        {/*/>*/}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBlackColorLight,
  },
});
