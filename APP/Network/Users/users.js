import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';
import NetworkAPI from '../api/server';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
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

const getAllNotifications = async () => {
  let userid = await getUID();
  return NetworkAPI.apiClient.get(`/notification/${userid}`);
};

const resetUserSitePassword = async data => {
  let userid = await getUID();
  return NetworkAPI.apiClient.post(
    `/userSiteDetails/changePassword/${data.id}`,
    {
      ...data,
      uid: userid,
    },
  );
};

export default {
  getUsers,
  createUser,
  getWalletBalance,
  getAllNotifications,
  resetUserSitePassword,
};
