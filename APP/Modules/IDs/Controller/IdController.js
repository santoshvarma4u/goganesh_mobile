import IDsApi from '../../../Network/IDs/IDs';
import siteApi from '../../../Network/sites/sites';
import useAPI from '../../../Hooks/useAPI';
import transactionsApi from '../../../Network/transactionPassbook/transactionsPassbook';
import paymentsDetailsApi from '../../../Network/paymentDetails/paymentDetails';

import StorageKeys from '../../../Modules/Common/StorageKeys';
import Storage from '../../../Modules/Common/Storage';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);
    console.log('userid' + UID);
    return UID;
  } catch (error) {
    console.log(error);
  }
};

const useGetIDs = () => useAPI(IDsApi.getIDs);
const getUserSpecificIDs = () => useAPI(siteApi.getUserSiteDetails);
const getBankData = () => useAPI(paymentsDetailsApi.getUserBankDetails);
const sendWithDrawRequest = async (
  sdid,
  paymentMethod,
  paymentAmount,
  paymentType,
  bid,
) => {
  let userid = await getUID();

  const data = {
    uid: userid,
    sdid: sdid,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod,
    userBankID: bid,
    paymentType: paymentType,
  };
  const result = await transactionsApi.createWithdrawPayment(data);
  if (!result.ok) return alert(result.problem);
  return;
};

const sendWalletWithDrawRequest = async (
  sdid,
  paymentMethod,
  paymentAmount,
  paymentType,
  bid,
) => {
  let userid = await getUID();

  const data = {
    uid: userid,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod,
    userBankID: bid,
    paymentType: paymentType,
    isWallet: true,
  };
  const result = await transactionsApi.createWalletWithdrawPayment(data);
  if (!result.ok) return alert(result.problem);
  return;
};

export default {
  useGetIDs,
  getUserSpecificIDs,
  getBankData,
  sendWithDrawRequest,
  sendWalletWithDrawRequest,
};
