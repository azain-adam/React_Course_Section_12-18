import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import styles from "../css/HeaderCartButton.module.css";
import CartContext from "../context/cart-context";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const noOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <>
      <button className={btnClasses} onClick={props.onClick}>
        <span className={styles.icon}>
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={styles.badge}>{noOfCartItems}</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
