import React from 'react';
import {Text, View, FlatList, Dimensions, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Searchbar} from 'react-native-paper';
import ListViewComponent from '../components/ListViewComponent';
import AccordionView from '../components/accordionList';
import AccordionListItem from '../components/accordianListNew';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import HeaderComponent from '../components/headerComponent';
const IDRoute = () => <View style={{flex: 1, backgroundColor: 'black'}} />;

const DATA = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

const MyIDRoute = props => {
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

        <View style={styles.list}>
          <FlatList
            style={{padding: 10}}
            data={DATA}
            renderItem={() => <AccordionListItem />}
            keyExtractor={item => item.id}
          />
        </View>
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
  list: {
    padding: 10,
  },
});

export default IDs;
