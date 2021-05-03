import React from 'react';
import {Text, View, FlatList, Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import ListViewComponent from '../components/ListViewComponent';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HeaderComponent from '../components/headerComponent';
const IDRoute = () => <View style={{flex: 1, backgroundColor: 'black'}} />;

const MyIDRoute = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.containerMain}>
      <View>
        <View style={styles.searchBar}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <ScrollView style={styles.list}>
          <FlatList
            data={message}
            keyExtractor={message => {
              message.id.toString();
            }}
            renderItem={({item}) => (
              <ListViewComponent url={item.url} sitename={item.sitename} />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: '100%',
                  height: 1,
                  padding: 5,
                  backgroundColor: 'black',
                }}
              />
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const message = [
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 1,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 2,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 3,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 3,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 3,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 3,
  },
  {
    url: 'www.google.com',
    sitename: 'Google',
    id: 3,
  },
];
function IDs(props) {
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
      <HeaderComponent title="IDs" />
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
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    padding: 15,
    backgroundColor: 'black',
    paddingTop: 20,
  },
  searchBar: {
    padding: 10,
  },
});

export default IDs;
