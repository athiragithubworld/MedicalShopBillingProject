import React from "react";

const CartContext = React.createContext({
  medProductList: [],
  totalPrice: 0,
  addProduct: (product) => {},
  removeProduct: (product) => {},
});

export default CartContext;
