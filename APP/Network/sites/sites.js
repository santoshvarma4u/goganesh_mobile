import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';
import NetworkAPI from '../api/server';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
};

const getUserSiteDetails = async () => {
  let uid = await getUID();
  const userSiteDetails = `/userSiteDetails/${uid}`;
  return NetworkAPI.apiClient.get(userSiteDetails);
};

const validateUsername = async (username, id) => {
  const userSiteDetails = '/userSiteDetails/validateUsername';
  return NetworkAPI.apiClient.post(userSiteDetails, {username, id});
};

export default {
  getUserSiteDetails,
  validateUsername,
};
