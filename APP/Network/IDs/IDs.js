import NetworkAPI from '../api/server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const userSiteEndpoint = '/userSiteDetails';
const getIDs = () => NetworkAPI.apiClient.get(idendPoint);
const createID = (data, onUploadProgress) => {
  return NetworkAPI.apiClient.post(siteRequestEndPoint, data, {
    onUploadProgress: onUploadProgress,
  });
};
const closeID = (id, data) =>
  NetworkAPI.apiClient.patch(`${userSiteEndpoint}/${id}`, data);
export default {
  getIDs,
  createID,
  closeID,
};
