import React, { useRef, useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../ui/Input';

const MealItemForm = (props) => {
  const inputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const amount = inputRef.current.value;
    const amountVal = +amount;
    if (amount.trim().length === 0 || amountVal < 1 || amountVal > 5) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(amountVal);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label='Amount' ref={inputRef} input={{
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }} />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
