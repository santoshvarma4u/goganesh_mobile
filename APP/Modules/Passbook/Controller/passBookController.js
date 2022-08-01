import React from 'react';
import useAPI from '../../../Hooks/useAPI';
import paymentDepositApi from '../../../Network/transactionPassbook/transactionsPassbook';

const useGetUserTransasctions = () =>
  useAPI(paymentDepositApi.getUserTransactions);

export default {useGetUserTransasctions};
