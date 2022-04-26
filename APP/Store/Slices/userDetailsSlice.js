// Create slice from redux-tool-kit
import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const slice = createSlice({
  name: 'userdetails',
  initialState: {
    userBanks: [],
    userSites: [],
  },
  reducers: {
    setUserBanks: (state, action) => {
      reactotron.log(
        '🚀 ~ file: userDetailsSlice.js ~ line 12 ~ action',
        action,
      );
      state.userBanks = action.payload;
    },
    removeUserBanks: (state, action) => {
      state.userBanks = [];
    },
    setUserSites: (state, action) => {
      state.userSites = action.payload;
    },
    removeUserSites: (state, action) => {
      state.userSites = [];
    },
  },
});
export const {
  setUserBanks,
  removeUserBanks,
  setUserSites,
  removeUserSites,
} = slice.actions;

export default slice.reducer;
