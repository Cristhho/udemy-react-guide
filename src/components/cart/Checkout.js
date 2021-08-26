import React, { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    postal: true,
    city:true
  });

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddres = addressInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const isNameValid = !isEmpty(enteredName);
    const isAddressValid = !isEmpty(enteredAddres);
    const isPostalValid = isFiveChars(enteredPostal);
    const isCityValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: isNameValid,
      address: isAddressValid,
      postal: isPostalValid,
      city: isCityValid
    });

    const formIsValid = isNameValid && isAddressValid && isPostalValid && isCityValid;
    if (!formIsValid) return;

    props.onConfirm({
      name: enteredName,
      address: enteredAddres,
      postal: enteredPostal,
      city: enteredCity
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
