import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

function addDecimals(num) {
  return Math.round((num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      let [cartItems] = state.cartItems;
      const existItem = cartItems.find((elem) => elem._id === item._id);

      if (existItem) {
        cartItems.map((elem) => (elem._id === existItem._id ? item : elem));
      } else {
        cartItems = [...cartItems, item];
      }

      // calculate items price:
      state.itemsPrice = addDecimals(
        cartItems.reduce((acc, elem) => acc + elem.price * elem.qty, 0)
      );

      // Calc Shipping Price: if itemsPrice > 100, shipping is 0, otherwise $10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calc tax of 15%
      state.taxPrice = addDecimals(state.itemsPrice + 0.15 * state.itemsPrice);

      // Calc totalPrice
      state.totalPrice = addDecimals(
        state.itemsPrice + state.shippingPrice + state.taxPrice
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
