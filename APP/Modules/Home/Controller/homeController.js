import React from 'react';
import promosApi from '../../../Network/promos/promos';
import useAPI from '../../../Hooks/useAPI';

const useGetPromoImages = () => useAPI(promosApi.getPromoImages);

export default {useGetPromoImages};
