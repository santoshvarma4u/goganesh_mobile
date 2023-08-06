import {api} from '../api';
import getCurrentSessionAndMessages from './getCurrentSessionAndMessages';

export const chatApi = api.injectEndpoints({
  endpoints: build => ({
    fetchUserSession: getCurrentSessionAndMessages(build),
  }),
  overrideExisting: true,
});

export const {useLazyFetchUserSessionQuery} = chatApi;
