import NetworkAPI from '../api/server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const getIDs = () => NetworkAPI.apiClient.get(idendPoint);
const createID = (data, onUploadProgress) => {
  return NetworkAPI.apiClient.post(siteRequestEndPoint, data, {
    onUploadProgress: onUploadProgress,
  });
};
export default {
  getIDs,
  createID,
};
