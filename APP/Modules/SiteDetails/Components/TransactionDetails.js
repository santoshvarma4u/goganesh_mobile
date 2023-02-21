import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, View} from 'react-native';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import PassbookCard from '../../Passbook/Component/PassbookCard';

const TransactionDetails = ({transactions, navigation}) => {
  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}>
        <Typography color={Colors.appWhiteColor}>
          Transaction History
        </Typography>
        <View
          style={{
            height: 5,
            width: 50,
            margin: 2,
            backgroundColor: Colors.appPrimaryColor,
          }}
        />
      </View>
      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <PassbookCard
            item={item}
            navigation={navigation}
            needAccordion={false}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default TransactionDetails;
