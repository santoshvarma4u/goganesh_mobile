import React, {useState} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import IDsApi from '../../../Network/IDs/IDs';

const submitData = async (
  uid,
  sdid,
  planType,
  paymentType,
  requestStatus,
  payreciept,
) => {
  const result = await IDsApi.createID(
    uid,
    sdid,
    planType,
    paymentType,
    requestStatus,
    payreciept,
  );
  if (!result.ok) return alert('failed');
  alert('success');
};

export default {submitData};
