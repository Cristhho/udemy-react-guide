import React from 'react';

import CartButton from './CartButton';
import meal from  '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <CartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={meal} alt='A table full delicious food' />
      </div>
    </>
  );
};

export default Header;
