import React from 'react';
import IDsApi from '../../../Network/IDs/IDs';
import siteApi from '../../../Network/sites/sites';
import useAPI from '../../../Hooks/useAPI';

const useGetIDs = () => useAPI(IDsApi.getIDs);
const getUserSpecificIDs = () => useAPI(siteApi.getUserSiteDetails);
export default {useGetIDs, getUserSpecificIDs};
