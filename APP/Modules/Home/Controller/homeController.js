import React from 'react';
import useAPI from '../../../Hooks/useAPI';
import usersAPI from '../../../Network/Users/users';
import promosApi from '../../../Network/promos/promos';

const useGetPromoImages = () => useAPI(promosApi.getPromoImages);

const getWalletBalance = () => useAPI(usersAPI.getWalletBalance);

const getNotifications = () => useAPI(usersAPI.getAllNotifications);

export default {useGetPromoImages, getWalletBalance, getNotifications};
