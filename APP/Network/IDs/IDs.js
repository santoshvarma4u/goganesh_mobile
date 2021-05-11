import apiClient from '../api/server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const getIDs = () => apiClient.get(idendPoint);
const createID = data => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  return apiClient.post(siteRequestEndPoint, data, headers);
};
export default {
  getIDs,
  createID,
};
