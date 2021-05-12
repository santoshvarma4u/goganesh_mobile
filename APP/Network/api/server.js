import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://192.168.29.221:3000/',
});

const authApiClient = create({
  baseURL: 'https://',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient, authApiClient};
