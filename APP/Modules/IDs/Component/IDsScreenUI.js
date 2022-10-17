import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useDispatch, useSelector} from 'react-redux';
import reactotron from 'reactotron-react-native';
import {updateIdState} from '../../../Store/Slices/idStateSlice';
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
                height: 10,
                width: '100%',
              }}
            />
          )}
          renderItem={({item}) => (
            <AccordionMyIDs
              data={item}
              bank={getUserBanks}
              doRefresh={() => {
                getMyIDs.request();
                getUserBanks.request();
                setRefresh(false);
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const IDRoute = props => {
  const getIDs = IdController.useGetIDs();

  const [refresh, setRefresh] = useState(false);

  return (
    <View style={styles.containerMain}>
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
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
                width: '100%',
              }}
            />
          )}
          keyExtractor={item => item.sdid.toString()}
        />
      </View>
    </View>
  );
};

function IDs({navigation, route}) {
  const index = useSelector(state => state.idState.index);
  const dispatch = useDispatch();

  const [routes] = React.useState([
    {key: 'first', title: 'My IDs'},
    {key: 'second', title: 'Create ID', color: 'black'},
  ]);

  const renderScene = SceneMap({
    first: MyIDRoute,
    second: IDRoute,
  });

  return (
    <View style={{flex: 1, backgroundColor: Colors.appPrimaryColor}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={index => {
          dispatch(updateIdState({index}));
        }}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={{
              backgroundColor: Colors.appBlackColor,
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
