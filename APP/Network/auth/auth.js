import NetworkAPI from '../api/server';

const loginCheck = phonenumber =>
  NetworkAPI.apiLoginClient.post('/users/login', {phone: phonenumber});

export const sendOtp = phone => {
  const apiKey = 'efaf38a4-6742-11ea-9fa5-0200cd936042';
  let twoFactorApi =
    '2factor.in/API/V1/' + apiKey + '/SMS/' + phone + '/AUTOGEN3';
  return NetworkAPI.authApiClient.post(twoFactorApi, {
    template_name: 'TestTemplate',
  });
};

export const verifyOtp = (session, otp) => {
  const apiKey = 'efaf38a4-6742-11ea-9fa5-0200cd936042';
  let twoFactorApi =
    '2factor.in/API/V1/' + apiKey + '/SMS/VERIFY/' + session + '/' + otp;
  return NetworkAPI.authApiClient.post(twoFactorApi, {From: 'GARNIS'});
};

export default {loginCheck, sendOtp, verifyOtp};
