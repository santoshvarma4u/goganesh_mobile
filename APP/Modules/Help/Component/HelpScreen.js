import React, {useEffect} from 'react';
import {View, TouchableOpacity, Image, Linking, StyleSheet} from 'react-native';
import {getUid} from '../../../Network/api/server';
import {useLazyGetSupportNumberQuery} from '../../../Network/api/user';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {getWhatsappMessageUrl} from '../../../Utils';
import ChatScreen from '../../Chat/ChatScreen';
import FGImage from '../../Common/FGImage';
import {Typography} from '../../Common/Text';

function HelpScreen({route}) {
  const [getSupportNumber, {data: supportNumber}] =
    useLazyGetSupportNumberQuery();

  useEffect(() => {
    getUid().then(uid => {
      getSupportNumber({uid});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.flexCenter}>
        <Image
          source={images.concern}
          style={styles.image}
          resizeMode={'contain'}
        />
        <Typography style={styles.title}>Raise your concern</Typography>
        <Typography style={styles.subTitle}> How can we help you </Typography>
        <ChatScreen />
        <TouchableOpacity
          onPress={() => {
            let url = getWhatsappMessageUrl(supportNumber?.data?.phone);
            Linking.openURL(url);
          }}
          style={styles.button}>
          <FGImage style={{height: 20, width: 20}} source={images.whatsapp} />
          <Typography variant="P1"> Whatsapp </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.appBlackColor,
  },
  flexCenter: {flex: 1, alignItems: 'center'},
  image: {
    height: 200,
    width: 200,
    marginTop: 100,
  },
  title: {
    color: Colors.appWhiteColor,
    fontSize: 20,
    marginVertical: 10,
  },
  subTitle: {
    color: Colors.appWhiteColor,
    fontSize: 16,
    marginVertical: 5,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.appPrimaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
    borderRadius: 5,
  },
});

export default HelpScreen;
