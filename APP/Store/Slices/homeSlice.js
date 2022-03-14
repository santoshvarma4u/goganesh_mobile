// Create slice from redux-tool-kit
import {createSlice} from '@reduxjs/toolkit';

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
      state.walletBalance = action.payload.walletBalance;
    },
  },
});
export const {loading, error, data, setWalletBalance} = slice.actions;

export default slice.reducer;
