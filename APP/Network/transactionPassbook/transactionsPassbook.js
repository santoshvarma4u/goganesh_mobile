import {apiClient} from '../api/server';
import StorageKeys from '../../Modules/Common/StorageKeys';
import Storage from '../../Modules/Common/Storage';
const paymentEndPoint = '/payment';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {}
};

const getUserTransactions = async () => {
  let uid = await getUID();
  const paymentEndPointOfUser = `/payment/${uid}`;
  return apiClient.get(paymentEndPointOfUser);
};
const createDepositPayment = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  console.log('-----000;;;00;;0;');
  console.log(data);

  return apiClient.post(paymentEndPoint, data, headers);
};
export default {
  createDepositPayment,
  getUserTransactions,
};
