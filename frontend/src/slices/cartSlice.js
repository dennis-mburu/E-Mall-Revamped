import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((elem) => elem._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((elem) =>
          elem._id === existItem._id ? item : elem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      updateCart(state);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      updateCart(state);
    },
    setShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  setShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
