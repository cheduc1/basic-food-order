import React, { useContext } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartAddAmountHandler = (item) => {
    cartCtx.addItem({...item,amount:1});
  }
  const cartRemoveAmountHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const cartItems = <ul className={styles['cart-items']}>
    {cartCtx.items.map(item =>
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onAdd={cartAddAmountHandler.bind(null,item)}
        onRemove={cartRemoveAmountHandler.bind(null,item.id)}
      />
    )}
  </ul>

  return (
    <Modal onHide={props.onHide}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--close']} onClick={props.onHide}>Close</button>
        {hasItems && <button className={styles['button--order']}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart