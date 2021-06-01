import React, {useState, useEffect} from 'react';
import {Text, View, FlatList} from 'react-native';

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
      console.log(data);
    } else {
      console.log('failed');
    }
  }, []);
  return (
    <View style={styles.containerMain}>
      <View />
      <View style={styles.offersContainer}>
        <View style={styles.topOffers}>
          <Text>Transactions</Text>
        </View>
        <View style={styles.container}>
          <FlatList
            onRefresh={() => {
              request();
              setRefresh(false);
            }}
            inverted={true}
            refreshing={refresh}
            data={data}
            renderItem={({item}) => (
              <View styles={styles.trasactions}>
                <View style={styles.trasactionsCard}>
                  <Text style={{backgroundColor: 'grey'}}>
                    {item.paymentMethod}
                  </Text>
                  <Text style={{backgroundColor: 'grey'}}>
                    Amount : {item.paymentAmount}
                  </Text>
                  <Text style={{backgroundColor: 'grey'}}>
                    Type :{item.paymentType}
                  </Text>
                  <Text style={{backgroundColor: 'grey'}}>
                    Type :{item.paymentStatus}
                  </Text>
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
