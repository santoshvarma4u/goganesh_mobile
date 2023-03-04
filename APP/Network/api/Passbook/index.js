import {api} from '../api';
import fetchAllSiteIds from './fetchAllSiteIds';
import fetchAll from './fetchAllUserPayments';

export const transactionsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllTransactions: fetchAll(build),
    fetchAllSiteIds: fetchAllSiteIds(build),
  }),
  overrideExisting: true,
});

export const {useLazyFetchAllTransactionsQuery, useFetchAllSiteIdsQuery} =
  transactionsApi;
