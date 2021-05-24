import NetworkAPI from '../api/server';

const usersEndPoint = '/users';
const getUsers = () => NetworkAPI.apiClient.get(usersEndPoint);
const createUser = data => {
  return NetworkAPI.apiLoginClient.post(usersEndPoint, data);
};
export default {
  getUsers,
  createUser,
};
