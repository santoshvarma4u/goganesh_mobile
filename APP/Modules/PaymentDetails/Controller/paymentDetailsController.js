import reactotron from 'reactotron-react-native';
import useAPI, {useAPIWithParams} from '../../../Hooks/useAPI';
import Storage from '../../../Modules/Common/Storage';
import StorageKeys from '../../../Modules/Common/StorageKeys';
import paymentsDetailsApi from '../../../Network/paymentDetails/paymentDetails';

const getUID = async () => {
  try {
    let UID = await Storage.getItemSync(StorageKeys.ID);

    return UID;
  } catch (error) {}
};
const submitBankData = async bankData => {
  let userid = await getUID();
  const data = {
    uid: userid,
    bankName: bankData.bankName,
    accountHolderName: bankData.AccountHolderName,
    IFSC: bankData.IFSC,
    accountNumber: bankData.AccountNumber,
    branchCode: bankData.branchCode,
  };
  const result = await paymentsDetailsApi.createUserBankDetails(data);
  if (!result.ok) {
    return alert(result.problem);
  }
  alert('success');
  return result;
};

const updateBankData = async (bankData, currentIndex) => {
  let userid = await getUID();
  const data = {
    uid: userid,
    bid: currentIndex,
    bankName: bankData.bankName,
    accountHolderName: bankData.AccountHolderName,
    IFSC: bankData.IFSC,
    accountNumber: parseInt(bankData.AccountNumber),
    branchCode: bankData.branchCode,
  };

  const result = await paymentsDetailsApi.updateUserBankDetails(data);
  if (!result.ok) {
    return alert(result.problem);
  }
  return result;
};

const getBankData = () => useAPI(paymentsDetailsApi.getUserBankDetails);

const getPendingWithdrawRequestsForUser = () =>
  useAPIWithParams(paymentsDetailsApi.getPendingWithdrawRequestsForUser);

export default {
  submitBankData,
  updateBankData,
  getBankData,
  getPendingWithdrawRequestsForUser,
};
