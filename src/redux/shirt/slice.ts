import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShirt } from './asyncActions';
import { Shirt, ShirtSliceState, Status } from './types';

const initialState: ShirtSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const shirtSlice = createSlice({
  name: 'shirt',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Shirt[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShirt.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchShirt.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchShirt.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = shirtSlice.actions;

export default shirtSlice.reducer;
