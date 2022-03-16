import React from 'react';
import {Text, View} from 'react-native';

import CrispChat, {
  setUserEmail,
  setUserNickname,
  setUserPhone,
  resetSession,
  setTokenId,
} from 'react-native-crisp-chat-sdk';
import {Modal} from 'react-native-paper';

const ChatContainer = props => {
  // const [modalVisible, setModalVisible] = React.useState(false);
  setTokenId('abcd12345');

  // Set user's info
  setUserEmail('test@test.com');
  setUserNickname('John Smith');
  setUserPhone('+614430231224');

  //   // Call session reset when user loggs out
  //   TODO: Move it to logout action
  //   resetSession()

  return (
    <Modal visible={true}>
      <CrispChat />
    </Modal>
  );
};

export default ChatContainer;
