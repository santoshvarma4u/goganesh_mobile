import NetworkAPI from '../api/server';

const loginCheck = (phonenumber, password) => {
  return NetworkAPI.apiLoginClient.post('/users/login', {
    phone: phonenumber,
    password: password,
  });
};

const updatePassword = (phonenumber, password) => {
  return NetworkAPI.apiLoginClient.post('/users/updatePasswordByPhone', {
    phone: phonenumber,
    password: password,
  });
};

export const sendOtp = phone => {
  const apiKey = '17dd9445-cbc5-11ec-9c12-0200cd936042';
  let twoFactorApi =
    '2factor.in/API/V1/' + apiKey + '/SMS/' + phone + '/AUTOGEN3';
  return NetworkAPI.authApiClient.post(twoFactorApi, {
    template_name: 'TestTemplate',
  });
};

export const verifyOtp = (session, otp) => {
  const apiKey = '17dd9445-cbc5-11ec-9c12-0200cd936042';
  let twoFactorApi =
    '2factor.in/API/V1/' + apiKey + '/SMS/VERIFY/' + session + '/' + otp;
  return NetworkAPI.authApiClient.post(twoFactorApi, {From: 'FGEXCH'});
};

const verifyUser = phonenumber => {
  return NetworkAPI.apiLoginClient.post('/loginSession/login/checkuser', {
    phone: phonenumber,
  });
};

const loginWithOtp = (session, otp, phone) => {
  return NetworkAPI.apiLoginClient.post('/users/loginWithOtp', {
    session: session,
    otp: otp,
    phone: phone,
  });
};

export default {
  loginCheck,
  sendOtp,
  verifyOtp,
  updatePassword,
  verifyUser,
  loginWithOtp,
};
