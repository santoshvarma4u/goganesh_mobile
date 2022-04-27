import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

import CrispChat, {
  setUserEmail,
  setUserNickname,
  setUserPhone,
  resetSession,
  pushSessionEvent,
  setTokenId,
} from 'react-native-crisp-chat-sdk';
import {Modal} from 'react-native-paper';
import Animations from '../../../Theams/Animations';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

const ChatContainer = props => {
  // const [modalVisible, setModalVisible] = React.useState(false);
  const [isChatReady, setIsChatReady] = React.useState(false);

  const loadUserDetails = async () => {
    const id = await Storage.getItemSync(StorageKeys.ID);
    const name = await Storage.setItemSync(StorageKeys.NAME);
    const phone = await Storage.setItemSync(StorageKeys.PHONE);

    if (id && name && phone) {
      setTokenId(id);
      setUserEmail(`${id}@fairganesh.com`);
      setUserNickname(id);
      setUserPhone(`${id}123456789`);
      setIsChatReady(true);
      pushSessionEvent('User Details Loaded', 1);
    }
  };

  useEffect(() => {
    loadUserDetails();
    // setModalVisible(true);
    return () => {
      props.navigation.goBack();
    };
  }, []);

  //   // Call session reset when user loggs out
  //   TODO: Move it to logout action
  //   resetSession()

  return isChatReady ? (
    <Modal visible={true}>
      <CrispChat />
    </Modal>
  ) : (
    <LottieView source={Animations.loading_ball} autoPlay loop />
  );
};

export default ChatContainer;
