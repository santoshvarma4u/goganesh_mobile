import apiClient from './server';

const idendPoint = '/site';
const siteRequestEndPoint = '/siteRequest';
const getIDs = () => apiClient.get(idendPoint);
const createID = (uid, sdid, requestType, requestStatus, payreciept) => {
  const createIDData = {
    uid: uid,
    sdid: sdid,
    requestType: requestType,
    requestStatus: requestStatus,
    payreciept: payreciept,
  };

  return apiClient.post(siteRequestEndPoint, createIDData);
};
export default {
  getIDs,
  createID,
};
