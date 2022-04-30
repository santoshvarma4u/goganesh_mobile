import Moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {env} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
import {Typography} from '../../Common/Text';
import PassBoookController from '../Controller/passBookController';

import styles from './Styles';
function PassbookScreen({navigation}) {
  const [refresh, setRefresh] = useState(false);
  const [paymentReciept, setPaymentReciept] = useState('');
  const [visible, setVisible] = useState(false);
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
                  <Image style={{height: 60, width: 60}} source={images.logo} />
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
                        ? {color: 'green'}
                        : {color: 'red'}
                    }>
                    {item.paymentStatus}
                  </Typography>
                  {item.paymentReciept.length > 0 && (
                    <TouchableOpacity
                      style={{
                        padding: 2,
                        marginTop: 10,
                        alignItems: 'center',
                        backgroundColor: Colors.appPrimaryColor,
                        justifyContent: 'center',
                        borderRadius: 5,
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setPaymentReciept(`${env}${item.paymentReciept}`);
                        setVisible(!visible);
                      }}>
                      <Icon name="image" />
                      <Typography style={{color: Colors.appBlackColor}}>
                        Reference
                      </Typography>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      marginTop: 20,
                    }}>
                    <Image
                      source={{uri: paymentReciept}}
                      style={{padding: 5, width: 150, height: 200}}
                    />
                    <Button
                      title="Close"
                      onPress={() => setVisible(!visible)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PassbookScreen;
