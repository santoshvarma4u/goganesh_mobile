import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FgPuntLogoName from '../../../../Assets/svgs/fgpuntlogoname';
import Colors from '../../../../Theams/Colors';
import VerifyUser from '../../Components/VerifyUser';
import LoginController from '../../Controllers/LoginController';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const VerifyUserContainer = props => {
  const onSubmit = async values => {
    // verify user
    const {phoneNumber} = values;
    // generateUnsignedJwt(phoneNumber);
    const verifyUser = await LoginController.verifyUser(phoneNumber);
    if (verifyUser.status === 'success') {
      props.navigation.navigate('SignIn', {
        phoneNumber,
      });
    } else if (
      verifyUser.status === 'failed' &&
      verifyUser.message === 'User not found'
    ) {
      props.navigation.navigate('SignUp', {
        phoneNumber,
      });
    } else {
      alert('Something went wrong, please try again ');
    }
  };

  const howItWorksClick = () => {
    props.navigation.navigate('HowItWorks');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.appBlackColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../../../../Assets/Images/logo_only.png')}
        resizeMode={'contain'}
        width={screenWidth / 2}
        height={screenHeight / 2}
      />
      <View>
        <VerifyUser onSubmit={onSubmit} howItWorksClick={howItWorksClick} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyUserContainer;
