import react from 'react';
import useAPI from '../../../Hooks/useAPI';
import IDsApi from '../../../Network/IDs/IDs';
import payeeApi from '../../../Network/payee/payeeApi';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';
import walletApi from '../../../Network/wallet/wallet';
const submitData = async (
  uid,
  sdid,
  planType,
  paymentType,
  requestStatus,
  payreciept,
  userName,
  depositCoins,
  payementID,
  setImageUpLoadProgress,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('requestStatus', requestStatus);
  data.append('pymid', payementID);

  if (payreciept !== null) {
    data.append('payreciept', {
      uri: payreciept.uri,
      type: payreciept.type,
      name: payreciept.fileName,
    });
  }
  data.append('planType', planType);
  data.append('userName', userName);
  data.append('depositCoins', depositCoins);

  const result = await IDsApi.createID(data, setImageUpLoadProgress);
  if (!result.ok) {
    return alert(result.problem);
  }
  return result;
};

const submitIntialDeposit = async (
  uid,
  sdid,
  paymentMethod,
  paymentAmount,
  paymentType,
  paymentreciept,
  remarks,
  setImageUpLoadProgress,
  referenceId,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  data.append('referenceId', referenceId);
  data.append('remarks', remarks || '');
  if (paymentreciept !== null) {
    data.append('depositpayreciept', {
      uri: paymentreciept.uri,
      type: paymentreciept.type,
      name: paymentreciept.fileName,
    });
  }

  data.append('paymentAmount', paymentAmount);

  const result = await paymentDepositApi.createDepositPayment(
    data,
    setImageUpLoadProgress,
  );
  if (!result.ok) {
    return alert(result.problem);
  }
  return result;
};

const depositIntoWallet = async (
  uid,
  paymentMethod,
  paymentAmount,
  paymentType,
  isWallet,
  paymentreciept,
  remarks,
  sdid,
  setImageUpLoadProgress,
  referenceId,
  usdid,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  data.append('isWallet', isWallet);
  data.append('remarks', remarks);
  data.append('referenceId', referenceId);
  data.append('sdid', sdid || '');
  data.append('usdid', usdid || 0);

  if (paymentreciept !== null) {
    data.append('depositpayreciept', {
      uri: paymentreciept.uri,
      type: paymentreciept.type,
      name: paymentreciept.fileName,
    });
  }
  data.append('paymentAmount', paymentAmount);

  const result = await paymentDepositApi.createDepositPayment(
    data,
    setImageUpLoadProgress,
  );
  if (!result.ok) {
    return alert(result.problem);
  } else {
    return alert('Reuqest Sent Success');
  }
};

const submitDataForMyID = async (
  uid,
  sdid,
  paymentMethod,
  paymentAmount,
  paymentType,
  paymentreciept,
  remarks,
  setImageUpLoadProgress,
  referenceId,
  usdid,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  data.append('referenceId', referenceId);
  data.append('usdid', usdid);
  data.append('remarks', remarks || '');
  if (paymentreciept !== null) {
    data.append('depositpayreciept', {
      uri: paymentreciept.uri,
      type: paymentreciept.type,
      name: paymentreciept.fileName,
    });
  }

  data.append('paymentAmount', paymentAmount);

  const result = await paymentDepositApi.createDepositPayment(
    data,
    setImageUpLoadProgress,
  );
  if (!result.ok) {
    return alert(result.problem);
  }
  return result;
};

const getPayeeDetails = () => useAPI(payeeApi.getPayeeDetails);

const debitFromWallet = async (
  uid,
  paymentAmount,
  paymentType,
  paymentMethod,
  paymentID,
) => {
  const data = {
    uid: uid,
    paymentAmount: paymentAmount,
    paymentType: paymentType,
    paymentMethod: paymentMethod,
    pymid: paymentID,
  };

  const result = await walletApi.debitFromWallet(data);
  if (!result.ok) {
    alert(result.problem);
  } else {
    return alert('debited from wallert succes');
  }
};
export default {
  submitData,
  submitDataForMyID,
  getPayeeDetails,
  submitIntialDeposit,
  depositIntoWallet,
  debitFromWallet,
};
