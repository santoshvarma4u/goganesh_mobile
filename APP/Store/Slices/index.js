// Import Slice reducer from APP/Store/Slices/index.js

import homeReducer from './homeSlice';
import userDetailsSlice from './userDetailsSlice';
// add your slice reducers here
const reducers = {
  home: homeReducer,
  userdetails: userDetailsSlice,
};

export default reducers;
