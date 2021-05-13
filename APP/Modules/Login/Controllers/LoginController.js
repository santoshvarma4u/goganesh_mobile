import authApi from '../../../Network/auth/auth';

const checkUser = async phoneNumber => {
  try {
    const result = await authApi.loginCheck(phoneNumber);
    if (!result.ok) return result;

    return result;
  } catch (error) {
    console.log(error);
  }
};

const sendOTP = async phoneNumber => {
  try {
    const result = await authApi.sendOtp(phoneNumber);
    if (!result.ok) return alert(result.problem);
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
    if (!result.ok) return alert(result.problem);
    console.log('verify otp result');
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default {checkUser, sendOTP, verifyOtp};
