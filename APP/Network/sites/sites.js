import NetworkAPI from '../api/server';
import StorageKeys from '../../Modules/Common/StorageKeys';
import Storage from '../../Modules/Common/Storage';

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

export default {
  getUserSiteDetails,
};
