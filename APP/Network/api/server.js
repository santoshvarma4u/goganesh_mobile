import {create} from 'apisauce';
import DeviceInfo from 'react-native-device-info';
import {logoutAndResetNavigation} from '../../../APP/Navigation/navigation';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';

export const dev = 'http://159.89.171.125:3000/';
export const local = 'http://192.168.0.101:3000';
export const prod = 'https://api.t20punt.com/';
//cd .. &&  cd home/admin/web/goganesh.bet/public_html/freelanceBackend/
// cd ~/Library/Android/sdk/emulator
// To run a certain AVD directly:
// ./emulator -avd {AVD_NAME}
// To list your AVDs use :
// ./emulator -list-avds

export const env = prod;

let deviceID = null;

export const getdeviceId = () => {
  return DeviceInfo.getUniqueId();
};

export const getUid = async () => {
  return Storage.getItemSync(StorageKeys.ID);
};

export const removeUserDetails = async () => {
  await Storage.removeItemSync(StorageKeys.JWT);
  await Storage.removeItemSync(StorageKeys.ID);
  await Storage.removeItemSync(StorageKeys.NAME);
  await Storage.removeItemSync(StorageKeys.FCMTOKEN);
};

const createAPI = () => {
  const api = create({
    baseURL: env,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    timeout: 10000,
  });

  api.addAsyncRequestTransform(request => async () => {
    request.headers.deviceid = deviceID || getdeviceId();
    request.headers.uid = await getUid();
    request.headers.authorization = await Storage.getItemSync(StorageKeys.JWT);
  });

  api.addAsyncResponseTransform(response => async () => {
    if (response.status === 401) {
      // Check and Logout User from here
      await removeUserDetails();
      logoutAndResetNavigation();
      throw new Error('Unauthorized');
    }
    return response;
  });

  return api;
};

const NetworkAPI = {
  apiClient: createAPI(),
  apiLoginClient: create({
    baseURL: env,
    headers: {Accept: 'x-www-form-urlencoded', deviceid: getdeviceId()},
  }),

  authApiClient: create({
    baseURL: 'https://',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      deviceid: getdeviceId(),
    },
  }),

  paymentGatewayClient: create({
    baseURL: 'https://api.ekqr.in/api/',
    headers: {
      'Content-Type': 'application/json',
    },
  }),
};

export default NetworkAPI;
