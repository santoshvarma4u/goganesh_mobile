import {apiClient} from '../api/server';
import StorageKeys from '../../Modules/Common/StorageKeys';
import Storage from '../../Modules/Common/Storage';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {}
};

const getUserBankDetails = async () => {
  let uid = await getUID();

  const userBankDetails = `/userBankDetails/${uid}`;
  return apiClient.get(userBankDetails);
};

const createUserBankDetails = async data => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };

  const userBankDetails = '/userBankDetails';
  console.log('=========');
  console.log(data);
  return apiClient.post(userBankDetails, data, headers);
};

const updateUserBankDetails = async data => {
  const uid = data.uid;
  const userBankDetails = `/userBankDetails/${uid}`;

  return apiClient.patch(userBankDetails, data);
};
export default {
  getUserBankDetails,
  createUserBankDetails,
  updateUserBankDetails,
};
