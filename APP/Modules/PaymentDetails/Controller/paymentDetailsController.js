import paymentsDetailsApi from '../../../Network/paymentDetails/paymentDetails';
import useAPI from '../../../Hooks/useAPI';
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

  console.log(data);
  const result = await paymentsDetailsApi.createUserBankDetails(data);
  if (!result.ok) return alert(result.problem);
  alert('success');
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

  console.log(data);
  const result = await paymentsDetailsApi.updateUserBankDetails(data);
  if (!result.ok) return alert(result.problem);
  alert('success');
};

const getBankData = () => useAPI(paymentsDetailsApi.getUserBankDetails);

export default {submitBankData, updateBankData, getBankData};
