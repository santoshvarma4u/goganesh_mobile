import React from 'react';
import {View} from 'react-native';
import {useLazyFetchAllSiteTransactionsOfUserQuery} from '../../../Network/api/SiteDetails';
import {getUid} from '../../../Network/api/server';
import Colors from '../../../Theams/Colors';
import LoadingIndicator from '../../../Utils/loadingIndicator';
import ErrorPage from '../../Common/ErrorPage';
import SiteDetails from '../Components/SiteDetails';
import TransactionDetails from '../Components/TransactionDetails';

const SiteDetailsContainer = props => {
  const [fetchSiteTransactions, {data, isLoading, error}] =
    useLazyFetchAllSiteTransactionsOfUserQuery();

  const fetchDetails = async () => {
    const uid = await getUid();
    const sid = props.route.params?.sdid;
    fetchSiteTransactions({
      uid,
      sid: sid,
    });
  };

  React.useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <ErrorPage
        error={error}
        onRetry={() => {
          fetchDetails();
        }}
      />
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.appBlackColor,
        paddingHorizontal: 20,
        padding: 20,
        paddingBottom: 40,
      }}>
      <SiteDetails siteDetails={data?.data?.site} />
      <TransactionDetails
        transactions={data?.data?.payments}
        navigation={props.navigation}
      />
    </View>
  );
};

export default SiteDetailsContainer;
