import {api} from '../api';
import getSupportNumber from './getSupportNumber';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    getSupportNumber: getSupportNumber(build),
  }),
  overrideExisting: true,
});

export const {useLazyGetSupportNumberQuery, useGetSupportNumberQuery} = userApi;
