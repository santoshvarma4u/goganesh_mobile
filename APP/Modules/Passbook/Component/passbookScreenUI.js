import Moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import ImageModal from 'react-native-image-modal';
import FGPUNTLOGO from '../../../Assets/svgs/fgpuntlogo';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PassBoookController from '../Controller/passBookController';

import styles from './Styles';
function PassbookScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
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
                  {item.reason && (
                    <Typography
                      variant="H4"
                      style={{color: Colors.appWhiteColor, marginTop: 5}}>
                      Reason: {item.reason}
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
                    <ImageModal
                      resizeMode="contain"
                      imageBackgroundColor="#000000"
                      style={{
                        width: 40,
                        height: 60,
                      }}
                      source={{
                        uri: `${env}${item.paymentReciept}`,
                      }}
                    />
                  )}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default PassbookScreen;
