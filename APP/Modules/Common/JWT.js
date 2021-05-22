import Storage from '../../../APP/Modules/Common/Storage';
import StorageKeys from '../../../APP/Modules/Common/StorageKeys';

const JWT = {
  token: '',
  getToken: async () => {
    if (JWT.token === '') {
      let jwttoken = await Storage.getItemSync(StorageKeys.JWT);
      JWT.token = jwttoken ? jwttoken : '';
      return JWT.token;
    }
    return JWT.token;
  },
};

export default JWT;
