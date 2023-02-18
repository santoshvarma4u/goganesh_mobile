import {api} from '../api';
import fetchAll from './fetchAllUserPayments.js';

export const transactionsApi = api.injectEndpoints({
  endpoints: build => ({
    fetchAllTransactions: fetchAll(build),
  }),
  overrideExisting: true,
});

export const {useLazyFetchAllTransactionsQuery} = transactionsApi;
