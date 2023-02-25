/* eslint-disable react-native/no-inline-styles */
import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Modal, Pressable, ScrollView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  IconButton,
  RadioButton,
  Button,
  Divider,
  Badge,
} from 'react-native-paper';
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
  const [transactions, setTransactions] = useState([]);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [itemFilter, setItemFilter] = useState({
    status: '',
    type: '',
    wallet: '',
  });

  const [fetchAllTransactions, {data, isLoading, isFetching, error}] =
    useLazyFetchAllTransactionsQuery();

  const fetchDetails = async (pageNo, ignoreFilters) => {
    let uid = await getUid();
    const {data: transactionsData} = await fetchAllTransactions({
      page: pageNo,
      query: ignoreFilters
        ? buildQueryParams({})
        : buildQueryParams(itemFilter),
      uid,
    });
    if (transactionsData && transactionsData.details) {
      if (pageNo === 1) {
        // setting the data
        setTransactions(transactionsData.details?.data);
      } else {
        // appending the data
        setTransactions([...transactions, ...transactionsData.details?.data]);
      }
      if (
        // if the current page is the last page
        transactionsData.details.totalPages ===
        transactionsData.details.currentPage
      ) {
        setNoMoreResults(true);
      }
    }
  };

  useEffect(() => {
    fetchDetails(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCurrentResultsAndFetch = ignoreFilters => {
    setTransactions([]);
    setNoMoreResults(false);
    fetchDetails(1, ignoreFilters);
    setFilterVisible(false);
  };

  const onEndReached = () => {
    if (!noMoreResults && !isFetching) {
      if (data && data.details && data.details.currentPage) {
        fetchDetails(data.details.currentPage + 1);
      }
    }
  };

  if (error) {
    return (
      <ErrorPage
        onRetryPress={() => {
          fetchDetails(1);
        }}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.appBlackColor,
      }}>
      {isFetching && <LoadingIndicator color={Colors.appPrimaryColor} />}
      <View>
        <Pressable
          onPress={() => setFilterVisible(true)}
          style={{
            flexDirection: 'row',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Typography>
            <Typography variant="H3" color={Colors.appWhiteColor}>
              Filter
            </Typography>
          </Typography>
          <View>
            <IconButton icon="filter" size={20} color={Colors.appWhiteColor} />
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
        </Pressable>
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
            paddingHorizontal: 20,
            backgroundColor: Colors.appBlackColor,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 20,
            }}>
            <Icon
              name="close"
              size={30}
              color={Colors.appWhiteColor}
              onPress={() => setFilterVisible(false)}
            />
          </View>
          <Typography variant="H2" color={Colors.appWhiteColor}>
            Filter items
          </Typography>
          {Object.keys(FILTERS).map(key => (
            <View
              key={key}
              style={{
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Typography
                  variant="subheader"
                  style={{
                    marginBottom: 10,
                    color: Colors.appWhiteColor,
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
                        color={Colors.appWhiteColor}
                        labelStyle={{
                          color: Colors.appWhiteColor,
                        }}
                        uncheckedColor={Colors.appWhiteColor}
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
              clearCurrentResultsAndFetch();
            }}
            style={{
              marginTop: 30,
            }}
            mode="contained">
            Apply Filters
          </Button>
          <Button
            onPress={() => {
              setItemFilter({
                status: '',
                type: '',
                wallet: '',
              });
              clearCurrentResultsAndFetch(true);
            }}
            style={{
              marginTop: 10,
            }}
            mode="contained">
            Clear Filters
          </Button>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default AllTransactionsContainer;
