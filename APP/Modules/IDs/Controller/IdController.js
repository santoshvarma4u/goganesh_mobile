import IDsApi from '../../../Network/IDs/IDs';
import useAPI from '../../../Hooks/useAPI';

const getIDs = useAPI(IDsApi.getIDs);

export default {getIDs};
