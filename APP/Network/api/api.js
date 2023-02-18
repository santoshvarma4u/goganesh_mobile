import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {logoutAndResetNavigation} from '../../../APP/Navigation/navigation';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';
import {env, getdeviceId, getUid, removeUserDetails} from './server';

const baseQuery = fetchBaseQuery({
  baseUrl: env,
  prepareHeaders: async (headers, {}) => {
    const token = await Storage.getItemSync(StorageKeys.JWT);
    const uid = await getUid();
    if (token) {
      headers.set('authorization', token);
      headers.set('uid', uid);
    }
    headers.set('deviceid', getdeviceId);
    return headers;
  },
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error.originalStatus === 401 || result.error.status === 401)
  ) {
    // here you can deal with 401 error
    // you can redirect to login page or show some message
    await removeUserDetails();
    logoutAndResetNavigation();
    throw new Error('Unauthorized');
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
