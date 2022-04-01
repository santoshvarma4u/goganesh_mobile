import {create} from 'apisauce';
import authKey from '../../Modules/Common/JWT';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';

const live = 'http://139.59.11.217:3000/';
const local = 'http://192.168.0.100:3000/';
//cd .. &&  cd home/admin/web/goganesh.bet/public_html/freelanceBackend/
// cd ~/Library/Android/sdk/emulator
// To run a certain AVD directly:
// ./emulator -avd {AVD_NAME}
// To list your AVDs use :
// ./emulator -list-avds

export const env = local;

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
