// Create slice from redux-tool-kit
import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'idState',
  initialState: {
    index: 0,
  },
  reducers: {
    updateIdState: (state, action) => {
      state.index = action.payload.index || 0;
    },
  },
});
export const {updateIdState} = slice.actions;

export default slice.reducer;
