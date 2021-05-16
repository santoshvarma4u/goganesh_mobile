import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import IDsApi from '../../../Network/IDs/IDs';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';
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
  data.append('payreciept', {
    uri: payreciept.uri,
    type: payreciept.type,
    name: payreciept.fileName,
  });
  data.append('planType', planType);
  data.append('userName', userName);
  data.append('depositCoins', depositCoins);
  console.log(data);

  const result = await IDsApi.createID(data);
  if (!result.ok) return alert(result.problem);
  alert('success');
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
  alert('success');
};

export default {submitData, submitDataForMyID};
