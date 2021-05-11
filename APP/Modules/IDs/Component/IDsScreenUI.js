import React, {useState, useEffect} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Button,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import styles from './Styles';
import {Searchbar} from 'react-native-paper';
import AccordionListItem from './accordianListNew';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import IdController from '../Controller/IdController';

const MyIDRoute = () => <View style={{flex: 1, backgroundColor: 'black'}} />;

const IDRoute = props => {
  const getIDs = IdController.useGetIDs();

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.containerMain}>
      <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>

      <View style={styles.list}>
        {getIDs.error && (
          <>
            <Text style={{backgroundColor: 'white'}}> failed </Text>
            <Button
              title="retry"
              onPress={() => {
                getIDs.request();
              }}></Button>
          </>
        )}
        <ActivityIndicator
          animating={getIDs.loading}
          size="large"
          color="white"
        />
        <FlatList
          data={getIDs.data}
          renderItem={({item}) => <AccordionListItem data={item} />}
          keyExtractor={item => item.sdid.toString()}
        />
      </View>
    </View>
  );
};

function IDs({navigation}) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Create IDs', color: 'black'},
    {key: 'second', title: 'My IDs'},
  ]);

  const renderScene = SceneMap({
    first: IDRoute,
    second: MyIDRoute,
  });

  return (
    <View style={{flex: 1, backgroundColor: '#e39b11'}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{
              backgroundColor: 'black',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
            }}
          />
        )}
      />
    </View>
  );
}

export default IDs;
