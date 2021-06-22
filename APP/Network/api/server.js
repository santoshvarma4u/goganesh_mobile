import {create} from 'apisauce';
import authKey from '../../Modules/Common/JWT';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';

const live = 'http://139.59.11.217:3000/';
const local = 'http://192.168.29.221:3000/';

export const env = local;

console.log('hiiiiiiiiiiiiiiii');

const NetworkAPI = {
  apiClient: create({
    baseURL: env,
    headers: {
      Accept: 'x-www-form-urlencoded',
      authorization: authKey.token,
    },
  }),

  apiLoginClient: create({
    baseURL: env,
    headers: {Accept: 'x-www-form-urlencoded'},
  }),

  authApiClient: create({
    baseURL: 'https://',
    headers: {Accept: 'application/vnd.github.v3+json'},
  }),
};

export default NetworkAPI;
