import reactotron from 'reactotron-react-native';
import NetworkAPI from '../api/server';

const createOrder = async data => {
  const response = await NetworkAPI.paymentGatewayClient.post(
    'create_order',
    data,
  );
  reactotron.log('response', response);
  return response;
};

const checkOrderStatus = async data => {
  const response = await NetworkAPI.paymentGatewayClient.post(
    'check_order_status',
    data,
  );
  reactotron.log('response', response);
  return response;
};

const getPaymentGatewaySettings = async () => {
  const response = await NetworkAPI.apiClient.get('/paymentGatewaySettings/1');
  const {details: {data = null} = {}} = response.data;
  return data;
};

const savePaymentTransaction = async body => {
  const response = await NetworkAPI.apiClient.post('/pgTransactions', body);
  const {details: {data = null} = {}} = response.data;
  return data;
};

export default {
  createOrder,
  checkOrderStatus,
  getPaymentGatewaySettings,
  savePaymentTransaction,
};
