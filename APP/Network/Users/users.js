import NetworkAPI from '../api/server';

import StorageKeys from '../../Modules/Common/StorageKeys';
import Storage from '../../Modules/Common/Storage';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {
    console.log(error);
  }
};
const usersEndPoint = '/users';

const getUsers = () => NetworkAPI.apiClient.get(usersEndPoint);
const createUser = data => {
  return NetworkAPI.apiLoginClient.post(usersEndPoint, data);
};
const getWalletBalance = async () => {
  let userid = await getUID();
  return NetworkAPI.apiClient.get(`/users/balance/${userid}`);
};

export default {
  getUsers,
  createUser,
  getWalletBalance,
};
