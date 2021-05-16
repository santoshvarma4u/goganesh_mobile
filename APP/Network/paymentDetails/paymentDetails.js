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
  const userSiteDetails = `/userBankDetails/${uid}`;
  return apiClient.get(userSiteDetails);
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
export default {
  getUserBankDetails,
  createUserBankDetails,
};
