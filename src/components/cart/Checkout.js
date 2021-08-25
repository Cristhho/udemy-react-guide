import React from 'react';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' />
      </div>
      <div className={classes.control}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal code</label>
        <input type='text' id='postal' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' />
      </div>
      <button type='button' onClick={props.onCancel}>Cancel</button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
