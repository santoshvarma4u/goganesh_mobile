import {api} from '../api';
import fetchAll from './fetchSiteTransactions';

export const transactionsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllSiteTransactionsOfUser: fetchAll(build),
  }),
  overrideExisting: true,
});

export const {useLazyFetchAllSiteTransactionsOfUserQuery} = transactionsApi;
