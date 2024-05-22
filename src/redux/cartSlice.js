import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cartData: [],
  user: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add comment
    addCart: (state, action) => {
      state.cartData = [...state.cartData, action.payload];
    },
    deleteCart: (state, action) => {
      state.cartData = action.payload;
    },
    login: (state, action) => {
      state.user = action.payload;
    },

    // Special reducer for hydrating the state
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.cart,
        };
      },
    },
  },
});

export const { addCart, deleteCart, login } = cartSlice.actions;
export const selectCarts = (state) => state.cart.cartData;
export const selectuser = (state) => state.cart.user;
export default cartSlice.reducer;
