import {create} from 'apisauce';

const apiClient = create({
  baseURL: 'http://139.59.11.217:3000/',
  headers: {Accept: 'x-www-form-urlencoded'},
});

const authApiClient = create({
  baseURL: 'https://',
  headers: {Accept: 'application/vnd.github.v3+json'},
});

export {apiClient, authApiClient};
