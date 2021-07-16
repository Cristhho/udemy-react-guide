import React, { useContext, useEffect, useState } from 'react';

import CartIcon from '../cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './CartButton.module.css';

const CartButton = (props) => {
  const ctx = useContext(CartContext);
  const [animateButton, setAnimateButton] = useState(false);

  const totalCartItems = ctx.items.reduce((total, item) => {
    return total + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${animateButton ? classes.bump : ''}`;
  const items = ctx.items;

  useEffect(() => {
    if (items.length === 0) return;
    setAnimateButton(true);
    const timer = setTimeout(() => {
      setAnimateButton(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon /></span>
      <span>Your cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default CartButton;
