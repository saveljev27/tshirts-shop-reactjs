import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(
      state,
      action: PayloadAction<{ id: string; size: string; type: string }>
    ) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.size === action.payload.size &&
          obj.type === action.payload.type
      );

      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter(
            (item) =>
              !(
                item.id === action.payload.id &&
                item.size === action.payload.size &&
                item.type === action.payload.type
              )
          );
        }
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(
      state,
      action: PayloadAction<{ id: string; size: string; type: string }>
    ) {
      state.items = state.items.filter(
        (obj) =>
          !(
            obj.id === action.payload.id &&
            obj.size === action.payload.size &&
            obj.type === action.payload.type
          )
      );

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
