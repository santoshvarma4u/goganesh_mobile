import apiClient from '../api/server';

const usersEndPoint = '/users';
const getUsers = () => apiClient.get(usersEndPoint);
const createUser = data => {
  return apiClient.post(usersEndPoint, data);
};
export default {
  getUsers,
  createUser,
};
