import React from 'react';
import {View, RefreshControl, Text, FlatList, StyleSheet} from 'react-native';

function ListViewComponent(props) {
  console.log('123456789876543');
  console.log(props.data);

  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
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
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  trasactions: {
    backgroundColor: 'orange',
  },
  trasactionsCard: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 5,
    padding: 10,
  },
});

export default ListViewComponent;
