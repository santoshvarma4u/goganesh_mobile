import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import authApi from '../../../Network/auth/auth';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
const checkUser = async (phoneNumber, password) => {
  try {
    const result = await authApi.loginCheck(phoneNumber, password);

    if (!result.ok) {
      return result;
    }

    //
    if (result?.data && result.data.message === 'user not found') {
      return result;
    } else {
      if (result.data.data.usertype == 'admin') {
        return result;
      }

      await Storage.setItemSync(
        StorageKeys.ID,
        JSON.stringify(result.data.data.uid),
      );
      await Storage.setItemSync(StorageKeys.NAME, result.data.data.full_name);
      await Storage.setItemSync(StorageKeys.JWT, result.data.data.token);
      await Storage.setItemSync(StorageKeys.PHONE, phoneNumber);
      let fcmtoken = await Storage.getItemSync(StorageKeys.FCMTOKEN);

      authKey.token = result.data.data.token;
      authKey.usertype = result.data.data.usertype;
      NetworkAPI.apiClient.setHeader('authorization', authKey.token);

      return result;
    }
  } catch (error) {}
};

const updatePassword = async (phone, password) => {
  try {
    const result = await authApi.updatePassword(phone, password);
    return result.data;
  } catch (error) {}
};

const sendOTP = async phoneNumber => {
  try {
    const result = await authApi.sendOtp(phoneNumber);
    if (!result.ok) {
      return alert(result.problem);
    }

    return result.data;
  } catch (error) {}
};

const verifyOtp = async (otpSession, otp) => {
  try {
    const result = await authApi.verifyOtp(otpSession, otp);
    if (!result.ok) {
      return alert(result.problem);
    }

    return result.data;
  } catch (error) {}
};

export default {checkUser, sendOTP, verifyOtp, updatePassword};
