import ChatWootWidget from '@chatwoot/react-native-widget';
import {Icon} from '@rneui/themed';
import CryptoJS from 'crypto-js';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {getUid} from '../../Network/api/server';
import Colors from '../../Theams/Colors';
import Storage from '../Common/Storage';
import StorageKeys from '../Common/StorageKeys';
import {Typography} from '../Common/Text';

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

const customAttributes = {
  status: 'active',
};

const ChatScreen = () => {
  const [showWidget, toggleWidget] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    const name = await getName();
    const userId = await getUid();
    const phone = await getPhone();
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
    setUserDetails(user);
    customAttributes.userID = userId;
    customAttributes.phone = phone;
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => toggleWidget(true)}>
        <Icon name="chat" size={20} style={{marginRight: 5}} />
        <Typography variant="P1">Chat with us</Typography>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    minHeight: 50,
    backgroundColor: Colors.appPrimaryColor,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    minWidth: 200,
    borderRadius: 5,
  },
});

export default ChatScreen;
