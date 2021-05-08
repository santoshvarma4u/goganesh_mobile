import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://192.168.29.221:3000/',
});

export default apiClient;
