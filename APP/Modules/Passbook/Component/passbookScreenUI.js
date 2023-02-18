/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  IconButton,
  RadioButton,
  Button,
  Divider,
  Badge,
} from 'react-native-paper';
import reactotron from 'reactotron-react-native';
import {useLazyFetchAllTransactionsQuery} from '../../../Network/api/Passbook';
import {getUid} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import ErrorPage from '../../Common/ErrorPage';
import {Typography} from '../../Common/Text';
import PassbookCard from './PassbookCard';

const FILTERS = {
  status: ['Accepted', 'Pending', 'Rejected', 'Processing'],
  type: ['Deposit', 'Withdrawal'],
  wallet: ['Yes', 'No'],
};

const NAME_MAP = {
  status: 'Status of Transaction',
  type: 'Type of Transaction',
  wallet: 'Wallet',
};

const buildQueryParams = filterObject => {
  let params = [];
  Object.keys(filterObject).forEach(key => {
    if (filterObject[key]) {
      params.push(`${key}=${filterObject[key]}`);
    }
  });
  return params.join('&');
};

const AllTransactionsContainer = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [itemFilter, setItemFilter] = useState({
    status: '',
    type: '',
    wallet: '',
    search: '',
  });

  const [fetchAllTransactions, {data, isLoading, isFetching, error}] =
    useLazyFetchAllTransactionsQuery();
  reactotron.log(
    '🚀 ~ file: passbookScreenUI.js:57 ~ AllTransactionsContainer ~ data',
    data,
    isLoading,
    isFetching,
    error,
  );

  const fetchDetails = async pageNo => {
    let uid = await getUid();
    fetchAllTransactions({
      page: pageNo,
      query: buildQueryParams(itemFilter),
      uid,
    });
  };

  useEffect(() => {
    if (data?.details?.data?.length) {
      setTransactions([...transactions, ...data.details.data]);
    } else if (page > 1) {
      setNoMoreResults(true);
    }
    if (page === 1 && !data?.details?.data?.length) {
      fetchDetails(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.details?.data]);

  const onEndReached = () => {
    if (!noMoreResults && !isFetching) {
      fetchDetails(page + 1);
      setPage(page + 1);
    }
  };

  if (error) {
    return (
      <ErrorPage
        onRetryPress={() => {
          fetchDetails(1);
          setPage(1);
        }}
      />
    );
  }

  return (
    <>
      {isFetching && <LoadingIndicator color={Colors.appPrimaryColor} />}
      <View>
        <View style={{flexDirection: 'row', padding: 5}}>
          <View>
            <IconButton
              icon="filter"
              onPress={() => setFilterVisible(true)}
              size={30}
            />
            <Badge
              visible={
                itemFilter.STATUS || itemFilter.type || itemFilter.wallet
              }
              size={14}
              style={{
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            />
          </View>
        </View>
        <FlatList
          data={transactions}
          renderItem={({item}) => (
            <PassbookCard item={item} navigation={navigation} />
          )}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <>
              {isLoading && (
                <View>
                  <ActivityIndicator color={Colors.primary} />
                  <Typography
                    style={{
                      marginTop: 10,
                      textAlign: 'center',
                    }}>
                    Fetching more results...
                  </Typography>
                </View>
              )}
              {noMoreResults && (
                <Typography
                  variant="title"
                  style={{
                    textAlign: 'center',
                  }}>
                  No more results
                </Typography>
              )}
            </>
          }
        />
      </View>
      <Modal
        visible={filterVisible}
        onRequestClose={() => setFilterVisible(false)}
        animationType="slide">
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            marginHorizontal: 20,
            marginTop: 34,
          }}>
          <Typography variant="H3">Filter items </Typography>
          {Object.keys(FILTERS).map(key => (
            <View key={key}>
              <View>
                <Typography
                  variant="subheader"
                  style={{
                    marginBottom: 10,
                    color: Colors.primary,
                  }}>
                  {NAME_MAP[key]}
                </Typography>
                {
                  <Button
                    compact
                    key={key}
                    uppercase={false}
                    mode={'text'}
                    color="blue"
                    onPress={() => {
                      setItemFilter({
                        ...itemFilter,
                        [key]: '',
                      });
                    }}>
                    Clear
                  </Button>
                }
              </View>
              <RadioButton.Group
                onValueChange={value =>
                  setItemFilter({...itemFilter, [key]: value})
                }
                value={itemFilter[key]}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {FILTERS[key].map(item => (
                    <View>
                      <RadioButton.Item
                        label={item}
                        value={item}
                        position="leading"
                      />
                    </View>
                  ))}
                </View>
              </RadioButton.Group>
              <Divider />
            </View>
          ))}
          <Button
            onPress={() => {
              setTransactions([]);
              setPage(1);
              fetchDetails(1);
              setFilterVisible(false);
            }}
            mode="contained">
            Apply Filters
          </Button>
          <Button
            onPress={() => {
              setFilterVisible(false);
              fetchDetails(1, 5);
              setItemFilter({
                status: '',
                type: '',
                wallet: '',
              });
            }}
            mode="contained">
            Clear Filters
          </Button>
        </ScrollView>
      </Modal>
    </>
  );
};

export default AllTransactionsContainer;
