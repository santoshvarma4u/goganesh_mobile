import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import usersApi from '../../../Network/Users/users';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';

const doRegisterUser = async data => {
  try {
    console.log(data);
    const result = await usersApi.createUser(data);
    if (!result.ok) {
      return result;
    }
    console.log('.................................');
    console.log(result.data.data.id);
    Storage.setItemSync(StorageKeys.ID, JSON.stringify(result.data.data.id));
    Storage.setItemSync(StorageKeys.NAME, result.data.data.name);
    Storage.setItemSync(StorageKeys.JWT, result.data.data.token);
    authKey.token = result.data.data.token;
    NetworkAPI.apiClient.setHeader('authorization', authKey.token);

    return result;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};
export default {doRegisterUser};
