import {create} from 'apisauce';
import Storage from '../../../APP/Modules/Common/Storage';
import StorageKeys from '../../../APP/Modules/Common/StorageKeys';

const apiClient = create({
  baseURL: 'http://139.59.11.217:3000/',
  headers: {
    Accept: 'x-www-form-urlencoded',
    authorization: Storage.getItemSync(StorageKeys.JWT),
  },
});

const apiLoginClient = create({
  baseURL: 'http://139.59.11.217:3000/',
  headers: {Accept: 'x-www-form-urlencoded'},
});

const authApiClient = create({
  baseURL: 'https://',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient, apiLoginClient, authApiClient};
