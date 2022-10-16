import reactotron from 'reactotron-react-native';
import useAPI from '../../../Hooks/useAPI';
import Storage from '../../../Modules/Common/Storage';
import StorageKeys from '../../../Modules/Common/StorageKeys';
import IDsApi from '../../../Network/IDs/IDs';
import paymentsDetailsApi from '../../../Network/paymentDetails/paymentDetails';
import siteApi from '../../../Network/sites/sites';
import transactionsApi from '../../../Network/transactionPassbook/transactionsPassbook';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
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
  remarks,
) => {
  let userid = await getUID();

  const data = {
    uid: userid,
    sdid: sdid,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod,
    userBankID: bid,
    paymentType: paymentType,
    remarks: remarks || '',
  };
  const result = await transactionsApi.createWithdrawPayment(data);
  if (!result.ok) {
    return alert(result.problem);
  }
  return;
};

const closeID = async usdid => {
  const data = {
    usdid: usdid,
    siteStatus: false,
  };
  const result = await IDsApi.closeID(usdid, data);
  if (!result.ok) {
    return alert(result.problem);
  }
  return;
};

const sendWalletWithDrawRequest = async (
  paymentMethod,
  paymentAmount,
  paymentType,
  bid,
  remarks,
) => {
  let userid = await getUID();

  const data = {
    uid: userid,
    paymentAmount: paymentAmount,
    paymentMethod: paymentMethod,
    userBankID: bid,
    paymentType: paymentType,
    isWallet: true,
    remarks: remarks || '',
  };
  const result = await transactionsApi.createWalletWithdrawPayment(data);
  if (!result.ok) {
    return alert(result.problem);
  }
  return;
};

export default {
  useGetIDs,
  getUserSpecificIDs,
  getBankData,
  sendWithDrawRequest,
  sendWalletWithDrawRequest,
  closeID,
};
