import {useWhyDidYouUpdate} from 'ahooks';
import React, {useState} from 'react';
import {
  Text,
  ActivityIndicator,
  View,
  Button,
  FlatList,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Colors from '../../../Theams/Colors';
import {Typography} from '../../Common/Text';
import IdController from '../Controller/IdController';
import styles from './Styles';
import AccordionListItem from './accordianListIDs';
import AccordionMyIDs from './accordianListMyIDs';

const MyIDRoute = props => {
  const getMyIDs = IdController.getUserSpecificIDs();
  const getUserBanks = IdController.getBankData();

  const [refresh, setRefresh] = useState(false);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.containerMain}>
      <View style={styles.list}>
        {getMyIDs.error && (
          <>
            <Typography
              style={{alignItems: 'center', color: Colors.appPrimaryColor}}>
              No IDs Found
            </Typography>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.appPrimaryColor,
                paddingHorizontal: 60,
                paddingVertical: 10,
                borderRadius: 10,
                marginTop: 40,
                alignItems: 'center',
              }}
              onPress={() => {
                getMyIDs.request();
              }}
              underlayColor="transparent">
              <Typography style={{color: Colors.appWhiteColor, fontSize: 16}}>
                Retry
              </Typography>
            </TouchableOpacity>
          </>
        )}
        {getMyIDs.loading ? (
          <ActivityIndicator
            animating={getMyIDs.loading}
            size="large"
            color="white"
          />
        ) : null}
        <TextInput />
        <FlatList
          data={getMyIDs.data}
          refreshing={refresh}
          removeClippedSubviews={true}
          keyboardShouldPersistTaps={'always'}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={() => {
            getMyIDs.request();
            getUserBanks.request();
            setRefresh(false);
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 14,
                width: '100%',
              }}
            />
          )}
          renderItem={({item}) => (
            <AccordionMyIDs data={item} bank={getUserBanks} />
          )}
        />
      </View>
    </View>
  );
};

const IDRoute = props => {
  const getIDs = IdController.useGetIDs();

  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  let a = getIDs.data;
  useWhyDidYouUpdate('idroute', {
    ...props,
    a,
  });

  return (
    <View style={styles.containerMain}>
      {/* <View style={styles.searchBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View> */}

      <View style={styles.list}>
        {getIDs.error && (
          <>
            <Typography style={{backgroundColor: 'white'}}> failed </Typography>
            <Button
              title="retry"
              onPress={() => {
                getIDs.request();
              }}
            />
          </>
        )}
        {getIDs.loading ? (
          <ActivityIndicator
            animating={getIDs.loading}
            size="large"
            color="white"
          />
        ) : null}
        <FlatList
          data={getIDs.data}
          onRefresh={() => {
            getIDs.request();
            setRefresh(false);
          }}
          refreshing={refresh}
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
    {key: 'first', title: 'Create ID', color: 'black'},
    {key: 'second', title: 'My IDs'},
  ]);

  const renderScene = SceneMap({
    first: IDRoute,
    second: MyIDRoute,
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.appPrimaryColor}}>
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
