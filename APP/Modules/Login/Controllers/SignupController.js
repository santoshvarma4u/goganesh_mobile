import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import usersApi from '../../../Network/Users/users';

const doRegisterUser = async data => {
  try {
    console.log(data);
    const result = await usersApi.createUser(data);
    if (!result.ok) return result;
    console.log(result);
    Storage.setItemSync(StorageKeys.ID, result.data.data.id.toString());
    Storage.setItemSync(StorageKeys.NAME, result.data.data.name);
    Storage.setItemSync(StorageKeys.JWT, result.data.data.token);
    return result;
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
};
export default {doRegisterUser};
