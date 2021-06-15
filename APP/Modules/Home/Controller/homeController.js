import React from 'react';
import promosApi from '../../../Network/promos/promos';
import useAPI from '../../../Hooks/useAPI';
import usersAPI from '../../../Network/Users/users';

const useGetPromoImages = () => useAPI(promosApi.getPromoImages);

const getWalletBalance = () => useAPI(usersAPI.getWalletBalance);

export default {useGetPromoImages, getWalletBalance};
