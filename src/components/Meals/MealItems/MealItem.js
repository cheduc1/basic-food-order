import React, { useContext } from 'react'

import styles from './MealItem.module.css';
import MealForm from './MealForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount : amount,
      price: props.price
    })
  };
  return (
    <li className={styles.meal}>
      <div>
        <h3 className={styles.name}>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{`$${props.price}`}</div>
      </div>
      <div>
        <MealForm onAddToCart = {addToCartHandler}/>
      </div>
    </li>
  )
}

export default MealItem