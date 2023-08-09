import ChatWootWidget from '@chatwoot/react-native-widget';
import {BottomSheet, Image} from '@rneui/base';
import {Icon} from '@rneui/themed';
import CryptoJS from 'crypto-js';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {getUid} from '../../Network/api/server';
import Colors from '../../Theams/Colors';
import images from '../../Theams/Images';
import metrics from '../../Theams/Metrics';
import Storage from '../Common/Storage';
import StorageKeys from '../Common/StorageKeys';
import {Typography} from '../Common/Text';
import getDeviceData from './getDeviceData';

const IDENTIFIER_HASHING_SECRET = 'APN8VLPVwtJrdULSWLQd33UR'; // to verify the user from mobile app
const websiteToken = 'PW4z9rd2LFNA5rHqBs5meU3E'; // chatwoot website token
const baseUrl = 'https://app.chatwoot.com'; // chatwoot base url
const locale = 'en';

const getName = async () => {
  try {
    return await Storage.getItemSync(StorageKeys.NAME);
  } catch (error) {}
};

const getPhone = async () => {
  try {
    return await Storage.getItemSync(StorageKeys.PHONE);
  } catch (error) {}
};

const getChatOnboardingStatus = async () => {
  try {
    const status = await Storage.getItemSync(
      StorageKeys.CHAT_ONBOARDING_STATUS,
    );
    return status;
  } catch (error) {}
};

const customAttributes = {
  status: 'active',
};

const ChatScreen = ({wallet = 0}) => {
  const [showWidget, toggleWidget] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const getUserDetails = async () => {
    const name = (await getName()) ?? 'Unknown User';
    const loggedUser = name !== 'Unknown User';
    const userId = (await getUid()) ?? '0000';
    const phone = loggedUser ? (await getPhone()) ?? '0000' : '0000';
    const identifier = name + '-' + phone + '-' + userId + '@fgpunt.com';
    // hmac sha256 hash of identifier with secret to verify the user from mobile app
    const identifierHash = CryptoJS.HmacSHA256(
      identifier,
      IDENTIFIER_HASHING_SECRET,
    ).toString(CryptoJS.enc.Hex);
    const user = {
      identifier,
      name: name + '-' + userId,
      avatar_url: '',
      email: identifier,
      identifier_hash: identifierHash,
    };
    setUserDetails(name !== 'Unknown User' ? user : {});
    customAttributes.userID = userId;
    customAttributes.phone = phone;
    customAttributes.walletBalance = wallet;
    const deviceDetails = await getDeviceData();
    customAttributes.deviceDetails = deviceDetails;
    const isOnboarding = await getChatOnboardingStatus();
    if (!isOnboarding && loggedUser) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onBoarded = async () => {
    setIsVisible(false);
    await Storage.setItemSync(StorageKeys.CHAT_ONBOARDING_STATUS, 'true');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleWidget(true)}>
        <Icon name="chat" size={20} style={{marginRight: 5}} />
        <Typography variant="P1" color={Colors.appBlackColor}>
          Chat with us
        </Typography>
      </TouchableOpacity>
      {userDetails && (
        <ChatWootWidget
          websiteToken={websiteToken}
          locale={locale}
          baseUrl={baseUrl}
          closeModal={() => toggleWidget(false)}
          isModalVisible={showWidget}
          user={userDetails}
          customAttributes={customAttributes}
          colorScheme="dark"
        />
      )}
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.8)'}}
        onBackButtonPress={() => setIsVisible(false)}>
        <View style={styles.bottomSheet}>
          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 100,
            }}>
            <Icon name="close" size={25} onPress={() => onBoarded()} />
          </View>
          <Typography variant="H2">
            Introducing the live chat feature, Our support team is just a
            message away!
          </Typography>
          <Image
            source={images.arrowMsg}
            style={{height: 100, width: metrics.screenWidth - 40}}
            resizeMode={'contain'}
          />
          <Typography variant="P1">
            Click on the "Chat with us" button in the app
          </Typography>
          <View style={styles.button}>
            <Icon name="chat" size={20} style={{marginRight: 5}} />
            <Typography variant="P1">Chat with us</Typography>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    minHeight: 40,
    backgroundColor: Colors.appPrimaryColor,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    minWidth: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  bottomSheet: {
    backgroundColor: Colors.appWhiteColor,
    padding: 20,
    borderRadius: 10,
  },
});

const mapStateToProps = state => {
  return {
    wallet: state.home.walletBalance,
    userBanks: state.userdetails.userBanks,
  };
};

export default connect(mapStateToProps)(ChatScreen);
