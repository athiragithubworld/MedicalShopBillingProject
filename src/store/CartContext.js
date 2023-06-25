import React from "react";

const CartContext = React.createContext({
  medProductList: [],
  totalPrice: 0,
  addProduct: (product) => {},
  productList: [],
  addMedProducts: (productItem) => {},
});

export default CartContext;
