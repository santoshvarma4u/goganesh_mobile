import NetworkAPI from '../../../Network/api/server';
import payeeApi from '../../../Network/payee/payeeApi';
const getPayeeDetails = () => useAPI(payeeApi.getPayeeDetails);

const generatePaytmChecksum = async data => {
  const headers = {
    'Content-type': 'application/json',
  };
  const paytmChecksum = 'payment/generatePaytmChecksumHash';
  return NetworkAPI.apiClient.post(paytmChecksum, data, headers);
};

const generateCFToken = async data => {
  const headers = {
    'Content-type': 'application/json',
  };
  const paytmChecksum = 'payment/getCFToken';
  return NetworkAPI.apiClient.post(paytmChecksum, data, headers);
};

const razorPayCreateOrder = async data => {
  const headers = {
    'Content-type': 'application/json',
  };
  const orderUrl = 'payment/razorPayCreateOrder';
  return NetworkAPI.apiClient.post(orderUrl, data, headers);
};

export default {
  getPayeeDetails,
  generatePaytmChecksum,
  razorPayCreateOrder,
  generateCFToken,
};
