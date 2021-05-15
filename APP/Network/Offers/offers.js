import {apiClient} from '../api/server';

const offersEndPoint = '/offers';

const getOffersImages = () => apiClient.get(offersEndPoint);
const createOffersImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return apiClient.post(offersEndPoint, data, headers);
};
const updateOffersImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return apiClient.post(offersEndPoint, data, headers);
};
export default {
  getOffersImages,
  createOffersImages,
  updateOffersImages,
};
