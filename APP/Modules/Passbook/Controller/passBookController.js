import React from 'react';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';
import useAPI from '../../../Hooks/useAPI';

const useGetUserTransasctions = () =>
  useAPI(paymentDepositApi.getUserTransactions);

export default {useGetUserTransasctions};
