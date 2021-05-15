import React from 'react';
import offersApi from '../../../Network/Offers/offers';
import useAPI from '../../../Hooks/useAPI';

const useGetOfferImages = () => useAPI(offersApi.getOffersImages);

export default {useGetOfferImages};
