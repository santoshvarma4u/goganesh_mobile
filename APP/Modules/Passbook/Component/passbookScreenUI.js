import Moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import ImageModal from 'react-native-image-modal';
import {Modal} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import FGPUNTLOGO from '../../../Assets/svgs/fgpuntlogo';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PassBoookController from '../Controller/passBookController';

import styles from './Styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function PassbookScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [imageModal, showImageModel] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const {
    data,
    success,
    request,
  } = PassBoookController.useGetUserTransasctions();
  useEffect(() => {
    if (success) {
    } else {
    }
  }, []);

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
          <FlatList
            onRefresh={() => {
              request();
              setRefresh(false);
            }}
            inverted={false}
            refreshing={refresh}
            data={data}
            renderItem={({item}) => (
              <View style={styles.trasactionsCard}>
                <View style={{flexDirection: 'column'}}>
                  <FGPUNTLOGO
                    width={60}
                    height={60}
                    fill={Colors.appPrimaryColor}
                  />
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <Typography style={{color: Colors.appWhiteColor}}>
                    {item.paymentType === 'CR'
                      ? item?.sd?.sitename
                        ? 'Deposited into ' + item?.sd?.sitename
                        : 'Deposited into Wallet'
                      : item?.sd?.sitename
                      ? 'Withdrawn from ' + item?.sd?.sitename
                      : 'Withdrawn from Wallet'}
                  </Typography>
                  <Typography style={{color: Colors.appWhiteColor}}>
                    {Moment(item.creadtedtime).format('lll').toString()}
                  </Typography>
                  <Typography
                    variant="H4"
                    style={{color: Colors.appWhiteColor}}>
                    {item.paymentMethod}
                  </Typography>
                  {item?.reason && item.reason.length > 0 && (
                    <Typography
                      variant="H4"
                      style={{color: Colors.appWhiteColor, marginTop: 5}}>
                      Reason: {item?.reason}
                    </Typography>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 'auto',
                    marginRight: 20,
                    alignItems: 'center',
                  }}>
                  <Typography style={{color: Colors.appWhiteColor}}>
                    {item.paymentType === 'CR' ? '+' : '-'} {item.paymentAmount}
                  </Typography>
                  <Typography
                    style={
                      item.paymentStatus === 'Accepted'
                        ? {color: 'green', margin: 5}
                        : {color: 'red', margin: 5}
                    }>
                    {item.paymentStatus}
                  </Typography>
                  {item.paymentReciept.length > 0 && (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          setImageUrl(`${env}${item.paymentReciept}`);
                          reactotron.log(`${env}${item.paymentReciept}`);
                          showImageModel(true);
                        }}>
                        <Typography
                          variant={'h4'}
                          style={{
                            color: Colors.appWhiteColor,
                            textDecorationLine: 'underline',
                          }}>
                          Payment Receipt
                        </Typography>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
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
          source={{
            uri: imageUrl,
          }}
        />
      </Modal>
    </View>
  );
}

export default PassbookScreen;
