import useAPI from '../../../Hooks/useAPI';
import IDsApi from '../../../Network/IDs/IDs';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';
import payeeApi from '../../../Network/payee/payeeApi';
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
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('requestStatus', requestStatus);
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

  const result = await IDsApi.createID(data, progress => console.log(progress));
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
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  if (paymentreciept !== null) {
    data.append('depositpayreciept', {
      uri: paymentreciept.uri,
      type: paymentreciept.type,
      name: paymentreciept.fileName,
    });
  }

  data.append('paymentAmount', paymentAmount);
  console.log(data);

  const result = await paymentDepositApi.createDepositPayment(data);
  if (!result.ok) return alert(result.problem);
  return result;
};

const depositIntoWallet = async (
  uid,
  paymentMethod,
  paymentAmount,
  paymentType,
  isWallet,
  paymentreciept,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  data.append('isWallet', isWallet);

  if (paymentreciept !== null) {
    data.append('depositpayreciept', {
      uri: paymentreciept.uri,
      type: paymentreciept.type,
      name: paymentreciept.fileName,
    });
  }
  data.append('paymentAmount', paymentAmount);
  console.log(data);

  const result = await paymentDepositApi.createDepositPayment(data);
  if (!result.ok) return alert(result.problem);
  alert('Reuqest Sent Success');
};

const submitDataForMyID = async (
  uid,
  sdid,
  paymentMethod,
  paymentAmount,
  paymentType,
  paymentreciept,
) => {
  const data = new FormData();
  data.append('uid', uid);
  data.append('sdid', sdid);
  data.append('paymentType', paymentType);
  data.append('paymentMethod', paymentMethod);
  data.append('depositpayreciept', {
    uri: paymentreciept.uri,
    type: paymentreciept.type,
    name: paymentreciept.fileName,
  });

  data.append('paymentAmount', paymentAmount);
  console.log(data);

  const result = await paymentDepositApi.createDepositPayment(data);
  if (!result.ok) return alert(result.problem);
  alert('success okkkkkkk');
};

const getPayeeDetails = () => useAPI(payeeApi.getPayeeDetails);

const debitFromWallet = async (
  uid,
  paymentAmount,
  paymentType,
  paymentMethod,
) => {
  const data = {
    uid: uid,
    paymentAmount: paymentAmount,
    paymentType: paymentType,
    paymentMethod: paymentMethod,
  };

  const result = await walletApi.debitFromWallet(data);
  if (!result.ok) alert(result.problem);
  else return alert('debited from wallert succes');
};
export default {
  submitData,
  submitDataForMyID,
  getPayeeDetails,
  submitIntialDeposit,
  depositIntoWallet,
  debitFromWallet,
};
