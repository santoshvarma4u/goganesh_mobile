import NetworkAPI from '../api/server';

const createNotification = async data => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };
  console.log('aaaa', data);
  const notification = '/notification';
  return NetworkAPI.apiClient.post(notification, data, headers);
};

export default {
  createNotification,
};
