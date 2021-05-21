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
    uri:
      'https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView2_50cm_8bit_Pansharpened_RGB_DRA_Rome_Italy_2009DEC10_8bits_sub_r_1.jpg',
    type: payreciept.type,
    name: payreciept.fileName,
  });
  data.append('planType', planType);
  data.append('userName', userName);
  data.append('depositCoins', depositCoins);
  console.log(data);

  const result = await IDsApi.createID(data, progress => console.log(progress));
  if (!result.ok) return alert(result.problem);
  return;
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
