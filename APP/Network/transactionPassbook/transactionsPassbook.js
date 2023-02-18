import reactotron from 'reactotron-react-native';
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

const getUserTransactions = async filter => {
  reactotron.log(
    '🚀 ~ file: transactionsPassbook.js:15 ~ getUserTransactions ~ filter',
    filter,
  );
  let uid = await getUID();
  const paymentEndPointOfUser = `/payment/${uid}`;
  return NetworkAPI.apiClient.get(paymentEndPointOfUser);
};
const createDepositPayment = data => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  // const tempApi = NetworkAPI.apiClient;
  // tempApi.setHeader('Content-Type', 'multipart/form-data');
  return NetworkAPI.apiClient.post(paymentEndPoint, data, {headers});
};

const createWithdrawPayment = data => {
  let paymentWithDrawEndPoint = '/payment/withdraw/';

  try {
    return NetworkAPI.apiClient.post(paymentWithDrawEndPoint, data);
  } catch (error) {
    throw new Error(error);
  }
  // return NetworkAPI.apiClient.post(paymentWithDrawEndPoint, data);
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
