import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import {env} from '../../../Network/api/server';
import Moment from 'moment';
import PassBoookController from '../Controller/passBookController';

import styles from './Styles';
import Colors from '../../../Theams/Colors';
import images from '../../../Theams/Images';
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
          <Text
            style={{
              color: '#d5d1d1',
              marginLeft: 20,
              marginTop: 8,
              fontSize: 16,
            }}>
            Transactions
          </Text>
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
              <View styles={styles.trasactions}>
                <View style={styles.trasactionsCard}>
                  <View style={{flexDirection: 'column'}}>
                    <Image
                      style={{height: 60, width: 60}}
                      source={images.logo}
                    />
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color: Colors.appWhiteColor}}>
                      {item.paymentType === 'CR' && item?.sd?.sitename
                        ? 'Deposited into ' + item?.sd?.sitename
                        : 'Deposited into Wallet'}
                    </Text>
                    <Text style={{color: Colors.appWhiteColor}}>
                      {Moment(item.creadtedtime).format('lll').toString()}
                    </Text>
                    <Text style={{color: Colors.appWhiteColor}}>
                      {item.paymentMethod}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginLeft: 'auto',
                      marginRight: 20,
                      alignItems: 'center',
                    }}>
                    <Text style={{color: Colors.appWhiteColor}}>
                      {item.paymentType === 'CR' ? '+' : '-'}{' '}
                      {item.paymentAmount}
                    </Text>
                    <Text
                      style={[
                        item.paymentStatus === 'Accepted'
                          ? {color: 'green'}
                          : {color: 'red'},
                      ]}>
                      {item.paymentStatus}
                    </Text>
                    {item.paymentReciept.length > 0 && (
                      <TouchableOpacity
                        style={{
                          padding: 2,
                          marginTop: 10,
                          alignItems: 'center',
                          backgroundColor: Colors.appPrimaryColor,
                          justifyContent: 'center',
                          borderRadius: 5,
                        }}
                        onPress={() => {
                          setPaymentReciept(`${env}${item.paymentReciept}`);
                          setVisible(!visible);
                        }}>
                        <Text style={{color: Colors.appBlackColor}}>
                          Reference
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
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
                  <View style={{marginTop: 20}}>
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
