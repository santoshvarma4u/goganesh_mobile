import {apiClient} from '../api/server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const getIDs = () => apiClient.get(idendPoint);
const createID = (data, onUplaodProgress) => {
  return apiClient.post(siteRequestEndPoint, data, {
    onUploadProgress: progress =>
      onUplaodProgress(progress.loaded / progress.total),
  });
};
export default {
  getIDs,
  createID,
};
