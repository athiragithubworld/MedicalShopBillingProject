import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const [cartId, setcartID] = useState("");
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [small, setSmall] = useState("");

  const [medProductLists, setMedProductLists] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/cartProducts`
      )
      .then((response) => {
        console.log("get the data", response.data);
        // cartitem = response.data;
        setMedProductLists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProductHandler = (item) => {
    let cartpdt = [...medProductLists];

    let hasProduct = false;

    cartpdt.forEach((product) => {
      console.log("addProductHandler", cartpdt);
      if (product.id === item.id) {
        hasProduct = true;
        product.quantityLarge =
          Number(product.quantityLarge) + Number(item.quantityLarge);
        product.quantityMedium =
          Number(product.quantityMedium) + Number(item.quantityMedium);
        product.quantitySmall =
          Number(product.quantitySmall) + Number(item.quantitySmall);

        setLarge(product.quantityLarge);
        setMedium(product.quantityMedium);
        setSmall(product.quantitySmall);
        setcartID(product._id);
      } else if (product.id !== item.id) {
        console.log("get post id");
      }
    });

    if (hasProduct) {
      console.log("???", Number(cartId));
      axios
        .put(
          `https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/cartProducts/${cartId}`,
          {
            id: item.id,
            medBillName: item.name,
            medBillDescription: item.description,
            medBillPrice: item.price,
            quantityLarge: large,
            quantityMedium: medium,
            quantitySmall: small,
          }
        )
        .then((response) => {
          console.log("update data", response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setMedProductLists(cartpdt);
    } else {
      axios
        .post(
          `https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/cartProducts`,
          {
            // medProductid: item._id,
            id: item.id,
            medBillName: item.name,
            medBillDescription: item.description,
            medBillPrice: item.price,
            quantityLarge: item.quantityLarge,
            quantityMedium: item.quantityMedium,
            quantitySmall: item.quantitySmall,
          }
        )
        .then((response) => {
          console.log("get post data", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      setMedProductLists((prevPdt) => {
        return [...prevPdt, item];
      });
    }
  };

  const cartitem = {
    medProductList: medProductLists,
    totalPrice: 0,
    addProduct: addProductHandler,
    quantityLarge: 0,
    quantityMedium: 0,
    quantitySmall: 0,
  };

  return (
    <CartContext.Provider value={cartitem}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
