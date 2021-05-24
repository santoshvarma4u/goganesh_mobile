import NetworkAPI from '../api/server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const getIDs = () => NetworkAPI.apiClient.get(idendPoint);
const createID = (data, onUplaodProgress) => {
  return NetworkAPI.apiClient.post(siteRequestEndPoint, data, {
    onUploadProgress: progress =>
      onUplaodProgress(progress.loaded / progress.total),
  });
};
export default {
  getIDs,
  createID,
};
