import React, { useContext } from 'react';

import CartIcon from '../cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const ctx = useContext(CartContext);

  const totalCartItems = ctx.items.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default CartButton;
