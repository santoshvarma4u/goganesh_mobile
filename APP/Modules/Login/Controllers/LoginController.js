import OneSignal from 'react-native-onesignal';
import authKey from '../../../Modules/Common/JWT';
import NetworkAPI from '../../../Network/api/server';
import authApi from '../../../Network/auth/auth';
import Storage from '../../Common/Storage';
import StorageKeys from '../../Common/StorageKeys';

const setUserDetails = async (data, phoneNumber, result) => {
  if (data.usertype === 'admin') {
    return result;
  }
  await Storage.setItemSync(StorageKeys.ID, JSON.stringify(data.uid));
  /**
   * One Signal User ID Setup
   */
  let externalUserId = `${data.uid}`; // external user id to the OneSignal SDK
  OneSignal.setExternalUserId(externalUserId);
  //END One Signal User ID Setup
  await Storage.setItemSync(StorageKeys.NAME, data.full_name);
  await Storage.setItemSync(StorageKeys.JWT, data.token);
  await Storage.setItemSync(StorageKeys.PHONE, phoneNumber);
  await Storage.setItemSync(StorageKeys.MEMBER_SINCE, data.creadtedtime);
  authKey.token = data.token;
  authKey.usertype = data.usertype;
  NetworkAPI.apiClient.setHeader('authorization', authKey.token);
};

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
      await setUserDetails(result.data.data, phoneNumber, result);
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

const verifyUser = async phoneNumber => {
  try {
    const result = await authApi.verifyUser(phoneNumber);
    return result.data;
  } catch (error) {}
};

const loginWithOtp = async (session, otp, phone) => {
  try {
    const result = await authApi.loginWithOtp(session, otp, phone);
    await setUserDetails(result.data.data, phone, result);
    return result.data;
  } catch (error) {
    alert('something went wrong');
  }
};

export default {
  checkUser,
  sendOTP,
  verifyOtp,
  updatePassword,
  verifyUser,
  loginWithOtp,
};
