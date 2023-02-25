// Create slice from redux-tool-kit
import {createSlice} from '@reduxjs/toolkit';
import reactotron from 'reactotron-react-native';

const slice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    error: null,
    data: null,
    walletBalance: 0,
  },
  reducers: {
    // Reducer for loading
    loading: state => {
      state.loading = true;
      state.error = null;
    },
    // Reducer for error
    error: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Reducer for data
    data: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    setWalletBalance: (state, action) => {
      const {walletBalance} = action.payload;
      if (!walletBalance || !Number(walletBalance)) {
        return;
      }
      state.walletBalance = action.payload.walletBalance;
    },
  },
});
export const {loading, error, data, setWalletBalance} = slice.actions;

export default slice.reducer;
