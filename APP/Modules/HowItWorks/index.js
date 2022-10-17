/* eslint-disable react-native/no-inline-styles */
import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, Text, View, Modal, FlatList} from 'react-native';
import Animations from '../../Theams/Animations';
import Colors from '../../Theams/Colors';
import {Typography} from '../Common/Text';
import FGVideoPlayer from '../Common/VideoPlayer';

const width = Dimensions.get('window').width;
const height = (9 / 16) * width;

const data = [
  {
    title: 'How to use the app',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    title: 'How to use the app',
    video:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    title: 'How to use the app',
    video:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
];

export const ModalView = ({modalVisible, videoUrl, onBackClick}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        onBackClick();
      }}>
      <FGVideoPlayer
        video={{
          uri: videoUrl,
        }}
        autoPlay={true}
      />
    </Modal>
  );
};

const HowItWorks = ({navigation}) => {
  const [modalVisible, setModalVisible] = React.useState({
    visible: false,
    videoUrl: '',
  });

  return (
    <View
      style={{
        backgroundColor: Colors.appBlackColor,
        flex: 1,
      }}>
      <Text>HowItWorks</Text>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LottieView
          autoPlay
          style={{
            height: 130,
            width: '100%',
          }}
          source={Animations.winning}
        />
      </View>
      {/*
      create a user
    */}
      <View
        style={{
          height: height,
          width: width,
        }}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <Typography
              variant="H3"
              style={{
                color: Colors.appWhiteColor,
                marginTop: 20,
              }}
              onPress={() => {
                setModalVisible({
                  visible: true,
                  videoUrl: item.video,
                  title: item.title,
                });
              }}>
              {item.title}
            </Typography>
          )}
        />
        <ModalView
          videoUrl={modalVisible.videoUrl}
          navigator={navigation}
          onBackClick={() => {
            setModalVisible({
              visible: false,
              videoUrl: '',
              title: '',
            });
          }}
          modalVisible={modalVisible.visible}
          title={modalVisible.title}
        />
      </View>
    </View>
  );
};

export default HowItWorks;
