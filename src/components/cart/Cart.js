import React, { useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const [checkout, setCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({...item, amount: 1});
  };

  const orderHandler = () => {
    setCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-burger-app-bb.firebaseio.com/mealsOrders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: ctx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions =
  <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
  </div>;

  const cartModal =
  <>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {checkout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
    {!checkout && modalActions}
  </>;

  const isSubmittingForm = <p>Sending order data...</p>;
  const didSubmitForm = <>
    <p>Successfully sent the order</p>
    <div className={classes.actions}>
    <button className={classes.button} onClick={props.onClose}>Close</button>
    </div>
  </>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && isSubmittingForm}
      {!isSubmitting && didSubmit && didSubmitForm}
    </Modal>
  );
};

export default Cart;
