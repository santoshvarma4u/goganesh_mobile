import NetworkAPI from '../api/server';
import authKey from '../../Modules/Common/JWT';
const promosEndPoint = '/promos';

const getPromoImages = () => {
  NetworkAPI.apiClient.setHeader('authorization', authKey.token);
  return NetworkAPI.apiClient.get(promosEndPoint);
};

const updatePromosImages = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  return NetworkAPI.apiClient.post(promosEndPoint, data, headers);
};
export default {
  getPromoImages,
  updatePromosImages,
};
