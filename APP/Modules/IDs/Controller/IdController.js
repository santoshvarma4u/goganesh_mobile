import React from 'react';
import IDsApi from '../../../Network/IDs/IDs';
import useAPI from '../../../Hooks/useAPI';

const useGetIDs = () => useAPI(IDsApi.getIDs);

export default {useGetIDs};
