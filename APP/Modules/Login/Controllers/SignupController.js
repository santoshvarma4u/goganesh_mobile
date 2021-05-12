import reactotron from 'reactotron-react-native';

import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import usersApi from '../../../Network/Users/users';

export const doRegisterUser = (data, callback) => {
  usersApi.createUser(data).then(r => {
    if (r.status === 200 && r.data && r.data.success) {
      Storage.setItemSync(StorageKeys.ID, r.data.id);
      Storage.setItemSync(StorageKeys.NAME, r.data.name);
      Storage.setItemSync(StorageKeys.JWT, r.data.token);
      callback(r.data);
    } else {
      callback(r.data);
      reactotron.log('its error while registering user');
    }
  });
};
