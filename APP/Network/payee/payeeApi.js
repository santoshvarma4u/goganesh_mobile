import NetworkAPI from '../api/server';

const payeeEndPoint = '/paymentMaster';
const getPayeeDetails = () => NetworkAPI.apiClient.get(payeeEndPoint);

export default {
  getPayeeDetails,
};
