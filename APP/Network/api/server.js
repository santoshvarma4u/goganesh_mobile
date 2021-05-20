import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://139.59.11.217:3000/',
});

const authApiClient = create({
  baseURL: 'https://',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient, authApiClient};
