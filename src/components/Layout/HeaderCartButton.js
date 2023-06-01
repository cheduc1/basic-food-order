import React, { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const [btnIsBumped, setBtnIsBumped] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNum, item) => {
    return curNum + item.amount;
  }, 0);

  const btnClass = `${styles.button} ${btnIsBumped ? styles.bump : ''}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBumped(true);

    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);
    return ()=>{
      clearTimeout(timer);
    }
  }, [items])

  return (
    <button className={btnClass} onClick={props.onShown}>
      <span className={styles['cart-icon']}><CartIcon></CartIcon></span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton