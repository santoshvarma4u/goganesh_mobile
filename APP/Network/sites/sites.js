import NetworkAPI from '../api/server';
import StorageKeys from '../../Modules/Common/StorageKeys';
import Storage from '../../Modules/Common/Storage';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {}
};

const getUserSiteDetails = async () => {
  console.log('inside usersitedetails contriller');
  let uid = await getUID();
  const userSiteDetails = `/userSiteDetails/${uid}`;
  return NetworkAPI.apiClient.get(userSiteDetails);
};

export default {
  getUserSiteDetails,
};
