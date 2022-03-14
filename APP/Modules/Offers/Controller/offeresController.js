import useAPI from '../../../Hooks/useAPI';
import offersApi from '../../../Network/Offers/offers';

const useGetOfferImages = () => useAPI(offersApi.getOffersImages);

export default {useGetOfferImages};
