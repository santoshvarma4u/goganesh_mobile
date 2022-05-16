import {create} from 'apisauce';
import DeviceInfo from 'react-native-device-info';
import reactotron from 'reactotron-react-native';
import {logoutAndResetNavigation} from '../../../APP/Navigation/navigation';
import authKey from '../../Modules/Common/JWT';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';

const live = 'http://159.89.171.125:3000/';
const local = 'http://192.168.0.173:3000/';
const prod = 'http://143.244.131.237:3000/';
//cd .. &&  cd home/admin/web/goganesh.bet/public_html/freelanceBackend/
// cd ~/Library/Android/sdk/emulator
// To run a certain AVD directly:
// ./emulator -avd {AVD_NAME}
// To list your AVDs use :
// ./emulator -list-avds

export const env = prod;

let deviceID = null;

const getdeviceId = () => {
  return DeviceInfo.getUniqueId();
};

const getUid = async () => {
  return Storage.getItemSync(StorageKeys.ID);
};

const removeUserDetails = async () => {
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
};

export default NetworkAPI;
