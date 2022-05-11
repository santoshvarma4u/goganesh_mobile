import React from 'react';
import useAPI from '../../../Hooks/useAPI';
import usersAPI from '../../../Network/Users/users';
import promosApi from '../../../Network/promos/promos';

const useGetPromoImages = () => useAPI(promosApi.getPromoImages);

const getWalletBalance = () => useAPI(usersAPI.getWalletBalance);

const getNotifications = () => useAPI(usersAPI.getAllNotifications);

const resetUserSitePassword = async data => {
  try {
    const result = await usersAPI.resetUserSitePassword(data);
    if (!result.ok) {
      return alert(result.problem);
    }
    return result.data;
  } catch (error) {
    return alert(error);
  }
};

export default {
  useGetPromoImages,
  getWalletBalance,
  getNotifications,
  resetUserSitePassword,
};
