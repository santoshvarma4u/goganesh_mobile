import {apiClient} from '../api/server';

const payeeEndPoint = '/paymentMaster';
const getPayeeDetails = () => apiClient.get(payeeEndPoint);

export default {
  getPayeeDetails,
};
