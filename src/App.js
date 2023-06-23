import React, { useState } from "react";

import MedicalProduct from "./Components/MedicalProduct";
import MedicalBillCart from "./Components/MedicalBillCart";
import CartProvider from "./store/CartProvider";

function App() {
  const [opencart, setOpenCart] = useState(false);

  const clickOpenCart = () => {
    setOpenCart(true);
  };

  const closeCart = () => {
    setOpenCart(false);
  };

  return (
    <CartProvider>
      <MedicalProduct onClick={clickOpenCart}></MedicalProduct>
      {opencart && <MedicalBillCart onClose={closeCart}></MedicalBillCart>}
    </CartProvider>
  );
}

export default App;
