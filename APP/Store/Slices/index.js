// Import Slice reducer from APP/Store/Slices/index.js

import homeReducer from './homeSlice';
import idStateSlice from './idStateSlice';
import userDetailsSlice from './userDetailsSlice';
// add your slice reducers here
const reducers = {
  home: homeReducer,
  userdetails: userDetailsSlice,
  idState: idStateSlice,
};

export default reducers;
