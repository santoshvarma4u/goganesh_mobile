import {create} from 'apisauce';
import Storage from '../../../APP/Modules/Common/Storage';
import StorageKeys from '../../../APP/Modules/Common/StorageKeys';

const live = 'http://139.59.11.217:3000/';
const local = 'http://192.168.0.106:3000/';

const env = live;

const apiClient = create({
  baseURL: env,
  headers: {
    Accept: 'x-www-form-urlencoded',
    authorization: Storage.getItemSync(StorageKeys.JWT),
  },
});

const apiLoginClient = create({
  baseURL: env,
  headers: {Accept: 'x-www-form-urlencoded'},
});

const authApiClient = create({
  baseURL: 'https://',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient, apiLoginClient, authApiClient,env};
