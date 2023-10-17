export function addDecimals(num) {
  return Number(Math.round((num * 100) / 100).toFixed(2));
}

export function updateCart(state) {
  // calculate items price:
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, elem) => acc + elem.price * elem.qty, 0)
  );

  // Calc Shipping Price: if itemsPrice > 100, shipping is 0, otherwise $10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calc tax of 15%
  state.taxPrice = addDecimals(0.15 * state.itemsPrice);

  // Calc totalPrice
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  localStorage.setItem("cart", JSON.stringify(state));
}
