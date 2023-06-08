import React, { useContext, useState } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartAddAmountHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  }
  const cartRemoveAmountHandler = (id) => {
    cartCtx.removeItem(id);
  }

  const orderHandler = () => {
    setShowCheckout(true);
  }

  const closeOrderHandler = () => {
    setShowCheckout(false);
  }

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch('https://react-http-test-454f1-default-rtdb.asia-southeast1.firebasedatabase.app/odrers.json', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      }),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItems = (<ul className={styles['cart-items']}>
    {cartCtx.items.map(item =>
      <CartItem
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount}
        onAdd={cartAddAmountHandler.bind(null, item)}
        onRemove={cartRemoveAmountHandler.bind(null, item.id)}
      />
    )}
  </ul>
  );

  const modalAction = (
    <div className={styles.actions}>
      <button className={styles['button--close']} onClick={props.onHide}>Close</button>
      {hasItems && <button className={styles['button--order']} onClick={orderHandler}>Order</button>}
    </div>
  );

  const cartModalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onSubmitOrder={submitOrderHandler} onCancel={closeOrderHandler} />}
      {!showCheckout && modalAction}
    </>
  );

  const submittedModal = (
    <>
      <p>Sent order successfully</p>
      <div className={styles.actions}>
        <button className={styles['button--close']} onClick={props.onHide}>Close</button>
      </div>
    </>
  );

  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !isSubmitted && cartModalContent}
      {isSubmitting && <p>Sending order ...</p>}
      {!isSubmitting && isSubmitted && submittedModal}
    </Modal>
  )
}

export default Cart