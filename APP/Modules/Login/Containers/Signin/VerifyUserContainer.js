import React from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FgPuntLogoName from '../../../../Assets/svgs/fgpuntlogoname';
import Colors from '../../../../Theams/Colors';
import VerifyUser from '../../Components/VerifyUser';
import LoginController from '../../Controllers/LoginController';

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.appBlackColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FgPuntLogoName height={150} width={150} color={Colors.appPrimaryColor} />
      <View style={{marginTop: 20}}>
        <VerifyUser onSubmit={onSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyUserContainer;
