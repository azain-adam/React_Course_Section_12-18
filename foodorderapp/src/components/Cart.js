import React, { useContext, useState } from "react";
import styles from "../css/Cart.module.css";
import Modal from "./Modal";
import CartContext from "../context/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const handleRemoveCartItem = (id) => {
    ctx.removeItem(id);
  };

  const handleCartAddItem = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const handleOrder = () => {
    setIsCheckout(true);
  };

  const handleOrderSubmit = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-4f1be-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={handleCartAddItem.bind(null, item)}
          onRemove={handleRemoveCartItem.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      {" "}
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={handleOrderSubmit} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmittedModalContent = (
    <>
      <p>Successfully sent the order.</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
