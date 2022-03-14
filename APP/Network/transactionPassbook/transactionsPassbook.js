import Storage from '../../Modules/Common/Storage';
import StorageKeys from '../../Modules/Common/StorageKeys';
import NetworkAPI from '../api/server';
const paymentEndPoint = '/payment';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
};

const getUserTransactions = async () => {
  let uid = await getUID();
  const paymentEndPointOfUser = `/payment/${uid}`;
  return NetworkAPI.apiClient.get(paymentEndPointOfUser);
};
const createDepositPayment = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return NetworkAPI.apiClient.post(paymentEndPoint, data, headers);
};

const createWithdrawPayment = data => {
  let paymentWithDrawEndPoint = '/payment/withdraw/';

  return NetworkAPI.apiClient.post(paymentWithDrawEndPoint, data);
};

const createWalletWithdrawPayment = data => {
  let paymentWithDrawEndPoint = '/payment/withdraw/';
  return NetworkAPI.apiClient.post(paymentWithDrawEndPoint, data);
};
export default {
  createDepositPayment,
  getUserTransactions,
  createWithdrawPayment,
  createWalletWithdrawPayment,
};
