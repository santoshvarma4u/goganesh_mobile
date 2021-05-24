import authApi from '../../../Network/auth/auth';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';
import authKey from '../../../Modules/Common/JWT';
const checkUser = async phoneNumber => {
  try {
    const result = await authApi.loginCheck(phoneNumber);

    if (!result.ok) {
      return result;
    }

    if (result?.data?.details) {
      Storage.setItemSync(
        StorageKeys.ID,
        JSON.stringify(result.data.details.data.uid),
      );
      Storage.setItemSync(StorageKeys.NAME, result.data.details.data.full_name);
      Storage.setItemSync(StorageKeys.JWT, result.data.details.data.token);
      authKey.token = result.data.details.data.token;
    }

    return result;
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
