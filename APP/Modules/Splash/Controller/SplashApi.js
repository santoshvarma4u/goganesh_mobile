import NetworkAPI from '../../../Network/api/server';

const CheckAppUpdate = async id => {
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
  };

  const info = '/datainfo/checkAppUpdate/' + id;
  return NetworkAPI.apiClient.get(info);
};

export default {
  CheckAppUpdate,
};
