import {useFocusEffect} from '@react-navigation/native';
import {Icon} from '@rneui/base';
import React, {useEffect, useState} from 'react';
import {Alert, Pressable, RefreshControl, View, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, Badge} from 'react-native-paper';
import {
  useLazyFetchAllTransactionsQuery,
  useFetchAllSiteIdsQuery,
} from '../../../Network/api/Passbook';
import {getUid} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import FGDatePicker from '../../Common/DatePicker';
import Picker from '../../Common/DropDownPicker';
import ErrorPage from '../../Common/ErrorPage';
import {Typography} from '../../Common/Text';
import PassbookCard from './PassbookCard';

const FILTERS = {
  status: ['Accepted', 'Pending', 'Rejected', 'Processing'],
  type: ['Deposit', 'Withdrawal'],
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
    id: '',
    startDate: '',
    endDate: '',
  });
  const [open, setOpen] = useState({
    status: false,
    type: false,
    id: false,
  });

  const [fetchAllTransactions, {data, isLoading, isFetching, error}] =
    useLazyFetchAllTransactionsQuery();

  // fetch Site names
  const {data: siteNames, isLoading: siteNamesLoading} =
    useFetchAllSiteIdsQuery();

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

  useFocusEffect(
    React.useCallback(() => {
      fetchDetails(1, true);
    }, []),
  );

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

  const setOpenItem = (key, value) => {
    setOpen({
      ...open,
      [key]: value,
    });
  };

  const setValue = (key, value) => {
    if (typeof value === 'function') {
      setItemFilter({
        ...itemFilter,
        [key]: value(itemFilter[key]),
      });
      return;
    }
    setItemFilter({
      ...itemFilter,
      [key]: value,
    });
  };

  return (
    <View style={styles.container}>
      {isFetching && <LoadingIndicator color={Colors.appPrimaryColor} />}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Typography variant="H3" color={Colors.appWhiteColor}>
            Transactions
          </Typography>
          <View style={styles.underline} />
        </View>
        <Pressable
          onPress={() => {
            setFilterVisible(!filterVisible);
          }}
          style={styles.filterButton}>
          <Typography>
            <Typography variant="H4" color={Colors.appWhiteColor}>
              {filterVisible ? 'Close' : 'Filter'}
            </Typography>
          </Typography>
          <Icon
            name="filter"
            size={20}
            color={Colors.appWhiteColor}
            type="material-community"
          />
          <Badge
            visible={itemFilter.STATUS || itemFilter.type || itemFilter.id}
            size={10}
            style={styles.badge}
          />
        </Pressable>
      </View>
      {/*
      FILTERS =================================================================================================
      */}
      {filterVisible && (
        <View>
          {/*
          Dates
          */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Typography variant="P2" color={Colors.appWhiteColor}>
                From
              </Typography>
              <FGDatePicker
                date={itemFilter.startDate}
                onDateChange={date => {
                  setItemFilter({
                    ...itemFilter,
                    startDate: date,
                  });
                }}
              />
            </View>
            <View>
              <Typography variant="P2" color={Colors.appWhiteColor}>
                To
              </Typography>
              <FGDatePicker
                date={itemFilter.endDate}
                onDateChange={date => {
                  if (date < itemFilter.startDate) {
                    Alert.alert(
                      'Invalid Date',
                      'End date cannot be less than start date',
                    );
                    return;
                  }
                  setItemFilter({
                    ...itemFilter,
                    endDate: date,
                  });
                }}
              />
            </View>
          </View>
          {/*
          transaction type
        */}
          <View style={styles.filterItemContainer}>
            <Typography variant="P2" color={Colors.appWhiteColor}>
              Transaction Type
            </Typography>
            <Picker
              open={open.type}
              setOpen={value => {
                setOpenItem('type', value);
              }}
              placeholder={'All'}
              value={itemFilter.type}
              setValue={value => {
                setValue('type', value);
              }}
              zIndex={5000}
              zIndexInverse={1000}
              textStyle={{
                color: Colors.appWhiteColor,
              }}
              style={{
                backgroundColor: Colors.appBlackColorLight,
                marginTop: 5,
                borderRadius: 5,
                color: Colors.appWhiteColor,
              }}
              items={[
                ...FILTERS.type.map(key => ({
                  label: key,
                  value: key,
                })),
                {
                  label: 'All',
                  value: '',
                },
              ]}
              theme="DARK"
            />
          </View>
          {/*
          Id's
        */}
          <View style={styles.filterItemContainer}>
            <Typography variant="P2" color={Colors.appWhiteColor}>
              IDs
            </Typography>
            <Picker
              open={open.id}
              setOpen={value => {
                setOpenItem('id', value);
              }}
              zIndex={2000}
              zIndexInverse={2000}
              placeholder={'All'}
              value={itemFilter.id}
              setValue={value => {
                setValue('id', value);
              }}
              textStyle={{
                color: Colors.appWhiteColor,
              }}
              style={{
                backgroundColor: Colors.appBlackColorLight,
                marginTop: 5,
                borderRadius: 5,
                color: Colors.appWhiteColor,
              }}
              loading={siteNamesLoading}
              items={[
                ...siteNames?.details?.data.map(item => ({
                  label: item.sitename,
                  value: item.sdid,
                })),
                {
                  label: 'All',
                  value: '',
                },
              ]}
              theme="DARK"
            />
          </View>
          {/*
          Status
        */}
          <View style={styles.filterItemContainer}>
            <Typography variant="P2" color={Colors.appWhiteColor}>
              Status
            </Typography>
            <Picker
              open={open.status}
              setOpen={value => {
                setOpenItem('status', value);
              }}
              zIndex={1000}
              zIndexInverse={3000}
              placeholder={'All'}
              value={itemFilter.status}
              setValue={value => {
                setValue('status', value);
              }}
              textStyle={{
                color: Colors.appWhiteColor,
              }}
              style={{
                backgroundColor: Colors.appBlackColorLight,
                marginTop: 5,
                borderRadius: 5,
                color: Colors.appWhiteColor,
              }}
              items={[
                ...FILTERS.status.map(key => ({
                  label: key,
                  value: key,
                })),
                {
                  label: 'All',
                  value: '',
                },
              ]}
              theme="DARK"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 10,
            }}>
            <Button
              mode="contained"
              onPress={() => {
                setFilterVisible(false);
              }}
              color={Colors.appBlackColorLight}
              uppercase={false}
              style={{
                width: 120,
              }}>
              Close
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                clearCurrentResultsAndFetch();
              }}
              uppercase={false}
              style={{
                width: 120,
              }}
              color={Colors.appBlackColorLight}>
              Apply
            </Button>
          </View>
        </View>
      )}
      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <PassbookCard item={item} navigation={navigation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => clearCurrentResultsAndFetch(true)}
          />
        }
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        keyExtractor={item => item.id}
        ListFooterComponent={
          <View>
            {isFetching && (
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
                variant="caption"
                color={Colors.appWhiteColor}
                style={{
                  textAlign: 'center',
                }}>
                -- No more results --
              </Typography>
            )}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBlackColor,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.appBlackColorLight,
    height: 30,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  underline: {
    height: 3,
    width: 50,
    backgroundColor: Colors.appPrimaryColor,
    marginTop: 5,
  },
  filterItemContainer: {
    marginTop: 10,
  },
});

export default AllTransactionsContainer;
