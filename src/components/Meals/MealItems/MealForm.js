import React, { useRef, useState } from 'react'

import Input from '../../UI/Input';
import styles from './MealForm.module.css'

const MealForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInput = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInput.current.value;
    const enteredAmountNumber = +enteredAmount;
    if(enteredAmount.trim().length === '0' || enteredAmountNumber < 1 || enteredAmountNumber >5){
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref = {amountInput}
        label='Amount'
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          step: '1',
          defaultValue: '1',
          min:'1',
          max:'5'
        }}       
      ></Input>
      <button type='submit'>+ Add</button>
      {!amountIsValid && <p>Amount input is not valid</p>}
    </form>
  )
}

export default MealForm