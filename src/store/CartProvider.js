import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const CartProvider = (props) => {
  const [cartId, setcartID] = useState("");
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [small, setSmall] = useState("");

  const [medProductLists, setMedProductLists] = useState([]);

  const [productLists, setProductList] = useState([]);

  // ---------------get items from addproductbutton------------------------------//

  let medProductObj = {};
  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/4b4df87aa6d144d59f7044ee864004f7/addedProducts"
      )
      .then((response) => {
        // console.log("1x1", response.data);

        medProductObj = response.data;
        setProductList(medProductObj);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //  add items to addedproducts
  const addMedProductHandler = (meditem) => {
    // save to crudcrud server
    axios
      .post(
        "https://crudcrud.com/api/4b4df87aa6d144d59f7044ee864004f7/addedProducts",
        meditem
      )
      .then((response) => {
        console.log(response);
        medProductObj = response.data;
        setProductList([...productLists, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });

    // setProductList(medProductObj);
  };

  // get items from carts
  useEffect(() => {
    axios
      .get(
        `https://crudcrud.com/api/4b4df87aa6d144d59f7044ee864004f7/cartProducts`
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

  // add items to cart
  const addProductHandler = (item) => {
    console.log("item", item);
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
      }
    });

    if (hasProduct) {
      const largevalue = large.toString();
      const mediumvalue = medium.toString();
      const smallvalue = small.toString();
      axios
        .put(
          `https://crudcrud.com/api/4b4df87aa6d144d59f7044ee864004f7/cartProducts/${item._id}`,
          {
            id: item.id,
            medBillName: item.name,
            medBillDescription: item.description,
            medBillPrice: item.price,
            quantityLarge: largevalue,
            quantityMedium: mediumvalue,
            quantitySmall: smallvalue,
          }
        )
        .then((response) => {
          console.log("update data", response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      // setMedProductLists(cartpdt);
    } else {
      axios
        .post(
          `https://crudcrud.com/api/4b4df87aa6d144d59f7044ee864004f7/cartProducts`,
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
    productList: productLists,
    addMedProducts: addMedProductHandler,
  };

  return (
    <CartContext.Provider value={cartitem}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
