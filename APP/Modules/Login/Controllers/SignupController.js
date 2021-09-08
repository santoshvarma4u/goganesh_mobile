import authKey from '../../../Modules/Common/JWT';
import usersApi from '../../../Network/Users/users';
import NetworkAPI from '../../../Network/api/server';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

const doRegisterUser = async data => {
  try {
    const result = await usersApi.createUser(data);
    if (!result.ok) {
      return result;
    }

    Storage.setItemSync(StorageKeys.ID, JSON.stringify(result.data.data.id));
    Storage.setItemSync(StorageKeys.NAME, result.data.data.name);
    Storage.setItemSync(StorageKeys.JWT, result.data.data.token);
    Storage.setItemSync(StorageKeys.PHONE, data.phone);
    authKey.token = result.data.data.token;
    NetworkAPI.apiClient.setHeader('authorization', authKey.token);

    return result;
  } catch (error) {}
};
export default {doRegisterUser};
