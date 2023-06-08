import React, { useRef, useState } from 'react';

import styles from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    address: true,
    postalCode: true,
    phone: true
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalCodeInputRef = useRef();
  const phoneInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const addressIsValid = !isEmpty(enteredAddress);
    const postalCodeIsValid = isFiveChars(enteredPostalCode);
    const phoneIsValid = !isEmpty(enteredPhone);

    setFormInputValidity({
      name: nameIsValid,
      address: addressIsValid,
      postalCode: postalCodeIsValid,
      phone: phoneIsValid
    });

    const formIsValid = nameIsValid && addressIsValid && postalCodeIsValid && phoneIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitOrder({
      name: enteredName,
      address: enteredAddress,
      postalCode: enteredPostalCode,
      phoneNumber: enteredPhone
    });
  }

  const nameControlClasses = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`;
  const addressControlClasses = `${styles.control} ${formInputValidity.address ? '' : styles.invalid}`;
  const postalCodeControlClasses = `${styles.control} ${formInputValidity.postalCode ? '': styles.invalid}`;
  const phoneControlClasses = `${styles.control} ${formInputValidity.phone ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your name</label>
        <input ref={nameInputRef} type='text' id='name'></input>
        {!formInputValidity.name && <p>Name is invalid</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor='address'>Address</label>
        <input ref={addressInputRef} type='text' id='address'></input>
        {!formInputValidity.address && <p>Address is invalid</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='code'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='code'></input>
        {!formInputValidity.postalCode && <p>Postal code is invalid</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor='phone'>Phone number</label>
        <input ref={phoneInputRef} type='text' id='phone'></input>
        {!formInputValidity.phone && <p>Phone is invalid</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button className={styles.submit} type='submit'>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout