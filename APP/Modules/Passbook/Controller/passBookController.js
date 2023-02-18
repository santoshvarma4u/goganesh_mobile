import useAPI from '../../../Hooks/useAPI';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';

const useGetUserTransactions = data =>
  useAPI(paymentDepositApi.getUserTransactions);

export default {useGetUserTransactions: useGetUserTransactions};
