import NetworkAPI from '../api/server';

const walletEndPoint = '/wallet';

const debitFromWallet = data => {
  return NetworkAPI.apiClient.post(walletEndPoint, data);
};
export default {
  debitFromWallet,
};
