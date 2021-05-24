import NetworkAPI from '../api/server';

const offersEndPoint = '/offers';

const getOffersImages = () => NetworkAPI.apiClient.get(offersEndPoint);
const createOffersImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return NetworkAPI.apiClient.post(offersEndPoint, data, headers);
};
const updateOffersImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return NetworkAPI.apiClient.post(offersEndPoint, data, headers);
};
export default {
  getOffersImages,
  createOffersImages,
  updateOffersImages,
};
