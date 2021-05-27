import authApi from '../../../Network/auth/auth';
import NetworkAPI from '../../../Network/api/server';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import authKey from '../../../Modules/Common/JWT';
const checkUser = async phoneNumber => {
  try {
    console.log('====================================');
    console.log('check user called');
    console.log('====================================');
    const result = await authApi.loginCheck(phoneNumber);

    if (!result.ok) {
      console.log(result);
      return result;
    }

    // console.log(result.data);
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
      authKey.token = result.data.data.token;
      NetworkAPI.apiClient.setHeader('authorization', authKey.token);
      console.log('authkey from login ceck user', authKey.token);
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const sendOTP = async phoneNumber => {
  try {
    const result = await authApi.sendOtp(phoneNumber);
    if (!result.ok) {
      return alert(result.problem);
    }
    console.log('send otp result');
    console.log(result.data);

    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const verifyOtp = async (otpSession, otp) => {
  try {
    const result = await authApi.verifyOtp(otpSession, otp);
    if (!result.ok) {
      return alert(result.problem);
    }
    console.log('verify otp result');
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default {checkUser, sendOTP, verifyOtp};
