import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import CartContext from "../store/CartContext";

const MedicalProduct = (props) => {
  const cartcntx = useContext(CartContext);

  const [productList, setProductList] = useState([]);
  const name = useRef("");
  const description = useRef("");
  const price = useRef("");
  const large = useRef("");
  const medium = useRef("");
  const small = useRef("");

  useEffect(() => {
    axios
      .get(
        "https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/addedProducts"
      )
      .then((response) => {
        // console.log("1x1", response.data);
        setProductList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addProductsHandler = (event) => {
    event.preventDefault();

    const enteredName = name.current.value;
    const enteredDescription = description.current.value;
    const enteredPrice = price.current.value;
    const enteredLargeQt = large.current.value;
    const enteredMediumQt = medium.current.value;
    const enteredSmallQt = small.current.value;

    // save to crudcrud server
    axios
      .post(
        "https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/addedProducts",
        {
          id: Math.random().toString(),
          name: enteredName,
          description: enteredDescription,
          price: enteredPrice,
          largeQt: enteredLargeQt,
          mediumQt: enteredMediumQt,
          smallQt: enteredSmallQt,
        }
      )
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });

    // clear the data
    name.current.value = "";
    description.current.value = "";
    price.current.value = "";
    large.current.value = "";
    medium.current.value = "";
    small.current.value = "";
  };

  // const largeQuantityHandler = (item) => {
  //   let squantity = Number(item.largeQt) - 1;

  //   productList.map((product) => {
  //     if (product.id === item.id) {
  //       const quantity = { ...product, largeQt: squantity };
  //       console.log("??qunty", quantity);
  //       if (squantity >= 0) {
  //         const updateList = productList.filter((pdt) => pdt.id !== item.id);
  //         setProductList([...updateList, quantity]);
  //         cartcntx.addProduct({
  //           ...item,
  //           quantityLarge: 1,
  //           quantityMedium: 0,
  //           quantitySmall: 0,
  //         });
  //       }
  //     }
  //   });
  // };

  // const mediumQuantityHandler = (item) => {
  //   let squantity = Number(item.mediumQt) - 1;

  //   productList.map((product) => {
  //     if (product.id === item.id) {
  //       const quantity = { ...product, mediumQt: squantity };

  //       if (squantity >= 0) {
  //         const updateList = productList.filter((pdt) => pdt.id !== item.id);
  //         setProductList([...updateList, quantity]);
  //         cartcntx.addProduct({
  //           ...item,
  //           quantityLarge: 0,
  //           quantityMedium: 1,
  //           quantitySmall: 0,
  //         });
  //       }
  //     }
  //   });
  // };

  // const smallQuantityHandler = (item) => {
  //   let squantity = Number(item.smallQt) - 1;
  //   productList.map((product) => {
  //     if (product.id === item.id) {
  //       const quantity = { ...product, smallQt: squantity };
  //       if (squantity >= 0) {
  //         const updateList = productList.filter((pdt) => pdt.id !== item.id);
  //         setProductList([...updateList, quantity]);
  //         cartcntx.addProduct({
  //           ...item,
  //           quantityLarge: 0,
  //           quantityMedium: 0,
  //           quantitySmall: 1,
  //         });
  //       }
  //     }
  //   });
  // };

  const QuantityHandler = (item, qname) => {
    let squantity = 0;
    if (qname === "large") {
      squantity = Number(item.largeQt) - 1;
    } else if (qname === "medium") {
      squantity = Number(item.mediumQt) - 1;
    } else if (qname === "small") {
      squantity = Number(item.smallQt) - 1;
    }
    let quantity = {};
    productList.map((product) => {
      if (product.id === item.id) {
        if (qname === "large") {
          quantity = { ...product, largeQt: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 1,
              quantityMedium: 0,
              quantitySmall: 0,
            });
          }
        } else if (qname === "medium") {
          quantity = { ...product, mediumQt: squantity };

          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 1,
              quantitySmall: 0,
            });
          }
        } else if (qname === "small") {
          quantity = { ...product, smallQt: squantity };
          if (squantity >= 0) {
            const updateList = productList.filter((pdt) => pdt.id !== item.id);
            setProductList([...updateList, quantity]);
            cartcntx.addProduct({
              ...item,
              quantityLarge: 0,
              quantityMedium: 0,
              quantitySmall: 1,
            });
          }
        }
      }
    });
    console.log("getlastquantity", quantity);
    if (quantity) {
      const { _id, ...rest } = quantity;
      axios
        .put(
          `https://crudcrud.com/api/b46e7c3d82164bcbb90a07bc1e94ab51/addedProducts/${item._id}`,
          rest

          // { "Content-Type": "application/json" }
          //  {
          //    _id: item._id,
          //    id: item.id,
          //    name: item.name,
          //    description: item.description,
          //    price: item.price,
          //    largeQt: enteredLargeQt,
          //    mediumQt: enteredMediumQt,
          //    smallQt: enteredSmallQt,
          //  }
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <form>
        <label>Name</label>
        <input type="text" ref={name}></input>
        <label>Description</label>
        <input type="text" ref={description}></input>
        <label>Price</label>
        <input type="text" ref={price}></input>
        <label>Large</label>
        <input type="number" ref={large}></input>
        <label>Medium</label>
        <input type="number" ref={medium}></input>
        <label>Small</label>
        <input type="number" ref={small}></input>
        <button onClick={addProductsHandler}>Add Products</button>
      </form>
      <button onClick={props.onClick}>
        <span>Cart</span>
        <span>
          -
          {cartcntx.medProductList.reduce(
            (a, v) =>
              (a =
                Number(a) +
                Number(
                  Number(v.quantityLarge) +
                    Number(v.quantityMedium) +
                    Number(v.quantitySmall)
                )),
            0
          )}
          -
        </span>
      </button>
      <ul>
        {productList.map((item) => {
          return (
            <li style={{ listStyle: "none" }} key={item.id}>
              {item.name} - {item.description} - Rs {item.price}
              <button
                onClick={() => {
                  QuantityHandler(item, "large");
                }}
              >
                Large ({item.largeQt}) Qt
              </button>
              <button
                onClick={() => {
                  QuantityHandler(item, "medium");
                }}
              >
                Medium( {item.mediumQt} )Qt
              </button>
              <button
                onClick={() => {
                  QuantityHandler(item, "small");
                }}
              >
                Small ({item.smallQt}) Qt
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MedicalProduct;
