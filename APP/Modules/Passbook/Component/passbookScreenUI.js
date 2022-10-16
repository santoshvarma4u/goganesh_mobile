import {FlashList} from '@shopify/flash-list';
import Moment from 'moment';
import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Modal} from 'react-native-paper';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PassBookController from '../Controller/passBookController';
import PassbookCard from './PassbookCard';

import styles from './Styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PassbookScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [imageModal, showImageModel] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const {data, request} = PassBookController.useGetUserTransactions();
  return (
    <View style={styles.containerMain}>
      <View />
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Typography color={Colors.appWhiteColor} variant={'subheader'}>
            Transactions
          </Typography>
          <View
            style={{
              borderBottomColor: Colors.appPrimaryColor,
              borderBottomWidth: 3,
              marginTop: 5,
              width: 40,
              marginLeft: 20,
            }}
          />
        </View>
        <View style={styles.container}>
          <FlashList
            onRefresh={() => {
              request();
              setRefresh(false);
            }}
            refreshing={refresh}
            data={data}
            renderItem={({item}) => (
              <PassbookCard item={item} navigation={navigation} />
            )}
          />
        </View>
      </View>
      <Modal
        visible={imageModal}
        dismissable={true}
        onDismiss={() => {
          showImageModel(false);
        }}>
        <Image
          style={{
            marginHorizontal: 20,
            width: screenWidth - 40,
            height: (screenHeight * 3) / 4,
          }}
        />
      </Modal>
    </View>
  );
}

export default PassbookScreen;
