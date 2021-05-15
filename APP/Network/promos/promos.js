import {apiClient} from '../api/server';

const promosEndPoint = '/promos';

const getPromoImages = () => {
  return apiClient.get(promosEndPoint);
};

const updatePromosImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return apiClient.post(promosEndPoint, data, headers);
};
export default {
  getPromoImages,
  updatePromosImages,
};
