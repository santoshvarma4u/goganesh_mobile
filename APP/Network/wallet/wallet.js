import NetworkAPI from '../api/server';

const walletEndPoint = '/wallet';

const debitFromWallet = data => {
  console.log('====================================');
  console.log('from waller', data);
  console.log('====================================');
  return NetworkAPI.apiClient.post(walletEndPoint, data);
};
export default {
  debitFromWallet,
};
