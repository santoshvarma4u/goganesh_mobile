/* eslint-disable react-native/no-inline-styles */
import {Header, Icon} from '@rneui/themed';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, Text, View, Modal, FlatList, Pressable} from 'react-native';
import Animations from '../../Theams/Animations';
import Colors from '../../Theams/Colors';
import {Typography} from '../Common/Text';
import TypographyStyles from '../Common/Text/Text.styles';
import FGVideoPlayer from '../Common/VideoPlayer';
const width = Dimensions.get('window').width;
const height = (9 / 16) * width;

const data = [
  {
    mainTitle: 'తెలుగు',
  },
  {
    title: 'కొత్త ID ని Create చేయుట',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/CreateIDTelugu.mp4.mp4',
  },
  {
    title: 'IDలో డబ్బు డిపాజిట్ చేయుట',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/DepositTelugu.mp4',
  },
  {
    title: 'ID నుండి బ్యాంకుకు డబ్బును విత్‌డ్రా చేయుట',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/WirthdrawBankTelugu.mp4',
  },
  {
    mainTitle: 'English',
  },
  {
    title: 'How to Create ID',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/CreateIdEnglish.mp4',
  },
  {
    title: 'How to Deposit Money',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/DepositEnglish.mp4',
  },
  {
    title: 'How to Withdraw Money',
    video:
      'https://fgpunt-videos.s3.ap-south-1.amazonaws.com/WithdrawEnglish.mp4',
  },
];

export const ModalView = ({modalVisible, videoUrl, onBackClick, title}) => {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        onBackClick();
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.appBlackColor,
        }}>
        <Header
          centerComponent={{
            text: title,
            style: {...TypographyStyles.H3, color: Colors.appWhiteColor},
          }}
          elevated
          containerStyle={{
            backgroundColor: Colors.appPrimaryColor,
          }}
          leftComponent={
            <Icon
              name="arrow-back"
              size={30}
              color={Colors.appWhiteColor}
              onPress={() => {
                onBackClick();
              }}
            />
          }
          placement="center"
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <FGVideoPlayer
            video={{
              uri: videoUrl,
            }}
            autoPlay={true}
          />
        </View>
      </View>
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
          flex: 1,
          padding: 20,
        }}>
        <FlatList
          data={data}
          renderItem={({item}) =>
            item.mainTitle ? (
              <View
                style={{
                  borderWidth: 1,
                  shadowColor: '#fff',
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 0.53,
                  shadowRadius: 13.97,
                  elevation: 21,
                  backgroundColor: Colors.appBlackColor,
                  padding: 10,
                }}>
                <Typography
                  style={{
                    color: Colors.appWhiteColor,
                  }}>
                  {item.mainTitle}
                </Typography>
              </View>
            ) : (
              <Pressable
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderColor: Colors.appWhiteColor + '30',
                  borderWidth: 0.2,
                }}
                onPress={() => {
                  setModalVisible({
                    visible: true,
                    videoUrl: item.video,
                    title: item.title,
                  });
                }}>
                <Typography
                  variant="H3"
                  style={{
                    color: Colors.appWhiteColor,
                    marginTop: 5,
                  }}>
                  {item.title}
                </Typography>
                <Icon
                  name="play-circle-outline"
                  size={30}
                  color={Colors.appWhiteColor}
                />
              </Pressable>
            )
          }
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
