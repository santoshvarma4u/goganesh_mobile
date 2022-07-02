import reactotron from 'reactotron-react-native';
import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';
import NetworkAPI from '../api/server';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
};

const getUserBankDetails = async () => {
  let uid = await getUID();
  const userBankDetails = `/userBankDetails/${uid}`;
  return NetworkAPI.apiClient.get(userBankDetails);
};

const createUserBankDetails = async data => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };

  const userBankDetails = '/userBankDetails';
  return NetworkAPI.apiClient.post(userBankDetails, data, headers);
};

const updateUserBankDetails = async data => {
  const uid = data.uid;
  const userBankDetails = `/userBankDetails/${uid}`;

  return NetworkAPI.apiClient.patch(userBankDetails, data);
};

const getPendingWithdrawRequestsForUser = async () => {
  let uid = await getUID();
  const pendingWithdrawRequestsForUser = `/payment/getPendingWithdrawRequestsForUser/${uid}`;
  return NetworkAPI.apiClient.get(pendingWithdrawRequestsForUser);
};

const getPendingDepositRequestsForUser = async () => {
  let uid = await getUID();
  const pendingWithdrawRequestsForUser = `/payment/getPendingWithdrawRequestsForUser/${uid}`;
  return NetworkAPI.apiClient.get(pendingWithdrawRequestsForUser);
};

export default {
  getUserBankDetails,
  createUserBankDetails,
  updateUserBankDetails,
  getPendingWithdrawRequestsForUser,
  getPendingDepositRequestsForUser,
};
