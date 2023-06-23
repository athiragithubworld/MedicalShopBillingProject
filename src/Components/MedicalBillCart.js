import React, { useContext } from "react";

import classes from "./MedicalBillCart.module.css";
import CartContext from "../store/CartContext";

const MedicalBillCart = (props) => {
  const cartcntx = useContext(CartContext);

  return (
    <form onClick={props.onClose} className={classes.CartForm}>
      <ul className={classes["cart-items"]}>
        {cartcntx.medProductList.map((item) => {
          let totalprice =
            Number(item.medBillPrice) *
            Number(
              Number(item.quantityLarge) +
                Number(item.quantityMedium) +
                Number(item.quantitySmall)
            );
          return (
            <li key={item.id}>
              Name : {item.medBillName} - Descp : {item.medBillDescription} -
              Price :{item.medBillPrice}- L {Number(item.quantityLarge)} - M{" "}
              {Number(item.quantityMedium)}- S {Number(item.quantitySmall)}
              <span> Total Price : {totalprice}</span>
            </li>
          );
        })}
      </ul>

      <div className={classes.total}>
        <span>Total Amount : </span>
        <span>
          $ {console.log("cartvisible", cartcntx.medProductList)}
          {cartcntx.medProductList.reduce(
            (a, v) =>
              (a =
                Number(a) +
                Number(v.medBillPrice) *
                  Number(
                    Number(v.quantityLarge) +
                      Number(v.quantityMedium) +
                      Number(v.quantitySmall)
                  )),
            0
          )}{" "}
        </span>
      </div>
      <div className={classes.button}>
        <button>Product Order</button>
        <button>Close</button>
      </div>
    </form>
  );
};

export default MedicalBillCart;
