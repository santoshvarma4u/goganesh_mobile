import payeeApi from '../../../Network/payee/payeeApi';
const getPayeeDetails = () => useAPI(payeeApi.getPayeeDetails);
export default {
  getPayeeDetails,
};
